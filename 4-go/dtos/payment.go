package dtos

type Payment struct {
	ID          uint    `json:"id"`
	IdOrder     uint    `json:"idOrder"`
	PaymentType uint    `json:"paymentType"`
	Amount      float64 `json:"amount"`
	PaymentDate string  `json:"paymentDate"`
	Status      uint    `json:"status"`
}
