package models

import "gorm.io/gorm"

type Token struct {
	gorm.Model
	GithubID string `gorm:"unique_index"`
	Name     string
	Token    string
}
