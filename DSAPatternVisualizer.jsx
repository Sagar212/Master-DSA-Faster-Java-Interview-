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
  { id: "sliding", label: "Sliding Window", color: C.accent, icon: "⊡" },
  { id: "twoptr", label: "Two Pointers", color: C.green, icon: "↔" },
  { id: "fastslow", label: "Fast & Slow", color: C.purple, icon: "⚡" },
  { id: "binsearch", label: "Binary Search", color: C.orange, icon: "⌖" },
  { id: "bfs", label: "BFS", color: C.yellow, icon: "◎" },
  { id: "dfs", label: "DFS", color: C.pink, icon: "↯" },
  { id: "stack", label: "Mono Stack", color: C.red, icon: "▤" },
  { id: "dp", label: "DP", color: "#818cf8", icon: "◈" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function CodeBlock({ code, color }) {
  const lines = code.trim().split("\n");
  return (
    <div style={styles.code}>
      {lines.map((line, i) => {
        const keywords = ["int", "while", "for", "if", "return", "Map", "Set", "HashMap", "char", "boolean", "String", "void", "public", "new", "Queue", "Stack", "Deque", "ArrayDeque", "LinkedList", "else", "break", "continue"];
        const highlighted = line
          .replace(/\/\/.*/g, (m) => `<span style="color:${C.muted}">${m}</span>`)
          .replace(/"[^"]*"/g, (m) => `<span style="color:${C.green}">${m}</span>`)
          .replace(/\b(\d+)\b/g, (m) => `<span style="color:${C.orange}">${m}</span>`);
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

// ─── SLIDING WINDOW ──────────────────────────────────────────────────────────
function SlidingWindowViz() {
  const arr = [2, 1, 5, 1, 3, 2];
  const k = 3;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const maxStep = arr.length - k;

  const getSum = (s) => arr.slice(s, s + k).reduce((a, b) => a + b, 0);
  const sums = Array.from({ length: maxStep + 1 }, (_, i) => getSum(i));
  const maxSum = Math.max(...sums);

  const run = useCallback(async () => {
    setRunning(true);
    for (let i = 0; i <= maxStep; i++) {
      setStep(i);
      await sleep(700);
    }
    setRunning(false);
  }, [maxStep]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const pattern = {
    mnemonic: "EXPAND → CONTRACT → TRACK\nLeft anchor. Right grows. Shrink when violated. Record result.",
    painPoints: [
      "Forgetting to shrink left pointer when window constraint breaks",
      "Off-by-one on window size: use (right - left + 1) not (right - left)",
      "HashMap.getOrDefault() vs get() — null NPE on freq map updates",
    ],
  };

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.accent)} onClick={run} disabled={running}>▶ Animate</button>
        <button style={styles.btn(C.muted, true)} onClick={() => { setStep(0); setRunning(false); }}>↺ Reset</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: C.muted, fontSize: 12 }}>k = {k} | Step {step + 1}/{maxStep + 1}</span>
        </div>
        <div style={{ ...styles.badge(C.accent), marginLeft: "auto" }}>Window Sum: {sums[step]}</div>
        <div style={{ ...styles.badge(C.green) }}>Max: {maxSum}</div>
      </div>

      {/* Array visualization */}
      <div style={{ ...styles.arrayBox, marginBottom: 32, position: "relative" }}>
        {arr.map((v, i) => {
          const inWindow = i >= step && i < step + k;
          const isLeft = i === step;
          const isRight = i === step + k - 1;
          return (
            <div key={i} style={{ position: "relative", marginBottom: 24 }}>
              <div style={styles.cell(
                inWindow ? `${C.accent}22` : C.panel,
                inWindow ? C.accent : C.border,
                inWindow ? 1.1 : 1
              )}>
                {v}
                {isLeft && <span style={{ ...styles.label(C.green), bottom: -20 }}>L={step}</span>}
                {isRight && <span style={{ ...styles.label(C.orange), bottom: -20 }}>R={step + k - 1}</span>}
              </div>
              <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>{i}</div>
            </div>
          );
        })}
      </div>

      {/* Sum table */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {sums.map((s, i) => (
          <div key={i} style={{ ...styles.infoCard(i === step ? C.accent : C.muted), minWidth: 80, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.muted }}>start={i}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: i === step ? C.accent : (s === maxSum ? C.green : C.text) }}>{s}</div>
            {s === maxSum && <div style={{ fontSize: 9, color: C.green }}>MAX ★</div>}
          </div>
        ))}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.accent} story={<span><b>Magnifying Glass Sliding:</b> A magnifying glass sliding across data — add right, remove left, track the best. Fixed Window: Build first → Slide → Track. Variable Window: Expand until valid → Shrink while valid → Track.</span>} />
        <MnemonicCard pattern={pattern} color={C.accent} />
        <div style={{ ...styles.infoCard(C.orange) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orange, letterSpacing: 1, marginBottom: 6 }}>📌 STEPS</div>
          {["1. Fix window start = left", "2. Expand right pointer", "3. Slide: left++, right++", "4. Track max/result"].map((s, i) => (
            <div key={i} style={{ fontSize: 12, color: C.text, marginBottom: 3 }}>{s}</div>
          ))}
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, letterSpacing: 1, marginBottom: 6 }}>⚠ PAIN POINTS</div>
          {pattern.painPoints.slice(0, 2).map((p, i) => (
            <div key={i} style={{ fontSize: 11, color: C.text, marginBottom: 4 }}>• {p}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.accent)}>📋 LC Problems</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["#643 Max Avg Subarray I", "#3 Longest Substring No Repeat", "#76 Min Window Substring", "#239 Sliding Window Maximum", "#567 Permutation in String"].map((p, i) => (
            <span key={i} style={styles.tag(C.accent)}>{p}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.accent)}>⌨ Java Template</div>
        <CodeBlock color={C.accent} code={`// ========== FIXED WINDOW (LC #643) ==========
// STORY: Magnifying glass of width K slides across numbers
public double solve(int[] nums, int k) {
    double windowSum = 0, maxSum = 0;

    // STEP 1 — BUILD: Sum the first K elements
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;

    // STEP 2 — SLIDE: +right, -left
    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i];       // new enters from right
        windowSum -= nums[i - k];   // old exits from left

        // STEP 3 — TRACK: Update best
        maxSum = Math.max(maxSum, windowSum);
    }

    // STEP 4 — RETURN
    return maxSum / k;
}

// ========== VARIABLE WINDOW (Template) ==========
// STORY: Expand right until invalid → Shrink left until valid
public int solveVariable(int[] nums) {
    int left = 0, maxLen = 0;
    // int state = 0; // sum, count, freqMap, etc.

    // STEP 1 — EXPAND
    for (int right = 0; right < nums.length; right++) {
        // state += nums[right]; // add right to state

        // STEP 2 — SHRINK: While condition violated
        // while (state > target) {
        //     state -= nums[left]; left++;
        // }

        // STEP 3 — TRACK: Window is valid here
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`} />
      </div>
    </div>
  );
}

