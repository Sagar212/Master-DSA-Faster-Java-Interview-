function RecallTable() {
  const rows = [
    { pattern: "Arrays & HashMap", signal: "unsorted array, instant lookup, trade space for time", vars: "map, complement", tc: "O(n)", color: C.accent },
    { pattern: "Two Pointers", signal: "sorted array, pairs/triplets, in-place, O(1) space", vars: "left, right, result", tc: "O(n)", color: C.green },
    { pattern: "Fast & Slow", signal: "linked list cycle, middle, duplicate detection", vars: "slow, fast", tc: "O(n)", color: C.purple },
    { pattern: "Sliding Window", signal: "subarray/substring, contiguous, k-length or constraint", vars: "left, right, windowSum/freqMap, result", tc: "O(n)", color: C.accent },
    { pattern: "Binary Search", signal: "sorted, O(log n), minimize/maximize feasible answer", vars: "left, right, mid", tc: "O(log n)", color: C.orange },
    { pattern: "Mono Stack", signal: "next greater/smaller, span, histogram areas", vars: "stack (indices), result[]", tc: "O(n)", color: C.red },
    { pattern: "BFS", signal: "level order, shortest path (unweighted), neighbor spread", vars: "queue, visited, levelSize", tc: "O(V+E)", color: C.yellow },
    { pattern: "DFS", signal: "path existence, all paths, depth, connected components", vars: "visited, recursion/stack", tc: "O(V+E)", color: C.pink },
    { pattern: "Heap (PQ)", signal: "top K elements, running median, merging K sorted streams", vars: "minHeap/maxHeap", tc: "O(n log k)", color: C.orange },
    { pattern: "DP", signal: "optimal substructure, overlapping subproblems, count/min/max", vars: "dp[], memo", tc: "O(n² typ.)", color: "#818cf8" },
    { pattern: "Backtracking", signal: "generate all combinations/permutations/subsets, decision tree", vars: "path, startIdx, result", tc: "O(2ⁿ) typ.", color: C.pink },
  ];

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["Pattern", "Recognize When…", "Key Variables", "Time"].map((h) => (
                <th key={h} style={{ background: C.panel, padding: "10px 14px", textAlign: "left", color: C.muted, fontWeight: 800, fontSize: 11, letterSpacing: 1, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ color: r.color, fontWeight: 800 }}>{r.pattern}</span>
                </td>
                <td style={{ padding: "10px 14px", color: C.text, lineHeight: 1.5 }}>{r.signal}</td>
                <td style={{ padding: "10px 14px", fontFamily: "monospace", color: C.muted, fontSize: 11 }}>{r.vars}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...styles.badge(r.color), fontSize: 10 }}>{r.tc}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [activePattern, setActivePattern] = useState("hashmap");
  const [showRecall, setShowRecall] = useState(false);

  const activeConfig = PATTERNS.find((p) => p.id === activePattern);

  const renderViz = () => {
    switch (activePattern) {
      case "hashmap": return <window.ArraysHashMapViz />;
      case "sliding": return <window.SlidingWindowViz />;
      case "twoptr": return <window.TwoPointersViz />;
      case "fastslow": return <window.FastSlowViz />;
      case "binsearch": return <window.BinarySearchViz />;
      case "bfs": return <window.BFSViz />;
      case "dfs": return <window.DFSViz />;
      case "stack": return <window.MonoStackViz />;
      case "heap": return <window.HeapViz />;
      case "dp": return <window.DPViz />;
      case "backtrack": return <window.BacktrackViz />;
      default: return null;
    }
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>DSA.viz</div>
        <span style={styles.badge(C.accent)}>DARK MODE</span>
        <span style={styles.badge(C.green)}>JAVA</span>
        <span style={styles.badge(C.purple)}>INTERACTIVE</span>
        <button
          style={{ ...styles.btn(showRecall ? C.yellow : C.muted, !showRecall), marginLeft: "auto", fontSize: 11 }}
          onClick={() => setShowRecall(!showRecall)}
        >
          {showRecall ? "◀ Back to Visualizer" : "📋 Pattern Recall Table"}
        </button>
      </div>

      {/* Pattern Tabs */}
      <div style={styles.tabs}>
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            style={styles.tab(activePattern === p.id && !showRecall, p.color)}
            onClick={() => { setActivePattern(p.id); setShowRecall(false); }}
          >
            <span style={{ marginRight: 6 }}>{p.icon}</span>{p.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {showRecall ? (
          <div style={styles.section}>
            <div style={styles.sectionTitle(C.yellow)}>
              📋 PATTERN RECOGNITION CHEAT SHEET — Scan this before every problem
            </div>
            <RecallTable />
          </div>
        ) : (
          <>
            {/* Pattern Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 32 }}>{activeConfig?.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: activeConfig?.color }}>{activeConfig?.label}</div>
                <div style={{ fontSize: 12, color: C.muted }}>Interactive visualizer + Java template + memory anchors</div>
              </div>
            </div>

            {/* Visualizer */}
            <div style={styles.section}>
              <div style={styles.sectionTitle(activeConfig?.color)}>
                ⊡ LIVE VISUALIZER
              </div>
              {renderViz()}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 28px", background: C.panel, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: C.muted }}>Meta-strategy:</span>
        {["Recognize → Template → Dry-run → Code → Break it → Fix it"].map((s, i) => (
          <span key={i} style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>{s}</span>
        ))}
        <span style={{ fontSize: 11, color: C.muted, marginLeft: "auto" }}>Rewrite cold next day 🔁</span>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
