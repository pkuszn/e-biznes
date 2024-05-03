package handlers

import (
	"go-rest-api/dtos"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type UserHandler struct {
	Repo repository.UserRepository
}

func NewUserHandler(repo repository.UserRepository) *UserHandler {
	return &UserHandler{Repo: repo}
}

func (h *UserHandler) GetUser(c echo.Context) error {
	users, err := h.Repo.GetAllUsers()
	if err != nil {
		log.Error("Failed to retrieve users. ", err.Error())
		return c.JSON(http.StatusInternalServerError, "Failed to retrieve users.")
	}
	return c.JSON(http.StatusOK, users)
}

func (h *UserHandler) GetUserById(c echo.Context) error {
	id, err := getIntId(c)
	if err != nil {
		log.Error("Invalid user ID: ", err.Error())
		return c.JSON(http.StatusBadRequest, "Invalid user ID")
	}

	user, err := h.Repo.GetUserById(id)
	if err != nil {
		log.Error("user not found ", err.Error())
		return c.JSON(http.StatusNotFound, "user not found")
	}

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) FindByName(c echo.Context) error {
	userName := new(dtos.UserName)
	if err := c.Bind(userName); err != nil {
		log.Error(err.Error())
		return err
	}

	user, err := h.Repo.FindByName(userName.Name)
	if err != nil {
		log.Error("User not found", err.Error())
		return c.JSON(http.StatusBadRequest, "User not found")
	}

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) CheckUser(c echo.Context) error {
	userNamePassword := new(dtos.UserNamePassword)
	if err := c.Bind(userNamePassword); err != nil {
		log.Error(err.Error())
		return err
	}

	user, err := h.Repo.CheckUser(userNamePassword.Name, userNamePassword.Password)
	if err != nil {
		log.Error("User not found. Provided password is invalid", err.Error())
		return c.JSON(http.StatusBadRequest, "User not found")
	}

	return c.JSON(http.StatusOK, user)
}
