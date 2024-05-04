package models

import "gorm.io/gorm"

type PaymentMethod struct {
	gorm.Model
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (PaymentMethod) TableName() string {
	return "payment_method"
}
