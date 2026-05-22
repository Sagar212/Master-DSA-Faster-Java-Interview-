window.TwoPointersViz = function TwoPointersViz() {
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
};
