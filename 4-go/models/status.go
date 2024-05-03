package models

import "gorm.io/gorm"

type Status struct {
	gorm.Model
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (Status) TableName() string {
	return "status"
}
