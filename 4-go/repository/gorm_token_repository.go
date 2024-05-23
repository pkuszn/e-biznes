package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

type GormTokenRepository struct {
	DB *gorm.DB
}

func NewGormTokenRepository(db *gorm.DB) *GormTokenRepository {
	return &GormTokenRepository{DB: db}
}

func (r *GormTokenRepository) FirstOrCreate(userInfo *dtos.UserInfo) *models.Token {
	var user models.Token
	r.DB.Where(models.Token{GithubID: string(userInfo.ID)}).FirstOrCreate(&user, models.Token{GithubID: string(userInfo.ID), Name: userInfo.Login})
	user.Token = "secureTokenFor_" + string(userInfo.ID)
	r.DB.Save(&user)

	return &user
}
