# 个人官网重构 TD

> 状态：React 工程已重建并通过本地验证，已配置 GitHub 发布流程<br />
> 日期：2026-10-16<br />
> 受众、语言与内容沿用范围：用户已于 2026-10-16 确认<br />
> 仓库：<https://github.com/shuaiyafei/self-intro-website.github.io><br />
> 域名：`shuaiyafei.site`<br />
> 本地目录：`/Users/yafei.shuai/personal/work-self-intro-website/`

## 1. 方案摘要

将个人官网重建为可持续维护的静态网站，以「克制的未来感、柔和科技美学」表达个人风格。首页包含 Hero、关于我、作品 / 项目、随笔、联系五个模块。

主要面向技术同行与开源社区，以个人表达、工程思考和作品交流为主。网站文案沿用旧站的英文方向；个人信息、联系邮箱和项目成果数字按用户确认继续使用。

视觉采用炭黑基底、雾白文字、低饱和青蓝微光；通过排版、留白、材质和少量几何图形建立质感。主视觉是一件安静的抽象数字艺术作品，承托个人简介。内容始终处于视觉和交互的首要位置。

按用户确认采用 **React + TypeScript + Vite + 原生 CSS + Markdown 内容**，继续部署至 GitHub Pages。源码保存在同一仓库的 `main`，构建产物由 Actions 生成并提交至 `gh-pages`；Pages 发布同一份产物。

实施顺序：**TD → 首页高保真视觉稿 → 响应式源码重建 → 验收 → 发布**。视觉原型已完成，当前推进 React 工程实现。

2026-10-16 实施记录：首页视觉原型位于 `design/v1/index.html`。首屏改为通栏生成式材质图片，姓名 `Yafei Shuai` 为 H1，个人主张作为副标题；保留左侧文字、右侧视觉重心。导出规格与素材来源见 `design/v1/README.md`。

同日用户明确要求 React，并提出源码和产物存入同一仓库。生产实现以本次决策为准，替换先前的 Astro 建议。

## 2. 现状与依据

### 2.1 已确认的仓库事实

核查基线：`4e5605a238a3dbecad4ff0f9f2404e0c09200171`。

| 项目 | 现状 |
| --- | --- |
| 页面文件 | `index.html`、`404.html`、三个 `work/*/index.html` |
| 样式与交互 | `assets/site.css`、`assets/site.js` |
| 图片 | 四张 JPG 主视觉 / 项目图、一个 SVG favicon |
| 工程配置 | 当前树中未发现 `package.json`、组件源码目录、锁文件或 Actions workflow |
| 当前视觉 | 浅纸色内容区、深色大图 Hero、英文文案 |
| Pages | `legacy`，从 `main` 分支根目录发布，API 状态为 `built` |
| 自定义域名 | `CNAME` 与 Pages API 均为 `shuaiyafei.site` |
| HTTPS | 证书状态为 approved；`https_enforced=false` |

**现有 HTML / CSS / JS 本身可以编辑。** 尚不能断言它们来自某个已经丢失的框架工程；准确的重建任务是保留现有内容依据，重新组织设计、组件、内容模型和构建链路。

本次现状分析基于仓库文件及 GitHub API。网页抓取工具未能打开域名，尚未完成线上浏览器视觉核对；`built` 也不能替代站点访问验证。

### 2.2 内容复用清单

| 内容 | 仓库依据 | 重构处理 |
| --- | --- | --- |
| 姓名 `Yafei Shuai`、身份 `Software Engineer` | 首页 Hero | 保留，中文姓名不凭账号推断 |
| AI agents、跨端基础设施、开发者工具 | Hero、Introduction | 压缩为易读的个人简介 |
| 理解系统、为采用而设计、闭环交付 | How I work | 融入「关于我」，形成个人方法论 |
| AI Agent for a Dynamic UI Platform | `/work/ai-agent/index.html` | 保留项目主题、问题与方案结构 |
| Unified Cross-Platform Runtime | `/work/cross-platform/index.html` | 保留跨端模型、工具和质量体系内容 |
| Engineering Governance Platform | `/work/governance-platform/index.html` | 保留全生命周期治理项目 |
| `shuaiyafei@foxmail.com` | 现有联系链接 | 用户确认沿用 |
| GitHub `shuaiyafei` | 已确认账号 | 加入联系模块 |
| 任职、教育经历与时间 | 首页 Experience | 用户确认无需更新，迁移时保留事实与时间 |
| `100+`、`80%`、`95%`、`60%` 等结果数字 | 首页及项目页 | 用户确认沿用，保留原项目归属与统计含义 |
| 随笔 | 当前树未发现文章 | 建立内容结构；正式页面采用真实空状态 |

