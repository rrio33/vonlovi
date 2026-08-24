(function () {
  "use strict";

  const list = document.getElementById("panier-list");
  if (!list || !window.VonloviCart) return;

  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  function labelFor(item) {
    if (window.VonloviI18n?.localizeProduct) {
      const loc = VonloviI18n.localizeProduct({
        slug: item.slug,
        nom: item.nom,
        famille: item.famille,
        description: "",
      });
      return {
        nom: loc.nom || item.nom,
        famille: loc.famille || VonloviI18n.localizeFamille?.(item.famille) || item.famille || "",
      };
    }
    return { nom: item.nom, famille: item.famille || "" };
  }

  function render() {
    const items = VonloviCart.read();
    if (!items.length) {
      list.innerHTML = `
        <p class="panier__empty">
          ${t("panier.empty")}<br />
          <a href="collection.html">${t("panier.continue")}</a>
        </p>
      `;
      return;
    }

    list.innerHTML = `
      ${items
        .map((item) => {
          const labels = labelFor(item);
          const sizeLine = item.size
            ? `<p class="panier__size">${VonloviCart.formatSize(item.size, t)}</p>`
            : "";
          const sizeAttr = item.size ? ` data-size="${item.size}"` : "";
          return `
        <article class="panier__row" data-slug="${item.slug}"${sizeAttr}>
          <img class="panier__thumb" src="${window.VonloviAsset ? VonloviAsset.url(item.image) : item.image}" alt="" />
          <div class="panier__meta">
            <h2 class="panier__name"><a href="product.html?slug=${encodeURIComponent(item.slug)}">${labels.nom}</a></h2>
            <p class="panier__famille">${labels.famille}</p>
            ${sizeLine}
            <p class="panier__line">${item.prix || VonloviCart.formatMoney(item.prix_num || 0)}</p>
          </div>
          <div class="panier__controls">
            <div class="panier__qty">
              <button type="button" data-action="dec" aria-label="−">−</button>
              <span>${item.qty}</span>
              <button type="button" data-action="inc" aria-label="+">+</button>
            </div>
            <button type="button" class="panier__remove" data-action="remove">${t("panier.remove")}</button>
          </div>
        </article>
      `;
        })
        .join("")}
      <div class="panier__summary">
        <p class="panier__total">${t("panier.total")} · ${VonloviCart.formatMoney(VonloviCart.total(items))}</p>
        <a class="panier__cta" href="checkout.html">${t("panier.checkout")}</a>
      </div>
    `;
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const row = btn.closest("[data-slug]");
    if (!row) return;
    const slug = row.getAttribute("data-slug");
    const size = row.getAttribute("data-size") || "";
    const item = VonloviCart.read().find(
      (entry) => entry.slug === slug && (entry.size || "") === size
    );
    if (!item) return;

    const action = btn.getAttribute("data-action");
    if (action === "inc") VonloviCart.setQty(slug, item.qty + 1, size);
    if (action === "dec") VonloviCart.setQty(slug, item.qty - 1, size);
    if (action === "remove") VonloviCart.remove(slug, size);
    render();
  });

  window.addEventListener("vonlovi:cart", render);
  window.addEventListener("vonlovi:lang", render);

  if (window.VonloviI18n?.loadProducts) {
    VonloviI18n.loadProducts().finally(render);
  } else {
    render();
  }
})();
