package middlewares

import (
	"ujian-app/internal/helpers"
	"ujian-app/internal/usecase"
)

type Middlewares struct {
	sessionUsecase *usecase.SessionUsecase
	userUsecase    *usecase.UserUsecase
	baseToken      *helpers.BaseTokenAuth
}

func NewMiddlewares(sessionUsecase *usecase.SessionUsecase, baseToken *helpers.BaseTokenAuth) *Middlewares {
	return &Middlewares{
		sessionUsecase: sessionUsecase,
		baseToken:      baseToken,
	}
}
