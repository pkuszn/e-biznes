package repository

import (
	"go-rest-api/models"
)

type UserRepository interface {
	GetAllUsers() ([]models.User, error)
	GetUserById(id uint) (*models.User, error)
	FindByName(name string) (*models.User, error)
	CheckUser(name string, password string) (*models.User, error)
}
