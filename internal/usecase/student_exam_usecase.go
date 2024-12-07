package usecase

import (
	"context"
	"errors"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type StudentExamUsecase struct {
	db              *gorm.DB
	logger          *loggers.Logger
	studentExamRepo *repository.StudentExamRepository
	userRepo        *repository.UserRepository
}

func NewStudentExamUsecase(db *gorm.DB, studentExamRepo *repository.StudentExamRepository, userRepo *repository.UserRepository, log *loggers.Logger) *StudentExamUsecase {
	return &StudentExamUsecase{
		db:              db,
		logger:          log,
		studentExamRepo: studentExamRepo,
		userRepo:        userRepo,
	}
}

// Return Code
//   - UserNotFound
//   - DatabaseError
//   - SuccessInsert
func (c *StudentExamUsecase) CreateNewExam(ctx context.Context, authorId uint, dataExam models.CreateNewExam) (*entity.StudentExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if found, err := c.userRepo.FoundRecordById(tx, authorId); !found || err != nil {
		if !found || errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.UserNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	newExam := entity.StudentExam{
		AuthorId: authorId,
		Title:    dataExam.Title,
	}

	if err := c.studentExamRepo.Create(tx, &newExam); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newExam, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *StudentExamUsecase) UpdateExam(ctx context.Context, authorId uint, examId string, dataExam models.UpdateExam) (*entity.StudentExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.StudentExam

	if err := c.studentExamRepo.FindByIdAndAuthor(tx, &exam, authorId, examId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	exam.Title = dataExam.Title

	if err := c.studentExamRepo.Update(tx, &exam); err != nil {
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

	return &exam, constants.SuccessUpdate
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentExamUsecase) GetExam(ctx context.Context, examId string, limit int) (*entity.StudentExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.StudentExam

	if err := c.studentExamRepo.GetAllQuestionAndOptionLimit(tx, &exam, examId, limit); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &exam, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentExamUsecase) GetAll(ctx context.Context, authorId uint, p repository.Pagination) ([]entity.StudentExam, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	exam, meta, err := c.studentExamRepo.PaginationAggregation(tx.Model(&entity.StudentExam{}).Where("author_id = ?", authorId), p)
	if err != nil {
		return exam, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return exam, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentExamUsecase) Search(ctx context.Context, p repository.Pagination, authorId uint, keyword string) ([]entity.StudentExam, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	users, meta, err := c.studentExamRepo.Search(tx, p, authorId, keyword)
	if err != nil {
		return users, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return users, meta, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StudentExamUsecase) DeleteQuestion(ctx context.Context, examId string, authorId uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.StudentExam

	if err := c.studentExamRepo.DeleteByIdAndAuthor(tx, &exam, authorId, examId); err != nil {
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
func (c *StudentExamUsecase) DeleteAllNested(ctx context.Context, authorId uint, examIds string) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.StudentExam

	if err := c.studentExamRepo.DeleteByIdAndAuthorNested(tx, &exam, authorId, examIds); err != nil {
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
func (c *StudentExamUsecase) DeleteQuestionMany(ctx context.Context, authorId uint, examIds []string) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var exam entity.StudentExam

	if err := c.studentExamRepo.DeleteManyAndAuthor(tx, &exam, authorId, examIds); err != nil {
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
