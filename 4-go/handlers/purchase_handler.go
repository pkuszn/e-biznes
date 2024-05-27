package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

const invalidPurchaseId = "Invalid purchase ID: "

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
		log.Error(invalidPurchaseId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidPurchaseId)
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
		log.Error(invalidPurchaseId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidPurchaseId)
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
		log.Error(invalidPurchaseId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidPurchaseId)
	}

	if err := h.Repo.DeletePurchase(id); err != nil {
		log.Error("Purchase not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Purchase not found")
	}

	return c.NoContent(http.StatusNoContent)

}

func (h *PurchaseHandler) GetPurchaseByUser(c echo.Context) error {
	id_user, err := getUserId(c)
	if err != nil {
		log.Error("Invalid id user: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid id user")
	}

	purchases, err := h.Repo.GetPurchaseByUser(id_user)
	if err != nil {
		log.Error("Purchases not found ", err.Error())
		return c.JSON(http.StatusNotFound, "Purchases not found")
	}

	return c.JSON(http.StatusOK, purchases)
}

func (h *PurchaseHandler) MakeOrder(c echo.Context) error {
	var purchases []dtos.Purchase
	if err := c.Bind(&purchases); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := h.Repo.MakeOrder(purchases); err != nil {
		log.Error("Failed to make order. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to make order.")
	}

	return c.JSON(http.StatusCreated, purchases)
}
