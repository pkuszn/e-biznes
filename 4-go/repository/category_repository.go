package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type CategoryRepository interface {
	GetAllCategories() ([]models.Category, error)
	GetCategoryById(id uint) (*models.Category, error)
	CreateCategory(category *dtos.Category) error
	UpdateCategory(id uint, category *dtos.Category) (*models.Category, error)
	DeleteCategory(id uint) error
}
