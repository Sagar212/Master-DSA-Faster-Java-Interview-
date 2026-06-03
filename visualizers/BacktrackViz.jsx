window.BacktrackViz = function BacktrackViz() {
  const nums = [1, 2, 3];
  const [currentPath, setCurrentPath] = useState([]);
  const [results, setResults] = useState([]);
  const [stepDesc, setStepDesc] = useState("Click start to explore subsets");
  const [running, setRunning] = useState(false);

  const reset = () => {
    setCurrentPath([]);
    setResults([]);
    setStepDesc("Ready to start");
    setRunning(false);
  };

  const animate = useCallback(async () => {
    setRunning(true);
    const tempResults = [];
    setResults([]);
    setCurrentPath([]);

    // Recursive helper to simulate backtracking with sleep
    async function backtrack(start, path) {
      // Add current state clone to results
      tempResults.push([...path]);
      setResults([...tempResults]);
      setStepDesc(`Found subset: [${path.join(", ")}]. Added to results list.`);
      await sleep(1200);

      for (let i = start; i < nums.length; i++) {
        // Choose
        path.push(nums[i]);
        setCurrentPath([...path]);
        setStepDesc(`Choose: add ${nums[i]} at index ${i}. Path is now [${path.join(", ")}]. Recursing...`);
        await sleep(1200);

        // Explore
        await backtrack(i + 1, path);

        // Unchoose (Backtrack)
        const popped = path.pop();
        setCurrentPath([...path]);
        setStepDesc(`Backtrack: remove ${popped}. Path restored to [${path.join(", ")}].`);
        await sleep(1200);
      }
    }

    await backtrack(0, []);
    setStepDesc(`Completed! Generated all ${tempResults.length} subsets.`);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.pink)} onClick={animate} disabled={running}>▶ Generate Subsets of [1, 2, 3]</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
      </div>

      <div style={{ padding: 16, background: "rgba(0,0,0,0.2)", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 20, minHeight: 50, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.pink, fontWeight: 700, marginRight: 8 }}>EXPLORER DIALOG:</span>
        <span style={{ fontSize: 13, color: C.text }}>{stepDesc}</span>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
        {/* Current Path Stack */}
        <div style={{ flex: "1 1 300px", background: "rgba(255,255,255,0.02)", border: `1px dashed ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: C.pink, marginBottom: 12, fontWeight: 800 }}>🎒 CURRENT PATH (RECURSION STACK)</div>
          {currentPath.length === 0 ? (
            <div style={{ color: C.muted, fontSize: 12, fontStyle: "italic" }}>Empty Path [] (Base state)</div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              {currentPath.map((v, i) => (
                <div key={i} style={styles.cell(`${C.pink}22`, C.pink, 1.1)}>
                  {v}
                  <span style={styles.label(C.muted)}>lvl {i}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results List */}
        <div style={{ flex: "1 1 300px", background: "rgba(255,255,255,0.02)", border: `1px dashed ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: C.green, marginBottom: 12, fontWeight: 800 }}>📋 GENERATED SUBSETS ({results.length})</div>
          {results.length === 0 ? (
            <div style={{ color: C.muted, fontSize: 12, fontStyle: "italic" }}>No subsets generated yet</div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 150, overflowY: "auto" }}>
              {results.map((res, idx) => (
                <span key={idx} style={{ ...styles.badge(C.green), fontSize: 12, padding: "4px 10px" }}>
                  [{res.join(", ")}]
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decision logic viz */}
      <div style={styles.infoGrid}>
        <StoryCard color={C.pink} story={<span><b>Maze Explorer:</b> You are exploring a maze. When you reach a junction, you try the left path (choose). If it's a dead-end, you walk backward to the junction (backtrack/unchoose) and try the right path instead. You remember all paths that lead to the exit.</span>} />
        <div style={{ ...styles.infoCard(C.pink) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.pink, marginBottom: 8 }}>🔑 BACKTRACKING STATE SYSTEM</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>1. <strong>Choose:</strong> path.add(nums[i])</div>
            <div>2. <strong>Explore:</strong> backtrack(i + 1, path)</div>
            <div>3. <strong>Unchoose:</strong> path.remove(path.size() - 1)</div>
          </div>
        </div>
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>TRY, COMMIT, BACKUP. Try all possibilities, roll back the decision to try another sibling.</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Always clone the path list when adding to your global result list (e.g. <code>new ArrayList&lt;&gt;(path)</code>), otherwise you'll store reference to empty list after all backtrack pops!</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#78 Subsets", "#46 Permutations", "#77 Combinations", "#51 N-Queens", "#39 Combination Sum"].map((p, i) => (
          <span key={i} style={styles.tag(C.pink)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.pink)}>⌨ Java Template</div>
        <CodeBlock color={C.pink} code={`// LC #78 — Subsets (Power Set)
// STORY: Packing a bag. For each item: include it OR skip it.
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    // STEP 1 — START: Call backtrack with start index 0 and empty path
    backtrack(0, nums, new ArrayList<>(), result);
    return result;
}

private void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> result) {
    // STEP 2 — RECORD: Add a snapshot copy of current path to result
    result.add(new ArrayList<>(path));

    // STEP 3 — BRANCH: Try including remaining elements
    for (int i = start; i < nums.length; i++) {
        // CHOOSE: Include element
        path.add(nums[i]);

        // EXPLORE: Recurse with next elements
        backtrack(i + 1, nums, path, result);

        // UNCHOOSE: Backtrack (remove last added element)
        path.remove(path.size() - 1);
    }
}`} />
      </div>
    </div>
  );
};
