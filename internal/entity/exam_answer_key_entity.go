package entity

import (
	"time"

	"gorm.io/gorm"
)

type ExamAnswerKey struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	AuthorId  uint      `json:"author_id"`
	ExamId    string    `json:"exam_id"`
	KeyAnswer string    `json:"key_answer"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (e *ExamAnswerKey) BeforeSave(tx *gorm.DB) (err error) {
	e.UpdatedAt = time.Now()
	return
}
