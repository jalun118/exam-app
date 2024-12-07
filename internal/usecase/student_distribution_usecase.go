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

type StudentDistributionUsecase struct {
	db                      *gorm.DB
	studentDistributionRepo *repository.StudentDistributionRepository
	logger                  *loggers.Logger
	examRepo                *repository.StudentExamRepository
	studentRepo             *repository.StudentRepository
}

func NewStudentDistributionUsecase(db *gorm.DB, studentDistributionRepo *repository.StudentDistributionRepository, log *loggers.Logger) *StudentDistributionUsecase {
	return &StudentDistributionUsecase{
		db:                      db,
		studentDistributionRepo: studentDistributionRepo,
		logger:                  log,
	}
}

// Return Code
//   - DatabaseError
//   - ExamNotFound
//   - StudentNotFound
//   - SuccessInsert
func (c *StudentDistributionUsecase) Create(ctx context.Context, data models.CreateStudentDistribution) (*entity.StudentDistribution, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if found, err := c.examRepo.FoundRecordById(tx, data.ExamRoomId); !found {
		if err != nil {
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.ExamNotFound
	}

	if found, err := c.studentRepo.FoundRecordById(tx, data.StudentId); !found {
		if err != nil {
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.StudentNotFound
	}

	newDistribution := entity.StudentDistribution{
		StudentId:  data.StudentId,
		ExamRoomId: data.ExamRoomId,
	}

	if err := c.studentDistributionRepo.Create(tx, &newDistribution); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newDistribution, constants.SuccessInsert
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentDistributionUsecase) GetAll(ctx context.Context) ([]entity.StudentDistribution, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	distribution, errFind := c.studentDistributionRepo.FindAll(tx)
	if errFind != nil {
		c.logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return distribution, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StudentDistributionUsecase) GetAllByExamRoom(ctx context.Context, examRoom uint) ([]entity.StudentDistribution, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	distribution, errFind := c.studentDistributionRepo.FindAllByExamRoom(tx, examRoom)
	if errFind != nil {
		c.logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return distribution, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StudentDistributionUsecase) DeleteById(ctx context.Context, id uint) (*entity.StudentDistribution, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var distribution entity.StudentDistribution

	if err := c.studentDistributionRepo.DeleteById(tx, &distribution, id); err != nil {
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

	return &distribution, constants.SuccessDelete
}

// Return Code
//   - DatabaseError
//   - SuccessDelete
func (c *StudentDistributionUsecase) DeleteAll(ctx context.Context) (int64, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	affect, err := c.studentDistributionRepo.DeleteAllEntities(tx)
	if err != nil {
		c.logger.Error("%v", err)
		return 0, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return 0, constants.DatabaseError
	}

	return affect, constants.SuccessDelete
}
