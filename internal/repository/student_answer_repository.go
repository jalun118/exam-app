package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type StudentAnswerRepository struct {
	Repository[entity.StudentAnswer]
}

func NewStudentAnswerRepository() *StudentAnswerRepository {
	return &StudentAnswerRepository{}
}

func (r *StudentAnswerRepository) FindByStudentId(db *gorm.DB, entity *entity.StudentAnswer, id uint) error {
	return db.Where("student_id = ?", id).Take(entity).Error
}

func (r *StudentAnswerRepository) FindByStudentIdAndExamId(db *gorm.DB, entity *entity.StudentAnswer, id uint, examId string) error {
	return db.Where("exam_id = ? AND student_id = ?", examId, id).Take(entity).Error
}
