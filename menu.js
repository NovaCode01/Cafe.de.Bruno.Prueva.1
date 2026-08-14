/* ==========================================================================
   La cafetería de Bruno — hoja de estilos
   Paleta: crema / blanco cálido / taupe / café oscuro / negro
   Tipografía: Fraunces (display) + Inter (texto)
   ========================================================================== */

:root{
  --cream:      #F3ECE3;
  --paper:      #F8F5EF;
  --taupe:      #AA9C8D;
  --coffee:     #5B4E47;
  --ink:        #111111;

  --coffee-10:  rgba(91,78,71,.08);
  --coffee-20:  rgba(91,78,71,.16);
  --taupe-30:   rgba(170,156,141,.35);

  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --max-w: 1080px;
  --pad: clamp(20px, 5vw, 64px);

  --ease: cubic-bezier(.22,.61,.36,1);
}

*, *::before, *::after{ box-sizing: border-box; }
html{ scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior: auto; }
  *, *::before, *::after{ animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}

body{
  margin: 0;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img{ max-width: 100%; display: block; }
a{ color: inherit; text-decoration: none; }

h1,h2,h3,h4{
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.12;
  margin: 0 0 .4em;
  letter-spacing: -0.01em;
}

.eyebrow{
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: .16em;
  font-size: .72rem;
  font-weight: 600;
  color: var(--coffee);
  display: inline-flex;
  align-items: center;
  gap: .55em;
}
.eyebrow::before{
  content: "";
  width: 22px; height: 1px;
  background: var(--taupe);
  display: inline-block;
}

.container{
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--pad);
}

.hairline{
  height: 1px;
  background: var(--taupe-30);
  border: 0;
  margin: 0;
}

/* ---------- Botones ---------- */
.btn{
  display: inline-flex;
  align-items: center;
  gap: .55em;
  padding: .82em 1.5em;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: .92rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform .35s var(--ease), background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease);
}
.btn-primary{
  background: var(--coffee);
  color: var(--paper);
}
.btn-primary:hover{ transform: translateY(-2px); background: #4a3f39; }

.btn-ghost{
  background: transparent;
  color: var(--coffee);
  border-color: var(--coffee-20);
}
.btn-ghost:hover{ border-color: var(--coffee); transform: translateY(-2px); }

.btn svg{ width: 18px; height: 18px; }

/* ---------- Marca / sello ---------- */
.brand{
  display: inline-flex;
  align-items: center;
  gap: .65em;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.08rem;
  color: var(--ink);
}
.brand-mark{
  width: 34px; height: 34px;
  flex: none;
  border-radius: 50%;
  overflow: hidden;
  background: var(--paper);
  border: 1px solid var(--taupe-30);
}
.brand-mark img{ width: 100%; height: 100%; object-fit: cover; display: block; }

/* ---------- Header ---------- */
.site-header{
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background .45s var(--ease), padding .45s var(--ease), box-shadow .45s var(--ease), border-color .45s var(--ease);
  border-bottom: 1px solid transparent;
}
.site-header .container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.site-header.is-scrolled{
  background: rgba(248,245,239,.88);
  backdrop-filter: blur(10px);
  padding: 13px 0;
  border-color: var(--taupe-30);
}

.site-nav{
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 38px);
}
.site-nav a:not(.btn){
  position: relative;
  font-size: .93rem;
  font-weight: 500;
  color: var(--coffee);
  padding: .2em 0;
}
.site-nav a:not(.btn)::after{
  content: "";
  position: absolute;
  left: 0; bottom: -2px;
  height: 1px;
  width: 0%;
  background: var(--coffee);
  transition: width .35s var(--ease);
}
.site-nav a:not(.btn):hover::after,
.site-nav a.is-active::after{ width: 100%; }
.site-nav a.is-active{ color: var(--ink); }

