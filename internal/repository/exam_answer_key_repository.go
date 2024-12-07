package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type ExamAnswerKeyRepository struct {
	Repository[entity.ExamAnswerKey]
}

func NewExamAnswerKeyRepository() *ExamAnswerKeyRepository {
	return &ExamAnswerKeyRepository{}
}

func (r *ExamAnswerKeyRepository) FindByExamId(db *gorm.DB, entity *entity.ExamAnswerKey, examId string) error {
	return db.Where("exam_id = ?", examId).Take(entity).Error
}

func (r *ExamAnswerKeyRepository) DeleteByExamIdAndAuthor(db *gorm.DB, entity *entity.ExamAnswerKey, authorId uint, examId string) error {
	return db.Where("exam_id = ? AND author_id = ?", examId, authorId).Delete(entity).Error
}

func (r *ExamAnswerKeyRepository) Search(db *gorm.DB, p Pagination, keyword string, entity []*entity.ExamAnswerKey) (MetaPagination, error) {
	var meta MetaPagination


	queryFn := db.Model(&entity).Where("exam_id LIKE ?", parseToSearch(keyword))

	errScan := metaPagination(queryFn, p.Limit, &meta)
	if errScan != nil {
		return meta, errScan
	}

	errFind := queryFn.Scopes(Paginate(p)).Find(&entity).Error

	if errFind != nil {
		return meta, errFind
	}
	return meta, nil
}
