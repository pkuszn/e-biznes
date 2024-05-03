package repository

import (
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormStatusRepository struct {
	DB *gorm.DB
}

func NewGormStatusRepository(db *gorm.DB) *GormStatusRepository {
	return &GormStatusRepository{DB: db}
}

func (r *GormStatusRepository) GetAllStatuses() ([]models.Status, error) {
	var statuses []models.Status
	err := r.DB.Find(&statuses).Error
	if err != nil {
		return nil, err
	}
	return statuses, nil
}

func (r *GormStatusRepository) GetStatusById(id uint) (*models.Status, error) {
	var status models.Status
	err := r.DB.First(&status, id).Error
	if err != nil {
		return nil, err
	}
	return &status, nil
}
