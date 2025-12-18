// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple carousel logic
function initCarousel(name) {
  const container = document.querySelector(`.carousel[data-name="${name}"]`);
  if (!container) return;
  const slides = Array.from(container.querySelectorAll('.slide'));
  let index = 0;

  function update() {
    const offset = -index * 100;
    slides.forEach(s => { s.style.transform = `translateX(${offset}%)`; });
  }

  document.querySelectorAll(`.controls .prev[data-target="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
  });

  document.querySelectorAll(`.controls .next[data-target="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      update();
    });
  });

  update();
}

// Initialize carousels
['portraits', 'anime', 'mixed'].forEach(initCarousel);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
