const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const planSelect = document.getElementById('plan');

const sections = document.querySelectorAll('section[id]');

// ── Mobile navigation ──
function toggleNav(forceClose) {
  const isOpen = forceClose === true ? false : navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  navMenu.classList.toggle('nav--open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

navToggle.addEventListener('click', () => toggleNav());

navLinks.forEach((link) => {
  link.addEventListener('click', () => toggleNav(true));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    toggleNav(true);
  }
});

// ── Header scroll state ──
function onScroll() {
  header.classList.toggle('header--scrolled', window.scrollY > 20);
  updateActiveNav();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Active nav link on scroll ──
function updateActiveNav() {
  const scrollPos = window.scrollY + header.offsetHeight + 40;

  let current = '';
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href').slice(1);
    link.classList.toggle('nav__link--active', href === current);
  });
}

// ── Scroll reveal ──
const revealElements = document.querySelectorAll(
  '.section__header, .about__grid, .service-card, .team-card, .pricing-card, .contact__grid'
);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ── Plan selection from pricing cards ──
document.querySelectorAll('[data-plan]').forEach((link) => {
  link.addEventListener('click', () => {
    planSelect.value = link.dataset.plan;
  });
});

// ── Contact form ──
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();

  if (!name || !email) {
    contactForm.reportValidity();
    return;
  }

  contactForm.reset();
  formSuccess.hidden = false;

  setTimeout(() => {
    formSuccess.hidden = true;
  }, 5000);
});
