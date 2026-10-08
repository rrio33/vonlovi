(function () {
  "use strict";

  const buttons = document.querySelectorAll("[data-lang]");
  if (!buttons.length || !window.VonloviI18n) return;

  const video = document.querySelector(".intro__video");
  let langsReleased = false;

  const releaseLangs = () => {
    if (langsReleased) return;
    langsReleased = true;
    document.body.classList.add("is-film-live");
  };

  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.loop = true;
    video.preload = "auto";

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const startAtBeginning = () => {
      try {
        if (!Number.isNaN(video.currentTime) && video.currentTime > 0.08) {
          video.currentTime = 0;
        }
      } catch (_) {
        /* ignore until metadata is ready */
      }
      tryPlay();
    };

    startAtBeginning();
    video.addEventListener("loadedmetadata", startAtBeginning, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });
    window.addEventListener("pageshow", tryPlay);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") tryPlay();
    });

    // Hold FR/EN/JA/KO until the chain is already moving on the dark field.
    video.addEventListener(
      "playing",
      () => window.setTimeout(releaseLangs, 1100),
      { once: true }
    );
    video.addEventListener("error", releaseLangs, { once: true });
  }

  // Never trap the visitor on a silent intro if the film 404s or autoplay is blocked.
  window.setTimeout(releaseLangs, 2400);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang") || "fr";
      const next = VonloviI18n.set(lang);
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        // Pass lang in the URL so Japanese (and others) survive even if storage is blocked
        window.location.href = `home.html?lang=${encodeURIComponent(next)}`;
      }, 280);
    });
  });
})();
