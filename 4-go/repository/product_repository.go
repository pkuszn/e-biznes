package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type ProductRepository interface {
	GetAllProducts() ([]models.Product, error)
	GetProductById(id uint) (*models.Product, error)
	CreateProduct(book *dtos.Product) error
	UpdateProduct(id uint, book *dtos.Product) (*models.Product, error)
	DeleteProduct(id uint) error
}
