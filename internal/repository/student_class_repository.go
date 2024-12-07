package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type StudentClassRepository struct {
	Repository[entity.StudentClass]
}

func NewStudentClassRepository() *StudentClassRepository {
	return &StudentClassRepository{}
}

func (r *StudentClassRepository) FindByClassName(db *gorm.DB, class_name string, entity *entity.StudentClass) error {
	return r.DB.Where("class_name = ?", class_name).Take(&entity).Error
}

func (r *StudentClassRepository) Search(db *gorm.DB, p Pagination, keyword string) ([]entity.StudentClass, MetaPagination, error) {
	var meta MetaPagination

	var entity []entity.StudentClass

	queryFn := db.Model(&entity).Where("class_name LIKE ?", parseToSearch(keyword))

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
