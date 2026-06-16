const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

function updateHeaderOnScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();

navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

const scrollProgressFill = document.getElementById("scrollProgressFill");
const scrollTopButton = document.getElementById("scrollTop");
const scrollTopRing = document.getElementById("scrollTopRing");
const ringCircumference = 119.4;

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  scrollProgressFill.style.height = `${progress}%`;
  scrollTopRing.style.strokeDashoffset = `${ringCircumference * (1 - progress / 100)}`;
  scrollTopButton.classList.toggle("is-visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const langSwitcher = document.getElementById("langSwitcher");
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langCurrentFlag = document.getElementById("langCurrentFlag");
const langCurrentCode = document.getElementById("langCurrentCode");

function applyLanguage(lang) {
  const dict = translations[lang] || translations.es;
  const label = langLabels[lang] || langLabels.es;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.documentElement.setAttribute("lang", lang);
  langCurrentFlag.src = `https://flagcdn.com/24x18/${label.flag}.png`;
  langCurrentCode.textContent = label.code;
  localStorage.setItem("tres56-lang", lang);
}

langToggle.addEventListener("click", () => {
  langSwitcher.classList.toggle("is-open");
});

langMenu.querySelectorAll("[data-lang]").forEach((option) => {
  option.addEventListener("click", () => {
    applyLanguage(option.getAttribute("data-lang"));
    langSwitcher.classList.remove("is-open");
  });
});

document.addEventListener("click", (event) => {
  if (!langSwitcher.contains(event.target)) {
    langSwitcher.classList.remove("is-open");
  }
});

const savedLang = localStorage.getItem("tres56-lang") || "es";
applyLanguage(savedLang);
