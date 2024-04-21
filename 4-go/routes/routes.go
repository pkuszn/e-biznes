package routes

import (
	"go-rest-api/handlers"
	"go-rest-api/models"
	"go-rest-api/repository"

	"github.com/labstack/echo/v4"
)

func SetupRoutes(g *echo.Group) {
	productRepo := repository.NewGormProductRepository(models.DB)
	productHandler := handlers.NewProductHandler(productRepo)

	productGroup := g.Group("/product")
	productGroup.GET("", productHandler.GetProduct)
	productGroup.GET("/:id", productHandler.GetProductById)
	productGroup.POST("", productHandler.CreateProduct)
	productGroup.PUT("/:id", productHandler.UpdateProduct)
	productGroup.DELETE("/:id", productHandler.DeleteProduct)

	categoryRepo := repository.NewGormCategoryRepository(models.DB)
	categoryHandler := handlers.NewCategoryHandler(categoryRepo)

	categoryGroup := g.Group("/category")
	categoryGroup.GET("", categoryHandler.GetCategory)
	categoryGroup.GET("/:id", categoryHandler.GetCategoryById)
	categoryGroup.POST("", categoryHandler.CreateCategory)
	categoryGroup.PUT("/:id", categoryHandler.UpdateCategory)
	categoryGroup.DELETE("/:id", categoryHandler.DeleteCategory)

	purchaseRepo := repository.NewGormPurchaseRepository(models.DB)
	purchaseHandler := handlers.NewPurchaseHandler(purchaseRepo)

	purchaseGroup := g.Group("/purchase")
	purchaseGroup.GET("", purchaseHandler.GetPurchase)
	purchaseGroup.GET("/:id", purchaseHandler.GetPurchaseById)
	purchaseGroup.POST("", purchaseHandler.CreatePurchase)
	purchaseGroup.PUT("/:id", purchaseHandler.UpdatePurchase)
	purchaseGroup.DELETE("/:id", purchaseHandler.DeletePurchase)
}
