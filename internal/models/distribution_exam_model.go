package models

import "time"

type CreateDistributionExam struct {
	ExamId            string    `json:"exam_id"`
	ExamRoom          uint      `json:"exam_room"`
	RandomQuestion    bool      `json:"random_question"`
	RandomOptions     bool      `json:"random_options"`
	DurationExam      int       `json:"duration_exam"`
	NumberOfQuestions int       `json:"number_questions"`
	ExitDuration      int       `json:"exit_duration"`
	StartExam         time.Time `json:"start_exam"`
	EndExam           time.Time `json:"end_exam"`
}

type ChangeDistributionExam struct {
	ExamId   string `json:"exam_id"`
	ExamRoom uint   `json:"exam_room"`
}

type UpdateDistributionExam struct {
	RandomQuestion    bool      `json:"random_question"`
	RandomOptions     bool      `json:"random_options"`
	NumberOfQuestions int       `json:"number_questions"`
	DurationExam      int       `json:"duration_exam"`
	ExitDuration      int       `json:"exit_duration"`
	StartExam         time.Time `json:"start_exam"`
	EndExam           time.Time `json:"end_exam"`
}
