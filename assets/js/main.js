// Small progressive enhancements. The site works without this file.
(function () {
  var root = document.documentElement;

  // Theme toggle (initial theme is set by the inline script in <head>)
  var toggle = document.querySelector(".theme-toggle");
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncToggle() {
    if (!toggle) return;
    var dark = currentTheme() === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  if (toggle) {
    syncToggle();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.classList.add("no-transitions");
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncToggle();
      window.setTimeout(function () { root.classList.remove("no-transitions"); }, 0);
    });
  }

  // Mobile menu
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  function closeMenu(returnFocus) {
    if (!nav || !menuBtn) return;
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    if (returnFocus) menuBtn.focus();
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu(false);
    });
  }

  // Project filter
  var filter = document.querySelector(".filter");
  if (filter) {
    filter.hidden = false;
    var items = document.querySelectorAll(".project-grid > li");
    var status = document.getElementById("filter-status");
    filter.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var value = btn.getAttribute("data-filter");
      filter.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      var shown = 0;
      items.forEach(function (li) {
        var match = value === "all" || li.getAttribute("data-category") === value;
        li.hidden = !match;
        if (match) shown++;
      });
      if (status) status.textContent = shown + (shown === 1 ? " project shown" : " projects shown");
    });
  }

  // Highlight the section in view
  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = map[entry.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Copy email
  var copyBtn = document.querySelector("[data-copy]");
  if (copyBtn && navigator.clipboard) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", function () {
      var label = copyBtn.querySelector("span");
      navigator.clipboard.writeText(copyBtn.getAttribute("data-copy")).then(function () {
        if (label) {
          label.textContent = "Copied";
          window.setTimeout(function () { label.textContent = "Copy"; }, 2000);
        }
      });
    });
  }

  // Services schema: draw PK -> FK relationship lines with crow's-foot notation
  var canvas = document.querySelector(".erd-canvas");
  if (canvas && canvas.querySelector(".erd-lines")) {
    var svg = canvas.querySelector(".erd-lines");
    var NS = "http://www.w3.org/2000/svg";
    var links = Array.prototype.map.call(canvas.querySelectorAll(".erd-links span"), function (el) {
      return { from: el.getAttribute("data-from"), to: el.getAttribute("data-to"), key: el.getAttribute("data-key") };
    });
    function rowRect(table, key, cls) {
      var t = canvas.querySelector('[data-table="' + table + '"]');
      if (!t) return null;
      var row = t.querySelector('li.' + cls + '[data-col="' + key + '"]') || t.querySelector("li." + cls);
      var base = canvas.getBoundingClientRect();
      var r = (row || t).getBoundingClientRect();
      var tr = t.getBoundingClientRect();
      return { left: tr.left - base.left, right: tr.right - base.left, top: tr.top - base.top, bottom: tr.bottom - base.top,
               y: r.top - base.top + r.height / 2, cx: tr.left - base.left + tr.width / 2 };
    }
    function el(name, attrs) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var w = canvas.clientWidth, h = canvas.clientHeight;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("width", w); svg.setAttribute("height", h);
      links.forEach(function (l) {
        var a = rowRect(l.from, l.key, "pk"), b = rowRect(l.to, l.key, "fk");
        if (!a || !b) return;
        var g = el("g", { "class": "rel", "data-from": l.from, "data-to": l.to });
        var d, ax, ay, bx, by, dir;
        if (b.left >= a.right - 1) {            // child is to the right
          ax = a.right; ay = a.y; bx = b.left; by = b.y; dir = 1;
        } else if (a.left >= b.right - 1) {     // child is to the left
          ax = a.left; ay = a.y; bx = b.right; by = b.y; dir = -1;
        } else {                                // same column: route down the outer right side
          var off = 20;
          ax = a.right; ay = a.y; bx = b.right; by = b.y;
          var rx = Math.max(ax, bx) + off;
          d = "M" + ax + " " + ay + " H" + rx + " V" + by + " H" + bx;
          g.appendChild(el("path", { d: d }));
          g.appendChild(el("path", { "class": "one", d: "M" + (ax + 7) + " " + (ay - 6) + " v12" }));
          g.appendChild(el("path", { "class": "many", d: "M" + (bx + 9) + " " + by + " L" + bx + " " + (by - 6) + " M" + (bx + 9) + " " + by + " L" + bx + " " + (by + 6) + " M" + (bx + 9) + " " + by + " H" + bx }));
          svg.appendChild(g); return;
        }
        var mx = (ax + bx) / 2;
        d = "M" + ax + " " + ay + " H" + mx + " V" + by + " H" + bx;
        g.appendChild(el("path", { d: d }));
        g.appendChild(el("path", { "class": "one", d: "M" + (ax + dir * 7) + " " + (ay - 6) + " v12" }));
        g.appendChild(el("path", { "class": "many", d: "M" + (bx - dir * 9) + " " + by + " L" + bx + " " + (by - 6) + " M" + (bx - dir * 9) + " " + by + " L" + bx + " " + (by + 6) + " M" + (bx - dir * 9) + " " + by + " H" + bx }));
        svg.appendChild(g);
      });
    }
    Array.prototype.forEach.call(canvas.querySelectorAll(".tbl"), function (t) {
      var name = t.getAttribute("data-table");
      function set(on) {
        Array.prototype.forEach.call(svg.querySelectorAll(".rel"), function (g) {
          var hit = g.getAttribute("data-from") === name || g.getAttribute("data-to") === name;
          g.classList.toggle("hot", on && hit);
          g.classList.toggle("dim", on && !hit);
        });
      }
      t.addEventListener("mouseenter", function () { set(true); });
      t.addEventListener("mouseleave", function () { set(false); });
    });
    draw();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    window.addEventListener("load", draw);
    if (window.ResizeObserver) new ResizeObserver(draw).observe(canvas);
    else window.addEventListener("resize", draw);
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
