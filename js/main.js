/**
 * Meetco - Event Management Booking Platform
 * Complete JavaScript Engine (Tailwind & GSAP 3)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize GSAP & ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --- Smooth Mouse Tracking Animation (GSAP & Tailwind CSS) ---
  let cursorDot = document.getElementById('cursor-dot');
  let cursorRing = document.getElementById('cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorDot.className = 'fixed top-0 left-0 w-2.5 h-2.5 bg-meetco-yellow rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 hidden lg:block';
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.id = 'cursor-ring';
    cursorRing.className = 'fixed top-0 left-0 w-9 h-9 rounded-full border-2 border-meetco-yellow/80 pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-[opacity,border-color,background-color] duration-300 hidden lg:block';
    document.body.appendChild(cursorRing);
  }

  if (typeof gsap !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
    const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power2.out' });
    const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.25, ease: 'power3.out' });
    const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.25, ease: 'power3.out' });

    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      if (!isVisible) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        isVisible = true;
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isVisible = false;
    });

    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, .forum-circle-btn, .gallery-item, .testimonial-card, .faq-header, .sponsor-badge'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRing, {
          scale: 1.75,
          backgroundColor: 'rgba(255, 224, 75, 0.18)',
          borderColor: '#00b8ff',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 0.4,
          duration: 0.25,
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRing, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 224, 75, 0.8)',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.25,
        });
      });
    });
  }

  // Ensure light mode by clearing any persisted dark theme preference
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('meetco-theme');
  }
  document.documentElement.classList.remove('dark');

  // 3. Preloader & ScrollTrigger Refresh
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }, 500);
      }, 350);
    });
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }, 500);
      }
    }, 2500);
  }

  // Guaranteed Visibility Safeguard for Service & Event Cards
  setTimeout(() => {
    document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    });
  }, 1000);

  // 4. Sticky Header & Background-Adaptive Navigation Sections
  const header = document.getElementById('main-header');
  const headerWrap = document.querySelector('.meetco-header-wrap');
  const desktopNavLinks = document.querySelectorAll('.nav-link[data-section]');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-section]');

  // Trackable page sections with corresponding navigation key and background luminosity
  const trackableSections = [
    { id: 'hero-section', key: 'home', bgType: 'dark' },
    { id: 'about-section', key: 'home', bgType: 'light' },
    { id: 'gallery-section', key: 'gallery', bgType: 'light' },
    { id: 'upcoming-events-section', key: 'upcoming', bgType: 'light' },
    { id: 'services-section', key: 'services', bgType: 'dark' },
    { id: 'pricing-section', key: 'pricing', bgType: 'light' },
    { id: 'testimonials-section', key: 'pricing', bgType: 'light' },
    { id: 'faq-section', key: 'pricing', bgType: 'light' }
  ];

  function updateNavigationAndHeader() {
    const scrollPos = window.scrollY;

    // Header padding transitions on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('meetco-nav-scrolled');
        header.classList.remove('pt-5', 'sm:pt-7');
        header.classList.add('pt-3', 'sm:pt-4');
      } else {
        header.classList.remove('meetco-nav-scrolled');
        header.classList.remove('pt-3', 'sm:pt-4');
        header.classList.add('pt-5', 'sm:pt-7');
      }
    }

    // Determine currently visible background section
    const isHomePage = !!document.getElementById('hero-section');
    let currentSectionKey = 'home';
    let currentBgType = isHomePage ? 'dark' : 'light';
    const headerCheckPoint = scrollPos + 140; // Sampling coordinate directly underneath floating navbar

    if (isHomePage) {
      if (scrollPos < 200) {
        currentSectionKey = 'home';
        currentBgType = 'dark';
      } else {
        for (let i = 0; i < trackableSections.length; i++) {
          const item = trackableSections[i];
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (headerCheckPoint >= top && headerCheckPoint < top + height) {
              currentSectionKey = item.key;
              currentBgType = item.bgType;
              break;
            }
          }
        }
      }

      // Dynamically update active navigation section pills on home page
      desktopNavLinks.forEach(link => {
        if (link.getAttribute('data-section') === currentSectionKey) {
          link.classList.add('active-nav-section');
        } else {
          link.classList.remove('active-nav-section');
        }
      });

      mobileNavLinks.forEach(link => {
        if (link.getAttribute('data-section') === currentSectionKey) {
          link.classList.add('active-nav-section');
        } else {
          link.classList.remove('active-nav-section');
        }
      });
    }

    // Adapt floating navbar card contrast based on the background section behind it
    if (headerWrap) {
      if (currentBgType === 'light') {
        headerWrap.classList.add('header-bg-light');
        headerWrap.classList.remove('header-bg-dark');
      } else {
        headerWrap.classList.add('header-bg-dark');
        headerWrap.classList.remove('header-bg-light');
      }
    }
  }

  window.addEventListener('scroll', updateNavigationAndHeader, { passive: true });
  updateNavigationAndHeader();

  // Smooth scroll offset for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 95;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile dropdown if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Offcanvas Sidebar & Overlay
  const offcanvasSidebar = document.getElementById('offcanvas-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const openSidebarBtns = document.querySelectorAll('.open-sidebar-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');

  function openSidebar() {
    if (offcanvasSidebar) offcanvasSidebar.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (offcanvasSidebar) offcanvasSidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openSidebarBtns.forEach(btn => btn.addEventListener('click', openSidebar));
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // 7. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 8. Magnetic Parallax Circular Buttons (.forum-circle-btn)
  const magneticButtons = document.querySelectorAll('.forum-circle-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // 9. Mouse Parallax on Hero Figures
  const heroSection = document.getElementById('hero-section');
  const heroImg1 = document.getElementById('hero-img-1');
  const heroImg2 = document.getElementById('hero-img-2');

  if (heroSection && heroImg1 && heroImg2) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      heroImg1.style.transform = `translate(${deltaX * -22}px, ${deltaY * -16}px)`;
      heroImg2.style.transform = `translate(${deltaX * 22}px, ${deltaY * 16}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroImg1.style.transform = 'translate(0, 0)';
      heroImg2.style.transform = 'translate(0, 0)';
    });
  }

  // 10. Gallery Category Filter Logic
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

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

  // 11. Testimonials Slider Controls
  const testTrack = document.getElementById('testimonials-track');
  const testPrev = document.getElementById('testimonial-prev');
  const testNext = document.getElementById('testimonial-next');
  let currentSlide = 0;

  if (testTrack && testPrev && testNext) {
    const slides = testTrack.children;
    const totalSlides = slides.length;

    function getVisibleSlides() {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    function updateSlider() {
      const visible = getVisibleSlides();
      const maxIndex = Math.max(0, totalSlides - visible);
      if (currentSlide > maxIndex) currentSlide = maxIndex;
      if (currentSlide < 0) currentSlide = 0;

      const slideWidth = slides[0].getBoundingClientRect().width + 24;
      testTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    testNext.addEventListener('click', () => {
      const visible = getVisibleSlides();
      const maxIndex = Math.max(0, totalSlides - visible);
      currentSlide = (currentSlide < maxIndex) ? currentSlide + 1 : 0;
      updateSlider();
    });

    testPrev.addEventListener('click', () => {
      const visible = getVisibleSlides();
      const maxIndex = Math.max(0, totalSlides - visible);
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : maxIndex;
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
  }

  // 12. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 13. GSAP Required Animations
  if (typeof gsap !== 'undefined') {
    // A. Navigation Menu Entrance Animation
    gsap.from('#main-header', {
      y: -60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    // B. Hero Section: Fade In & Slide Up
    gsap.from('.hero-gsap-elem', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // C. Event Cards & Services Stagger Animation (ScrollTrigger)
    if (typeof ScrollTrigger !== 'undefined') {
      const upcomingEventsGrid = document.getElementById('upcoming-events-grid');
      if (upcomingEventsGrid) {
        gsap.from(upcomingEventsGrid.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: upcomingEventsGrid,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      const serviceCards = document.querySelectorAll('.service-card');
      if (serviceCards.length > 0) {
        gsap.fromTo(serviceCards, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: '#services-section',
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // D. Animated Stats Counters
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
    }

    // E. Contact Form Scale Effect
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Trigger scale animation
        gsap.timeline()
          .to(contactForm, { scale: 0.97, duration: 0.15, ease: 'power1.in' })
          .to(contactForm, { scale: 1.02, duration: 0.2, ease: 'power1.out' })
          .to(contactForm, { scale: 1, duration: 0.15, ease: 'power1.inOut', onComplete: () => {
            const successMsg = document.getElementById('contact-success-msg');
            if (successMsg) {
              successMsg.classList.remove('hidden');
              gsap.fromTo(successMsg, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 });
            }
            contactForm.reset();
          }});
      });
    }
  }

  // 14. Booking Form Real-time Calculation & Modal (booking.html)
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const eventTypeSelect = document.getElementById('event-type');
    const guestCountInput = document.getElementById('guest-count');
    const summaryEventType = document.getElementById('summary-event-type');
    const summaryGuests = document.getElementById('summary-guests');
    const summaryEstimatedTotal = document.getElementById('summary-total');

    const pricingMap = {
      'Birthday Party': { base: 800, perGuest: 25 },
      'Photography Session': { base: 500, perGuest: 10 },
      'Wedding': { base: 2500, perGuest: 45 },
      'Corporate Event': { base: 1800, perGuest: 35 },
      'Workshop/Seminar': { base: 950, perGuest: 20 },
    };

    function updateBookingSummary() {
      const type = eventTypeSelect ? eventTypeSelect.value : 'Wedding';
      const guests = guestCountInput ? (parseInt(guestCountInput.value) || 50) : 50;

      if (summaryEventType) summaryEventType.innerText = type || 'Not Selected';
      if (summaryGuests) summaryGuests.innerText = guests + ' Guests';

      const rates = pricingMap[type] || { base: 1000, perGuest: 30 };
      const total = rates.base + (guests * rates.perGuest);

      if (summaryEstimatedTotal) {
        summaryEstimatedTotal.innerText = '$' + total.toLocaleString();
      }
    }

    if (eventTypeSelect) eventTypeSelect.addEventListener('change', updateBookingSummary);
    if (guestCountInput) guestCountInput.addEventListener('input', updateBookingSummary);

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('booking-confirmation-modal');
      if (modal) {
        modal.classList.remove('hidden');
        gsap.fromTo(modal.querySelector('.modal-card'), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
      }
    });

    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('booking-confirmation-modal');
        if (modal) modal.classList.add('hidden');
        bookingForm.reset();
        updateBookingSummary();
      });
    }

    updateBookingSummary();
  }

  // 15. Registration Password Match Validation (register.html)
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm-password');
    const matchIndicator = document.getElementById('password-match-indicator');

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

    if (passwordInput && confirmInput && matchIndicator) {
      passwordInput.addEventListener('input', checkPasswords);
      confirmInput.addEventListener('input', checkPasswords);
    }

    registerForm.addEventListener('submit', (e) => {
      if (passwordInput.value !== confirmInput.value) {
        e.preventDefault();
        alert('Please ensure passwords match before submitting.');
      } else {
        e.preventDefault();
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
      }
    });
  }

  // 16. Login Form (login.html)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login successful! Welcome back.');
      window.location.href = 'index.html';
    });
  }
});
