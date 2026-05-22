window.DFSViz = function DFSViz() {
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
  const [current, setCurrent] = useState(null);
  const [stack, setStack] = useState([]);
  const [order, setOrder] = useState([]);
  const [running, setRunning] = useState(false);

  const reset = () => { setVisited([]); setCurrent(null); setStack([]); setOrder([]); setRunning(false); };

  const animateDFS = useCallback(async () => {
    setRunning(true);
    const vis = [], ord = [];
    const dfs = async (node, stk) => {
      stk = [...stk, node];
      setStack([...stk]); setCurrent(node);
      await sleep(600);
      vis.push(node); ord.push(tree.nodes[node].val);
      setVisited([...vis]); setOrder([...ord]);
      for (const child of tree.children[node]) {
        await dfs(child, stk);
      }
      stk.pop(); setStack([...stk]);
    };
    await dfs(0, []);
    setCurrent(null);
    setRunning(false);
  }, []);

  return (
    <div>
      <div style={styles.controls}>
        <button style={styles.btn(C.pink)} onClick={animateDFS} disabled={running}>▶ DFS Preorder</button>
        <button style={styles.btn(C.muted, true)} onClick={reset}>↺ Reset</button>
        <div style={{ ...styles.badge(C.pink), marginLeft: "auto" }}>Stack depth: {stack.length}</div>
      </div>

      <div style={{ position: "relative", height: 200, marginBottom: 20, background: C.panel, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {tree.edges.map(([a, b], i) => (
            <line key={i}
              x1={`${tree.nodes[a].x}%`} y1={`${tree.nodes[a].y + 4}%`}
              x2={`${tree.nodes[b].x}%`} y2={`${tree.nodes[b].y + 4}%`}
              stroke={stack.includes(a) && stack.includes(b) ? C.pink : C.border}
              strokeWidth={stack.includes(a) && stack.includes(b) ? 2 : 1.5} />
          ))}
        </svg>
        {tree.nodes.map((n) => {
          const isVisited = visited.includes(n.id);
          const isCurrent = current === n.id;
          const isInStack = stack.includes(n.id);
          return (
            <div key={n.id} style={{
              ...styles.nodeCircle(
                isCurrent ? `${C.pink}44` : isVisited ? `${C.green}33` : isInStack ? `${C.pink}18` : C.panel,
                isCurrent ? C.pink : isVisited ? C.green : isInStack ? C.pink : C.border,
                isCurrent
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

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: C.muted }}>Visit order:</span>
        {order.map((v, i) => (
          <div key={i} style={{ ...styles.badge(C.pink) }}>{i+1}:{v}</div>
        ))}
      </div>

      <div style={styles.infoGrid}>
        <StoryCard color={C.pink} story={<span><b>Deep Path Exploration:</b> Visit one branch ALL THE WAY DOWN until you get stuck, then reverse (backtrack). Like walking to the deepest room of a house before checking others. Uses a STACK.</span>} />
        <div style={{ ...styles.infoCard(C.pink) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.pink, marginBottom: 6 }}>🧠 MNEMONIC</div>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>COMMIT & BACKTRACK. Go deep until stuck, then reverse. Stack (call stack or explicit) is your trail of breadcrumbs.</div>
        </div>
        <div style={{ ...styles.infoCard(C.accent) }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 6 }}>📐 3 ORDERS</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div>• Pre: <b>node</b> → L → R (most common)</div>
            <div>• In: L → <b>node</b> → R (BST sorted)</div>
            <div>• Post: L → R → <b>node</b> (bottom-up)</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["#104 Max Depth", "#112 Path Sum", "#230 Kth Smallest BST", "#200 Number of Islands", "#79 Word Search"].map((p, i) => (
          <span key={i} style={styles.tag(C.pink)}>{p}</span>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={styles.sectionTitle(C.pink)}>⌨ Java Template</div>
        <CodeBlock color={C.pink} code={`// LC #104 — Maximum Depth of Binary Tree
// STORY: How deep is the well? max(left, right) + 1
public int solve(TreeNode root) {
    // STEP 1 — BASE CASE: Null = depth 0
    if (root == null) return 0;

    // STEP 2 — RECURSE: Ask left and right for their depths
    int leftDepth = solve(root.left);
    int rightDepth = solve(root.right);

    // STEP 3 — RETURN: Max of both + 1 (this level)
    return Math.max(leftDepth, rightDepth) + 1;
}`} />
      </div>
    </div>
  );
};
