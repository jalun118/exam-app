package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type AnswerOptionRepository struct {
	Repository[entity.AnswerOption]
}

func NewAnswerOptionRepository() *AnswerOptionRepository {
	return &AnswerOptionRepository{}
}

func (r *AnswerOptionRepository) Search(db *gorm.DB, p Pagination, keyword string, entity []*entity.AnswerOption) (MetaPagination, error) {
	var meta MetaPagination

	queryFn := db.Model(&entity).Where("options LIKE ? OR quetion_id LIKE ?", parseToSearch(keyword), parseToSearch(keyword))

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
