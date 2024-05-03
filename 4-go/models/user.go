package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID          int64  `gorm:"primaryKey" json:"id"`
	Name        string `json:"name" gorm:"column:name"`
	Surname     string `json:"surname" gorm:"column:surname"`
	Password    string `json:"password" gorm:"column:password"`
	Address     string `json:"address" gorm:"column:address"`
	CreatedDate string `json:"createdDate" gorm:"column:created_date"`
}

func (User) TableName() string {
	return "user"
}
