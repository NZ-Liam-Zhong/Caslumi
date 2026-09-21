/* ==========================================================================
   Caslumi — shared shell (header, footer, menu, motion, RFQ form)
   ========================================================================== */

(function () {
  "use strict";

  var CFG = window.CASLUMI || {};

  /* ---------------------------------------------------------------- nav data */

  var PRODUCTS = [
    ["product-aluminum-outdoor-furniture.html", "Aluminum Outdoor Furniture", "Sofas, dining sets, loungers"],
    ["product-furniture-frames-components.html", "Furniture Frames & Components", "Frames, legs, armrests, brackets"],
    ["product-fire-pit-tables.html", "Fire Pit Tables", "Burner-ready structures & enclosures"],
    ["product-outdoor-kitchen.html", "Outdoor Kitchen & Grill Islands", "Modular cabinetry structures"],
    ["product-hdpe-outdoor-furniture.html", "HDPE Outdoor Furniture", "Slats, seating, mixed-material"],
    ["product-custom-aluminum-profiles.html", "Custom Aluminum Profiles", "Die development to finished bar"],
    ["product-oem-odm.html", "OEM / ODM Products", "Build to your drawing or sample"]
  ];

  var CAPABILITIES = [
    ["manufacturing.html", "Manufacturing Capabilities", "Extrusion to packing, in one network"],
    ["custom-manufacturing.html", "Custom Manufacturing / OEM", "Drawing → mold → mass production"],
    ["quality.html", "Quality & Inspection", "Seven-stage inspection flow"]
  ];

  var COMPANY = [
    ["about.html", "About Us", "Who we are and how we are set up"],
    ["why-us.html", "Why Caslumi", "What we do differently"],
    ["projects.html", "Case Studies", "Real programs, start to finish"],
    ["contact.html", "Contact", "Talk to a person, not a form robot"]
  ];

  var CARET = '<svg class="nav-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg>';

  var LOGO_MARK =
    '<svg class="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
      '<rect x="1.4" y="1.4" width="37.2" height="37.2" rx="9" stroke="currentColor" stroke-opacity=".22" stroke-width="1.6"/>' +
      '<path d="M11 12.5h18v4.2H15.4v6.6H29v4.2H11z" fill="#b85c26"/>' +
      '<path d="M19.6 18.9h9.4v2.4h-9.4z" fill="currentColor" fill-opacity=".45"/>' +
    '</svg>';

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function logo(sub) {
    return '<a class="logo" href="index.html" aria-label="' + esc(CFG.name) + ' home">' +
      LOGO_MARK +
      '<span class="logo-text">' +
        '<span class="logo-name">' + esc(CFG.name) + '</span>' +
        '<span class="logo-sub">' + esc(sub || CFG.tagline) + '</span>' +
      '</span></a>';
  }

  function dropdown(items) {
    return '<div class="dropdown">' + items.map(function (i) {
      return '<a href="' + i[0] + '">' + esc(i[1]) + '<small>' + esc(i[2]) + '</small></a>';
    }).join("") + '</div>';
  }

  /* ------------------------------------------------------------------ header */

  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;

    var topbarFacts =
      '<span><i class="topbar-dot"></i>China &amp; Cambodia production</span>' +
      '<span><i class="topbar-dot"></i>OEM / ODM from your drawing</span>' +
      '<span><i class="topbar-dot"></i>Serving the U.S. market</span>';

    var contactBits = [];
    if (CFG.email) contactBits.push('<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.emailLabel || CFG.email) + '</a>');
    if (CFG.phone) contactBits.push('<a href="tel:' + esc(CFG.phone.replace(/[^\d+]/g, "")) + '">' + esc(CFG.phone) + '</a>');

    host.innerHTML =
      '<div class="topbar"><div class="wrap">' +
        '<div class="topbar-facts">' + topbarFacts + '</div>' +
        '<div class="topbar-facts">' + contactBits.join("") + '</div>' +
      '</div></div>' +
      '<div class="site-header"><div class="wrap"><nav class="nav" aria-label="Main">' +
        logo() +
        '<div class="nav-links">' +
          '<div class="nav-item"><a class="nav-link" href="products.html">Products' + CARET + '</a>' +
            dropdown([["products.html", "All Products", "Full range overview"]].concat(PRODUCTS)) + '</div>' +
          '<div class="nav-item"><a class="nav-link" href="manufacturing.html">Capabilities' + CARET + '</a>' +
            dropdown(CAPABILITIES) + '</div>' +
          '<a class="nav-link" href="supply-network.html">China + Cambodia</a>' +
          '<a class="nav-link" href="industries.html">Industries</a>' +
          '<div class="nav-item"><a class="nav-link" href="about.html">Company' + CARET + '</a>' +
            dropdown(COMPANY) + '</div>' +
        '</div>' +
        '<a class="btn btn--primary btn--sm nav-cta" href="rfq.html">Request a Quote</a>' +
        '<button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-drawer"><span></span></button>' +
      '</nav></div></div>' +
      '<div class="drawer" id="site-drawer">' +
        '<a href="index.html">Home</a>' +
        '<a href="products.html">Products</a>' +
        PRODUCTS.map(function (p) { return '<a class="drawer-sub" href="' + p[0] + '">' + esc(p[1]) + '</a>'; }).join("") +
        CAPABILITIES.map(function (p) { return '<a href="' + p[0] + '">' + esc(p[1]) + '</a>'; }).join("") +
        '<a href="supply-network.html">China + Cambodia Network</a>' +
        '<a href="industries.html">Industries</a>' +
        COMPANY.map(function (p) { return '<a href="' + p[0] + '">' + esc(p[1]) + '</a>'; }).join("") +
        '<a class="btn btn--primary btn--block" href="rfq.html">Request a Quote</a>' +
      '</div>';

    markCurrent(host);
    wireMenu(host);
  }

  function markCurrent(host) {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = host.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href") === here) links[i].setAttribute("aria-current", "page");
    }
  }

  function wireMenu(host) {
    var burger = host.querySelector(".burger");
    if (!burger) return;

    function close() {
      document.body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
    }

    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    host.querySelectorAll(".drawer a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1100) close(); });
  }

  /* ------------------------------------------------------------------ footer */

  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;

    var contact = [];
    if (CFG.email) contact.push('<li><a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.emailLabel || CFG.email) + '</a></li>');
    contact.push('<li>' + (CFG.phone ? '<a href="tel:' + esc(CFG.phone.replace(/[^\d+]/g, "")) + '">' + esc(CFG.phone) + '</a>' : 'U.S. phone — coming soon') + '</li>');
    if (CFG.whatsapp) contact.push('<li><a href="https://wa.me/' + esc(CFG.whatsapp) + '" rel="noopener">WhatsApp</a></li>');
    if (CFG.wechat) contact.push('<li>WeChat: ' + esc(CFG.wechat) + '</li>');
    contact.push('<li>Jiangmen, Guangdong, China</li>');
    contact.push('<li>Phnom Penh area, Cambodia</li>');

    host.className = "site-footer";
    host.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' + logo() +
            '<p class="footer-about">Aluminum outdoor furniture components, fire pit structures and custom manufacturing — produced across seven partner plants in China and finished-goods capacity in Cambodia, for buyers in the United States.</p>' +
            '<a class="btn btn--primary btn--sm mt-24" href="rfq.html">Send Your Drawing</a>' +
          '</div>' +
          '<div class="footer-col"><h4>Products</h4><ul>' +
            PRODUCTS.slice(0, 6).map(function (p) { return '<li><a href="' + p[0] + '">' + esc(p[1]) + '</a></li>'; }).join("") +
            '<li><a href="products.html">All products</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Capabilities</h4><ul>' +
            '<li><a href="manufacturing.html">Manufacturing</a></li>' +
            '<li><a href="custom-manufacturing.html">OEM &amp; ODM</a></li>' +
            '<li><a href="quality.html">Quality &amp; Inspection</a></li>' +
            '<li><a href="supply-network.html">China + Cambodia</a></li>' +
            '<li><a href="industries.html">Industries served</a></li>' +
            '<li><a href="projects.html">Case studies</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Contact</h4><ul>' + contact.join("") + '</ul></div>' +
        '</div>' +
        '<div class="footer-bar">' +
          '<span>&copy; ' + new Date().getFullYear() + ' ' + esc(CFG.name) + '. All rights reserved.</span>' +
          '<span><a href="rfq.html">Request a Quote</a> &nbsp;·&nbsp; <a href="contact.html">Contact</a></span>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------ motion */

  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------- RFQ form */

  function mailtoFallback(form) {
    var lines = [];
    new FormData(form).forEach(function (value, key) {
      if (key === "_hp" || key === "access_key" || key === "subject" || value instanceof File) return;
      if (String(value).trim()) lines.push(key.replace(/_/g, " ") + ": " + value);
    });
    lines.push("", "(Sent from the Caslumi website. Drawings can be attached to this email.)");
    return "mailto:" + CFG.email +
      "?subject=" + encodeURIComponent("RFQ from the website") +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function wireForm() {
    var form = document.getElementById("rfq-form");
    if (!form) return;

    var status = form.querySelector(".form-status");
    var submit = form.querySelector('[type="submit"]');
    var live = Boolean(CFG.formAccessKey) || /formspree/.test(CFG.formEndpoint || "");

    if (!live) {
      var note = form.querySelector(".form-note");
      if (note) {
        note.innerHTML = "This form is not connected to a mail service yet, so sending will open your email " +
          "client with the details filled in. Attach your drawing there and hit send.";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="_hp"]') && form.querySelector('[name="_hp"]').value) return;

      if (!live) { window.location.href = mailtoFallback(form); return; }

      var data = new FormData(form);
      if (CFG.formAccessKey) data.append("access_key", CFG.formAccessKey);
      data.append("subject", "New RFQ — " + (data.get("company") || data.get("name") || "Website"));

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = "Sending…";
      status.className = "form-status";

      fetch(CFG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.body && res.body.message ? res.body.message : "Request failed");
          status.className = "form-status is-ok";
          status.textContent = "Thank you — your request is in. We reply to every RFQ within one business day.";
          form.reset();
        })
        .catch(function () {
          status.className = "form-status is-err";
          status.innerHTML = 'Something went wrong sending the form. Please email us directly at ' +
            '<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.emailLabel || CFG.email) + '</a>.';
        })
        .finally(function () { submit.disabled = false; submit.textContent = label; });
    });
  }

  /* ------------------------------------------------------------------- boot */

  function init() {
    buildHeader();
    buildFooter();
    wireReveal();
    wireForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
