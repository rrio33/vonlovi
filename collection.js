(function () {
  "use strict";

  const titleEl = document.getElementById("collection-title");
  const grid = document.getElementById("collection-grid");
  const root = document.getElementById("collection-root");
  if (!grid) return;

  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  const CAT_MAP = {
    all: { labelKey: "cat.all", familles: null },
    pendentifs: { labelKey: "cat.pendentifs", familles: ["Pendentifs"] },
    bagues: { labelKey: "cat.bagues", familles: ["Bagues", "Bagues petit modèle"] },
    "boucles-d-oreilles": { labelKey: "cat.boucles", familles: ["Boucles d'oreilles"] },
    boutons: { labelKey: "cat.boutons", familles: ["Boutons"] },
    bracelets: { labelKey: "cat.bracelets", familles: ["Bracelets"] },
  };

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") || "all";
  const meta = CAT_MAP[cat] || CAT_MAP.all;
  let products = [];

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function setMeta(selector, attr, content) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, content);
  }

  function render() {
    const label = t(meta.labelKey);
    if (titleEl) titleEl.textContent = label;
    document.title = `${label} — VONLOVI`;
    const desc =
      cat === "all"
        ? "Collection Vonlovi — pendentifs, bagues, boucles d'oreille, boutons et bracelets. Or jaune 750, sur commande."
        : `${label} Vonlovi — or jaune 750, sur commande.`;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", desc);
    const pageUrl = `https://vonlovi.vercel.app/collection${cat !== "all" ? `?cat=${encodeURIComponent(cat)}` : ""}`;
    setMeta('meta[property="og:url"]', "content", pageUrl);
    setMeta('link[rel="canonical"]', "href", pageUrl);

    if (!products.length) {
      grid.innerHTML = `<p class="collection__empty">${t("collection.empty")}</p>`;
      return;
    }

    grid.innerHTML = products
      .map((p) => {
        const loc = window.VonloviI18n ? VonloviI18n.localizeProduct(p) : p;
        const local = p.images?.[0]?.local || "";
        const img = window.VonloviAsset ? VonloviAsset.url(local) : local;
        const fallback = window.VonloviAsset ? VonloviAsset.thumbUrl(local) : "";
        const onerror =
          fallback && fallback !== img
            ? ` onerror="this.onerror=null;this.src='${fallback}'"`
            : "";
        const name = esc(loc.nom);
        return `
          <a class="collection__card" href="product.html?slug=${encodeURIComponent(p.slug)}" data-chrome-surface>
            <img src="${img}" alt="${name}" loading="lazy"${onerror} />
            <span class="collection__card-label">${name}</span>
          </a>
        `;
      })
      .join("");
  }

  async function init() {
    try {
      if (window.VonloviI18n?.loadProducts) await VonloviI18n.loadProducts();
      const res = await fetch("/data/catalogue.json", { cache: "no-store" });
      const catalogue = await res.json();
      products = meta.familles
        ? catalogue.filter((p) => meta.familles.includes(p.famille))
        : catalogue.slice();

      if (!products.length) {
        grid.innerHTML = `<p class="collection__empty">${t("collection.empty")}</p>`;
      } else {
        render();
      }
    } catch {
      grid.innerHTML = `<p class="collection__empty">${t("collection.unavailable")}</p>`;
    }

    root?.setAttribute("aria-busy", "false");
    window.dispatchEvent(new Event("scroll"));
  }

  window.addEventListener("vonlovi:lang", () => {
    if (products.length) render();
  });

  init();
})();
