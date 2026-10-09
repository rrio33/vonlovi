(function () {
  "use strict";

  const video = document.querySelector(".about-bg__video");
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.loop = true;

  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked — poster still shows; retry on first tap
        const unlock = () => {
          video.play().catch(() => {});
          document.removeEventListener("pointerdown", unlock);
        };
        document.addEventListener("pointerdown", unlock, { once: true });
      });
    }
  };

  tryPlay();
  video.addEventListener("loadeddata", tryPlay, { once: true });
  video.addEventListener("canplay", tryPlay, { once: true });
  window.addEventListener("pageshow", tryPlay);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });

  // Refresh chrome contrast once the film is ready
  video.addEventListener(
    "playing",
    () => window.dispatchEvent(new Event("scroll")),
    { once: true }
  );
})();

