package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormCategoryRepository struct {
	DB *gorm.DB
}

func NewGormCategoryRepository(db *gorm.DB) *GormCategoryRepository {
	return &GormCategoryRepository{DB: db}
}

func (r *GormCategoryRepository) CreateCategory(category *dtos.Category) error {
	return r.DB.Create(category).Error
}

func (r *GormCategoryRepository) GetAllCategories() ([]models.Category, error) {
	var categories []models.Category
	err := r.DB.Find(&categories).Error
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (r *GormCategoryRepository) GetCategoryById(id uint) (*models.Category, error) {
	var category models.Category
	err := r.DB.First(&category, id).Error
	if err != nil {
		return nil, err
	}
	return &category, nil
}

func (r *GormCategoryRepository) UpdateCategory(id uint, updatedCategory *dtos.Category) (*models.Category, error) {
	category, err := r.GetCategoryById(id)
	if err != nil {
		return nil, err
	}
	if updatedCategory.Name != "" {
		category.Name = updatedCategory.Name
	}

	err = r.DB.Save(category).Error

	return category, err

}

func (r *GormCategoryRepository) DeleteCategory(id uint) error {
	return r.DB.Delete(&models.Category{}, id).Error
}
