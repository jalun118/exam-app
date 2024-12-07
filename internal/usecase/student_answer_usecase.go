package usecase

import (
	"context"
	"encoding/json"
	"errors"
	"sort"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type StudentAnswerUsecase struct {
	db                *gorm.DB
	logger            *loggers.Logger
	studentAnswerRepo *repository.StudentAnswerRepository
	keyAnswerRepo     *repository.ExamAnswerKeyRepository
	examRepo          *repository.StudentExamRepository
	distributionRepo  *repository.DistributionExamRepository
}

func NewStudentAnswerUsecase(db *gorm.DB, log *loggers.Logger, studentAnswerRepo *repository.StudentAnswerRepository, keyAnswerRepo *repository.ExamAnswerKeyRepository, examRepo *repository.StudentExamRepository) *StudentAnswerUsecase {
	return &StudentAnswerUsecase{
		db:                db,
		logger:            log,
		studentAnswerRepo: studentAnswerRepo,
		keyAnswerRepo:     keyAnswerRepo,
		examRepo:          examRepo,
	}
}

// Return Code
//   - ExamNotFound
//   - StudentNotFound
//   - RecordNotFound
//   - ExamKeyNotFound
//   - InternalServerError
//   - DatabaseError
//   - SuccessInsert
func (c *StudentAnswerUsecase) Create(ctx context.Context, dataAnswer models.CreateStudentAnswer) (*entity.StudentAnswer, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if found, err := c.examRepo.FoundRecordById(tx, dataAnswer.ExamId); found {
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, constants.ExamNotFound
			}
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.ExamNotFound
	}

	if found, err := c.studentAnswerRepo.FoundRecordById(tx, dataAnswer.StudentId); found {
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, constants.StudentNotFound
			}
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.StudentNotFound
	}

	var distribution entity.DistributionExam

	if err := c.distributionRepo.FindById(tx, &distribution, dataAnswer.DistributionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	sort.Slice(dataAnswer.StudentAnswer, func(i, j int) bool {
		return dataAnswer.StudentAnswer[i].IndexQuestion < dataAnswer.StudentAnswer[j].IndexQuestion
	})

	var examKey entity.ExamAnswerKey

	if err := c.keyAnswerRepo.FindByExamId(tx, &examKey, dataAnswer.ExamId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.ExamKeyNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	var keyAnswer []models.PayloadExamKey

	if err := json.Unmarshal([]byte(examKey.KeyAnswer), &keyAnswer); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.InternalServerError
	}

	var totalCorrect int = 0

	for _, v := range dataAnswer.StudentAnswer {
		for _, key := range keyAnswer {
			if v.IndexQuestion == key.IndexQuestion && key.IndexAnswer == v.IndexOption {
				totalCorrect++
				break
			}
		}
	}

	finalScore := float64(totalCorrect) / float64(distribution.NumberOfQuestions) * 100

	mashalAnswer, err := json.Marshal(keyAnswer)
	if err != nil {
		c.logger.Error("%v", err)
		return nil, constants.InternalServerError
	}

	newAnswer := entity.StudentAnswer{
		StudentId:      dataAnswer.StudentId,
		ExamId:         dataAnswer.ExamId,
		DistributionId: dataAnswer.DistributionId,
		Answers:        string(mashalAnswer),
		Point:          finalScore,
	}

	if err := c.studentAnswerRepo.Create(tx, &newAnswer); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newAnswer, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *StudentAnswerUsecase) GetById(ctx context.Context, id uint) (*entity.StudentAnswer, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var answer entity.StudentAnswer

	if err := c.studentAnswerRepo.FindById(tx, &answer, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &answer, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentAnswerUsecase) GetAll(ctx context.Context, p repository.Pagination) ([]entity.StudentAnswer, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	answers, meta, err := c.studentAnswerRepo.GetAllPagination(tx, p)
	if err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return answers, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentAnswerUsecase) GetAllByExamId(ctx context.Context, p repository.Pagination, examId string) ([]entity.StudentAnswer, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	answers, meta, err := c.studentAnswerRepo.PaginationAggregation(tx.Model(&entity.StudentAnswer{}).Where("exam_id", examId), p)
	if err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return answers, meta, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StudentAnswerUsecase) DeleteById(ctx context.Context, id uint) (*entity.StudentAnswer, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var answer entity.StudentAnswer

	if err := c.studentAnswerRepo.DeleteById(tx, &answer, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &answer, constants.SuccessDelete
}
