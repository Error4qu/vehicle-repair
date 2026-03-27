package services

import (
	"time"
	"vehicle-repair/backend/internal/repository"
	"vehicle-repair/backend/internal/models"
)

func CreateBooking(req models.BookingRequest) models.BookingResponse {

	booking := models.Booking{
		FullName:         req.FullName,
		Phone:            req.Phone,
		VehicleType:      req.VehicleType,
		ServiceType:      req.ServiceType,
		PreferredDate:    req.PreferredDate,
		IssueDescription: req.IssueDescription,
		CreatedAt:        time.Now(),
	}

	// Save to DB
	err := repository.CreateBooking(booking)
	if err != nil {
		return models.BookingResponse{
			Message: "failed to save booking",
		}
	}

	return models.BookingResponse{
		BookingID: "BK-" + time.Now().Format("20060102150405"),
		Message:   "booking created successfully",
	}
}