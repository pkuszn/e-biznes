package handlers

import (
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type StatusHandler struct {
	Repo repository.StatusRepository
}

func NewStatusHandler(repo repository.StatusRepository) *StatusHandler {
	return &StatusHandler{Repo: repo}
}

func (h *StatusHandler) GetStatus(c echo.Context) error {
	statuses, err := h.Repo.GetAllStatuses()
	if err != nil {
		log.Error("Failed to retrieve statuses. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve statuses.")
	}
	return c.JSON(http.StatusOK, statuses)
}

func (h *StatusHandler) GetStatusById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid status ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid status ID")
	}

	status, err := h.Repo.GetStatusById(id)
	if err != nil {
		log.Error("status not found ", err.Error())
		return c.JSON(http.StatusNotFound, "status not found")
	}

	return c.JSON(http.StatusOK, status)

}
