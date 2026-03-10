// Mobile hamburger menu toggle
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked
navMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scroll for #UX anchor (index page only)
const uxLink = document.querySelector('a[href="#UX"]');
if (uxLink) {
  uxLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('UX').scrollIntoView({ behavior: 'smooth' });
  });
}

// Scroll-based entrance animations for case cards (index page only)
const cards = document.querySelectorAll('.case-card');
if (cards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
    cardObserver.observe(card);
  });
}

// Testimonial carousel (about page only)
const track = document.querySelector('.testimonial-track');
if (track) {
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  const slideCount = document.querySelectorAll('.testimonial-card').length;
  let current = 0;

  function goToSlide(index) {
    current = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goToSlide(current - 1));
  nextBtn.addEventListener('click', () => goToSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
}
