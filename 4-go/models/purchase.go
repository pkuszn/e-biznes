package models

import "gorm.io/gorm"

type Purchase struct {
	gorm.Model
	ID           int64   `gorm:"primaryKey" json:"id"`
	IdProduct    int64   `json:"idProduct"`
	IdUser       int64   `json:"idUser"`
	Price        float32 `json:"price"`
	Quantity     int     `json:"quantity"`
	PurchaseDate string  `json:"purchaseDate"`
	DeliveryType int     `json:"deliveryType"`
	PaymentType  int     `json:"paymentType"`
}
