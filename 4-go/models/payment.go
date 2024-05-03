package models

import (
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	ID          uint    `gorm:"primaryKey" json:"id"`
	IdOrder     uint    `gorm:"column:id_order;not null" json:"idOrder"`
	PaymentType uint    `gorm:"column:payment_type;not null" json:"paymentType"`
	Amount      float64 `gorm:"column:amount" json:"amount"`
	PaymentDate string  `gorm:"column:payment_date;not null" json:"paymentDate"`
	Status      uint    `gorm:"column:status" json:"status"`
}

func (Payment) TableName() string {
	return "payment"
}
