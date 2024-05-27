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
	var paymentTypes []models.PaymentType
	err := r.DB.Find(&paymentTypes).Error
	if err != nil {
		return nil, err
	}
	return paymentTypes, nil
}

func (r *GormPaymentTypeRepository) GetPaymentTypeById(id uint) (*models.PaymentType, error) {
	var paymentType models.PaymentType
	err := r.DB.First(&paymentType, id).Error
	if err != nil {
		return nil, err
	}
	return &paymentType, nil
}
