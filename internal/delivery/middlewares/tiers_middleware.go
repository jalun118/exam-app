package middlewares

import (
	"ujian-app/internal/helpers"
	"ujian-app/internal/response"

	"github.com/gin-gonic/gin"
)

func (m *Middlewares) TiersGuard(tiersNum int) gin.HandlerFunc {
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

		if payload.Tiers != tiersNum {
			response.NewResponseUnauthorized(c)
			c.Abort()
			return
		}
	}
}
