package usecase

import (
	"context"
	"errors"
	"strings"
	"time"
	"ujian-app/internal/configs"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/helpers"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type ExamRoomUsecase struct {
	db           *gorm.DB
	logger       *loggers.Logger
	examRoomRepo *repository.ExamRoomRepository
}

func NewExamRoomUsecase(db *gorm.DB, log *loggers.Logger, examRoomRepo *repository.ExamRoomRepository) *ExamRoomUsecase {
	return &ExamRoomUsecase{
		db:           db,
		logger:       log,
		examRoomRepo: examRoomRepo,
	}
}

// Return Code
//   - NotCompleteForm
//   - DuplicateRecord
//   - DatabaseError
//   - SuccessInsert
func (c *ExamRoomUsecase) CreateRoom(ctx context.Context, dataRoom models.CreateExamRoom) (*entity.ExamRoom, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if dataRoom.RoomName == "" {
		return nil, constants.NotCompleteForm
	}

	errFind := c.examRoomRepo.FindByName(tx, &entity.ExamRoom{}, strings.ToLower(dataRoom.RoomName))
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	newRoom := entity.ExamRoom{
		RoomName:  strings.ToLower(dataRoom.RoomName),
		TokenExam: helpers.Generator.GenerateAlphabetUpper(8),
	}

	if err := c.examRoomRepo.Create(tx, &newRoom); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newRoom, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *ExamRoomUsecase) GetRoomById(ctx context.Context, id uint) (*entity.ExamRoom, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var room entity.ExamRoom

	if err := c.examRoomRepo.FindById(tx, &room, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &room, constants.SuccessRead
}

// Return Code
//   - NotCompleteForm
//   - RecordNotFound
//   - DatabaseError
//   - DuplicateRecord
//   - SuccessUpdate
func (c *ExamRoomUsecase) UpdateRoom(ctx context.Context, id uint, dataRoom models.UpdateExamRoom) (*entity.ExamRoom, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if dataRoom.RoomName == "" {
		return nil, constants.NotCompleteForm
	}

	var room entity.ExamRoom

	if err := c.examRoomRepo.FindById(tx, &room, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	room.RoomName = dataRoom.RoomName
	room.TokenExam = helpers.Generator.GenerateAlphabetUpper(8)
	room.TokenExpired = time.Now().Add(configs.DURATION_TOKEN_ROOM)

	errFind := c.examRoomRepo.FindByNameAndNotId(tx, &entity.ExamRoom{}, strings.ToLower(dataRoom.RoomName), room.ID)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if err := c.examRoomRepo.Update(tx, &room); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &room, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *ExamRoomUsecase) UpdateTokenRoom(ctx context.Context, id uint) (*entity.ExamRoom, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var room entity.ExamRoom

	if err := c.examRoomRepo.FindById(tx, &room, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	room.TokenExam = helpers.Generator.GenerateAlphabetUpper(8)
	room.TokenExpired = time.Now().Add(configs.DURATION_TOKEN_ROOM)

	if err := c.examRoomRepo.Update(tx, &room); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &room, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *ExamRoomUsecase) DeleteById(ctx context.Context, id uint) (*entity.ExamRoom, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var room entity.ExamRoom

	if err := c.examRoomRepo.DeleteById(tx, &room, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &room, constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *ExamRoomUsecase) DeleteMany(ctx context.Context, ids []uint) (int64, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var effect int64

	if err := c.examRoomRepo.DeleteManyWithCount(tx, &entity.ExamRoom{}, ids, effect); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 0, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return 0, constants.DatabaseError
	}

	if err := c.db.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return 0, constants.DatabaseError
	}

	return effect, constants.SuccessDelete
}
