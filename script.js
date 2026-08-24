(() => {
  const experience = document.getElementById("experience");
  const logoBtn = document.getElementById("exp-logo");
  const plusBtn = document.getElementById("exp-plus");
  const copy1 = document.getElementById("exp-copy-1");
  const copy2 = document.getElementById("exp-copy-2");
  const gallery = document.getElementById("exp-gallery");
  const galleryViewport = document.getElementById("exp-gallery-viewport");
  const productPanel = document.getElementById("exp-product");
  const productPhoto = document.getElementById("exp-product-photo");
  const productCat = document.getElementById("exp-product-cat");
  const productDesc = document.getElementById("exp-product-desc");
  const productPrice = document.getElementById("exp-product-price");
  const body = document.body;
  const logoSvg = logoBtn?.querySelector(".exp-logo__svg");
  const revealRect = logoSvg?.querySelector(".vonlovi-reveal-rect");
  const logoMark = logoSvg?.querySelector(".vonlovi-mark");

  if (!experience || !logoBtn) return;

  const COPY = [
    "Vonlovi creates sculptural jewelry where art meets craftsmanship.",
    "Designed by De Rrusie, each piece balances precious materials, organic lines, and architectural precision, resulting in timeless objects made to be worn, collected, and passed on.",
  ];

  const variantDesc = (category, stone, diamonds) => {
    const s = stone.toLowerCase();
    const dia = diamonds ? " et de diamants" : "";
    if (category === "PENDENTIF") {
      return `Pendentif porté sur un forçat d'une longueur de 50 cm en or jaune 750/1000ème serti de ${s}${dia}.`;
    }
    if (category === "BAGUE") {
      return `Bague en or jaune 750/1000ème serti de ${s}${dia}. Les deux V de VONLOVI soutiennent la pierre dure.`;
    }
    if (category === "BOUTON") {
      return `Bouton précieux en or jaune 750/1000ème serti de ${s}${dia}. Tour à tour pendentif ou motif de bracelet.`;
    }
    return `Boucle d'oreille en or jaune 750/1000ème serti de ${s}${dia}, vendue à l'unité.`;
  };

  const buildVariants = (files, category, price, diamonds = false) =>
    files.map(({ file, stone }) => ({
      photo: `assets/products/${file}`,
      stone,
      description: variantDesc(category, stone, diamonds),
      price,
    }));

  const PIECES = [
    {
      category: "PENDENTIF",
      sketch: "assets/gallery/sketch-necklace.png",
      variants: buildVariants(
        [
          { file: "pendentif-onyx.jpg", stone: "Onyx" },
          { file: "pendentif-nacre.jpg", stone: "Nacre" },
          { file: "pendentif-cornaline.jpg", stone: "Cornaline" },
          { file: "pendentif-malachite.jpg", stone: "Malachite" },
          { file: "pendentif-lapis-lazuli.jpg", stone: "Lapis lazuli" },
          { file: "pendentif-oeil-de-tigre.jpg", stone: "Œil de tigre" },
          { file: "pendentif-nacre-doree.jpg", stone: "Nacre dorée" },
        ],
        "PENDENTIF",
        "1 700 €"
      ),
    },
    {
      category: "PENDENTIF",
      sketch: "assets/gallery/sketch-necklace-diamonds.png",
      variants: buildVariants(
        [
          { file: "pendentif-onyx-et-diamants.jpg", stone: "Onyx" },
          { file: "pendentif-nacre-et-diamants.jpg", stone: "Nacre" },
          { file: "pendentif-cornaline-et-diamants.jpg", stone: "Cornaline" },
          { file: "pendentif-malachite-et-diamants.jpg", stone: "Malachite" },
          { file: "pendentif-lapis-lazuli-et-diamants.jpg", stone: "Lapis lazuli" },
          { file: "pendentif-oeil-de-tigre-et-diamants.jpg", stone: "Œil de tigre" },
          { file: "pendentif-nacre-doree-et-diamants.jpg", stone: "Nacre dorée" },
        ],
        "PENDENTIF",
        "2 800 €",
        true
      ),
    },
    {
      category: "BAGUE",
      sketch: "assets/gallery/sketch-ring.png",
      variants: buildVariants(
        [
          { file: "bague-onyx.jpg", stone: "Onyx" },
          { file: "bague-nacre.jpg", stone: "Nacre" },
          { file: "bague-cornaline.jpg", stone: "Cornaline" },
          { file: "bague-malachite.jpg", stone: "Malachite" },
          { file: "bague-lapis-lazuli.jpg", stone: "Lapis lazuli" },
          { file: "bague-oeil-de-tigre.jpg", stone: "Œil de tigre" },
          { file: "bague-nacre-doree.jpg", stone: "Nacre dorée" },
        ],
        "BAGUE",
        "2 900 €"
      ),
    },
    {
      category: "BAGUE",
      sketch: "assets/gallery/sketch-bague-small.png",
      variants: buildVariants(
        [
          { file: "bague-onyx-petit-modele.jpg", stone: "Onyx" },
          { file: "bague-nacre-petit-modele.jpg", stone: "Nacre" },
          { file: "bague-cornaline-petit-modele.jpg", stone: "Cornaline" },
          { file: "bague-malachite-petit-modele.jpg", stone: "Malachite" },
          { file: "bague-lapis-lazuli-petit-modele.jpg", stone: "Lapis lazuli" },
          { file: "bague-nacre-doree-petit-modele.jpg", stone: "Nacre dorée" },
        ],
        "BAGUE",
        "1 900 €"
      ),
    },
    {
      category: "BOUTON",
      sketch: "assets/gallery/sketch-button.png",
      variants: buildVariants(
        [
          { file: "bouton-onyx.jpg", stone: "Onyx" },
          { file: "bouton-nacre.jpg", stone: "Nacre" },
          { file: "bouton-cornaline.jpg", stone: "Cornaline" },
          { file: "bouton-malachite.jpg", stone: "Malachite" },
          { file: "bouton-lapis-lazuli.jpg", stone: "Lapis lazuli" },
          { file: "bouton-oeil-de-tigre.jpg", stone: "Œil de tigre" },
          { file: "bouton-nacre-doree.jpg", stone: "Nacre dorée" },
        ],
        "BOUTON",
        "1 100 €"
      ),
    },
    {
      category: "BOUTON",
      sketch: "assets/gallery/sketch-button-diamonds.png",
      variants: buildVariants(
        [
          { file: "bouton-onyx-et-diamants.jpg", stone: "Onyx" },
          { file: "bouton-nacre-et-diamants.jpg", stone: "Nacre" },
          { file: "bouton-cornaline-et-diamants.jpg", stone: "Cornaline" },
          { file: "bouton-malachite-et-diamants.jpg", stone: "Malachite" },
          { file: "bouton-lapis-lazuli-et-diamants.jpg", stone: "Lapis lazuli" },
          { file: "bouton-oeil-de-tigre-et-diamants.jpg", stone: "Œil de tigre" },
          { file: "bouton-nacre-doree-et-diamants.jpg", stone: "Nacre dorée" },
        ],
        "BOUTON",
        "2 100 €",
        true
      ),
    },
    {
      category: "BOUCLE D'OREILLE",
      sketch: "assets/gallery/sketch-earring.png",
      variants: buildVariants(
        [
          { file: "boucle-doreille-onyx.jpg", stone: "Onyx" },
          { file: "boucle-doreille-nacre.jpg", stone: "Nacre" },
          { file: "boucle-doreille-cornaline.jpg", stone: "Cornaline" },
          { file: "boucle-doreille-malachite.jpg", stone: "Malachite" },
          { file: "boucle-doreille-lapis-lazuli.jpg", stone: "Lapis lazuli" },
          { file: "boucle-doreille-oeil-de-tigre.jpg", stone: "Œil de tigre" },
          { file: "boucle-doreille-nacre-doree.jpg", stone: "Nacre dorée" },
        ],
        "BOUCLE D'OREILLE",
        "800 €"
      ),
    },
  ];

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COPY_FADE_MS = prefersReduced ? 0 : 520;

  let typeGen = 0;
  let copyOpen = false;
  let copyBusy = false;
  let copyTypedOnce = false;
  let traceDone = false;
  let entered = false;
  let sketchIndex = 0;
  let photoIndex = 0;
  let detailOpen = false;

  /* ---------- SVG intro trace ------------------------------------ */
  const tracePaths = logoSvg?.querySelectorAll(".trace-path") ?? [];
  tracePaths.forEach((el) => {
    let len;
    try {
      len = el.getTotalLength();
    } catch (_) {
      len = 400;
    }
    el.style.strokeDasharray = String(len);
    el.style.strokeDashoffset = String(len);
  });

  const TRACE_MS = 2600;
  const REVEAL_CENTER = 512;
  const REVEAL_WIDTH = 1024;

  const setReveal = (progress) => {
    if (!revealRect) return;
    const w = REVEAL_WIDTH * progress;
    revealRect.setAttribute("x", String(REVEAL_CENTER - w / 2));
    revealRect.setAttribute("width", String(w));
  };

  const revealMark = (duration = TRACE_MS) => {
    if (prefersReduced) {
      setReveal(1);
      if (logoMark) logoMark.setAttribute("opacity", "1");
      experience.classList.add("is-traced");
      return Promise.resolve();
    }

    experience.classList.add("is-traced");
    setReveal(0);
    if (logoMark) logoMark.setAttribute("opacity", "0");
    const start = performance.now();

    return new Promise((resolve) => {
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 2.2);
        setReveal(eased);
        if (logoMark) logoMark.setAttribute("opacity", String(Math.min(1, eased * 1.4)));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          if (logoMark) logoMark.setAttribute("opacity", "1");
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });
  };

  /* ---------- Typewriter ----------------------------------------- */
  const typeParagraph = (el, text, gen) =>
    new Promise((resolve) => {
      el.textContent = "";
      let i = 0;
      const caret = document.createElement("span");
      caret.className = "exp-copy__caret";
      caret.setAttribute("aria-hidden", "true");
      el.appendChild(caret);

      const pauseAt = new Set([".", ",", ";", ":", "—"]);

      const step = () => {
        if (gen !== typeGen) {
          caret.remove();
          resolve(false);
          return;
        }

        if (i >= text.length) {
          caret.remove();
          resolve(true);
          return;
        }

        const ch = text[i];
        el.insertBefore(document.createTextNode(ch), caret);
        i++;

        let delay = 5 + Math.random() * 10;
        if (pauseAt.has(ch)) delay += 30 + Math.random() * 50;
        if (ch === " ") delay += 3 + Math.random() * 10;
        if (Math.random() < 0.04) delay += 20 + Math.random() * 40;

        setTimeout(step, prefersReduced ? 0 : delay);
      };

      if (prefersReduced) {
        el.textContent = text;
        resolve(true);
      } else {
        setTimeout(step, 40 + Math.random() * 60);
      }
    });

  /* ---------- Gallery -------------------------------------------- */
  const buildGallery = () => {
    if (!galleryViewport) return;
    galleryViewport.innerHTML = "";
    PIECES.forEach((piece, i) => {
      const slide = document.createElement("button");
      slide.type = "button";
      slide.className = "exp-gallery__slide";
      slide.dataset.index = String(i);
      if (i === sketchIndex) slide.classList.add("is-active");

      const img = document.createElement("img");
      img.src = piece.sketch;
      img.alt = piece.category;
      img.decoding = "async";
      slide.appendChild(img);

      slide.addEventListener("click", () => openDetail(i));
      galleryViewport.appendChild(slide);
    });
  };

  const setSketch = (index) => {
    sketchIndex = (index + PIECES.length) % PIECES.length;
    galleryViewport?.querySelectorAll(".exp-gallery__slide").forEach((slide, i) => {
      slide.classList.toggle("is-active", i === sketchIndex);
    });
    if (detailOpen) {
      photoIndex = 0;
      renderProduct(sketchIndex, 0);
    }
  };

  const showGallery = () => {
    buildGallery();
    gallery.hidden = false;
    requestAnimationFrame(() => {
      experience.classList.add("is-elevated");
    });
  };

  const hideGallery = () => {
    experience.classList.remove("is-elevated");
    closeDetail();
    setTimeout(() => {
      gallery.hidden = true;
    }, prefersReduced ? 0 : 700);
  };

  /* ---------- Product detail ------------------------------------- */
  const renderProduct = (pieceIdx, variantIdx) => {
    const piece = PIECES[pieceIdx];
    if (!piece?.variants?.length) return;

    const len = piece.variants.length;
    photoIndex = ((variantIdx % len) + len) % len;
    const variant = piece.variants[photoIndex];

    productPhoto.classList.remove("is-visible");
    productPanel.querySelector(".exp-product__info")?.classList.remove("is-visible");

    requestAnimationFrame(() => {
      productPhoto.src = variant.photo;
      productPhoto.alt = `${piece.category} ${variant.stone}`;
      productCat.textContent = piece.category;
      productDesc.textContent = variant.description;
      productPrice.textContent = variant.price;

      requestAnimationFrame(() => {
        productPhoto.classList.add("is-visible");
        productPanel.querySelector(".exp-product__info")?.classList.add("is-visible");
      });
    });
  };

  const openDetail = (index) => {
    sketchIndex = index;
    photoIndex = 0;
    detailOpen = true;
    setSketch(sketchIndex);
    productPanel.hidden = false;
    productPanel.setAttribute("aria-hidden", "false");
    experience.classList.add("is-detail-open");
    renderProduct(sketchIndex, photoIndex);
  };

  const closeDetail = () => {
    if (!detailOpen) return;
    detailOpen = false;
    experience.classList.remove("is-detail-open");
    productPhoto.classList.remove("is-visible");
    productPanel.querySelector(".exp-product__info")?.classList.remove("is-visible");
    productPanel.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      productPanel.hidden = true;
    }, prefersReduced ? 0 : 500);
  };

  /* ---------- Plus interactions ---------------------------------- */
  const tapPlus = () => {
    plusBtn.classList.remove("is-tapping");
    void plusBtn.offsetWidth;
    plusBtn.classList.add("is-tapping");
    plusBtn.addEventListener(
      "animationend",
      () => plusBtn.classList.remove("is-tapping"),
      { once: true }
    );
  };

  const openCopy = async () => {
    copyBusy = true;
    copyOpen = true;

    experience.classList.remove("is-copy-closing");
    experience.classList.add("is-copy-open");
    plusBtn.classList.add("is-active");
    plusBtn.classList.remove("is-live");
    plusBtn.setAttribute("aria-label", "Hide story");
    plusBtn.setAttribute("aria-expanded", "true");

    if (copyTypedOnce) {
      copy1.textContent = COPY[0];
      copy2.textContent = COPY[1];
      showGallery();
      copyBusy = false;
      return;
    }

    const gen = ++typeGen;

    const ok1 = await typeParagraph(copy1, COPY[0], gen);
    if (!ok1 || gen !== typeGen) {
      copyBusy = false;
      return;
    }

    await new Promise((r) => setTimeout(r, prefersReduced ? 0 : 100 + Math.random() * 120));
    if (gen !== typeGen) {
      copyBusy = false;
      return;
    }

    const ok2 = await typeParagraph(copy2, COPY[1], gen);
    if (!ok2 || gen !== typeGen) {
      copyBusy = false;
      return;
    }

    copyTypedOnce = true;
    showGallery();
    copyBusy = false;
  };

  const closeCopy = () => {
    typeGen++;
    copyOpen = false;
    copyBusy = true;

    experience.classList.remove("is-copy-open");
    experience.classList.add("is-copy-closing");
    plusBtn.classList.remove("is-active");
    plusBtn.setAttribute("aria-label", "Reveal story");
    plusBtn.setAttribute("aria-expanded", "false");

    hideGallery();

    setTimeout(() => {
      if (!copyTypedOnce) {
        copy1.textContent = "";
        copy2.textContent = "";
      }
      experience.classList.remove("is-copy-closing");
      plusBtn.classList.add("is-live");
      copyBusy = false;
    }, COPY_FADE_MS);
  };

  const toggleCopy = () => {
    if (!entered) return;
    tapPlus();
    if (copyOpen) {
      closeCopy();
      return;
    }
    if (!copyBusy) openCopy();
  };

  /* ---------- Intro ---------------------------------------------- */
  const enableLogo = () => {
    traceDone = true;
    logoBtn.disabled = false;
    logoBtn.classList.add("is-ready");
  };

  revealMark().then(() => {
    setTimeout(enableLogo, prefersReduced ? 0 : 400);
  });

  const enterSite = () => {
    if (!traceDone || entered) return;
    entered = true;
    experience.classList.add("is-entered");
    body.classList.remove("is-intro");

    setTimeout(() => {
      plusBtn.hidden = false;
      plusBtn.classList.add("is-live");
    }, prefersReduced ? 0 : 1100);
  };

  logoBtn.addEventListener("click", enterSite);
  logoBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterSite();
    }
  });

  plusBtn.addEventListener("click", toggleCopy);

  gallery?.querySelector(".exp-gallery__arrow--up")?.addEventListener("click", () => {
    setSketch(sketchIndex - 1);
  });

  gallery?.querySelector(".exp-gallery__arrow--down")?.addEventListener("click", () => {
    setSketch(sketchIndex + 1);
  });

  productPanel?.querySelector(".exp-product__arrow--left")?.addEventListener("click", () => {
    renderProduct(sketchIndex, photoIndex - 1);
  });

  productPanel?.querySelector(".exp-product__arrow--right")?.addEventListener("click", () => {
    renderProduct(sketchIndex, photoIndex + 1);
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
