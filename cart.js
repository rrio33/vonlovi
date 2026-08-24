(() => {
  const STORAGE_KEY = "vonlovi-cart";

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadges();
    window.dispatchEvent(new CustomEvent("vonlovi:cart", { detail: items }));
  }

  function sizeKey(item) {
    return item?.size ? String(item.size) : "";
  }

  function sameLine(item, slug, size) {
    return item.slug === slug && sizeKey(item) === (size || "");
  }

  function count(items = read()) {
    return items.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function add(product, qty = 1, extras = {}) {
    const items = read();
    const size = extras.size ? String(extras.size) : "";
    const existing = items.find((item) => sameLine(item, product.slug, size));
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        slug: product.slug,
        nom: product.nom,
        prix: product.prix,
        prix_num: product.prix_num || 0,
        image: product.images?.[0]?.local || "",
        famille: product.famille || "",
        size,
        qty,
      });
    }
    write(items);
    return items;
  }

  function setQty(slug, qty, size) {
    let items = read();
    const sizeVal = size || "";
    if (qty <= 0) {
      items = items.filter((item) => !sameLine(item, slug, sizeVal));
    } else {
      items = items.map((item) =>
        sameLine(item, slug, sizeVal) ? { ...item, qty } : item
      );
    }
    write(items);
    return items;
  }

  function remove(slug, size) {
    return setQty(slug, 0, size);
  }

  function clear() {
    write([]);
  }

  function total(items = read()) {
    return items.reduce((sum, item) => sum + (item.prix_num || 0) * (item.qty || 1), 0);
  }

  function formatMoney(n) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function formatSize(size, translate) {
    if (!size) return "";
    const mm = (Number(size) / Math.PI).toFixed(1).replace(".", ",");
    const prefix = typeof translate === "function" ? translate("panier.size") : "Taille";
    return `${prefix} EU ${size} — Ø ${mm} mm`;
  }

  function updateBadges() {
    const n = count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = n > 0 ? String(n) : "";
      el.hidden = n <= 0;
      el.setAttribute("aria-hidden", n <= 0 ? "true" : "false");
    });
    document.querySelectorAll("[data-cart-link]").forEach((el) => {
      el.classList.toggle("has-items", n > 0);
    });
  }

  window.VonloviCart = {
    read,
    write,
    count,
    add,
    setQty,
    remove,
    clear,
    total,
    formatMoney,
    formatSize,
    updateBadges,
  };

  document.addEventListener("DOMContentLoaded", updateBadges);
  updateBadges();
})();
