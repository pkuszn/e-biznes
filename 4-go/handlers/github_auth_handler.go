package handlers

import (
	"context"
	"encoding/json"
	"go-rest-api/dtos"
	"go-rest-api/repository"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

// GithubAuthHandler handles GitHub authentication.
type GithubAuthHandler struct {
	Repo repository.TokenRepository
}

// NewGithubAuthHandler creates a new GithubAuthHandler.
func NewGithubAuthHandler(repo repository.TokenRepository) *GithubAuthHandler {
	return &GithubAuthHandler{Repo: repo}
}

// LoginGithub redirects the user to the GitHub login page.
func (h *GithubAuthHandler) LoginGithub(c echo.Context, o *oauth2.Config) error {
	url := o.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// CallbackGithub handles the GitHub OAuth callback and exchanges the code for a token.
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

	// Redirect to homepage with token
	redirectURL := os.Getenv("REDIRECT_URL") + "?token=" + user.Token
	return c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

// GetUserInfo retrieves user information based on the provided token.
func (h *GithubAuthHandler) GetUserInfo(c echo.Context) error {
	token := new(dtos.Token)
	if err := c.Bind(token); err != nil {
		log.Error(err.Error())
		return c.String(http.StatusBadRequest, "Token is required")
	}

	user, err := h.Repo.GetUserInfo(token)
	if err != nil {
		return c.String(http.StatusNotFound, "User not found: "+err.Error())
	}

	return c.JSON(http.StatusOK, user)
}