.nav-toggle{
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.nav-toggle span{
  display: block;
  width: 22px; height: 1.5px;
  background: var(--ink);
  margin: 5px 0;
  transition: transform .3s var(--ease), opacity .3s var(--ease);
}

/* ---------- Reveal on scroll ---------- */
.reveal{
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .8s var(--ease), transform .8s var(--ease);
}
.reveal.is-visible{
  opacity: 1;
  transform: translateY(0);
}
.reveal-stagger.is-visible > *{ transition-delay: calc(var(--i, 0) * 90ms); }

/* ---------- Hero ---------- */
.hero{
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  padding-top: 140px;
  padding-bottom: 72px;
  position: relative;
  overflow: hidden;
}
.hero-grid{
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: clamp(28px, 5vw, 64px);
  align-items: end;
  width: 100%;
}
.hero h1{
  font-size: clamp(2.6rem, 6vw, 4.6rem);
  color: var(--ink);
}
.hero h1 em{
  font-style: italic;
  color: var(--coffee);
}
.hero-sub{
  max-width: 46ch;
  color: var(--coffee);
  font-size: 1.05rem;
  margin: 18px 0 30px;
}
.hero-actions{ display: flex; flex-wrap: wrap; gap: 14px; }

.hero-frame{
  aspect-ratio: 4/5;
  border-radius: 4px;
  background: var(--paper);
  border: 1px solid var(--taupe-30);
  overflow: hidden;
  position: relative;
}
.hero-frame img{ width: 100%; height: 100%; object-fit: cover; }

/* ---------- Placeholder de imagen ---------- */
.img-placeholder{
  width: 100%; height: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background:
    repeating-linear-gradient(135deg, var(--coffee-10) 0 2px, transparent 2px 14px);
  border: 1px dashed var(--taupe);
  color: var(--coffee);
  text-align: center;
  padding: 20px;
}
.img-placeholder .ph-icon{
  width: 30px; height: 30px;
  opacity: .55;
}
.img-placeholder span{
  font-size: .78rem;
  letter-spacing: .04em;
  max-width: 22ch;
  opacity: .85;
}

/* ---------- Secciones generales ---------- */
section{ padding: clamp(64px, 10vw, 120px) 0; }
.section-head{
  max-width: 640px;
  margin-bottom: clamp(32px, 5vw, 56px);
}
.section-head h2{ font-size: clamp(1.9rem, 3.4vw, 2.6rem); margin-top: .3em; }
.section-head p{ color: var(--coffee); font-size: 1.02rem; }

.section-alt{ background: var(--paper); }

/* ---------- Nosotros ---------- */
.about-grid{
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: clamp(30px, 6vw, 72px);
  align-items: center;
}
.about-copy p{ margin: 0 0 1.1em; color: #2b2320; }
.about-copy p:last-child{ margin-bottom: 0; }

.stat-row{
  display: flex;
  gap: clamp(24px, 5vw, 48px);
  margin-top: 34px;
  flex-wrap: wrap;
}
.stat b{
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--coffee);
}
.stat span{
  font-size: .8rem;
  color: var(--taupe);
  text-transform: uppercase;
  letter-spacing: .08em;
}

/* ---------- Galería ---------- */
.gallery{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.gallery .g-item{
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 3px;
}
.gallery .g-item:nth-child(1){ grid-column: span 2; grid-row: span 2; aspect-ratio: 1/1; }
.gallery .g-item img{ width: 100%; height: 100%; object-fit: cover; transition: transform .7s var(--ease); }
.gallery .g-item:hover img{ transform: scale(1.05); }

@media (max-width: 720px){
  .gallery{ grid-template-columns: repeat(2, 1fr); }
  .gallery .g-item:nth-child(1){ grid-column: span 2; }
}

/* ---------- CTA WhatsApp flotante en secciones ---------- */
.inline-cta{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  background: var(--coffee);
  color: var(--paper);
  border-radius: 6px;
  padding: clamp(30px, 5vw, 46px) clamp(28px, 5vw, 52px);
}
.inline-cta h3{ color: var(--paper); font-size: clamp(1.4rem, 2.6vw, 1.9rem); margin: 0; }
.inline-cta p{ color: var(--taupe); margin: .4em 0 0; max-width: 40ch; }
.inline-cta .btn-primary{ background: var(--paper); color: var(--coffee); }
.inline-cta .btn-primary:hover{ background: #fff; }

/* ---------- Footer ---------- */
.site-footer{
  padding: 56px 0 30px;
  border-top: 1px solid var(--taupe-30);
}
.footer-top{
  display: flex;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.footer-cols{ display: flex; gap: clamp(28px, 6vw, 72px); flex-wrap: wrap; }
.footer-col h4{
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: .1em;
  font-size: .74rem;
  color: var(--taupe);
  margin-bottom: .9em;
}
.footer-col a, .footer-col p{
  display: block;
  font-size: .92rem;
  color: var(--coffee);
  margin-bottom: .55em;
}
.footer-col a:hover{ color: var(--ink); }
.footer-bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: .78rem;
  color: var(--taupe);
}
.footer-bottom a{
  color: var(--taupe);
  opacity: .7;
}
.footer-bottom a:hover{ opacity: 1; }

/* ---------- WhatsApp flotante ---------- */
.wa-float{
  position: fixed;
  right: 22px;
  bottom: 22px;
  width: 54px; height: 54px;
  border-radius: 50%;
  background: var(--coffee);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 26px rgba(17,17,17,.22);
  z-index: 90;
  transition: transform .35s var(--ease);
}
.wa-float:hover{ transform: translateY(-3px) scale(1.04); }
.wa-float svg{ width: 24px; height: 24px; }

/* ==========================================================================
   Página de Menú
   ========================================================================== */
.menu-hero{
  padding: 150px 0 40px;
}
.menu-hero h1{ font-size: clamp(2.2rem, 5vw, 3.2rem); }
.menu-hero p{ color: var(--coffee); max-width: 52ch; margin-top: 14px; }

.menu-search{
  margin: 26px 0 6px;
}
.menu-search input{
  width: 100%;
  padding: .95em 1.2em;
  border-radius: 999px;
  border: 1px solid var(--taupe-30);
  background: var(--paper);
  font-family: var(--font-body);
  font-size: .95rem;
  color: var(--ink);
  outline: none;
  transition: border-color .3s var(--ease);
}
.menu-search input:focus{ border-color: var(--coffee); }

.menu-category{ padding: 46px 0 8px; scroll-margin-top: 130px; }
.menu-category h2{
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  margin-bottom: 4px;
}
.menu-sub{
  margin: 30px 0 14px;
  font-size: .78rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--taupe);
  font-weight: 700;
}
.menu-list{ display: flex; flex-direction: column; }
.menu-row{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--taupe-30);
}
.menu-row:first-child{ border-top: 1px solid var(--taupe-30); }
.menu-row-name{
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--ink);
}
.menu-row-notes{
  display: block;
  font-family: var(--font-body);
  font-size: .82rem;
  color: var(--taupe);
  margin-top: 3px;
}
.menu-row-price{
  font-weight: 600;
  color: var(--coffee);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.menu-empty{
  padding: 60px 0;
  text-align: center;
  color: var(--taupe);
}

/* ---------- Testimonios ---------- */
.review-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.review-card{
  background: var(--paper);
  border: 1px solid var(--taupe-30);
  border-radius: 6px;
  padding: 26px 28px;
}
.review-head{
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.review-avatar{
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--coffee-10);
  color: var(--coffee);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: .85rem;
  flex: none;
}
.review-name{ font-weight: 600; font-size: .95rem; color: var(--ink); }
.review-meta{ font-size: .76rem; color: var(--taupe); }
.review-stars{
  color: var(--coffee);
  letter-spacing: 2px;
  font-size: .95rem;
  margin-bottom: 2px;
}
.review-date{ font-size: .76rem; color: var(--taupe); margin-bottom: 12px; }
.review-text{ font-size: .92rem; color: #2b2320; margin: 0; }

@media (max-width: 720px){
  .review-grid{ grid-template-columns: 1fr; }
}

/* ==========================================================================
   Página de Contacto
   ========================================================================== */
.contact-hero{ padding: 150px 0 20px; }
.contact-grid{
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: clamp(30px, 5vw, 64px);
  align-items: start;
}
.contact-card{
  background: var(--paper);
  border: 1px solid var(--taupe-30);
  border-radius: 6px;
  padding: clamp(26px, 4vw, 40px);
}
.contact-line{
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--taupe-30);
}
.contact-line:last-child{ border-bottom: none; }
.contact-line .ic{
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--coffee-10);
  display: flex; align-items: center; justify-content: center;
  flex: none;
}
.contact-line .ic svg{ width: 18px; height: 18px; color: var(--coffee); }
.contact-line a, .contact-line span{ font-size: .95rem; }
.contact-line small{ display: block; color: var(--taupe); font-size: .74rem; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 2px; }

