package routes

import (
	"net/http"

	"vehicle-repair/backend/internal/handlers"
)

func SetupRoutes(mux *http.ServeMux) {
	// Root route (prevents infinite loading on "/")
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Backend is running 🚀"))
	})

	// Health check
	mux.HandleFunc("/health", handlers.HealthHandler)

	// Booking API
	mux.HandleFunc("/api/bookings", handlers.BookingHandler)
}