// ==========================================================================
// La cafetería de Bruno — comportamiento compartido de todas las páginas
// ==========================================================================

(function(){
  const WHATSAPP_NUMBER = "5215624015127"; // +52 1 56 2401 5127

  function buildWhatsappLink(message){
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    const msg = el.getAttribute("data-whatsapp-msg") || "Hola, quisiera más información de La cafetería de Bruno.";
    el.setAttribute("href", buildWhatsappLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---------- Header: fondo sólido al hacer scroll ----------
  const header = document.querySelector(".site-header");
  if (header){
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Menú móvil ----------
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav){
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  // ---------- Reveal al hacer scroll ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  // ---------- Año en footer ----------
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.BrunoSite = window.BrunoSite || {};
  window.BrunoSite.buildWhatsappLink = buildWhatsappLink;
})();
