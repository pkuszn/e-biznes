package models

import (
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initialize(dbURL string) *gorm.DB {
	maxAttempts := 100
	attempt := 0

	for {
		attempt++
		fmt.Printf("Attempt %d to connect to the database...\n", attempt)
		db, err := gorm.Open(mysql.Open(dbURL), &gorm.Config{})
		if err == nil {
			fmt.Println("Connected to the database successfully!")
			DB = db
			break
		}

		fmt.Printf("Failed to connect to the database: %v\n", err)
		if attempt >= maxAttempts {
			panic("Failed to connect to database2")
		}

		fmt.Printf("Retrying in 5 seconds...\n")
		time.Sleep(5 * time.Second)
	}

	return DB
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
	db.AutoMigrate(&Token{})
}
