package repository

import (
	"vehicle-repair/backend/internal/config"
	"vehicle-repair/backend/internal/models"
)

func CreateBooking(b models.Booking) error {
	return config.DB.Create(&b).Error
}