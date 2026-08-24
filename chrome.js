(() => {
  const body = document.body;
  const shop = document.getElementById("site-shop");
  const trigger = shop?.querySelector(".site-shop__trigger");
  const logo = document.querySelector(".site-chrome__logo");
  const logoWord = logo?.querySelector(".site-chrome__logo-word");
  /** Cache: key → luminance under logo (region-aware). */
  const luminanceCache = new Map();
  /** Sticky accent color per under-logo surface (avoids flicker on scroll). */
  const accentCache = new Map();
  const ACCENTS = ["burgundy", "red", "purple"];
  let ticking = false;

  /** Inject accent wordmarks once so every page gets colored logo variants. */
  function ensureAccentWordmarks() {
    if (!logoWord || logoWord.dataset.accentsReady) return;
    ACCENTS.forEach((name) => {
      if (logoWord.querySelector(`.site-chrome__logo-img--${name}`)) return;
      const img = document.createElement("img");
      img.className = `site-chrome__logo-img site-chrome__logo-img--${name}`;
      img.src = `assets/logo-vonlovi-${name}.png?v=1`;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.decoding = "async";
      logoWord.appendChild(img);
    });
    logoWord.dataset.accentsReady = "1";
  }

  trigger?.addEventListener("click", (e) => {
    e.preventDefault();
    const open = shop.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!shop?.contains(e.target)) {
      shop?.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
    }
  });

  function logoSamplePoints() {
    const el = logo;
    if (!el) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      return [{ x: cx, y: cy }];
    }
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) {
      return [{ x: window.innerWidth / 2, y: window.innerHeight / 2 }];
    }
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = r.width * 0.28;
    const dy = r.height * 0.28;
    return [
      { x: cx, y: cy },
      { x: cx - dx, y: cy },
      { x: cx + dx, y: cy },
      { x: cx, y: cy - dy },
      { x: cx, y: cy + dy },
    ];
  }

  function elementUnderPoint(x, y) {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.closest?.(".site-chrome")) continue;
      if (el.tagName === "IMG" && el.naturalWidth) return el;
      if (el.tagName === "VIDEO") return el;
      const img = el.querySelector?.("img");
      if (img?.naturalWidth) return img;
      const video = el.querySelector?.("video");
      if (video) return video;
    }
    return null;
  }

  /**
   * Luminance of the image region actually under a client point
   * (object-fit: cover / contain aware — fixes mobile crop mismatch).
   */
  function sampleImageAtClientPoint(img, clientX, clientY) {
    if (!img?.naturalWidth) return null;

    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const fit = getComputedStyle(img).objectFit || "fill";
    const scaleCover = Math.max(rect.width / nw, rect.height / nh);
    const scaleContain = Math.min(rect.width / nw, rect.height / nh);
    const scale = fit === "contain" ? scaleContain : scaleCover;
    const dispW = nw * scale;
    const dispH = nh * scale;
    const offsetX = (dispW - rect.width) / 2;
    const offsetY = (dispH - rect.height) / 2;

    const relX = clientX - rect.left + offsetX;
    const relY = clientY - rect.top + offsetY;
    const imgX = relX / scale;
    const imgY = relY / scale;

    const patch = 48;
    const sx = Math.max(0, Math.min(nw - 1, Math.round(imgX - patch / 2)));
    const sy = Math.max(0, Math.min(nh - 1, Math.round(imgY - patch / 2)));
    const sw = Math.max(1, Math.min(patch, nw - sx));
    const sh = Math.max(1, Math.min(patch, nh - sy));

    const cacheKey = `${img.currentSrc || img.src}|${sx},${sy},${sw},${sh}|${Math.round(rect.width)}x${Math.round(rect.height)}`;
    if (luminanceCache.has(cacheKey)) return luminanceCache.get(cacheKey);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return null;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      const data = ctx.getImageData(0, 0, sw, sh).data;
      let total = 0;
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a < 16) continue;
        total += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        count += 1;
      }
      const avg = count ? total / count : 0.75;
      luminanceCache.set(cacheKey, avg);
      return avg;
    } catch {
      return null;
    }
  }

  function sampleFullImage(img) {
    if (!img?.naturalWidth) return 0.75;
    const key = `full:${img.currentSrc || img.src}`;
    if (luminanceCache.has(key)) return luminanceCache.get(key);
    try {
      const canvas = document.createElement("canvas");
      const size = 32;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return 0.75;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let total = 0;
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        total += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        count += 1;
      }
      const avg = count ? total / count : 0.75;
      luminanceCache.set(key, avg);
      return avg;
    } catch {
      return 0.75;
    }
  }

  function sampleSurfaceAtPoint(el, x, y) {
    if (!el) return null;
    if (el.tagName === "VIDEO") return 0.22;
    const region = sampleImageAtClientPoint(el, x, y);
    if (region != null) return region;
    return sampleFullImage(el);
  }

  /** Average luminance under the logo (multi-point for busy mobile crops). */
  function sampleUnderLogo() {
    const points = logoSamplePoints();
    let sum = 0;
    let n = 0;
    let surfaceKey = null;
    let lastEl = null;

    for (const { x, y } of points) {
      const el = elementUnderPoint(x, y);
      if (!el) continue;
      lastEl = el;
      const lum = sampleSurfaceAtPoint(el, x, y);
      if (lum == null) continue;
      sum += lum;
      n += 1;
      if (!surfaceKey) {
        surfaceKey = el.currentSrc || el.src || el.tagName;
      }
    }

    if (!n) {
      return { lum: null, key: null, el: null };
    }

    return {
      lum: sum / n,
      key: surfaceKey,
      el: lastEl,
    };
  }

  function pickAccentColor() {
    return ACCENTS[Math.floor(Math.random() * ACCENTS.length)];
  }

  /**
   * Accent mark/wordmark when B/W would struggle (mid / soft-pale grounds),
   * plus a sticky random accent on other surfaces.
   */
  function pickMarkAccent(key, lum) {
    if (accentCache.has(key)) return accentCache.get(key);

    let use = false;
    if (lum >= 0.32 && lum <= 0.72) {
      use = true;
    } else if (lum > 0.72 && lum < 0.93) {
      use = true;
    } else if (lum < 0.32) {
      use = Math.random() < 0.28;
    } else {
      use = Math.random() < 0.18;
    }

    const accent = use ? pickAccentColor() : null;
    accentCache.set(key, accent);
    return accent;
  }

  function applyMarkAccent(accent) {
    if (accent) body.setAttribute("data-mark-accent", accent);
    else body.removeAttribute("data-mark-accent");
    body.classList.toggle("is-chrome-burgundy", accent === "burgundy");
  }

  function updateChromeContrast() {
    ensureAccentWordmarks();
    const mode = body.getAttribute("data-chrome") || "auto";
    const { lum, key } = sampleUnderLogo();

    if (mode === "light") {
      body.classList.remove("is-chrome-dark");
      const L = lum != null ? lum : 0.92;
      const k = key || `${mode}:page`;
      applyMarkAccent(pickMarkAccent(k, L));
      return;
    }

    if (mode === "dark") {
      body.classList.add("is-chrome-dark");
      const L = lum != null ? lum : 0.2;
      const k = key || `${mode}:page`;
      applyMarkAccent(pickMarkAccent(k, L));
      return;
    }

    if (lum == null) {
      if (body.classList.contains("page--about-film")) {
        body.classList.add("is-chrome-dark");
        applyMarkAccent(pickMarkAccent("about-film", 0.22));
        return;
      }
      body.classList.remove("is-chrome-dark");
      applyMarkAccent(pickMarkAccent("page", 0.92));
      return;
    }

    applyMarkAccent(pickMarkAccent(key || "surface", lum));
    body.classList.toggle("is-chrome-dark", lum < 0.5);
  }

  function updateLogoMode() {
    const scrolled = window.scrollY > 48;
    body.classList.toggle("is-scrolled", scrolled);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateLogoMode();
      updateChromeContrast();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("orientationchange", onScroll, { passive: true });
  window.visualViewport?.addEventListener("resize", onScroll, { passive: true });

  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", onScroll, { once: true });
  });

  ensureAccentWordmarks();
  updateLogoMode();
  updateChromeContrast();
  // Second pass after layout / late-decoded hero images (common on mobile)
  requestAnimationFrame(() => {
    updateChromeContrast();
    setTimeout(updateChromeContrast, 120);
    setTimeout(updateChromeContrast, 480);
  });
})();
