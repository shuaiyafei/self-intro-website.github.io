# React 重建交付记录

日期：2026-10-16<br />
本地分支：`rebuild/react-personal-site`<br />
目录：`/Users/yafei.shuai/personal/work-self-intro-website/`

## 已实现

- React 19、TypeScript、Vite 的源码工程及精确依赖锁文件。
- 英文首页的 Hero、About、Selected Work、Field Notes、Contact。
- 三个项目详情页、随笔列表、Markdown 文章模板和独立 404。
- 导航、项目卡片、页脚等共享组件，以及独立的个人资料和项目数据。
- 移动菜单、Escape 关闭、焦点返回、履历展开和减少动态效果支持。
- 构建时生成完整 HTML，保留原项目的目录与 `index.html` 地址。
- 逐页 metadata、canonical、Open Graph、站点地图、robots 及 CNAME。
- 源码 `main`、产物 `gh-pages`、Pages Actions 发布同份产物的 workflow。

## 本地验证

生产构建已通过 TypeScript 检查，生成 6 个页面：主页、3 个案例、随笔列表、404。

Playwright 检查了 375、390、768、1440、1920px 五种宽度，覆盖主页、三个案例及随笔列表，共 25 组页面 / 视口组合。未发现横向溢出、损坏图片或 React 浏览器错误。

另已检查：

- 手机菜单打开、Escape 关闭、焦点返回及导航后关闭。
- 履历展开，项目跳转和刷新，以及返回首页。
- 原 `/work/ai-agent/index.html` 地址。
- 关闭 JavaScript 后主要页面内容和 canonical 仍存在。
- 深层不存在路径的 404 内容、资源和回首页入口。
- Markdown 元数据校验、无效日期、草稿排除、未来日期排除及 HTML 清洗。
- 站点地图排除 404，并包含主要页面；CNAME 保持原域名。
- 开发服务器的首页、项目页和随笔列表，以及临时 Markdown 内容的新增热更新、文章页刷新、删除后更新；验证内容已清理。

截图和检查报告位于本地忽略目录 `artifacts/`。验证工具与浏览器位于 Personal 下的 `.tools/site-design/`、`.cache/playwright/`。

本节记录的是本地验证；LCP / CLS 尚未单独测量。云端 workflow 和线上发布结果应另外通过 GitHub Actions 与站点检查核对。

## 源码和产物的关系

`npm run build` 输出 `dist/`，其中是浏览器可直接使用的 HTML、CSS、JavaScript、图片及字体。`src/` 中的 TSX 不直接交给 GitHub Pages。

发布 workflow 先构建，再把 `dist/` 的文件提交到同仓库 `gh-pages` 分支，最后将同一份文件发布到 Pages。`build-info.json` 记录生成该版本的源码提交。

首次发布需要在合并源码到 `main` 之前将 Pages Source 从旧的根目录发布切换为 **GitHub Actions**。完整步骤在 README；保留原自定义域名，并在证书正常后开启 HTTPS 强制跳转。

## 发布核对

本地工程和预览已完成。上线后核对 GitHub Actions 的成功运行、`gh-pages` 的构建提交，以及 `https://shuaiyafei.site/build-info.json` 中对应的源码提交。

旧站文件可从原提交 `4e5605a238a3dbecad4ff0f9f2404e0c09200171` 恢复，另外已在 Personal 下保存静态归档：

`/Users/yafei.shuai/personal/.github-maintenance/backups/self-intro-before-react-4e5605a.tar`

## 导航与分屏更新

按用户反馈，导航改为全端固定定位，页面预留对应高度；手机锚点额外留出 16px，菜单不会超出可视区域，关闭时恢复焦点并保持阅读位置。

PC 首页在 961px 及以上启用分屏浏览，每段过渡前进或后退一个模块。动画完成即接收后续滚轮事件，允许连续换屏；反向滚动取消当前过渡。三个项目并排展示；展开履历等长内容保留原生滚动。手机、项目详情和随笔页面继续连续阅读。减少动态效果时直接定位，不播放平滑过渡。

更新已通过 9 组移动端 / 桌面端视口与动效偏好检查，另验证了短屏菜单范围、PageDown / Home、短促触控板输入不会跳过中间模块，以及缩放手势不被拦截。

后续连续滚动反馈已复现：原实现持续更新滚轮时间，导致解锁必须等待停手。已将解锁条件改为动画完成，并验证鼠标固定、不中断滚轮的正向 / 反向事件流能够连续到达页尾 / 页首，以及过渡中立即反向。导航增加当前栏目提示，手机菜单修正 Tab 顺序并在焦点离开时自动收起。

窗口尺寸改变时会清理旧滚动状态，避免保留过期的翻屏目标。纯客户端预览补齐首次打开锚点的定位，生产预渲染页面继续保留浏览器原有的定位与恢复行为。连续滚动、动画中反向、窗口缩放恢复、当前栏目提示和菜单键盘操作均已通过本地浏览器验证。
