package dtos

type Order struct {
	ID           int64   `json:"id"`
	IdUser       int64   `json:"idUser"`
	Amount       float32 `json:"price"`
	PurchaseDate string  `json:"purchaseDate"`
	DeliveryType int     `json:"deliveryType"`
	PaymentType  int     `json:"paymentType"`
}
