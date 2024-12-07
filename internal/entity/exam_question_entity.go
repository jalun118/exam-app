package entity

import (
	"time"

	"gorm.io/gorm"
)

type ExamQuetion struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	ExamId       string         `json:"exam_id"`
	IndexQuetion int            `json:"index_quetion"`
	Quetion      string         `json:"quetion"`
	Options      []AnswerOption `json:"options" gorm:"foreignKey:QuetionId"`
	AuthorId     uint           `json:"author_id"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
}

func (e *ExamQuetion) BeforeSave(tx *gorm.DB) (err error) {
	e.UpdatedAt = time.Now()
	return
}
