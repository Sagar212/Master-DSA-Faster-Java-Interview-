function JavaBuildingBlocks({ onBack }) {
  const [activeTab, setActiveTab] = React.useState('classes');

  return (
    <div className="day-container fade-in">
      {/* Header */}
      <div className="day-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', marginBottom: '24px' }}>
        <button className="back-btn" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </button>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '20px' }}>
            <i className="fa-brands fa-java"></i>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, fontFamily: 'Outfit' }}>Java Building Blocks</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>Essential templates and collections for DSA interviews</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button 
          onClick={() => setActiveTab('classes')}
          style={{ 
            background: activeTab === 'classes' ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
            border: 'none', borderBottom: activeTab === 'classes' ? '2px solid #38bdf8' : '2px solid transparent',
            color: activeTab === 'classes' ? '#38bdf8' : 'var(--text-muted)',
            padding: '12px 20px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-cube" style={{ marginRight: '8px' }}></i>
          Node Classes
        </button>
        <button 
          onClick={() => setActiveTab('collections')}
          style={{ 
            background: activeTab === 'collections' ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
            border: 'none', borderBottom: activeTab === 'collections' ? '2px solid #38bdf8' : '2px solid transparent',
            color: activeTab === 'collections' ? '#38bdf8' : 'var(--text-muted)',
            padding: '12px 20px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-layer-group" style={{ marginRight: '8px' }}></i>
          Collections Cheat Sheet
        </button>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {activeTab === 'classes' && (
          <>
            <div style={{ marginBottom: '24px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '16px', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-circle-info"></i> What are these classes?
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Unlike <code>ArrayList</code> or <code>HashMap</code>, classes like <code>ListNode</code>, <code>TreeNode</code>, <code>TrieNode</code>, and <code>Pair</code> are <strong>not built into standard Java</strong>. They are custom helper classes provided by coding platforms (like LeetCode or HackerRank) to build Linked Lists and Trees. When you write your solution on a platform, they silently include these definitions behind the scenes. In a white-board interview, you might have to quickly define them yourself!
              </p>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--ll-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-link" style={{ fontSize: '20px', color: 'var(--ll-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>ListNode (Singly Linked List)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Used to create a chain of nodes. Each node holds a value and a pointer (reference) to the next node in the chain.
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#ff7b72' }}>public class</span> <span style={{ color: '#d2a8ff' }}>ListNode</span> {'{'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>int</span> val;<br/>
                  {'    '}<span style={{ color: '#d2a8ff' }}>ListNode</span> next;<br/>
                  <br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>ListNode</span>() {'{}'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>ListNode</span>(<span style={{ color: '#ff7b72' }}>int</span> val) {'{'} <span style={{ color: '#79c0ff' }}>this</span>.val = val; {'}'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>ListNode</span>(<span style={{ color: '#ff7b72' }}>int</span> val, <span style={{ color: '#d2a8ff' }}>ListNode</span> next) {'{'} <span style={{ color: '#79c0ff' }}>this</span>.val = val; <span style={{ color: '#79c0ff' }}>this</span>.next = next; {'}'}<br/>
                  {'}'}
                </pre>
              </div>
              <div style={{ marginTop: '16px', background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold' }}>How to traverse a Linked List:</div>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#d2a8ff' }}>ListNode</span> curr = head; <span style={{ color: '#8b949e' }}>// Start at the head</span><br/>
                  <span style={{ color: '#ff7b72' }}>while</span> (curr != <span style={{ color: '#79c0ff' }}>null</span>) {'{'}<br/>
                  {'    '}<span style={{ color: '#d2a8ff' }}>System</span>.out.println(curr.val); <span style={{ color: '#8b949e' }}>// Process node</span><br/>
                  {'    '}curr = curr.next; <span style={{ color: '#8b949e' }}>// Move to the next node</span><br/>
                  {'}'}
                </pre>
              </div>
              <div style={{ marginTop: '16px', fontSize: '13px', background: 'rgba(20, 184, 166, 0.1)', padding: '16px', borderRadius: '8px', color: 'var(--ll-primary)' }}>
                <strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>💡 Interview Pro-Tips for Linked Lists:</strong>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                  <li><strong>Use a Dummy Node:</strong> When creating a new list or removing the head, always use a `ListNode dummy = new ListNode(0); dummy.next = head;`. Return `dummy.next` at the end to avoid annoying edge cases.</li>
                  <li><strong>`curr != null` vs `curr.next != null`:</strong> Use `curr != null` when you need to process every node. Use `curr.next != null` when you need to stop AT the last node (e.g., when appending a new node to the end).</li>
                  <li><strong>Fast & Slow Pointers:</strong> The easiest way to find the middle is `ListNode slow = head, fast = head; while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }`.</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--tr-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-network-wired" style={{ fontSize: '20px', color: 'var(--tr-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>TreeNode (Binary Tree)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Used to create a hierarchical tree structure. Each node holds a value and pointers to up to two children (left and right).
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#ff7b72' }}>public class</span> <span style={{ color: '#d2a8ff' }}>TreeNode</span> {'{'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>int</span> val;<br/>
                  {'    '}<span style={{ color: '#d2a8ff' }}>TreeNode</span> left;<br/>
                  {'    '}<span style={{ color: '#d2a8ff' }}>TreeNode</span> right;<br/>
                  <br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>TreeNode</span>() {'{}'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>TreeNode</span>(<span style={{ color: '#ff7b72' }}>int</span> val) {'{'} <span style={{ color: '#79c0ff' }}>this</span>.val = val; {'}'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>TreeNode</span>(<span style={{ color: '#ff7b72' }}>int</span> val, <span style={{ color: '#d2a8ff' }}>TreeNode</span> left, <span style={{ color: '#d2a8ff' }}>TreeNode</span> right) {'{'}<br/>
                  {'        '}<span style={{ color: '#79c0ff' }}>this</span>.val = val;<br/>
                  {'        '}<span style={{ color: '#79c0ff' }}>this</span>.left = left;<br/>
                  {'        '}<span style={{ color: '#79c0ff' }}>this</span>.right = right;<br/>
                  {'    '}<br/>
                  {'}'}
                </pre>
              </div>
              <div style={{ marginTop: '16px', background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold' }}>How to traverse a Binary Tree (DFS Recursion):</div>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#ff7b72' }}>public void</span> <span style={{ color: '#d2a8ff' }}>dfs</span>(<span style={{ color: '#d2a8ff' }}>TreeNode</span> node) {'{'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>if</span> (node == <span style={{ color: '#79c0ff' }}>null</span>) <span style={{ color: '#ff7b72' }}>return</span>; <span style={{ color: '#8b949e' }}>// Base Case: Empty node</span><br/>
                  <br/>
                  {'    '}<span style={{ color: '#8b949e' }}>// PRE-ORDER: Process node here (e.g., adding to a list)</span><br/>
                  {'    '}dfs(node.left);  <span style={{ color: '#8b949e' }}>// Recurse left child</span><br/>
                  {'    '}<span style={{ color: '#8b949e' }}>// IN-ORDER: Process node here (Visits BST in sorted order)</span><br/>
                  {'    '}dfs(node.right); <span style={{ color: '#8b949e' }}>// Recurse right child</span><br/>
                  {'    '}<span style={{ color: '#8b949e' }}>// POST-ORDER: Process node here (e.g., deleting nodes)</span><br/>
                  {'}'}
                </pre>
              </div>
              <div style={{ marginTop: '16px', fontSize: '13px', background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '8px', color: 'var(--tr-primary)' }}>
                <strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>💡 Interview Pro-Tips for Trees:</strong>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                  <li><strong>Always handle `null`:</strong> Your first line in a recursive DFS should almost always be `if (node == null) return;`.</li>
                  <li><strong>Global State is messy:</strong> Instead of using class-level global variables to track things like 'max diameter', pass an array of size 1 (e.g., `int[] max = new int[1];`) into your DFS function. Modifying `max[0]` acts like a pass-by-reference pointer in Java!</li>
                  <li><strong>Level-Order (BFS):</strong> Use `Queue<TreeNode> q = new ArrayDeque<>();`. Remember to capture `int size = q.size();` before the inner loop so you process one horizontal level at a time.</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--st-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-diagram-project" style={{ fontSize: '20px', color: 'var(--st-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>TrieNode (Prefix Tree)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Extremely common custom class for string/prefix problems. Instead of left/right children, a Trie has an array of children for the alphabet.
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#ff7b72' }}>class</span> <span style={{ color: '#d2a8ff' }}>TrieNode</span> {'{'}<br/>
                  {'    '}<span style={{ color: '#d2a8ff' }}>TrieNode</span>[] children = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>TrieNode</span>[<span style={{ color: '#79c0ff' }}>26</span>]; <span style={{ color: '#8b949e' }}>// For lowercase letters a-z</span><br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>boolean</span> isWord = <span style={{ color: '#79c0ff' }}>false</span>; <span style={{ color: '#8b949e' }}>// Marks the end of a valid dictionary word</span><br/>
                  {'}'}<br/>
                  <br/>
                  <span style={{ color: '#8b949e' }}>// How to access a child pointer for character 'c':</span><br/>
                  <span style={{ color: '#ff7b72' }}>int</span> index = c - <span style={{ color: '#a5d6ff' }}>'a'</span>;<br/>
                  <span style={{ color: '#ff7b72' }}>if</span> (curr.children[index] == <span style={{ color: '#79c0ff' }}>null</span>) {'{'}<br/>
                  {'    '}curr.children[index] = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>TrieNode</span>();<br/>
                  {'}'}
                </pre>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--sw-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-masks-theater" style={{ fontSize: '20px', color: 'var(--sw-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Pair (Custom Tuple)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Java does not have a built-in `Pair` or `Tuple` class like C++ or Python. In interviews, quickly define a generic or specific Pair class when you need to store two associated values (like row/col coordinates in a BFS queue).
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#ff7b72' }}>class</span> <span style={{ color: '#d2a8ff' }}>Pair</span> {'{'}<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>int</span> key;<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>int</span> val;<br/>
                  {'    '}<span style={{ color: '#ff7b72' }}>public</span> <span style={{ color: '#d2a8ff' }}>Pair</span>(<span style={{ color: '#ff7b72' }}>int</span> k, <span style={{ color: '#ff7b72' }}>int</span> v) {'{'} key = k; val = v; {'}'}<br/>
                  {'}'}<br/>
                  <br/>
                  <span style={{ color: '#8b949e' }}>// Usage example in BFS:</span><br/>
                  <span style={{ color: '#d2a8ff' }}>Queue</span>&lt;<span style={{ color: '#d2a8ff' }}>Pair</span>&gt; q = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayDeque</span>&lt;&gt;();<br/>
                  q.offer(<span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>Pair</span>(row, col));
                </pre>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid #a855f7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-circle-nodes" style={{ fontSize: '20px', color: '#a855f7' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Graph Representations</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Unlike Trees or Lists, Graphs rarely have a standard <code>GraphNode</code> class. Instead, you usually build an <strong>Adjacency List</strong> to map a node to all of its direct neighbors.
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#8b949e' }}>// 1. Array of Lists (Fastest, assuming N nodes labeled 0 to N-1)</span><br/>
                  <span style={{ color: '#d2a8ff' }}>List</span>&lt;<span style={{ color: '#d2a8ff' }}>Integer</span>&gt;[] adj = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayList</span>[N];<br/>
                  <span style={{ color: '#ff7b72' }}>for</span> (<span style={{ color: '#ff7b72' }}>int</span> i = <span style={{ color: '#79c0ff' }}>0</span>; i &lt; N; i++) adj[i] = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayList</span>&lt;&gt;();<br/>
                  adj[u].add(v); <span style={{ color: '#8b949e' }}>// Connect node u to node v</span><br/>
                  <br/>
                  <span style={{ color: '#8b949e' }}>// 2. Map of Lists (Most Flexible, handles any node types/labels like Strings)</span><br/>
                  <span style={{ color: '#d2a8ff' }}>Map</span>&lt;<span style={{ color: '#d2a8ff' }}>Integer</span>, <span style={{ color: '#d2a8ff' }}>List</span>&lt;<span style={{ color: '#d2a8ff' }}>Integer</span>&gt;&gt; adj = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>HashMap</span>&lt;&gt;();<br/>
                  adj.computeIfAbsent(u, k -&gt; <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayList</span>&lt;&gt;()).add(v);
                </pre>
              </div>
            </div>
          </>
        )}

        {activeTab === 'collections' && (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '16px', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Data Structure</th>
                  <th style={{ padding: '16px', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Java Class</th>
                  <th style={{ padding: '16px', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Key Methods</th>
                  <th style={{ padding: '16px', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Notes</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px', color: 'var(--text-main)' }}>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#38bdf8', fontWeight: '600' }}>Dynamic Array</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>ArrayList&lt;T&gt;</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code>.add(val)</code>, <code>.get(i)</code>, <code>.set(i, val)</code>, <code>.size()</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>Default list choice.</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#a78bfa', fontWeight: '600' }}>Stack / Queue</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>ArrayDeque&lt;T&gt;</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    Stack: <code>.push(val)</code>, <code>.pop()</code><br/>
                    Queue: <code>.offer(val)</code>, <code>.poll()</code>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>Faster than <code>Stack</code> or <code>LinkedList</code>. Use for DFS/BFS.</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fbbf24', fontWeight: '600' }}>Map (Hash)</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>HashMap&lt;K,V&gt;</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code>.put(k,v)</code>, <code>.get(k)</code>, <code>.containsKey(k)</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>O(1) lookups. <code>getOrDefault</code> is handy.</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fbbf24', fontWeight: '600' }}>Set (Hash)</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>HashSet&lt;T&gt;</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><code>.add(val)</code>, <code>.contains(val)</code>, <code>.remove(val)</code></td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>O(1) lookups. Tracks visited nodes.</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', color: '#f87171', fontWeight: '600' }}>Priority Queue</td>
                  <td style={{ padding: '16px' }}><code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>PriorityQueue&lt;T&gt;</code></td>
                  <td style={{ padding: '16px' }}><code>.offer(val)</code>, <code>.poll()</code>, <code>.peek()</code></td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>Min-heap by default. Pass <code>Collections.reverseOrder()</code> for Max-heap.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

window.JavaBuildingBlocks = JavaBuildingBlocks;
