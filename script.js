// ===================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===================================
// CAROUSEL FUNCTIONALITY WITH AUTO-SCROLL
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Get all carousel navigation buttons
    const prevButtons = document.querySelectorAll('.carousel-btn-prev');
    const nextButtons = document.querySelectorAll('.carousel-btn-next');
    const carouselContainers = document.querySelectorAll('.carousel-container');

    // Store auto-scroll intervals for each carousel
    const autoScrollIntervals = {};

    // Function to scroll carousel
    function scrollCarousel(carouselId, direction) {
        const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);
        if (!container) return;

        const scrollAmount = 300; // pixels to scroll
        const currentScroll = container.scrollLeft;

        if (direction === 'next') {
            container.scrollTo({
                left: currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        } else {
            container.scrollTo({
                left: currentScroll - scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // Function to auto-scroll carousel (right to left)
    function startAutoScroll(container, carouselId) {
        // Clear any existing interval
        if (autoScrollIntervals[carouselId]) {
            clearInterval(autoScrollIntervals[carouselId]);
        }

        let direction = 1; // 1 for right, -1 for left
        const speed = 2; // scroll speed (pixels per 20ms)

        autoScrollIntervals[carouselId] = setInterval(() => {
            const track = container.querySelector('.carousel-track');
            const maxScroll = track.scrollWidth - container.clientWidth;

            // Scroll by 'speed' pixels for smooth continuous movement
            container.scrollLeft += direction * speed;

            // Reverse direction when reaching the end or beginning
            if (container.scrollLeft >= maxScroll - speed) {
                direction = -1; // Start scrolling left
            } else if (container.scrollLeft <= speed) {
                direction = 1; // Start scrolling right
            }
        }, 20); // 20ms = 50fps for smooth animation
    }

    // Function to stop auto-scroll
    function stopAutoScroll(carouselId) {
        if (autoScrollIntervals[carouselId]) {
            clearInterval(autoScrollIntervals[carouselId]);
        }
    }

    // Initialize auto-scroll for all carousels
    carouselContainers.forEach(container => {
        const carouselId = container.getAttribute('data-carousel-id');

        // Start auto-scroll
        startAutoScroll(container, carouselId);

        // Pause on hover
        container.addEventListener('mouseenter', () => {
            stopAutoScroll(carouselId);
        });

        // Resume on mouse leave
        container.addEventListener('mouseleave', () => {
            startAutoScroll(container, carouselId);
        });

        // Pause on touch/interaction
        container.addEventListener('touchstart', () => {
            stopAutoScroll(carouselId);
        });

        container.addEventListener('touchend', () => {
            setTimeout(() => {
                startAutoScroll(container, carouselId);
            }, 2000); // Resume after 2 seconds
        });
    });

    // Add event listeners to prev buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function () {
            const carouselId = this.getAttribute('data-carousel');
            const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);

            // Stop auto-scroll temporarily
            stopAutoScroll(carouselId);
            scrollCarousel(carouselId, 'prev');

            // Resume auto-scroll after 3 seconds
            setTimeout(() => {
                startAutoScroll(container, carouselId);
            }, 3000);
        });
    });

    // Add event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const carouselId = this.getAttribute('data-carousel');
            const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);

            // Stop auto-scroll temporarily
            stopAutoScroll(carouselId);
            scrollCarousel(carouselId, 'next');

            // Resume auto-scroll after 3 seconds
            setTimeout(() => {
                startAutoScroll(container, carouselId);
            }, 3000);
        });
    });

    // Optional: Add touch/swipe support for mobile
    carouselContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        const carouselId = container.getAttribute('data-carousel-id');

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            stopAutoScroll(carouselId);
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';

            // Resume auto-scroll after 2 seconds
            setTimeout(() => {
                startAutoScroll(container, carouselId);
            }, 2000);
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        container.style.cursor = 'grab';
    });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for login links
        if (href === '#login') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ===================================
// GALLERY THUMBNAIL CLICK
// ===================================
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.gallery-image');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.style.borderColor = 'transparent');

        // Add active class to clicked thumbnail
        this.style.borderColor = 'var(--primary-color)';

        // Update main image
        if (mainImage) {
            mainImage.src = this.src;
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.transition = 'opacity 0.3s ease';
                mainImage.style.opacity = '1';
            }, 50);
        }
    });
});



// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.benefit-card, .feature-item, .step, .bonus-card, .testimonial-card, .faq-item');

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ===================================
// VIEWERS COUNT ANIMATION
// ===================================
const viewersText = document.querySelector('.viewers-text');

if (viewersText) {
    function updateViewers() {
        const randomCount = Math.floor(Math.random() * 8) + 3; // 3-10 viewers
        viewersText.textContent = `${randomCount} personas viendo este producto`;
    }

    // Update every 10 seconds
    setInterval(updateViewers, 10000);
    updateViewers(); // Initial call
}

// ===================================
// PRICE COUNTDOWN (OPTIONAL)
// ===================================
const urgencyBanner = document.querySelector('.urgency-banner');

if (urgencyBanner) {
    // Add pulsing effect every 5 seconds
    setInterval(() => {
        urgencyBanner.style.transform = 'scale(1.05)';
        setTimeout(() => {
            urgencyBanner.style.transform = 'scale(1)';
        }, 200);
    }, 5000);
}

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// MOBILE MENU TOGGLE (IF NEEDED)
// ===================================
function createMobileMenu() {
    const nav = document.querySelector('.nav-content');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 640 && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark);
        `;

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });

        nav.insertBefore(menuToggle, navLinks);
    }
}

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c🎨 Colección de Juguetes de Papel 3D', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%c¡Gracias por visitar nuestra página!', 'font-size: 14px; color: #4ECDC4;');
console.log('%cSi estás viendo esto, eres curioso/a 😊', 'font-size: 12px; color: #6B7280;');
