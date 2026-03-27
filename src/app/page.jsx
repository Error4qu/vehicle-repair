"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Booking Form Data ─── */
const emptyForm = {
  fullName: "",
  phone: "",
  vehicleType: "",
  serviceType: "",
  preferredDate: "",
  issueDescription: "",
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

/* ─── Service Cards Data ─── */
const services = [
  {
    title: "General Service",
    image: "/general-service.png",
    description: "Complete checkup & tune-up",
  },
  {
    title: "Engine Repair",
    image: "/engine-repair.png",
    description: "Diagnostics & engine overhaul",
  },
  {
    title: "Tyre Replacement",
    image: "/tire-replacement.png",
    description: "All brands & sizes available",
  },
  {
    title: "Oil Change",
    image: "/oil-change.png",
    description: "Synthetic & conventional oils",
  },
];

/* ─── How It Works Steps ─── */
const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Pick a Service",
    description: "Choose from our range of repair and maintenance services tailored for your vehicle.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Book a Slot",
    description: "Select your preferred date and time. We'll match you with a certified mechanic nearby.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Get It Done",
    description: "Your mechanic arrives on schedule. Relax while we take care of everything.",
  },
];

export default function Home() {
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function submitBooking(event) {
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
        throw new Error(errorData?.message ?? "Unable to submit service request.");
      }

      const data = await response.json();
      setMessage(`Request submitted! Booking ID: ${data.bookingId}`);
      setFormData(emptyForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field) {
    return (event) =>
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-sky-50 via-white to-white pt-16 pb-20 px-6 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            The easy, reliable way to{" "}
            <span className="text-blue-600">repair your vehicle.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto">
            Book trusted, experienced mechanics for any service — from routine
            maintenance to emergency repairs.
          </p>

          {/* CTA Cards – Like Handy's green/teal buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#book"
              className="group flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 no-underline hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Book a Repair
            </Link>
            <Link
              href="#services"
              className="group flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-300 no-underline hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES GRID
          ══════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Repair & Maintenance Services
              </h2>
              <p className="mt-2 text-gray-500">
                Instantly book highly rated mechanics at upfront prices.
              </p>
            </div>
            <Link href="#services" className="hidden md:inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline no-underline">
              See All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href="#book"
                className="group block bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">{service.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
          ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Simple Process
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Getting your vehicle serviced has never been this easy.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-blue-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md shadow-blue-600/30">
                  {index + 1}
                </div>
                <div className="text-blue-600 mb-5 pt-2">{step.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GUARANTEE SECTION – Dark navy like Handy's
          ══════════════════════════════════════════════════════════ */}
      <section id="guarantee" className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left – Dark content */}
          <div className="bg-slate-800 text-white py-20 px-6 md:px-16 flex flex-col justify-center">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                ✦ Our Promise
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Your Satisfaction,{" "}
                <span className="text-teal-400">Guaranteed</span>
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                If you&apos;re not happy, we&apos;ll work to make it right. Our friendly
                support team is available 24/7. The VehicleRepair Guarantee applies
                when you book and pay through our platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Verified Mechanics
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Upfront Pricing
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  24/7 Support
                </div>
              </div>
              <Link
                href="#book"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-white transition-colors no-underline"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Right – Hero image */}
          <div className="relative min-h-[400px] md:min-h-0">
            <Image
              src="/hero-mechanic.png"
              alt="Trusted mechanic working on vehicle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BOOKING FORM SECTION
          ══════════════════════════════════════════════════════════ */}
      <section id="book" className="py-20 px-6 bg-white">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Book Now
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Schedule Your Service
            </h2>
            <p className="mt-3 text-gray-500">
              Fill in the details and we&apos;ll assign a certified mechanic right away.
            </p>
          </div>

          <form
            className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm"
            onSubmit={submitBooking}
          >
            <div className="grid gap-5">
              {/* Full Name */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-gray-700">Full Name</span>
                <input
                  required
                  placeholder="John Doe"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                />
              </label>

              {/* Phone */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-gray-700">Phone Number</span>
                <input
                  required
                  placeholder="+91 98765 43210"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                />
              </label>

              {/* Vehicle & Service selects side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="grid gap-1.5">
                  <span className="text-sm font-semibold text-gray-700">Vehicle Type</span>
                  <select
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    value={formData.vehicleType}
                    onChange={handleChange("vehicleType")}
                  >
                    <option value="" disabled>Select vehicle</option>
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Truck">Truck</option>
                  </select>
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-semibold text-gray-700">Service Type</span>
                  <select
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    value={formData.serviceType}
                    onChange={handleChange("serviceType")}
                  >
                    <option value="" disabled>Select service</option>
                    <option value="General Service">General Service</option>
                    <option value="Engine Check">Engine Check</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tyre Replacement">Tyre Replacement</option>
                    <option value="Emergency Repair">Emergency Repair</option>
                  </select>
                </label>
              </div>

              {/* Date */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-gray-700">Preferred Date</span>
                <input
                  required
                  type="date"
                  min={minDate}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
                  value={formData.preferredDate}
                  onChange={handleChange("preferredDate")}
                />
              </label>

              {/* Issue */}
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-gray-700">Describe the Issue</span>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what's wrong with your vehicle..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-y"
                  value={formData.issueDescription}
                  onChange={handleChange("issueDescription")}
                />
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {isSubmitting ? "Submitting..." : "Book Service →"}
              </button>
            </div>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-semibold text-gray-800 m-0">{message}</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BECOME A PRO CTA
          ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Are You a Five Star Mechanic?
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed max-w-md">
              From general servicing to engine overhauls, VehicleRepair is always
              looking for skilled mechanics. Join our platform to find jobs with
              no lead fees and flexible scheduling.
            </p>
            <Link
              href="#"
              className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 no-underline hover:-translate-y-0.5"
            >
              Become a Pro
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/hero-mechanic.png"
              alt="Professional mechanic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
