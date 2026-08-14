// ==========================================================================
// Capa de datos compartida — menú, horario y reseñas
// Prioriza Firestore (si ya está configurado); si no, usa /data/menu.json
// y valores por defecto locales, para que el sitio funcione desde el día 1.
// ==========================================================================

import { getFirestoreDb, isFirebaseConfigured } from "./firebase-config.js";

export const DEFAULT_SETTINGS = {
  whatsapp: "5215624015127",
  instagram: "lacafeteriadebrunofm",
  mapsUrl: "https://l.instagram.com/?u=https%3A%2F%2Fmaps.app.goo.gl%2F2N4wUa5xHJaFyG9i9%3Fg_st%3Dcom.google.maps.preview.copy%26utm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio&e=AUCPhSVMWmZZySfbcZb5IgLa6qs5dPZ7WLm8vgDQCqInwQpZ9e286bQHxdknYiZQABO9HF16KZrQDmFXeJcsFsmcVsaV8N2fPwfcDNazxdyat16BTmWP8qFY3aLtK5pDnXgnSwyPpBjJs8xw5Rn0m3s",
  mapsEmbedQuery: "La cafetería de Bruno",
  schedule: [
    { day: "Lunes a viernes", hours: "8:00 am – 8:00 pm" },
    { day: "Sábado", hours: "9:00 am – 8:00 pm" },
    { day: "Domingo", hours: "9:00 am – 6:00 pm" }
  ],
  rating: {
    value: null,   // ej. 4.8 — lo actualiza el admin con el dato real de Google Maps
    count: null    // ej. 132
  }
};

async function tryFirestore(){
  if (!isFirebaseConfigured()) return null;
  try{
    return await getFirestoreDb();
  } catch(err){
    console.warn("No se pudo conectar a Firestore, usando datos locales.", err);
    return null;
  }
}

export async function loadMenu(){
  const db = await tryFirestore();
  if (db){
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
    const snap = await getDoc(doc(db, "site", "menu"));
    if (snap.exists()) return snap.data();
  }
  const res = await fetch("data/menu.json");
  return res.json();
}

export async function loadSettings(){
  const db = await tryFirestore();
  if (db){
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
    const snap = await getDoc(doc(db, "site", "settings"));
    if (snap.exists()) return { ...DEFAULT_SETTINGS, ...snap.data() };
  }
  return DEFAULT_SETTINGS;
}

export async function saveMenu(menuData){
  const db = await tryFirestore();
  if (!db) throw new Error("Firebase no está configurado todavía (revisa firebase-config.js).");
  const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
  await setDoc(doc(db, "site", "menu"), menuData);
}

export async function saveSettings(settingsData){
  const db = await tryFirestore();
  if (!db) throw new Error("Firebase no está configurado todavía (revisa firebase-config.js).");
  const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
  await setDoc(doc(db, "site", "settings"), settingsData, { merge: true });
}

export async function seedMenuFromLocalFile(){
  const res = await fetch("data/menu.json");
  const json = await res.json();
  await saveMenu(json);
  return json;
}
