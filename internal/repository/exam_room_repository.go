package repository

import (
	"ujian-app/internal/entity"

	"gorm.io/gorm"
)

type ExamRoomRepository struct {
	Repository[entity.ExamRoom]
}

func NewExamRoomRepository() *ExamRoomRepository {
	return &ExamRoomRepository{}
}

func (r *ExamRoomRepository) FindByName(db *gorm.DB, entity *entity.ExamRoom, name string) error {
	return db.Where("room_name = ?", name).Take(entity).Error
}

func (r *ExamRoomRepository) FindByNameAndNotId(db *gorm.DB, entity *entity.ExamRoom, name string, id uint) error {
	return db.Where("room_name = ?", name).Not("id = ?", id).Take(entity).Error
}

func (r *ExamRoomRepository) Search(db *gorm.DB, p Pagination, keyword string, entity []*entity.ExamRoom) (MetaPagination, error) {
	var meta MetaPagination

	queryFn := db.Model(&entity).Where("room_name LIKE ?", parseToSearch(keyword))

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
