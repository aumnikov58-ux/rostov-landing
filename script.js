const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const routeDialog = document.querySelector("#route-dialog");
const openRouteButton = document.querySelector("[data-open-route]");
const closeRouteButton = document.querySelector("[data-close-route]");

document.documentElement.classList.add("js-enabled");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function setMenuOpen(isOpen) {
  if (!navToggle || !siteNav) return;

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  siteNav.classList.toggle("is-open", isOpen);
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

siteNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -7% 0px",
      threshold: 0.08,
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

function openRouteDialog() {
  if (!routeDialog) return;
  if (typeof routeDialog.showModal === "function") {
    routeDialog.showModal();
  } else {
    routeDialog.setAttribute("open", "");
  }
}

function closeRouteDialog() {
  if (!routeDialog) return;
  if (typeof routeDialog.close === "function") {
    routeDialog.close();
  } else {
    routeDialog.removeAttribute("open");
  }
}

openRouteButton?.addEventListener("click", openRouteDialog);
closeRouteButton?.addEventListener("click", closeRouteDialog);

routeDialog?.addEventListener("click", (event) => {
  if (event.target === routeDialog) closeRouteDialog();
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
