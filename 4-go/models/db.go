package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initialize(dbURL string) *gorm.DB {
	db, err := gorm.Open(mysql.Open(dbURL), &gorm.Config{})
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
	db.AutoMigrate(&PaymentMethod{})
	db.AutoMigrate(&Order{})
}
