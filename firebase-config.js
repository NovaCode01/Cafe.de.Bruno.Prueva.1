// ==========================================================================
// Configuración de Firebase
// --------------------------------------------------------------------------
// 1. Sigue la guía de README.md para crear tu proyecto de Firebase gratuito.
// 2. Reemplaza los valores de abajo con los que te da Firebase (Configuración
//    del proyecto → tus apps → SDK setup and configuration → "Config").
// 3. Mientras esto tenga "TU_API_KEY", el sitio funcionará igual, pero leyendo
//    el menú y los datos desde el archivo local /data/menu.json en vez de la
//    base de datos en línea, y el panel de admin no podrá guardar cambios
//    para todos los visitantes (solo verá una vista previa local).
// ==========================================================================

export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("TU_");

// Carga perezosa del SDK de Firebase solo si ya se configuró, para que el
// sitio no dependa de internet extra ni truene si aún no lo llenaste.
let appPromise = null;

export async function getFirebaseApp(){
  if (!isFirebaseConfigured()) return null;
  if (!appPromise){
    appPromise = import("https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js")
      .then(({ initializeApp }) => initializeApp(firebaseConfig));
  }
  return appPromise;
}

export async function getFirestoreDb(){
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
  return getFirestore(app);
}

export async function getFirebaseAuth(){
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js");
  return getAuth(app);
}
