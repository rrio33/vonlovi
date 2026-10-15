(() => {
  const KEY = "vonlovi-cookie-consent";
  const t = (key, fallback) =>
    (window.VonloviI18n?.t?.(key) && window.VonloviI18n.t(key) !== key
      ? window.VonloviI18n.t(key)
      : fallback);

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function write(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(
      new CustomEvent("vonlovi:cookie-consent", { detail: value })
    );
  }

  function legalHref() {
    const inProductDir = /\/p(?:\/|$)/.test(window.location.pathname);
    return `${inProductDir ? "../" : ""}mentions-legales.html`;
  }

  function dismiss(el, value) {
    write(value);
    el.classList.add("is-leaving");
    window.setTimeout(() => el.remove(), 220);
  }

  function mount() {
    if (read() || document.getElementById("vonlovi-cookies")) return;

    const el = document.createElement("aside");
    el.id = "vonlovi-cookies";
    el.className = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", t("cookies.title", "Cookies"));

    el.innerHTML = `
      <div class="cookie-banner__inner">
        <p class="cookie-banner__text">
          ${t(
            "cookies.text",
            "Nous utilisons des cookies pour mesurer l'audience et améliorer le site. Vous pouvez accepter ou refuser."
          )}
          <a class="cookie-banner__link" href="${legalHref()}">${t(
            "cookies.more",
            "En savoir plus"
          )}</a>
        </p>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-banner__btn cookie-banner__btn--refuse" data-cookie="refuse">
            ${t("cookies.refuse", "Refuser")}
          </button>
          <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-cookie="accept">
            ${t("cookies.accept", "Accepter")}
          </button>
        </div>
      </div>
    `;

    el.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cookie]");
      if (!btn) return;
      const value =
        btn.getAttribute("data-cookie") === "accept" ? "accepted" : "refused";
      dismiss(el, value);
    });

    document.body.appendChild(el);
  }

  window.VonloviCookies = {
    get: read,
    accepted: () => read() === "accepted",
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  window.addEventListener("vonlovi:lang", () => {
    const existing = document.getElementById("vonlovi-cookies");
    if (!existing || read()) return;
    existing.remove();
    mount();
  });
})();
