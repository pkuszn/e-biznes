package models

import "gorm.io/gorm"

type DeliveryType struct {
	gorm.Model
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (DeliveryType) TableName() string {
	return "delivery_type"
}
