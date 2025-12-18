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

// ===============================
// Configuración de imágenes por sección
const galleries = {
  portraits: ["portrait-1.jpg", "portrait-2.jpg", "portrait-3.jpg"],
  anime: ["anime-1.jpg", "anime-2.jpg", "anime-3.jpg"],
  mixed: ["mixed-1.jpg", "mixed-2.jpg", "mixed-3.jpg"]
};

function buildCarousel(name) {
  const container = document.querySelector(`.carousel[data-name="${name}"]`);
  if (!container) return;

  galleries[name].forEach(file => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.src = `assets/${name}/${file}`;
    img.alt = `${name} artwork`;
    slide.appendChild(img);
    container.appendChild(slide);
  });
}

// Construir todos los carruseles
["portraits", "anime", "mixed"].forEach(buildCarousel);

// ===============================
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
["portraits", "anime", "mixed"].forEach(initCarousel);

// ===============================
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

// ===============================
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


