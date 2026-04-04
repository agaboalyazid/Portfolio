const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll("[data-reveal]");
const yearElement = document.getElementById("current-year");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
  try { localStorage.setItem("theme", theme); } catch (e) {}
};

const initTheme = () => {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) { applyTheme(saved); return; }
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nowDark = document.body.classList.toggle("dark");
    themeToggle.textContent = nowDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-pressed", String(nowDark));
    themeToggle.setAttribute("aria-label", nowDark ? "Switch to light theme" : "Switch to dark theme");
    try { localStorage.setItem("theme", nowDark ? "dark" : "light"); } catch (e) {}
  });
}

initTheme();

const footerBackLinks = document.querySelectorAll('.footer-link');
const showBackToTop = () => {
  const show = window.scrollY > 300;
  if (backToTop) backToTop.classList.toggle('visible', show);
};

footerBackLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', showBackToTop);
showBackToTop();

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.classList.remove("is-open");
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!siteNav || !menuToggle) return;
  const clickedInsideNav = siteNav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);
  if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("open")) closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 12);
});

const sections = [...document.querySelectorAll("main section[id]")];

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`.site-nav a[href="#${id}"]`);
    if (!navLink) return;
    navLink.classList.toggle("active", scrollPosition >= top && scrollPosition < bottom);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}
