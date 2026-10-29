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

  function cardHtml(p) {
    const loc = window.VonloviI18n ? VonloviI18n.localizeProduct(p) : p;
    const local = p.images?.[0]?.local || "";
    const img = window.VonloviAsset ? VonloviAsset.url(local) : local;
    const fallback = window.VonloviAsset ? VonloviAsset.thumbUrl(local) : "";
    const onerror =
      fallback && fallback !== img
        ? ` onerror="this.onerror=null;this.src='${fallback}'"`
        : "";
    return `
      <a class="collection__card" href="product.html?slug=${encodeURIComponent(p.slug)}" data-chrome-surface>
        <img src="${img}" alt="${loc.nom}" loading="lazy"${onerror} />
        <span class="collection__card-label">${loc.nom}</span>
      </a>
    `;
  }

  function separatorHtml(famille) {
    const text = window.VonloviI18n
      ? VonloviI18n.localizeFamille(famille)
      : famille;
    return `
      <div class="collection__break" role="separator" aria-label="${text}">
        <span class="collection__break-line" aria-hidden="true"></span>
        <span class="collection__break-label">${text}</span>
        <span class="collection__break-line" aria-hidden="true"></span>
      </div>
    `;
  }

  function render() {
    const label = t(meta.labelKey);
    if (titleEl) titleEl.textContent = label;
    document.title = `${label} | VONLOVI`;

    if (window.VonloviSeo?.applyPage) {
      const catQs = cat && cat !== "all" ? `?cat=${encodeURIComponent(cat)}` : "";
      const url = `https://vonlovi.com/collection.html${catQs}`;
      const description = `${label}. Collection Vonlovi, joaillerie sculpturale en or jaune 750.`;
      VonloviSeo.applyPage({
        title: `${label} | VONLOVI`,
        description,
        url,
        image: products[0]?.images?.[0]?.local,
      });
    }

    if (!products.length) {
      grid.innerHTML = `<p class="collection__empty">${t("collection.empty")}</p>`;
      return;
    }

    // Keep catalogue order within each famille; insert a break when famille changes.
    const order = meta.familles || [];
    const sorted =
      order.length > 1
        ? [...products].sort((a, b) => {
            const ia = order.indexOf(a.famille);
            const ib = order.indexOf(b.famille);
            if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
            return 0;
          })
        : products;

    const parts = [];
    let prevFamille = null;
    for (const p of sorted) {
      if (
        order.length > 1 &&
        prevFamille &&
        p.famille &&
        p.famille !== prevFamille
      ) {
        parts.push(separatorHtml(p.famille));
      }
      parts.push(cardHtml(p));
      prevFamille = p.famille || prevFamille;
    }

    grid.innerHTML = parts.join("");
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