// ─── TWO POINTERS ────────────────────────────────────────────────────────────
function TwoPointersViz() {
  const arr = [-4, -1, 0, 2, 3, 5, 8];
  const target = 7;
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(arr.length - 1);
  const [found, setFound] = useState(null);
  const [running, setRunning] = useState(false);

  const reset = () => { setLeft(0); setRight(arr.length - 1); setFound(null); setRunning(false); };

  const animate = useCallback(async () => {
    setRunning(true);
    let l = 0, r = arr.length - 1;
    setLeft(l); setRight(r); setFound(null);
    while (l < r) {
      await sleep(700);
      const sum = arr[l] + arr[r];
      if (sum === target) { setFound([l, r]); break; }
      else if (sum < target) { l++; setLeft(l); }
      else { r--; setRight(r); }
    }
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.green)} onClick={animate} disabled={running}>▶ Find Target={target}</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.green), marginLeft: "auto" }}>Sum = {arr[left] + arr[right]}</div>
        {found && <div style={{ ...styles.badge(C.yellow) }}>✓ Found! [{found[0]},{found[1]}]</div>}
      </div>

      <div style={{ ...styles.arrayBox, marginBottom: 32 }}>
        {arr.map((v, i) => {
          const isLeft = i === left;
          const isRight = i === right;
          const isFound = found && (i === found[0] || i === found[1]);
          return (
            <div key={i} style={{ position: "relative", marginBottom: 24 }}>
              <div style={styles.cell(
                isFound ? `${C.yellow}33` : isLeft ? `${C.green}22` : isRight ? `${C.orange}22` : C.panel,
                isFound ? C.yellow : isLeft ? C.green : isRight ? C.orange : C.border,
                (isLeft || isRight || isFound) ? 1.15 : 1
              )}>
                {v}
                {isLeft && <span style={styles.label(C.green)}>L</span>}
                {isRight && <span style={styles.label(C.orange)}>R</span>}
              </div>
              <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>{i}</div>
            </div>
          );
        })}
      </div>

      {/* Decision logic viz */}
      <div style={styles.infoGrid}>
        <StoryCard color={C.green} story={<span><b>Two People on a Sorted Road:</b> Kids sorted by height. Need two kids for a target height. Start with shortest (left) and tallest (right). Too short together? Replace the shorter kid with the next taller one (left++). Move the one that fixes the problem!</span>} />
        <div style={{ ...styles.infoCard(C.green) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.green, marginBottom: 8 }}>🔑 DECISION RULE</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div style={{ color: arr[left] + arr[right] < target ? C.green : C.muted }}>sum &lt; target → left++</div>
            <div style={{ color: arr[left] + arr[right] > target ? C.orange : C.muted }}>sum &gt; target → right--</div>
            <div style={{ color: arr[left] + arr[right] === target ? C.yellow : C.muted }}>sum == target → 🎯 done</div>
          </div>
        </div>
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>SQUEEZE from ends inward. Too small? Lift the floor (L++). Too big? Drop the ceiling (R--).</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Array MUST be sorted first. Skip duplicates for triplet problems (while L&lt;R && same).</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#167 Two Sum II", "#15 3Sum", "#11 Container With Most Water", "#42 Trapping Rain Water", "#977 Squares Sorted Array"].map((p, i) => (
          <span key={i} style={styles.tag(C.green)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.green)}>⌨ Java Template</div>
        <CodeBlock color={C.green} code={`// LC #167 — Two Sum II (Sorted Array)
// STORY: Shortest + tallest kid. Too short? Next taller. Too tall? Next shorter.
public int[] solve(int[] nums, int target) {
    // STEP 1 — INIT: Pointers at opposite ends
    int left = 0, right = nums.length - 1;

    // STEP 2 — LOOP: Narrow inward until they meet
    while (left < right) {
        int sum = nums[left] + nums[right];

        // STEP 3 — CHECK: Compare and decide which to move
        if (sum == target) {
            return new int[]{left + 1, right + 1};
        } else if (sum < target) {
            left++;   // too small → move left up
        } else {
            right--;  // too big → move right down
        }
    }

    // STEP 4 — RETURN
    return new int[]{-1, -1};
}`} />
      </div>
    </div>
  );
}

