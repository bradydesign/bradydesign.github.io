# 张博 Brady Zhang · 品牌设计作品集

网站地址：https://bradydesign.github.io

纯静态 HTML + CSS 网站，由 GitHub Pages 托管。

## 设计说明

- 瑞士网格 / 大字排版：12 栏网格（手机端 4 栏），配色仅白、黑与强调红 `#E10600`。样式见 `assets/css/style.css`。
- 英文字体 Inter Tight，取自 npm 包 `@fontsource-variable/inter-tight`（OFL-1.1），自托管于 `assets/fonts/`，不依赖 Google Fonts；中文使用系统字体。
- 交互脚本 `assets/js/main.js`（原生 JS，无第三方库）：大标题自动铺满行宽、IntersectionObserver 滚动揭开、首页索引悬停封面预览；遵循 `prefers-reduced-motion`。
