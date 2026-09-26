# dsh-model-modalities

[English](README.en.md) | 简体中文

DSH 浏览器端插件：在设置页增加「模型输入能力」section，**逐模型声明该模型接受哪些输入模态（text / image）**，覆盖全部 provider 接入点。勾选「图片输入」后该模型即可接收截图/图片附件。纯浏览器端 UI，装卸即消失，不改任何官方文件。

## 它解决什么

DSH 的模型清单里，一个模型能不能收图片取决于它的 `input` 字段是否声明了 `image`。自定义接入点（openai-completions 类）的模型默认只有 `text`，于是"这个模型明明支持多模态，发图片却失败"。

本插件把这件事变成设置页里的一排复选框：

- 按 provider 路由分组列出全部模型（用户层自定义列表 + 目录层继承列表都显示）；
- 每个模型一行：模型 id、来源徽标（自定义 / 目录继承）、当前模态徽标（纯文本 / 图片+文本）、一个「图片输入」复选框；
- 勾选即通过官方设置写入通道把 `input: ["text","image"]` 写进该模型的用户层配置（目录继承的模型会先物化用户层列表再写入）；
- 只读会话（不可写）时禁用并明示。

## 安装

```bash
dsh plugin --profile web add -w dsh-model-modalities
```

手动等价方式：包放到 `<DSH_HOME>/profiles/node_modules/dsh-model-modalities/`，在 `cordis.patch.yml` 加一条：

```yaml
- insert:
    - id: model-modalities
      name: 'dsh-model-modalities'
```

## 卸载

删掉那条 insert。纯浏览器端插件，强刷页面即消失。

## 实现要点

- 零渲染 host 载体 + 浏览器 `lib/client.js` 注册设置 section（`settings.section` 插槽，additive）；
- 读官方共享设置镜像（`settingsScope.describe()`），写走 `ctx.remote.settings.mutate` 的路径操作，带 revision 冲突处理（`settings/conflict` → 提示重试）；
- **兼容垫片**：`api.settings.mutate` 在 0.1.1 是单对象签名、0.1.5 是位置参数签名——先按 0.1.5 位置参数调用，仅当报错看起来是参数/校验不匹配时才回退对象形式，避免真实写入失败被误判重试而双写；
- 模态词表只有 `text` 与 `image`（当前引擎口径）；音频/视频需要上游引擎扩展；
- 客户端 require：`react` / `react/jsx-runtime` / `@deepseek-ai/dsh-client-store`（均在平台基线表内）。

## 已知边界

- 只改用户层的模型 `input` 声明，不改接入点本身；目录层（官方包目录声明的模型列表）只读展示。
- 依赖官方设置服务的命名空间 `llm-pi-ai` 与 describe/mutate 契约；DSH 升级后若设置页异常，先核对该契约。

## 兼容性

- DeepSeek Harness `0.1.5-rc.1`（web profile，浏览器端；含 0.1.1→0.1.5 签名兼容）

## License

MIT
