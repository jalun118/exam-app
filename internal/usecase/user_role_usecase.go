package usecase

import (
	"context"
	"errors"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type UserRoleUsecase struct {
	DB           *gorm.DB
	UserRoleRepo *repository.UserRoleRepository
	Logger       *loggers.Logger
}

func NewUserRoleUsecase(db *gorm.DB, UserRoleRepo *repository.UserRoleRepository, log *loggers.Logger) *UserRoleUsecase {
	return &UserRoleUsecase{
		DB:           db,
		UserRoleRepo: UserRoleRepo,
		Logger:       log,
	}
}

func (c *UserRoleUsecase) CreateDefaultRole(ctx context.Context, role_name string, tiers int) (*entity.UserRole, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if role_name == "" || tiers == 0 {
		return nil, constants.NotCompleteForm
	}

	var role entity.UserRole

	errFind := c.UserRoleRepo.FindByName(tx, &role, role_name)
	if errFind == nil {
		return &role, constants.SuccessInsert
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.Logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	newRole := entity.UserRole{
		RoleName: role_name,
		Tiers:    tiers,
	}

	if err := c.UserRoleRepo.Repository.Create(tx, &newRole); err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newRole, constants.SuccessInsert
}

// Return Code
//   - NotCompleteForm
//   - DuplicateRecord
//   - DatabaseError
//   - SuccessInsert
func (c *UserRoleUsecase) CreateNewRole(ctx context.Context, role_name string, tiers int) (*entity.UserRole, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if role_name == "" || tiers == 0 {
		return nil, constants.NotCompleteForm
	}

	errFind := c.UserRoleRepo.FindByName(tx, &entity.UserRole{}, role_name)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.Logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	newRole := entity.UserRole{
		RoleName: role_name,
		Tiers:    tiers,
	}

	if err := c.UserRoleRepo.Repository.Create(tx, &newRole); err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newRole, constants.SuccessInsert
}

// Return Code
//   - NotCompleteForm
//   - RecordNotFound
//   - DatabaseError
//   - SuccessUpdate
func (c *UserRoleUsecase) UpdateRole(ctx context.Context, id uint, role_name string, tiers int) (*entity.UserRole, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if role_name == "" || tiers == 0 || id == 0 {
		return nil, constants.NotCompleteForm
	}

	var userRole entity.UserRole

	if err := c.UserRoleRepo.FindById(tx, &userRole, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	userRole.RoleName = role_name
	userRole.Tiers = tiers

	if err := c.UserRoleRepo.Update(tx, &userRole); err != nil {
		c.Logger.Error("%v", err.Error())
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &userRole, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *UserRoleUsecase) GetOne(ctx context.Context, id uint) (*entity.UserRole, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var role entity.UserRole

	if err := c.UserRoleRepo.FindById(tx, &role, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &role, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *UserRoleUsecase) GetAllPagination(ctx context.Context, limit int, page int, sort string, sortBy string) ([]entity.UserRole, repository.MetaPagination, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	role, meta, err := c.UserRoleRepo.GetAllPagination(tx, repository.Pagination{
		Limit:   limit,
		Page:    page,
		Sort:    sort,
		OrderBy: sortBy,
	})

	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, meta, constants.DatabaseError
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return role, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *UserRoleUsecase) GetAll(ctx context.Context) ([]entity.UserRole, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	roles, err := c.UserRoleRepo.GetAll(tx)
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.DatabaseError
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return roles, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *UserRoleUsecase) Delete(ctx context.Context, id uint) int {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.UserRoleRepo.DeleteById(tx, &entity.UserRole{}, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return constants.RecordNotFound
		}
		return constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return constants.DatabaseError
	}

	return constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *UserRoleUsecase) DeleteMany(ctx context.Context, ids []uint) int {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.UserRoleRepo.DeleteMany(tx, &entity.UserRole{}, ids); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return constants.RecordNotFound
		}
		return constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return constants.DatabaseError
	}

	return constants.SuccessDelete
}
