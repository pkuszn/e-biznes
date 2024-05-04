package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type PaymentRepository interface {
	GetAllPayments() ([]models.Payment, error)
	GetPaymentById(id uint) (*models.Payment, error)
	CreatePayment(payment *dtos.Payment) error
	UpdatePayment(id uint, payment *dtos.Payment) (*models.Payment, error)
	DeletePayment(id uint) error
	FindByUser(id_user uint) ([]models.Payment, error)
}
