(function () {
  "use strict";

  const root = document.getElementById("product-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  let product = null;

  function catParam(famille) {
    const map = {
      Bagues: "bagues",
      "Bagues petit modèle": "bagues",
      Pendentifs: "pendentifs",
      "Boucles d'oreilles": "boucles-d-oreilles",
      Boutons: "boutons",
      Bracelets: "bracelets",
    };
    return map[famille] || "pendentifs";
  }

  function render() {
    if (!product) return;
    const loc = window.VonloviI18n
      ? VonloviI18n.localizeProduct(product)
      : product;
    const familleLabel =
      loc.famille ||
      (window.VonloviI18n ? VonloviI18n.localizeFamille(product.famille) : product.famille) ||
      "";

    document.title = `${loc.nom} — VONLOVI`;
    const images = (product.images || [])
      .map((img) => img.local)
      .filter(Boolean)
      .map((src) => (window.VonloviAsset ? VonloviAsset.url(src) : src));

    root.innerHTML = `
      <div class="product__gallery" data-chrome-surface>
        ${images
          .map(
            (src, i) =>
              `<img src="${src}" alt="${loc.nom}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.remove()" />`
          )
          .join("")}
      </div>
      <div class="product__info">
        <p class="product__famille">${familleLabel}</p>
        <h1 class="product__title">${loc.nom}</h1>
        <p class="product__price">${product.prix || ""}</p>
        <p class="product__desc">${loc.description || ""}</p>
        <button type="button" class="product__cta" id="add-to-cart">${t("product.add")}</button>
        <a class="product__back" href="collection.html?cat=${catParam(product.famille)}">← ${familleLabel || "Collection"}</a>
      </div>
    `;
    root.setAttribute("aria-busy", "false");
    window.dispatchEvent(new Event("scroll"));

    document.getElementById("add-to-cart")?.addEventListener("click", () => {
      if (!window.VonloviCart) return;
      VonloviCart.add(product, 1);
      window.location.href = "panier.html";
    });
  }

  async function init() {
    if (!slug) {
      root.innerHTML = `<p class="product__status">${t("product.missing")}</p>`;
      return;
    }

    try {
      if (window.VonloviI18n?.loadProducts) await VonloviI18n.loadProducts();
      const res = await fetch("/data/catalogue.json", { cache: "no-store" });
      const catalogue = await res.json();
      product = catalogue.find((item) => item.slug === slug) || null;
      if (!product) {
        root.innerHTML = `<p class="product__status">${t("product.missing")}</p>`;
        return;
      }
      render();
    } catch {
      root.innerHTML = `<p class="product__status">${t("product.unavailable")}</p>`;
    }
  }

  window.addEventListener("vonlovi:lang", () => {
    if (product) render();
  });

  init();
})();
