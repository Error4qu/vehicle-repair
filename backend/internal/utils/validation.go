package utils

import (
	"errors"
	"strings"

	"vehicle-repair/backend/internal/models"
)

func ValidateBooking(b models.BookingRequest) error {

	if strings.TrimSpace(b.FullName) == "" {
		return errors.New("full name is required")
	}

	if strings.TrimSpace(b.Phone) == "" {
		return errors.New("phone is required")
	}

	if strings.TrimSpace(b.VehicleType) == "" {
		return errors.New("vehicle type is required")
	}

	if strings.TrimSpace(b.ServiceType) == "" {
		return errors.New("service type is required")
	}

	if strings.TrimSpace(b.PreferredDate) == "" {
		return errors.New("preferred date is required")
	}

	if strings.TrimSpace(b.IssueDescription) == "" {
		return errors.New("issue description is required")
	}

	return nil
}