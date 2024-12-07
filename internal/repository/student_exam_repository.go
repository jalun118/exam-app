package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type StudentExamRepository struct {
	Repository[entity.StudentExam]
}

func NewStudentExamRepository() *StudentExamRepository {
	return &StudentExamRepository{}
}

func (r *StudentExamRepository) FindByIdAndAuthor(db *gorm.DB, entity *entity.StudentExam, authorId uint, id any) error {
	return db.Where("id = ? AND author_id = ?", id, authorId).Take(entity).Error
}

func (r *StudentExamRepository) DeleteByIdAndAuthor(db *gorm.DB, entity *entity.StudentExam, authorId uint, id any) error {
	return db.Where("id = ? AND author_id = ?", id, authorId).Delete(entity, id).Error
}

func (r *StudentExamRepository) DeleteByIdAndAuthorNested(db *gorm.DB, entity *entity.StudentExam, authorId uint, id any) error {
	return db.Select(entity.Quetions).Where("id = ? AND author_id = ?", id, authorId).Delete(entity).Error
}

func (r *StudentExamRepository) DeleteManyAndAuthor(db *gorm.DB, entity *entity.StudentExam, authorId uint, ids any) error {
	return db.Where("author_id = ?", authorId).Delete(entity, ids).Error
}

func (r *StudentExamRepository) Search(db *gorm.DB, p Pagination, authorId uint, keyword string) ([]entity.StudentExam, MetaPagination, error) {
	var meta MetaPagination

	var entity []entity.StudentExam

	queryFn := db.Model(&entity).Where("title LIKE ? AND author_id = ?", parseToSearch(keyword), authorId)

	errScan := metaPagination(queryFn, p.Limit, &meta)
	if errScan != nil {
		return entity, meta, errScan
	}

	errFind := queryFn.Scopes(Paginate(p)).Find(&entity).Error

	if errFind != nil {
		return entity, meta, errFind
	}
	return entity, meta, nil
}

func (r *StudentExamRepository) GetAllQuestionAndOption(db *gorm.DB, entity *entity.StudentExam, examId string) error {
	return db.Model(entity).Where("id = ?", examId).Preload(clause.Associations).First(&entity).Error
}

func (r *StudentExamRepository) GetAllQuestionAndOptionLimit(db *gorm.DB, dest *entity.StudentExam, examId string, limit int) error {
	if err := db.Model(dest).Where("id = ?", examId).First(&dest).Error; err != nil {
		return err
	}

	var questionAndOption []entity.ExamQuetion

	if err := db.Model(&entity.ExamQuetion{}).Where("exam_id = ?", examId).Order("RAND()").Limit(limit).Preload(clause.Associations).Find(&questionAndOption).Error; err != nil {
		return err
	}
	dest.Quetions = questionAndOption
	return nil
}
