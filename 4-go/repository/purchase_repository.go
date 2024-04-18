package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type PurchaseRepository interface {
	GetAllPurchases() ([]models.Purchase, error)
	GetPurchaseById(id uint) (*models.Purchase, error)
	CreatePurchase(book *dtos.Purchase) error
	UpdatePurchase(id uint, book *dtos.Purchase) (*models.Purchase, error)
	DeletePurchase(id uint) error
}
