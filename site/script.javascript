const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const roadmapCards = document.querySelectorAll(".roadmap-card");

let currentLang = "en";
let currentFilter = "all";

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "mm" : "en";
  langToggle.textContent = currentLang === "en" ? "MM" : "EN";
  updateLanguage();
});

function updateLanguage() {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.getAttribute(currentLang === "en" ? "data-en" : "data-mm");
  });

  const placeholder =
    currentLang === "en"
      ? searchInput.getAttribute("data-placeholder-en")
      : searchInput.getAttribute("data-placeholder-mm");

  searchInput.placeholder = placeholder;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.getAttribute("data-filter");
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();

  roadmapCards.forEach((card) => {
    const level = card.getAttribute("data-level");
    const keywords = card.getAttribute("data-keywords").toLowerCase();
    const text = card.textContent.toLowerCase();

    const matchesFilter = currentFilter === "all" || currentFilter === level;
    const matchesSearch = keywords.includes(query) || text.includes(query);

    card.style.display = matchesFilter && matchesSearch ? "block" : "none";
  });
}

updateLanguage();
