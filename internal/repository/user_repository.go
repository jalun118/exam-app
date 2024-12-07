package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type UserRepository struct {
	Repository[entity.User]
}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r *UserRepository) FindByEmail(db *gorm.DB, entity *entity.User, email string) error {
	return db.Where("email = ?", email).Take(&entity).Error
}

func (r *UserRepository) FindByIdAndPreload(db *gorm.DB, entity *entity.User, id uint) error {
	return db.Where("id = ?", id).Preload("Role").Take(&entity).Error
}

func (r *UserRepository) Search(db *gorm.DB, p Pagination, keyword string) ([]entity.User, MetaPagination, error) {
	var meta MetaPagination

	var entity []entity.User

	queryFn := db.Model(&entity).Where("username LIKE ? OR email LIKE ? OR role_id LIKE ?", parseToSearch(keyword), parseToSearch(keyword), parseToSearch(keyword))

	errScan := metaPagination(queryFn, p.Limit, &meta)
	if errScan != nil {
		return entity, meta, errScan
	}

	errFind := queryFn.Scopes(Paginate(p)).Find(&entity).Error

	if errFind != nil {
		return entity, meta, errFind
	}
	return entity, meta, nil
}
