package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type ProductRepository interface {
	GetAllProducts() ([]models.Product, error)
	GetProductById(id uint) (*models.Product, error)
	CreateProduct(product *dtos.Product) error
	UpdateProduct(id uint, product *dtos.Product) (*models.Product, error)
	DeleteProduct(id uint) error
	GetProductByCategory(id_category uint) ([]models.Product, error)
}