.map-frame{
  width: 100%;
  aspect-ratio: 16/11;
  border: 1px solid var(--taupe-30);
  border-radius: 6px;
  overflow: hidden;
  background: var(--paper);
}
.map-frame iframe{ width: 100%; height: 100%; border: 0; }
.map-open{
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: .88rem;
  font-weight: 600;
  color: var(--coffee);
}
.map-open svg{ width: 15px; height: 15px; }

.rating-block{
  margin-top: 46px;
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: wrap;
}
.rating-score{
  font-family: var(--font-display);
  font-size: 3.2rem;
  color: var(--coffee);
  line-height: 1;
}
.rating-stars{ display: flex; gap: 3px; margin: 8px 0 4px; }
.rating-stars svg{ width: 17px; height: 17px; color: var(--coffee); }
.rating-count{ font-size: .85rem; color: var(--taupe); }
.rating-source{ font-size: .8rem; color: var(--taupe); max-width: 26ch; }

.hours-list{ margin-top: 8px; }
.hours-row{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--taupe-30);
  font-size: .92rem;
}
.hours-row:last-child{ border: 0; }
.hours-row span:first-child{ color: var(--coffee); font-weight: 600; }

/* ==========================================================================
   Admin
   ========================================================================== */
.admin-shell{
  min-height: 100vh;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px var(--pad);
}
.admin-login{
  width: 100%;
  max-width: 380px;
  background: var(--paper);
  border: 1px solid var(--taupe-30);
  border-radius: 8px;
  padding: 40px 34px;
}
.admin-login h1{ font-size: 1.5rem; }
.admin-login p{ color: var(--coffee); font-size: .88rem; margin-bottom: 26px; }
.field{ margin-bottom: 16px; }
.field label{
  display: block;
  font-size: .78rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--taupe);
  margin-bottom: 6px;
}
.field input, .field textarea, .field select{
  width: 100%;
  padding: .8em 1em;
  border: 1px solid var(--taupe-30);
  border-radius: 5px;
  background: var(--cream);
  font-family: var(--font-body);
  font-size: .92rem;
  color: var(--ink);
  outline: none;
  transition: border-color .3s var(--ease);
}
.field input:focus, .field textarea:focus, .field select:focus{ border-color: var(--coffee); }
.field-row{ display: flex; gap: 12px; }
.field-row .field{ flex: 1; }

