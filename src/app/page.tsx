"use client";

import { FormEvent, useMemo, useState } from "react";

type Booking = {
  fullName: string;
  phone: string;
  vehicleType: string;
  serviceType: string;
  preferredDate: string;
  issueDescription: string;
};

const emptyForm: Booking = {
  fullName: "",
  phone: "",
  vehicleType: "",
  serviceType: "",
  preferredDate: "",
  issueDescription: "",
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function Home() {
  const [formData, setFormData] = useState<Booking>(emptyForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ?? "Unable to submit service request."
        );
      }

      const data = await response.json();
      setMessage(`Request submitted. Booking ID: ${data.bookingId}`);
      setFormData(emptyForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Online Vehicle Repair Service</h1>
        <p className="subtext">
          Book a mechanic visit or workshop slot in minutes.
        </p>

        <form className="form" onSubmit={submitBooking}>
          <label>
            Full Name
            <input
              required
              value={formData.fullName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, fullName: event.target.value }))
              }
            />
          </label>

          <label>
            Phone Number
            <input
              required
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </label>

          <label>
            Vehicle Type
            <select
              required
              value={formData.vehicleType}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, vehicleType: event.target.value }))
              }
            >
              <option value="">Select vehicle</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Scooter">Scooter</option>
              <option value="Truck">Truck</option>
            </select>
          </label>

          <label>
            Service Type
            <select
              required
              value={formData.serviceType}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, serviceType: event.target.value }))
              }
            >
              <option value="">Select service</option>
              <option value="General Service">General Service</option>
              <option value="Engine Check">Engine Check</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tyre Replacement">Tyre Replacement</option>
              <option value="Emergency Repair">Emergency Repair</option>
            </select>
          </label>

          <label>
            Preferred Date
            <input
              required
              type="date"
              min={minDate}
              value={formData.preferredDate}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  preferredDate: event.target.value,
                }))
              }
            />
          </label>

          <label>
            Describe the Issue
            <textarea
              required
              rows={4}
              value={formData.issueDescription}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  issueDescription: event.target.value,
                }))
              }
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Book Service"}
          </button>
        </form>

        {message ? <p className="message">{message}</p> : null}
      </section>
    </main>
  );
}
