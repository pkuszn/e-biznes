package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/models"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

const invalidOrderId = "Invalid order ID: "

type OrderHandler struct {
	Repo repository.OrderRepository
}

func NewOrderHandler(repo repository.OrderRepository) *OrderHandler {
	return &OrderHandler{Repo: repo}
}

func (h *OrderHandler) CreateOrder(c echo.Context) error {
	order := new(dtos.Order)
	if err := c.Bind(order); err != nil {
		log.Error(err.Error())
		return err
	}

	if err := h.Repo.CreateOrder(order); err != nil {
		log.Error("Failed to create the order. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the order.")
	}

	return c.JSON(http.StatusCreated, order)
}

func (h *OrderHandler) GetOrder(c echo.Context) error {
	orders, err := h.Repo.GetAllOrders()
	if err != nil {
		log.Error("Failed to retrieve orders. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve orders.")
	}
	return c.JSON(http.StatusOK, orders)
}

func (h *OrderHandler) GetOrderById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidOrderId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidOrderId)
	}

	order, err := h.Repo.GetOrderById(id)
	if err != nil {
		log.Error("order not found ", err.Error())
		return c.JSON(http.StatusNotFound, "order not found")
	}

	return c.JSON(http.StatusOK, order)
}

func (h *OrderHandler) UpdateOrder(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidOrderId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidOrderId)
	}
	var updatedorder dtos.Order
	if err := c.Bind(&updatedorder); err != nil {
		log.Error("Invalid request data ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid request data")
	}

	order := new(models.Order)
	if order, err = h.Repo.UpdateOrder(id, &updatedorder); err != nil {
		log.Error("Failed to update the order ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to update the order.")
	}

	return c.JSON(http.StatusOK, order)
}

func (h *OrderHandler) DeleteOrder(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error(invalidOrderId, err.Error())
		return c.JSON(http.StatusBadRequest, invalidOrderId)
	}

	if err := h.Repo.DeleteOrder(id); err != nil {
		log.Error("order not found ", err.Error())
		return c.JSON(http.StatusNotFound, "order not found")
	}

	return c.NoContent(http.StatusNoContent)

}

func (h *OrderHandler) GetOrderByUser(c echo.Context) error {
	id_user, err := getUserId(c)
	if err != nil {
		log.Error("Invalid id user: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid id user")
	}

	orders, err := h.Repo.GetOrderByUser(id_user)
	if err != nil {
		log.Error("orders not found ", err.Error())
		return c.JSON(http.StatusNotFound, "orders not found")
	}

	return c.JSON(http.StatusOK, orders)
}

func (h *OrderHandler) MakeOrder(c echo.Context) error {
	var order []dtos.OrderPurchase
	if err := c.Bind(&order); err != nil {
		log.Error(err.Error())
		return err
	}
	newOrder, err := h.Repo.MakeOrder(order)
	if err != nil {
		log.Error("Failed to create the order. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to create the order.")
	}

	return c.JSON(http.StatusCreated, newOrder)
}
