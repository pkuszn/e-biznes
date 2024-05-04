package models

import "gorm.io/gorm"

type Purchase struct {
	gorm.Model
	ID        int64   `gorm:"primaryKey" json:"id"`
	IdOrder   int64   `json:"idOrder" gorm:"column:id_order"`
	IdProduct int64   `json:"idProduct" gorm:"column:id_product"`
	Price     float32 `json:"price" gorm:"column:price"`
	Quantity  int     `json:"quantity" gorm:"column:quantity"`
}

func (Purchase) TableName() string {
	return "purchase"
}
