package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ID          int64   `gorm:"primaryKey" json:"id"`
	Name        string  `json:"name" gorm:"column:name"`
	Category    int     `json:"category" gorm:"column:category"`
	Price       float32 `json:"price" gorm:"column:price"`
	CreatedDate string  `json:"createdDate" gorm:"column:created_date"`
	Available   int     `json:"available" gorm:"column:available"`
}

func (Product) TableName() string {
	return "product"
}
