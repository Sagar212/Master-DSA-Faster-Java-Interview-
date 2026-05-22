window.BinarySearchViz = function BinarySearchViz() {
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
};
