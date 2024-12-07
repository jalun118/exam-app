package constants

const (
	FailedConnectDatabase = iota + 1000
	SuccessConnectDatabase

	// user role
	RoleNotFound

	// user
	UserNotFound

	// student
	StudentNotFound

	// student class
	ClassNotFound

	// room
	RoomNotFound

	// Exam
	ExamNotFound

	// Exam
	ExamKeyNotFound

	// distribution exam
	TooShortDuration

	// validation
	FailedRegisterd
	FailedLogin
	FieldRequired
	FieldWrongValue
	FieldBoolean
	FieldNumber
	FieldEmail
	FieldAlphaNumber
	FieldAlphaNumberSpecial
	MinimumNumber
	MaximumNumber
	FieldAscii
	FieldNotAllowChar
	EmailAlreadyRegister
	EmailDuplicate
	EmailNotFound
	NotCompleteForm
	PasswordNotMatch
	UnsupportedContentType
	ColumnNull
	ReachingTheLimit

	// database
	DatabaseError
	SuccessInsert
	SuccessUpdate
	SuccessDelete
	SuccessRead
	ErrorInsert
	ErrorUpdate
	ErrorDelete
	ErrorRead
	RecordNotFound
	DuplicateRecord

	// server
	InternalServerError
	RequestTimeOut
	AccessUnauthorized
)

var ValidatorMsg = map[string]int{
	"required":        FieldRequired,
	"boolean":         FieldBoolean,
	"email":           FieldEmail,
	"number":          FieldNumber,
	"min":             MinimumNumber,
	"max":             MaximumNumber,
	"alphanum":        FieldAlphaNumber,
	"alphanumspecial": FieldAlphaNumberSpecial,
	"ascii":           FieldAscii,
	"notallowchar":    FieldNotAllowChar,
}