.form-msg{ font-size: .82rem; margin-top: 10px; min-height: 1.2em; }
.form-msg.error{ color: #9b3b2f; }
.form-msg.ok{ color: #3c6b4a; }

.admin-app{ display: none; min-height: 100vh; }
.admin-app.is-visible{ display: block; }
.admin-topbar{
  position: sticky; top: 0; z-index: 20;
  background: var(--paper);
  border-bottom: 1px solid var(--taupe-30);
  padding: 16px 0;
}
.admin-topbar .container{ display: flex; justify-content: space-between; align-items: center; }
.admin-main{ padding: 40px 0 100px; }
.admin-section{
  background: var(--paper);
  border: 1px solid var(--taupe-30);
  border-radius: 8px;
  padding: clamp(22px, 3vw, 34px);
  margin-bottom: 26px;
}
.admin-section h2{ font-size: 1.25rem; margin-bottom: 4px; }
.admin-section .hint{ color: var(--taupe); font-size: .82rem; margin-bottom: 20px; }

.admin-cat{ border: 1px solid var(--taupe-30); border-radius: 6px; padding: 18px; margin-bottom: 16px; background: var(--cream); }
.admin-cat > .field-row{ margin-bottom: 12px; }
.admin-product-row{ display: grid; grid-template-columns: 1.4fr .8fr 1.2fr auto; gap: 10px; margin-bottom: 8px; align-items: center; }
.admin-product-row input{ padding: .6em .8em; font-size: .85rem; }
.icon-btn{
  background: none; border: 1px solid var(--taupe-30); border-radius: 5px;
  width: 34px; height: 34px; cursor: pointer; color: var(--coffee);
  display: flex; align-items: center; justify-content: center;
  transition: all .25s var(--ease);
}
.icon-btn:hover{ border-color: var(--coffee); background: var(--coffee-10); }
.icon-btn svg{ width: 15px; height: 15px; }

.admin-add-cat, .admin-add-product{
  font-size: .85rem; font-weight: 600; color: var(--coffee);
  background: none; border: 1px dashed var(--taupe); border-radius: 6px;
  padding: 10px 16px; cursor: pointer; width: 100%; text-align: center;
  transition: all .25s var(--ease);
}
.admin-add-cat:hover, .admin-add-product:hover{ border-style: solid; background: var(--coffee-10); }

.status-pill{
  font-size: .74rem; font-weight: 600; padding: 5px 12px; border-radius: 999px;
}
.status-pill.online{ background: rgba(60,107,74,.15); color: #3c6b4a; }
.status-pill.offline{ background: rgba(155,59,47,.15); color: #9b3b2f; }

/* ---------- Utilidades ---------- */
.mt-0{ margin-top: 0 !important; }
.center{ text-align: center; }
.hidden{ display: none !important; }

/* ---------- Responsive ---------- */
@media (max-width: 860px){
  .hero-grid, .about-grid, .contact-grid{ grid-template-columns: 1fr; }
  .hero{ align-items: flex-start; padding-top: 120px; }
  .hero-frame{ order: -1; aspect-ratio: 16/10; }
  .nav-toggle{ display: block; }
  .site-nav{
    position: fixed;
    inset: 0 0 auto 0;
    top: 0;
    flex-direction: column;
    align-items: flex-start;
    background: var(--paper);
    padding: 100px var(--pad) 40px;
    transform: translateY(-100%);
    transition: transform .45s var(--ease);
    gap: 22px;
  }
  .site-nav.is-open{ transform: translateY(0); }
  .admin-product-row{ grid-template-columns: 1fr; }
}
