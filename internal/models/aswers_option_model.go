package models

type CreateAnswerOption struct {
	Option      string `json:"option"`
	IndexOption int    `json:"index_option"`
}

type UpdateAnswerOption struct {
	Option      string `json:"option"`
	IndexOption int    `json:"index_option"`
}
