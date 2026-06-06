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
            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--ll-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-link" style={{ fontSize: '20px', color: 'var(--ll-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>ListNode (Singly Linked List)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                The standard representation of a linked list node in LeetCode environments.
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
              <div style={{ marginTop: '16px', fontSize: '13px', background: 'rgba(20, 184, 166, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--ll-primary)' }}>
                <strong>🧠 Mnemonic:</strong> "Value and Next. Three constructors (empty, value, both)."
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--tr-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-network-wired" style={{ fontSize: '20px', color: 'var(--tr-primary)' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>TreeNode (Binary Tree)</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                The standard representation of a binary tree node.
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
            </div>

            <div className="card" style={{ padding: '24px', borderLeft: '4px solid #a855f7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className="fa-solid fa-circle-nodes" style={{ fontSize: '20px', color: '#a855f7' }}></i>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Graph Representations</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Unlike Trees/Lists, Graphs rarely have a standard node class. You usually build an adjacency list.
              </p>
              <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#c9d1d9', lineHeight: '1.5' }}>
                  <span style={{ color: '#8b949e' }}>// 1. Array of Lists (Fastest, assuming N nodes labeled 0 to N-1)</span><br/>
                  <span style={{ color: '#d2a8ff' }}>List</span>&lt;<span style={{ color: '#d2a8ff' }}>Integer</span>&gt;[] adj = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayList</span>[N];<br/>
                  <span style={{ color: '#ff7b72' }}>for</span> (<span style={{ color: '#ff7b72' }}>int</span> i = <span style={{ color: '#79c0ff' }}>0</span>; i &lt; N; i++) adj[i] = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: '#d2a8ff' }}>ArrayList</span>&lt;&gt;();<br/>
                  <br/>
                  <span style={{ color: '#8b949e' }}>// 2. Map of Lists (Most Flexible, handles any node types/labels)</span><br/>
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
