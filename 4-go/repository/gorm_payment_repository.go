package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormPaymentRepository struct {
	DB *gorm.DB
}

func NewGormPaymentRepository(db *gorm.DB) *GormPaymentRepository {
	return &GormPaymentRepository{DB: db}
}

func (r *GormPaymentRepository) CreatePayment(payment *dtos.Payment) error {
	newPayment := models.Payment{
		ID:          payment.ID,
		IdOrder:     payment.IdOrder,
		PaymentType: payment.PaymentType,
		Amount:      payment.Amount,
		PaymentDate: payment.PaymentDate,
		Status:      payment.Status,
	}
	return r.DB.Create(&newPayment).Error
}

func (r *GormPaymentRepository) GetAllPayments() ([]models.Payment, error) {
	var payments []models.Payment
	err := r.DB.Find(&payments).Error
	if err != nil {
		return nil, err
	}
	return payments, nil
}

func (r *GormPaymentRepository) GetPaymentById(id uint) (*models.Payment, error) {
	var payment models.Payment
	err := r.DB.First(&payment, id).Error
	if err != nil {
		return nil, err
	}
	return &payment, nil
}

func (r *GormPaymentRepository) UpdatePayment(id uint, updatedPayment *dtos.Payment) (*models.Payment, error) {
	payment, err := r.GetPaymentById(id)
	if err != nil {
		return nil, err
	}
	if updatedPayment.IdOrder != 0 {
		payment.IdOrder = updatedPayment.IdOrder
	}
	if updatedPayment.PaymentType != 0 {
		payment.PaymentType = updatedPayment.PaymentType
	}
	if updatedPayment.Amount != 0.0 {
		payment.Amount = updatedPayment.Amount
	}
	if updatedPayment.PaymentDate != "" {
		payment.PaymentDate = updatedPayment.PaymentDate
	}
	if updatedPayment.Status != 0 {
		payment.Status = updatedPayment.Status
	}

	err = r.DB.Save(payment).Error

	return payment, err
}

func (r *GormPaymentRepository) DeletePayment(id uint) error {
	return r.DB.Delete(&models.Payment{}, id).Error
}

func (r *GormPaymentRepository) FindByUser(id uint) ([]models.Payment, error) {
	var orders []models.Order
	var payments []models.Payment
	var orderIDs []int64

	errOrder := r.DB.Where("id_user = ?", id).Find(&orders).Error
	if errOrder != nil {
		return nil, errOrder
	}

	for _, order := range orders {
		orderIDs = append(orderIDs, order.ID)
	}

	errPayment := r.DB.Where("id_order IN (?)", orderIDs).Find(&payments).Error
	if errPayment != nil {
		return nil, errPayment
	}
	return payments, nil
}
