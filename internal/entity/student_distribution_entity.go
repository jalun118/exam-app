package entity

import (
	"time"

	"gorm.io/gorm"
)

type StudentDistribution struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	StudentId  uint      `json:"student_id"`
	ExamRoomId uint      `json:"exam_room_id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func (s *StudentDistribution) BeforeSave(tx *gorm.DB) (err error) {
	s.UpdatedAt = time.Now()
	return
}
