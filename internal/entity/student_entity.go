package entity

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	ID             uint         `json:"id" gorm:"primaryKey"`
	Username       string       `json:"username"`
	Password       string       `json:"password"`
	StudentClassId uint         `json:"student_class_id"`
	StudentClass   StudentClass `json:"student_class" gorm:"foreignKey:StudentClassId;references:ID"`
	CreatedAt      time.Time    `json:"created_at"`
	UpdatedAt      time.Time    `json:"updated_at"`
}

func (s *Student) BeforeSave(tx *gorm.DB) (err error) {
	s.UpdatedAt = time.Now()
	return
}
