package entity

import (
	"time"

	"gorm.io/gorm"
)

type StudentAnswer struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	StudentId      uint      `json:"student_id"`
	ExamId         string    `json:"exam_id"`
	DistributionId uint      `json:"distribution_id"`
	Answers        string    `json:"answer"`
	Point          float64   `json:"point"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func (s *StudentAnswer) BeforeSave(tx *gorm.DB) (err error) {
	s.UpdatedAt = time.Now()
	return
}
