package handlers

import (
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type PaymentMethodHandler struct {
	Repo repository.PaymentMethodRepository
}

func NewPaymentMethodHandler(repo repository.PaymentMethodRepository) *PaymentMethodHandler {
	return &PaymentMethodHandler{Repo: repo}
}

func (h *PaymentMethodHandler) GetPaymentMethod(c echo.Context) error {
	payment_methods, err := h.Repo.GetAllPaymentMethods()
	if err != nil {
		log.Error("Failed to retrieve payment_methods. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve payment_methods.")
	}
	return c.JSON(http.StatusOK, payment_methods)
}

func (h *PaymentMethodHandler) GetPaymentMethodById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid payment_method ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid payment_method ID")
	}

	payment_method, err := h.Repo.GetPaymentMethodById(id)
	if err != nil {
		log.Error("payment_method not found ", err.Error())
		return c.JSON(http.StatusNotFound, "payment_method not found")
	}

	return c.JSON(http.StatusOK, payment_method)

}