用户已确认旧站个人信息没有需要更新的内容，`Meituan · 2021—Present`、`Open to opportunities`、项目时间和成果数字均可沿用；该确认来自用户，不表示本次另行核验了任职或业务数据。求职状态可作为次要信息，避免抢占个人表达的主标题。现有图片作为参考材料保留，是否继续使用取决于新风格匹配度。

## 3. 目标、范围与默认决策

### 3.1 目标

1. 访客在首屏理解「我是谁、关注什么、在哪里看作品」。
2. 建立有辨识度、安静且具有科技艺术气质的个人表达。
3. 五个模块形成自然阅读节奏，桌面端和手机端都完整可读。
4. 内容和模板解耦，后续增加文章或更新项目无需复制整页 HTML。
5. 重建可复现的源码、依赖锁定、构建与发布流程。

### 3.2 首期范围

- 首页五个模块、公共导航、页脚及 404 页面。
- 三个既有项目详情页迁移并统一视觉，保留已有 URL。
- 随笔列表、文章模板和 Markdown 内容模型；无真实文章时显示简短空状态。
- 响应式布局、键盘交互、减少动态效果支持、基本 SEO。
- 高保真设计图导出与后续 GitHub Pages 部署方案。

首期无需账户、数据库、CMS、站内搜索或在线联系表单。联系入口采用邮件和 GitHub；网站建设不涉及读取 Personal 之外的业务资料。

### 3.3 用户已确认的决策

- 主要受众：技术同行与开源社区，侧重个人表达。
- 文案语言：英文为主，沿用旧站语言；首期采用完整英文界面，暂不增加语言切换。
- 个人信息：旧站内容没有需要更新的部分，邮箱、任职经历、求职状态及项目成果数字继续使用。

### 3.4 其余设计默认决策

- 主视觉采用抽象几何构图，首期不依赖个人照片。
- 首页不放大篇幅履历时间线；关于我用简短背景和三条工作原则表达，任职与教育内容可采用紧凑列表保留。
- 项目成果数字用于对应案例，首页以个人主张为核心，求职状态以小字或次级标记表达。
- 随笔为空时保留模块，用 “Notes on engineering, tools, and making things. Coming soon.” 收束；不生成虚构文章日期和阅读量。

## 4. 首页信息架构与文案方向

### 4.1 页面结构

| 模块 | 内容与作用 | 布局 |
| --- | --- | --- |
| 导航 | 姓名 / 标识，About、Work、Notes、Contact | 顶部驻留，细分隔线与深色实底，锚点预留导航高度 |
| Hero | 身份、一句个人主张、简短简介、查看作品 / 联系我 | 桌面左文右图；底部露出下一模块引导 |
| 关于我 | 背景与关注方向，三条工作原则 | 左侧短标题，右侧两段正文与精简条目 |
| 作品 / 项目 | 三个既有项目，体现问题、判断与实现 | PC 分屏模式下三个项目并排；小屏恢复主项目和单列 |
| 随笔 | 最新三篇真实文章；无文章时显示空状态 | 细线分隔的编辑式列表，减少重复卡片 |
| 联系 | 一句邀请、邮箱、GitHub、署名 | 大留白收尾，以文字链接为主要交互 |

页面阅读顺序：

```text
姓名 / 导航
    ↓
Hero：个人简介 + 抽象主视觉 + 两个清晰入口
    ↓
关于我：背景 + 思考方式
    ↓
精选作品：AI Agent / 跨端运行时 / 工程治理
    ↓
随笔：真实内容或安静的空状态
    ↓
联系：Email / GitHub
```

### 4.2 Hero 文案草案

> Yafei Shuai<br />
> Software Engineer
>
> **Making complex systems feel simple.**
>
> I build AI agents, cross-platform infrastructure, and developer tools—turning complex engineering into reliable, useful experiences.
>
> Explore my work ↗　Get in touch

