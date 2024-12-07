package entity

import (
	"time"

	"gorm.io/gorm"
)

type AnswerOption struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Option      string    `json:"options"`
	QuetionId   uint      `json:"quetion_id"`
	IndexOption int       `json:"index_option"`
	AuthorId    uint      `json:"author_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (a *AnswerOption) BeforeSave(tx *gorm.DB) (err error) {
	a.UpdatedAt = time.Now()
	return
}
