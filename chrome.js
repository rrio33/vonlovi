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

  function isPaintedMedia(el) {
    if (!el) return false;
    if (el.tagName === "IMG") return Boolean(el.naturalWidth);
    if (el.tagName === "VIDEO") return Boolean(el.videoWidth || el.readyState >= 2);
    return false;
  }

  function mediaCoveringPoint(x, y) {
    const nodes = document.querySelectorAll(
      ".home-hero__slide.is-active img, .home-hero__slide.is-active video, .about-bg__video, .about-bg img, [data-chrome-surface] > img, [data-chrome-surface] img, .product__gallery img"
    );
    for (const el of nodes) {
      if (!isPaintedMedia(el)) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return el;
    }
    return null;
  }

  function elementUnderPoint(x, y) {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.closest?.(".site-chrome") || el.closest?.(".site-cookie")) continue;
      if (el.tagName === "IMG" && el.naturalWidth) return el;
      if (el.tagName === "VIDEO") return el;
    }
    // Home slides (and some films) use pointer-events: none, so the hit stack
    // never includes the photograph — look up the visible still instead.
    return mediaCoveringPoint(x, y);
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

  function sampleVideoAtClientPoint(video, clientX, clientY) {
    if (!video?.videoWidth) return 0.22;

    const rect = video.getBoundingClientRect();
    if (!rect.width || !rect.height) return 0.22;

    const nw = video.videoWidth;
    const nh = video.videoHeight;
    const fit = getComputedStyle(video).objectFit || "cover";
    const scaleCover = Math.max(rect.width / nw, rect.height / nh);
    const scaleContain = Math.min(rect.width / nw, rect.height / nh);
    const scale = fit === "contain" ? scaleContain : scaleCover;
    const dispW = nw * scale;
    const dispH = nh * scale;
    const offsetX = (dispW - rect.width) / 2;
    const offsetY = (dispH - rect.height) / 2;
    const imgX = (clientX - rect.left + offsetX) / scale;
    const imgY = (clientY - rect.top + offsetY) / scale;
    const patch = 48;
    const sx = Math.max(0, Math.min(nw - 1, Math.round(imgX - patch / 2)));
    const sy = Math.max(0, Math.min(nh - 1, Math.round(imgY - patch / 2)));
    const sw = Math.max(1, Math.min(patch, nw - sx));
    const sh = Math.max(1, Math.min(patch, nh - sy));
    const t = Math.round((video.currentTime || 0) * 4);
    const cacheKey = `vid:${video.currentSrc || ""}|${t}|${sx},${sy},${sw},${sh}`;
    if (luminanceCache.has(cacheKey)) return luminanceCache.get(cacheKey);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return 0.22;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
      const data = ctx.getImageData(0, 0, sw, sh).data;
      let total = 0;
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        total += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        count += 1;
      }
      const avg = count ? total / count : 0.22;
      luminanceCache.set(cacheKey, avg);
      return avg;
    } catch {
      return 0.22;
    }
  }

  function sampleSurfaceAtPoint(el, x, y) {
    if (!el) return null;
    if (el.tagName === "VIDEO") return sampleVideoAtClientPoint(el, x, y);
    const region = sampleImageAtClientPoint(el, x, y);
    if (region != null) return region;
    return sampleFullImage(el);
  }

  function sampleUnderElement(el) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const points = [
      { x: r.left + r.width / 2, y: r.top + r.height / 2 },
      { x: r.left + Math.min(10, r.width * 0.2), y: r.top + r.height / 2 },
      { x: r.right - Math.min(10, r.width * 0.2), y: r.top + r.height / 2 },
    ];
    let sum = 0;
    let n = 0;
    for (const { x, y } of points) {
      const under = elementUnderPoint(x, y);
      if (!under) continue;
      const lum = sampleSurfaceAtPoint(under, x, y);
      if (lum == null) continue;
      sum += lum;
      n += 1;
    }
    return n ? sum / n : null;
  }

  function updateMenuInk(mode) {
    const forceDark = mode === "dark" || body.classList.contains("page--about-film");
    document.querySelectorAll(".site-chrome__link, .site-shop__trigger").forEach((el) => {
      if (el.closest(".site-shop__panel")) return;
      const lum = sampleUnderElement(el);
      let onDark;
      if (lum == null) {
        onDark = forceDark;
      } else {
        const was = el.classList.contains("is-on-dark");
        onDark = was ? lum < 0.58 : lum < 0.44;
      }
      el.classList.toggle("is-on-dark", onDark);
    });
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
    updateMenuInk(mode);

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

  const COOKIE_KEY = "vonlovi-passage";
  const GA_ID = "G-C4N1X2YEEZ";

  function t(key, fallback) {
    return window.VonloviI18n?.t?.(key) || fallback;
  }

  function loadAnalytics() {
    if (window.gtag || document.getElementById("vonlovi-ga")) return;
    const src = document.createElement("script");
    src.id = "vonlovi-ga";
    src.async = true;
    src.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(src);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  function markContinueDone() {
    const cta = document.getElementById("cookie-continue");
    if (!cta) return;
    cta.textContent = t("cookies.done", "Le passage est noté.");
    cta.classList.add("is-done");
    cta.setAttribute("disabled", "true");
  }

  function rememberPassage() {
    try {
      localStorage.setItem(COOKIE_KEY, "1");
    } catch {
      /* ignore */
    }
    document.getElementById("vonlovi-cookie")?.remove();
    markContinueDone();
    loadAnalytics();
  }

  function hasPassage() {
    try {
      return localStorage.getItem(COOKIE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function showCookieNote() {
    const quietPage =
      body.classList.contains("page--cookies") || body.classList.contains("page--lost");
    if (hasPassage() || document.getElementById("vonlovi-cookie") || quietPage) {
      if (hasPassage()) loadAnalytics();
      if (hasPassage()) markContinueDone();
      return;
    }
    const bar = document.createElement("div");
    bar.id = "vonlovi-cookie";
    bar.className = "site-cookie";
    bar.innerHTML = `<p>${t("cookie.text", "Ce lieu se souvient du passage.")}</p>
      <button type="button" class="site-cookie__ok">${t("cookie.ok", "Continuer")}</button>
      <a class="site-cookie__more" href="cookies.html">${t("cookie.more", "Passage")}</a>`;
    bar.querySelector(".site-cookie__ok")?.addEventListener("click", rememberPassage);
    document.body.appendChild(bar);
  }

  document.getElementById("cookie-continue")?.addEventListener("click", rememberPassage);
  showCookieNote();
  window.addEventListener("vonlovi:lang", () => {
    const bar = document.getElementById("vonlovi-cookie");
    if (bar) {
      bar.querySelector("p").textContent = t("cookie.text", "Ce lieu se souvient du passage.");
      const ok = bar.querySelector(".site-cookie__ok");
      if (ok) ok.textContent = t("cookie.ok", "Continuer");
      const more = bar.querySelector(".site-cookie__more");
      if (more) more.textContent = t("cookie.more", "Passage");
    }
    const cta = document.getElementById("cookie-continue");
    if (cta?.classList.contains("is-done")) {
      cta.textContent = t("cookies.done", "Le passage est noté.");
    }
  });
})();
