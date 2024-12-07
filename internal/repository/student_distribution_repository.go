package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type StudentDistributionRepository struct {
	Repository[entity.StudentDistribution]
}

func NewStudentDistributionRepository() *StudentDistributionRepository {
	return &StudentDistributionRepository{}
}

func (r *StudentDistributionRepository) FindByStudentId(db *gorm.DB, entity *entity.StudentDistribution, id uint) error {
	return db.Where("student_id = ?", id).Take(entity).Error
}

func (r *StudentDistributionRepository) FindAll(db *gorm.DB) ([]entity.StudentDistribution, error) {
	var distribution []entity.StudentDistribution
	if err := db.Model(&distribution).Find(&distribution).Error; err != nil {
		return nil, err
	}
	return distribution, nil
}

func (r *StudentDistributionRepository) FindAllByExamRoom(db *gorm.DB, examRoomId uint) ([]entity.StudentDistribution, error) {
	var distribution []entity.StudentDistribution
	if err := db.Where("exam_room_id = ?", examRoomId).Find(&distribution).Error; err != nil {
		return nil, err
	}
	return distribution, nil
}
