package main

import (
	"context"
	"os"
	"time"
	"ujian-app/internal/app"
	"ujian-app/internal/constants"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"
	"ujian-app/internal/usecase"
)

func main() {
	viper := app.NewViper()

	db := app.NewDatabase(viper)

	log := loggers.New(os.Stdout)

	userRoleRepo := repository.NewUserRoleRepository()
	userRole := usecase.NewUserRoleUsecase(db, userRoleRepo, log)

	userRepo := repository.NewUserRepository()
	userUsecase := usecase.NewUserUsecase(db, userRepo, userRoleRepo, log)
	tx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	role, rNum := userRole.CreateDefaultRole(tx, "admin", 1)
	if rNum != constants.SuccessInsert {
		log.Error("%v", rNum)
		return
	}

	log.Info("%v", role)

	user, rNum := userUsecase.CreateDefaultUser(tx, models.CreateUser{
		Username: "admin",
		Email:    "admin@gmail.com",
		Password: "12345",
		RoleId:   role.ID,
	})
	if rNum != constants.SuccessInsert {
		log.Error("%v", rNum)
		return
	}

	log.Info("%v", user)
}
