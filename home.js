(function () {
  "use strict";

  // Single campaign still , no carousel (chrome contrast was unreliable across slides).
  const HERO_SRC = "assets/hero/01-hero.jpg";
  const HERO_ALT = "VONLOVI";

  const root = document.getElementById("home-hero");
  const track = document.getElementById("home-hero-track");
  if (!root || !track) return;

  function paint() {
    track.innerHTML = "";
    const slide = document.createElement("figure");
    slide.className = "home-hero__slide is-active";
    slide.style.backgroundImage = `url("${HERO_SRC}")`;

    const img = document.createElement("img");
    img.src = HERO_SRC;
    img.alt = HERO_ALT;
    img.decoding = "sync";
    img.fetchPriority = "high";
    slide.appendChild(img);
    track.appendChild(slide);

    window.dispatchEvent(new Event("scroll"));
  }

  paint();

  // Black campaign still: white chrome on the hero, dark chrome once past it.
  function syncHeroChrome() {
    const heroH = root.getBoundingClientRect().height || window.innerHeight;
    const overHero = window.scrollY < heroH * 0.72;
    const mode = overHero ? "dark" : "light";
    document.body.setAttribute("data-chrome", mode);
    document.body.classList.toggle("is-chrome-dark", overHero);
    window.dispatchEvent(new Event("scroll"));
  }

  syncHeroChrome();
  window.addEventListener("scroll", syncHeroChrome, { passive: true });
  window.addEventListener("resize", syncHeroChrome);

  const newsForm = document.getElementById("newsletter-form");
  const newsInput = document.getElementById("newsletter-email");
  const newsError = document.getElementById("newsletter-error");
  newsForm?.addEventListener("submit", (event) => {
    if (!newsInput?.checkValidity()) {
      event.preventDefault();
      if (newsError) newsError.hidden = false;
      newsInput?.focus();
      return;
    }
    if (newsError) newsError.hidden = true;
  });
})();
