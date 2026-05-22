window.MonoStackViz = function MonoStackViz() {
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
};
