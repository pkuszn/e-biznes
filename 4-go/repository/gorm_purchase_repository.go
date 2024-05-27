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
	newPurchase := models.Purchase{
		ID:        purchase.ID,
		IdOrder:   purchase.IdOrder,
		IdProduct: purchase.IdProduct,
		Price:     purchase.Price,
		Quantity:  purchase.Quantity,
	}
	return r.DB.Create(&newPurchase).Error
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
	if updatedPurchase.IdOrder != 0 {
		purchase.IdOrder = updatedPurchase.IdOrder
	}
	if updatedPurchase.IdProduct != 0 {
		purchase.IdProduct = updatedPurchase.IdProduct
	}
	if updatedPurchase.Price != 0.0 {
		purchase.Price = updatedPurchase.Price
	}
	if updatedPurchase.Quantity != 0 {
		purchase.Quantity = updatedPurchase.Quantity
	}

	err = r.DB.Save(purchase).Error

	return purchase, err

}

func (r *GormPurchaseRepository) DeletePurchase(id uint) error {
	return r.DB.Delete(&models.Purchase{}, id).Error
}

func (r *GormPurchaseRepository) MakeOrder(order []dtos.Purchase) error {
	var newPurchases []models.Purchase
	for _, purchase := range order {
		newPurchase := models.Purchase{
			ID:        purchase.ID,
			IdOrder:   purchase.IdOrder,
			IdProduct: purchase.IdProduct,
			Price:     purchase.Price,
			Quantity:  purchase.Quantity,
		}
		newPurchases = append(newPurchases, newPurchase)
	}
	return r.DB.Create(&newPurchases).Error
}

func (r *GormPurchaseRepository) GetPurchaseByUser(idUser uint) ([]models.Purchase, error) {
	var purchases []models.Purchase
	err := r.DB.Where("id_user = ?", idUser).Find(&purchases).Error
	if err != nil {
		return nil, err
	}
	return purchases, nil
}
