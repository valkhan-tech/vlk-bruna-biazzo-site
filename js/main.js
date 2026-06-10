/* =============================================
   DRA. BRUNA BIAZZO — SCRIPTS
   ============================================= */

// --- HERO SLIDER ---
const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;
let autoPlay;

function goToSlide(n) {
  slides[currentSlide].classList.remove('hero__slide--active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('hero__slide--active');

  // sync all nav dot groups
  document.querySelectorAll('.slide-dot').forEach(d => d.classList.remove('slide-dot--active'));
  document.querySelectorAll(`.slide-dot[data-slide="${currentSlide}"]`).forEach(d => d.classList.add('slide-dot--active'));
}

function startAutoPlay() {
  autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function resetAutoPlay() {
  clearInterval(autoPlay); startAutoPlay();
}

document.getElementById('slideNext')?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });
document.getElementById('slidePrev')?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });

document.querySelectorAll('.slide-dot').forEach(dot => {
  dot.addEventListener('click', () => { goToSlide(+dot.dataset.slide); resetAutoPlay(); });
});

startAutoPlay();


// --- MOBILE NAV ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); burger.classList.remove('active'); });
});


// --- RESULTS FILTER ---
const rtabs = document.querySelectorAll('.rtab');
const rItems = document.querySelectorAll('.result-item');

rtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    rtabs.forEach(t => t.classList.remove('rtab--active'));
    tab.classList.add('rtab--active');
    const filter = tab.dataset.filter;
    rItems.forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
    });
  });
});


// --- TESTIMONIALS SLIDER ---
const tSlides = document.querySelectorAll('.testi-slide');
const tDots = document.querySelectorAll('.tdot');
let tCurrent = 0;

function goToTesti(n) {
  tSlides[tCurrent].classList.remove('testi-slide--active');
  tDots[tCurrent].classList.remove('tdot--active');
  tCurrent = (n + tSlides.length) % tSlides.length;
  tSlides[tCurrent].classList.add('testi-slide--active');
  tDots[tCurrent].classList.add('tdot--active');
}

tDots.forEach(d => d.addEventListener('click', () => goToTesti(+d.dataset.t)));
setInterval(() => goToTesti(tCurrent + 1), 6000);


// --- COUNTER ANIMATION ---
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target.toLocaleString('pt-BR'); clearInterval(timer); }
    else { el.textContent = Math.floor(current).toLocaleString('pt-BR'); }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));


// --- SCROLL REVEAL ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.cat-card, .team-card, .testi-card, .result-item, .proc-item, .about__content, .stat-box'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


// --- HEADER SCROLL ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 24px rgba(30,36,40,.12)'
    : '0 1px 16px rgba(30,36,40,.08)';
}, { passive: true });


// --- CONTACT FORM ---
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Mensagem enviada!';
  btn.style.background = '#4CAF50';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar Mensagem';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 4000);
});
