/* =========================================================
   main.js — language switch, theme, gallery, viewer, form.
   No framework, no build step: just open index.html.
   ========================================================= */
(function () {
  "use strict";

  var LANG_KEY = "framesstudio.lang";
  var THEME_KEY = "framesstudio.theme";
  var REQ_KEY = "framesstudio.requests";
  var FALLBACK = "en";
  var codes = window.LANGS.map(function (l) { return l.code; });
  var lang = FALLBACK;
  var visible = [];          // work items currently shown
  var lbIndex = 0;
  var lastFocus = null;
  var i18nHooks = [];        // controls whose label is state, not markup

  /* ------------------------------ helpers ------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function t(path) {
    var node = window.I18N[lang] || window.I18N[FALLBACK];
    var fb = window.I18N[FALLBACK];
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      node = node && node[parts[i]];
      fb = fb && fb[parts[i]];
    }
    return (typeof node === "string" ? node : (typeof fb === "string" ? fb : path));
  }

  /* value of a { en, fr, ar } object for the current language */
  function pick(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] != null ? obj[lang] : (obj[FALLBACK] != null ? obj[FALLBACK] : "");
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function prefersCalm() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* a stable id per project, taken from its English title, used in share links */
  function slugOf(item) {
    var base = (item.title && item.title.en) || pick(item.title);
    return String(base).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function pageUrl(slug) {
    return String(location.href).split("#")[0] + (slug ? "#p=" + slug : "");
  }

  function setHash(slug) {
    try { history.replaceState(null, "", pageUrl(slug)); } catch (e) { /* file:// */ }
  }

  var toastTimer = null;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    window.setTimeout(function () { el.classList.add("is-on"); }, 10);
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      el.classList.remove("is-on");
      window.setTimeout(function () { el.hidden = true; }, 220);
    }, 2400);
  }

  /* ------------------------------ language ------------------------------ */
  function detectLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && codes.indexOf(fromUrl) > -1) return fromUrl;
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved && codes.indexOf(saved) > -1) return saved;
    } catch (e) { /* private mode */ }
    var nav = (navigator.languages || [navigator.language || ""]).join(",").toLowerCase();
    for (var i = 0; i < codes.length; i++) {
      if (nav.indexOf(codes[i]) === 0 || nav.indexOf("," + codes[i]) > -1 || nav.indexOf(codes[i] + "-") > -1) return codes[i];
    }
    return FALLBACK;
  }

  function setLang(code, remember) {
    lang = codes.indexOf(code) > -1 ? code : FALLBACK;
    var meta = window.LANGS.filter(function (l) { return l.code === lang; })[0];
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", meta ? meta.dir : "ltr");
    if (remember) { try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} }
    $$(".lang-btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.setAttribute("aria-current", on ? "true" : "false");
    });
    applyStrings();
    renderAll();
  }

  /* fills every [data-i18n] and [data-i18n-attr] element */
  function applyStrings() {
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    /* labels that depend on what a control is doing right now, not on an attribute */
    i18nHooks.forEach(function (fn) { fn(); });
  }

  /* ------------------------------ theme ------------------------------ */
  function setTheme(name, remember) {
    document.documentElement.setAttribute("data-theme", name);
    var meta = $("#metaThemeColor");
    if (meta) meta.setAttribute("content", name === "light" ? "#fbfbfc" : "#0b0c0e");
    if (remember) { try { localStorage.setItem(THEME_KEY, name); } catch (e) {} }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(saved || dark, false);
    $("#themeToggle").addEventListener("click", function () {
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ------------------------------ rendering ------------------------------ */
  function renderStats() {
    $("#statsGrid").innerHTML = window.STATS.map(function (s) {
      return '<div class="stat"><b>' + esc(s.value) + "</b><span>" + esc(pick(s.label)) + "</span></div>";
    }).join("");
  }

  function renderFilters() {
    var box = $("#workFilters");
    var active = box.getAttribute("data-active") || "all";
    box.innerHTML = window.CATEGORIES.map(function (c) {
      return '<button type="button" role="tab" class="chip" data-cat="' + esc(c.id) + '" aria-selected="' +
        (c.id === active ? "true" : "false") + '">' + esc(pick(c.label)) + "</button>";
    }).join("");
    box.setAttribute("data-active", active);
  }

  function renderWork() {
    var cat = $("#workFilters").getAttribute("data-active") || "all";
    visible = window.WORK.filter(function (w) { return cat === "all" || w.cat === cat; });
    var grid = $("#workGrid");
    grid.innerHTML = visible.map(function (w, i) {
      var catLabel = (window.CATEGORIES.filter(function (c) { return c.id === w.cat; })[0] || {}).label;
      /* a local video with no cover picture: let the browser paint its own
         first frame (#t=0.1 nudges it to actually decode one)            */
      var media = (w.video && w.video.kind === "file" && w.video.id && !w.thumb)
        ? '<video src="' + esc(w.video.id) + '#t=0.1" preload="metadata" muted playsinline tabindex="-1" aria-hidden="true"></video>'
        : '<img src="' + esc(w.thumb) + '" alt="' + esc(pick(w.title)) + '" loading="lazy" decoding="async" width="1200" height="900">';
      return '<article class="work-card reveal">' +
        '<div class="work-thumb">' +
          media +
          '<span class="work-tag">' + esc(pick(catLabel)) + "</span>" +
          (w.video ? '<span class="work-play" aria-hidden="true">&#9654;</span>' : "") +
        "</div>" +
        '<div class="work-body">' +
          "<h3>" + esc(pick(w.title)) + "</h3>" +
          "<p>" + esc(pick(w.desc)) + "</p>" +
          '<div class="work-meta">' + (w.tags || []).map(function (tag) { return "<span>" + esc(pick(tag)) + "</span>"; }).join("") + "</div>" +
        "</div>" +
        '<button type="button" class="work-open" data-index="' + i + '" aria-label="' + esc(pick(w.title)) + '"></button>' +
      "</article>";
    }).join("");
    $("#workEmpty").hidden = visible.length > 0;
    observeReveals(grid);
  }

  function renderServices() {
    $("#servicesGrid").innerHTML = window.SERVICES.map(function (s) {
      return '<article class="card reveal' + (s.featured ? " is-featured" : "") + '">' +
        (s.featured ? '<span class="svc-flag">' + esc(pick({ en: "Popular", fr: "Populaire", ar: "الأكثر طلبًا" })) + "</span>" : "") +
        '<div class="svc-icon" aria-hidden="true">' + esc(s.icon) + "</div>" +
        "<h3>" + esc(pick(s.title)) + "</h3>" +
        "<p>" + esc(pick(s.desc)) + "</p>" +
        '<ul class="svc-list">' + (pick(s.bullets) || []).map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
        '<p class="svc-price"><b>' + esc(pick(s.price)) + "</b></p>" +
        '<button type="button" class="btn btn-ghost btn-sm svc-cta" data-service="' + esc(pick(s.title)) + '">' + esc(t("services.cta")) + "</button>" +
      "</article>";
    }).join("");
    observeReveals($("#servicesGrid"));
  }

  function renderProcess() {
    $("#processList").innerHTML = window.PROCESS.map(function (p) {
      return '<li class="reveal"><h3>' + esc(pick(p.title)) + "</h3><p>" + esc(pick(p.desc)) + "</p></li>";
    }).join("");
    observeReveals($("#processList"));
  }

  function renderGear() {
    $("#gearList").innerHTML = window.GEAR.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("");
  }

  function renderTestimonials() {
    $("#testimonialsGrid").innerHTML = window.TESTIMONIALS.map(function (q) {
      var initials = q.name.replace(/[^\p{L}\s]/gu, "").trim().split(/\s+/).slice(0, 2)
        .map(function (w) { return w.charAt(0); }).join("");
      return '<article class="card reveal">' +
        '<p class="stars" aria-hidden="true">★★★★★</p>' +
        '<p class="quote">' + esc(pick(q.quote)) + "</p>" +
        '<div class="quote-by"><span class="avatar" aria-hidden="true">' + esc(initials.toUpperCase()) + "</span>" +
        "<span><strong>" + esc(q.name) + "</strong><small>" + esc(pick(q.role)) + "</small></span></div>" +
      "</article>";
    }).join("");
    observeReveals($("#testimonialsGrid"));
  }

  function renderContact() {
    var s = window.SITE;
    var email = $("#emailLink"), phone = $("#phoneLink"), wa = $("#waLink");
    email.textContent = s.email; email.href = "mailto:" + s.email;
    phone.textContent = s.phone; phone.href = "tel:" + s.phone.replace(/[^\d+]/g, "");
    wa.href = "https://wa.me/" + String(s.whatsapp).replace(/\D/g, "");
    $("#basedText").textContent = t("contact.based").replace("{city}", s.city);
    $("#socials").innerHTML = s.socials.map(function (n) {
      return '<a href="' + esc(n.url) + '" target="_blank" rel="noopener">' + esc(n.name) + "</a>";
    }).join("");
  }

  function renderFormOptions() {
    var typeSel = $("#f-type");
    /* the titles are translated, so the chosen text stops matching after a
       language switch — the position in the list is what survives          */
    var keep = typeSel.selectedIndex;
    var opts = ['<option value="" disabled selected>' + esc(t("form.selectPlaceholder")) + "</option>"];
    window.SERVICES.forEach(function (s) {
      opts.push('<option value="' + esc(pick(s.title)) + '">' + esc(pick(s.title)) + "</option>");
    });
    opts.push('<option value="' + esc(pick(window.OTHER_OPTION)) + '">' + esc(pick(window.OTHER_OPTION)) + "</option>");
    typeSel.innerHTML = opts.join("");
    if (keep > 0 && keep < typeSel.options.length) typeSel.selectedIndex = keep;

    var budget = $("#f-budget");
    var keepB = budget.value;
    budget.innerHTML = ['<option value="">' + esc(t("form.selectPlaceholder")) + "</option>"].concat(
      window.BUDGETS.map(function (b) { return '<option value="' + esc(b.value) + '">' + esc(pick(b.label)) + "</option>"; })
    ).join("");
    if (keepB) budget.value = keepB;
  }

  function renderAll() {
    renderStats();
    renderFilters();
    renderWork();
    renderServices();
    renderProcess();
    renderGear();
    renderTestimonials();
    renderContact();
    renderFormOptions();
  }

  /* ------------------------------ viewer ------------------------------ */
  function openLightbox(i) {
    lbIndex = i;
    lastFocus = document.activeElement;
    var box = $("#lightbox");
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    buildStrip();
    paintLightbox();
    $("#lbClose").focus();
  }

  function closeLightbox() {
    var box = $("#lightbox");
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    $("#lbStage").innerHTML = "";                 // stops any playing video
    $("#lbStrip").innerHTML = "";
    setHash("");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* share the piece that is open: system share sheet, or copy the link */
  function shareCurrent() {
    var item = visible[lbIndex];
    if (!item) return;
    var url = pageUrl(slugOf(item));
    if (navigator.share) {
      navigator.share({ title: pick(item.title), text: pick(item.desc), url: url }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(function () { toast(t("ui.copied")); })
        .catch(function () { toast(url); });
      return;
    }
    toast(url);
  }

  /* opening the page on a shared link jumps straight to that piece */
  function openFromHash() {
    var m = /(?:^|#)p=([a-z0-9-]+)/i.exec(location.hash || "");
    if (!m) return;
    var target = null;
    window.WORK.forEach(function (w) { if (slugOf(w) === m[1].toLowerCase()) target = w; });
    if (!target) return;
    $("#workFilters").setAttribute("data-active", "all");
    renderFilters();
    renderWork();
    var i = visible.indexOf(target);
    if (i > -1) openLightbox(i);
  }

  /* Paint the viewer. `dir` is -1 / +1 when we got here by stepping through
     the set, so the new frame can slide in from the right side.            */
  function paintLightbox(dir) {
    var item = visible[lbIndex];
    if (!item) return;
    var stage = $("#lbStage"), frame = $("#lbFrame");
    var v = item.video;
    if (v && v.id && v.kind === "file") {
      stage.innerHTML = playerHtml(item);
      wirePlayer();
    } else if (v && v.id) {
      var src = v.kind === "vimeo"
        ? "https://player.vimeo.com/video/" + encodeURIComponent(v.id)
        : "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) + "?rel=0";
      stage.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(pick(item.title)) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    } else {
      /* a full-size photo takes a moment to decode: shimmer until it is ready */
      frame.classList.add("is-loading");
      stage.innerHTML = '<img src="' + esc(item.full || item.thumb) + '" alt="' +
        esc(pick(item.title)) + '" decoding="async">';
      var img = stage.querySelector("img");
      var ready = function () { frame.classList.remove("is-loading"); };
      if (img.complete) ready();
      else { img.addEventListener("load", ready); img.addEventListener("error", ready); }
    }

    stage.classList.remove("is-next", "is-prev");
    if (dir) { void stage.offsetWidth; stage.classList.add(dir > 0 ? "is-next" : "is-prev"); }

    var catLabel = (window.CATEGORIES.filter(function (c) { return c.id === item.cat; })[0] || {}).label;
    $("#lbChip").textContent = pick(catLabel);
    $("#lbCount").textContent = t("ui.counter").replace("{i}", lbIndex + 1).replace("{n}", visible.length);
    $("#lbTitle").textContent = pick(item.title);
    $("#lbDesc").textContent = pick(item.desc);
    $("#lbTags").innerHTML = (item.tags || []).map(function (tag) {
      return "<span>" + esc(pick(tag)) + "</span>";
    }).join("");
    var multi = visible.length > 1;
    $("#lbPrev").hidden = !multi;
    $("#lbNext").hidden = !multi;
    markStrip();
    setHash(slugOf(item));
  }

  function step(delta) {
    if (!visible.length) return;
    lbIndex = (lbIndex + delta + visible.length) % visible.length;
    paintLightbox(delta);
  }

  /* ---- the filmstrip under the picture: the rest of the set, one tap away ---- */
  function buildStrip() {
    var strip = $("#lbStrip");
    if (visible.length < 2) { strip.innerHTML = ""; return; }
    strip.innerHTML = visible.map(function (w, i) {
      var media = (w.video && w.video.kind === "file" && w.video.id && !w.thumb)
        ? '<video src="' + esc(w.video.id) + '#t=0.1" preload="metadata" muted playsinline></video>'
        : '<img src="' + esc(w.thumb) + '" alt="" loading="lazy" decoding="async">';
      /* tabindex -1 on purpose: ← / → already walk the set, so 36 thumbnails
         should not become 36 stops on the way to the close button.          */
      return '<button type="button" class="lb-thumb" data-i="' + i + '" tabindex="-1">' + media + "</button>";
    }).join("");
  }

  function markStrip() {
    var thumbs = $$("#lbStrip .lb-thumb");
    thumbs.forEach(function (b, i) { b.classList.toggle("is-current", i === lbIndex); });
    var cur = thumbs[lbIndex];
    if (cur && cur.scrollIntoView) {
      cur.scrollIntoView({ block: "nearest", inline: "center",
        behavior: reducedMotion() ? "auto" : "smooth" });
    }
  }

  /* ---- our own video player ----------------------------------------------
     The browser's own control bar is exactly what makes a page look like a
     file preview, so local videos get this instead: one framed stage, a big
     play button, and a bar that fades away while the film runs.            */
  var ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.1v13.8L19 12z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3.1v14H8zM12.9 5H16v14h-3.1z"/></svg>',
    vol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.6h2.7L11 6.1v11.8L6.7 14.4H4z"/><path d="M14.4 9.4a3.6 3.6 0 0 1 0 5.2"/><path d="M17 6.9a7.2 7.2 0 0 1 0 10.2"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.6h2.7L11 6.1v11.8L6.7 14.4H4z"/><path d="M15 9.8l4.5 4.4M19.5 9.8 15 14.2"/></svg>',
    full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5V4.5h5M20 14.5v5h-5M20 9.5v-5h-5M4 14.5v5h5"/></svg>'
  };

  function reducedMotion() {
    return prefersCalm();
  }

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  /* older browsers return nothing from play() instead of a promise */
  function safePlay(v) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  function playerHtml(item) {
    var poster = item.full || item.thumb || "";
    /* no poster picture? #t=0.1 nudges the browser into painting a first frame */
    var src = esc(item.video.id) + (poster ? "" : "#t=0.1");
    return '<div class="lb-player" id="lbPlayer" data-state="idle">' +
      '<video id="lbVideo" src="' + src + '"' + (poster ? ' poster="' + esc(poster) + '"' : "") +
        ' playsinline preload="metadata"></video>' +
      '<button type="button" class="lb-bigplay" id="lbBigPlay" aria-label="' + esc(t("ui.play")) + '">' +
        ICON.play + "</button>" +
      '<div class="lb-controls">' +
        '<button type="button" class="lb-cbtn is-fill" id="lbPlay" aria-label="' + esc(t("ui.play")) + '">' +
          ICON.play + "</button>" +
        '<span class="lb-time" id="lbTime">0:00 / 0:00</span>' +
        '<div class="lb-scrub" id="lbScrub" role="slider" tabindex="0" aria-label="' + esc(t("ui.seek")) +
          '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
          '<div class="lb-buffered" id="lbBuf"></div>' +
          '<div class="lb-played" id="lbPlayed"></div>' +
          '<div class="lb-knob" id="lbKnob"></div>' +
        "</div>" +
        '<button type="button" class="lb-cbtn" id="lbMute" aria-label="' + esc(t("ui.mute")) + '">' +
          ICON.vol + "</button>" +
        '<button type="button" class="lb-cbtn" id="lbFull" aria-label="' + esc(t("ui.fullscreen")) + '">' +
          ICON.full + "</button>" +
      "</div>" +
    "</div>";
  }
  function wirePlayer() {
    var wrap = $("#lbPlayer"), v = $("#lbVideo");
    if (!wrap || !v) return;
    var scrub = $("#lbScrub"), played = $("#lbPlayed"), buf = $("#lbBuf"), knob = $("#lbKnob"),
        timeEl = $("#lbTime"), playBtn = $("#lbPlay"), bigBtn = $("#lbBigPlay"),
        muteBtn = $("#lbMute"), fullBtn = $("#lbFull");
    var hideTimer = null;

    function paintPlayState() {
      var running = !v.paused && !v.ended;
      playBtn.innerHTML = running ? ICON.pause : ICON.play;
      playBtn.setAttribute("aria-label", t(running ? "ui.pause" : "ui.play"));
      bigBtn.setAttribute("aria-label", t("ui.play"));
      wrap.setAttribute("data-state", running ? "playing" : (v.currentTime > 0.15 ? "paused" : "idle"));
    }
    function paintTime() {
      var pct = v.duration ? Math.min(100, (v.currentTime / v.duration) * 100) : 0;
      played.style.width = pct + "%";
      knob.style.insetInlineStart = pct + "%";
      timeEl.textContent = fmtTime(v.currentTime) + " / " + fmtTime(v.duration);
      scrub.setAttribute("aria-valuenow", Math.round(pct));
      scrub.setAttribute("aria-valuetext", fmtTime(v.currentTime) + " / " + fmtTime(v.duration));
    }
    function paintBuffered() {
      if (!v.duration || !v.buffered || !v.buffered.length) return;
      buf.style.width = (v.buffered.end(v.buffered.length - 1) / v.duration) * 100 + "%";
    }
    function toggle() { if (v.paused) safePlay(v); else v.pause(); }
    /* the bar hides itself while the film runs, and comes back on any move */
    function wake() {
      wrap.classList.add("is-active");
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { wrap.classList.remove("is-active"); }, 2400);
    }
    function seekTo(clientX) {
      if (!v.duration) return;
      var r = scrub.getBoundingClientRect();
      var p = r.width ? (clientX - r.left) / r.width : 0;
      if (document.documentElement.dir === "rtl") p = 1 - p;
      v.currentTime = Math.max(0, Math.min(1, p)) * v.duration;
      paintTime();
    }
    v.addEventListener("loadedmetadata", function () {
      /* let the frame take the film's own shape — vertical reels included */
      if (v.videoWidth && v.videoHeight) wrap.style.aspectRatio = v.videoWidth + " / " + v.videoHeight;
      paintTime(); paintBuffered();
    });
    v.addEventListener("timeupdate", paintTime);
    v.addEventListener("progress", paintBuffered);
    v.addEventListener("play", paintPlayState);
    v.addEventListener("pause", paintPlayState);
    v.addEventListener("ended", function () { paintPlayState(); wrap.classList.add("is-active"); });
    v.addEventListener("click", function () { toggle(); wake(); });
    wrap.addEventListener("mousemove", wake);
    wrap.addEventListener("touchstart", wake, { passive: true });

    playBtn.addEventListener("click", function () { toggle(); wake(); });
    bigBtn.addEventListener("click", function () { toggle(); wake(); });
    muteBtn.addEventListener("click", function () {
      v.muted = !v.muted;
      muteBtn.innerHTML = v.muted ? ICON.muted : ICON.vol;
      muteBtn.setAttribute("aria-label", t(v.muted ? "ui.unmute" : "ui.mute"));
      wake();
    });
    fullBtn.addEventListener("click", function () {
      var out = document.exitFullscreen || document.webkitExitFullscreen;
      var into = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
      if (document.fullscreenElement || document.webkitFullscreenElement) { if (out) out.call(document); }
      else if (into) into.call(wrap);
    });

    scrub.addEventListener("pointerdown", function (e) {
      wrap.classList.add("is-seeking");
      if (scrub.setPointerCapture) scrub.setPointerCapture(e.pointerId);
      seekTo(e.clientX);
    });
    scrub.addEventListener("pointermove", function (e) {
      if (wrap.classList.contains("is-seeking")) seekTo(e.clientX);
    });
    scrub.addEventListener("pointerup", function () { wrap.classList.remove("is-seeking"); });
    scrub.addEventListener("pointercancel", function () { wrap.classList.remove("is-seeking"); });
    /* ← / → on the bar scrub the film; stopPropagation keeps them from also
       stepping to the next piece in the set                                */
    scrub.addEventListener("keydown", function (e) {
      var d = 0;
      if (e.key === "ArrowRight") d = 5;
      else if (e.key === "ArrowLeft") d = -5;
      else if (e.key === "Home") d = -1e9;
      else if (e.key === "End") d = 1e9;
      else return;
      if (document.documentElement.dir === "rtl" && Math.abs(d) === 5) d = -d;
      v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d));
      paintTime();
      e.preventDefault();
      e.stopPropagation();
    });
    /* space anywhere in the player starts and stops it */
    wrap.addEventListener("keydown", function (e) {
      if (e.key !== " " && e.key !== "Spacebar") return;
      if (e.target.tagName === "BUTTON") return;
      toggle(); wake(); e.preventDefault(); e.stopPropagation();
    });

    paintPlayState();
    paintTime();
    wake();   /* show the bar for a moment when it opens, then let it fade */
    /* the click that opened the viewer is a user gesture, so this is allowed;
       if a browser refuses anyway the big play button is still sitting there */
    if (!reducedMotion()) safePlay(v);

  }

  /* ------------------------------ form ------------------------------ */

  function showError(input, msg) {
    var note = $('[data-err-for="' + input.id + '"]');
    if (note) note.textContent = msg || "";
    var field = input.closest(".field");
    if (field) field.classList.toggle("has-error", !!msg);
  }

  function validate(form) {
    var ok = true, first = null;
    [$("#f-name"), $("#f-type"), $("#f-message")].forEach(function (el) {
      showError(el, "");
      if (!el.value.trim()) { showError(el, t("form.errRequired")); ok = false; first = first || el; }
    });
    /* the phone is the one contact detail the form insists on: many clients
       here have WhatsApp and no mailbox, so the email beside it is optional.
       Six digits is the floor — enough to refuse "abc", short enough to let
       any real way of writing a number through.                            */
    var phone = $("#f-phone");
    showError(phone, "");
    if (phone.value.replace(/\D/g, "").length < 6) {
      showError(phone, t("form.errPhone")); ok = false; first = first || phone;
    }
    var email = $("#f-email");
    showError(email, "");
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      showError(email, t("form.errEmail")); ok = false; first = first || email;
    }
    var consent = $("#f-consent");
    showError(consent, "");
    if (!consent.checked) { showError(consent, t("form.errConsent")); ok = false; first = first || consent; }
    if (first) first.focus();
    return ok;
  }

  function status(kind, title, body) {
    var box = $("#formStatus");
    box.hidden = false;
    box.className = "form-status " + (kind === "ok" ? "is-ok" : "is-bad");
    box.innerHTML = "<strong>" + esc(title) + "</strong>" + esc(body);
  }

  /* ---- the tracking reference ---------------------------------------
     There is no server behind this page, so there is no shared counter:
     the "REQ-001" minted in one visitor's browser would collide with the
     REQ-001 minted in the next one's. The reference is therefore the day
     plus four random characters — unique in practice, and honest about
     not being a running total.                                          */
  var lastRef = null;                  // { sig: the values as text, ref: "REQ-…" }

  function newRef() {
    var d = new Date();
    var p2 = function (n) { return (n < 10 ? "0" : "") + n; };
    var chars = "ACDEFGHJKLMNPQRTUVWXY34679";   // no O/0, I/1, S/5, B/8: nothing to mistype
    var bytes = new Uint8Array(4), tail = "", i;
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
    for (i = 0; i < 4; i++) {
      tail += chars.charAt((bytes[i] || Math.floor(Math.random() * 256)) % chars.length);
    }
    return (window.SITE.requestPrefix || "REQ") + "-" +
      d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + "-" + tail;
  }

  /* one request keeps one number: pressing Send again without changing
     anything must not mint a second reference                          */
  function refFor(values) {
    var sig = JSON.stringify(values);
    if (!lastRef || lastRef.sig !== sig) lastRef = { sig: sig, ref: newRef() };
    return lastRef.ref;
  }

  function requestWa() {
    var s = window.SITE;
    return String(s.requestWhatsapp || s.whatsapp || "").replace(/\D/g, "");
  }

  /* the answers as labelled lines, in the language the visitor is reading.
     Both the WhatsApp prefill and the email fallback are built from this, so
     the two read the same way.                                             */
  function requestLines(ref, values, msg) {
    var lines = [t("form.reqWaIntro"), t("form.reqLabel") + ": " + ref, ""];
    [["wlName", values.name], ["wlEmail", values.email], ["wlPhone", values.phone],
      ["wlType", values.project_type], ["wlBudget", values.budget],
      ["wlDate", values.event_date], ["wlPlace", values.location]
    ].forEach(function (r) { if (r[1]) lines.push(t("form." + r[0]) + ": " + r[1]); });
    if (msg) lines.push("", t("form.wlMessage") + ":", msg);
    return lines;
  }

  /* what the visitor finds already written in WhatsApp */
  function waText(ref, values) {
    function build(msg) {
      return requestLines(ref, values, msg).join("\n");
    }
    var msg = values.message, text = build(msg);
    /* a very long prefill is cut by WhatsApp itself and by the URL limit of
       some browsers — Arabic costs six characters each once encoded, so the
       trimming has to watch the encoded length, not the plain one          */
    while (encodeURIComponent(text).length > 1800 && msg.length > 60) {
      msg = msg.slice(0, Math.floor(msg.length * 0.7));
      text = build(msg + "…");
    }
    return text;
  }

  function waHref(ref, values) {
    return "https://wa.me/" + requestWa() + "?text=" + encodeURIComponent(waText(ref, values));
  }

  /* the way out for a visitor with no WhatsApp: on a desktop that has never
     linked WhatsApp Web, wa.me only reaches a QR-code page.              */
  function mailHref(ref, values) {
    return "mailto:" + window.SITE.email +
      "?subject=" + encodeURIComponent(ref + " — project request from " + values.name) +
      "&body=" + encodeURIComponent(requestLines(ref, values, values.message).join("\n"));
  }

  /* a real click opens the app more reliably than setting location.href,
     and it has to happen inside the submit gesture or the tab is blocked */
  function clickLink(href, newTab) {
    var a = document.createElement("a");
    a.href = href;
    if (newTab) { a.target = "_blank"; a.rel = "noopener"; }
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ---- what the visitor has just submitted ---- */
  var reqState = null;                 // { ref, values, mail: true | false | null }
  var sending = false;

  function paintFormBusy() {
    var btn = $("#submitBtn");
    if (!btn) return;
    btn.disabled = sending;
    btn.classList.toggle("is-loading", sending);
    $(".btn-label", btn).textContent = t(sending ? "form.sending" : "form.submit");
  }

  function paintRequest() {
    if (!reqState) return;
    var body = t("form.reqBody");
    if (reqState.mail === true) body += " " + t("form.reqMailed");
    if (reqState.mail === false) body += " " + t("form.reqMailFailed");
    status("ok", t("form.reqTitle").replace("{req}", reqState.ref), body);

    var box = $("#formHandoff");
    if (!box) return;
    $("#fhLabel").textContent = t("form.reqLabel");
    $("#fhNumber").textContent = reqState.ref;
    var copy = $("#fhCopy");
    copy.textContent = t("form.reqCopy");
    copy.setAttribute("aria-label", t("form.reqCopy") + " " + reqState.ref);
    var wa = $("#fhWa");
    wa.href = waHref(reqState.ref, reqState.values);
    wa.textContent = t("form.reqOpen");
    var mail = $("#fhMail");
    mail.href = mailHref(reqState.ref, reqState.values);
    mail.textContent = t("form.reqAlt");
    box.hidden = false;
  }

  /* keep the reference in this browser so the visitor can find it again.
     Their message is not kept — only the number, the day and what for.  */
  function rememberRef(ref, values) {
    try {
      var list = JSON.parse(localStorage.getItem(REQ_KEY) || "[]");
      if (!(list instanceof Array)) list = [];
      list.unshift({ ref: ref, at: new Date().toISOString(), type: values.project_type });
      localStorage.setItem(REQ_KEY, JSON.stringify(list.slice(0, 20)));
    } catch (e) { /* private mode or a full quota: nothing depends on this */ }
  }

  /* option 0 of each select is the "Choose…" placeholder and its value is empty:
     an untouched budget has to travel as nothing, not as the word "Choose…"  */
  function chosenText(sel) {
    var o = sel.options[sel.selectedIndex];
    return o && o.value ? o.text : "";
  }

  function formValues() {
    return {
      name: $("#f-name").value.trim(),
      email: $("#f-email").value.trim(),
      phone: $("#f-phone").value.trim(),
      project_type: $("#f-type").value,
      budget: chosenText($("#f-budget")),
      event_date: $("#f-date").value,
      location: $("#f-location").value.trim(),
      message: $("#f-message").value.trim(),
      page_language: lang
    };
  }

  /* one email copy through Web3Forms, so the request is written down
     somewhere the visitor's own device cannot lose it                */
  function postCopy(ref, values) {
    var payload = {
      access_key: window.SITE.web3formsKey,
      subject: ref + " — new project request from " + values.name,
      from_name: "Frames Studio website",
      request_number: ref
    };
    /* empty fields are left out of the copy entirely: Web3Forms reads
       "email" as the reply-to address, and an empty one is worse than
       none at all now that the visitor may not give one                */
    Object.keys(values).forEach(function (k) { if (values[k]) payload[k] = values[k]; });
    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
      .then(function (data) { return !!(data && data.success); })
      .catch(function () { return false; });
  }

  /* runs after WhatsApp has been handed the message, never before it:
     a slow network must not delay the thing the visitor asked for     */
  function emailCopy(ref, values) {
    sending = true;
    paintFormBusy();
    postCopy(ref, values).then(function (ok) {
      if (reqState) reqState.mail = ok;
      sending = false;
      paintFormBusy();
      paintRequest();
    });
  }

  /* no WhatsApp number configured at all: exactly what the site did before */
  function legacySubmit(values) {
    var ref = refFor(values);
    if (!window.SITE.web3formsKey) {
      status("bad", t("form.notConfiguredTitle"), t("form.notConfiguredBody"));
      clickLink(mailHref(ref, values), false);
      return;
    }
    sending = true;
    paintFormBusy();
    $("#formStatus").hidden = true;
    postCopy(ref, values).then(function (ok) {
      sending = false;
      paintFormBusy();
      if (ok) {
        status("ok", t("form.successTitle"), t("form.successBody"));
        $("#hireForm").reset();
        renderFormOptions();
      } else {
        status("bad", t("form.errorTitle"), t("form.errorBody") + " " + window.SITE.email);
      }
    });
  }

  function initForm() {
    var form = $("#hireForm");

    /* the button label and the panel are state, not markup: applyStrings()
       would otherwise reset them on every language switch                 */
    i18nHooks.push(paintFormBusy);
    i18nHooks.push(paintRequest);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if ($("#f-bot").value) return;                 // bot filled the trap
      if (!validate(form)) return;

      var values = formValues();
      if (!requestWa()) { legacySubmit(values); return; }

      var ref = refFor(values);
      reqState = { ref: ref, values: values, mail: null };
      /* WhatsApp is opened inside this very click. Waiting for a network
         call first would spend the user gesture and iOS Safari would block
         the tab — which is why nothing is awaited above this line.        */
      clickLink(waHref(ref, values), true);
      rememberRef(ref, values);
      paintRequest();
      /* the form is deliberately NOT reset: if the tab was blocked, the
         visitor still has their text and the panel still has the link    */
      if (window.SITE.web3formsKey) emailCopy(ref, values);
    });

    var copyBtn = $("#fhCopy");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      if (!reqState) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(reqState.ref)
          .then(function () { toast(t("form.reqCopied")); })
          .catch(function () { toast(reqState.ref); });
        return;
      }
      toast(reqState.ref);
    });

    /* clear an error as soon as the visitor fixes the field */
    form.addEventListener("input", function (ev) {
      if (ev.target.id) showError(ev.target, "");
    });
  }

  /* ------------------------------ reveal on scroll ------------------------------ */
  var revealer = null;
  function observeReveals(root) {
    var items = $$(".reveal", root || document);
    if (prefersCalm() || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!revealer) {
      revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); revealer.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    items.forEach(function (el) { if (!el.classList.contains("is-in")) revealer.observe(el); });
  }

  /* ------------------------------ chrome ------------------------------ */
  function initHeader() {
    var header = $("#siteHeader");
    var nav = $("#primaryNav");
    var toggle = $("#menuToggle");
    var top = $("#toTop");

    window.addEventListener("scroll", function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-stuck", y > 8);
      top.classList.toggle("is-visible", y > 600);
    }, { passive: true });

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    /* highlight the section you are reading */
    var links = $$(".nav a");
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["work", "services", "process", "about", "contact"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) spy.observe(el);
      });
    }
  }

  function initGallery() {
    $("#workFilters").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      $("#workFilters").setAttribute("data-active", chip.getAttribute("data-cat"));
      $$(".chip").forEach(function (c) { c.setAttribute("aria-selected", c === chip ? "true" : "false"); });
      renderWork();
    });

    $("#workGrid").addEventListener("click", function (e) {
      var opener = e.target.closest(".work-open");
      if (opener) openLightbox(parseInt(opener.getAttribute("data-index"), 10));
    });

    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbShare").addEventListener("click", shareCurrent);
    $("#lbPrev").addEventListener("click", function () { step(-1); });
    $("#lbNext").addEventListener("click", function () { step(1); });
    /* the filmstrip jumps straight to a piece */
    $("#lbStrip").addEventListener("click", function (e) {
      var b = e.target.closest(".lb-thumb");
      if (!b) return;
      var i = parseInt(b.getAttribute("data-i"), 10);
      if (i === lbIndex) return;
      var dir = i > lbIndex ? 1 : -1;
      lbIndex = i;
      paintLightbox(dir);
    });
    $("#lightbox").addEventListener("click", function (e) {
      /* clicking the dark space around the frame closes the viewer */
      if (!e.target.closest(".lb-frame, .lb-caption, .lb-bar, .lb-strip, button")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!$("#lightbox").classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(document.documentElement.dir === "rtl" ? -1 : 1);
      else if (e.key === "ArrowLeft") step(document.documentElement.dir === "rtl" ? 1 : -1);
      else if (e.key === "Tab") {
        e.preventDefault();
        /* the filmstrip is left out on purpose — see buildStrip() */
        var keys = $$("#lightbox button").filter(function (b) { return !b.hidden && b.tabIndex !== -1; });
        var at = keys.indexOf(document.activeElement);
        keys[(at + (e.shiftKey ? -1 : 1) + keys.length) % keys.length].focus();
      }
    });

    /* swipe on phones — but not when the finger started on the video controls */
    var x0 = null;
    var lb = $("#lightbox");
    lb.addEventListener("touchstart", function (e) {
      x0 = e.target.closest(".lb-controls, .lb-strip") ? null : e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* jump straight to the form with the right service pre-selected */
  function initServiceShortcut() {
    $("#servicesGrid").addEventListener("click", function (e) {
      var cta = e.target.closest(".svc-cta");
      if (!cta) return;
      var wanted = cta.getAttribute("data-service");
      var sel = $("#f-type");
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === wanted) { sel.selectedIndex = i; break; }
      }
      document.getElementById("contact").scrollIntoView({ behavior: prefersCalm() ? "auto" : "smooth" });
      window.setTimeout(function () { $("#f-name").focus(); }, prefersCalm() ? 0 : 500);
    });
  }

  /* ---- hero reel: the clip in the third frame plays itself, muted and on a
     loop, and the whole frame is a button, so a visitor can stop it and start
     it again. Anyone who asked their system for less motion gets the still
     frame and the same button, should they want to watch it after all.  */
  function initHeroReel() {
    var frame = document.getElementById("heroReel");
    var vid = frame && frame.querySelector("video");
    var btn = document.getElementById("heroReelToggle");
    if (!vid) return;

    /* the badge, the class and the label all follow the video itself */
    function paintReel() {
      var running = !vid.paused;
      frame.classList.toggle("is-playing", running);
      if (btn) btn.setAttribute("aria-label", t(running ? "ui.pause" : "ui.play"));
    }

    vid.addEventListener("play", paintReel);
    vid.addEventListener("playing", paintReel);
    vid.addEventListener("pause", paintReel);
    if (btn) {
      btn.addEventListener("click", function () {
        if (vid.paused) safePlay(vid);
        else vid.pause();
      });
    }
    /* applyStrings() cannot fill a label that changes with the state */
    i18nHooks.push(paintReel);

    if (!prefersCalm()) {
      var started = vid.play();
      /* the browser blocked it: keep the still, and keep saying "Play" */
      if (started && started.catch) started.catch(function () { paintReel(); });
    }
    paintReel();
  }

  /* ------------------------------ start ------------------------------ */
  function init() {
    initTheme();
    $$(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
    });
    setLang(detectLang(), false);
    initHeader();
    initGallery();
    initHeroReel();
    initForm();
    initServiceShortcut();
    observeReveals(document);
    $("#year").textContent = new Date().getFullYear();
    openFromHash();
    window.addEventListener("hashchange", function () {
      var open = $("#lightbox").classList.contains("is-open");
      if (/(?:^|#)p=/.test(location.hash || "")) { if (!open) openFromHash(); }
      else if (open) closeLightbox();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();










