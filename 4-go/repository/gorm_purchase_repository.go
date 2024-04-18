package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormPurchaseRepository struct {
	DB *gorm.DB
}

func NewGormPurchaseRepository(db *gorm.DB) *GormPurchaseRepository {
	return &GormPurchaseRepository{DB: db}
}

func (r *GormPurchaseRepository) CreatePurchase(purchase *dtos.Purchase) error {
	return r.DB.Create(purchase).Error
}

func (r *GormPurchaseRepository) GetAllPurchases() ([]models.Purchase, error) {
	var purchases []models.Purchase
	err := r.DB.Find(&purchases).Error
	if err != nil {
		return nil, err
	}
	return purchases, nil
}

func (r *GormPurchaseRepository) GetPurchaseById(id uint) (*models.Purchase, error) {
	var purchase models.Purchase
	err := r.DB.First(&purchase, id).Error
	if err != nil {
		return nil, err
	}
	return &purchase, nil
}

func (r *GormPurchaseRepository) UpdatePurchase(id uint, updatedPurchase *dtos.Purchase) (*models.Purchase, error) {
	purchase, err := r.GetPurchaseById(id)
	if err != nil {
		return nil, err
	}
	if updatedPurchase.IdProduct != 0 {
		purchase.IdProduct = updatedPurchase.IdProduct
	}
	if updatedPurchase.IdUser != 0 {
		purchase.IdUser = updatedPurchase.IdUser
	}
	if updatedPurchase.Price != 0.0 {
		purchase.Price = updatedPurchase.Price
	}
	if updatedPurchase.Quantity != 0 {
		purchase.Quantity = updatedPurchase.Quantity
	}
	if updatedPurchase.PurchaseDate != "" {
		purchase.PurchaseDate = updatedPurchase.PurchaseDate
	}
	if updatedPurchase.DeliveryType != 0 {
		purchase.DeliveryType = updatedPurchase.DeliveryType
	}
	if updatedPurchase.PaymentType != 0 {
		purchase.PaymentType = updatedPurchase.PaymentType
	}

	err = r.DB.Save(purchase).Error

	return purchase, err

}

func (r *GormPurchaseRepository) DeletePurchase(id uint) error {
	return r.DB.Delete(&models.Purchase{}, id).Error
}
