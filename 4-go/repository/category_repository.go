package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type CategoryRepository interface {
	GetAllCategories() ([]models.Category, error)
	GetCategoryById(id uint) (*models.Category, error)
	CreateCategory(book *dtos.Category) error
	UpdateCategory(id uint, book *dtos.Category) (*models.Category, error)
	DeleteCategory(id uint) error
}
