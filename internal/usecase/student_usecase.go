package usecase

import (
	"context"
	"errors"
	"ujian-app/internal/constants"
	"ujian-app/internal/entity"
	"ujian-app/internal/loggers"
	"ujian-app/internal/models"
	"ujian-app/internal/repository"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type StundentUsecase struct {
	db               *gorm.DB
	logger           *loggers.Logger
	studentRepo      *repository.StudentRepository
	studentClassRepo *repository.StudentClassRepository
}

func NewStundentUsecase(db *gorm.DB, studentRepo *repository.StudentRepository, studentClassRepo *repository.StudentClassRepository, log *loggers.Logger) *StundentUsecase {
	return &StundentUsecase{
		db:               db,
		studentRepo:      studentRepo,
		studentClassRepo: studentClassRepo,
		logger:           log,
	}
}

type ResCreateMultiStudent struct {
	Index    int
	Username string
	Code     int
}

// Return Code
//   - DatabaseError
//   - SuccessInsert
//
// Res Code
//   - NotCompleteForm
//   - InternalServerError
//   - RecordNotFound
//   - DatabaseError
//   - SuccessInsert
func (c *StundentUsecase) CreateMultiStudent(ctx context.Context, dataStudent []models.CreateStudent) ([]ResCreateMultiStudent, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var statusInsert []ResCreateMultiStudent

	for i, v := range dataStudent {
		if v.Username == "" || v.Password == "" || v.ClassId == 0 {
			statusInsert = append(statusInsert, ResCreateMultiStudent{
				Index:    i,
				Username: v.Username,
				Code:     constants.NotCompleteForm,
			})
			continue
		}

		hashPassword, err := bcrypt.GenerateFromPassword([]byte(v.Password), bcrypt.DefaultCost)
		if err != nil {
			statusInsert = append(statusInsert, ResCreateMultiStudent{
				Index:    i,
				Username: v.Username,
				Code:     constants.InternalServerError,
			})
			continue
		}

		var studentClass entity.StudentClass

		if err := c.studentClassRepo.FindById(tx, &studentClass, v.ClassId); err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				statusInsert = append(statusInsert, ResCreateMultiStudent{
					Index:    i,
					Username: v.Username,
					Code:     constants.RecordNotFound,
				})
				continue
			}
			statusInsert = append(statusInsert, ResCreateMultiStudent{
				Index:    i,
				Username: v.Username,
				Code:     constants.DatabaseError,
			})
			c.logger.Error("%v", err)
			continue
		}

		student := entity.Student{
			Username:       v.Username,
			Password:       string(hashPassword),
			StudentClassId: v.ClassId,
		}

		if err := c.studentRepo.Create(tx, &student); err != nil {
			c.logger.Error("%v", err)
			statusInsert = append(statusInsert, ResCreateMultiStudent{
				Index:    i,
				Username: v.Username,
				Code:     constants.DatabaseError,
			})
			continue
		}
		statusInsert = append(statusInsert, ResCreateMultiStudent{
			Index:    i,
			Username: v.Username,
			Code:     constants.SuccessInsert,
		})
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return statusInsert, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessInsert
func (c *StundentUsecase) CreateStudent(ctx context.Context, dataStudent models.CreateStudent) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.studentClassRepo.FindById(tx, &entity.StudentClass{}, dataStudent.ClassId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	student := entity.Student{
		Username:       dataStudent.Username,
		Password:       dataStudent.Password,
		StudentClassId: dataStudent.ClassId,
	}

	if err := c.studentRepo.Create(tx, &student); err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &student, constants.SuccessInsert
}

// Return Code
//   - RecordNotFound
//   - InternalServerError
//   - DatabaseError
//   - SuccessUpdate
func (c *StundentUsecase) Update(ctx context.Context, id uint, dataStudent models.UpdateStudent) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var student entity.Student

	if err := c.studentRepo.FindById(tx, &student, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	if dataStudent.Username != "" {
		student.Username = dataStudent.Username
	}

	student.Password = dataStudent.Password

	if err := c.studentRepo.Update(tx, &student); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &student, constants.SuccessUpdate
}

// Return Code
//   - StudentNotFound
//   - DatabaseError
//   - ClassNotFound
//   - InternalServerError
//   - SuccessUpdate
func (c *StundentUsecase) ChangeStudentClass(ctx context.Context, studentId uint, classId uint) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var student entity.Student

	if err := c.studentRepo.FindById(tx, &student, studentId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.StudentNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := c.studentClassRepo.FindById(tx, &entity.StudentClass{}, classId); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.ClassNotFound
		}
		return nil, constants.DatabaseError
	}

	student.StudentClassId = classId

	if err := c.studentRepo.Update(tx, &student); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.StudentNotFound
		}
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &student, constants.SuccessUpdate
}

// Return Code
//   - RecordNotFound
//   - InternalServerError
//   - DatabaseError
//   - SuccessRead
func (c *StundentUsecase) GetById(ctx context.Context, id uint) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var student entity.Student

	if err := c.studentRepo.FindById(tx, &student, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.InternalServerError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}
	return &student, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - DatabaseError
//   - SuccessRead
func (c *StundentUsecase) GetAll(ctx context.Context, p repository.Pagination) ([]entity.Student, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	students, meta, err := c.studentRepo.GetAllPaginationPreload(tx, p)
	if err != nil {
		return students, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return students, meta, constants.SuccessRead
}

// Return Code
//   - DatabaseError
//   - SuccessRead
func (c *StundentUsecase) Search(ctx context.Context, p repository.Pagination, keyword string) ([]entity.Student, repository.MetaPagination, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	student, meta, err := c.studentRepo.Search(tx, p, keyword)
	if err != nil {
		return student, meta, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, meta, constants.DatabaseError
	}

	return student, meta, constants.SuccessRead
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StundentUsecase) Delete(ctx context.Context, id uint) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var student entity.Student

	if err := c.studentRepo.DeleteById(tx, &student, id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return &student, constants.SuccessDelete
}

// Return Code
//   - RecordNotFound
//   - DatabaseError
//   - SuccessDelete
func (c *StundentUsecase) DeleteMany(ctx context.Context, ids []uint) (*entity.Student, int) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	var student entity.Student

	if err := c.studentRepo.DeleteMany(tx, &student, ids); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, constants.RecordNotFound
		}
		return nil, constants.DatabaseError
	}

	if err := tx.Commit().Error; err != nil {
		c.logger.Error("%v", err)
		return nil, constants.DatabaseError
	}

	return nil, constants.SuccessDelete
}
