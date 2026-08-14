/* ================================================================
   PORTFOLIO v2 — OGBON Moubarack · Logique du site (100 % jQuery)
   ----------------------------------------------------------------
   Sommaire :
     1. Préparation & utilitaires
     2. État de la navigation au défilement
     3. Menu mobile (burger)
     4. Défilement fluide vers les ancres
     5. Apparition des éléments au défilement (.reveal)
     6. Lien de navigation actif (scroll-spy)
     7. Divers (année du pied de page)
   ================================================================ */

(function ($) {
  "use strict";

  $(function () {

    /* ------------------------------------------------------------
       1. PRÉPARATION & UTILITAIRES
       ------------------------------------------------------------ */
    var $window   = $(window);
    var $document = $(document);
    var $nav      = $(".nav");
    var $menu     = $("#menu");
    var $burger   = $("#burger");
    var $reveals  = $(".reveal");
    var $sections = $("section[id]");
    var $links    = $(".menu__link");

    // L'utilisateur préfère-t-il limiter les animations ? (accessibilité)
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * Un seul gestionnaire de défilement, cadencé par
     * requestAnimationFrame pour rester parfaitement fluide.
     */
    var ticking = false;
    function onScroll() {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = $window.scrollTop();
        updateNavState(y);
        updateReveals();
        updateActiveLink(y);
        ticking = false;
      });
    }

    $window.on("scroll resize", onScroll);

    /* ------------------------------------------------------------
       2. ÉTAT DE LA NAVIGATION
       ------------------------------------------------------------
       Dès que l'on quitte le sommet, la barre gagne une ombre
       douce qui la détache du contenu (voir le CSS).              */
    function updateNavState(y) {
      $nav.toggleClass("nav--scrolled", y > 16);
    }

    /* ------------------------------------------------------------
       3. MENU MOBILE (BURGER)
       ------------------------------------------------------------ */
    $burger.on("click", function () {
      var open = $menu.toggleClass("is-open").hasClass("is-open");
      $(this)
        .toggleClass("is-open", open)
        .attr("aria-expanded", open)
        .attr("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Un clic sur un lien (ou le bouton contact) referme le panneau.
    $menu.find("a").on("click", function () {
      $menu.removeClass("is-open");
      $burger.removeClass("is-open").attr("aria-expanded", "false");
    });

    /* ------------------------------------------------------------
       4. DÉFILEMENT FLUIDE VERS LES ANCRES
       ------------------------------------------------------------
       jQuery anime le scroll avec un décalage égal à la hauteur
       de la barre de navigation fixe.                             */
    $document.on("click", 'a[href^="#"]', function (event) {
      var cible = $(this.getAttribute("href"));
      if (!cible.length) { return; }

      event.preventDefault();

      var destination = Math.max(cible.offset().top - 70, 0);

      if (reduceMotion) {
        $window.scrollTop(destination);      // saut direct si demandé
      } else {
        $("html, body").stop(true).animate({ scrollTop: destination }, 620, "swing");
      }
    });

    /* ------------------------------------------------------------
       5. APPARITION DES ÉLÉMENTS AU DÉFILEMENT
       ------------------------------------------------------------
       Chaque .reveal glisse en place quand il entre dans l'écran.
       L'attribut data-delay (en ms) crée de légères cascades,
       transmis au CSS via la variable --dl.                       */
    $reveals.each(function () {
      var delay = $(this).data("delay");
      if (delay) {
        this.style.setProperty("--dl", delay + "ms");
      }
    });

    function updateReveals() {
      var bas = $window.scrollTop() + $window.height() * 0.88;

      $reveals.not(".is-visible").each(function () {
        var $el = $(this);
        if ($el.offset().top < bas) {
          $el.addClass("is-visible");
        }
      });
    }

    /* ------------------------------------------------------------
       6. LIEN DE NAVIGATION ACTIF (SCROLL-SPY)
       ------------------------------------------------------------
       Le lien du menu correspondant à la section visible reçoit
       la classe .is-active (soulignement caramel).                */
    function updateActiveLink(y) {
      var repere = y + 150;
      var actifId = "";

      $sections.each(function () {
        if ($(this).offset().top <= repere) {
          actifId = this.id;
        }
      });

      $links.each(function () {
        var vise = this.getAttribute("href") === "#" + actifId;
        $(this).toggleClass("is-active", vise);
      });
    }

    /* ------------------------------------------------------------
       7. DIVERS
       ------------------------------------------------------------ */
    // Année du pied de page toujours à jour.
    $("#annee").text(new Date().getFullYear());

    // Premier calcul au chargement (avant tout défilement).
    onScroll();
    updateReveals();
  });

})(jQuery);
