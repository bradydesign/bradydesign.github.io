# 张博 Brady Zhang · 品牌设计作品集

网站地址：https://bradydesign.github.io

纯静态 HTML + CSS 网站，由 GitHub Pages 托管。

## 设计说明

- 杂志版式：12 栏网格（手机端 4 栏），衬线标题、细线分隔与图注；配色仅白、黑与强调红 `#E10600`。样式见 `assets/css/style.css`。
- 英文字体 Instrument Serif（标题）与 Inter Tight（正文 / 标签），取自 npm 包 `@fontsource/instrument-serif`、`@fontsource-variable/inter-tight`（均为 OFL-1.1），自托管于 `assets/fonts/`，不依赖 Google Fonts；中文使用系统宋体 / 黑体。
- 交互脚本 `assets/js/main.js`（原生 JS，无第三方库）：IntersectionObserver 滚动滑入 / 图片揭开、页脚署名铺满行宽；遵循 `prefers-reduced-motion`。
