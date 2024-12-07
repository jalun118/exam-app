package middlewares

import (
	"context"
	"time"
	"ujian-app/internal/constants"
	"ujian-app/internal/helpers"
	"ujian-app/internal/response"

	"github.com/gin-gonic/gin"
)

func (m *Middlewares) Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if !helpers.IsLogin(c) {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}

		refreshToken := helpers.GetCookieRefreshToken(c)

		payload, err := m.baseToken.GetToken(refreshToken)
		if err != nil {
			response.NewResponseInternalServerError(c)
			c.Abort()
			return
		}

		if time.Now().Before(payload.ExpiredAt) {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}

		sessionId := helpers.GetCookieId(c)

		if _, resNum := m.sessionUsecase.GetTokenById(ctx, sessionId); resNum != constants.SuccessRead {
			if resNum == constants.RecordNotFound {
				response.NewResponseUnauthorized(c)
				c.Abort()
				return
			}
			response.NewResponseInternalServerError(c)
			c.Abort()
			return
		}

		if _, resNum := m.userUsecase.GetOne(ctx, payload.UserId); resNum != constants.SuccessRead {
			if resNum == constants.RecordNotFound {
				response.NewResponseUnauthorized(c)
				c.Abort()
				return
			}
			response.NewResponseInternalServerError(c)
			c.Abort()
			return
		}
	}
}
