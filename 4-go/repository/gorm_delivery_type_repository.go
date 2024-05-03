package repository

import (
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormDeliveryTypeRepository struct {
	DB *gorm.DB
}

func NewGormDeliveryTypeRepository(db *gorm.DB) *GormDeliveryTypeRepository {
	return &GormDeliveryTypeRepository{DB: db}
}

func (r *GormDeliveryTypeRepository) GetAllDeliveryTypes() ([]models.DeliveryType, error) {
	var delivery_types []models.DeliveryType
	err := r.DB.Find(&delivery_types).Error
	if err != nil {
		return nil, err
	}
	return delivery_types, nil
}

func (r *GormDeliveryTypeRepository) GetDeliveryTypeById(id uint) (*models.DeliveryType, error) {
	var delivery_type models.DeliveryType
	err := r.DB.First(&delivery_type, id).Error
	if err != nil {
		return nil, err
	}
	return &delivery_type, nil
}
