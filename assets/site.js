const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-mobile-menu]");
const openButton = document.querySelector("[data-menu-button]");
const closeButton = document.querySelector("[data-menu-close]");

function setMenu(open) {
  if (!menu) return;
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  openButton?.setAttribute("aria-expanded", String(open));
}

openButton?.addEventListener("click", () => setMenu(true));
closeButton?.addEventListener("click", () => setMenu(false));

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
  },
  { passive: true },
);

window.lucide?.createIcons();
