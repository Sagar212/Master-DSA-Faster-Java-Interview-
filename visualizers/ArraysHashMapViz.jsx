window.ArraysHashMapViz = function ArraysHashMapViz() {
  const arr = [2, 11, 7, 15];
  const target = 9;
  const [index, setIndex] = useState(0);
  const [map, setMap] = useState({});
  const [found, setFound] = useState(null);
  const [running, setRunning] = useState(false);

  const reset = () => {
    setIndex(0);
    setMap({});
    setFound(null);
    setRunning(false);
  };

  const animate = useCallback(async () => {
    setRunning(true);
    let currentMap = {};
    setMap({});
    setFound(null);

    for (let i = 0; i < arr.length; i++) {
      setIndex(i);
      await sleep(1000);
      const num = arr[i];
      const complement = target - num;

      if (complement in currentMap) {
        setFound([currentMap[complement], i]);
        break;
      }
      currentMap[num] = i;
      setMap({ ...currentMap });
    }
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.accent)} onClick={animate} disabled={running}>▶ Find Two Sum (Target={target})</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.accent), marginLeft: "auto" }}>Current Index: {index}</div>
        {found && <div style={{ ...styles.badge(C.green) }}>✓ Found indices: [{found[0]},{found[1]}]</div>}
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
        {/* Array View */}
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 700 }}>INPUT ARRAY</div>
          <div style={styles.arrayBox}>
            {arr.map((v, i) => {
              const isCurrent = i === index && !found;
              const isFound = found && (i === found[0] || i === found[1]);
              return (
                <div key={i} style={{ position: "relative", marginBottom: 24 }}>
                  <div style={styles.cell(
                    isFound ? `${C.green}33` : isCurrent ? `${C.accent}22` : C.panel,
                    isFound ? C.green : isCurrent ? C.accent : C.border,
                    (isCurrent || isFound) ? 1.15 : 1
                  )}>
                    {v}
                    {isCurrent && <span style={styles.label(C.accent)}>nums[i]</span>}
                    {isFound && <span style={styles.label(C.green)}>Match</span>}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>idx {i}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HashMap View */}
        <div style={{ flex: "1 1 300px", background: "rgba(255,255,255,0.02)", border: `1px dashed ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: C.accent, marginBottom: 12, fontWeight: 800 }}>📂 HASHMAP (Complement Lookups)</div>
          {Object.keys(map).length === 0 ? (
            <div style={{ color: C.muted, fontSize: 12, fontStyle: "italic" }}>Empty Map — lookup notes will appear here</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.entries(map).map(([key, val]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", padding: "6px 12px", borderRadius: 6, fontSize: 12, borderLeft: `3px solid ${C.accent}` }}>
                  <span>Key (Num): <strong style={{ color: C.text }}>{key}</strong></span>
                  <span style={{ color: C.muted }}>Value (Index): <strong style={{ color: C.accent }}>{val}</strong></span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decision logic viz */}
      <div style={styles.infoGrid}>
        <StoryCard color={C.accent} story={<span><b>The Hotel Clerk:</b> You need to find if two guests' room numbers add up to target. Write guest names and rooms on sticky notes. For each new guest, look at your sticky notes to see if their partner is already checked in.</span>} />
        <div style={{ ...styles.infoCard(C.accent) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 8 }}>🔑 LOOKUP RULE</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>Current Value = <strong>{arr[index]}</strong></div>
            <div>Complement = Target - Current = <strong>{target} - {arr[index]} = {target - arr[index]}</strong></div>
            <div style={{ color: (target - arr[index]) in map ? C.green : C.orange, fontWeight: 700, marginTop: 4 }}>
              {(target - arr[index]) in map ? `✓ Found ${target - arr[index]} in map!` : `✗ ${target - arr[index]} not in map. Store {${arr[index]} : ${index}}`}
            </div>
          </div>
        </div>
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>POST-IT NOTES. Write down what you see. Read your notes before you take another step.</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>Do not use the same element twice (e.g., target = 6, nums = [3], cannot reuse index 0). Always look up complement BEFORE inserting current element.</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#1 Two Sum", "#49 Group Anagrams", "#128 Longest Consecutive Sequence", "#387 First Unique Character", "#560 Subarray Sum Equals K"].map((p, i) => (
          <span key={i} style={styles.tag(C.accent)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.accent)}>⌨ Java Template</div>
        <CodeBlock color={C.accent} code={`// LC #1 — Two Sum
// STORY: Write guest rooms on sticky notes. Check notes for complement before moving.
public int[] twoSum(int[] nums, int target) {
    // STEP 1 — INIT: HashMap to store Value -> Index
    Map<Integer, Integer> map = new HashMap<>();

    // STEP 2 — LOOP: Scan array once
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        // STEP 3 — CHECK: Does complement guest already exist?
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }

        // STEP 4 — WRITE: Save room number for future guests
        map.put(nums[i], i);
    }

    return new int[]{-1, -1};
}`} />
      </div>
    </div>
  );
};
