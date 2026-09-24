/* design-assets Pages preview — 风格元数据筛选 + 仓库内已有样例缩略图 */

const STYLES = [
  { id: "01-minimalism", zh: "极简主义", en: "Minimalism", tags: ["doc"], use: "技术文档/审计报告头图" },
  { id: "02-neumorphism", zh: "新拟态", en: "Neumorphism", tags: ["doc"], use: "柔和 UI 概念示意（勿入暖色产品）" },
  { id: "03-glassmorphism", zh: "玻璃拟态", en: "Glassmorphism", tags: ["tech"], use: "现代工具宣传" },
  { id: "04-cyberpunk", zh: "赛博朋克", en: "Cyberpunk", tags: ["tech"], use: "仅概念海报；禁 chatez" },
  { id: "05-vaporwave", zh: "蒸汽波", en: "Vaporwave", tags: ["playful"], use: "实验视觉" },
  { id: "06-memphis", zh: "孟菲斯", en: "Memphis", tags: ["playful"], use: "活泼案例页" },
  { id: "07-popart", zh: "波普艺术", en: "Pop Art", tags: ["playful"], use: "海报" },
  { id: "08-ink", zh: "中国水墨", en: "Chinese Ink", tags: ["culture"], use: "非遗外宣 / eink 词库档案" },
  { id: "09-gold", zh: "鎏金东方", en: "Oriental Gold", tags: ["culture"], use: "古典图书馆词库宣传" },
  { id: "10-corporate", zh: "商务科技", en: "Corporate Tech", tags: ["doc", "tech"], use: "OJ/平台架构页" },
  { id: "11-terminal", zh: "终端黑客", en: "Terminal Hacker", tags: ["tech"], use: "codedrill 案例边框（不改产品主题）" },
  { id: "12-fluid", zh: "流体渐变", en: "Fluid Gradient", tags: ["tech"], use: "抽象背景" },
  { id: "13-pastel", zh: "粉彩马卡龙", en: "Pastel", tags: ["doc"], use: "chatez 案例柔和底图" },
  { id: "14-watercolor", zh: "手绘水彩", en: "Watercolor", tags: ["culture", "doc"], use: "书房叙事案例" },
  { id: "15-isometric", zh: "3D 等距", en: "Isometric", tags: ["tech"], use: "多服务架构示意" },
  { id: "16-flat", zh: "扁平插画", en: "Flat", tags: ["playful", "doc"], use: "组件库/桌宠商店页装饰" },
  { id: "17-acid", zh: "酸性设计", en: "Acid", tags: ["playful"], use: "强视觉海报" },
  { id: "18-swiss", zh: "瑞士国际", en: "Swiss", tags: ["doc"], use: "审查报告/清单默认推荐" },
  { id: "19-retro", zh: "复古怀旧", en: "Retro", tags: ["playful"], use: "案例怀旧页" },
  { id: "20-gothic", zh: "暗黑哥特", en: "Gothic", tags: ["playful"], use: "游戏向" },
  { id: "21-natural", zh: "自然有机", en: "Natural", tags: ["culture", "doc"], use: "chatez / 个人花园" },
  { id: "22-artdeco", zh: "装饰艺术", en: "Art Deco", tags: ["doc", "culture"], use: "正式报告装饰" },
  { id: "23-pixel", zh: "像素艺术", en: "Pixel", tags: ["playful"], use: "desktoppet / 游戏" },
  { id: "24-papercut", zh: "剪纸拼贴", en: "Paper Cut", tags: ["culture"], use: "华阴老腔外宣（不改站点主视觉）" },
];

