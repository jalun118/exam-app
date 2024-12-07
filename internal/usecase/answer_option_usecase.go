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

type AnswerOptionUsecase struct {
	db               *gorm.DB
	logger           *loggers.Logger
	answerOptionRepo *repository.AnswerOptionRepository
}

func NewAnswerOptionUsecase(db *gorm.DB, answerOptionRepo *repository.AnswerOptionRepository, log *loggers.Logger) *AnswerOptionUsecase {
	return &AnswerOptionUsecase{
		db:               db,
		logger:           log,
		answerOptionRepo: answerOptionRepo,
	}
}

// Return Code
//   - DatabaseError
//   - SuccessInsert
func (c *AnswerOptionUsecase) CreateNewOption(ctx context.Context, questionId uint, authorId uint, dataOption models.CreateAnswerOption) (*entity.AnswerOption, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	option := entity.AnswerOption{
		Option:      dataOption.Option,
		IndexOption: dataOption.IndexOption,
		QuetionId:   questionId,
		AuthorId:    authorId,
	}

	if err := c.answerOptionRepo.Create(tx, &option); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &option, constants.SuccessInsert
}

// Return Code
//   - DatabaseError
//   - SuccessInsert
func (c *AnswerOptionUsecase) CreateNewOptionMany(ctx context.Context, questionId uint, authorId uint, dataOptions []models.CreateAnswerOption) ([]*entity.AnswerOption, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var options []*entity.AnswerOption

	for i, v := range dataOptions {
		options = append(options, &entity.AnswerOption{
			Option:      v.Option,
			QuetionId:   questionId,
			IndexOption: i,
			AuthorId:    authorId,
		})
	}

	if err := c.answerOptionRepo.MultipleCreate(tx, &options); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return options, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *AnswerOptionUsecase) UpdateOption(ctx context.Context, answerOptionId uint, authorId uint, dataOption models.UpdateAnswerOption) (*entity.AnswerOption, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var option entity.AnswerOption

	if err := c.answerOptionRepo.FindByIdAndAuthor(tx, &option, authorId, answerOptionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	option.IndexOption = dataOption.IndexOption
	option.Option = dataOption.Option

	if err := c.answerOptionRepo.Update(tx, &option); err != nil {
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
func (c *AnswerOptionUsecase) DeleteAnswerOption(ctx context.Context, authorId uint, answerOptionId uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var option entity.AnswerOption

	if err := c.answerOptionRepo.DeleteByIdAndAuthor(tx, &option, authorId, answerOptionId); err != nil {
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
func (c *AnswerOptionUsecase) DeleteAnswerOptionMany(ctx context.Context, authorId uint, answerOptionIds []uint) int {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var option entity.AnswerOption

	if err := c.answerOptionRepo.DeleteManyAndAuthor(tx, &option, authorId, answerOptionIds); err != nil {
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
