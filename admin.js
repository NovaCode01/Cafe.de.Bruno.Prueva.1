import { getFirebaseAuth, isFirebaseConfigured } from "./firebase-config.js";
import { loadMenu, loadSettings, saveMenu, saveSettings, seedMenuFromLocalFile, DEFAULT_SETTINGS } from "./data.js";

// ---------- Elementos ----------
const configWarning = document.getElementById("configWarning");
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");
const previewBtn = document.getElementById("previewBtn");
const appView = document.getElementById("appView");
const logoutBtn = document.getElementById("logoutBtn");
const statusPill = document.getElementById("statusPill");

const scheduleList = document.getElementById("scheduleList");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsMsg = document.getElementById("settingsMsg");
const ratingValueInput = document.getElementById("ratingValue");
const ratingCountInput = document.getElementById("ratingCount");

const catsWrap = document.getElementById("catsWrap");
const addCatBtn = document.getElementById("addCatBtn");
const saveMenuBtn = document.getElementById("saveMenuBtn");
const menuMsg = document.getElementById("menuMsg");
const seedBtn = document.getElementById("seedBtn");

let readOnlyPreview = false;

// ---------- Utilidades ----------
const trashIcon = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m-6.5 0l.6 10.2A1.5 1.5 0 007.6 17.6h4.8a1.5 1.5 0 001.5-1.4L14.5 6"/></svg>`;

function rowsFromMenuJson(menuJson){
  return (menuJson.categories || []).map(cat => {
    const rows = [];
    cat.items.forEach(item => {
      if (item.subcategory){
        item.products.forEach(p => rows.push({ subcategory: item.subcategory, name: p.name, price: p.price, notes: p.notes || "" }));
      } else {
        rows.push({ subcategory: "", name: item.name, price: item.price, notes: item.notes || "" });
      }
    });
    return { category: cat.category, rows };
  });
}

function menuJsonFromRows(catState){
  const categories = catState.map(cat => {
    const items = [];
    let currentGroup = null;
    cat.rows.forEach(row => {
      if (!row.name && !row.price) return; // saltar filas vacías
      const entry = { name: row.name, price: row.price };
      if (row.notes) entry.notes = row.notes;
      if (row.subcategory){
        if (currentGroup && currentGroup.subcategory === row.subcategory){
          currentGroup.products.push(entry);
        } else {
          currentGroup = { subcategory: row.subcategory, products: [entry] };
          items.push(currentGroup);
        }
      } else {
        currentGroup = null;
        items.push(entry);
      }
    });
    return { category: cat.category, items };
  });
  return { categories };
}

// ---------- Render del editor de menú ----------
let catState = [];

function renderCats(){
  catsWrap.innerHTML = catState.map((cat, ci) => `
    <div class="admin-cat" data-ci="${ci}">
      <div class="field-row">
        <div class="field" style="flex:2">
          <label>Nombre de la categoría</label>
          <input type="text" data-role="cat-name" value="${escapeAttr(cat.category)}" />
        </div>
        <button type="button" class="icon-btn" data-action="remove-cat" title="Eliminar categoría">${trashIcon}</button>
      </div>
      <div data-role="rows">
        ${cat.rows.map((row, ri) => productRowHtml(row, ri)).join("")}
      </div>
      <button type="button" class="admin-add-product" data-action="add-row">+ Agregar producto</button>
    </div>
  `).join("");
}

function productRowHtml(row){
  return `
    <div class="admin-product-row">
      <input type="text" data-role="name" placeholder="Producto" value="${escapeAttr(row.name)}" />
      <input type="text" data-role="price" placeholder="Precio" value="${escapeAttr(row.price)}" />
      <input type="text" data-role="subcategory" placeholder="Grupo (opcional, ej. Chilaquiles)" value="${escapeAttr(row.subcategory)}" />
      <button type="button" class="icon-btn" data-action="remove-row" title="Eliminar producto">${trashIcon}</button>
      <input type="hidden" data-role="notes" value="${escapeAttr(row.notes)}" />
    </div>`;
}

