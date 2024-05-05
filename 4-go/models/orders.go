package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	ID           int64      `gorm:"primaryKey" json:"id"`
	IdUser       int64      `json:"idUser" gorm:"column:id_user"`
	Amount       float32    `json:"amount" gorm:"column:amount"`
	PurchaseDate string     `json:"purchaseDate" gorm:"column:purchase_date"`
	DeliveryType int        `json:"deliveryType" gorm:"column:delivery_type"`
	PaymentType  int        `json:"paymentType" gorm:"column:payment_type"`
	Purchases    []Purchase `gorm:"foreignKey:id_order;references:ID"`
}

func (Order) TableName() string {
	return "orders"
}
