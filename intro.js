(function () {
  "use strict";

  const buttons = document.querySelectorAll("[data-lang]");
  if (!buttons.length || !window.VonloviI18n) return;

  const video = document.querySelector(".intro__video");
  if (video) {
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay, { once: true });
  }

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
