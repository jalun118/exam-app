package app

import (
	"ujian-app/internal/delivery/controllers"
	"ujian-app/internal/delivery/routers"
	"ujian-app/internal/helpers"
	"ujian-app/internal/loggers"
	"ujian-app/internal/repository"
	"ujian-app/internal/usecase"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"gorm.io/gorm"
)

type BootstrapConfig struct {
	DB  *gorm.DB
	App *gin.Engine
	Log *loggers.Logger
}

func AppBootstrap(configs *BootstrapConfig) {

	// validator
	val := validator.New()
	validation := helpers.NewValidation(val)

	// repositorys
	userRoleRepo := repository.NewUserRoleRepository()

	// usecases
	userRoleUsecase := usecase.NewUserRoleUsecase(configs.DB, userRoleRepo, configs.Log)

	// controllers
	userRoleController := controllers.NewUserRoleController(userRoleUsecase, validation)

	routerConfig := routers.Routers{
		App:               configs.App.Group("/api/v1"),
		UseRoleController: userRoleController,
	}

	routerConfig.SetUp()
}
