package entity

import (
	"time"

	"gorm.io/gorm"
)

type ExamRoom struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	RoomName     string    `json:"room_name"`
	TokenExam    string    `json:"token_exam"`
	TokenExpired time.Time `json:"token_expired"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func (e *ExamRoom) BeforeSave(tx *gorm.DB) (err error) {
	e.UpdatedAt = time.Now()

	return
}