文案是基于旧站定位的编辑草案，表达可在视觉稿阶段微调。正文保持真实、具体，避免大量技术名词挤占首屏。

### 4.3 关于我与项目表达

关于我沿用旧站核心文案：“I turn complex engineering systems into reliable products that help teams build, ship, and operate with confidence.” 三条原则保留 “Understand the system”、“Design for adoption”、“Close the loop”，配合简短英文说明。

项目首页卡片仅包含分类、名称、一至两句摘要、少量标签和详情入口。项目详情按「背景 → 我的角色 → 关键决策 → 实现 → 结果」组织；沿用的数字与对应项目及结果说明一起呈现。抽象配图明确作为概念视觉，避免被误认为真实产品截图。

## 5. 视觉设计规范

### 5.1 设计主题：静谧的数字空间

以深色空间中的一件轻量几何艺术装置建立记忆点：半透明弧面、疏松等高线或细线轨道，在局部青蓝漫反射中呈现层次。主体位于 Hero 右侧，外缘逐渐融入背景；文字区保持低纹理，主视觉不得穿过正文。

整页保持炭黑主调。关于我依靠留白变化节奏，作品区增加少量局部材质，随笔区回归纯文字，联系区用极弱的环境光结束。避免每个模块重复一套发光卡片。

### 5.2 色彩与材质

| Token | 初始值 | 用途 |
| --- | --- | --- |
| `--bg` | `#101315` | 页面主背景 |
| `--surface` | `#171C20` | 局部内容表面 |
| `--surface-raised` | `#1C2429` | 悬停及少量层次 |
| `--text` | `#E5EBED` | 标题与正文 |
| `--text-muted` | `#A1ADB3` | 摘要、日期、说明 |
| `--accent` | `#83AFBC` | 链接、小标记与按钮 |
| `--accent-deep` | `#3E6370` | 非文字装饰 |
| `--border` | `rgba(179, 204, 213, .14)` | 轻量分隔线 |

背景采用炭黑到深蓝灰的缓慢渐变；青蓝光效集中在主视觉附近，初始透明度控制在 6%—12%。可增加 1%—2% 透明度的静态颗粒材质，避免形成可见噪点。边框、阴影和光晕均不承担文字可读性。

禁止：高饱和紫粉霓虹、大面积纯青发光、扫描线、故障文字、密集 HUD、全屏粒子连线与重度玻璃拟态。

### 5.3 网格、字体与间距

- 桌面内容最大宽度约 1280px，12 列网格，列距 24px；大屏留白向两侧增长。
- 以 1440px 设计视口校准整体节奏，同时检查 1920px。模块纵向间距 120—160px。
- 平板 8 列，手机 4 列；手机两侧留白 20—24px，模块间距 72—96px。
- 英文优先 Inter 的本地 WOFF2 或系统无衬线回退；中文采用系统中文无衬线字体。字体文件必须确认授权后再纳入仓库。
- 桌面 Hero 标题 64—88px，区块标题 32—44px，正文 16—18px；手机分别约 38—48px、26—32px、16px，以实际字数和断行为准。
- 英文正文行高约 1.6—1.7，段落宽度约 55—65 字符；Hero 主标题按语义断行，避免孤立单词。
- 小标题可使用序号和轻微字距强化秩序；全大写仅用于短分类，不用于长段落。
- 圆角以 12—20px 为主，胶囊仅用于少量分类标签；主要按钮视觉明确，次要入口保持轻盈。

### 5.4 响应式策略

断点初值：`640px`、`960px`、`1280px`，依据内容是否拥挤调整。

- 小屏 Hero 先呈现文字，再呈现高度受限的主视觉；不为了保留构图而缩小正文。
- 项目列表变为单列，随笔标题可自然换行，日期不挤压标题。
- 手机导航使用轻量展开菜单；顶部导航不遮挡锚点标题。
- 各区块不固定高度；仅 Hero 使用合理的最小高度，并考虑动态浏览器工具栏。

## 6. 交互与动效

