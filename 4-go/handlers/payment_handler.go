package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type PaymentHandler struct {
	Repo repository.PaymentRepository
}

func NewPaymentHandler(repo repository.PaymentRepository) *PaymentHandler {
	return &PaymentHandler{Repo: repo}
}

func (h *PaymentHandler) CreatePayment(c echo.Context) error {
	payment := new(dtos.Payment)
	if err := c.Bind(payment); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := h.Repo.CreatePayment(payment); err != nil {
		log.Error("Failed to create the payment. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the payment.")
	}

	return c.JSON(http.StatusCreated, payment)
}

func (h *PaymentHandler) GetPayment(c echo.Context) error {
	payments, err := h.Repo.GetAllPayments()
	if err != nil {
		log.Error("Failed to retrieve payments. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve payments.")
	}
	return c.JSON(http.StatusOK, payments)
}

func (h *PaymentHandler) GetPaymentById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid payment ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid payment ID")
	}

	payment, err := h.Repo.GetPaymentById(id)
	if err != nil {
		log.Error("payment not found ", err.Error())
		return c.JSON(http.StatusNotFound, "payment not found")
	}

	return c.JSON(http.StatusOK, payment)
}

func (h *PaymentHandler) UpdatePayment(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid payment ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid payment ID")
	}
	var updatedPayment dtos.Payment
	if err := c.Bind(&updatedPayment); err != nil {
		log.Error("Invalid request data ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid request data")
	}

	payment := new(models.Payment)
	if payment, err = h.Repo.UpdatePayment(id, &updatedPayment); err != nil {
		log.Error("Failed to update the payment ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to update the payment.")
	}

	return c.JSON(http.StatusOK, payment)
}

func (h *PaymentHandler) DeletePayment(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid payment ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid payment ID")
	}

	if err := h.Repo.DeletePayment(id); err != nil {
		log.Error("payment not found ", err.Error())
		return c.JSON(http.StatusNotFound, "payment not found")
	}

	return c.NoContent(http.StatusNoContent)
}
