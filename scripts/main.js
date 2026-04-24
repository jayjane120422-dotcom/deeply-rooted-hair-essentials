/* ============================================
   DEEPLY ROOTED HAIR ESSENTIALS — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initMisconceptionAccordion();
  initForms();
  setActiveNavLink();
});

/* ---- Sticky Navbar ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);
  if (overlay) overlay.addEventListener('click', toggle);
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggle));
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* ---- Misconception Accordion ---- */
function initMisconceptionAccordion() {
  const cards = document.querySelectorAll('.misconception-card');
  cards.forEach(card => {
    const header = card.querySelector('.misconception-header');
    const body = card.querySelector('.misconception-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      // Close all
      cards.forEach(c => {
        c.classList.remove('open');
        const b = c.querySelector('.misconception-body');
        if (b) b.style.maxHeight = '0';
      });
      // Toggle current
      if (!isOpen) {
        card.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ---- Form Validation ---- */
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(contactForm)) {
        showFormSuccess(contactForm, 'contact-success');
      }
    });
  }

  // Professional Registration Form
  const proForm = document.getElementById('pro-registration-form');
  if (proForm) {
    proForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(proForm)) {
        showFormSuccess(proForm, 'pro-success');
      }
    });
  }
}

function validateForm(form) {
  let valid = true;
  const requiredFields = form.querySelectorAll('[required]');

  // Clear previous errors
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(el => {
    el.classList.remove('error');
  });
  form.querySelectorAll('.form-error').forEach(el => {
    el.style.display = 'none';
  });

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = 'This field is required.';
        errorEl.style.display = 'block';
      }
      valid = false;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        field.classList.add('error');
        const errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.style.display = 'block';
        }
        valid = false;
      }
    }
  });

  return valid;
}

function showFormSuccess(form, successId) {
  form.style.display = 'none';
  const successEl = document.getElementById(successId);
  if (successEl) {
    successEl.style.display = 'block';
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ---- Active Nav Link ---- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
