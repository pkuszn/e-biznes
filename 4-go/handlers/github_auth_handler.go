package handlers

import (
	"context"
	"encoding/json"
	"go-rest-api/dtos"
	"go-rest-api/repository"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

type GithubAuthHandler struct {
	Repo repository.TokenRepository
}

func NewGithubAuthHandler(repo repository.TokenRepository) *GithubAuthHandler {
	return &GithubAuthHandler{Repo: repo}
}

func (h *GithubAuthHandler) LoginGithub(c echo.Context, o *oauth2.Config) error {
	url := o.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *GithubAuthHandler) CallbackGithub(c echo.Context, db *gorm.DB, o *oauth2.Config) error {
	code := c.QueryParam("code")

	token, err := o.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to exchange token: "+err.Error())
	}

	client := o.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to get user info: "+err.Error())
	}
	defer resp.Body.Close()

	var userInfo *dtos.UserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return c.String(http.StatusInternalServerError, "Failed to parse user info: "+err.Error())
	}
	var user = h.Repo.FirstOrCreate(userInfo)

	return c.JSON(http.StatusOK, map[string]string{
		"token": user.Token,
		"user":  user.Name,
	})
}
