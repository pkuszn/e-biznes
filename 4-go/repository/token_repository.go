package repository

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
)

// TokenRepository defines the methods that any
// data storage provider needs to implement to manage tokens.
type TokenRepository interface {
	// FirstOrCreate retrieves a user token if it exists, or creates a new one if it does not.
	FirstOrCreate(userInfo *dtos.UserInfo) *models.Token
	// GetUserInfo retrieves user information based on the provided token.
	GetUserInfo(token *dtos.Token) (*models.Token, error)
}
