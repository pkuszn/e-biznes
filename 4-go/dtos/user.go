package dtos

type User struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Password    string `json:"password"`
	Address     string `json:"address"`
	CreatedDate string `json:"createdDate"`
}
