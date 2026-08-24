(function () {
  "use strict";

  const root = document.getElementById("archives-viewer");
  const track = document.getElementById("archives-track");
  const countEl = document.getElementById("archives-count");
  const prevBtn = document.getElementById("archives-prev");
  const nextBtn = document.getElementById("archives-next");
  if (!root || !track) return;

  let images = [];
  let index = 0;
  let dragX = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;
  let lockedAxis = null;

  function clampIndex(i) {
    if (!images.length) return 0;
    return ((i % images.length) + images.length) % images.length;
  }

  function updateCount() {
    if (!countEl || !images.length) return;
    countEl.textContent = `${index + 1} / ${images.length}`;
  }

  function goTo(i, instant) {
    if (!images.length) return;
    index = clampIndex(i);
    if (instant) root.classList.add("is-dragging");
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    if (instant) {
      // force reflow then restore transition
      void track.offsetWidth;
      root.classList.remove("is-dragging");
    }
    updateCount();
    window.dispatchEvent(new Event("scroll"));
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function build() {
    track.innerHTML = "";
    images.forEach((image, i) => {
      const slide = document.createElement("figure");
      slide.className = "archives-viewer__slide";
      slide.style.backgroundImage = `url("${image.src}")`;

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt || "Vonlovi — archives";
      img.decoding = i === 0 ? "sync" : "async";
      if (i === 0) img.fetchPriority = "high";
      else img.loading = "lazy";
      if (image.width) img.width = image.width;
      if (image.height) img.height = image.height;

      slide.appendChild(img);
      track.appendChild(slide);
    });
    goTo(0, true);
  }

  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    prev();
  });

  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    next();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Wheel / trackpad
  let wheelLock = false;
  root.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) < 8 && Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 0) next();
      else prev();
      window.setTimeout(() => {
        wheelLock = false;
      }, 520);
    },
    { passive: false }
  );

  function onPointerDown(e) {
    if (e.target.closest(".site-chrome")) return;
    if (e.target.closest(".archives-viewer__hit")) return;
    dragging = true;
    lockedAxis = null;
    startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragX = 0;
    root.classList.add("is-dragging");
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dx = x - startX;
    const dy = y - startY;

    if (!lockedAxis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (lockedAxis === "y") {
        dragging = false;
        root.classList.remove("is-dragging");
        track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
        return;
      }
    }

    if (lockedAxis !== "x") return;
    if (e.cancelable) e.preventDefault();
    dragX = dx;
    const width = root.clientWidth || 1;
    const pct = (dragX / width) * 100;
    track.style.transform = `translate3d(${-index * 100 + pct}%, 0, 0)`;
  }

  function onPointerUp() {
    if (!dragging && dragX === 0) {
      root.classList.remove("is-dragging");
      return;
    }
    dragging = false;
    root.classList.remove("is-dragging");
    const width = root.clientWidth || 1;
    const threshold = width * 0.14;
    if (dragX <= -threshold) next();
    else if (dragX >= threshold) prev();
    else goTo(index);
    dragX = 0;
    lockedAxis = null;
  }

  root.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // Click left/right when not a drag
  let clickStartX = 0;
  root.addEventListener("pointerdown", (e) => {
    clickStartX = e.clientX;
  });
  root.addEventListener("click", (e) => {
    if (e.target.closest(".site-chrome")) return;
    if (e.target.closest(".archives-viewer__hit")) return;
    if (Math.abs(e.clientX - clickStartX) > 12) return;
    const rect = root.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) prev();
    else next();
  });

  function probeImage(entry) {
    return new Promise((resolve) => {
      if (!entry?.src) {
        resolve(null);
        return;
      }
      const probe = new Image();
      probe.onload = () => {
        resolve({
          ...entry,
          width: entry.width || probe.naturalWidth,
          height: entry.height || probe.naturalHeight,
        });
      };
      probe.onerror = () => resolve(null);
      probe.src = entry.src;
    });
  }

  async function init() {
    let entries = [];
    try {
      const res = await fetch("data/archives.json", { cache: "no-store" });
      if (!res.ok) throw new Error("missing");
      const data = await res.json();
      entries = data.images || [];
    } catch {
      root.innerHTML = '<p class="archives-viewer__status">Archives unavailable</p>';
      return;
    }

    // Drop missing / iCloud-stub files so the viewer never shows broken slides
    const probed = await Promise.all(entries.map(probeImage));
    images = probed.filter(Boolean);

    if (!images.length) {
      root.innerHTML = '<p class="archives-viewer__status">Archives unavailable</p>';
      return;
    }

    build();
    root.setAttribute("aria-busy", "false");
  }

  init();
})();
