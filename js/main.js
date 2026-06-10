// NAV TOGGLE (mobile)
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu on link click
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// GALLERY FILTER
const tabs   = document.querySelectorAll('.gallery__tab');
const items  = document.querySelectorAll('.gallery__item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('gallery__tab--active'));
    tab.classList.add('gallery__tab--active');

    const filter = tab.dataset.filter;
    items.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// CONTACT FORM — basic UX (no real submit, adjust to backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Mensagem enviada!';
    btn.disabled = true;
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
}

// HEADER scroll shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 24px rgba(45,40,38,.12)'
    : '0 2px 12px rgba(45,40,38,.06)';
}, { passive: true });

// Smooth reveal on scroll (IntersectionObserver)
const revealEls = document.querySelectorAll(
  '.service-card, .diff-item, .testimonial-card, .about__content, .differentials__content'
);

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  io.observe(el);
});
