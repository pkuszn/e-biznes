package controllers

import (
	"net/http"

	"go-rest-api/models"

	"github.com/gin-gonic/gin"
)

func FindCategories(c *gin.Context) {
	var categories []models.Category
	models.DB.Find(&categories)
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func FindCategoryById(c *gin.Context) {
	var category models.Category
	if err := models.DB.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}
