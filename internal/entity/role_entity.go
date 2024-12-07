package entity

import (
	"time"

	"gorm.io/gorm"
)

type UserRole struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	RoleName  string    `json:"role_name" gorm:"not null"`
	Tiers     int       `json:"tiers" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (r *UserRole) BeforeSave(tx *gorm.DB) (err error) {
	r.UpdatedAt = time.Now()
	return
}
