# Meetco Events - Complete Codebase Guide & Architecture Walkthrough

> **Purpose of this Guide**: This document is an all-in-one educational and architectural reference for the **Meetco Events** project. It is structured specifically for **beginner-to-intermediate developers and students**, explaining *what* every part of the codebase does, *why* it was built that way, and *how to explain it during a project evaluation or viva*.

---

## Table of Contents
1. [Project Overview & Tech Stack](#1-project-overview--tech-stack)
2. [Folder & File Structure](#2-folder--file-structure)
3. [Design System & CSS Deep Dive (`css/style.css`)](#3-design-system--css-deep-dive-cssstylecss)
4. [JavaScript Engine Deep Dive (`js/main.js`)](#4-javascript-engine-deep-dive-jsmainjs)
5. [Page-by-Page HTML Walkthrough](#5-page-by-page-html-walkthrough)
6. [Interactive Features Explained (Code Snippets & Logic)](#6-interactive-features-explained-code-snippets--logic)
7. [Viva & Project Evaluation Cheat Sheet (Questions & Answers)](#7-viva--project-evaluation-cheat-sheet-questions--answers)
8. [Glossary of Key Web Development Concepts](#8-glossary-of-key-web-development-concepts)

---

## 1. Project Overview & Tech Stack

### What is Meetco Events?
Meetco Events is a responsive, multi-page web application designed for a luxury event management company. It allows users to:
- Browse corporate, wedding, birthday, workshop, and photography event services.
- Filter an interactive visual gallery.
- Calculate real-time event pricing based on guest counts in Indian Rupees (₹).
- Reserve dates via an accessible booking form with instant confirmation feedback.
- Toggle between light and dark themes with persistent user preferences.
- Ask questions or submit reviews with an interactive 5-star rating system.

### Tech Stack Breakdown

| Technology | Role in Project | Why This Was Chosen |
| :--- | :--- | :--- |
| **HTML5** | Structure & Semantics | Standard semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`) improve search engine indexing (SEO), accessibility (screen readers), and code readability. |
| **Vanilla CSS3** | Custom Styling & Animations | Used for CSS variables (`:root`), `@keyframes` animations (marquee, bounce loader, floating cutouts), `@font-face` font binding, and dark mode overrides. |
| **Tailwind CSS (CDN)** | Utility-First Layout | Rapid responsive layouts using Flexbox (`flex`, `items-center`) and Grid (`grid-cols-1 md:grid-cols-3`), mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`), and spacing utilities. |
| **GSAP 3 & ScrollTrigger** | High-Performance Animations | GreenSock Animation Platform (GSAP) provides smooth 60fps animations, timeline sequencing, and scroll-activated triggers that are difficult and laggy to write in pure CSS. |
| **Vanilla JavaScript (ES6+)** | Logic & DOM Manipulation | No heavy frontend frameworks (React/Vue) were needed. Native JavaScript keeps load times instant, has zero build-step overhead, and makes DOM manipulation easy to understand and demonstrate. |
| **Font Awesome 6** | UI Vector Icons | Standardized icon library for contact symbols, stars, arrows, calendars, and hamburger bars. |

---

## 2. Folder & File Structure

```text
Group_project_luminar/
├── assets/
│   ├── fonts/
│   │   ├── ARP-240.woff     <- Custom display typography for headings
│   │   └── ARP-240.woff2    <- Optimized web font format
│   └── img/
│       ├── about/           <- Event and company photos
│       ├── brand/           <- Partner venue logos (marquee)
│       ├── gallery/         <- 15+ high-res images for gallery categories
│       ├── hero/            <- Hero cutouts with mouse parallax
│       ├── icon/            <- Vector icons (SVG)
│       └── logo/            <- Brand logos (logo.svg, logo-two.svg, footer-logo.svg)
├── css/
│   └── style.css            <- Design tokens, keyframe animations & dark theme
├── js/
│   └── main.js              <- Complete client-side interactivity engine
├── index.html               <- Main landing page (Hero, Services, Gallery, FAQ, Reviews)
├── booking.html             <- 8-field booking form with real-time price calculator
├── contact.html             <- Contact cards & inquiry form with scale animation
├── login.html               <- User authentication portal
├── register.html            <- Registration form with live password matching
├── README.md                <- Documentation & live link
└── CODEBASE_GUIDE.md        <- This comprehensive architectural guide
```

---

## 3. Design System & CSS Deep Dive (`css/style.css`)

### 3.1. Design Tokens (`:root` and CSS Variables)
Located at lines 13–26 of `css/style.css`:
```css
:root {
  --font-body: 'Inter', sans-serif;
  --font-heading: 'ARPDisplay', 'Plus Jakarta Sans', sans-serif;
  --color-primary: #ffe04b;      /* Vibrant Yellow */
  --color-secondary: #00b8ff;    /* Cyan / Sky Blue */
  --color-heading: #131053;      /* Deep Royal Navy */
  --color-purple: #260f8f;       /* Brand Purple */
  --color-body: #414047;         /* Charcoal Gray for Body Text */
  --color-bg-light: #f2f2f2;     /* Subtle Off-white Section BG */
  --radius-meetco: 10px;         /* Standardized Rounded Corners */
  --shadow-meetco-card: 0 10px 21px 0 rgba(206, 208, 218, 0.49);
}
```
**Why use CSS Variables?**
Instead of hardcoding `#ffe04b` in 50 different places, defining variables in `:root` allows central changes. When switching to Dark Mode, we only need to redefine the tokens under `.dark`:
```css
.dark {
  --color-heading: #ffffff;
  --color-body: #cbd5e1;
  --color-bg-light: #0f0c36;
}
```

### 3.2. Custom Typography Loading
```css
@font-face {
  font-family: 'ARPDisplay';
  src: url('../assets/fonts/ARP-240.woff2') format('woff2'),
       url('../assets/fonts/ARP-240.woff') format('woff');
  font-weight: 700 900;
  font-display: swap;
}
```
- `font-display: swap`: Tells the browser to display fallback text immediately and swap to the custom font once downloaded, preventing invisible text while loading.

### 3.3. Keyframe Animations
1. **Bounce Preloader (`@keyframes barBounce`)**: Scales the vertical height (`scaleY(0.4)` to `scaleY(1.25)`) of 4 colored bars with staggered `animation-delay` (0.15s, 0.3s, 0.45s).
2. **Infinite Marquee (`@keyframes scrollLeft` & `scrollRight`)**: Smoothly translates partner logo containers from `0` to `-100%`. Using `animation-play-state: paused` on `:hover` allows users to pause the logos by placing their mouse over them.
3. **Gentle Floating (`@keyframes floatUp`)**: Subtle vertical float (`translateY(-12px)`) applied to background shapes.

---

## 4. JavaScript Engine Deep Dive (`js/main.js`)

The entire client-side logic lives in `js/main.js`. It is wrapped in:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // All scripts run after HTML markup is parsed
});
```
This ensures JavaScript doesn't attempt to find elements (`document.getElementById`) before the browser has built the DOM tree.

### Core Modules in `js/main.js`:

| Module | Purpose | Key Technique |
| :--- | :--- | :--- |
| **GSAP Setup** | Registers ScrollTrigger plugin | `gsap.registerPlugin(ScrollTrigger)` |
| **Custom Cursor** | Dual dot & ring mouse tracker | `gsap.quickTo()` for low-latency cursor following |
| **Preloader** | Fades out loading screen when assets finish loading | `window.addEventListener('load', ...)` + fallback timer |
| **Sticky Navigation** | Resizes header padding when user scrolls > 30px | `window.scrollY > 30` toggles `.meetco-nav-scrolled` |
| **Active Nav Tracker** | Highlights menu link based on which section is on screen | Compares `window.scrollY + 140` against section offsets |
| **Smooth Anchor Scroll**| Smooth scrolling that accounts for fixed navbar height | `window.scrollTo({ top: pos - headerOffset, behavior: 'smooth' })` |
| **Offcanvas Drawer** | Slide-out navigation sidebar | Adds `.active` and sets `body.style.overflow = 'hidden'` |
| **Magnetic Buttons** | Circular CTA buttons pull slightly towards mouse | `e.clientX - rect.left - width/2` |
| **Hero Parallax** | Two cutout images shift in opposite directions on mousemove | Coordinate normalization: `(clientX - centerX) / centerX` |
| **Gallery Filter** | Filter photos by Category (Wedding, Birthday, etc.) | Data-attribute matching (`data-category`) with GSAP scale/fade |
| **Testimonial Slider** | Interactive carousel with next/prev buttons & touch swipe | CSS `translateX(-targetX)` calculation + touch event coordinates |
| **FAQ Accordion** | Expanding/collapsing question tabs | Toggles `.active` class with CSS `max-height` transition |
| **Animated Counters** | Numbers count up from 0 to target when scrolled into view | GSAP tween with `snap: { innerHTML: 1 }` |
| **Booking Calculator** | Calculates total price in real time as inputs change | Object lookup map `pricingMap[type].base + (guests * perGuest)` |
| **Form Validation** | Verifies password and confirm password match | Compares `.value` properties on the `input` event |
| **Inquiry & Review Tab**| Switches form between Question mode and 5-Star Review mode | Changes tab classes, displays star buttons, updates labels |
| **Dark Mode Manager** | Saves preference to localStorage and updates theme | Toggles `.dark` on `document.documentElement`, swaps logo |

---

## 5. Page-by-Page HTML Walkthrough

### 1. `index.html` (Landing Page)
- **Immediate Theme Script (`<head>`)**: Executes synchronously before `<body>` renders to check `localStorage.getItem('meetco_theme')`. This eliminates the "Flash of Unstyled Content" (FOUC) where a dark theme user briefly sees a bright white page.
- **Hero Section**: Displays the headline, date/venue badges (`Luminar Technology, Thrissur`), and the magnetic circle CTA button.
- **Partner Marquee**: Two duplicated track rows of logos that create a continuous loop.
- **About Section**: Company background with 4 numerical stat counters (`28K+`, `450+`, `40+`, `100%`).
- **Events Gallery**: Tab bar with 5 buttons (`data-filter="wedding"`, etc.) and 15 photo cards.
- **Upcoming Events**: 4 featured cards displaying dates, ticket links, and location pills.
- **Services Grid**: 5 high-contrast service cards arranged with 3 on the top row and 2 centered below.
- **Pricing Tiers**: Silver, Gold (Featured with yellow accent), and Platinum packages.
- **Testimonial Slider**: Horizontal sliding track with client quotes and review avatars.
- **FAQ Accordion**: 4 toggleable question panels.
- **Inquiry & Review Card**: Compact form allowing users to submit either a question or a 5-star rating.
- **Footer**: Navigation links, 3 contact capsules (`+91 8547228913`), and submission date (`19/09/2026`).

### 2. `booking.html` (Reservation & Live Calculator)
- Contains an **8-field booking form**:
  1. Full Name
  2. Email Address
  3. Phone Number (`+91 8547228913`)
  4. Event Date (`<input type="date">`)
  5. Event Type (Wedding, Birthday Party, Photography, Corporate Event, Workshop)
  6. Number of Guests (Number input with min/max)
  7. Event Location (`Luminar Technology, Thrissur`)
  8. Additional Notes / Special Requests
- Features a **Live Summary Sidebar**: Automatically updates the selected event type, guest count, and estimated total in ₹ as the user types.
- **Confirmation Modal**: Pops up with a bounce animation upon submission and resets the form.

### 3. `contact.html` (Specialists & Inquiry)
- Features 3 highlight cards: Company Address (`Luminar Technology, Thrissur`), Support Email, and Phone Number.
- Contact form with name, email, and message inputs.
- Form submit animation: GSAP timeline creates a scale bounce effect (`scale: 0.97` -> `scale: 1.02` -> `scale: 1.0`) followed by a green success alert.

### 4. `login.html` (Client Portal)
- Secure login card for returning clients.
- Clean inputs with icons for Username/Email and Password.
- Remember me checkbox and direct link to `register.html`.

### 5. `register.html` (Account Creation)
- 4 inputs: Username, Email, Password, Confirm Password.
- Real-time client-side password verification that informs the user immediately if passwords do not match before form submission.
- Link redirecting back to `login.html`.

---

## 6. Interactive Features Explained (Code Snippets & Logic)

### A. Dark Mode with LocalStorage Persistence
```javascript
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('meetco_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('meetco_theme', 'light');
  }
  // Toggle moon/sun icon
  themeToggleBtns.forEach(btn => {
    btn.innerHTML = isDark
      ? '<i class="fa-solid fa-sun text-base text-meetco-yellow"></i>'
      : '<i class="fa-solid fa-moon text-base text-meetco-navy"></i>';
  });
  // Swap logo for dark contrast
  headerLogos.forEach(logo => {
    logo.src = isDark ? 'assets/img/logo/logo-two.svg' : 'assets/img/logo/logo.svg';
  });
}
```
**Why this matters**: `localStorage` keeps data in the user's browser across page refreshes and page transitions. When a user navigates from `index.html` to `booking.html`, the dark mode remains active.

---

### B. Real-Time Price Calculation
```javascript
const pricingMap = {
  'Birthday Party': { base: 25000, perGuest: 450 },
  'Photography Session': { base: 15000, perGuest: 250 },
  'Wedding': { base: 65000, perGuest: 800 },
  'Corporate Event': { base: 45000, perGuest: 550 },
  'Workshop/Seminar': { base: 25000, perGuest: 350 },
};

function updateBookingSummary() {
  const type = eventTypeSelect.value;
  const guests = parseInt(guestCountInput.value) || 50;
  const rates = pricingMap[type];
  const total = rates.base + (guests * rates.perGuest);

  summaryEstimatedTotal.innerText = '₹' + total.toLocaleString('en-IN');
}
```
- **How it works**: An event listener on both `change` (dropdown) and `input` (number field) triggers this calculation immediately whenever the user alters any field.
- `.toLocaleString('en-IN')` formats numbers into Indian numbering format (e.g. `1,25,000` instead of `125000`).

---

### C. Live Password Match Checker
```javascript
function checkPasswords() {
  if (!confirmInput.value) {
    matchIndicator.innerText = '';
    return;
  }
  if (passwordInput.value === confirmInput.value) {
    matchIndicator.innerText = '✓ Passwords match';
    matchIndicator.className = 'text-xs text-emerald-500 font-semibold mt-1';
  } else {
    matchIndicator.innerText = '✗ Passwords do not match';
    matchIndicator.className = 'text-xs text-red-500 font-semibold mt-1';
  }
}
```
- Listens to the `input` event on both password fields so feedback is instant.

---

### D. Category Gallery Filtering
```javascript
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (filter === 'all' || itemCategory === filter) {
        item.classList.remove('hidden-item');
        gsap.fromTo(item, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.35 });
      } else {
        item.classList.add('hidden-item');
      }
    });
  });
});
```
- Pure CSS hides the element (`display: none` / `visibility: hidden`), while GSAP handles the smooth scale and fade-in for items that match the selected category.

---

### E. ScrollTrigger Animated Numerical Counters
```javascript
const counterElements = document.querySelectorAll('.counter-val');
counterElements.forEach(counter => {
  const targetVal = parseFloat(counter.getAttribute('data-target'));
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerHTML: targetVal,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        onUpdate: function () {
          counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
        }
      });
    }
  });
});
```
- `start: 'top 85%'`: Triggers only when the counter scrolls into the bottom 15% of the viewport.
- `once: true`: Ensures the animation runs only once rather than replaying awkwardly every time the user scrolls past.
- `snap: { innerHTML: 1 }`: Increments whole integers without decimal numbers.

---

## 7. Viva & Project Evaluation Cheat Sheet (Questions & Answers)

Here are the most common questions an examiner or instructor will ask, with concise, professional answers:

### Q1: "Why did you choose Tailwind CSS instead of Bootstrap?"
> **Answer**: "Tailwind CSS is utility-first, giving us full design control over exact colors, spacing, and micro-interactions without fighting Bootstrap's pre-styled component overrides. It also compiles down to only the utility classes we actually use, making the application significantly faster."

### Q2: "Why use GSAP when CSS transitions already exist?"
> **Answer**: "CSS animations are great for simple hovers, but complex effects like mouse parallax, staggered card entrances, and ScrollTrigger odometer counters require precise sequencing and coordinate tracking. GSAP provides 60fps hardware-accelerated animations with complete control over timelines and scroll offsets."

### Q3: "How did you prevent the flash of bright light when loading the dark theme?"
> **Answer**: "We added an inline theme script at the very top of `<head>` in every HTML document before the body loads. It synchronously inspects `localStorage` for `meetco_theme`. If dark mode was previously selected, it adds the `.dark` class to `<html>` immediately, preventing the browser from ever rendering an unstyled white frame."

### Q4: "How does the mobile navigation drawer work?"
> **Answer**: "The offcanvas sidebar is an `<aside>` fixed at `right: -450px`. Clicking the menu icon adds the `.active` CSS class, which smoothly transitions `right: 0`. We also set `document.body.style.overflow = 'hidden'` to prevent users from scrolling the page in the background while the sidebar is open."

### Q5: "How are prices calculated in the booking page?"
> **Answer**: "We mapped each event type in a JavaScript dictionary (`pricingMap`) with a base cost and a per-guest rate. Whenever the user alters the event dropdown or guest counter, an `input` event triggers our calculation function, which multiplies the guest count, adds the base package, and formats the output into Indian Rupees using `toLocaleString('en-IN')`."

### Q6: "How did you deploy the website online?"
> **Answer**: "We initialized a local Git repository, set upstream tracking to GitHub (`melvindavis2003/Group_project_luminar`), and committed all assets. We then enabled GitHub Pages on the `master` branch. GitHub Actions automatically built and deployed the static bundle to `https://melvindavis2003.github.io/Group_project_luminar/`."

---

## 8. Glossary of Key Web Development Concepts

- **DOM (Document Object Model)**: The browser's tree representation of HTML elements that JavaScript can inspect, modify, add, or delete.
- **Event Listener**: A JavaScript function that waits for a specific user action (such as `click`, `scroll`, `mousemove`, `input`, or `submit`) and executes code in response.
- **Hardware Acceleration**: Forcing the GPU (graphics processor) rather than the CPU to render animations by using CSS `transform` (`translateX`, `translateY`, `scale`) instead of animating layout properties like `top` or `left`.
- **FOUC (Flash of Unstyled Content)**: An unwanted visual glitch where a webpage briefly appears unstyled or in light mode before custom CSS or scripts execute.
- **LocalStorage**: Browser storage that saves key-value pairs without expiration, persisting even when the user closes the tab or restarts the computer.
- **Media Query**: A CSS feature (`@media (min-width: 768px)`) that applies styles selectively based on device width or input device type (`pointer: fine`).
- **Semantic HTML**: Tags that convey meaning about their content (e.g. `<nav>` for navigation, `<article>` for self-contained content) rather than generic `<div>` containers.

---

*Document prepared for student project reference and technical defense.*
