package repository

import (
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormPaymentMethodRepository struct {
	DB *gorm.DB
}

func NewGormPaymentMethodRepository(db *gorm.DB) *GormPaymentMethodRepository {
	return &GormPaymentMethodRepository{DB: db}
}

func (r *GormPaymentMethodRepository) GetAllPaymentMethods() ([]models.PaymentMethod, error) {
	var paymentMethods []models.PaymentMethod
	err := r.DB.Find(&paymentMethods).Error
	if err != nil {
		return nil, err
	}
	return paymentMethods, nil
}

func (r *GormPaymentMethodRepository) GetPaymentMethodById(id uint) (*models.PaymentMethod, error) {
	var paymentMethod models.PaymentMethod
	err := r.DB.First(&paymentMethod, id).Error
	if err != nil {
		return nil, err
	}
	return &paymentMethod, nil
}
