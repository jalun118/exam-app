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

type StundentClassUsecase struct {
	db               *gorm.DB
	studentClassRepo *repository.StudentClassRepository
	Logger           *loggers.Logger
}

func NewStundentClassUsecase(db *gorm.DB, studentClassRepo *repository.StudentClassRepository) *StundentClassUsecase {
	return &StundentClassUsecase{
		db:               db,
		studentClassRepo: studentClassRepo,
	}
}

// Return Code
//   - DuplicateRecord
//   - DatabaseError
//   - SuccessInsert
func (c *StundentClassUsecase) CreateClass(ctx context.Context, dataClass models.CreateClass) (*entity.StudentClass, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var class entity.StudentClass

	errFind := c.studentClassRepo.FindByClassName(tx, dataClass.ClassName, &class)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.Logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if class.ClassName != "" {
		return nil, constants.DuplicateRecord
	}

	newClass := entity.StudentClass{
		ClassName: dataClass.ClassName,
	}

	if err := c.studentClassRepo.Create(tx, &newClass); err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newClass, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - InternalServerError
//   - DatabaseError
//   - SuccessUpdate
func (c *StundentClassUsecase) Update(ctx context.Context, id uint, dataClass models.UpdateClass) (*entity.StudentClass, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var class entity.StudentClass

	if err := c.studentClassRepo.FindById(tx, &class, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	class.ClassName = dataClass.ClassName

	if err := c.studentClassRepo.Update(tx, &class); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &class, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - InternalServerError
//   - DatabaseError
//   - SuccessRead
func (c *StundentClassUsecase) GetById(ctx context.Context, id uint) (*entity.StudentClass, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var class entity.StudentClass

	if err := c.studentClassRepo.FindById(tx, &class, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &class, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StundentClassUsecase) GetAll(ctx context.Context, p repository.Pagination, not_id uint) ([]entity.StudentClass, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	class, meta, err := c.studentClassRepo.PaginationAggregation(tx.Model(&entity.StudentClass{}), p)
	if err != nil {
		return class, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return class, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StundentClassUsecase) Search(ctx context.Context, p repository.Pagination, not_id uint, keyword string) ([]entity.StudentClass, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	class, meta, err := c.studentClassRepo.Search(tx, p, keyword)
	if err != nil {
		return class, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return class, meta, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StundentClassUsecase) Delete(ctx context.Context, id uint) (*entity.StudentClass, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var class entity.StudentClass

	if err := c.studentClassRepo.DeleteById(tx, &class, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &class, constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StundentClassUsecase) DeleteMany(ctx context.Context, ids []uint) (*entity.StudentClass, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var class entity.StudentClass

	if err := c.studentClassRepo.DeleteMany(tx, &class, ids); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return nil, constants.SuccessDelete
}
