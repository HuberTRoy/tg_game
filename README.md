# Telegram Tap Game (React + TS + Vite)

一个可直接接入 Telegram WebApp 的点击小游戏模板。

## 1. 本地运行

```bash
pnpm install
pnpm dev
```

默认地址：`http://localhost:5173`

## 2. 项目结构

- `src/App.tsx`：点击玩法 + Telegram WebApp 初始化 + MainButton 提交分数
- `src/telegram-web-app.d.ts`：Telegram WebApp 的 TypeScript 类型声明
- `index.html`：已引入 Telegram WebApp SDK

## 3. 接入 Telegram（BotFather）

Telegram WebApp 需要一个公网 `https` 地址，不能直接用 `localhost`。

### 步骤 A：创建机器人

1. 打开 Telegram，搜索 `@BotFather`
2. 发送 `/newbot`
3. 按提示设置 `bot name` 和 `username`
4. 获取 `BOT_TOKEN`（后续你的后端会用到）

### 步骤 B：把本地项目暴露到公网（开发环境）

任选一个隧道工具（如 Cloudflare Tunnel、ngrok），把 `http://localhost:5173` 映射成 `https://xxxxx`。

### 步骤 C：配置 WebApp 菜单按钮

1. 在 `@BotFather` 发送 `/setmenubutton`
2. 选择你的 bot
3. 按提示输入按钮文本（例如 `Play`）
4. 输入 WebApp URL（你的 `https://xxxxx`）

完成后，打开你的 bot，点击菜单按钮即可进入这个网页。

## 4. 与机器人通信说明

前端点击 Telegram 底部 MainButton 后会调用：

```ts
tg.sendData(
  JSON.stringify({
    type: 'submit_score',
    score: clicks,
    goal: 100,
    timestamp: new Date().toISOString(),
  }),
)
```

你的 bot 后端需要监听 WebApp 数据并解析 JSON，然后做积分、排行、发奖等逻辑。

## 5. 打包部署

```bash
pnpm build
pnpm preview
```

把 `dist/` 部署到任意静态托管（Vercel、Netlify、Cloudflare Pages 等）后，把正式 `https` 地址更新到 BotFather 菜单按钮即可。
