window.HeapViz = function HeapViz() {
  const stream = [12, 3, 5, 7, 19, 1, 2, 15];
  const K = 3;
  const [streamIndex, setStreamIndex] = useState(0);
  const [heap, setHeap] = useState([]); // Will represent Min-Heap elements
  const [actionDesc, setActionDesc] = useState("Click start to process the stream");
  const [running, setRunning] = useState(false);

  const reset = () => {
    setStreamIndex(0);
    setHeap([]);
    setActionDesc("Ready to start");
    setRunning(false);
  };

  const animate = useCallback(async () => {
    setRunning(true);
    let currentHeap = [];
    setHeap([]);

    for (let i = 0; i < stream.length; i++) {
      setStreamIndex(i);
      const num = stream[i];
      setActionDesc(`Processing number: ${num}`);
      await sleep(1000);

      if (currentHeap.length < K) {
        currentHeap.push(num);
        currentHeap.sort((a, b) => a - b); // Min-heap behavior: sorted ascending
        setActionDesc(`Heap size < ${K}. Inserted ${num}`);
      } else if (num > currentHeap[0]) {
        const popped = currentHeap.shift(); // Remove the smallest
        currentHeap.push(num);
        currentHeap.sort((a, b) => a - b);
        setActionDesc(`Heap full. ${num} > Top (${popped}). Popped ${popped}, inserted ${num}`);
      } else {
        setActionDesc(`Heap full. ${num} <= Top (${currentHeap[0]}). Ignored.`);
      }

      setHeap([...currentHeap]);
      await sleep(1000);
    }
    setActionDesc(`Done processing. Top ${K} largest elements: [${currentHeap.join(", ")}]`);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.orange)} onClick={animate} disabled={running}>▶ Process Stream (K={K})</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.orange), marginLeft: "auto" }}>Stream Index: {streamIndex}</div>
      </div>

      <div style={{ padding: 16, background: "rgba(0,0,0,0.2)", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 20, minHeight: 50, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.yellow, fontWeight: 700, marginRight: 8 }}>STATUS:</span>
        <span style={{ fontSize: 13, color: C.text }}>{actionDesc}</span>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
        {/* Stream View */}
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 700 }}>INCOMING STREAM</div>
          <div style={styles.arrayBox}>
            {stream.map((v, i) => {
              const isCurrent = i === streamIndex && running;
              const isProcessed = i < streamIndex;
              return (
                <div key={i} style={{ position: "relative", marginBottom: 24 }}>
                  <div style={styles.cell(
                    isCurrent ? `${C.orange}22` : isProcessed ? "rgba(255,255,255,0.02)" : C.panel,
                    isCurrent ? C.orange : C.border,
                    isCurrent ? 1.15 : 1
                  )}>
                    {v}
                    {isCurrent && <span style={styles.label(C.orange)}>Current</span>}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>idx {i}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Min-Heap (K largest elements) View */}
        <div style={{ flex: "1 1 300px", background: "rgba(255,255,255,0.02)", border: `1px dashed ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: C.orange, marginBottom: 12, fontWeight: 800 }}>👑 MIN-HEAP (Size K={K})</div>
          {heap.length === 0 ? (
            <div style={{ color: C.muted, fontSize: 12, fontStyle: "italic" }}>Empty Heap — processing will populate this</div>
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {heap.map((val, idx) => {
                const isTop = idx === 0;
                return (
                  <div key={idx} style={{ position: "relative" }}>
                    <div style={styles.nodeCircle(
                      isTop ? `${C.orange}22` : C.panel,
                      isTop ? C.orange : C.border,
                      isTop
                    )}>
                      {val}
                      {isTop && <span style={styles.label(C.orange)}>TOP (MIN)</span>}
                    </div>
                    <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 4 }}>heap[{idx}]</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Decision logic viz */}
      <div style={styles.infoGrid}>
        <StoryCard color={C.orange} story={<span><b>VIP List / Bouncer:</b> You want to keep the top K tallest people in a VIP room. When a new person arrives, if the room isn't full, let them in. If full, compare them with the shortest person currently in the room (the top/minimum of our min-heap). If the new person is taller, kick out the shortest person and let the new person in.</span>} />
        <div style={{ ...styles.infoCard(C.orange) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orange, marginBottom: 8 }}>🔑 HEAP DECISION RULE</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>If heap.size &lt; K → <strong>Offer to Heap (O(log K))</strong></div>
            <div>If current &gt; Heap.peek() → <strong>Pop Min (O(log K)) + Push current (O(log K))</strong></div>
            <div>Otherwise → <strong>Ignore (we only care about largest elements)</strong></div>
          </div>
        </div>
        <div style={{ ...styles.infoCard(C.purple) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>VIP BOUNCER. Keep the top K. Pop the smallest (Min-Heap top) to make room for bigger stars.</div>
        </div>
        <div style={{ ...styles.infoCard(C.red) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.red, marginBottom: 6 }}>⚠ PITFALL</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>To find K largest, use a Min-heap (so the smallest of the top K is easily accessible at the top to eject). To find K smallest, use a Max-heap.</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#703 Kth Largest Element", "#347 Top K Frequent Elements", "#23 Merge K Sorted Lists", "#295 Find Median from Data Stream"].map((p, i) => (
          <span key={i} style={styles.tag(C.orange)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.orange)}>⌨ Java Template</div>
        <CodeBlock color={C.orange} code={`// LC #703 / #215 — Top K Largest Elements in Stream
// STORY: VIP bouncer ejects the smallest star to fit the new taller one.
public int findKthLargest(int[] nums, int k) {
    // STEP 1 — INIT: Min-heap to store the K largest numbers seen so far
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    // STEP 2 — LOOP: Stream through numbers
    for (int num : nums) {
        // STEP 3 — UPDATE: Insert current element
        minHeap.offer(num);

        // STEP 4 — EJECT: Keep heap size exactly k
        if (minHeap.size() > k) {
            minHeap.poll(); // Eject the smallest of the top K
        }
    }

    // STEP 5 — RETURN: Top of Min-heap is the Kth largest
    return minHeap.peek();
}`} />
      </div>
    </div>
  );
};
