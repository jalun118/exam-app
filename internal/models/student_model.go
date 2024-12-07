package models

type CreateStudent struct {
	Username string `json:"username"`
	Password string `json:"password"`
	ClassId  uint   `json:"class_id"`
}

type UpdateStudent struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
