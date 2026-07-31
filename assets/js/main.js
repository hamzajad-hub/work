/* =========================================================
   main.js — language switch, theme, gallery, viewer, form.
   No framework, no build step: just open index.html.
   ========================================================= */
(function () {
  "use strict";

  var LANG_KEY = "framesstudio.lang";
  var THEME_KEY = "framesstudio.theme";
  var FALLBACK = "en";
  var codes = window.LANGS.map(function (l) { return l.code; });
  var lang = FALLBACK;
  var visible = [];          // work items currently shown
  var lbIndex = 0;
  var lastFocus = null;

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
    var keep = typeSel.value;
    var opts = ['<option value="" disabled selected>' + esc(t("form.selectPlaceholder")) + "</option>"];
    window.SERVICES.forEach(function (s) {
      opts.push('<option value="' + esc(pick(s.title)) + '">' + esc(pick(s.title)) + "</option>");
    });
    opts.push('<option value="' + esc(pick(window.OTHER_OPTION)) + '">' + esc(pick(window.OTHER_OPTION)) + "</option>");
    typeSel.innerHTML = opts.join("");
    if (keep) typeSel.value = keep;

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
    paintLightbox();
    $("#lbClose").focus();
  }

  function closeLightbox() {
    var box = $("#lightbox");
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    $("#lbStage").innerHTML = "";                 // stops any playing video
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

  function paintLightbox() {
    var item = visible[lbIndex];
    if (!item) return;
    var stage = $("#lbStage");
    var v = item.video;
    if (v && v.id) {
      var src = v.kind === "vimeo"
        ? "https://player.vimeo.com/video/" + encodeURIComponent(v.id)
        : v.kind === "file"
          ? null
          : "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) + "?rel=0";
      stage.innerHTML = src
        ? '<iframe src="' + esc(src) + '" title="' + esc(pick(item.title)) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>'
        : '<video src="' + esc(v.id) + '"' + (item.full ? ' poster="' + esc(item.full) + '"' : "") + ' controls playsinline></video>';
    } else {
      stage.innerHTML = '<img src="' + esc(item.full || item.thumb) + '" alt="' + esc(pick(item.title)) + '">';
    }
    $("#lbTitle").textContent = pick(item.title);
    $("#lbMeta").textContent = pick(item.desc) + "  ·  " +
      t("ui.counter").replace("{i}", lbIndex + 1).replace("{n}", visible.length);
    var multi = visible.length > 1;
    $("#lbPrev").hidden = !multi;
    $("#lbNext").hidden = !multi;
    setHash(slugOf(item));
  }

  function step(delta) {
    if (!visible.length) return;
    lbIndex = (lbIndex + delta + visible.length) % visible.length;
    paintLightbox();
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
    [$("#f-name"), $("#f-email"), $("#f-type"), $("#f-message")].forEach(function (el) {
      showError(el, "");
      if (!el.value.trim()) { showError(el, t("form.errRequired")); ok = false; first = first || el; }
    });
    var email = $("#f-email");
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

  function mailtoFallback(values) {
    var lines = Object.keys(values).map(function (k) { return k + ": " + values[k]; }).join("\n");
    var href = "mailto:" + window.SITE.email +
      "?subject=" + encodeURIComponent("Project request — " + values.name) +
      "&body=" + encodeURIComponent(lines);
    /* a real click opens the mail app more reliably than setting location.href */
    var a = document.createElement("a");
    a.href = href;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function initForm() {
    var form = $("#hireForm");
    var btn = $("#submitBtn");
    var label = $(".btn-label", btn);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if ($("#f-bot").value) return;                 // bot filled the trap
      if (!validate(form)) return;

      var values = {
        name: $("#f-name").value.trim(),
        email: $("#f-email").value.trim(),
        phone: $("#f-phone").value.trim(),
        project_type: $("#f-type").value,
        budget: $("#f-budget").options[$("#f-budget").selectedIndex].text,
        event_date: $("#f-date").value,
        location: $("#f-location").value.trim(),
        message: $("#f-message").value.trim(),
        page_language: lang
      };

      if (!window.SITE.web3formsKey) {
        status("bad", t("form.notConfiguredTitle"), t("form.notConfiguredBody"));
        mailtoFallback(values);
        return;
      }

      btn.disabled = true;
      btn.classList.add("is-loading");
      label.textContent = t("form.sending");
      $("#formStatus").hidden = true;

      var payload = Object.assign({
        access_key: window.SITE.web3formsKey,
        subject: "New project request from " + values.name,
        from_name: "Frames Studio website"
      }, values);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return { success: r.ok }; }); })
        .then(function (data) {
          if (data && data.success) {
            status("ok", t("form.successTitle"), t("form.successBody"));
            form.reset();
            renderFormOptions();
          } else {
            status("bad", t("form.errorTitle"), t("form.errorBody") + " " + window.SITE.email);
          }
        })
        .catch(function () {
          status("bad", t("form.errorTitle"), t("form.errorBody") + " " + window.SITE.email);
        })
        .then(function () {
          btn.disabled = false;
          btn.classList.remove("is-loading");
          label.textContent = t("form.submit");
        });
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
    $("#lightbox").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) closeLightbox();      // click the backdrop
    });
    document.addEventListener("keydown", function (e) {
      if (!$("#lightbox").classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(document.documentElement.dir === "rtl" ? -1 : 1);
      else if (e.key === "ArrowLeft") step(document.documentElement.dir === "rtl" ? 1 : -1);
      else if (e.key === "Tab") {
        e.preventDefault();
        var keys = $$("#lightbox button").filter(function (b) { return !b.hidden; });
        var at = keys.indexOf(document.activeElement);
        keys[(at + (e.shiftKey ? -1 : 1) + keys.length) % keys.length].focus();
      }
    });

    /* swipe on phones */
    var x0 = null;
    var lb = $("#lightbox");
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
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
     loop. Visitors who asked their system for less motion keep the still
     frame with the play badge on it.                                    */
  function initHeroReel() {
    var frame = document.getElementById("heroReel");
    var vid = frame && frame.querySelector("video");
    if (!vid || prefersCalm()) return;
    vid.addEventListener("playing", function () { frame.classList.add("is-playing"); });
    vid.addEventListener("pause", function () { frame.classList.remove("is-playing"); });
    var played = vid.play();
    if (played && played.catch) played.catch(function () { /* browser blocked it: the still stays */ });
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










