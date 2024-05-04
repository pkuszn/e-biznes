package handlers

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func getIntId(c echo.Context) (uint, error) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, err
	}
	return uint(id), nil
}

func getUserId(c echo.Context) (uint, error) {
	id_user_str := c.Param("id_user")
	id_user, err := strconv.Atoi(id_user_str)
	if err != nil {
		return 0, err
	}
	return uint(id_user), nil
}

func getCategoryId(c echo.Context) (uint, error) {
	id_category_str := c.Param("id_category")
	id_category, err := strconv.Atoi(id_category_str)
	if err != nil {
		return 0, err
	}
	return uint(id_category), nil
}
