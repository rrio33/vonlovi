(function () {
  "use strict";

  const root = document.getElementById("checkout-root");
  const form = document.getElementById("checkout-form");
  if (!root || !form || !window.VonloviCart) return;

  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);

  if (!VonloviCart.count()) {
    window.location.replace("panier.html");
    return;
  }

  function renderItems() {
    const holder = document.getElementById("checkout-items");
    if (!holder) return;
    const items = VonloviCart.read();
    holder.innerHTML = `
      <ul class="checkout__list">
        ${items
          .map((item) => {
            const loc = window.VonloviI18n
              ? VonloviI18n.localizeProduct({
                  slug: item.slug,
                  nom: item.nom,
                  famille: item.famille,
                  description: "",
                })
              : item;
            const name = loc.nom || item.nom;
            const options = VonloviCart.formatOptions
              ? VonloviCart.formatOptions(item, t)
              : item.size
                ? VonloviCart.formatSize(item.size, t)
                : "";
            const optionBit = options ? ` · ${options}` : "";
            const line = `${name}${optionBit} · ${item.qty} · ${
              item.prix || VonloviCart.formatMoney(item.prix_num || 0)
            }`;
            return `<li>${line}</li>`;
          })
          .join("")}
      </ul>
      <p class="checkout__items-total">${t("panier.total")} · ${VonloviCart.formatMoney(
        VonloviCart.total(items)
      )}</p>
    `;
  }

  renderItems();
  window.addEventListener("vonlovi:lang", renderItems);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const order = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      items: VonloviCart.read(),
      total: VonloviCart.total(),
      at: new Date().toISOString(),
    };

    try {
      localStorage.setItem("vonlovi-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }

    VonloviCart.clear();

    const note = t("checkout.done.note")
      .replace("{total}", VonloviCart.formatMoney(order.total))
      .replace("{email}", order.email);

    root.innerHTML = `
      <header class="checkout__intro">
        <p class="checkout__step">${t("checkout.done.step")}</p>
        <h1 class="checkout__title">${t("checkout.done.title")}</h1>
      </header>
      <div class="checkout__done">
        <p class="checkout__note">${note}</p>
        <a class="checkout__cta" href="home.html">${t("checkout.done.home")}</a>
      </div>
    `;
  });
})();
