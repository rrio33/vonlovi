(function () {
  "use strict";

  const video = document.querySelector(".intro__video");
  let langsReleased = false;

  const releaseLangs = () => {
    if (langsReleased) return;
    langsReleased = true;
    document.body.classList.add("is-film-live");
  };

  if (video) {
    const mobileSrc =
      video.getAttribute("data-intro-mobile") ||
      "assets/intro/bg-mobile.mp4?v=2";
    const desktopSrc =
      video.getAttribute("data-intro-desktop") ||
      "assets/intro/bg-desktop.mp4?v=2";
    const nextSrc = window.matchMedia("(max-width: 767px)").matches
      ? mobileSrc
      : desktopSrc;

    // Mute + inline BEFORE assigning src (iOS / Low Power Mode autoplay).
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.disableRemotePlayback = true;
    video.loop = true;
    video.preload = "auto";

    if (video.getAttribute("src") !== nextSrc) {
      video.src = nextSrc;
      video.load();
    }

    const tryPlay = () => {
      video.muted = true;
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* Autoplay may be blocked — first gesture unlocks. */
        });
      }
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
    video.addEventListener("canplaythrough", tryPlay, { once: true });

    const wakeFilm = () => {
      document.body.classList.remove("is-leaving");
      tryPlay();
    };
    window.addEventListener("pageshow", wakeFilm);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") wakeFilm();
    });

    // Unlock autoplay on the first user gesture (phones / Low Power Mode).
    const unlock = () => {
      tryPlay();
      window.removeEventListener("touchstart", unlock, true);
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("click", unlock, true);
    };
    window.addEventListener("touchstart", unlock, { capture: true, passive: true });
    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("click", unlock, { capture: true });

    video.addEventListener(
      "playing",
      () => window.setTimeout(releaseLangs, 900),
      { once: true }
    );
    video.addEventListener("error", releaseLangs, { once: true });
  }

  // Never trap the visitor if the film is slow or blocked.
  window.setTimeout(releaseLangs, 1800);

  const buttons = document.querySelectorAll("[data-lang]");
  if (!buttons.length || !window.VonloviI18n) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang") || "fr";
      const next = VonloviI18n.set(lang);
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = `home.html?lang=${encodeURIComponent(next)}`;
      }, 280);
    });
  });
})();
