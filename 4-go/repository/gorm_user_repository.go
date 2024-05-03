package repository

import (
	"errors"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormUserRepository struct {
	DB *gorm.DB
}

func NewGormUserRepository(db *gorm.DB) *GormUserRepository {
	return &GormUserRepository{DB: db}
}

func (r *GormUserRepository) GetAllUsers() ([]models.User, error) {
	var users []models.User
	err := r.DB.Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (r *GormUserRepository) GetUserById(id uint) (*models.User, error) {
	var user models.User
	err := r.DB.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *GormUserRepository) FindByName(name string) (*models.User, error) {
	var user models.User
	err := r.DB.Where("name LIKE ?", name).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *GormUserRepository) CheckUser(name string, password string) (*models.User, error) {
	var user models.User
	err := r.DB.Where("name LIKE ?", name).Find(&user).Error
	if err != nil {
		return nil, err
	}

	if user.Password != password {
		return nil, errors.New("provided password is invalid")
	}

	return &user, nil
}
