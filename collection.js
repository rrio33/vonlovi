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

  function render() {
    const label = t(meta.labelKey);
    if (titleEl) titleEl.textContent = label;
    document.title = `${label} — VONLOVI`;

    if (!products.length) {
      grid.innerHTML = `<p class="collection__empty">${t("collection.empty")}</p>`;
      return;
    }

    grid.innerHTML = products
      .map((p) => {
        const loc = window.VonloviI18n ? VonloviI18n.localizeProduct(p) : p;
        const img = p.images?.[0]?.local || "";
        return `
          <a class="collection__card" href="product.html?slug=${encodeURIComponent(p.slug)}" data-chrome-surface>
            <img src="${img}" alt="${loc.nom}" loading="lazy" />
            <span class="collection__card-label">${loc.nom}</span>
          </a>
        `;
      })
      .join("");
  }

  async function init() {
    try {
      if (window.VonloviI18n?.loadProducts) await VonloviI18n.loadProducts();
      const res = await fetch("data/catalogue.json", { cache: "no-store" });
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
