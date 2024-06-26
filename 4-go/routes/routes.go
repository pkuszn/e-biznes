package routes

import (
	"go-rest-api/handlers"
	"go-rest-api/models"
	"go-rest-api/repository"

	"github.com/labstack/echo/v4"
)

// SetupRoutes initializes the routes for the application.
func SetupRoutes(g *echo.Group) {
	const userID = "/user/:id_user"

	productRepo := repository.NewGormProductRepository(models.DB)
	productHandler := handlers.NewProductHandler(productRepo)

	productGroup := g.Group("/product")
	productGroup.GET("", productHandler.GetProduct)
	productGroup.GET("/:id", productHandler.GetProductById)
	productGroup.POST("", productHandler.CreateProduct)
	productGroup.PUT("/:id", productHandler.UpdateProduct)
	productGroup.DELETE("/:id", productHandler.DeleteProduct)
	productGroup.GET("/category/:id_category", productHandler.GetProductByCategory)

	categoryRepo := repository.NewGormCategoryRepository(models.DB)
	categoryHandler := handlers.NewCategoryHandler(categoryRepo)

	categoryGroup := g.Group("/category")
	categoryGroup.GET("", categoryHandler.GetCategory)
	categoryGroup.GET("/:id", categoryHandler.GetCategoryByID)
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
	purchaseGroup.POST("/order", purchaseHandler.MakeOrder)
	purchaseGroup.GET(userID, purchaseHandler.GetPurchaseByUser)

	userRepo := repository.NewGormUserRepository(models.DB)
	userHandler := handlers.NewUserHandler(userRepo)

	userGroup := g.Group("/user")
	userGroup.GET("", userHandler.GetUser)
	userGroup.GET("/:id", userHandler.GetUserById)
	// userGroup.GET("/check", userHandler.CheckUser)
	userGroup.POST("/check", userHandler.CheckUser)
	userGroup.POST("/name", userHandler.FindByName)
	userGroup.POST("", userHandler.CreateUser)

	deliveryTypeRepo := repository.NewGormDeliveryTypeRepository(models.DB)
	deliveryTypeHandler := handlers.NewDeliveryTypeHandler(deliveryTypeRepo)

	deliveryTypeGroup := g.Group("/delivery-type")
	deliveryTypeGroup.GET("", deliveryTypeHandler.GetDeliveryType)
	deliveryTypeGroup.GET("/:id", deliveryTypeHandler.GetDeliveryTypeById)

	paymentTypeRepo := repository.NewGormPaymentTypeRepository(models.DB)
	paymentTypeHandler := handlers.NewPaymentTypeHandler(paymentTypeRepo)

	paymentTypeGroup := g.Group("/payment-type")
	paymentTypeGroup.GET("", paymentTypeHandler.GetPaymentType)
	paymentTypeGroup.GET("/:id", paymentTypeHandler.GetPaymentTypeById)

	paymentRepo := repository.NewGormPaymentRepository(models.DB)
	paymentHandler := handlers.NewPaymentHandler(paymentRepo)

	paymentGroup := g.Group("/payment")
	paymentGroup.GET("", paymentHandler.GetPayment)
	paymentGroup.GET("/:id", paymentHandler.GetPaymentById)
	paymentGroup.POST("", paymentHandler.CreatePayment)
	paymentGroup.PUT("/:id", paymentHandler.UpdatePayment)
	paymentGroup.DELETE("/:id", paymentHandler.DeletePayment)
	paymentGroup.GET(userID, paymentHandler.FindByUser)

	statusRepo := repository.NewGormStatusRepository(models.DB)
	statusHandler := handlers.NewStatusHandler(statusRepo)

	statusGroup := g.Group("/status")
	statusGroup.GET("", statusHandler.GetStatus)
	statusGroup.GET("/:id", statusHandler.GetStatusById)

	paymentMethodRepository := repository.NewGormPaymentMethodRepository(models.DB)
	paymentMethodHandler := handlers.NewPaymentMethodHandler(paymentMethodRepository)

	paymentMethodGroup := g.Group("/payment-method")
	paymentMethodGroup.GET("", paymentMethodHandler.GetPaymentMethod)
	paymentMethodGroup.GET("/:id", paymentMethodHandler.GetPaymentMethodById)

	orderRepo := repository.NewGormOrderRepository(models.DB)
	orderHandler := handlers.NewOrderHandler(orderRepo)

	orderGroup := g.Group("/order")
	orderGroup.GET("", orderHandler.GetOrder)
	orderGroup.GET("/:id", orderHandler.GetOrderById)
	orderGroup.POST("", orderHandler.CreateOrder)
	orderGroup.PUT("/:id", orderHandler.UpdateOrder)
	orderGroup.DELETE("/:id", orderHandler.DeleteOrder)
	orderGroup.POST("/make", orderHandler.MakeOrder)
	orderGroup.GET(userID, orderHandler.GetOrderByUser)
}
