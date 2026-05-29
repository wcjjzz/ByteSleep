# ByteSleep

ByteSleep 是一个基于 **Vite + React + JSX** 的静态前端演示项目，用于展示医院睡眠门诊场景下的 PSG 检查工作台、患者工作区、可解释睡眠报告、风险提示与历史对比。

## 技术栈

- Vite
- React 18
- JSX
- Tailwind CSS
- Recharts
- lucide-react
- GitHub Actions + GitHub Pages

## 目录说明

项目源码已经按页面、布局、组件、图表、数据、常量、功能模块进行拆分，便于长期维护。根目录中附带 `目录结构.txt`，可直接查看项目骨架说明。

## 本地运行

```bash
npm install
npm run dev
```

## 本地构建

```bash
npm run build
npm run preview
```

## GitHub Pages 部署说明

本项目已经内置 `.github/workflows/deploy.yml`，推送到 GitHub 仓库后即可自动构建并部署到 GitHub Pages。


3. 请在 GitHub 仓库设置中将 Pages 的 Source 设为 **GitHub Actions**
