package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"vehicle-repair/backend/internal/config"
	"vehicle-repair/backend/internal/routes"
)

func main() {

	// Load .env (don’t crash if missing)
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system env")
	}

	// Connect DB
	config.ConnectDB()

	// Setup routes
	mux := http.NewServeMux()
	routes.SetupRoutes(mux)

	// Get port (default 8080)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server running on http://localhost:" + port)

	// 🔥 IMPORTANT: keep server alive + show errors
	err = http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}