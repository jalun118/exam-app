package entity

import (
	"errors"
	"time"
	"ujian-app/internal/helpers"

	"gorm.io/gorm"
)

type StudentExam struct {
	ID        string        `json:"id" gorm:"primaryKey;autoIncrement:false;unique;size:50"`
	Title     string        `json:"title"`
	AuthorId  uint          `json:"author_id"`
	Author    User          `json:"author" gorm:"foreignKey:AuthorId;references:ID"`
	Quetions  []ExamQuetion `json:"quetions" gorm:"foreignKey:ExamId"`
	CreatedAt time.Time     `json:"created_at"`
	UpdatedAt time.Time     `json:"updated_at"`
}

func (e *StudentExam) BeforeCreate(tx *gorm.DB) (err error) {
	var count int64
	countLoop := 0

	for {
		e.ID = helpers.Generator.Generate(20)

		find := tx.Where(&e, "id").Count(&count)

		errDb, rowAffected := find.Error, find.RowsAffected

		if errors.Is(errDb, gorm.ErrRecordNotFound) || rowAffected == 0 || count == 0 {
			break
		}

		if countLoop > 10 {
			return errors.New("infinite loop")
		}

		countLoop++
	}

	return
}

func (e *StudentExam) BeforeSave(tx *gorm.DB) (err error) {
	e.UpdatedAt = time.Now()
	return
}
