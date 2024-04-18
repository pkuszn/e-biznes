package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ID          int64  `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Category    int    `json:"category"`
	Price       int    `json:"price"`
	CreatedDate string `json:"createdDate"`
	Available   bool   `json:"available"`
}