// ─── FAST & SLOW POINTERS ────────────────────────────────────────────────────
function FastSlowViz() {
  // Linked list: 1→2→3→4→5→3 (cycle at index 2)
  const nodes = [1, 2, 3, 4, 5];
  const cycleAt = 2; // 5→3
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [step, setStep] = useState(0);
  const [detected, setDetected] = useState(false);
  const [running, setRunning] = useState(false);

  const next = (pos) => {
    const nxt = pos + 1;
    if (nxt >= nodes.length) return cycleAt;
    return nxt;
  };

  const animate = useCallback(async () => {
    setRunning(true);
    let s = 0, f = 0, st = 0;
    setSlow(s); setFast(f); setStep(st); setDetected(false);
    for (let iter = 0; iter < 12; iter++) {
      await sleep(600);
      s = next(s);
      f = next(next(f));
      st = iter + 1;
      setSlow(s); setFast(f); setStep(st);
      if (s === f) { setDetected(true); break; }
    }
    setRunning(false);
  }, []);

  const reset = () => { setSlow(0); setFast(0); setStep(0); setDetected(false); setRunning(false); };

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.purple)} onClick={animate} disabled={running}>▶ Detect Cycle</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.purple), marginLeft: "auto" }}>Step {step}</div>
        {detected && <div style={{ ...styles.badge(C.green) }}>🔁 Cycle Detected!</div>}
      </div>

      {/* Linked list visualization */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32, flexWrap: "wrap" }}>
        {nodes.map((v, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ position: "relative", marginBottom: 8 }}>
              <div style={styles.nodeCircle(
                detected && slow === i ? `${C.green}33` : slow === i || fast === i ? `${C.purple}22` : C.panel,
                detected && slow === i ? C.green : slow === i ? C.accent : fast === i ? C.orange : C.border,
                slow === i || fast === i
              )}>
                {v}
                <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 2 }}>
                  {slow === i && <span style={{ fontSize: 9, color: C.accent, fontWeight: 800 }}>S</span>}
                  {fast === i && <span style={{ fontSize: 9, color: C.orange, fontWeight: 800 }}>F</span>}
                </div>
              </div>
              <div style={{ textAlign: "center", fontSize: 10, color: C.muted }}>idx {i}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ width: 24, height: 2, background: C.border, margin: "0 4px", marginBottom: 8 }} />
            )}
          </div>
        ))}
        {/* Cycle arrow */}
        <div style={{ fontSize: 11, color: C.red, marginLeft: 8, marginBottom: 8 }}>
          → [cycle back to idx {cycleAt}]
        </div>
      </div>

      {/* Step table */}
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", gap: 1, marginBottom: 20, fontSize: 12 }}>
        {["Step", "Slow (×1)", "Fast (×2)", "Equal?"].map((h, i) => (
          <div key={i} style={{ background: C.panel, padding: "6px 12px", color: C.muted, fontWeight: 700, fontSize: 11 }}>{h}</div>
        ))}
        {[
          [0, 0, 0, "—"],
          [1, 1, 2, "No"],
          [2, 2, 4, "No"],
          [3, 3, 3, "⚠"],
          [4, 4, 3, "No"],
          [5, 5, 5, "⚠"],
          [6, 2, 2, "✓ CYCLE"],
        ].map((row, ri) => row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} style={{
            background: ri === step ? `${C.purple}22` : "transparent",
            border: `1px solid ${C.border}`,
            padding: "5px 12px",
            color: cell === "✓ CYCLE" ? C.green : ci === 3 && cell !== "—" && cell !== "No" ? C.orange : C.text,
            fontWeight: cell === "✓ CYCLE" ? 800 : 400,
          }}>{cell}</div>
        )))}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.purple} story={<span><b>Tortoise & Hare:</b> Two people running on a track. One runs 1 step, the other 2. If there's a loop, the fast one WILL lap the slow one and they meet. If it's a straight line, fast one hits the end.</span>} />
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>🧠 TORTOISE & HARE</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Slow moves 1 step. Fast moves 2. If cycle exists, they MUST meet inside it. Floyd's theorem guarantees this.</div>
        </div>
        <div style={{ ...styles.infoCard(C.accent) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 6 }}>🎯 ALSO USED FOR</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>• Middle of linked list (when fast hits end, slow = mid)<br/>• Happy number detection<br/>• Find duplicate (array as list)</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#141 Linked List Cycle", "#142 Cycle II (entry point)", "#876 Middle of LL", "#202 Happy Number", "#287 Find Duplicate"].map((p, i) => (
          <span key={i} style={styles.tag(C.purple)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.purple)}>⌨ Java Template</div>
        <CodeBlock color={C.purple} code={`// LC #141 — Linked List Cycle
// STORY: Tortoise & Hare. If loop exists, fast WILL lap slow.
public boolean hasCycle(ListNode head) {
    // STEP 1 — INIT: Both start at head
    ListNode slow = head, fast = head;

    // STEP 2 — LOOP: Fast moves 2, slow moves 1
    while (fast != null && fast.next != null) {
        slow = slow.next;           // tortoise: 1 step
        fast = fast.next.next;      // hare: 2 steps

        // STEP 3 — CHECK: They met = cycle exists
        if (slow == fast) return true;
    }

    // STEP 4 — RETURN: Fast hit null = no cycle
    return false;
}

// LC #876 — Middle of Linked List
// STORY: When fast finishes, slow is at the middle
public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow; // slow = middle
}`} />
      </div>
    </div>
  );
}