function escapeAttr(str){
  return String(str || "").replace(/"/g, "&quot;");
}

function syncStateFromDom(){
  catsWrap.querySelectorAll(".admin-cat").forEach((catEl, ci) => {
    catState[ci].category = catEl.querySelector('[data-role="cat-name"]').value.trim();
    const rows = [];
    catEl.querySelectorAll(".admin-product-row").forEach(rowEl => {
      rows.push({
        name: rowEl.querySelector('[data-role="name"]').value.trim(),
        price: rowEl.querySelector('[data-role="price"]').value.trim(),
        subcategory: rowEl.querySelector('[data-role="subcategory"]').value.trim(),
        notes: (rowEl.querySelector('[data-role="notes"]') || {}).value || ""
      });
    });
    catState[ci].rows = rows;
  });
}

catsWrap.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  syncStateFromDom();
  const catEl = btn.closest(".admin-cat");
  const ci = Number(catEl.dataset.ci);

  if (btn.dataset.action === "remove-cat"){
    catState.splice(ci, 1);
    renderCats();
  }
  if (btn.dataset.action === "add-row"){
    catState[ci].rows.push({ subcategory: "", name: "", price: "", notes: "" });
    renderCats();
  }
  if (btn.dataset.action === "remove-row"){
    const rowEl = btn.closest(".admin-product-row");
    const ri = [...catEl.querySelectorAll(".admin-product-row")].indexOf(rowEl);
    catState[ci].rows.splice(ri, 1);
    renderCats();
  }
});

addCatBtn.addEventListener("click", () => {
  syncStateFromDom();
  catState.push({ category: "Nueva categoría", rows: [{ subcategory: "", name: "", price: "" }] });
  renderCats();
});

saveMenuBtn.addEventListener("click", async () => {
  syncStateFromDom();
  const menuJson = menuJsonFromRows(catState);
  menuMsg.textContent = "Guardando...";
  menuMsg.className = "form-msg";
  try{
    if (readOnlyPreview) throw new Error("Estás en vista previa local: configura Firebase para guardar de verdad (ver README.md).");
    await saveMenu(menuJson);
    menuMsg.textContent = "Menú guardado. Ya se actualizó para todos los visitantes.";
    menuMsg.className = "form-msg ok";
  } catch(err){
    menuMsg.textContent = err.message;
    menuMsg.className = "form-msg error";
  }
});

seedBtn.addEventListener("click", async () => {
  menuMsg.textContent = "Cargando menú inicial desde data/menu.json...";
  menuMsg.className = "form-msg";
  try{
    if (readOnlyPreview) throw new Error("Estás en vista previa local: configura Firebase primero (ver README.md).");
    const json = await seedMenuFromLocalFile();
    catState = rowsFromMenuJson(json);
    renderCats();
    menuMsg.textContent = "Menú inicial cargado a Firebase correctamente.";
    menuMsg.className = "form-msg ok";
  } catch(err){
    menuMsg.textContent = err.message;
    menuMsg.className = "form-msg error";
  }
});

// ---------- Ajustes: horario y calificación ----------
let scheduleState = [];

function renderSchedule(){
  scheduleList.innerHTML = scheduleState.map((s, i) => `
    <div class="field-row" data-i="${i}" style="align-items:end; margin-bottom:10px;">
      <div class="field" style="flex:1">
        <label>Día(s)</label>
        <input type="text" data-role="day" value="${escapeAttr(s.day)}" />
      </div>
      <div class="field" style="flex:1">
        <label>Horario</label>
        <input type="text" data-role="hours" value="${escapeAttr(s.hours)}" />
      </div>
      <button type="button" class="icon-btn" data-action="remove-schedule">${trashIcon}</button>
    </div>
  `).join("");
}

scheduleList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='remove-schedule']");
  if (!btn) return;
  syncScheduleFromDom();
  const i = Number(btn.closest("[data-i]").dataset.i);
  scheduleState.splice(i, 1);
  renderSchedule();
});

