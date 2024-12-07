package models

type CreateStudentDistribution struct {
	StudentId  uint `json:"student_id"`
	ExamRoomId uint `json:"exam_room_id"`
}
