# 张博 Brady Zhang · 品牌设计作品集

网站地址：https://bradydesign.github.io

纯静态 HTML + CSS 网站，由 GitHub Pages 托管。

## 设计说明

- 图片优先的极简版式：首页头条通栏大图、黑底标语区、1/3 与 2/3 交错的作品网格；详情页大图先行、标题与简介分栏。配色仅白、黑与强调红 `#E10600`。样式见 `assets/css/style.css`。
- 英文字体 Inter Tight，取自 npm 包 `@fontsource-variable/inter-tight`（OFL-1.1），自托管于 `assets/fonts/`，不依赖 Google Fonts；中文使用系统字体。
- 交互脚本 `assets/js/main.js`（原生 JS，无第三方库）：IntersectionObserver 滚动淡入；遵循 `prefers-reduced-motion`。
