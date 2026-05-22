window.FastSlowViz = function FastSlowViz() {
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
};
