const { useState, useEffect, useRef, useCallback } = React;

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#09090b",
  panel: "rgba(19, 22, 30, 0.7)",
  card: "rgba(24, 28, 38, 0.6)",
  border: "rgba(255, 255, 255, 0.1)",
  accent: "#0ea5e9",
  green: "#10b981",
  orange: "#f59e0b",
  purple: "#8b5cf6",
  red: "#ef4444",
  yellow: "#eab308",
  pink: "#ec4899",
  text: "#f8fafc",
  muted: "#94a3b8",
  highlight: "rgba(14, 165, 233, 0.15)",
};

const styles = {
  app: {
    background: C.bg,
    minHeight: "100vh",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: C.text,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: `linear-gradient(135deg, rgba(19,22,30,0.85) 0%, rgba(10,12,18,0.95) 100%)`,
    borderBottom: `1px solid ${C.border}`,
    padding: "18px 28px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    background: `linear-gradient(90deg, ${C.accent}, ${C.green})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: -1,
  },
  badge: (color) => ({
    background: `${color}22`,
    border: `1px solid ${color}55`,
    color,
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
  }),
  tabs: {
    display: "flex",
    gap: 6,
    padding: "14px 28px",
    borderBottom: `1px solid ${C.border}`,
    background: C.panel,
    overflowX: "auto",
    flexWrap: "wrap",
  },
  tab: (active, color) => ({
    padding: "8px 18px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    border: `1.5px solid ${active ? color : C.border}`,
    background: active ? `${color}18` : "transparent",
    color: active ? color : C.muted,
    letterSpacing: 0.5,
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  }),
  main: {
    flex: 1,
    padding: "24px 28px",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  section: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  sectionTitle: (color) => ({
    fontSize: 13,
    fontWeight: 800,
    color,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  }),
  arrayBox: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  cell: (bg, border, scale = 1) => ({
    width: 46,
    height: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 800,
    background: bg,
    border: `2px solid ${border}`,
    transform: `scale(${scale})`,
    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    position: "relative",
    flexShrink: 0,
  }),
  label: (color) => ({
    position: "absolute",
    bottom: -18,
    fontSize: 9,
    fontWeight: 700,
    color,
    letterSpacing: 0.5,
    whiteSpace: "nowrap",
  }),
  btn: (color, outline) => ({
    padding: "9px 20px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    border: `1.5px solid ${color}`,
    background: outline ? "transparent" : `${color}22`,
    color,
    letterSpacing: 0.5,
    transition: "all 0.15s",
  }),
  controls: {
    display: "flex",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap",
    alignItems: "center",
  },
  code: {
    background: "#0a0c12",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: "16px 20px",
    fontSize: 12,
    lineHeight: 1.8,
    overflowX: "auto",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginTop: 12,
  },
  infoCard: (color) => ({
    background: `${color}0d`,
    border: `1px solid ${color}33`,
    borderRadius: 10,
    padding: "12px 16px",
  }),
  tag: (color) => ({
    display: "inline-block",
    background: `${color}22`,
    border: `1px solid ${color}44`,
    color,
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 700,
    marginRight: 4,
    marginBottom: 4,
  }),
  slider: {
    WebkitAppearance: "none",
    width: 140,
    height: 4,
    borderRadius: 2,
    background: C.border,
    outline: "none",
    cursor: "pointer",
  },
  nodeCircle: (bg, border, glow) => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: bg,
    border: `2.5px solid ${border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 800,
    boxShadow: glow ? `0 0 16px ${border}88` : "none",
    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    flexShrink: 0,
    position: "relative",
  }),
};

// ─── PATTERN DATA ────────────────────────────────────────────────────────────
const PATTERNS = [
  { id: "hashmap", label: "Arrays & HashMap", color: C.accent, icon: "⚄" },
  { id: "twoptr", label: "Two Pointers", color: C.green, icon: "↔" },
  { id: "fastslow", label: "Fast & Slow", color: C.purple, icon: "⚡" },
  { id: "sliding", label: "Sliding Window", color: C.accent, icon: "⊡" },
  { id: "binsearch", label: "Binary Search", color: C.orange, icon: "⌖" },
  { id: "stack", label: "Mono Stack", color: C.red, icon: "▤" },
  { id: "bfs", label: "BFS", color: C.yellow, icon: "◎" },
  { id: "dfs", label: "DFS", color: C.pink, icon: "↯" },
  { id: "heap", label: "Heap (PQ)", color: C.orange, icon: "👑" },
  { id: "dp", label: "DP", color: "#818cf8", icon: "◈" },
  { id: "backtrack", label: "Backtracking", color: C.pink, icon: "↰" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function CodeBlock({ code, color }) {
  const lines = code.trim().split("\n");
  const regex = /(\/\/.*)|("[^"\\]*(?:\\.[^"\\]*)*")|(\b(int|while|for|if|return|Map|Set|HashMap|char|boolean|String|void|public|new|Queue|Stack|Deque|ArrayDeque|LinkedList|else|break|continue|List|ArrayList)\b)|(\b\d+\b)/g;

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  return (
    <div style={styles.code}>
      {lines.map((line, i) => {
        const escaped = escapeHtml(line);
        const highlighted = escaped.replace(regex, (match, comment, string, keyword, number) => {
          if (comment !== undefined) return `<span style="color:${C.muted}">${comment}</span>`;
          if (string !== undefined) return `<span style="color:${C.green}">${string}</span>`;
          if (keyword !== undefined) return `<span style="color:${color || C.accent}; font-weight: 700;">${keyword}</span>`;
          if (number !== undefined) return `<span style="color:${C.orange}">${number}</span>`;
          return match;
        });
        return (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <span style={{ color: C.muted, minWidth: 24, textAlign: "right", userSelect: "none", fontSize: 10 }}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>
        );
      })}
    </div>
  );
}

function MnemonicCard({ pattern, color }) {
  return (
    <div style={{ ...styles.infoCard(color), display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 1 }}>🧠 MNEMONIC</div>
      <div style={{ fontSize: 13, lineHeight: 1.6 }}>{pattern.mnemonic}</div>
    </div>
  );
}

function StoryCard({ story, color }) {
  return (
    <div style={{ ...styles.infoCard(color), display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 1 }}>📖 STORY METAPHOR</div>
      <div style={{ fontSize: 13, lineHeight: 1.6 }}>{story}</div>
    </div>
  );
}

function PainPoints({ points, color }) {
  return (
    <div style={{ marginTop: 12 }}>
      {points.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ color: C.red, fontSize: 13, marginTop: 1, flexShrink: 0 }}>⚠</span>
          <span style={{ fontSize: 12, lineHeight: 1.6, color: C.text }}>{p}</span>
        </div>
      ))}
    </div>
  );
}
