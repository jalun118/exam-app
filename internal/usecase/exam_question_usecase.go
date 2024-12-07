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

type ExamQuestionUsecase struct {
	db               *gorm.DB
	logger           *loggers.Logger
	examQuestionRepo *repository.ExamQuetionRepository
}

func NewExamQuestionUsecase(db *gorm.DB, examQuestionRepo *repository.ExamQuetionRepository, log *loggers.Logger) *ExamQuestionUsecase {
	return &ExamQuestionUsecase{
		db:               db,
		logger:           log,
		examQuestionRepo: examQuestionRepo,
	}
}

// Return Code
//   - DatabaseError
//   - SuccessInsert
func (c *ExamQuestionUsecase) CreateNewQuestion(ctx context.Context, examId string, authorId uint, dataQuestion models.CreateExamQuestion) (*entity.ExamQuetion, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	question := entity.ExamQuetion{
		ExamId:       examId,
		IndexQuetion: dataQuestion.IndexQuetion,
		Quetion:      dataQuestion.Quetion,
		AuthorId:     authorId,
	}

	if err := c.examQuestionRepo.Create(tx, &question); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &question, constants.SuccessInsert
}

// Return Code
//   - DatabaseError
//   - SuccessInsert
func (c *ExamQuestionUsecase) CreateNewQuestionMany(ctx context.Context, examId string, authorId uint, dataQuestion []models.CreateExamQuestion) ([]*entity.ExamQuetion, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var question []*entity.ExamQuetion

	for i, v := range dataQuestion {
		question = append(question, &entity.ExamQuetion{
			IndexQuetion: i,
			Quetion:      v.Quetion,
			ExamId:       examId,
			AuthorId:     authorId,
		})
	}

	if err := c.examQuestionRepo.MultipleCreate(tx, &question); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return question, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *ExamQuestionUsecase) UpdateQuestion(ctx context.Context, questionId uint, authorId uint, dataQuestion models.UpdateExamQuestion) (*entity.ExamQuetion, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var option entity.ExamQuetion

	if err := c.examQuestionRepo.FindByIdAndAuthor(tx, &option, authorId, questionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	option.IndexQuetion = dataQuestion.IndexQuetion
	option.Quetion = dataQuestion.Quetion

	if err := c.examQuestionRepo.Update(tx, &option); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &option, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *ExamQuestionUsecase) DeleteQuestion(ctx context.Context, questionId uint, authorId uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var question entity.ExamQuetion

	if err := c.examQuestionRepo.DeleteByIdAndAuthor(tx, &question, authorId, questionId); err != nil {
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
func (c *ExamQuestionUsecase) DeleteQuestionMany(ctx context.Context, authorId uint, questionIds []uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var question entity.ExamQuetion

	if err := c.examQuestionRepo.DeleteManyAndAuthor(tx, &question, authorId, questionIds); err != nil {
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
