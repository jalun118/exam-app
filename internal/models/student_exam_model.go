package models

type CreateNewExam struct {
	Title string `json:"title"`
}

type UpdateExam struct {
	Title string `json:"title"`
}
