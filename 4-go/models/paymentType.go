package models

import "gorm.io/gorm"

type PaymentType struct {
	gorm.Model
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (PaymentType) TableName() string {
	return "payment_type"
}
