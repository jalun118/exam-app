package usecase

import (
	"context"
	"errors"
	"time"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/helpers"
	"ujian-app/internal/loggers"
	"ujian-app/internal/repository"

	"gorm.io/gorm"
)

type SessionUsecase struct {
	DB            *gorm.DB
	userRepo      *repository.UserRepository
	sessionRepo   *repository.SessionRepository
	tokenAuth     *helpers.BaseTokenAuth
	logger        loggers.Logger
	maxAgeSession time.Duration
}

func NewSessionUsecase(db *gorm.DB, sessionRepo *repository.SessionRepository, userRepo *repository.UserRepository, baseTokenAuth *helpers.BaseTokenAuth, maxAgeSession time.Duration, log loggers.Logger) *SessionUsecase {
	return &SessionUsecase{
		DB:            db,
		userRepo:      userRepo,
		logger:        log,
		sessionRepo:   sessionRepo,
		tokenAuth:     baseTokenAuth,
		maxAgeSession: maxAgeSession,
	}
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - InternalServerError
//   - SuccessInsert
func (c *SessionUsecase) CreateSession(ctx context.Context, userId uint) (*entity.Session, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var user entity.User

	if err := c.userRepo.FindByIdAndPreload(tx, &user, userId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	token, err := c.tokenAuth.CreateTokenAuth(helpers.CreateNewToken{
		UserId: userId,
		Email:  user.Email,
		Tiers:  user.Role.Tiers,
	})
	if err != nil {
		return nil, constants.InternalServerError
	}

	newSession := entity.Session{
		Token:     token,
		UserId:    userId,
		ExpiredAt: time.Now().Add(c.maxAgeSession),
	}

	if err := c.sessionRepo.Create(tx, &newSession); err != nil {
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &newSession, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessRead
func (c *SessionUsecase) GetTokenById(ctx context.Context, sessionId string) (*entity.Session, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var session entity.Session

	if err := c.sessionRepo.FindByIdAndNoExpired(tx, &session, sessionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &session, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - InternalServerError
//   - SuccessRead
func (c *SessionUsecase) GetTokenByIdAndDecrypt(ctx context.Context, sessionId string) (*helpers.BaseToken, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var session entity.Session

	if err := c.sessionRepo.FindByIdAndNoExpired(tx, &session, sessionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	decodeToken, err := c.tokenAuth.GetToken(session.Token)
	if err != nil {
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return decodeToken, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *SessionUsecase) DeleteById(ctx context.Context, sessionId string) (*entity.Session, int) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	var session entity.Session

	if err := c.sessionRepo.DeleteById(tx, &session, sessionId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &session, constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *SessionUsecase) DeleteAllByExpired(ctx context.Context) int {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.sessionRepo.DeleteAllSessionExpired(tx); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return constants.RecordNotFound
		}
		return constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return constants.DatabaseError
	}

	return constants.SuccessDelete
}
