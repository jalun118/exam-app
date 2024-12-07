package usecase

import (
	"context"
	"encoding/json"
	"errors"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type ExamAnswerKeyUsecase struct {
	db                *gorm.DB
	examAnswerKeyRepo *repository.ExamAnswerKeyRepository
	examRepo          *repository.StudentExamRepository
	logger            *loggers.Logger
}

func NewExamAnswerKeyUsecase(db *gorm.DB, examAnswerKeyRepo *repository.ExamAnswerKeyRepository, examRepo *repository.StudentExamRepository, log *loggers.Logger) *ExamAnswerKeyUsecase {
	return &ExamAnswerKeyUsecase{
		db:                db,
		examAnswerKeyRepo: examAnswerKeyRepo,
		examRepo:          examRepo,
		logger:            log,
	}
}

// Return Code
//   - InternalServerError
//   - ExamNotFound
//   - DatabaseError
//   - DuplicateRecord
//   - SuccessInsert
func (c *ExamAnswerKeyUsecase) CreateAnswerKey(ctx context.Context, authorId uint, examId string, dataKey models.CreateExamAnswerKey) (*entity.ExamAnswerKey, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	marshalKey, err := json.Marshal(dataKey.ExamKey)
	if err != nil {
		return nil, constants.InternalServerError
	}

	if found, err := c.examRepo.FoundRecordById(tx, examId); !found || err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.ExamNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	errFind := c.examAnswerKeyRepo.FindByExamId(tx, &entity.ExamAnswerKey{}, examId)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}

	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	newKey := entity.ExamAnswerKey{
		AuthorId:  authorId,
		KeyAnswer: string(marshalKey),
		ExamId:    examId,
	}

	if err := c.examAnswerKeyRepo.Create(tx, &newKey); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &newKey, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *ExamAnswerKeyUsecase) GetAnswerKey(ctx context.Context, id uint) (*models.GetExamAnswerKey, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.ExamAnswerKey

	if err := c.examAnswerKeyRepo.FindById(tx, &exam, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	var payload models.GetExamAnswerKey

	if err := json.Unmarshal([]byte(exam.KeyAnswer), &payload.ExamKey); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &payload, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *ExamAnswerKeyUsecase) GetAnswerKeyByExamId(ctx context.Context, examId string) (*models.GetExamAnswerKey, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.ExamAnswerKey

	if err := c.examAnswerKeyRepo.FindByExamId(tx, &exam, examId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	var payload models.GetExamAnswerKey

	if err := json.Unmarshal([]byte(exam.KeyAnswer), &payload.ExamKey); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &payload, constants.SuccessUpdate
}

// Return Code
//   - InternalServerError
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *ExamAnswerKeyUsecase) UpdateAnswerKey(ctx context.Context, authorId uint, id uint, dataUpdate models.UpdateExamAnswerKey) (*entity.ExamAnswerKey, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	marshalKey, err := json.Marshal(dataUpdate)
	if err != nil {
		return nil, constants.InternalServerError
	}

	var examKey entity.ExamAnswerKey

	if err := c.examAnswerKeyRepo.FindByIdAndAuthor(tx, &examKey, authorId, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	examKey.KeyAnswer = string(marshalKey)

	if err := c.examAnswerKeyRepo.Update(tx, &examKey); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &examKey, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *ExamAnswerKeyUsecase) DeleteAnswerKey(ctx context.Context, id uint, authorId uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var examKey entity.ExamAnswerKey

	if err := c.examAnswerKeyRepo.DeleteByIdAndAuthor(tx, &examKey, authorId, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return constants.RecordNotFound
		}
		return constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return constants.DatabaseError
	}

	return constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *ExamAnswerKeyUsecase) DeleteAnswerKeyByExamId(ctx context.Context, examId string, authorId uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var examKey entity.ExamAnswerKey

	if err := c.examAnswerKeyRepo.DeleteByExamIdAndAuthor(tx, &examKey, authorId, examId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return constants.RecordNotFound
		}
		return constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return constants.DatabaseError
	}

	return constants.SuccessDelete
}
