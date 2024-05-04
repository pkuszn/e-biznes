package dtos

type Purchase struct {
	ID        int64   `json:"id"`
	IdOrder   int64   `json:"idOrder"`
	IdProduct int64   `json:"idProduct"`
	Price     float32 `json:"price"`
	Quantity  int     `json:"quantity"`
}
