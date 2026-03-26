package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

type BookingRequest struct {
	FullName        string `json:"fullName"`
	Phone           string `json:"phone"`
	VehicleType     string `json:"vehicleType"`
	ServiceType     string `json:"serviceType"`
	PreferredDate   string `json:"preferredDate"`
	IssueDescription string `json:"issueDescription"`
}

type BookingResponse struct {
	BookingID string `json:"bookingId"`
	Message   string `json:"message"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/bookings", bookingHandler)

	log.Println("Go API running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", withCORS(mux)); err != nil {
		log.Fatal(err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func bookingHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var booking BookingRequest
	if err := json.NewDecoder(r.Body).Decode(&booking); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "invalid request body"})
		return
	}

	if err := validateBooking(booking); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": err.Error()})
		return
	}

	id := "VR-" + time.Now().Format("20060102150405")
	response := BookingResponse{
		BookingID: id,
		Message:   "service request submitted",
	}
	writeJSON(w, http.StatusCreated, response)
}

func validateBooking(b BookingRequest) error {
	if strings.TrimSpace(b.FullName) == "" ||
		strings.TrimSpace(b.Phone) == "" ||
		strings.TrimSpace(b.VehicleType) == "" ||
		strings.TrimSpace(b.ServiceType) == "" ||
		strings.TrimSpace(b.PreferredDate) == "" ||
		strings.TrimSpace(b.IssueDescription) == "" {
		return &validationError{Message: "all fields are required"}
	}
	return nil
}

type validationError struct {
	Message string
}

func (e *validationError) Error() string {
	return e.Message
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next.ServeHTTP(w, r)
	})
}
