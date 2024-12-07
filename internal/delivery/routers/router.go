package routers

import (
	"ujian-app/internal/delivery/controllers"

	"github.com/gin-gonic/gin"
)

type Routers struct {
	App               *gin.RouterGroup
	UseRoleController *controllers.UserRoleController
}

func (r *Routers) SetUp() {
	r.SetupUserRoleRoute()
}

func (r *Routers) SetupUserRoleRoute() {
	group := r.App.Group("/user-role")
	group.POST("", r.UseRoleController.CreateRole)
	group.GET("", r.UseRoleController.GetAllPagination)
	group.GET("/all", r.UseRoleController.GetAll)
	group.GET("/:id", r.UseRoleController.GetOne)
	group.PUT("/:id", r.UseRoleController.Update)
	group.DELETE("/:id", r.UseRoleController.DeleteOne)
}
