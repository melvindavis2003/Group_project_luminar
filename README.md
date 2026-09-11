# Meetco Events - Event Management Booking Platform

A modern, responsive, animation-rich **Event Management Booking Website** built with **HTML5**, **CSS3**, **Tailwind CSS**, and **GSAP 3** animations, styled with the premium **Meetco** design system.

---

## 📌 Project Overview

- **Objective**: Design and develop a comprehensive Event Management Booking Website allowing clients to explore event services, view upcoming events, inspect gallery showcases, register, log in, submit real-time event booking requests, and contact the organization.
- **Aesthetic**: Authentic Meetco Conference & Event Template styling (`#ffe04b`, `#260f8f`, `#00b8ff`, `#131053`).
- **Live / Local URL**: `http://localhost:8080`
- **Submission Date**: 05/09/2026

---

## 🛠️ Technologies Required & Used

- **HTML5**: Semantic tags, accessible forms, meta descriptions, and clean structure.
- **CSS3**: Custom keyframe animations, glassmorphism, polygon clipping badges, and CSS variables.
- **Tailwind CSS**: Utility-first styling, responsive flexbox & grid layouts, hover micro-interactions.
- **GSAP 3 Animation Library**:
  - Hero Section: Fade In & Slide Up animations.
  - Event Cards & Services: Stagger reveal animations with `ScrollTrigger`.
  - Contact Form: Scale bounce effect on submission.
  - Navigation Menu: Smooth entrance reveal.
  - Animated Counters: ScrollTrigger numerical odometer count-ups.
  - Mouse Parallax: Floating hero cutouts and magnetic cursor buttons (`.forum-circle-btn`).

---

## 📄 Pages Delivered

### 1. Home Page (`index.html`)
- **Navigation Bar**: Links to Home, Services, Gallery, Upcoming, Pricing, Booking, Contact, Login, Register + Offcanvas drawer.
- **Hero Section**: Meetco banner, website title, company introduction, magnetic circular CTA button, dual floating figures with mouse parallax.
- **About Section**: Comprehensive description of the event management company with 4 animated statistics counters (`28K+`, `450+`, `40+`, `100%`).
- **Events Gallery**: 5 filterable category tabs:
  - 🎉 Birthday Parties
  - 📸 Photography Sessions
  - 💒 Weddings
  - 💼 Corporate Events
  - 📚 Workshops & Seminars
- **Upcoming Events Section**: 4 event cards (Wedding Event, Birthday Celebration, Photography Event, Corporate Meet) with images, dates, locations, and booking links.
- **Services Section**: 5 core services (Birthday Party Planning, Wedding Management, Photography Services, Corporate Event Management, Workshops & Seminars) with detailed feature checklists.
- **Pricing Packages**: Silver, Gold (Featured), and Platinum packages with full breakdown.
- **Testimonials Section**: Carousel review slider with star ratings, client quotes, and next/prev controls.
- **FAQ Section**: Interactive accordion addressing common client questions.
- **Footer**: Company information, contact pills, social media icons, and copyright.

### 2. Login Page (`login.html`)
- **Form Fields**: Username / Email, Password, Remember Me option.
- **Buttons**: Login button.
- **Additional Link**: "Don't have an account? Register Here" (`register.html`).

### 3. Registration Page (`register.html`)
- **Form Fields**: Username, Email Address, Password, Confirm Password.
- **Interactive Feature**: Real-time password match validation indicator.
- **Buttons**: Register button.
- **Additional Link**: "Already have an account? Login Here" (`login.html`).

### 4. Booking Page (`booking.html`)
- **Booking Form Fields** (All 8 required fields):
  1. Full Name
  2. Email Address
  3. Phone Number
  4. Event Date
  5. Event Type dropdown (Birthday Party, Photography Session, Wedding, Corporate Event, Workshop/Seminar)
  6. Event Location / Preferred Venue
  7. Number of Guests
  8. Additional Notes / Special Requests
- **Interactive Feature**: Real-time live estimate calculation sidebar and confirmation modal on submit.
- **Button**: Submit Booking.

### 5. Contact Page (`contact.html`)
- **Contact Information**: Company Address, Email, Phone Number.
- **Contact Form**: Name, Email, Message.
- **Button**: Send Message with **GSAP scale effect animation**.
- **Interactive Feature**: Success confirmation banner.

---

## 🎨 Design System & Additional Features

- **Meetco Design System**: Authentic Meetco typography (`ARPDisplay`, `Inter`), 10px corners, soft shadows, and vibrant palette.
- **Responsive Web Design**: 100% responsive across Mobile, Tablet, Laptop, and 4K Desktop viewports.
- **Assets**: 83 authentic Meetco images, SVGs, logos, speaker portraits, and decorative shapes downloaded locally in `assets/img/`.

---

## 🚀 How to Run Locally

1. Open your terminal in the project directory.
2. Start the local web server:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   - Home: `http://localhost:8080/index.html`
   - Booking: `http://localhost:8080/booking.html`
   - Contact: `http://localhost:8080/contact.html`
   - Login: `http://localhost:8080/login.html`
   - Register: `http://localhost:8080/register.html`
