(function () {
  "use strict";

  const root = document.getElementById("product-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  const RING_FAMILLES = new Set(["Bagues", "Bagues petit modèle"]);
  const BRACELET_FAMILLES = new Set(["Bracelets"]);

  let product = null;
  let woo = null;

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

  function variations() {
    return Array.isArray(woo?.variations) ? woo.variations : [];
  }

  function isRing() {
    return RING_FAMILLES.has(product?.famille) && variations().some((v) => v.size);
  }

  function isBracelet() {
    return BRACELET_FAMILLES.has(product?.famille) && variations().some((v) => v.length || v.color);
  }

  function diameterMm(eu) {
    return (Number(eu) / Math.PI).toFixed(1).replace(".", ",");
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function colorLabel(code) {
    const key = `product.color.${code}`;
    const translated = t(key);
    return translated === key ? code : translated;
  }

  function lengthLabel(raw) {
    return String(raw).replace(/mm$/i, " mm");
  }

  function selectedSize() {
    return document.getElementById("ring-size")?.value || "";
  }

  function selectedLength() {
    return document.getElementById("bracelet-length")?.value || "";
  }

  function selectedColor() {
    return document.getElementById("bracelet-color")?.value || "";
  }

  function findVariation() {
    const vars = variations();
    if (isRing()) {
      const size = selectedSize();
      return vars.find((v) => String(v.size) === String(size)) || null;
    }
    if (isBracelet()) {
      const length = selectedLength();
      const color = selectedColor();
      return (
        vars.find(
          (v) => String(v.length) === String(length) && String(v.color) === String(color)
        ) || null
      );
    }
    return null;
  }

  function shopHref() {
    const variation = findVariation();
    if (variation?.id && window.VonloviCart?.addToCartUrl) {
      return VonloviCart.addToCartUrl(variation.id);
    }
    if (woo?.type === "variable" || isRing() || isBracelet()) {
      return woo?.url || product?.url || "";
    }
    const id = woo?.id || product?.id;
    if (id && window.VonloviCart?.addToCartUrl) return VonloviCart.addToCartUrl(id);
    return woo?.url || product?.url || "";
  }

  function optionsReady() {
    if (isRing()) return Boolean(selectedSize() && findVariation());
    if (isBracelet()) return Boolean(selectedLength() && selectedColor() && findVariation());
    return Boolean(woo?.id || product?.id || woo?.url || product?.url);
  }

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

  function optionErrorText() {
    if (isRing()) return t("product.size.error");
    if (isBracelet()) return t("product.options.error");
    return "";
  }

  function sizeOptionsHtml(selected) {
    const sizes = unique(variations().map((v) => v.size)).sort((a, b) => Number(a) - Number(b));
    const choose = t("product.size.choose");
    const opts = sizes
      .map((eu) => {
        const label = `${eu} — Ø ${diameterMm(eu)} mm`;
        const sel = String(selected) === String(eu) ? " selected" : "";
        return `<option value="${eu}"${sel}>${label}</option>`;
      })
      .join("");
    return `<option value="">${choose}</option>${opts}`;
  }

  function braceletSelectHtml(id, label, choose, values, selected, format) {
    const opts = values
      .map((value) => {
        const sel = String(selected) === String(value) ? " selected" : "";
        return `<option value="${value}"${sel}>${format(value)}</option>`;
      })
      .join("");
    return `
        <div class="product__size">
          <label class="product__size-label" for="${id}">${label}</label>
          <select id="${id}" name="${id}" required>
            <option value="">${choose}</option>
            ${opts}
          </select>
        </div>
    `;
  }

  function optionsHtml() {
    if (isRing()) {
      return `
        <div class="product__size">
          <label class="product__size-label" for="ring-size">${t("product.size")}</label>
          <select id="ring-size" name="size" required>
            ${sizeOptionsHtml(selectedSize())}
          </select>
          <p class="product__size-guide">${t("product.size.guide")}</p>
        </div>
      `;
    }
    if (isBracelet()) {
      const lengths = unique(variations().map((v) => v.length));
      const colors = unique(variations().map((v) => v.color));
      return (
        braceletSelectHtml(
          "bracelet-length",
          t("product.bracelet.length"),
          t("product.bracelet.length.choose"),
          lengths,
          selectedLength(),
          lengthLabel
        ) +
        braceletSelectHtml(
          "bracelet-color",
          t("product.bracelet.color"),
          t("product.bracelet.color.choose"),
          colors,
          selectedColor(),
          colorLabel
        )
      );
    }
    return "";
  }

  function assurancesHtml() {
    return `<p class="product__assurances" data-i18n="product.assurances" data-i18n-html>${t("product.assurances")}</p>`;
  }

  function syncCta(cta) {
    if (!cta) return;
    const href = shopHref();
    const ready = optionsReady() && href;
    cta.setAttribute("href", ready ? href : "#");
    cta.classList.toggle("is-waiting", !ready);
    cta.setAttribute("aria-disabled", ready ? "false" : "true");
    const err = document.getElementById("product-option-error");
    if (ready && err) err.hidden = true;
  }

  function render() {
    if (!product) return;
    const loc = window.VonloviI18n ? VonloviI18n.localizeProduct(product) : product;
    const familleLabel =
      loc.famille ||
      (window.VonloviI18n ? VonloviI18n.localizeFamille(product.famille) : product.famille) ||
      "";

    document.title = `${loc.nom} — VONLOVI`;
    const desc = loc.description || `${loc.nom} — Vonlovi, or jaune 750, sur commande.`;
    const pageUrl = `https://vonlovi.vercel.app/product?slug=${encodeURIComponent(slug)}`;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", pageUrl);
    setMeta('link[rel="canonical"]', "href", pageUrl);
    const images = (product.images || [])
      .map((img) => img.local)
      .filter(Boolean)
      .map((src) => (window.VonloviAsset ? VonloviAsset.url(src) : src));
    if (images[0]) {
      const abs = images[0].startsWith("http")
        ? images[0]
        : `https://vonlovi.vercel.app/${images[0].replace(/^\//, "")}`;
      setMeta('meta[property="og:image"]', "content", abs);
      setMeta('meta[name="twitter:image"]', "content", abs);
    }

    const name = esc(loc.nom);
    const family = esc(familleLabel);
    const price = esc(product.prix || "");
    const copy = esc(loc.description || "");

    root.innerHTML = `
      <div class="product__gallery" data-chrome-surface>
        ${images
          .map(
            (src, i) =>
              `<img src="${src}" alt="${name}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.remove()" />`
          )
          .join("")}
      </div>
      <div class="product__info">
        <p class="product__famille">${family}</p>
        <h1 class="product__title">${name}</h1>
        <p class="product__price">${price}</p>
        <p class="product__desc">${copy}</p>
        ${optionsHtml()}
        <p class="product__size-error" id="product-option-error" hidden>${esc(optionErrorText())}</p>
        <a class="product__cta" id="add-to-cart" href="#">${t("product.add")}</a>
        ${assurancesHtml()}
        <a class="product__back" href="collection.html?cat=${catParam(product.famille)}">← ${family || "Collection"}</a>
      </div>
    `;
    root.setAttribute("aria-busy", "false");
    window.dispatchEvent(new Event("scroll"));

    const cta = document.getElementById("add-to-cart");
    root.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => syncCta(cta));
    });
    cta?.addEventListener("click", (event) => {
      if (optionsReady() && shopHref()) return;
      event.preventDefault();
      const firstEmpty = [...root.querySelectorAll("select")].find((el) => !el.value);
      firstEmpty?.focus();
      cta.classList.add("is-waiting");
      const err = document.getElementById("product-option-error");
      if (err) {
        err.textContent = optionErrorText();
        err.hidden = false;
      }
    });
    syncCta(cta);
  }

  async function loadWoo(productSlug) {
    try {
      const res = await fetch("/data/woo.json", { cache: "no-store" });
      const data = await res.json();
      return data.products?.[productSlug] || null;
    } catch {
      return null;
    }
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
      woo = await loadWoo(product.slug);
      if (!woo && product.id) {
        woo = { id: product.id, type: "simple", url: product.url, variations: [] };
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
