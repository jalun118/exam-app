package middlewares

import (
	"time"
	"ujian-app/internal/helpers"
	"ujian-app/internal/response"

	"github.com/gin-gonic/gin"
)

func (m *Middlewares) TokenGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !helpers.IsLogin(c) {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}

		tokenAuth := helpers.GetCookieTokenAuth(c)

		payload, err := m.baseToken.GetToken(tokenAuth)
		if err != nil {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}

		if time.Now().After(payload.ExpiredAt) {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}
	}

}
