package handlers

import (
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type DeliveryTypeHandler struct {
	Repo repository.DeliveryTypeRepository
}

func NewDeliveryTypeHandler(repo repository.DeliveryTypeRepository) *DeliveryTypeHandler {
	return &DeliveryTypeHandler{Repo: repo}
}

func (h *DeliveryTypeHandler) GetDeliveryType(c echo.Context) error {
	delivery_types, err := h.Repo.GetAllDeliveryTypes()
	if err != nil {
		log.Error("Failed to retrieve delivery_types. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve delivery_types.")
	}
	return c.JSON(http.StatusOK, delivery_types)
}

func (h *DeliveryTypeHandler) GetDeliveryTypeById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid delivery_type ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid delivery_type ID")
	}

	delivery_type, err := h.Repo.GetDeliveryTypeById(id)
	if err != nil {
		log.Error("delivery_type not found ", err.Error())
		return c.JSON(http.StatusNotFound, "delivery_type not found")
	}

	return c.JSON(http.StatusOK, delivery_type)

}