addScheduleBtn.addEventListener("click", () => {
  syncScheduleFromDom();
  scheduleState.push({ day: "", hours: "" });
  renderSchedule();
});

function syncScheduleFromDom(){
  scheduleState = [...scheduleList.querySelectorAll("[data-i]")].map(row => ({
    day: row.querySelector('[data-role="day"]').value.trim(),
    hours: row.querySelector('[data-role="hours"]').value.trim()
  }));
}

saveSettingsBtn.addEventListener("click", async () => {
  syncScheduleFromDom();
  const payload = {
    schedule: scheduleState.filter(s => s.day || s.hours),
    rating: {
      value: ratingValueInput.value ? Number(ratingValueInput.value) : null,
      count: ratingCountInput.value ? Number(ratingCountInput.value) : null
    }
  };
  settingsMsg.textContent = "Guardando...";
  settingsMsg.className = "form-msg";
  try{
    if (readOnlyPreview) throw new Error("Estás en vista previa local: configura Firebase para guardar de verdad (ver README.md).");
    await saveSettings(payload);
    settingsMsg.textContent = "Horario y calificación actualizados para todos los visitantes.";
    settingsMsg.className = "form-msg ok";
  } catch(err){
    settingsMsg.textContent = err.message;
    settingsMsg.className = "form-msg error";
  }
});

// ---------- Carga inicial de datos en el panel ----------
async function populateApp(){
  const [menuJson, settings] = await Promise.all([loadMenu(), loadSettings()]);
  catState = rowsFromMenuJson(menuJson);
  renderCats();
  scheduleState = (settings.schedule && settings.schedule.length ? settings.schedule : DEFAULT_SETTINGS.schedule).map(s => ({ ...s }));
  renderSchedule();
  ratingValueInput.value = settings.rating && settings.rating.value ? settings.rating.value : "";
  ratingCountInput.value = settings.rating && settings.rating.count ? settings.rating.count : "";
}

function showApp(){
  loginView.classList.add("hidden");
  appView.classList.add("is-visible");
  populateApp();
}

// ---------- Autenticación ----------
if (!isFirebaseConfigured()){
  configWarning.classList.remove("hidden");
  statusPill.textContent = "Sin conectar";
  statusPill.className = "status-pill offline";
} else {
  statusPill.textContent = "Conectado a Firebase";
  statusPill.className = "status-pill online";
}

previewBtn.addEventListener("click", () => {
  readOnlyPreview = true;
  showApp();
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginMsg.textContent = "Ingresando...";
  loginMsg.className = "form-msg";
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!isFirebaseConfigured()){
    loginMsg.textContent = "Firebase no está configurado todavía. Usa 'Vista previa local' o completa el README.md.";
    loginMsg.className = "form-msg error";
    return;
  }

  try{
    const auth = await getFirebaseAuth();
    const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js");
    await signInWithEmailAndPassword(auth, email, password);
    readOnlyPreview = false;
    showApp();
  } catch(err){
    loginMsg.textContent = "No pudimos iniciar sesión. Revisa tu correo y contraseña.";
    loginMsg.className = "form-msg error";
  }
});

logoutBtn.addEventListener("click", async () => {
  if (isFirebaseConfigured() && !readOnlyPreview){
    try{
      const auth = await getFirebaseAuth();
      const { signOut } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js");
      await signOut(auth);
    } catch(err){ /* no-op */ }
  }
  readOnlyPreview = false;
  appView.classList.remove("is-visible");
  loginView.classList.remove("hidden");
  loginForm.reset();
});

// Si ya hay una sesión activa (recarga de página), entrar directo.
(async function checkSession(){
  if (!isFirebaseConfigured()) return;
  try{
    const auth = await getFirebaseAuth();
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js");
    onAuthStateChanged(auth, (user) => {
      if (user && !appView.classList.contains("is-visible")) showApp();
    });
  } catch(err){ /* no-op */ }
})();
