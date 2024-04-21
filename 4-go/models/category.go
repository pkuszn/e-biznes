package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (Category) TableName() string {
	return "category"
}
