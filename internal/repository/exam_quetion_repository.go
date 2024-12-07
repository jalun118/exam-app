package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type ExamQuetionRepository struct {
	Repository[entity.ExamQuetion]
}

func NewExamQuetionRepository() *ExamQuetionRepository {
	return &ExamQuetionRepository{}
}

func (r *ExamQuetionRepository) Search(db *gorm.DB, p Pagination, keyword string, entity []*entity.ExamQuetion) (MetaPagination, error) {
	var meta MetaPagination

	queryFn := db.Model(&entity).Where("exam_id LIKE ? OR quetion LIKE ?", parseToSearch(keyword), parseToSearch(keyword))

	errScan := metaPagination(queryFn, p.Limit, &meta)
	if errScan != nil {
		return meta, errScan
	}

	errFind := queryFn.Scopes(Paginate(p)).Find(&entity).Error

	if errFind != nil {
		return meta, errFind
	}
	return meta, nil
}

func (r *ExamQuetionRepository) GetAllOption(db *gorm.DB, entity *entity.ExamQuetion, id_question uint) error {
	return db.Model(entity).Where("id = ?", id_question).Preload("Options").First(&entity).Error
}
