const { useEffect, useMemo, useState } = React;

function Visualizer({ algorithm, data, step }) {
  switch (algorithm) {
    case 'floyd':
      return <window.FloydView nodes={data.nodes} step={step} cycleStart={data.cycleStart} addresses={data.addresses} />;
    case 'kadane':
      return <window.KadaneView arr={data.arr} step={step} />;
    case 'boyer':
      return <window.MajorityView arr={data.arr} step={step} />;
    case 'dutch':
      return <window.DutchView step={step} />;
    case 'mono':
      return <window.MonoView arr={data.arr} step={step} />;
    case 'union':
      return <window.UnionView n={data.n} step={step} />;
    default:
      return null;
  }
}

function App() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('floyd');
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const algorithms = window.visualizerAlgorithms;
  const datasets = window.visualizerDatasets;

  const filtered = useMemo(() => algorithms.filter(item => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [item.name, item.short, item.story, item.intent, item.cue, item.pattern].join(' ').toLowerCase().includes(q);
  }), [query, algorithms]);

  useEffect(() => {
    if (!filtered.some(item => item.id === selected) && filtered[0]) {
      setSelected(filtered[0].id);
      setStepIndex(0);
      setPlaying(false);
    }
  }, [filtered, selected]);

  const active = algorithms.find(item => item.id === selected) || algorithms[0];
  const activeData = datasets[active.id];
  const maxStep = activeData.steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStepIndex(prev => {
        if (prev >= maxStep) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [playing, maxStep, selected]);

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [selected]);

  const currentStep = activeData.steps[stepIndex];
  const presetNames = ['cycle', 'sum', 'votes', 'colors', 'stack', 'graph'];
  const setPreset = (name) => {
    const map = {
      cycle: 'floyd', sum: 'kadane', votes: 'boyer', colors: 'dutch', stack: 'mono', graph: 'union'
    };
    setSelected(map[name]);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <section className="panel hero-main">
          <div className="eyebrow">Story first • DSA memory trainer</div>
          <div className="title-row">
            <div className="brand">
              <svg viewBox="0 0 64 64" aria-label="Algorithm Story Visualizer logo" fill="none">
                <circle cx="18" cy="16" r="8" stroke="currentColor" strokeWidth="3" />
                <circle cx="46" cy="48" r="8" stroke="currentColor" strokeWidth="3" />
                <path d="M24 20L40 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M16 38C22 26 30 22 48 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div>
                <h1>Algorithm Story Visualizer</h1>
                <p>Built for remembering the intent before the implementation: pick an algorithm, watch its state change, and lock the pattern into your brain with a story, cue, and pitfall.</p>
              </div>
            </div>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
          </div>
          <div className="toolbar">
            <label className="search" aria-label="Search algorithms">
              <span>🔎</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by cue, story, or pattern" />
            </label>
            {presetNames.map(name => (
              <button key={name} className="preset-btn" onClick={() => setPreset(name)}>
                {name}
              </button>
            ))}
          </div>
        </section>

        <aside className="panel hero-side">
          <div>
            <div className="section-title">How to use</div>
            <p>Recognize the cue, replay the story, then scrub the steps. The animation is there to build memory, not just show output.</p>
          </div>
          <div className="stat-grid">
            <div className="stat-card"><strong>{algorithms.length}</strong><span>Visual patterns</span></div>
            <div className="stat-card"><strong>{Object.values(datasets).reduce((sum, item) => sum + item.steps.length, 0)}</strong><span>Total states</span></div>
            <div className="stat-card"><strong>6</strong><span>Interview triggers</span></div>
            <div className="stat-card"><strong>JSX</strong><span>Modular Files</span></div>
          </div>
          <div className="tag-box" style={{marginTop: 'var(--space-4)'}}>
            <span>Intent rule</span>
            Solve in this order: recognize → story → invariant → dry run → code.
          </div>
        </aside>
      </header>

      <main id="main" className="layout">
        <aside className="panel sidebar">
          <div>
            <div className="section-title">Algorithms</div>
          </div>
          <div className="algo-list" role="list">
            {filtered.map(item => (
              <button
                key={item.id}
                className={`algo-chip ${item.id === selected ? 'active' : ''}`}
                onClick={() => setSelected(item.id)}
                aria-pressed={item.id === selected}
              >
                <strong>{item.name}</strong>
                <small>{item.short}</small>
                <small>{item.cue}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="content">
          <article className="panel story-card">
            <div className="story-top">
              <div>
                <h2>{active.name}</h2>
                <p>{active.short}</p>
              </div>
              <div className="step-pill">{active.complexity}</div>
            </div>

            <div className="tag-row">
              <div className="tag-box"><span>Story</span>{active.story}</div>
              <div className="tag-box"><span>Intent</span>{active.intent}</div>
              <div className="tag-box"><span>Recognition cue</span>{active.cue}</div>
              <div className="tag-box"><span>Core pattern</span>{active.pattern}</div>
            </div>

            <div className="recall-grid">
              <div className="recall-box"><span>Why it works</span>{active.why}</div>
              <div className="recall-box"><span>Memory pointer</span>{active.analogy}</div>
              <div className="recall-box"><span>Pain point</span>{active.pitfalls}</div>
            </div>
          </article>

          <article className="panel visualizer">
            <div className="visualizer-header">
              <div>
                <div className="section-title">Interactive state machine</div>
                <h3>Step {stepIndex + 1} / {maxStep + 1}</h3>
              </div>
              <div className="control-row">
                <button className="control-btn" onClick={() => { setPlaying(false); setStepIndex(0); }}>Reset</button>
                <button className="control-btn" onClick={() => { setPlaying(false); setStepIndex(Math.max(0, stepIndex - 1)); }}>Prev</button>
                <button className="control-btn primary" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
                <button className="control-btn" onClick={() => { setPlaying(false); setStepIndex(Math.min(maxStep, stepIndex + 1)); }}>Next</button>
              </div>
            </div>

            <Visualizer algorithm={active.id} data={activeData} step={currentStep} />

            <div className="metric-grid">
              <div className="metric-box">
                <span>Current state</span>
                <strong>{stepIndex + 1}</strong>
              </div>
              <div className="metric-box">
                <span>Animation mode</span>
                <strong>{playing ? 'Autoplay' : 'Manual step'}</strong>
              </div>
              <div className="metric-box">
                <span>Best use</span>
                <strong>{active.cue}</strong>
              </div>
            </div>

            <div className="explain">{currentStep.text}</div>
          </article>

          <article className="panel story-card">
            <div className="section-title">Memory recall table</div>
            <div className="divider"></div>
            <div className="hint-grid">
              {algorithms.map(item => (
                <div key={item.id} className="hint-box">
                  <strong>{item.name}</strong>
                  <p><strong>Story:</strong> {item.story}</p>
                  <p><strong>Trigger:</strong> {item.cue}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>

      <footer className="panel footer-note" style={{marginTop: 'var(--space-6)'}}>
        This app is meant to help you remember why the algorithm exists before you start memorizing code.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
