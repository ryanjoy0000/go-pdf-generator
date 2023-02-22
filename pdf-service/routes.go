package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

func(c *Config)routes() http.Handler{
	// set up mux
	chiMux := chi.NewRouter()

	// specify who is allowed to connect
	chiMux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF_Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// check if service is still alive
	chiMux.Use(middleware.Heartbeat("/ping"))

	// configure routes
	chiMux.Post("/fileToPdf", c.fileToPdf)
	chiMux.Post("/textToPdf", c.textToPdf)
	chiMux.Get("/download", c.download)

	return chiMux
}