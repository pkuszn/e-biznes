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

type PurchaseHandler struct {
	Repo repository.PurchaseRepository
}

func NewPurchaseHandler(repo repository.PurchaseRepository) *PurchaseHandler {
	return &PurchaseHandler{Repo: repo}
}

func (h *PurchaseHandler) CreatePurchase(c echo.Context) error {
	purchase := new(dtos.Purchase)
	if err := c.Bind(purchase); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := validatePurchase(purchase); err != nil {
		log.Error(err.Error())
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := h.Repo.CreatePurchase(purchase); err != nil {
		log.Error("Failed to create the purchase. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the purchase.")
	}

	return c.JSON(http.StatusCreated, purchase)
}

func (h *PurchaseHandler) GetPurchase(c echo.Context) error {
	purchases, err := h.Repo.GetAllPurchases()
	if err != nil {
		log.Error("Failed to retrieve purchases. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve purchases.")
	}
	return c.JSON(http.StatusOK, purchases)
}

func (h *PurchaseHandler) GetPurchaseById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid purchase ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid purchase ID")
	}

	purchase, err := h.Repo.GetPurchaseById(id)
	if err != nil {
		log.Error("Purchase not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Purchase not found")
	}

	return c.JSON(http.StatusOK, purchase)
}

func (h *PurchaseHandler) UpdatePurchase(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid purchase ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid purchase ID")
	}
	var updatedPurchase dtos.Purchase
	if err := c.Bind(&updatedPurchase); err != nil {
		log.Error("Invalid request data ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid request data")
	}

	purchase := new(models.Purchase)
	if purchase, err = h.Repo.UpdatePurchase(id, &updatedPurchase); err != nil {
		log.Error("Failed to update the purchase ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to update the purchase.")
	}

	return c.JSON(http.StatusOK, purchase)
}

func (h *PurchaseHandler) DeletePurchase(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid purchase ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid purchase ID")
	}

	if err := h.Repo.DeletePurchase(id); err != nil {
		log.Error("Purchase not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Purchase not found")
	}

	return c.NoContent(http.StatusNoContent)

}

func validatePurchase(purchase *dtos.Purchase) error {
	if purchase.IdProduct > 0 {
		return errors.New("idProduct must be greater than 0")
	}
	if purchase.IdUser > 0 {
		return errors.New("idUser must be greater than 0")
	}
	if purchase.Price > 0 {
		return errors.New("price must be greater than 0")
	}
	if purchase.Quantity > 0 {
		return errors.New("quantity must be greater than 0")
	}
	if purchase.PurchaseDate == "" {
		return errors.New("purchaseDate is required")
	}
	if purchase.DeliveryType > 0 {
		return errors.New("deliveryType must be greater than 0")
	}
	if purchase.PaymentType > 0 {
		return errors.New("paymentType must be greater than 0")
	}

	return nil

}
