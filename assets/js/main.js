/* 张博 Brady Zhang — 作品集交互
   1) 页脚署名按宽度铺满（.fit）
   2) 滚动进入视口时加 .in，触发 CSS 滑入 / 揭开动效
   原生 JS，无第三方库。 */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 铺满行宽 ---------- */
  var fits = [].slice.call(document.querySelectorAll(".fit"));

  function fitOne(el) {
    var line = el.querySelector(".ln > span");
    var W = el.clientWidth;
    if (!line || !W) return;
    el.style.fontSize = "100px";
    var w = line.getBoundingClientRect().width;
    if (w) el.style.fontSize = ((100 * W) / w * 0.99).toFixed(2) + "px";
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
    ".lines", ".fit", ".project-cover", ".g-item", ".portrait", ".gallery > figure", ".chapter-label", ".chapter-body",
    ".split > *", ".hero-meta li", ".cta-item", ".meta > div", ".project-intro", ".page-hero .lead",
    ".hero > .eyebrow", ".section-head", ".g-head", ".g-note", ".g-toc", ".idx .card", ".project-award",
    ".footer-lead", ".footer-contact"
  ].join(",");
  var targets = [].slice.call(document.querySelectorAll(sel));

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
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
})();
