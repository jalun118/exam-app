package entity

import (
	"time"

	"gorm.io/gorm"
)

type DistributionExam struct {
	ID                uint      `json:"id" gorm:"primaryKey"`
	ExamId            string    `json:"exam_id"`
	ExamRoom          uint      `json:"exam_room"`
	NumberOfQuestions int       `json:"number_questions"`
	RandomQuestion    bool      `json:"random_question"`
	RandomOptions     bool      `json:"random_options"`
	DurationExam      int       `json:"duration_exam"`
	ExitDuration      int       `json:"exit_duration"`
	StartExam         time.Time `json:"start_exam"`
	EndExam           time.Time `json:"end_exam"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

func (d *DistributionExam) BeforeSave(tx *gorm.DB) (err error) {
	d.UpdatedAt = time.Now()
	return
}
