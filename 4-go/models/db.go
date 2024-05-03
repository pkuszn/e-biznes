package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initialize(dbName string) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}
	DB = db
	return db
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Category{})
	db.AutoMigrate(&Product{})
	db.AutoMigrate(&Purchase{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&DeliveryType{})
	db.AutoMigrate(&PaymentType{})
	db.AutoMigrate(&Payment{})
	db.AutoMigrate(&Status{})
}
