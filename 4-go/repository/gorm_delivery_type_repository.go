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
	var deliveryTypes []models.DeliveryType
	err := r.DB.Find(&deliveryTypes).Error
	if err != nil {
		return nil, err
	}
	return deliveryTypes, nil
}

func (r *GormDeliveryTypeRepository) GetDeliveryTypeById(id uint) (*models.DeliveryType, error) {
	var deliveryType models.DeliveryType
	err := r.DB.First(&deliveryType, id).Error
	if err != nil {
		return nil, err
	}
	return &deliveryType, nil
}
