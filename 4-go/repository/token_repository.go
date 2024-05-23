package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

type TokenRepository interface {
	FirstOrCreate(userInfo *dtos.UserInfo) *models.Token
}
