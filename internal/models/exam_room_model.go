package models

type CreateExamRoom struct {
	RoomName string `json:"room_name"`
}

type UpdateExamRoom struct {
	RoomName string `json:"room_name"`
}
