package handlers

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func getName(c echo.Context) (string, error) {
	name := c.Param("name")
	if name == "" {
		return "", nil
	}
	return string(name), nil
}

func getIntId(c echo.Context) (uint, error) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, err
	}
	return uint(id), nil
}

func getPassword(c echo.Context) (string, error) {
	password := c.Param("password")
	if password == "" {
		return "", nil
	}
	return string(password), nil
}

func getUserId(c echo.Context) (uint, error) {
	id_user_str := c.Param("id_user")
	id_user, err := strconv.Atoi(id_user_str)
	if err != nil {
		return 0, err
	}
	return uint(id_user), nil
}
