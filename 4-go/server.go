package main

import (
	"go-rest-api/models"
	"go-rest-api/routes"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())  // Logger
	e.Use(middleware.Recover()) // Recover
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	db := models.Initialize("product.db")
	models.Migrate(db)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	api := e.Group("/api")
	routes.SetupRoutes(api)
	e.Logger.Fatal(e.Start(":1323"))
}
