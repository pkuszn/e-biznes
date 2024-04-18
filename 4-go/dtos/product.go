package dtos

type Product struct {
	ID          int64  `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Category    int    `json:"category"`
	Price       int    `json:"price"`
	CreatedDate string `json:"createdDate"`
	Available   bool   `json:"available"`
}
