package handlers

import (
	"errors"
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type ProductHandler struct {
	Repo repository.ProductRepository
}

func NewProductHandler(repo repository.ProductRepository) *ProductHandler {
	return &ProductHandler{Repo: repo}
}

func (h *ProductHandler) CreateProduct(c echo.Context) error {
	product := new(dtos.Product)
	if err := c.Bind(product); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := validateProduct(product); err != nil {
		log.Error(err.Error())
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := h.Repo.CreateProduct(product); err != nil {
		log.Error("Failed to create the product. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the product.")
	}

	return c.JSON(http.StatusCreated, product)
}

func (h *ProductHandler) GetProduct(c echo.Context) error {
	products, err := h.Repo.GetAllProducts()
	if err != nil {
		log.Error("Failed to retrieve products. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve products.")
	}
	return c.JSON(http.StatusOK, products)
}

func (h *ProductHandler) GetProductById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid product ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid product ID")
	}

	product, err := h.Repo.GetProductById(id)
	if err != nil {
		log.Error("Product not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) UpdateProduct(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid product ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid product ID")
	}
	var updatedProduct dtos.Product
	if err := c.Bind(&updatedProduct); err != nil {
		log.Error("Invalid request data ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid request data")
	}

	product := new(models.Product)
	if product, err = h.Repo.UpdateProduct(id, &updatedProduct); err != nil {
		log.Error("Failed to update the product ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to update the product.")
	}

	return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) DeleteProduct(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid product ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid product ID")
	}

	if err := h.Repo.DeleteProduct(id); err != nil {
		log.Error("Product not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.NoContent(http.StatusNoContent)
}

func validateProduct(product *dtos.Product) error {
	if product.Name == "" {
		return errors.New("name is required")
	}
	if product.Category > 0 {
		return errors.New("category must be greater than 0")
	}
	if product.Price > 0 {
		return errors.New("price must be greater than 0")
	}
	if product.CreatedDate == "" {
		return errors.New("createdDate is required")
	}
	return nil
}