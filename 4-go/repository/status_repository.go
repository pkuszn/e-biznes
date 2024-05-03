package repository

import (
	"go-rest-api/models"
)

type StatusRepository interface {
	GetAllStatuses() ([]models.Status, error)
	GetStatusById(id uint) (*models.Status, error)
}
