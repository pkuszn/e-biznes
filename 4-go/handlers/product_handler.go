package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

const invalidProductId = "Invalid product ID: "
const productNotFound = "Product not found"

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

	log.Info(product)

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
		log.Error(invalidProductId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidProductId)
	}

	product, err := h.Repo.GetProductById(id)
	if err != nil {
		log.Error(productNotFound, err.Error())
		return c.JSON(http.StatusNotFound, productNotFound)
	}

	return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) UpdateProduct(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidProductId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidProductId)
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
		log.Error(invalidProductId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidProductId)
	}

	if err := h.Repo.DeleteProduct(id); err != nil {
		log.Error(productNotFound, err.Error())
		return c.JSON(http.StatusNotFound, productNotFound)
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *ProductHandler) GetProductByCategory(c echo.Context) error {
	id_category, err := getCategoryId(c)
	if err != nil {
		log.Error("Invalid category ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}

	products, err := h.Repo.GetProductByCategory(id_category)
	if err != nil {
		log.Error("Cannot find product by given id category ", err.Error())
		return c.JSON(http.StatusNotFound, productNotFound)
	}

	return c.JSON(http.StatusOK, products)
}
