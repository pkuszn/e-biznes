package models

type Category struct {
	ID   int64  `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}