| 场景 | 方案 | 约束 |
| --- | --- | --- |
| 页面进入 | 标题与简介轻微淡入，位移 8—12px | 约 450—650ms，分组错开不超过 80ms |
| 区块进入视口 | IntersectionObserver 触发一次淡入 | 内容默认可见；JS 失效仍完整可读 |
| 链接与按钮 | 颜色、下划线、箭头位移 2—3px | 约 160—220ms，覆盖键盘焦点 |
| 项目卡片 | 边框略提亮，图片至多放大约 1.02 倍 | 避免全卡片倾斜与大幅浮动 |
| 背景氛围 | 12—20 秒的局部缓慢变化，可完全静止 | 只在 Hero 使用，移动端默认静态 |
| 微妙粒子 | 少量预设静态点位；必要时只移动整层 | 不逐帧计算粒子，不跟随鼠标 |
| 滚动 | PC 首页按模块吸附，每段过渡翻一屏，持续滚轮可连续切换；手机连续滚动 | 长内容保留内部阅读范围；锚点与浏览器历史正常工作 |

按用户追加要求，961px 及以上的 PC 首页使用 CSS Scroll Snap 和滚轮手势控制：累计有效滚动后切换一屏，动画完成后立即接收后续输入，持续滚动可连续换屏，反向输入取消当前过渡；页面内超过视口的内容继续原生滚动。项目详情和随笔页面保留连续阅读。导航全端固定顶部并标识当前栏目，手机锚点额外预留 16px 留白，菜单限制在当前可视高度以内，并支持顺序 Tab 导航、Escape 关闭和焦点离开后收起。

`prefers-reduced-motion: reduce` 下关闭背景循环、入场位移和平滑滚动，PC 分屏直接定位。无自定义鼠标或背景视频。移动菜单支持 Escape 关闭、焦点返回及明确的展开状态；装饰图形不进入辅助技术阅读顺序。

## 7. 技术方案

### 7.1 选型

| 方案 | 适配情况 | 决策 |
| --- | --- | --- |
| 继续手写多页 HTML | 依赖少，但公共导航、项目模板和文章需要手工同步 | 作为迁移参照 |
| React + Vite + 构建时预渲染 | 满足用户 React 要求，复用组件，并为 Pages 输出独立静态页面 | **已采用** |
| 纯客户端 SPA | 可以实现页面，但需额外处理深层路径刷新和初始内容 | 本站不采用此发布方式 |

