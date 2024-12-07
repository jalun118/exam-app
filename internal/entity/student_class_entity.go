package entity

import (
	"time"

	"gorm.io/gorm"
)

type StudentClass struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ClassName string    `json:"class_name" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (s *StudentClass) BeforeSave(tx *gorm.DB) (err error) {
	s.UpdatedAt = time.Now()
	return
}
