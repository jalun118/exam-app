package models

type PayloadExamKey struct {
	IndexQuestion int `json:"index_question"`
	IndexAnswer   int `json:"index_answer"`
}

type CreateExamAnswerKey struct {
	ExamKey []PayloadExamKey `json:"exam_key"`
}

type UpdateExamAnswerKey struct {
	ExamKey []PayloadExamKey `json:"exam_key"`
}

type GetExamAnswerKey struct {
	ExamKey []PayloadExamKey `json:"exam_key"`
}
