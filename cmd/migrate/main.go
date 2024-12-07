package main

import (
	"fmt"
	"ujian-app/internal/app"
	"ujian-app/internal/entity"
)

func main() {
	viper := app.NewViper()

	db := app.NewDatabase(viper)

	errMigate := db.AutoMigrate(
		&entity.UserRole{},
		&entity.User{},
		&entity.StudentClass{},
		&entity.Student{},
		&entity.StudentExam{},
		&entity.ExamQuetion{},
		&entity.AnswerOption{},
		&entity.ExamAnswerKey{},
		&entity.ExamRoom{},
		&entity.DistributionExam{},
		&entity.StudentAnswer{},
		&entity.StudentDistribution{},
		&entity.Session{},
	)

	if errMigate != nil {
		fmt.Println(errMigate)
	}

}
