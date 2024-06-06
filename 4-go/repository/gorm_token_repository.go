package repository

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"go-rest-api/dtos"
	"go-rest-api/models"

	"gorm.io/gorm"
)

// GormTokenRepository handles token-related database operations.
type GormTokenRepository struct {
	DB *gorm.DB
}

// NewGormTokenRepository creates a new GormTokenRepository.
func NewGormTokenRepository(db *gorm.DB) *GormTokenRepository {
	return &GormTokenRepository{DB: db}
}

// FirstOrCreate retrieves a user token if it exists, or creates a new one if it does not.
func (r *GormTokenRepository) FirstOrCreate(userInfo *dtos.UserInfo) *models.Token {
	var user models.Token
	r.DB.Where(models.Token{GithubID: string(userInfo.ID)}).FirstOrCreate(&user, models.Token{GithubID: string(userInfo.ID), Name: userInfo.Login})
	user.Token = GenerateSecureToken(16)
	r.DB.Save(&user)

	return &user
}

// GetUserInfo retrieves user information based on the provided token.
func (r *GormTokenRepository) GetUserInfo(token *dtos.Token) (*models.Token, error) {
	var user models.Token

	err := r.DB.Where(&models.Token{Token: token.Token}).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}

// GenerateSecureToken generates a secure token of the specified length.
func GenerateSecureToken(length int) string {
	b := make([]byte, length)
	if _, err := rand.Read(b); err != nil {
		return ""
	}
	return hex.EncodeToString(b)
}
