document.addEventListener("DOMContentLoaded", function() {
    
    // 1. MOBILE NAVBAR TOGGLE (Optional fallback)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. COUNTDOWN TIMER LOGIC
    const countdownContainer = document.querySelector('.countdown-container');
    
    if (countdownContainer) {
        const targetDateString = countdownContainer.getAttribute('data-target-date');
        const targetDate = new Date(targetDateString).getTime();

        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }

    // 3. LIGHTBOX GALLERY (Pang-zoom ng picture)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            lightbox.style.display = "flex"; // Show lightbox
            lightboxImg.src = this.src; // Pasa ang picture
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    // Isara ang lightbox pag nag-click sa labas ng picture
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

    // 4. SCROLL ANIMATIONS (UULIT-ULIT NA ANIMATION)
    const elementsToAnimate = document.querySelectorAll('.about-card, .timeline-item, .gallery-img, .pastor-grid, .contact-grid');
    
    const appearOptions = {
        threshold: 0, 
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pag pumasok na sa screen, lilitaw (mag-aanimate)
                entry.target.classList.add('appear');
            } else {
                // Pag lumabas sa screen, tatanggalin niya yung class
                // para pwedeng mag-animate ulit pag binalikan mo!
                entry.target.classList.remove('appear');
            }
        });
    }, appearOptions);

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-scroll'); // Hide muna bago i-scroll
        appearOnScroll.observe(el); // Simulan ang pag-obserba
    });

});