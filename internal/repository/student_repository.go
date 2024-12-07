package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type StudentRepository struct {
	Repository[entity.Student]
}

func NewStudentRepository() *StudentRepository {
	return &StudentRepository{}
}

func (r *StudentRepository) GetAllPaginationPreload(db *gorm.DB, p Pagination) ([]entity.Student, MetaPagination, error) {
	var metaPagin MetaPagination
	var datas []entity.Student

	queyChain := db.Model(datas)
	metaError := metaPagination(queyChain, p.Limit, &metaPagin)

	if metaError != nil {
		return datas, metaPagin, metaError
	}

	errFind := queyChain.Scopes(Paginate(p)).Preload("StudentClass").Find(&datas).Error
	if errFind != nil {
		return datas, metaPagin, errFind
	}

	return datas, metaPagin, nil
}

func (r *StudentRepository) Search(db *gorm.DB, p Pagination, keyword string) ([]entity.Student, MetaPagination, error) {
	var meta MetaPagination

	var entity []entity.Student

	queryFn := db.Model(&entity).Where("username LIKE ?", parseToSearch(keyword))

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
