package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type CategoryHandler struct {
	Repo repository.CategoryRepository
}

func NewCategoryHandler(repo repository.CategoryRepository) *CategoryHandler {
	return &CategoryHandler{Repo: repo}
}

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

func (h *CategoryHandler) GetCategory(c echo.Context) error {
	categories, err := h.Repo.GetAllCategories()
	if err != nil {
		log.Error("Failed to retrieve categories. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve categories.")
	}
	return c.JSON(http.StatusOK, categories)
}

func (h *CategoryHandler) GetCategoryById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid category ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}

	category, err := h.Repo.GetCategoryById(id)
	if err != nil {
		log.Error("Category not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.JSON(http.StatusOK, category)

}

func (h *CategoryHandler) UpdateCategory(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid category ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
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

func (h *CategoryHandler) DeleteCategory(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid category ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid category ID")
	}

	if err := h.Repo.DeleteCategory(id); err != nil {
		log.Error("Category not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.NoContent(http.StatusNoContent)
}
