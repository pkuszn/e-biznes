package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type PurchaseRepository interface {
	GetAllPurchases() ([]models.Purchase, error)
	GetPurchaseById(id uint) (*models.Purchase, error)
	CreatePurchase(purchase *dtos.Purchase) error
	UpdatePurchase(id uint, purchase *dtos.Purchase) (*models.Purchase, error)
	DeletePurchase(id uint) error
	MakeOrder(purchases []dtos.Purchase) error
	GetPurchaseByUser(id_user uint) ([]models.Purchase, error)
}
