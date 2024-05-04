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
	var payment_methods []models.PaymentMethod
	err := r.DB.Find(&payment_methods).Error
	if err != nil {
		return nil, err
	}
	return payment_methods, nil
}

func (r *GormPaymentMethodRepository) GetPaymentMethodById(id uint) (*models.PaymentMethod, error) {
	var payment_method models.PaymentMethod
	err := r.DB.First(&payment_method, id).Error
	if err != nil {
		return nil, err
	}
	return &payment_method, nil
}
