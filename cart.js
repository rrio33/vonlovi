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

  function extrasKey(item) {
    return [item?.size || "", item?.length || "", item?.color || ""].join("|");
  }

  function sameLine(item, slug, extras = {}) {
    return item.slug === slug && extrasKey(item) === extrasKey(extras);
  }

  function count(items = read()) {
    return items.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function add(product, qty = 1, extras = {}) {
    const items = read();
    const line = {
      size: extras.size ? String(extras.size) : "",
      length: extras.length ? String(extras.length) : "",
      color: extras.color ? String(extras.color) : "",
      wooId: extras.wooId || product.id || null,
    };
    const existing = items.find((item) => sameLine(item, product.slug, line));
    if (existing) {
      existing.qty += qty;
      if (line.wooId) existing.wooId = line.wooId;
    } else {
      items.push({
        slug: product.slug,
        nom: product.nom,
        prix: product.prix,
        prix_num: product.prix_num || 0,
        image: product.images?.[0]?.local || product.image || "",
        famille: product.famille || "",
        size: line.size,
        length: line.length,
        color: line.color,
        wooId: line.wooId,
        qty,
      });
    }
    write(items);
    return items;
  }

  function setQty(slug, qty, extras = {}) {
    let items = read();
    if (qty <= 0) {
      items = items.filter((item) => !sameLine(item, slug, extras));
    } else {
      items = items.map((item) =>
        sameLine(item, slug, extras) ? { ...item, qty } : item
      );
    }
    write(items);
    return items;
  }

  function remove(slug, extras = {}) {
    return setQty(slug, 0, extras);
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

  function formatOptions(item, translate) {
    const t = typeof translate === "function" ? translate : () => "";
    const bits = [];
    if (item.size) bits.push(formatSize(item.size, translate));
    if (item.length) {
      const label = t("product.bracelet.length") || "Longueur";
      bits.push(`${label} ${String(item.length).replace(/mm$/i, " mm")}`);
    }
    if (item.color) {
      const colorKey = `product.color.${item.color}`;
      const color = t(colorKey);
      bits.push(color === colorKey ? item.color : color);
    }
    return bits.join(" · ");
  }

  function extrasFrom(el) {
    return {
      size: el?.getAttribute("data-size") || "",
      length: el?.getAttribute("data-length") || "",
      color: el?.getAttribute("data-color") || "",
    };
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
      const href = el.getAttribute("href") || "";
      if (!href || href.startsWith("http")) {
        el.setAttribute("href", "panier.html");
      }
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
    formatOptions,
    extrasFrom,
    extrasKey,
  };

  document.addEventListener("DOMContentLoaded", updateBadges);
  updateBadges();
})();