// ─── BINARY SEARCH ───────────────────────────────────────────────────────────
function BinarySearchViz() {
  const arr = [1, 3, 5, 7, 9, 11, 13, 17, 21, 25];
  const target = 13;
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(arr.length - 1);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(null);
  const [eliminated, setEliminated] = useState([]);
  const [running, setRunning] = useState(false);

  const reset = () => { setLeft(0); setRight(arr.length - 1); setMid(null); setFound(null); setEliminated([]); setRunning(false); };

  const animate = useCallback(async () => {
    setRunning(true);
    let l = 0, r = arr.length - 1, elim = [];
    setLeft(l); setRight(r); setMid(null); setFound(null); setEliminated([]);

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setMid(m); setLeft(l); setRight(r);
      await sleep(800);
      if (arr[m] === target) { setFound(m); break; }
      else if (arr[m] < target) {
        for (let i = l; i <= m; i++) elim.push(i);
        setEliminated([...elim]);
        l = m + 1;
      } else {
        for (let i = m; i <= r; i++) elim.push(i);
        setEliminated([...elim]);
        r = m - 1;
      }
    }
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.orange)} onClick={animate} disabled={running}>▶ Search {target}</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.orange), marginLeft: "auto" }}>L={left} M={mid ?? "?"} R={right}</div>
        {found !== null && <div style={{ ...styles.badge(C.green) }}>✓ Found at idx {found}</div>}
      </div>

      <div style={{ ...styles.arrayBox, marginBottom: 32 }}>
        {arr.map((v, i) => {
          const isMid = i === mid;
          const isLeft = i === left;
          const isRight = i === right;
          const isElim = eliminated.includes(i);
          const isFound = i === found;
          return (
            <div key={i} style={{ position: "relative", marginBottom: 24 }}>
              <div style={styles.cell(
                isFound ? `${C.green}33` : isMid ? `${C.orange}33` : isElim ? "#0d0f1488" : C.panel,
                isFound ? C.green : isMid ? C.orange : isElim ? C.border : isLeft || isRight ? C.accent : C.border,
                isMid || isFound ? 1.15 : isElim ? 0.85 : 1
              )}>
                <span style={{ opacity: isElim ? 0.3 : 1, color: isMid ? C.orange : isFound ? C.green : C.text }}>{v}</span>
                {isMid && !isFound && <span style={styles.label(C.orange)}>MID</span>}
                {isLeft && !isElim && <span style={{ ...styles.label(C.accent), bottom: -30 }}>L</span>}
                {isRight && !isElim && <span style={{ ...styles.label(C.accent), bottom: -30 }}>R</span>}
                {isFound && <span style={styles.label(C.green)}>FOUND!</span>}
              </div>
              <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>{i}</div>
            </div>
          );
        })}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.orange} story={<span><b>Dictionary Lookup:</b> Open a dictionary to the middle — too far? Rip out the right half and go left. Too early? Rip out the left half and go right. Each step HALVES the remaining pages.</span>} />
        <div style={{ ...styles.infoCard(C.orange) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orange, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>HALVE & ELIMINATE. Wrong half disappears. O(log n) because you halve each step. Always think: "can I binary search the ANSWER space?"</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ #1 PITFALL</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text, fontFamily: "monospace" }}>mid = left + (right-left)/2</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>NOT (left+right)/2 — causes integer overflow when both are large!</div>
        </div>
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>📐 VARIANTS</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>• Classic: find exact value</div>
            <div>• Lower bound: first occurrence</div>
            <div>• Upper bound: last occurrence</div>
            <div>• On answer: min/max feasibility</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#704 Binary Search", "#33 Search Rotated", "#153 Min Rotated", "#875 Koko Eating", "#1011 Ship Packages"].map((p, i) => (
          <span key={i} style={styles.tag(C.orange)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.orange)}>⌨ Java Template</div>
        <CodeBlock color={C.orange} code={`// LC #704 — Binary Search
// STORY: Dictionary. Open middle → too far? Go left. Too early? Go right.
public int solve(int[] nums, int target) {
    // STEP 1 — INIT: Set search boundaries
    int left = 0, right = nums.length - 1;

    // STEP 2 — LOOP: Keep halving until boundaries cross
    while (left <= right) {
        // STEP 3 — MID: Calculate middle (overflow-safe!)
        int mid = left + (right - left) / 2;

        // STEP 4 — CHECK: Compare and halve
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;   // eliminate left half
        } else {
            right = mid - 1;  // eliminate right half
        }
    }

    // STEP 5 — RETURN
    return -1;
}`} />
      </div>
    </div>
  );
}

