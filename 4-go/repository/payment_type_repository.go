package repository

import (
	"go-rest-api/models"
)

type PaymentTypeRepository interface {
	GetAllPaymentTypes() ([]models.PaymentType, error)
	GetPaymentTypeById(id uint) (*models.PaymentType, error)
}
