package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID            uint       `json:"id" gorm:"primaryKey;autoIncrement"`
	Username      string     `json:"username"`
	Email         string     `json:"email"`
	Password      string     `json:"password"`
	RoleId        uint       `json:"role_id"`
	Role          UserRole   `json:"role" gorm:"foreignKey:RoleId;references:ID"`
	TokenPassword *string    `json:"token_password"`
	TokenExpired  *time.Time `json:"token_expired"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	u.UpdatedAt = time.Now()
	return
}
