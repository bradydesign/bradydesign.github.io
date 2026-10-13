/* 张博 Brady Zhang — 作品集交互
   1) 大标题按容器宽度自动铺满（.fit）
   2) 滚动进入视口时加 .in，触发 CSS 滑入 / 揭开动效
   3) 首页项目索引：悬停时封面跟随鼠标
   原生 JS，无第三方库。 */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 大字铺满行宽 ---------- */
  var fits = [].slice.call(document.querySelectorAll(".fit"));

  function fitOne(el) {
    var lines = el.querySelectorAll(".ln > span");
    if (!lines.length) return;
    var W = el.clientWidth;
    var narrow = window.innerWidth <= 760;
    el.classList.remove("is-wrap");
    el.style.fontSize = "100px";
    // 每行可用宽度 = 容器宽 - 该行缩进；取最紧的一行
    var size = Infinity;
    for (var i = 0; i < lines.length; i++) {
      var w = lines[i].getBoundingClientRect().width;
      var indent = parseFloat(getComputedStyle(lines[i].parentNode).paddingLeft) || 0;
      if (w) size = Math.min(size, (100 * (W - indent)) / w);
    }
    if (!isFinite(size) || !W) return;
    size *= 0.995;
    var max = parseFloat(el.dataset.max) || W / 3.2;

    if (narrow && el.dataset.m) {
      // 手机：按“每行字数”定字号，允许自然折行
      size = W / parseFloat(el.dataset.m) / 0.97;
      el.classList.add("is-wrap");
    } else {
      var min = narrow ? W / 8.5 : Math.min(48, W / 10);
      if (narrow && el.querySelector(".t-main")) min = W / 7.5;
      if (size < min) {
        size = min;
        el.classList.add("is-wrap");
      }
    }
    el.style.fontSize = Math.min(size, max).toFixed(2) + "px";
  }

  function fitAll() { fits.forEach(fitOne); }
  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  var lastW = window.innerWidth, rt;
  window.addEventListener("resize", function () {
    if (window.innerWidth === lastW) return; // 忽略手机地址栏伸缩
    lastW = window.innerWidth;
    clearTimeout(rt);
    rt = setTimeout(fitAll, 80);
  });

  /* ---------- 2. 滚动揭开 ---------- */
  var sel = [
    ".fit", ".project-cover", ".g-item", ".portrait", ".gallery > figure", ".chapter-label", ".chapter-body",
    ".split > *", ".hero-meta li", ".cta-item", ".meta > div", ".project-intro", ".page-hero .lead",
    ".hero > .eyebrow", ".section-head", ".g-head", ".g-note", ".g-toc", ".idx .card", ".project-award",
    ".footer-lead", ".footer-contact"
  ].join(",");
  var targets = [].slice.call(document.querySelectorAll(sel));

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var batch = 0, frame;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        if (el.classList.contains("card")) el.style.setProperty("--i", batch++ % 8);
        el.classList.add("in");
        io.unobserve(el);
      });
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () { batch = 0; });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    targets.forEach(function (el) { io.observe(el); });

    // 快速滚动或点目录跳转时，越过视口的元素不会触发 IO，这里补上
    var pending = targets, st = 0;
    function sweep() {
      st = 0;
      var vh = window.innerHeight;
      pending = pending.filter(function (el) {
        if (el.classList.contains("in")) return false;
        if (el.getBoundingClientRect().top < vh) { el.classList.add("in"); io.unobserve(el); return false; }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() { if (!st) st = setTimeout(sweep, 120); }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. 首页索引：封面跟随鼠标 ---------- */
  var idx = document.querySelector(".idx");
  var hoverMQ = window.matchMedia("(hover: hover) and (min-width: 900px)");
  if (idx) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = null;

    function target(e) {
      var media = active && active.querySelector(".media");
      var w = media ? media.offsetWidth : 360;
      var h = media ? media.offsetHeight : 270;
      var x = e.clientX + 28;
      if (x + w > window.innerWidth - 16) x = e.clientX - w - 28;
      var y = e.clientY - h / 2;
      tx = x;
      ty = Math.max(16, Math.min(y, window.innerHeight - h - 16));
    }
    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      idx.style.setProperty("--px", cx.toFixed(1) + "px");
      idx.style.setProperty("--py", cy.toFixed(1) + "px");
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    }
    idx.addEventListener("pointermove", function (e) {
      if (!hoverMQ.matches || e.pointerType !== "mouse") return;
      var a = e.target.closest && e.target.closest(".card a");
      var entering = a !== active;
      active = a;
      target(e);
      if (entering || reduce) { cx = tx; cy = ty; }
      if (reduce) { loop(); return; }
      if (!raf) raf = requestAnimationFrame(loop);
    });
    idx.addEventListener("pointerleave", function () { active = null; });
  }
})();
