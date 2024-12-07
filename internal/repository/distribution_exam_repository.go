package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type DistributionExamRepository struct {
	Repository[entity.DistributionExam]
}

func NewDistributionExamRepository() *DistributionExamRepository {
	return &DistributionExamRepository{}
}

func (r *DistributionExamRepository) Search(db *gorm.DB, p Pagination, keyword string, entity []*entity.DistributionExam) (MetaPagination, error) {
	var meta MetaPagination

	queryFn := db.Model(&entity).Where("exam_id LIKE ?", parseToSearch(keyword))

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

func (r *DistributionExamRepository) FindByExamRoomId(db *gorm.DB, entity *entity.DistributionExam, id uint) error {
	return db.Where("exam_room = ?", id).Take(entity).Error
}

func (r *DistributionExamRepository) FindAllByRoomId(db *gorm.DB, id uint) ([]entity.DistributionExam, error) {
	var distribution []entity.DistributionExam
	if err := db.Where("exam_room = ?", id).Find(&distribution).Error; err != nil {
		return nil, err
	}
	return distribution, nil
}

func (r *DistributionExamRepository) FindAllByExamId(db *gorm.DB, id string) ([]entity.DistributionExam, error) {
	var distribution []entity.DistributionExam
	if err := db.Where("exam_id = ?", id).Find(&distribution).Error; err != nil {
		return nil, err
	}
	return distribution, nil
}
