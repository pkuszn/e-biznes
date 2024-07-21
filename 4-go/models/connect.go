package models

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

// DB is the global database connection instance
var DB *gorm.DB

// Initialize attempts to connect to the database using the provided URL.
// It retries the connection up to a maximum of 100 attempts, with a 5-second
// interval between each attempt. If the connection is successful, it sets
// the global DB variable and returns the database connection instance.
// If the connection fails after the maximum number of attempts, it panics.
func Initialize(dbURL string) *gorm.DB {
	maxAttempts := 100
	attempt := 0

	for {
		attempt++
		fmt.Printf("Attempt %d to connect to the database...\n", attempt)
		fmt.Println(dbURL)
		db, err := gorm.Open(sqlserver.Open(dbURL), &gorm.Config{})
		if err == nil {
			fmt.Println("Connected to the database successfully!")
			DB = db
			break
		}

		fmt.Printf("Failed to connect to the database: %v\n", err)
		if attempt >= maxAttempts {
			panic("Failed to connect to database")
		}

		fmt.Printf("Retrying in 5 seconds...\n")
		time.Sleep(5 * time.Second)
	}

	return DB
}

// Migrate performs database schema migrations for all defined models.
// It ensures that the database schema is up to date by creating or updating
// tables for the specified models.
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
