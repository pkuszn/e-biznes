package main

import (
	"fmt"
	"go-rest-api/handlers"
	"go-rest-api/models"
	"go-rest-api/repository"
	"go-rest-api/routes"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

func main() {
	var attempt = 0
	var maxAttempts = 60
	for {
		attempt++
		fmt.Printf("Attempt %d to load environment file...\n", attempt)
		pwd, err := os.Getwd()
		if err != nil {
			panic(err)
		}
		err = godotenv.Load(filepath.Join(pwd, "./.env"))
		if err == nil {
			fmt.Printf("Environment file loaded successfully")
			break
		}

		fmt.Printf("Failed to load environment file: %v\n", err)
		if attempt >= maxAttempts {
			panic("Failed to load environemnt file")
		}

		fmt.Printf("Retrying in 5 seconds...\n")
		time.Sleep(5 * time.Second)
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

	dsn := "sqlserver://%s:%s@%s:%s?database=%s&connection+timeout=30"
	dsn = fmt.Sprintf(dsn,
		os.Getenv("USER"),
		os.Getenv("PASSWORD"),
		os.Getenv("SERVER"),
		os.Getenv("PORT"),
		os.Getenv("DATABASE"),
	)
	db := models.Initialize(dsn)
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
	e.POST("/auth/github/userinfo", func(c echo.Context) error {
		return gitHubAuthHandler.GetUserInfo(c)
	})

	api := e.Group("/api")
	routes.SetupRoutes(api)
	e.Logger.Fatal(e.Start(":1323"))
}

//test
