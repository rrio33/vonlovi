(function () {
  "use strict";

  const root = document.getElementById("contributors-root");
  if (!root) return;

  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);
  const params = new URLSearchParams(window.location.search);
  const personId = params.get("id");

  function roleFor(id) {
    return t(`contributors.role.${id}`);
  }

  function isVideo(src, person) {
    if (person?.coverType === "video") return true;
    return /\.(mp4|webm|mov)(\?|$)/i.test(src || "");
  }

  function mediaMarkup(person, { visible = false, eager = false } = {}) {
    const src = person.cover;
    if (!src) return "";
    if (isVideo(src, person)) {
      return `
        <video
          class="contributors__media${visible ? " is-visible" : ""}"
          data-id="${person.id}"
          src="${src}"
          muted
          loop
          playsinline
          preload="${eager ? "auto" : "metadata"}"
        ></video>
      `;
    }
    return `
      <img
        class="contributors__media${visible ? " is-visible" : ""}"
        src="${src}"
        alt=""
        data-id="${person.id}"
        loading="${eager ? "eager" : "lazy"}"
        decoding="async"
      />
    `;
  }

  function bindHoverPreview(rootEl, list) {
    const names = [...rootEl.querySelectorAll(".contributors__name")];
    const media = [...rootEl.querySelectorAll(".contributors__preview .contributors__media")];
    if (!names.length) return;

    const firstWithCover = list.find((p) => p.cover)?.id || list[0]?.id || null;

    function show(id) {
      names.forEach((el) => el.classList.toggle("is-active", el.dataset.id === id));
      media.forEach((el) => {
        const on = el.dataset.id === id;
        el.classList.toggle("is-visible", on);
        if (el.tagName === "VIDEO") {
          if (on) {
            el.play().catch(() => {});
          } else {
            el.pause();
            try {
              el.currentTime = 0;
            } catch {
              /* ignore */
            }
          }
        }
      });
    }

    names.forEach((el) => {
      const id = el.dataset.id;
      el.addEventListener("mouseenter", () => show(id));
      el.addEventListener("focus", () => show(id));
    });

    if (firstWithCover) show(firstWithCover);
  }

  function renderIndex(list) {
    document.title = `${t("contributors.title")} — VONLOVI`;
    const withCover = list.filter((person) => person.cover);
    root.innerHTML = `
      <div class="contributors__stage">
        <div class="contributors__copy">
          <header class="contributors__intro">
            <h1 class="contributors__title">${t("contributors.title")}</h1>
          </header>
          <ul class="contributors__list">
            ${list
              .map(
                (person) => `
              <li>
                <a
                  class="contributors__name"
                  href="contributors.html?id=${encodeURIComponent(person.id)}"
                  data-id="${person.id}"
                >${person.name}</a>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
        <div class="contributors__preview" aria-hidden="true">
          ${withCover
            .map((person, i) => mediaMarkup(person, { visible: i === 0, eager: i === 0 }))
            .join("")}
        </div>
      </div>
    `;
    bindHoverPreview(root, list);
  }

  function renderPerson(person) {
    document.title = `${person.name} — VONLOVI`;
    const shots = (person.images || [])
      .map((src) => {
        if (isVideo(src, person)) {
          return `
            <figure class="contributors__shot contributors__shot--video">
              <video src="${src}" muted loop playsinline autoplay controls></video>
            </figure>
          `;
        }
        return `
          <figure class="contributors__shot">
            <img src="${src}" alt="${person.name}" loading="lazy" />
          </figure>
        `;
      })
      .join("");

    root.innerHTML = `
      <a class="contributors__back" href="contributors.html">${t("contributors.back")}</a>
      <header class="contributors__intro" style="margin:0 0 2em">
        <h1 class="contributors__person-title">${person.name}</h1>
        <p class="contributors__person-role">${roleFor(person.id)}</p>
      </header>
      <div class="contributors__gallery">
        ${shots}
      </div>
    `;
  }

  async function init() {
    try {
      const res = await fetch("data/contributors.json", { cache: "no-store" });
      if (!res.ok) throw new Error("missing");
      const data = await res.json();
      const list = data.contributors || [];

      if (personId) {
        const person = list.find((entry) => entry.id === personId);
        if (!person) {
          root.innerHTML = `<p class="contributors__status">${t("contributors.missing")}</p>`;
        } else {
          renderPerson(person);
        }
      } else {
        renderIndex(list);
      }
    } catch {
      root.innerHTML = `<p class="contributors__status">${t("contributors.unavailable")}</p>`;
    }

    root.setAttribute("aria-busy", "false");
    window.dispatchEvent(new Event("scroll"));
  }

  window.addEventListener("vonlovi:lang", init);
  init();
})();
