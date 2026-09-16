// =========================================
// 1. MOBILE HAMBURGER MENU TOGGLE
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu automatically when any nav link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// =========================================
// 2. STICKY NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// 3. WORKING COUNTDOWN TIMER
// =========================================
// [EDIT THIS]: Ilagay ang tamang petsa ng anibersaryo. 
// Tandaan: Ang Month sa JS ay 0-indexed (January = 0, October = 9).
const anniversaryDate = new Date(2026, 9, 25, 9, 0, 0).getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = anniversaryDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // I-update ang UI elements
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    if (distance < 0) {
        clearInterval(countdownTimer);
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.innerHTML = "<h2 style='color: var(--gold); font-family: var(--font-heading);'>The Celebration Has Begun! Praise God!</h2>";
        }
    }
}, 1000);

// =========================================
// 4. GALLERY LIGHTBOX MODAL
// =========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".gallery-img");
const closeLightbox = document.getElementById("close-lightbox");

galleryImages.forEach(img => {
    img.addEventListener("click", function() {
        lightbox.style.display = "block";
        lightboxImg.src = this.src;
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function closeLightboxModal() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
}

if (closeLightbox) {
    closeLightbox.addEventListener("click", closeLightboxModal);
}

// Isara kapagclinick sa labas ng image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});

// Isara gamit ang Escape key sa keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightboxModal();
    }
});

// =========================================
// 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
// =========================================
const animatedElements = document.querySelectorAll('.section-title, .about-card, .timeline-item, .gallery-img, .pastor-grid, .countdown-container, .hero-content h1, .hero-content h3, .hero-verse, .hero-buttons');

const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    scrollObserver.observe(el);
});