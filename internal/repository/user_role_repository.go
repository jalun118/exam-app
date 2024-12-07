package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type UserRoleRepository struct {
	Repository[entity.UserRole]
}

func NewUserRoleRepository() *UserRoleRepository {
	return &UserRoleRepository{}
}

func (r *UserRoleRepository) FindByName(db *gorm.DB, entity *entity.UserRole, rolename string) error {
	return db.Where("role_name = ?", rolename).Take(entity).Error
}

func (r *UserRoleRepository) FindByTiers(db *gorm.DB, entity *entity.UserRole, tiers int) error {
	return db.Where("tiers = ?", tiers).Take(entity).Error
}
