window.BFSViz = function BFSViz() {
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
};
