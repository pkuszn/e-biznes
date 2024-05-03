package dtos

type Product struct {
	ID          int64   `json:"id"`
	Name        string  `json:"name"`
	Category    int     `json:"category"`
	Price       float32 `json:"price"`
	CreatedDate string  `json:"createdDate"`
	Description string  `json:"description:`
	Available   int     `json:"available"`
}
