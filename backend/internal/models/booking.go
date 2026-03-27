package models

import "time"

type Booking struct {
	ID               uint `gorm:"primaryKey"`
	FullName         string
	Phone            string
	VehicleType      string
	ServiceType      string
	PreferredDate    string
	IssueDescription string
	CreatedAt        time.Time
}

type BookingRequest struct {
	FullName         string `json:"fullName"`
	Phone            string `json:"phone"`
	VehicleType      string `json:"vehicleType"`
	ServiceType      string `json:"serviceType"`
	PreferredDate    string `json:"preferredDate"`
	IssueDescription string `json:"issueDescription"`
}

type BookingResponse struct {
	BookingID string `json:"bookingId"`
	Message   string `json:"message"`
}