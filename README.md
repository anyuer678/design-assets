# design-assets

> AI 生成的设计素材库结构仓（24 风格元数据 + 使用纪律 + 产品视觉圣经摘要）  
> **大图资产**不在本仓 Git 对象库中，请使用 Release 附件或本地源目录。

[![License: CC0](https://img.shields.io/badge/license-CC0-lightgrey)](LICENSE)
[![status](https://img.shields.io/badge/status-preview-green)](#)

## 内容

| 路径 | 说明 |
|------|------|
| `styles/<id>/meta.json` | 24 种风格元数据（id、中英文名、源文件指引、用途/禁止） |
| `samples/` | 少量小体积样例图（便于浏览，非全集） |
| `docs/visual-bible/` | 与产品绑定的视觉圣经摘要（chatez/codedrill/Word…） |
| `USAGE.md` | **画风纪律**：文档层可用，禁止替换产品 UI 主题 |
| `scripts/build_meta.py` | 校验本地源目录中 hero/bg/widgets 是否存在 |
| `LICENSE` / `NOTICE` | CC0（推荐）+ AI 生成声明 |

## 与 anyuer678 产品仓的关系

- **只服务文档 / PPT / 作品集案例**，不反向作为运行时主题包
- kb-ui 组件皮肤、chatez 暖色书房、codedrill 终端绿、cet6 图书馆/墨水屏等 **以各仓视觉圣经为准**

## 本地全集

若你本机有源目录：

```text
C:\Users\<you>\Desktop\design-assets
```

可运行：

```bash
python scripts/build_meta.py
```

（需按需修改脚本内 `SRC` 路径）

## 未来

- [ ] 视觉圣经 docx → Markdown 全文
- [x] GitHub Pages 预览站（按风格筛选）docs/index.html + docs/preview.js
- [ ] Release 上传压缩全集（2048×1152）
- [x] CONTRIBUTING：新增风格的提示词与命名规范（基础版已含画风纪律）

## License

CC0 1.0（见 `LICENSE`）。素材为 AI 生成；使用时请遵守 `USAGE.md` 画风纪律。
