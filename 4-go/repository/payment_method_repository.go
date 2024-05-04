package repository

import (
	"go-rest-api/models"
)

type PaymentMethodRepository interface {
	GetAllPaymentMethods() ([]models.PaymentMethod, error)
	GetPaymentMethodById(id uint) (*models.PaymentMethod, error)
}
