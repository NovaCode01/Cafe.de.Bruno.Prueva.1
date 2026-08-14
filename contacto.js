import { loadSettings } from "./data.js";

const hoursEl = document.getElementById("hoursList");
const ratingScoreEl = document.getElementById("ratingScore");
const ratingStarsEl = document.getElementById("ratingStars");
const ratingCountEl = document.getElementById("ratingCount");
const mapLinkEls = document.querySelectorAll("[data-maps-link]");
const mapEmbedEl = document.getElementById("mapEmbed");
const igLinkEls = document.querySelectorAll("[data-instagram-link]");
const igHandleEls = document.querySelectorAll("[data-instagram-handle]");

function starIcon(filled){
  return `<svg viewBox="0 0 20 20" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.4">
    <path stroke-linejoin="round" d="M10 1.8l2.47 5.13 5.53.62-4.1 3.83 1.14 5.52L10 14.9l-4.94 2.99 1.14-5.52-4.1-3.83 5.53-.62L10 1.8z"/>
  </svg>`;
}

(async function init(){
  const settings = await loadSettings();

  // Horario
  if (hoursEl && settings.schedule){
    hoursEl.innerHTML = settings.schedule.map(s => `
      <div class="hours-row"><span>${s.day}</span><span>${s.hours}</span></div>
    `).join("");
  }

  // Calificación
  const rating = settings.rating || {};
  if (rating.value){
    ratingScoreEl.textContent = rating.value.toFixed ? rating.value.toFixed(1) : rating.value;
    const full = Math.round(rating.value);
    ratingStarsEl.innerHTML = Array.from({ length: 5 }, (_, i) => starIcon(i < full)).join("");
    ratingCountEl.textContent = rating.count ? `Basado en ${rating.count} reseñas de Google` : "Reseñas de Google";
  } else {
    ratingScoreEl.textContent = "—";
    ratingStarsEl.innerHTML = Array.from({ length: 5 }, () => starIcon(false)).join("");
    ratingCountEl.textContent = "Aún sin calificación publicada";
  }

  // Enlaces de mapa e Instagram
  mapLinkEls.forEach(el => el.setAttribute("href", settings.mapsUrl));
  if (mapEmbedEl && settings.mapsEmbedQuery){
    mapEmbedEl.setAttribute("src", `https://www.google.com/maps?q=${encodeURIComponent(settings.mapsEmbedQuery)}&output=embed`);
  }
  igLinkEls.forEach(el => el.setAttribute("href", `https://instagram.com/${settings.instagram}`));
  igHandleEls.forEach(el => el.textContent = `@${settings.instagram}`);
})();
