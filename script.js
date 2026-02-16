// ===================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

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
  const prevButtons = document.querySelectorAll('.carousel-btn-prev');
  const nextButtons = document.querySelectorAll('.carousel-btn-next');
  const carouselContainers = document.querySelectorAll('.carousel-container');
  if (!carouselContainers.length) return;

  const autoScrollIntervals = {};

  function scrollCarousel(carouselId, direction) {
    const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);
    if (!container) return;

    const scrollAmount = 300;
    const currentScroll = container.scrollLeft;

    container.scrollTo({
      left: direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  }

  function startAutoScroll(container, carouselId) {
    if (!container || !carouselId) return;

    if (autoScrollIntervals[carouselId]) {
      clearInterval(autoScrollIntervals[carouselId]);
    }

    let direction = 1;
    const speed = 2;

    autoScrollIntervals[carouselId] = setInterval(() => {
      const track = container.querySelector('.carousel-track');
      if (!track) return;

      const maxScroll = track.scrollWidth - container.clientWidth;

      container.scrollLeft += direction * speed;

      if (container.scrollLeft >= maxScroll - speed) {
        direction = -1;
      } else if (container.scrollLeft <= speed) {
        direction = 1;
      }
    }, 20);
  }

  function stopAutoScroll(carouselId) {
    if (autoScrollIntervals[carouselId]) {
      clearInterval(autoScrollIntervals[carouselId]);
      autoScrollIntervals[carouselId] = null;
    }
  }

  // Initialize auto-scroll for all carousels
  carouselContainers.forEach(container => {
    const carouselId = container.getAttribute('data-carousel-id');
    if (!carouselId) return;

    startAutoScroll(container, carouselId);

    container.addEventListener('mouseenter', () => stopAutoScroll(carouselId));
    container.addEventListener('mouseleave', () => startAutoScroll(container, carouselId));

    container.addEventListener('touchstart', () => stopAutoScroll(carouselId), { passive: true });
    container.addEventListener('touchend', () => {
      setTimeout(() => startAutoScroll(container, carouselId), 2000);
    }, { passive: true });
  });

  // Prev buttons
  prevButtons.forEach(button => {
    button.addEventListener('click', function () {
      const carouselId = this.getAttribute('data-carousel');
      if (!carouselId) return;

      const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);
      stopAutoScroll(carouselId);
      scrollCarousel(carouselId, 'prev');

      setTimeout(() => startAutoScroll(container, carouselId), 3000);
    });
  });

  // Next buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', function () {
      const carouselId = this.getAttribute('data-carousel');
      if (!carouselId) return;

      const container = document.querySelector(`[data-carousel-id="${carouselId}"]`);
      stopAutoScroll(carouselId);
      scrollCarousel(carouselId, 'next');

      setTimeout(() => startAutoScroll(container, carouselId), 3000);
    });
  });

  // Optional: mouse drag support
  carouselContainers.forEach(container => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const carouselId = container.getAttribute('data-carousel-id');

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      if (carouselId) stopAutoScroll(carouselId);
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
      if (!carouselId) return;
      setTimeout(() => startAutoScroll(container, carouselId), 2000);
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    container.style.cursor = 'grab';
  });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS (SAFE)
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // ignore invalid anchors
    if (!href || href === '#' || href === '#!') return;

    // Don't prevent default for login links
    if (href === '#login') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// ===================================
// HEADER SCROLL EFFECT (SAFE)
// ===================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!header) return;

  const currentScroll = window.pageYOffset;

  header.style.boxShadow = currentScroll > 100
    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
    : '0 2px 4px rgba(0, 0, 0, 0.05)';
});

// ===================================
// GALLERY THUMBNAIL CLICK (SAFE)
// ===================================
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.gallery-image');

if (thumbnails.length && mainImage) {
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
      thumbnails.forEach(t => (t.style.borderColor = 'transparent'));
      this.style.borderColor = 'var(--primary-color)';

      mainImage.src = this.src;
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.style.transition = 'opacity 0.3s ease';
        mainImage.style.opacity = '1';
      }, 50);
    });
  });
}

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

const animatedElements = document.querySelectorAll(
  '.benefit-card, .feature-item, .step, .bonus-card, .testimonial-card, .faq-item'
);

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
    const randomCount = Math.floor(Math.random() * 8) + 3;
    viewersText.textContent = `${randomCount} personas viendo este producto`;
  }
  setInterval(updateViewers, 10000);
  updateViewers();
}

// ===================================
// PRICE COUNTDOWN (OPTIONAL)
// ===================================
const urgencyBanner = document.querySelector('.urgency-banner');

if (urgencyBanner) {
  setInterval(() => {
    urgencyBanner.style.transform = 'scale(1.05)';
    setTimeout(() => {
      urgencyBanner.style.transform = 'scale(1)';
    }, 200);
  }, 5000);
}

// ===================================
// LAZY LOADING FOR IMAGES (SAFE)
// ===================================
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"][data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
} else {
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
  if (!nav || !navLinks) return;

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

// ===================================
// FACEBOOK PIXEL - TRACK HOTMART CLICK (PRO)
// ===================================
let __fb_hotmart_lock = false;

function trackFb(eventName, params = {}) {
  try {
    if (window.fbq) window.fbq('track', eventName, params);
  } catch (e) {}
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;

  const url = a.getAttribute('href') || '';

  // Detecta Hotmart (incluye pay.hotmart.com)
  if (!/hotmart\.com|pay\.hotmart\.com/i.test(url)) return;

  // anti doble click
  if (__fb_hotmart_lock) return;
  __fb_hotmart_lock = true;
  setTimeout(() => { __fb_hotmart_lock = false; }, 1200);

  trackFb('InitiateCheckout', {
    content_name: document.title || 'Producto',
    currency: 'PEN'
  });
});

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c🎨 Colección de Juguetes de Papel 3D', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%c¡Gracias por visitar nuestra página!', 'font-size: 14px; color: #4ECDC4;');
console.log('%cSi estás viendo esto, eres curioso/a 😊', 'font-size: 12px; color: #6B7280;');

