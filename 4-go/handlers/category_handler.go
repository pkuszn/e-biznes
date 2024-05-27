package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

// constInvalidCategoryID represents the message for an invalid category ID.
const invalidCategoryID = "Invalid category ID: "

// CategoryHandler handles HTTP requests related to categories.
type CategoryHandler struct {
	Repo repository.CategoryRepository
}

// NewCategoryHandler creates a new instance of CategoryHandler.
func NewCategoryHandler(repo repository.CategoryRepository) *CategoryHandler {
	return &CategoryHandler{Repo: repo}
}

// CreateCategory handles the creation of a new category.
func (h *CategoryHandler) CreateCategory(c echo.Context) error {
	category := new(dtos.Category)
	if err := c.Bind(category); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := h.Repo.CreateCategory(category); err != nil {
		log.Info(category)
		log.Error("Failed to create the category. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the category.")
	}

	return c.JSON(http.StatusCreated, category)
}

// GetCategory retrieves all categories.
func (h *CategoryHandler) GetCategory(c echo.Context) error {
	categories, err := h.Repo.GetAllCategories()
	if err != nil {
		log.Error("Failed to retrieve categories. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve categories.")
	}
	return c.JSON(http.StatusOK, categories)
}

// GetCategoryByID retrieves a category by its ID.
func (h *CategoryHandler) GetCategoryByID(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidCategoryID, err.Error())
		return c.JSON(http.StatusBadRequest, invalidCategoryID)
	}

	category, err := h.Repo.GetCategoryByID(id)
	if err != nil {
		log.Error("Category not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.JSON(http.StatusOK, category)

}

// UpdateCategory updates a category.
func (h *CategoryHandler) UpdateCategory(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidCategoryID, err.Error())
		return c.JSON(http.StatusBadRequest, invalidCategoryID)
	}
	var updatedCategory dtos.Category
	if err := c.Bind(&updatedCategory); err != nil {
		log.Error("Invalid request data ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid request data")
	}

	category := new(models.Category)
	if category, err = h.Repo.UpdateCategory(id, &updatedCategory); err != nil {
		log.Error("Failed to update the category ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to update the category.")
	}

	return c.JSON(http.StatusOK, category)

}

// DeleteCategory deletes a category.
func (h *CategoryHandler) DeleteCategory(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidCategoryID, err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}

	if err := h.Repo.DeleteCategory(id); err != nil {
		log.Error("Category not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.NoContent(http.StatusNoContent)
}
