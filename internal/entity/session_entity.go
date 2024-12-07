package entity

import (
	"errors"
	"time"
	"ujian-app/internal/configs"
	"ujian-app/internal/helpers"

	"gorm.io/gorm"
)

type Session struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	Token     string    `json:"token"`
	UserId    uint      `json:"user_id"`
	ExpiredAt time.Time `json:"expired_at"`
	CreatedAt time.Time `json:"created_at"`
}

func (e *Session) BeforeCreate(tx *gorm.DB) (err error) {
	var count int64
	countLoop := 0

	for {
		e.ID = helpers.Generator.Generate(30)

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

	e.ExpiredAt = time.Now().Add(configs.MAX_AGE_SESSION)
	return
}
