package models

type CreateRole struct {
	NameRole string `json:"name_role" validate:"required,alphanumspecial"`
	Tiers    int    `json:"tiers" validate:"required,number"`
}

type UpdatedRole struct {
	NameRole string `json:"name_role" validate:"required,alphanumspecial"`
	Tiers    int    `json:"tiers" validate:"required,number"`
}