// ─── BFS ─────────────────────────────────────────────────────────────────────
function BFSViz() {
  // Tree: 1 → [2,3] → [4,5,6,7]
  const tree = {
    nodes: [
      { id: 0, val: 1, x: 50, y: 8 },
      { id: 1, val: 2, x: 25, y: 35 },
      { id: 2, val: 3, x: 75, y: 35 },
      { id: 3, val: 4, x: 10, y: 65 },
      { id: 4, val: 5, x: 40, y: 65 },
      { id: 5, val: 6, x: 60, y: 65 },
      { id: 6, val: 7, x: 90, y: 65 },
    ],
    edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],
    children: { 0:[1,2], 1:[3,4], 2:[5,6], 3:[], 4:[], 5:[], 6:[] },
  };

  const [visited, setVisited] = useState([]);
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [levels, setLevels] = useState([]);
  const [running, setRunning] = useState(false);

  const reset = () => { setVisited([]); setQueue([]); setCurrent(null); setLevels([]); setRunning(false); };

  const animate = useCallback(async () => {
    setRunning(true);
    let vis = [], q = [0], lvls = [], cur = null;
    setQueue([...q]); setVisited([...vis]); setLevels([...lvls]);

    while (q.length > 0) {
      const levelSize = q.length;
      const level = [];
      for (let i = 0; i < levelSize; i++) {
        cur = q.shift();
        setCurrent(cur); setQueue([...q]);
        await sleep(600);
        vis.push(cur); level.push(tree.nodes[cur].val);
        setVisited([...vis]);
        for (const child of tree.children[cur]) {
          q.push(child);
          setQueue([...q]);
        }
        await sleep(300);
      }
      lvls.push(level); setLevels([...lvls]);
    }
    setCurrent(null);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.yellow)} onClick={animate} disabled={running}>▶ BFS Level Order</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.yellow), marginLeft: "auto" }}>Queue: [{queue.map(i => tree.nodes[i].val).join(",")}]</div>
      </div>

      {/* SVG Tree */}
      <div style={{ position: "relative", height: 200, marginBottom: 20, background: C.panel, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {tree.edges.map(([a, b], i) => (
            <line key={i}
              x1={`${tree.nodes[a].x}%`} y1={`${tree.nodes[a].y + 4}%`}
              x2={`${tree.nodes[b].x}%`} y2={`${tree.nodes[b].y + 4}%`}
              stroke={C.border} strokeWidth={2} />
          ))}
        </svg>
        {tree.nodes.map((n) => {
          const isVisited = visited.includes(n.id);
          const isCurrent = current === n.id;
          const isInQueue = queue.includes(n.id);
          return (
            <div key={n.id} style={{
              ...styles.nodeCircle(
                isCurrent ? `${C.yellow}44` : isVisited ? `${C.green}33` : isInQueue ? `${C.orange}22` : C.panel,
                isCurrent ? C.yellow : isVisited ? C.green : isInQueue ? C.orange : C.border,
                isCurrent || isInQueue
              ),
              position: "absolute",
              left: `${n.x}%`, top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
              width: 36, height: 36, fontSize: 13,
            }}>
              {n.val}
            </div>
          );
        })}
      </div>

      {/* Level output */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: C.muted }}>Levels:</span>
        {levels.map((lvl, i) => (
          <div key={i} style={{ ...styles.badge(C.yellow) }}>L{i}: [{lvl.join(",")}]</div>
        ))}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.yellow} story={<span><b>Fire Drill / Loudspeaker:</b> Evacuate building floor by floor. Visit EVERYONE on the current floor before going to the next floor. Use a QUEUE (FIFO) — Who's in my wave front right now?</span>} />
        <div style={{ ...styles.infoCard(C.yellow) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.yellow, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>RIPPLE in a pond. Layer by layer outward. Queue = FIFO. "Who's in my wave front right now?"</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Mark visited WHEN ENQUEUED not when dequeued — or you re-add nodes and loop forever on graphs.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#102 Level Order", "#199 Right Side View", "#994 Rotting Oranges", "#127 Word Ladder", "#1926 Maze I"].map((p, i) => (
          <span key={i} style={styles.tag(C.yellow)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.yellow)}>⌨ Java Template</div>
        <CodeBlock color={C.yellow} code={`// LC #102 — Level Order Traversal
// STORY: Loudspeaker announces each floor. Queue = FIFO.
public List<List<Integer>> solve(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    // STEP 1 — INIT: Seed queue with root
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    // STEP 2 — LOOP: Process level by level
    while (!queue.isEmpty()) {
        // STEP 3 — SNAPSHOT: Lock this level's count
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();

        // STEP 4 — DRAIN: Process exactly one level
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }

    // STEP 5 — RETURN
    return result;
}`} />
      </div>
    </div>
  );
}

