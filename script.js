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

// Hero hover image follows cursor (index page only)
const hoverTarget = document.querySelector('.hero-intro-line');
const hoverImg = document.querySelector('.hero-hover-img');
if (hoverTarget && hoverImg) {
  hoverTarget.addEventListener('mouseenter', () => hoverImg.classList.add('visible'));
  hoverTarget.addEventListener('mouseleave', () => hoverImg.classList.remove('visible'));
  hoverTarget.addEventListener('mousemove', (e) => {
    hoverImg.style.left = e.clientX + 20 + 'px';
    hoverImg.style.top = e.clientY + 20 + 'px';
  });
}

// Headline hover image follows cursor (index page only)
const headlineTarget = document.querySelector('.hero-fire-line');
const headlineHoverImg = document.getElementById('headlineHoverImg');
if (headlineTarget && headlineHoverImg) {
  headlineTarget.addEventListener('mouseenter', () => headlineHoverImg.classList.add('visible'));
  headlineTarget.addEventListener('mouseleave', () => headlineHoverImg.classList.remove('visible'));
  headlineTarget.addEventListener('mousemove', (e) => {
    headlineHoverImg.style.left = e.clientX + 20 + 'px';
    headlineHoverImg.style.top = e.clientY + 20 + 'px';
  });
}

// Painting hover image follows cursor (index page only)
const paintingTarget = document.querySelector('.painting-hover-trigger');
const paintingHoverImg = document.getElementById('paintingHoverImg');
if (paintingTarget && paintingHoverImg) {
  paintingTarget.addEventListener('mouseenter', () => paintingHoverImg.classList.add('visible'));
  paintingTarget.addEventListener('mouseleave', () => paintingHoverImg.classList.remove('visible'));
  paintingTarget.addEventListener('mousemove', (e) => {
    paintingHoverImg.style.left = e.clientX + 20 + 'px';
    paintingHoverImg.style.top = e.clientY + 20 + 'px';
  });
}

// Dance hover image follows cursor (index page only)
const danceTarget = document.querySelector('.dance-hover-trigger');
const danceHoverImg = document.getElementById('danceHoverImg');
if (danceTarget && danceHoverImg) {
  danceTarget.addEventListener('mouseenter', () => danceHoverImg.classList.add('visible'));
  danceTarget.addEventListener('mouseleave', () => danceHoverImg.classList.remove('visible'));
  danceTarget.addEventListener('mousemove', (e) => {
    danceHoverImg.style.left = e.clientX + 20 + 'px';
    danceHoverImg.style.top = e.clientY - danceHoverImg.offsetHeight - 20 + 'px';
  });
}

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
        entry.target.addEventListener('transitionend', () => {
          entry.target.style.transitionDelay = '';
          entry.target.classList.add('entered');
        }, { once: true });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
    cardObserver.observe(card);
  });
}

// About section staggered entrance animation (index page only)
const aboutCols = document.querySelectorAll('.about-col');
if (aboutCols.length) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  aboutCols.forEach((col, i) => {
    col.style.transitionDelay = `${i * 0.15}s`;
    aboutObserver.observe(col);
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

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const wrapper = track.parentElement;
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? current + 1 : current - 1);
    }
  });
}

// Lightbox for case study body images
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
if (lightboxOverlay && lightboxImg) {
  document.querySelectorAll('.cs-body-image').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxOverlay.classList.add('active');
    });
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
  });

  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightboxOverlay.classList.remove('active');
  });
}
