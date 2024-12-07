package models

type CreateExamQuestion struct {
	IndexQuetion int    `json:"index_quetion"`
	Quetion      string `json:"quetion"`
}

type UpdateExamQuestion struct {
	IndexQuetion int    `json:"index_quetion"`
	Quetion      string `json:"quetion"`
}
