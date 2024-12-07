package models

type CreateUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	RoleId   uint   `json:"role_id"`
}

type UpdateUser struct {
	Username string `json:"username"`
}

type ChangeUserPassword struct {
	Id          uint   `json:"id"`
	NewPassword string `json:"new_password"`
	OldPassword string `json:"old_password"`
}

type ChangeUserRole struct {
	Id     uint   `json:"id"`
	RoleId string `json:"role_id"`
}
