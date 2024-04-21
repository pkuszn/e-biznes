package models

import "gorm.io/gorm"

type Purchase struct {
	gorm.Model
	ID           int64   `gorm:"primaryKey" json:"id"`
	IdProduct    int64   `json:"idProduct" gorm:"column:id_product"`
	IdUser       int64   `json:"idUser" gorm:"column:id_user"`
	Price        float32 `json:"price" gorm:"column:price"`
	Quantity     int     `json:"quantity" gorm:"column:quantity"`
	PurchaseDate string  `json:"purchaseDate" gorm:"column:purchase_date"`
	DeliveryType int     `json:"deliveryType" gorm:"column:delivery_type"`
	PaymentType  int     `json:"paymentType" gorm:"column:payment_type"`
}

func (Purchase) TableName() string {
	return "purchase"
}
