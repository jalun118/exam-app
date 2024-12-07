package usecase

import (
	"context"
	"errors"
	"time"
	"ujian-app/internal/configs"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type DistributionExamUsecase struct {
	db               *gorm.DB
	distributionRepo *repository.DistributionExamRepository
	ExamRepo         *repository.StudentExamRepository
	RoomRepo         *repository.ExamRoomRepository
	logger           *loggers.Logger
}

func NewDistributionExamUsecase(db *gorm.DB, distributionExamRepo *repository.DistributionExamRepository, ExamRepo *repository.StudentExamRepository, RoomRepo *repository.ExamRoomRepository, log *loggers.Logger) *DistributionExamUsecase {
	return &DistributionExamUsecase{
		db:               db,
		distributionRepo: distributionExamRepo,
		logger:           log,
		ExamRepo:         ExamRepo,
		RoomRepo:         RoomRepo,
	}
}

// Return Code
//   - NotCompleteForm
//   - ExamNotFound
//   - RoomNotFound
//   - TooShortDuration
//   - DatabaseError
//   - SuccessInsert
func (c *DistributionExamUsecase) CreateDistribution(ctx context.Context, dataDistribution models.CreateDistributionExam) (*entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if dataDistribution.ExamId == "" || dataDistribution.ExamRoom == 0 {
		return nil, constants.NotCompleteForm
	}

	if err := c.ExamRepo.FindById(tx, &entity.StudentExam{}, dataDistribution.ExamId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.ExamNotFound
		}

		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.RoomRepo.FindById(tx, &entity.ExamRoom{}, dataDistribution.ExamRoom); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RoomNotFound
		}

		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if dataDistribution.DurationExam == 0 {
		dataDistribution.DurationExam = configs.DEFAULT_DURATION_TEST
	}

	currentTime := time.Now()

	if dataDistribution.StartExam.IsZero() {
		dataDistribution.StartExam = currentTime
	}

	if dataDistribution.EndExam.IsZero() {
		dataDistribution.EndExam = currentTime.Add(time.Duration(dataDistribution.DurationExam) * time.Minute)
	}

	if dataDistribution.StartExam.Add(time.Duration(dataDistribution.DurationExam) * time.Minute).After(dataDistribution.EndExam) {
		return nil, constants.TooShortDuration
	}

	if dataDistribution.NumberOfQuestions < 1 {
		dataDistribution.NumberOfQuestions = 1
	}

	distribution := entity.DistributionExam{
		ExamId:            dataDistribution.ExamId,
		EndExam:           dataDistribution.EndExam,
		ExamRoom:          dataDistribution.ExamRoom,
		StartExam:         dataDistribution.StartExam,
		DurationExam:      dataDistribution.DurationExam,
		ExitDuration:      dataDistribution.ExitDuration,
		RandomOptions:     dataDistribution.RandomOptions,
		RandomQuestion:    dataDistribution.RandomQuestion,
		NumberOfQuestions: dataDistribution.NumberOfQuestions,
	}

	if err := c.distributionRepo.Create(tx, &distribution); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit(); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &distribution, constants.SuccessInsert
}

// Return Code
//   - ExamNotFound
//   - RoomNotFound
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *DistributionExamUsecase) ChangeDistribution(ctx context.Context, id uint, dataChange models.ChangeDistributionExam) (*entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var distribution entity.DistributionExam

	if err := c.distributionRepo.FindById(tx, &distribution, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if found, err := c.ExamRepo.FoundRecordById(tx, dataChange.ExamId); !found {
		if err != nil {
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.ExamNotFound
	}

	if found, err := c.RoomRepo.FoundRecordById(tx, dataChange.ExamRoom); !found {
		if err != nil {
			c.logger.Error("%v", err)
			return nil, constants.DatabaseError
		}
		return nil, constants.RoomNotFound
	}

	distribution.ExamId = dataChange.ExamId
	distribution.ExamRoom = dataChange.ExamRoom

	if err := c.distributionRepo.Update(tx, &distribution); err != nil {
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

	return &distribution, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - TooShortDuration
//   - DatabaseError
//   - SuccessUpdate
func (c *DistributionExamUsecase) UpdateDistribution(ctx context.Context, id uint, dataUpdate models.UpdateDistributionExam) (*entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var distribution entity.DistributionExam

	if err := c.distributionRepo.FindById(tx, &distribution, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	distribution.RandomOptions = dataUpdate.RandomOptions
	distribution.RandomQuestion = dataUpdate.RandomQuestion

	if dataUpdate.NumberOfQuestions > 0 {
		distribution.NumberOfQuestions = dataUpdate.NumberOfQuestions
	}

	if dataUpdate.DurationExam != 0 {
		distribution.DurationExam = dataUpdate.DurationExam
	}

	currentTime := time.Now()

	if !dataUpdate.StartExam.IsZero() {
		distribution.StartExam = dataUpdate.StartExam
	}

	if !dataUpdate.EndExam.IsZero() {
		distribution.EndExam = currentTime.Add(time.Duration(dataUpdate.DurationExam) * time.Minute)
	}

	if distribution.StartExam.Add(time.Duration(distribution.DurationExam) * time.Minute).After(distribution.EndExam) {
		return nil, constants.TooShortDuration
	}

	if dataUpdate.NumberOfQuestions > 0 {
		distribution.NumberOfQuestions = dataUpdate.NumberOfQuestions
	}

	if err := c.distributionRepo.Update(tx, &distribution); err != nil {
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

	return &distribution, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *DistributionExamUsecase) FindAllByRoomId(ctx context.Context, roomId uint) ([]entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	distribution, err := c.distributionRepo.FindAllByRoomId(tx, roomId)
	if err != nil {
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

	return distribution, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *DistributionExamUsecase) FindAllByExamId(ctx context.Context, examId string) ([]entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	distribution, err := c.distributionRepo.FindAllByExamId(tx, examId)
	if err != nil {
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

	return distribution, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *DistributionExamUsecase) DeleteById(ctx context.Context, id uint) (*entity.DistributionExam, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var distribution entity.DistributionExam

	if err := c.distributionRepo.DeleteById(tx, &distribution, id); err != nil {
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