// ─── DFS ─────────────────────────────────────────────────────────────────────
function DFSViz() {
  const tree = {
    nodes: [
      { id: 0, val: 1, x: 50, y: 8 },
      { id: 1, val: 2, x: 25, y: 35 },
      { id: 2, val: 3, x: 75, y: 35 },
      { id: 3, val: 4, x: 10, y: 65 },
      { id: 4, val: 5, x: 40, y: 65 },
      { id: 5, val: 6, x: 60, y: 65 },
      { id: 6, val: 7, x: 90, y: 65 },
    ],
    edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],
    children: { 0:[1,2], 1:[3,4], 2:[5,6], 3:[], 4:[], 5:[], 6:[] },
  };

  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const [stack, setStack] = useState([]);
  const [order, setOrder] = useState([]);
  const [running, setRunning] = useState(false);

  const reset = () => { setVisited([]); setCurrent(null); setStack([]); setOrder([]); setRunning(false); };

  const animateDFS = useCallback(async () => {
    setRunning(true);
    const vis = [], ord = [];
    const dfs = async (node, stk) => {
      stk = [...stk, node];
      setStack([...stk]); setCurrent(node);
      await sleep(600);
      vis.push(node); ord.push(tree.nodes[node].val);
      setVisited([...vis]); setOrder([...ord]);
      for (const child of tree.children[node]) {
        await dfs(child, stk);
      }
      stk.pop(); setStack([...stk]);
    };
    await dfs(0, []);
    setCurrent(null);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.pink)} onClick={animateDFS} disabled={running}>▶ DFS Preorder</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.pink), marginLeft: "auto" }}>Stack depth: {stack.length}</div>
      </div>

      <div style={{ position: "relative", height: 200, marginBottom: 20, background: C.panel, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {tree.edges.map(([a, b], i) => (
            <line key={i}
              x1={`${tree.nodes[a].x}%`} y1={`${tree.nodes[a].y + 4}%`}
              x2={`${tree.nodes[b].x}%`} y2={`${tree.nodes[b].y + 4}%`}
              stroke={stack.includes(a) && stack.includes(b) ? C.pink : C.border}
              strokeWidth={stack.includes(a) && stack.includes(b) ? 2 : 1.5} />
          ))}
        </svg>
        {tree.nodes.map((n) => {
          const isVisited = visited.includes(n.id);
          const isCurrent = current === n.id;
          const isInStack = stack.includes(n.id);
          return (
            <div key={n.id} style={{
              ...styles.nodeCircle(
                isCurrent ? `${C.pink}44` : isVisited ? `${C.green}33` : isInStack ? `${C.pink}18` : C.panel,
                isCurrent ? C.pink : isVisited ? C.green : isInStack ? C.pink : C.border,
                isCurrent
              ),
              position: "absolute",
              left: `${n.x}%`, top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
              width: 36, height: 36, fontSize: 13,
            }}>
              {n.val}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: C.muted }}>Visit order:</span>
        {order.map((v, i) => (
          <div key={i} style={{ ...styles.badge(C.pink) }}>{i+1}:{v}</div>
        ))}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.pink} story={<span><b>Deep Path Exploration:</b> Visit one branch ALL THE WAY DOWN until you get stuck, then reverse (backtrack). Like walking to the deepest room of a house before checking others. Uses a STACK.</span>} />
        <div style={{ ...styles.infoCard(C.pink) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.pink, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>COMMIT & BACKTRACK. Go deep until stuck, then reverse. Stack (call stack or explicit) is your trail of breadcrumbs.</div>
        </div>
        <div style={{ ...styles.infoCard(C.accent) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 6 }}>📐 3 ORDERS</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>• Pre: <b>node</b> → L → R (most common)</div>
            <div>• In: L → <b>node</b> → R (BST sorted)</div>
            <div>• Post: L → R → <b>node</b> (bottom-up)</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#104 Max Depth", "#112 Path Sum", "#230 Kth Smallest BST", "#200 Number of Islands", "#79 Word Search"].map((p, i) => (
          <span key={i} style={styles.tag(C.pink)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.pink)}>⌨ Java Template</div>
        <CodeBlock color={C.pink} code={`// LC #104 — Maximum Depth of Binary Tree
// STORY: How deep is the well? max(left, right) + 1
public int solve(TreeNode root) {
    // STEP 1 — BASE CASE: Null = depth 0
    if (root == null) return 0;

    // STEP 2 — RECURSE: Ask left and right for their depths
    int leftDepth = solve(root.left);
    int rightDepth = solve(root.right);

    // STEP 3 — RETURN: Max of both + 1 (this level)
    return Math.max(leftDepth, rightDepth) + 1;
}`} />
      </div>
    </div>
  );
}

// ─── MONOTONIC STACK ─────────────────────────────────────────────────────────
function MonoStackViz() {
  const arr = [2, 1, 5, 3, 6, 4, 8, 2];
  const [stack, setStack] = useState([]);
  const [result, setResult] = useState(new Array(arr.length).fill(-1));
  const [currentIdx, setCurrentIdx] = useState(null);
  const [running, setRunning] = useState(false);

  const reset = () => { setStack([]); setResult(new Array(arr.length).fill(-1)); setCurrentIdx(null); setRunning(false); };

  const animate = useCallback(async () => {
    setRunning(true);
    let stk = [], res = new Array(arr.length).fill(-1);
    setStack([]); setResult([...res]);

    for (let i = 0; i < arr.length; i++) {
      setCurrentIdx(i);
      await sleep(600);
      // Pop all elements smaller than arr[i]
      while (stk.length > 0 && arr[stk[stk.length - 1]] < arr[i]) {
        const idx = stk.pop();
        res[idx] = arr[i];
        setResult([...res]); setStack([...stk]);
        await sleep(300);
      }
      stk.push(i);
      setStack([...stk]);
      await sleep(300);
    }
    setCurrentIdx(null);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.red)} onClick={animate} disabled={running}>▶ Next Greater Element</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.red), marginLeft: "auto" }}>Stack: [{stack.map(i => arr[i]).join(",")}]</div>
      </div>

      {/* Array */}
      <div style={{ ...styles.arrayBox, marginBottom: 8 }}>
        {arr.map((v, i) => {
          const inStack = stack.includes(i);
          const isCurrent = i === currentIdx;
          const hasResult = result[i] !== -1;
          return (
            <div key={i} style={{ position: "relative", marginBottom: 40 }}>
              <div style={styles.cell(
                isCurrent ? `${C.red}33` : inStack ? `${C.orange}22` : hasResult ? `${C.green}18` : C.panel,
                isCurrent ? C.red : inStack ? C.orange : hasResult ? C.green : C.border,
                isCurrent || inStack ? 1.1 : 1
              )}>
                {v}
              </div>
              <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: hasResult ? C.green : C.muted, fontWeight: hasResult ? 800 : 400, whiteSpace: "nowrap" }}>
                →{result[i] === -1 ? "?" : result[i]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack visualization */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>Stack (indices) — LIFO, maintaining decreasing values:</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
          {stack.map((idx, si) => (
            <div key={si} style={{
              width: 44,
              height: 30 + si * 5,
              background: `${C.red}22`,
              border: `1.5px solid ${C.red}66`,
              borderRadius: "4px 4px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              color: C.red,
            }}>
              {arr[idx]}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.red} story={<span><b>VIP Bouncer / Waiting Line:</b> People in a queue holding a temp sign. When someone WARMER arrives, everyone cooler in front gets their answer! Bouncer: New arrival evicts anyone shorter.</span>} />
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>BOUNCER at the door. New arrival evicts anyone shorter. Stack stays monotonically DECREASING (for NGE). Evicted elements found their answer.</div>
        </div>
        <div style={{ ...styles.infoCard(C.orange) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orange, marginBottom: 6 }}>⚠ KEY INSIGHT</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>When you POP: the popped element's answer IS the current element. Every element is pushed/popped at most once → O(n).</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#496 Next Greater I", "#739 Daily Temperatures", "#84 Largest Rectangle Histogram", "#42 Trapping Rain Water", "#901 Stock Span"].map((p, i) => (
          <span key={i} style={styles.tag(C.red)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.red)}>⌨ Java Template</div>
        <CodeBlock color={C.red} code={`// LC #739 — Daily Temperatures
// STORY: Waiting in line for warmer day. Warmer arrives → pop cooler days.
public int[] solve(int[] temperatures) {
    int[] answer = new int[temperatures.length];

    // STEP 1 — INIT: Stack of INDICES waiting for warmer
    Stack<Integer> waiting = new Stack<>();

    // STEP 2 — LOOP: Go through each day
    for (int today = 0; today < temperatures.length; today++) {

        // STEP 3 — CHECK: Is today warmer than top of stack?
        while (!waiting.isEmpty()
                && temperatures[today] > temperatures[waiting.peek()]) {
            int coldDay = waiting.pop();
            answer[coldDay] = today - coldDay; // wait time
        }

        // STEP 4 — STORE: Push today (still waiting)
        waiting.push(today);
    }

    // STEP 5 — RETURN
    return answer;
}`} />
      </div>
    </div>
  );
}

// ─── DP ──────────────────────────────────────────────────────────────────────
function DPViz() {
  const coins = [1, 5, 6, 9];
  const amount = 11;
  const [dp, setDp] = useState(new Array(amount + 1).fill(Infinity));
  const [currentAmt, setCurrentAmt] = useState(null);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [running, setRunning] = useState(false);

  const reset = () => {
    const d = new Array(amount + 1).fill(Infinity);
    d[0] = 0;
    setDp(d); setCurrentAmt(null); setCurrentCoin(null); setRunning(false);
  };

  useEffect(() => { reset(); }, []);

  const animate = useCallback(async () => {
    setRunning(true);
    const d = new Array(amount + 1).fill(Infinity);
    d[0] = 0;
    setDp([...d]);
    for (let a = 1; a <= amount; a++) {
      setCurrentAmt(a);
      for (const coin of coins) {
        setCurrentCoin(coin);
        await sleep(250);
        if (a - coin >= 0 && d[a - coin] !== Infinity) {
          d[a] = Math.min(d[a], d[a - coin] + 1);
          setDp([...d]);
        }
      }
    }
    setCurrentAmt(null); setCurrentCoin(null);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn("#818cf8")} onClick={animate} disabled={running}>▶ Fill DP Table</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge("#818cf8"), marginLeft: "auto" }}>Coins: [{coins.join(",")}] | Amount: {amount}</div>
        {dp[amount] !== Infinity && <div style={{ ...styles.badge(C.green) }}>Min coins: {dp[amount]}</div>}
      </div>

      {/* DP table */}
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 4, minWidth: "max-content" }}>
          {dp.map((v, i) => {
            const isCurrent = i === currentAmt;
            const isDone = v !== Infinity;
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={styles.cell(
                  isCurrent ? `#818cf866` : isDone ? `#818cf818` : C.panel,
                  isCurrent ? "#818cf8" : isDone ? "#818cf844" : C.border,
                  isCurrent ? 1.12 : 1
                )}>
                  {v === Infinity ? "∞" : v}
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{i}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coins being tried */}
      {currentCoin && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Trying coin</span>
          <span style={{ ...styles.badge("#818cf8"), fontSize: 14 }}>{currentCoin}</span>
          <span style={{ fontSize: 12, color: C.muted }}>for amount</span>
          <span style={{ ...styles.badge(C.accent) }}>{currentAmt}</span>
          <span style={{ fontSize: 12, color: C.muted }}>→ dp[{currentAmt - currentCoin}] + 1 = {dp[currentAmt - currentCoin] === Infinity ? "∞" : dp[currentAmt - currentCoin] + 1}</span>
        </div>
      )}

      <div style={styles.infoGrid}>
        <StoryCard color={"#818cf8"} story={<span><b>Notebook of Saved Answers:</b> Chef's Recipe. Each answer builds from smaller subproblems already solved in a notebook. dp[i] is the best answer so far for i. Never recompute!</span>} />
        <div style={{ ...styles.infoCard("#818cf8") }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#818cf8", marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>CHEF'S RECIPE. Each answer builds from smaller subproblems already solved. dp[i] = "best answer so far for i". Never recompute.</div>
        </div>
        <div style={{ ...styles.infoCard(C.orange) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orange, marginBottom: 6 }}>📐 RECURRENCE</div>
          <div style={{ fontSize: 13, fontFamily: "monospace", lineHeight: 2 }}>
            dp[0] = 0<br />
            dp[a] = min(dp[a-c]+1)<br />
            for each coin c
          </div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Initialize dp[0]=0, rest=∞ (not -1). Use Integer.MAX_VALUE/2 to avoid overflow when adding 1.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#322 Coin Change", "#70 Climbing Stairs", "#198 House Robber", "#300 LIS", "#1143 LCS"].map((p, i) => (
          <span key={i} style={styles.tag("#818cf8")}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle("#818cf8")}>⌨ Java Template</div>
        <CodeBlock color="#818cf8" code={`// LC #70 — Climbing Stairs (Fibonacci DP)
// STORY: ways(N) = ways(N-1) + ways(N-2). It's Fibonacci!
public int solve(int n) {
    if (n <= 2) return n;

    // STEP 1 — INIT: Base cases (seeds)
    int prev2 = 1; // ways to reach step 1
    int prev1 = 2; // ways to reach step 2

    // STEP 2 — LOOP: Build up from step 3
    for (int i = 3; i <= n; i++) {
        // STEP 3 — RECURRENCE: ways(i) = ways(i-1) + ways(i-2)
        int current = prev1 + prev2;

        // STEP 4 — SHIFT: Move window forward
        prev2 = prev1;
        prev1 = current;
    }

    // STEP 5 — RETURN
    return prev1;
}`} />
      </div>
    </div>
  );
}

