package repository

import (
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormPaymentTypeRepository struct {
	DB *gorm.DB
}

func NewGormPaymentTypeRepository(db *gorm.DB) *GormPaymentTypeRepository {
	return &GormPaymentTypeRepository{DB: db}
}

func (r *GormPaymentTypeRepository) GetAllPaymentTypes() ([]models.PaymentType, error) {
	var payment_types []models.PaymentType
	err := r.DB.Find(&payment_types).Error
	if err != nil {
		return nil, err
	}
	return payment_types, nil
}

func (r *GormPaymentTypeRepository) GetPaymentTypeById(id uint) (*models.PaymentType, error) {
	var payment_type models.PaymentType
	err := r.DB.First(&payment_type, id).Error
	if err != nil {
		return nil, err
	}
	return &payment_type, nil
}
