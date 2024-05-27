package main

import (
	"fmt"
	"go-rest-api/handlers"
	"go-rest-api/models"
	"go-rest-api/repository"
	"go-rest-api/routes"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

func main() {

	pwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	err = godotenv.Load(filepath.Join(pwd, "./.env"))
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println(fmt.Sprintf("GITHUB_CLIENT_ID=%s", os.Getenv("GITHUB_CLIENT_ID")))

	var GithubOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:1323/auth/github/callback",
		Scopes:       []string{"read:user"},
		Endpoint:     github.Endpoint,
	}

	e := echo.New()

	e.Use(middleware.Logger())  // Logger
	e.Use(middleware.Recover()) // Recover
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	dbURL := "mysql:mysql@tcp(localhost:3306)/product?parseTime=true"
	db := models.Initialize(dbURL)
	models.Migrate(db)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	githubAuthRepo := repository.NewGormTokenRepository(models.DB)
	gitHubAuthHandler := handlers.NewGithubAuthHandler(githubAuthRepo)
	e.GET("/auth/github", func(c echo.Context) error {
		return gitHubAuthHandler.LoginGithub(c, GithubOauthConfig)
	})
	e.GET("/auth/github/callback", func(c echo.Context) error {
		return gitHubAuthHandler.CallbackGithub(c, db, GithubOauthConfig)
	})

	api := e.Group("/api")
	routes.SetupRoutes(api)
	e.Logger.Fatal(e.Start(":1323"))
}

//test
