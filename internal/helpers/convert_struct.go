package helpers

import "encoding/json"

// Function convert one struct to another struct.
// 
// Example to use function
//	user := models.CreateUser {
//  	Name: "John Doe",
//  	Email: "johndoe@gmail.com"
//	}
//	data, err := utils.TypeConverter[models.User](&user)
//	fmt.Println(reflrect.TypeOf(data)) // will output *models.User
func TypeConverter[R any](data any) (*R, error) {
	var result R
	b, err := json.Marshal(&data)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(b, &result)
	if err != nil {
		return nil, err
	}
	return &result, err
}
