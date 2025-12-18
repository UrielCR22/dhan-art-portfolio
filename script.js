// Toggle nav on mobile
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Carousel scroll buttons
function initCarousel(name) {
  const container = document.querySelector(`.carousel[data-name="${name}"]`);
  if (!container) return;

  document.querySelectorAll(`.controls .prev[data-target="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      container.scrollBy({ left: -240, behavior: 'smooth' });
    });
  });

  document.querySelectorAll(`.controls .next[data-target="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      container.scrollBy({ left: 240, behavior: 'smooth' });
    });
  });
}
['portraits', 'anime', 'mixed'].forEach(initCarousel);

// Smooth scrolling for anchors
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

// Stable submenu behavior (desktop + mobile)
document.querySelectorAll('.has-submenu').forEach(item => {
  let hoverTimer;

  // Desktop: keep open while hovering parent or submenu
  item.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimer);
    item.classList.add('open');
  });
  item.addEventListener('mouseleave', () => {
    hoverTimer = setTimeout(() => item.classList.remove('open'), 80);
  });

  // Mobile: toggle on click of the parent link
  const link = item.querySelector(':scope > a');
  link?.addEventListener('click', (e) => {
    const isMobileNav = siteNav.classList.contains('open');
    if (isMobileNav) {
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});

