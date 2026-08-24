(function () {
  "use strict";

  const root = document.getElementById("product-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  const RING_FAMILLES = new Set(["Bagues", "Bagues petit modèle"]);
  const RING_SIZES = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62];

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

  function needsSize(item) {
    return RING_FAMILLES.has(item?.famille);
  }

  function diameterMm(eu) {
    return (Number(eu) / Math.PI).toFixed(1).replace(".", ",");
  }

  function sizeOptionsHtml(selected) {
    const choose = t("product.size.choose");
    const opts = RING_SIZES.map((eu) => {
      const label = `${eu} — Ø ${diameterMm(eu)} mm`;
      const sel = String(selected) === String(eu) ? " selected" : "";
      return `<option value="${eu}"${sel}>${label}</option>`;
    }).join("");
    return `<option value="">${choose}</option>${opts}`;
  }

  function assurancesHtml() {
    return `<p class="product__assurances" data-i18n="product.assurances" data-i18n-html>${t("product.assurances")}</p>`;
  }

  function sizeBlockHtml(selected) {
    if (!needsSize(product)) return "";
    return `
        <div class="product__size">
          <label class="product__size-label" for="ring-size">${t("product.size")}</label>
          <select id="ring-size" name="size" required>
            ${sizeOptionsHtml(selected)}
          </select>
          <p class="product__size-guide">${t("product.size.guide")}</p>
        </div>
    `;
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

    const previousSize = document.getElementById("ring-size")?.value || "";

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
        ${sizeBlockHtml(previousSize)}
        <button type="button" class="product__cta" id="add-to-cart">${t("product.add")}</button>
        ${assurancesHtml()}
        <a class="product__back" href="collection.html?cat=${catParam(product.famille)}">← ${familleLabel || "Collection"}</a>
      </div>
    `;
    root.setAttribute("aria-busy", "false");
    window.dispatchEvent(new Event("scroll"));

    const sizeSelect = document.getElementById("ring-size");
    const addBtn = document.getElementById("add-to-cart");

    addBtn?.addEventListener("click", () => {
      if (!window.VonloviCart) return;
      if (needsSize(product)) {
        const size = sizeSelect?.value || "";
        if (!size) {
          sizeSelect?.focus();
          addBtn.classList.add("is-waiting");
          return;
        }
        VonloviCart.add(product, 1, { size });
      } else {
        VonloviCart.add(product, 1);
      }
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
