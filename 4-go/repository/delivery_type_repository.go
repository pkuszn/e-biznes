package repository

import (
	"go-rest-api/models"
)

type DeliveryTypeRepository interface {
	GetAllDeliveryTypes() ([]models.DeliveryType, error)
	GetDeliveryTypeById(id uint) (*models.DeliveryType, error)
}