使用 React `renderToString` 在构建时生成每个路由的完整内容，浏览器通过 `hydrateRoot` 接管菜单等交互。页面之间采用普通链接，沿用浏览器历史和锚点行为，不依赖服务端 SPA 重写。[React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)、[Vite 静态部署](https://vite.dev/guide/static-deploy.html)

采用 TypeScript 管理个人资料及项目数据，原生 CSS 实现网格、变量和动效；`lucide-react` 图标随构建交付。主视觉使用已生成的本地 WebP 图片。Markdown 在构建时解析和清洗，解析器不进入浏览器包。

使用 Node 24、npm 11.6.0；依赖为精确版本并提交 `package-lock.json`，`npm ci --ignore-scripts` 可复现安装。

### 7.2 建议源码结构

```text
.github/workflows/       # 检查与 Pages 发布
docs/                   # TD、视觉规范、内容迁移说明
public/
  CNAME
  favicon.svg
  images/               # 本地静态图片、分享图
src/
  components/           # Header、Hero、About、ProjectCard、Notes、Contact
  content/
    notes/              # Markdown 随笔；允许为空
  data/
    profile.ts          # 姓名、简介、联系链接
    projects.ts         # 三个项目案例的结构化内容
  styles/               # tokens、基础样式、布局与动效
  pages/
    HomePage.tsx
    ProjectPage.tsx
    NotesPage.tsx
    NotFoundPage.tsx
  App.tsx
  main.tsx              # React hydration / 开发入口
  entry-server.tsx      # 构建时 HTML 渲染
  routing.ts
scripts/                # Markdown、预渲染、产物归档
vite.config.ts
package.json
package-lock.json
README.md
```

项目字段：`slug`、标题、摘要、分类、标签、角色、封面、正文，以及可选的已确认成果。随笔字段：`slug`、标题、摘要、发布日期、标签、正文、`draft`。由内容 schema 校验必填项和日期，草稿不进入生产列表、站点地图或生成路由。

### 7.3 路由与内容兼容

- 首页保留 `/#about`、`/#work`，新增 `/#notes`、`/#contact`。
- 旧 `/#experience` 在关于我中的背景位置保留兼容锚点。
- 项目继续使用 `/work/ai-agent/`、`/work/cross-platform/`、`/work/governance-platform/`，构建目录形式输出 `index.html`，兼容已有显式 `.html` 链接。
- 新文章使用 `/notes/<slug>/`；没有已发布文章时仅生成列表空状态。
- 404 的资源和回首页链接使用根路径，修正旧页面相对路径在深层不存在 URL 下可能失效的问题。
- 设置 `lang=en`、英文页面级 title / description、canonical、Open Graph、站点地图及 robots；个别其他语言内容按需设置语言标记。

## 8. 性能与可访问性目标

以下为验收目标；已记录构建包大小，性能时间指标仍待单独测量：

- 按 React 方案调整浏览器 JS gzip 预算为 90KB，目前构建约 78KB；HTML、CSS 和关键图像合计传输目标不超过 500KB，字体预算单列。主要内容在无 JS 时仍可阅读。
- 不加载整套中文字体；英文自托管字体若采用，首屏增量目标不超过 100KB，并配置 `font-display: swap`。
- 首屏图片明确尺寸，优先使用响应式 AVIF / WebP；折叠以下图片懒加载；几何装饰优先矢量。
- 以固定的移动端实验环境测量：LCP 目标 ≤2.5s、CLS ≤0.1；记录浏览器、网络和 CPU 限速条件。上线后的真实用户指标需要有足够样本才可判断。
- 所有交互均可通过键盘使用，链接有明确焦点，手机点击区域目标至少 44×44 CSS px。
- 以 WCAG 2.2 AA 为目标：普通文字对比度至少 4.5:1，大字至少 3:1；实际配色仍需在实现时检查。[W3C 对比度说明](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- 单个主要 H1、合理标题层级、语义化区域、跳过导航链接；装饰图使用空 alt 或 `aria-hidden`。

## 9. 高保真设计图交付规格

「8K」作为导出像素规格，不用于网页线上加载。

| 产物 | 规格 | 用途 |
| --- | --- | --- |
| 首页首屏主图 | **7680×4320 PNG**；1920×1080 CSS 视口，4 倍像素密度 | 8K 网页截图视角，检视 Hero 质感与细节 |
| 首页全页长图 | 1920px CSS 宽，全页内容高度；导出宽 7680px，过长时按模块分片 | 检视全部五个模块及阅读节奏 |
| 移动端全页图 | 390px CSS 宽，3 倍像素密度，另检视 375px 窄屏 | 检视移动阅读、断行和布局 |
| 设计说明 | 色彩、字号、间距、主视觉和关键交互状态 | 作为实现与验收依据 |

采用正面网页截图构图，无设备外壳、透视角度或展示台。8K 首屏与全页长图分别导出，保持正常留白和可读字号。

优先以可运行的首页视觉原型渲染文字、组件和网格，确保文字准确、布局可实现；如需要生成式图片，仅用于抽象主视觉素材。截图按目标密度实际渲染，导出后检查尺寸、字体加载、裁切与模糊问题，避免直接放大低分辨率整页图片。静态图之外保留预览，用于评审动效。

大尺寸交付图保存在 Personal 内的本地设计交付目录并加入忽略规则，不进入站点发布目录；线上另行输出优化素材。

## 10. 发布迁移与回滚

### 10.1 迁移方式

1. 以当前仓库基线建立重构分支，保留现有 Git 历史；先完成视觉稿和本地预览。
2. 在源码结构中迁移内容及图片，逐项记录旧页面到新内容文件的对应关系。
3. PR 检查只运行内容校验和构建；生产部署由默认分支触发，首次迁移也可用手动 workflow 控制。
4. 发布准备完成后，先将 Pages Source 切换为 GitHub Actions，再合并 React 源码到 `main`，避免旧发布器读取未编译的入口。workflow 将 `dist/` 提交至 `gh-pages`，再把同一目录上传并部署至 Pages。Action 已固定为官方仓库的提交 SHA。
5. 站点地址在 `src/data/profile.ts` 中配置为 `https://shuaiyafei.site`，使用域名根路径，不添加仓库名称前缀；保留 `public/CNAME`，并核实 Pages 设置中的自定义域名。
6. 发布后核对首页、三个旧项目地址、静态资源、404、联系链接与证书；证书和 DNS 正常后开启 HTTPS 强制跳转。

GitHub Pages 支持通过 Actions 上传并发布静态构建产物；部署 job 使用 `github-pages` environment，所需权限由 workflow 明确声明。[GitHub workflow 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

`gh-pages` 是构建产物的版本归档；实际发布显式走 Pages Actions，避免依赖 `GITHUB_TOKEN` 提交触发分支型 Pages 构建。产物包含 `build-info.json`，关联生成它的源码提交。workflow 使用内置 token，无需新增个人 token。

Actions 模式下，自定义域名需要在 Pages 设置中明确保留，不能只依赖构建目录中的 CNAME 文件。[GitHub 自定义域名说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

### 10.2 影响与回滚

切换发布来源、覆盖线上页面及开启 HTTPS 都属于实际发布操作，在本地验收完成后统一执行。TD 阶段不修改远端配置。

发布前记录当前 Pages 配置和线上基线，并保存旧站静态文件的可部署归档。若新站发布异常，可重新部署旧静态归档；若需要恢复 legacy 模式，则在独立回滚分支恢复旧文件，并把 Pages 来源指向该分支根目录。不能仅 revert 新源码提交后假定旧部署方式也会自动恢复。

后续日常更新以源码 PR、锁定依赖和自动构建为主，README 记录新电脑从克隆到本地预览、发布与回滚的步骤。

## 11. 实施阶段与验收

| 阶段 | 交付 | 完成条件 |
| --- | --- | --- |
| A：方案 | 本 TD、内容复用与用户确认记录 | 视觉、范围、技术与交付规格明确 |
| B：视觉 | 桌面首屏、全页、移动端高保真稿与预览 | 五个模块齐全，风格与阅读节奏通过评审 |
| C：工程重建 | 组件、样式、内容模型、三个项目页、随笔模板 | 可从干净安装构建，真实内容与旧链接得到保留 |
| D：验收 | 布局、交互、链接、性能和可访问性检查记录 | 375 / 390 / 768 / 1440 / 1920px 无横向溢出；减少动态效果与键盘导航可用 |
| E：上线 | Pages workflow、域名与 HTTPS、回滚说明 | 生产访问正常，所有主要入口与旧项目地址可用 |

视觉原型与截图已交付，React 源码、项目页、随笔模板、预渲染及发布配置已完成，本地构建与 25 组页面 / 视口检查通过。详情见 `docs/react-rebuild-handover.md`。实际发布状态以 GitHub Actions 最近一次运行和线上 `build-info.json` 为准。

## 12. 风险与实施注意事项

| 项目 | 处理方式 |
| --- | --- |
| 迁移中改变个人事实或时间 | 按用户确认沿用旧站信息，调整表达时保持原意 |
| 成果数字脱离原项目语境 | 保持项目归属、比较方向和统计含义，不改造成新的成果声明 |
| 尚无随笔 | 保持真实空状态，文章结构先准备好 |
| 新旧图片风格不统一 | 项目正文优先迁移；图片按新视觉方向重绘或统一处理 |
| 微光效果降低可读性 | 文字与光效分层，移动端减少装饰，逐项检查对比度 |
| 8K 全页图体积过大 | 首屏固定 8K，长图允许分片；与线上资源分开保存 |
| 发布方式变化 | 先构建验收，再切换 Pages 来源，旧静态归档可独立回滚 |

受众、语言与个人信息沿用范围已经明确，当前无阻塞首页视觉设计的澄清项。后续按实际视觉稿评审布局、文案长度与主视觉细节。

---

## 参考资料

- 现有首页与文案：[仓库首页基线](https://github.com/shuaiyafei/self-intro-website.github.io/blob/4e5605a238a3dbecad4ff0f9f2404e0c09200171/index.html)
- 现有样式：[CSS 基线](https://github.com/shuaiyafei/self-intro-website.github.io/blob/4e5605a238a3dbecad4ff0f9f2404e0c09200171/assets/site.css)
- [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Vite 静态部署](https://vite.dev/guide/static-deploy.html)
- [GitHub Pages 自定义 workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages 自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [W3C 最小文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