// docs/samples/ 里真实存在的样例。数字与风格编号对齐（hero 优先作缩略图）。
const SAMPLES = {
  "01-minimalism": ["01-minimalism-hero.jpg", "01-minimalism-bg.jpg", "01-minimalism-widgets.jpg"],
  "02-neumorphism": ["02-neumorphism-hero.jpg", "02-neumorphism-bg.jpg", "02-neumorphism-widgets.jpg"],
  "03-glassmorphism": ["03-glassmorphism-hero.jpg", "03-glassmorphism-bg.jpg", "03-glassmorphism-widgets.jpg"],
  "04-cyberpunk": ["04-cyberpunk-hero.jpg"],
  "05-vaporwave": ["05-vaporwave-hero.jpg"],
  "06-memphis": ["06-memphis-hero.jpg", "06-memphis-bg.jpg", "06-memphis-widgets.jpg"],
  "07-popart": ["07-popart-hero.jpg"],
  "08-ink": ["08-ink-hero.jpg", "08-ink-widgets.jpg"],
  "09-gold": ["09-gold-hero.jpg"],
  "10-corporate": ["10-corporate-hero.jpg", "10-corporate-widgets.jpg"],
  "11-terminal": ["11-terminal-hero.jpg"],
  "12-fluid": ["12-fluid-hero.jpg"],
  "13-pastel": ["13-pastel-hero.jpg"],
  "14-watercolor": ["14-watercolor-hero.jpg"],
  "15-isometric": ["15-isometric-hero.jpg"],
  "16-flat": ["16-flat-hero.jpg"],
  "17-acid": ["17-acid-hero.jpg"],
  "18-swiss": ["18-swiss-hero.jpg", "18-swiss-bg.jpg", "18-swiss-widgets.jpg"],
  "19-retro": ["19-retro-hero.jpg"],
  "20-gothic": ["20-gothic-hero.jpg"],
  "21-natural": ["21-natural-hero.jpg"],
  "22-artdeco": ["22-artdeco-hero.jpg"],
  "23-pixel": ["23-pixel-hero.jpg"],
  "24-papercut": ["24-papercut-hero.jpg"],
};

const VARIANT_ZH = { hero: "主图", bg: "背景", widgets: "控件" };
const SAMPLE_BASE = "./samples/";

function placeholder(s, note) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="140">` +
    `<rect fill="#e8e2d6" width="100%" height="100%"/>` +
    `<text x="20" y="74" font-size="20" fill="#8a7348" font-family="sans-serif">${s.zh}</text>` +
    `<text x="20" y="100" font-size="12" fill="#a4977d" font-family="sans-serif">${note}</text>` +
    `</svg>`
  );
}

function render(key) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  STYLES.filter((s) => key === "all" || s.tags.includes(key)).forEach((s) => {
    const el = document.createElement("article");
    el.className = "card";
    const owned = SAMPLES[s.id] || [];

    const img = document.createElement("img");
    img.alt = `${s.zh} · ${s.en} 样例`;
    img.loading = "lazy";
    if (owned.length) {
      img.src = SAMPLE_BASE + owned[0];
      // 只在真的加载失败时才退回占位图，避免死链在控制台刷 404
      img.onerror = () => { img.onerror = null; img.src = placeholder(s, "样例读取失败"); };
    } else {
      img.src = placeholder(s, "样例待补");
    }

    const variants = owned.length
      ? owned.map((f) => VARIANT_ZH[f.replace(/^.*-/, "").replace(".jpg", "")] || f).join(" · ")
      : "";

    const body = document.createElement("div");
    body.className = "body";
    body.innerHTML =
      `<div class="meta">${s.id}</div>` +
      `<h3>${s.zh} · ${s.en}</h3>` +
      `<p>${s.use}</p>` +
      (variants ? `<div class="samples">样例：${variants}</div>` : `<div class="samples muted">样例待补</div>`);

    el.appendChild(img);
    el.appendChild(body);
    grid.appendChild(el);
  });
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button.chip");
  if (!btn) return;
  document.querySelectorAll("#filters .chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  render(btn.dataset.k || "all");
});

const ownedCount = Object.keys(SAMPLES).length;
const stats = document.getElementById("stats");
if (stats) stats.textContent = `样例 ${ownedCount} / ${STYLES.length} 风格`;

render("all");
