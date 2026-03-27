package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"vehicle-repair/backend/internal/models"
	"vehicle-repair/backend/internal/services"
	"vehicle-repair/backend/internal/utils"
)

// ✅ Health Handler
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Health endpoint hit")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok"}`))
}

// ✅ Booking Handler
func BookingHandler(w http.ResponseWriter, r *http.Request) {

	log.Println("Booking API hit 🚀")

	// Handle CORS preflight
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	// Only POST allowed
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var booking models.BookingRequest

	// Decode request
	err := json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"message": "invalid request body",
		})
		return
	}

	// Validate input
	err = utils.ValidateBooking(booking)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	// Call service
	response := services.CreateBooking(booking)

	writeJSON(w, http.StatusCreated, response)
}

// ✅ Helper function
func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}