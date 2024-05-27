package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

// GormCategoryRepository provides GORM-based implementation of CategoryRepository.
type GormCategoryRepository struct {
	DB *gorm.DB
}

// NewGormCategoryRepository creates a new instance of GormCategoryRepository.
func NewGormCategoryRepository(db *gorm.DB) *GormCategoryRepository {
	return &GormCategoryRepository{DB: db}
}

// CreateCategory creates a new category in the database.
func (r *GormCategoryRepository) CreateCategory(category *dtos.Category) error {
	newCategory := models.Category{
		ID:   category.ID,
		Name: category.Name,
	}
	return r.DB.Create(&newCategory).Error
}

// GetAllCategories retrieves all categories from the database.
func (r *GormCategoryRepository) GetAllCategories() ([]models.Category, error) {
	var categories []models.Category
	err := r.DB.Find(&categories).Error
	if err != nil {
		return nil, err
	}
	return categories, nil
}

// GetCategoryByID retrieves a category by its ID from the database.
func (r *GormCategoryRepository) GetCategoryByID(id uint) (*models.Category, error) {
	var category models.Category
	err := r.DB.First(&category, id).Error
	if err != nil {
		return nil, err
	}
	return &category, nil
}

// UpdateCategory updates a category in the database.
func (r *GormCategoryRepository) UpdateCategory(id uint, updatedCategory *dtos.Category) (*models.Category, error) {
	category, err := r.GetCategoryByID(id)
	if err != nil {
		return nil, err
	}
	if updatedCategory.Name != "" {
		category.Name = updatedCategory.Name
	}

	err = r.DB.Save(category).Error

	return category, err

}

// DeleteCategory deletes a category from the database.
func (r *GormCategoryRepository) DeleteCategory(id uint) error {
	return r.DB.Delete(&models.Category{}, id).Error
}
