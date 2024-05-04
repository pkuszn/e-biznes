package repository

import (
	"fmt"
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormOrderRepository struct {
	DB *gorm.DB
}

func NewGormOrderRepository(db *gorm.DB) *GormOrderRepository {
	return &GormOrderRepository{DB: db}
}

func (r *GormOrderRepository) CreateOrder(order *dtos.Order) error {
	newOrder := models.Order{
		ID:           order.ID,
		IdUser:       order.IdUser,
		Amount:       order.Amount,
		PurchaseDate: order.PurchaseDate,
		DeliveryType: order.DeliveryType,
		PaymentType:  order.PaymentType,
	}
	return r.DB.Create(&newOrder).Error
}

func (r *GormOrderRepository) GetAllOrders() ([]models.Order, error) {
	var order []models.Order
	err := r.DB.Find(&order).Error
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (r *GormOrderRepository) GetOrderById(id uint) (*models.Order, error) {
	var order models.Order
	err := r.DB.First(&order, id).Error
	if err != nil {
		return nil, err
	}
	return &order, nil
}

func (r *GormOrderRepository) UpdateOrder(id uint, updatedOrder *dtos.Order) (*models.Order, error) {
	order, err := r.GetOrderById(id)
	if err != nil {
		return nil, err
	}
	if updatedOrder.IdUser != 0 {
		order.IdUser = updatedOrder.IdUser
	}
	if updatedOrder.Amount != 0.0 {
		order.Amount = updatedOrder.Amount
	}
	if updatedOrder.PurchaseDate != "" {
		order.PurchaseDate = updatedOrder.PurchaseDate
	}
	if updatedOrder.DeliveryType != 0 {
		order.DeliveryType = updatedOrder.DeliveryType
	}
	if updatedOrder.PaymentType != 0 {
		order.PaymentType = updatedOrder.PaymentType
	}

	err = r.DB.Save(order).Error

	return order, err

}

func (r *GormOrderRepository) DeleteOrder(id uint) error {
	return r.DB.Delete(&models.Order{}, id).Error
}

func (r *GormOrderRepository) GetOrderByUser(id_user uint) ([]models.Order, error) {
	var order []models.Order
	err := r.DB.Where("id_user = ?", id_user).Find(&order).Error
	if err != nil {
		return nil, err
	}
	return order, nil
}

func (r *GormOrderRepository) MakeOrder(purchases []dtos.OrderPurchase) (*models.Order, error) {
	tx := r.DB.Begin()
	var newOrder *models.Order
	fmt.Println(purchases)
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	totalAmount := float32(0)

	for _, purchase := range purchases {
		totalAmount += purchase.Price
	}

	firstPurchase := purchases[0]

	var newPurchases []models.Purchase
	for _, purchase := range purchases {
		newPurchase := models.Purchase{
			ID:        purchase.ID,
			IdOrder:   0,
			IdProduct: purchase.IdProduct,
			Price:     purchase.Price,
			Quantity:  purchase.Quantity,
		}
		newPurchases = append(newPurchases, newPurchase)
	}

	newOrder = &models.Order{
		ID:           firstPurchase.ID,
		IdUser:       firstPurchase.IdUser,
		Amount:       totalAmount,
		PurchaseDate: firstPurchase.PurchaseDate,
		DeliveryType: firstPurchase.DeliveryType,
		PaymentType:  firstPurchase.PaymentType,
		Purchases:    newPurchases,
	}

	if err := tx.Create(newOrder).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	return newOrder, nil
}
