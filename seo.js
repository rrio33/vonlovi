(function (global) {
  "use strict";

  const SITE = "https://vonlovi.com";
  const DEFAULT_IMAGE = `${SITE}/assets/og-image.png?v=3`;

  function abs(path) {
    if (!path) return DEFAULT_IMAGE;
    const raw = String(path).trim();
    if (/^https?:\/\//i.test(raw)) return raw.replace("https://vonlovi.vercel.app", SITE);
    const clean = raw.replace(/^\.\//, "").replace(/^\//, "");
    return `${SITE}/${clean}`;
  }

  function ensureMeta(attr, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function ensureLink(rel, href) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }

  function setJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  function applyPage({
    title,
    description,
    url,
    image,
    type = "website",
    robots = "index, follow",
  } = {}) {
    if (title) document.title = title;
    if (description) ensureMeta("name", "description", description);
    ensureMeta("name", "robots", robots);
    if (title) ensureMeta("property", "og:title", title);
    if (description) ensureMeta("property", "og:description", description);
    if (url) ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:type", type);
    ensureMeta("property", "og:site_name", "VONLOVI");
    const img = abs(image) || DEFAULT_IMAGE;
    ensureMeta("property", "og:image", img);
    ensureMeta("property", "og:image:alt", title || "VONLOVI");
    ensureMeta("name", "twitter:card", "summary_large_image");
    if (title) ensureMeta("name", "twitter:title", title);
    if (description) ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", img);
    if (url) ensureLink("canonical", url);
  }

  function applyProduct(product, { localeName, localeDescription, imagePath } = {}) {
    if (!product?.slug) return;
    const name = localeName || product.nom || product.slug;
    const desc =
      localeDescription ||
      product.description ||
      `${name}. Joaillerie sculpturale Vonlovi, or jaune 750.`;
    const title = `${name} | VONLOVI`;
    const url = `${SITE}/product.html?slug=${encodeURIComponent(product.slug)}`;
    const image =
      imagePath ||
      product.images?.[0]?.local ||
      DEFAULT_IMAGE;
    applyPage({
      title,
      description: String(desc).replace(/\s+/g, " ").trim().slice(0, 300),
      url,
      image,
      type: "product",
    });

    const price = Number(product.prix_num);
    const offer =
      Number.isFinite(price) && price > 0
        ? {
            "@type": "Offer",
            url,
            priceCurrency: "EUR",
            price: String(price),
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
          }
        : undefined;

    setJsonLd("vonlovi-product-ld", {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      description: String(desc).replace(/\s+/g, " ").trim(),
      image: [abs(image)],
      sku: product.slug,
      brand: { "@type": "Brand", name: "VONLOVI" },
      material: "Gold 750",
      ...(product.pierre ? { color: product.pierre } : {}),
      ...(offer ? { offers: offer } : {}),
    });
  }

  function applyOrganization() {
    setJsonLd("vonlovi-org-ld", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VONLOVI",
      url: SITE,
      logo: `${SITE}/assets/og-image.png?v=3`,
      sameAs: ["https://www.instagram.com/vonlovi/"],
      email: "contact@vonlovi.com",
    });
  }

  global.VonloviSeo = {
    SITE,
    DEFAULT_IMAGE,
    abs,
    applyPage,
    applyProduct,
    applyOrganization,
  };
})(window);
