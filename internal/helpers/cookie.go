package helpers

import (
	"ujian-app/internal/configs"

	"github.com/gin-gonic/gin"
)

type CookieAuth struct {
	RefreshToken   string
	IdRefreshToken string
}

// SID = IdRefreshToken
// NID = RefreshToken
// BSTA = Token Auth

func SetCookieAuth(c *gin.Context, data CookieAuth) {
	c.SetCookie("SID", data.IdRefreshToken, int(configs.MAX_AGE_SESSION), configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
	c.SetCookie("NID", data.RefreshToken, int(configs.MAX_AGE_SESSION), configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
}

func SetTokenAuth(c *gin.Context, newToken string) {
	c.SetCookie("BSTA", newToken, int(configs.MAX_AGE_TOKEN), configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
}

func DeleteCookieAuth(c *gin.Context, newToken string) {
	c.SetCookie("SID", "", -1, configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
	c.SetCookie("NID", "", -1, configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
	c.SetCookie("BSTA", "", -1, configs.PATH, configs.DOMAIN, configs.SECURE, configs.HTTP_ONLY)
}

func GetCookieId(c *gin.Context) string {
	id, _ := c.Cookie("SID")
	return id
}

func GetCookieRefreshToken(c *gin.Context) string {
	id, _ := c.Cookie("NID")
	return id
}

func GetCookieTokenAuth(c *gin.Context) string {
	id, _ := c.Cookie("BSTA")
	return id
}

func IsLogin(c *gin.Context) bool {
	sessionId, _ := c.Cookie("SID")
	refreshToken, _ := c.Cookie("NID")

	if sessionId != "" && refreshToken != "" {
		return true
	}
	return false
}
