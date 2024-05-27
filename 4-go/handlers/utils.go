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
	idUserStr := c.Param("id_user")
	idUser, err := strconv.Atoi(idUserStr)
	if err != nil {
		return 0, err
	}
	return uint(idUser), nil
}

func getCategoryId(c echo.Context) (uint, error) {
	idCategoryStr := c.Param("id_category")
	id_category, err := strconv.Atoi(idCategoryStr)
	if err != nil {
		return 0, err
	}
	return uint(id_category), nil
}
