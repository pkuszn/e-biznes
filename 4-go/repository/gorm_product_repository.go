package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormProductRepository struct {
	DB *gorm.DB
}

func NewGormProductRepository(db *gorm.DB) *GormProductRepository {
	return &GormProductRepository{DB: db}
}

func (r *GormProductRepository) CreateProduct(product *dtos.Product) error {
	newProduct := models.Product{
		ID:          product.ID,
		Name:        product.Name,
		Category:    product.Category,
		Price:       product.Price,
		CreatedDate: product.CreatedDate,
		Available:   product.Available,
	}
	return r.DB.Create(&newProduct).Error
}

func (r *GormProductRepository) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.DB.Find(&products).Error
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (r *GormProductRepository) GetProductById(id uint) (*models.Product, error) {
	var product models.Product
	err := r.DB.First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *GormProductRepository) UpdateProduct(id uint, updatedProduct *dtos.Product) (*models.Product, error) {
	product, err := r.GetProductById(id)
	if err != nil {
		return nil, err
	}
	if updatedProduct.Name != "" {
		product.Name = updatedProduct.Name
	}
	if updatedProduct.Category != 0 {
		product.Category = updatedProduct.Category
	}
	if updatedProduct.Price != 0 {
		product.Price = updatedProduct.Price
	}
	if updatedProduct.CreatedDate != "" {
		product.CreatedDate = updatedProduct.CreatedDate
	}
	product.Available = updatedProduct.Available

	err = r.DB.Save(product).Error

	return product, err

}

func (r *GormProductRepository) DeleteProduct(id uint) error {
	return r.DB.Delete(&models.Product{}, id).Error
}
