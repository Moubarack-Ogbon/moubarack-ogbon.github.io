/* ================================================================
   PORTFOLIO v3 — logique (JavaScript natif, sans dépendance)
   ----------------------------------------------------------------
     1. En-tête au défilement
     2. Menu mobile
     3. Années d'expérience (calculées depuis 2022)
     4. Apparition au défilement + compteurs animés
     5. Lien actif dans le menu
     6. Année du pied de page
   ================================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".header");
  var burger = document.getElementById("burger");
  var mmenu = document.getElementById("mobile-menu");

  /* 1. EN-TÊTE ----------------------------------------------------- */
  function onScroll() { header.setAttribute("data-scrolled", window.scrollY > 10 ? "true" : "false"); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* 2. MENU MOBILE ------------------------------------------------- */
  function setMenu(open) {
    mmenu.setAttribute("data-open", open ? "true" : "false");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.querySelector(".sr").textContent = open ? "Fermer le menu" : "Ouvrir le menu";
  }
  burger.addEventListener("click", function () { setMenu(mmenu.getAttribute("data-open") !== "true"); });
  mmenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mmenu.getAttribute("data-open") === "true") { setMenu(false); burger.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1024) setMenu(false); });

  /* 3. ANNÉES D'EXPÉRIENCE ---------------------------------------- */
  var years = Math.max(1, new Date().getFullYear() - 2022);
  document.querySelectorAll("[data-years]").forEach(function (el) {
    el.textContent = years;
    if (el.hasAttribute("data-count")) el.setAttribute("data-count", years);
  });

  /* 4. APPARITION + COMPTEURS ------------------------------------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduce || target === 0) { el.textContent = target; return; }
    var start = null, dur = 1400;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var blocks = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        en.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    blocks.forEach(function (b) { io.observe(b); });
  } else {
    blocks.forEach(function (b) { b.classList.add("in"); });
  }

  /* 5. LIEN ACTIF -------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__a, .mmenu__nav a:not(.btn)"));
  var ids = ["apropos", "realisations", "competences", "parcours"];
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* 6. ANNÉE ------------------------------------------------------- */
  var y = document.getElementById("annee");
  if (y) y.textContent = new Date().getFullYear();
})();
