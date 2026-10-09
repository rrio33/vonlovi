(function () {
  "use strict";

  const root = document.getElementById("contributors-root");
  if (!root) return;

  const FLOW_MS = 3200;
  const t = (key) => (window.VonloviI18n ? VonloviI18n.t(key) : key);
  const params = new URLSearchParams(window.location.search);
  const personId = params.get("id");
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function roleFor(id) {
    return t(`contributors.role.${id}`);
  }

  function isVideo(src, person) {
    if (person?.coverType === "video") return true;
    return /\.(mp4|webm|mov)(\?|$)/i.test(src || "");
  }

  function stillsFor(person) {
    if (!person) return [];
    if (isVideo(person.cover, person)) return person.cover ? [person.cover] : [];
    const seen = new Set();
    const out = [];
    (person.images && person.images.length ? person.images : [person.cover]).forEach((src) => {
      if (!src || seen.has(src)) return;
      seen.add(src);
      out.push(src);
    });
    return out;
  }

  function mediaMarkup(person, { visible = false, eager = false } = {}) {
    const srcs = stillsFor(person);
    if (!srcs.length) return "";
    if (isVideo(srcs[0], person)) {
      return `
        <video
          class="contributors__media${visible ? " is-visible" : ""}"
          data-id="${person.id}"
          data-frame="0"
          src="${srcs[0]}"
          muted
          loop
          playsinline
          preload="${eager ? "auto" : "metadata"}"
        ></video>
      `;
    }
    return srcs
      .map(
        (src, i) => `
        <img
          class="contributors__media${visible && i === 0 ? " is-visible" : ""}"
          src="${src}"
          alt=""
          data-id="${person.id}"
          data-frame="${i}"
          loading="${eager && i < 2 ? "eager" : "lazy"}"
          decoding="async"
        />
      `
      )
      .join("");
  }

  function bindHoverPreview(rootEl, list) {
    const names = [...rootEl.querySelectorAll(".contributors__name")];
    const media = [...rootEl.querySelectorAll(".contributors__preview .contributors__media")];
    if (!names.length) return;

    const firstWithCover = list.find((p) => p.cover)?.id || list[0]?.id || null;
    let timer = null;

    function stopFlow() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function framesFor(id) {
      return media.filter((el) => el.dataset.id === id);
    }

    function showFrame(frames, index) {
      frames.forEach((el, i) => el.classList.toggle("is-visible", i === index));
    }

    function startFlow(id) {
      stopFlow();
      const frames = framesFor(id);
      if (frames.length < 2 || frames[0].tagName === "VIDEO" || prefersReducedMotion()) return;
      frames.forEach((el) => {
        if (el.tagName === "IMG") el.loading = "eager";
      });
      let frame = 0;
      timer = setInterval(() => {
        frame = (frame + 1) % frames.length;
        showFrame(frames, frame);
      }, FLOW_MS);
    }

    function show(id) {
      names.forEach((el) => el.classList.toggle("is-active", el.dataset.id === id));
      media.forEach((el) => {
        const on = el.dataset.id === id;
        if (el.tagName === "VIDEO") {
          if (on) {
            el.classList.add("is-visible");
            el.play().catch(() => {});
          } else {
            el.classList.remove("is-visible");
            el.pause();
            try {
              el.currentTime = 0;
            } catch {
              /* ignore */
            }
          }
          return;
        }
        el.classList.toggle("is-visible", on && el.dataset.frame === "0");
      });
      startFlow(id);
    }

    names.forEach((el) => {
      const id = el.dataset.id;
      el.addEventListener("mouseenter", () => show(id));
      el.addEventListener("focus", () => show(id));
    });

    window.addEventListener("pagehide", stopFlow);

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
