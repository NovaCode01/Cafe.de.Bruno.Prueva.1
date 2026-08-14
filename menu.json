import { loadMenu } from "./data.js";

const listEl = document.getElementById("menuCategories");
const searchInput = document.getElementById("menuSearch");

function slug(str){
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function productRow(p){
  const notes = p.notes ? `<span class="menu-row-notes">${p.notes}</span>` : "";
  return `
    <div class="menu-row" data-search="${(p.name + " " + (p.notes||"")).toLowerCase()}">
      <div class="menu-row-name">${p.name}${notes}</div>
      <div class="menu-row-price">${p.price}</div>
    </div>`;
}

function renderCategory(cat){
  const id = slug(cat.category);
  const blocks = cat.items.map(item => {
    if (item.subcategory){
      return `
        <h3 class="menu-sub">${item.subcategory}</h3>
        <div class="menu-list">${item.products.map(productRow).join("")}</div>`;
    }
    return `<div class="menu-list">${productRow(item)}</div>`;
  }).join("");

  return `
    <div class="menu-category reveal" id="cat-${id}" data-cat="${id}">
      <span class="eyebrow">Menú</span>
      <h2>${cat.category}</h2>
      ${blocks}
    </div>`;
}

function observeReveal(){
  const els = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
}

function setupSearch(){
  if (!searchInput) return;
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    const rows = document.querySelectorAll(".menu-row");
    const cats = document.querySelectorAll(".menu-category");

    rows.forEach(row => {
      row.style.display = !q || row.dataset.search.includes(q) ? "" : "none";
    });

    cats.forEach(cat => {
      const visibleRows = cat.querySelectorAll('.menu-row:not([style*="display: none"])');
      cat.style.display = q && visibleRows.length === 0 ? "none" : "";
    });
  });
}

(async function init(){
  try{
    const data = await loadMenu();
    const categories = data.categories || [];
    listEl.innerHTML = categories.map(renderCategory).join("");
    observeReveal();
    setupSearch();
  } catch(err){
    console.error(err);
    listEl.innerHTML = `<p class="menu-empty">No pudimos cargar el menú en este momento. Intenta de nuevo más tarde.</p>`;
  }
})();