// ─── MEMORY RECALL TABLE ─────────────────────────────────────────────────────
function RecallTable() {
  const rows = [
    { pattern: "Sliding Window", signal: "subarray/substring, contiguous, k-length or constraint", vars: "left, right, windowSum/freqMap, result", tc: "O(n)", color: C.accent },
    { pattern: "Two Pointers", signal: "sorted array, pairs/triplets, in-place, O(1) space", vars: "left, right, result", tc: "O(n)", color: C.green },
    { pattern: "Fast & Slow", signal: "linked list cycle, middle, duplicate detection", vars: "slow, fast", tc: "O(n)", color: C.purple },
    { pattern: "Binary Search", signal: "sorted, O(log n), minimize/maximize feasible answer", vars: "left, right, mid", tc: "O(log n)", color: C.orange },
    { pattern: "BFS", signal: "level order, shortest path (unweighted), neighbor spread", vars: "queue, visited, levelSize", tc: "O(V+E)", color: C.yellow },
    { pattern: "DFS", signal: "path existence, all paths, depth, connected components", vars: "visited, recursion/stack", tc: "O(V+E)", color: C.pink },
    { pattern: "Mono Stack", signal: "next greater/smaller, span, histogram areas", vars: "stack (indices), result[]", tc: "O(n)", color: C.red },
    { pattern: "DP", signal: "optimal substructure, overlapping subproblems, count/min/max", vars: "dp[], memo", tc: "O(n²) typ.", color: "#818cf8" },
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
  const [activePattern, setActivePattern] = useState("sliding");
  const [showRecall, setShowRecall] = useState(false);

  const activeConfig = PATTERNS.find((p) => p.id === activePattern);

  const renderViz = () => {
    switch (activePattern) {
      case "sliding": return <SlidingWindowViz />;
      case "twoptr": return <TwoPointersViz />;
      case "fastslow": return <FastSlowViz />;
      case "binsearch": return <BinarySearchViz />;
      case "bfs": return <BFSViz />;
      case "dfs": return <DFSViz />;
      case "stack": return <MonoStackViz />;
      case "dp": return <DPViz />;
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
