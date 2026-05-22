window.SlidingWindowViz = function SlidingWindowViz() {
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
};
