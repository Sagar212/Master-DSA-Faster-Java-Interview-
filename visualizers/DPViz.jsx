window.DPViz = function DPViz() {
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
};
