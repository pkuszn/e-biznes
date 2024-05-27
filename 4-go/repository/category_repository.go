package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

// CategoryRepository defines the interface for category data operations.
type CategoryRepository interface {
	GetAllCategories() ([]models.Category, error)
	GetCategoryByID(id uint) (*models.Category, error)
	CreateCategory(category *dtos.Category) error
	UpdateCategory(id uint, category *dtos.Category) (*models.Category, error)
	DeleteCategory(id uint) error
}
