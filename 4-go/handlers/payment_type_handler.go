package handlers

import (
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type PaymentTypeHandler struct {
	Repo repository.PaymentTypeRepository
}

func NewPaymentTypeHandler(repo repository.PaymentTypeRepository) *PaymentTypeHandler {
	return &PaymentTypeHandler{Repo: repo}
}

func (h *PaymentTypeHandler) GetPaymentType(c echo.Context) error {
	payment_types, err := h.Repo.GetAllPaymentTypes()
	if err != nil {
		log.Error("Failed to retrieve payment_types. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve payment_types.")
	}
	return c.JSON(http.StatusOK, payment_types)
}

func (h *PaymentTypeHandler) GetPaymentTypeById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid payment_type ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid payment_type ID")
	}

	payment_type, err := h.Repo.GetPaymentTypeById(id)
	if err != nil {
		log.Error("payment_type not found ", err.Error())
		return c.JSON(http.StatusNotFound, "payment_type not found")
	}

	return c.JSON(http.StatusOK, payment_type)

}
