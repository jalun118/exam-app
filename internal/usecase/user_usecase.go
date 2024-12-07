package usecase

import (
	"context"
	"errors"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserUsecase struct {
	DB           *gorm.DB
	UserRepo     *repository.UserRepository
	UserRoleRepo *repository.UserRoleRepository
	Logger       *loggers.Logger
}

func NewUserUsecase(db *gorm.DB, UserRepo *repository.UserRepository, UserRoleRepo *repository.UserRoleRepository, log *loggers.Logger) *UserUsecase {
	return &UserUsecase{
		DB:           db,
		UserRepo:     UserRepo,
		UserRoleRepo: UserRoleRepo,
		Logger:       log,
	}
}

// Return Code
//   - NotCompleteForm
//   - DuplicateRecord
//   - DatabaseError
//   - RoleNotFound
//   - InternalServerError
//   - SuccessInsert
func (c *UserUsecase) CreateDefaultUser(ctx context.Context, dataUser models.CreateUser) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if dataUser.Email == "" || dataUser.Username == "" || dataUser.Password == "" || dataUser.RoleId == 0 {
		return nil, constants.NotCompleteForm
	}

	errFind := c.UserRepo.FindByEmail(tx, &entity.User{}, dataUser.Email)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.Logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if found, err := c.UserRoleRepo.FoundRecordById(tx, dataUser.RoleId); !found {
		if errors.Is(err, gorm.ErrRecordNotFound) || !found {
			return nil, constants.RoleNotFound
		}
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(dataUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, constants.InternalServerError
	}

	newUser := entity.User{
		Username: dataUser.Username,
		Email:    dataUser.Email,
		Password: string(hashPassword),
		RoleId:   dataUser.RoleId,
	}

	if err := c.UserRepo.Create(tx, &newUser); err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newUser, constants.SuccessInsert
}

// Return Code
//   - NotCompleteForm
//   - DuplicateRecord
//   - DatabaseError
//   - RoleNotFound
//   - InternalServerError
//   - SuccessInsert
func (c *UserUsecase) CreateUser(ctx context.Context, dataUser models.CreateUser) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if dataUser.Email == "" || dataUser.Username == "" || dataUser.Password == "" || dataUser.RoleId == 0 {
		return nil, constants.NotCompleteForm
	}

	errFind := c.UserRepo.FindByEmail(tx, &entity.User{}, dataUser.Email)
	if errFind == nil {
		return nil, constants.DuplicateRecord
	}
	if !errors.Is(errFind, gorm.ErrRecordNotFound) {
		c.Logger.Error("%v", errFind)
		return nil, constants.DatabaseError
	}

	if found, err := c.UserRoleRepo.FoundRecordById(tx, dataUser.RoleId); !found {
		if errors.Is(err, gorm.ErrRecordNotFound) || !found {
			return nil, constants.RoleNotFound
		}
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(dataUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.InternalServerError
	}

	newUser := entity.User{
		Username: dataUser.Username,
		Email:    dataUser.Email,
		Password: string(hashPassword),
		RoleId:   dataUser.RoleId,
	}

	if err := c.UserRepo.Create(tx, &newUser); err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newUser, constants.SuccessInsert
}

// Return Code
//   - NotCompleteForm
//   - RecordNotFound
//   - DatabaseError
//   - ErrorInsert
//   - SuccessInsert
func (c *UserUsecase) Updated(ctx context.Context, id uint, dataUser models.UpdateUser) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var user entity.User

	if dataUser.Username == "" {
		return nil, constants.NotCompleteForm
	}

	if err := c.UserRepo.FindById(tx, &user, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	user.Username = dataUser.Username

	if err := c.UserRepo.Update(tx, &user); err != nil {
		return nil, constants.ErrorInsert
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &user, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *UserUsecase) GetOne(ctx context.Context, id uint) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var user entity.User

	if err := c.UserRepo.FindById(tx, &user, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &user, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *UserUsecase) GetAll(ctx context.Context, p repository.Pagination, not_id uint) ([]entity.User, repository.MetaPagination, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	users, meta, err := c.UserRepo.PaginationAggregation(tx.Model(&entity.User{}).Not("id = ?", not_id), p)
	if err != nil {
		return users, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return users, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *UserUsecase) Search(ctx context.Context, p repository.Pagination, not_id uint, keyword string) ([]entity.User, repository.MetaPagination, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	users, meta, err := c.UserRepo.Search(tx, p, keyword)
	if err != nil {
		return users, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return users, meta, constants.SuccessRead
}

// Return Code
//   - NotCompleteForm
//   - RecordNotFound
//   - DatabaseError
//   - PasswordNotMatch
//   - InternalServerError
//   - SuccessUpdate
func (c *UserUsecase) ChangePassword(ctx context.Context, changeData models.ChangeUserPassword) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var user entity.User

	if changeData.NewPassword == "" || changeData.OldPassword == "" {
		return nil, constants.NotCompleteForm
	}

	if err := c.UserRepo.FindById(tx, &user, changeData.Id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	errCompare := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(changeData.OldPassword))
	if errCompare != nil {
		return nil, constants.PasswordNotMatch
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(changeData.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return nil, constants.InternalServerError
	}

	user.Password = string(hashPassword)

	if err := c.UserRepo.Update(tx, &user); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &user, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - RoleNotFound
//   - SuccessUpdate
func (c *UserUsecase) ChangeRole(ctx context.Context, changeRole models.ChangeUserRole) (*entity.User, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var user entity.User

	if err := c.UserRepo.FindById(tx, &user, changeRole.Id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	var userRole entity.UserRole

	if err := c.UserRoleRepo.FindById(tx, &userRole, changeRole.RoleId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RoleNotFound
		}
		return nil, constants.DatabaseError
	}

	user.RoleId = changeRole.Id

	if err := c.UserRepo.Update(tx, &user); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RoleNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.Logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &user, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *UserUsecase) Delete(ctx context.Context, id uint) int {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.UserRepo.DeleteById(tx, &entity.User{}, id); err != nil {
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
func (c *UserUsecase) DeleteMany(ctx context.Context, ids []uint) int {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.UserRepo.DeleteMany(tx, &entity.User{}, ids); err != nil {
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
