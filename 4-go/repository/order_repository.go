package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type OrderRepository interface {
	GetAllOrders() ([]models.Order, error)
	GetOrderById(id uint) (*models.Order, error)
	GetOrderByUser(id_user uint) ([]models.Order, error)
	CreateOrder(order *dtos.Order) error
	UpdateOrder(id uint, order *dtos.Order) (*models.Order, error)
	DeleteOrder(id uint) error
	MakeOrder(purchases []dtos.OrderPurchase) (*models.Order, error)
}
