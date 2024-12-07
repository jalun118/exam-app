package models

type PayloadStudentAnswer struct {
	IndexQuestion int `json:"index_question"`
	IndexOption   int `json:"index_option"`
}

type CreateStudentAnswer struct {
	StudentAnswer  []PayloadStudentAnswer `json:"student_answer"`
	StudentId      uint                   `json:"student_id"`
	ExamId         string                 `json:"exam_id"`
	DistributionId uint                   `json:"distribution_id"`
}
