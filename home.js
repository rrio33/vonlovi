(function () {
  "use strict";

  const root = document.getElementById("home-hero");
  const track = document.getElementById("home-hero-track");
  const prevBtn = document.getElementById("home-hero-prev");
  const nextBtn = document.getElementById("home-hero-next");
  if (!root || !track) return;

  let images = [];
  let index = 0;
  let slides = [];

  function isVideo(src) {
    return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src || "");
  }

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  /** Packshot / studio product sets — keep in Regards, skip home hero. */
  const HERO_EXCLUDE = new Set(["cyrille-robin"]);

  /** Heavier campaign stills only — skip the 30–70k files that smear full-bleed. */
  const HERO_PREFERRED = {
    "amanda-elise-k": [
      "assets/contributors/amanda-elise-k/16.jpg",
      "assets/contributors/amanda-elise-k/11.jpg",
      "assets/contributors/amanda-elise-k/01.jpg",
    ],
    "celia-spenard-ko": [
      "assets/contributors/celia-spenard-ko/08.jpg",
      "assets/contributors/celia-spenard-ko/10.jpg",
      "assets/contributors/celia-spenard-ko/09.jpg",
    ],
    "goldie-williams": [
      "assets/contributors/goldie-williams/14.jpg",
      "assets/contributors/goldie-williams/17.jpg",
      "assets/contributors/goldie-williams/13.jpg",
    ],
    "cristian-hunter": [
      "assets/contributors/cristian-hunter/02.jpg",
      "assets/contributors/cristian-hunter/03.jpg",
      "assets/contributors/cristian-hunter/01.jpg",
    ],
    "xavier-rosny": [
      "assets/contributors/xavier-rosny/02.jpg",
      "assets/contributors/xavier-rosny/01.jpg",
    ],
    "ls-archives": [
      "assets/contributors/ls-archives/05.jpg",
      "assets/contributors/ls-archives/01.jpg",
    ],
  };

  const HERO_SKIP = new Set([
    "assets/contributors/amanda-elise-k/02.jpg",
    "assets/contributors/goldie-williams/09.jpg",
    "assets/contributors/goldie-williams/07.jpg",
    "assets/contributors/goldie-williams/08.jpg",
    "assets/contributors/ls-archives/02.jpg",
    "assets/contributors/ls-archives/04.jpg",
  ]);

  /** Best 3 stills per collaborator (preferred files first, skip video). */
  function picksFromCollaborators(list) {
    const picked = [];
    (list || []).forEach((person) => {
      if (!person?.id || HERO_EXCLUDE.has(person.id)) return;
      const preferred = HERO_PREFERRED[person.id] || [];
      const pool = [];
      preferred.forEach((src) => {
        if (src && !isVideo(src) && !HERO_SKIP.has(src) && !pool.includes(src)) {
          pool.push(src);
        }
      });
      const cover = person.cover;
      if (cover && !isVideo(cover) && !HERO_SKIP.has(cover) && !pool.includes(cover)) {
        pool.push(cover);
      }
      (person.images || []).forEach((src) => {
        if (!src || isVideo(src) || HERO_SKIP.has(src) || pool.includes(src)) return;
        pool.push(src);
      });
      pool.slice(0, 3).forEach((src) => {
        picked.push({
          src,
          alt: person.name ? `Vonlovi — ${person.name}` : "VONLOVI",
          collaborator: person.id || "",
        });
      });
    });
    return picked;
  }

  function show(i) {
    if (!slides.length) return;
    index = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, n) => {
      slide.classList.toggle("is-active", n === index);
    });
    // Refresh chrome contrast against the new slide
    window.dispatchEvent(new Event("scroll"));
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function build() {
    track.innerHTML = "";
    slides = images.map((image, i) => {
      const slide = document.createElement("figure");
      slide.className = "home-hero__slide" + (i === 0 ? " is-active" : "");

      slide.style.backgroundImage = `url("${image.src}")`;

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt || "";
      img.decoding = i === 0 ? "sync" : "async";
      if (i === 0) img.fetchPriority = "high";
      else img.loading = "lazy";
      slide.appendChild(img);
      track.appendChild(slide);
      return slide;
    });
    index = 0;
  }

  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    prev();
  });

  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    next();
  });

  // Also allow clicking left/right halves of the hero (in case hits are blocked)
  root.addEventListener("click", (e) => {
    if (e.target.closest(".site-chrome")) return;
    if (e.target.closest(".home-hero__hit")) return;
    const rect = root.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prev();
    else next();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  async function init() {
    try {
      const res = await fetch("data/contributors.json", { cache: "no-store" });
      if (!res.ok) throw new Error("missing");
      const data = await res.json();
      images = shuffle(picksFromCollaborators(data.contributors || []));
    } catch {
      images = [];
    }

    if (!images.length) {
      images = [{ src: "assets/contributors/stanislas-motz/04.jpg", alt: "VONLOVI" }];
    }

    build();
    show(0);
  }

  init();

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
