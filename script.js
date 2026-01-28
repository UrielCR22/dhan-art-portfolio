// Toggle nav on mobile
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===============================
// Configuración de imágenes por sección
const galleries = {
  portraits: [
  "portrait-1.jpg",
  "portrait-2.jpg",
  "portrait-3.jpg",
  "portrait-4.jpg",
  "portrait-5.jpg",
  "portrait-6.jpg",
  "portrait-7.jpg",
  "portrait-8.jpg",
  "portrait-9.jpg",
  "portrait-10.jpg",
  "portrait-11.jpg",
  "portrait-12.jpg",
  "portrait-13.jpg",
  "portrait-14.jpg",
  "portrait-15.jpg",
  "portrait-16.jpg",
  "portrait-17.jpg",
  "portrait-18.jpg",
  "portrait-19.jpg",
  "portrait-20.jpg",
  "portrait-21.jpg",
  "portrait-22.jpg",
  "portrait-23.jpg",
  "portrait-24.jpg",
  "portrait-25.jpg",
  "portrait-26.jpg",
  "portrait-27.jpg",
  "portrait-28.jpg",
  "portrait-29.jpg",
  "portrait-30.jpg",
  "portrait-31.jpg",
  "portrait-32.jpg",
  "portrait-33.jpg",
  "portrait-34.jpg",
  "portrait-35.jpg",
  "portrait-36.jpg",
  "portrait-37.jpg",
  "portrait-38.jpg",
  "portrait-39.jpg",
  "portrait-40.jpg",
  "portrait-41.jpg",
  "portrait-42.jpg",
  "portrait-43.jpg",
  "portrait-44.jpg",
  "portrait-45.jpg",
  "portrait-46.jpg",
  "portrait-47.jpg",
  "portrait-48.jpg",
  "portrait-49.jpg"
],
  anime: ["anime-1.jpg", "anime-2.jpg", "anime-3.jpg"],
  mixed: ["mixed-1.jpg", "mixed-2.jpg", "mixed-3.jpg"]
};

function buildCarousel(name) {
  const container = document.querySelector(`.carousel[data-name="${name}"]`);
  if (!container || !galleries[name]) return;

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

// ===============================
// Modal de imagen completa
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Delegar evento en todas las imágenes (carrusel y grids)
document.addEventListener("click", function(e) {
  if (
    e.target.tagName === "IMG" &&
    (e.target.closest(".carousel") || e.target.closest(".gallery-grid"))
  ) {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modalImg.src = e.target.src;
    captionText && (captionText.textContent = e.target.alt || "");
  }
});

// Cerrar modal
if (closeBtn && modal) {
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
}



