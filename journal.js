// Global data loaded dynamically from JSON
// LEETCODE_MAP is defined globally in journal.html


// ==========================================
// MAIN APP WRAPPER
// ==========================================
function getDayComponent(dayData, onComplete, isCompleted, onBack) {
  if (dayData.template && dayData.template.sandbox) {
    return (
      <window.DayPatternLearn 
        key={dayData.id}
        dayData={dayData} 
        onComplete={onComplete} 
        isCompleted={isCompleted} 
        onBack={onBack}
      />
    );
  } else if (dayData.problems) {
    const firstProbKey = Object.keys(dayData.problems)[0];
    const firstProb = dayData.problems[firstProbKey];
    if (firstProb && firstProb.steps) {
      return (
        <window.DayDryRunAndQuiz 
          key={dayData.id}
          dayData={dayData} 
          onComplete={onComplete} 
          isCompleted={isCompleted} 
          onBack={onBack}
        />
      );
    } else {
      return (
        <window.DayActiveRecall 
          key={dayData.id}
          dayData={dayData} 
          onComplete={onComplete} 
          isCompleted={isCompleted} 
          onBack={onBack}
        />
      );
    }
  }
  return <div>Invalid Day Data structure</div>;
}

function App() {
  const [curriculumIndex, setCurriculumIndex] = useState([]);
  const [loadedDays, setLoadedDays] = useState({});
  const [activeDay, setActiveDay] = useState(null); // null = dashboard
  const [dayLoading, setDayLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const [showComplexity, setShowComplexity] = useState(false);
  const [showMasteryModal, setShowMasteryModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [bypassLocks, setBypassLocks] = useState(() => {
    const saved = localStorage.getItem("dsa_mastery_bypass_locks");
    return saved === "true";
  });

  const toggleBypassLocks = () => {
    setBypassLocks(prev => {
      const newVal = !prev;
      localStorage.setItem("dsa_mastery_bypass_locks", newVal ? "true" : "false");
      return newVal;
    });
  };

  // Load progress on init and fetch metadata maps
  useEffect(() => {
    const savedProgress = localStorage.getItem("dsa_mastery_journal_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch(e) {}
    }

    Promise.all([
      fetch(`journal_data/index.json?v=${Date.now()}`).then(res => {
        if (!res.ok) throw new Error("Failed to load index.json");
        return res.json();
      }),
      fetch(`journal_data/leetcode_map.json?v=${Date.now()}`).then(res => {
        if (!res.ok) throw new Error("Failed to load leetcode_map.json");
        return res.json();
      })
    ])
    .then(([indexData, mapData]) => {
      LEETCODE_MAP = mapData;
      setCurriculumIndex(indexData);
      setInitialLoading(false);
    })
    .catch(err => {
      console.error("Failed to load initial data", err);
      setInitialLoading(false);
      setLoadError(true);
    });
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem("dsa_mastery_journal_progress", JSON.stringify(newProgress));
  };

  const completeDay = (dayNum) => {
    const newProgress = { ...progress, [dayNum]: true };
    saveProgress(newProgress);
    setShowMasteryModal(true);
  };

  const getCompletionPercentage = () => {
    if (curriculumIndex.length === 0) return 0;
    let done = 0;
    curriculumIndex.forEach(day => {
      if (progress[day.id]) done++;
    });
    return Math.round((done / curriculumIndex.length) * 100);
  };

  const isDayLocked = (day, indexList, prog) => {
    if (bypassLocks) return false;
    const categories = [];
    indexList.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    const currentCategoryIdx = categories.indexOf(day.category);
    if (currentCategoryIdx <= 0) return false;
    
    const prevCategories = categories.slice(0, currentCategoryIdx);
    const daysToComplete = indexList.filter(item => prevCategories.includes(item.category));
    return !daysToComplete.every(item => prog[item.id]);
  };

  const selectDay = (dayNum) => {
    if (loadedDays[dayNum]) {
      setActiveDay(dayNum);
    } else {
      setDayLoading(true);
      fetch(`journal_data/day_${dayNum}.json?v=${Date.now()}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load day JSON");
          return res.json();
        })
        .then(data => {
          setLoadedDays(prev => ({ ...prev, [dayNum]: data }));
          setActiveDay(dayNum);
          setDayLoading(false);
        })
        .catch(err => {
          console.error("Error loading day data:", err);
          setDayLoading(false);
          alert(`Error loading Day ${dayNum} data. Please ensure the local server is running.`);
        });
    }
  };

  if (initialLoading) {
    return (
      <div className="loading-screen" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100vh', gap: '20px', color: 'var(--text-main)', background: 'var(--bg-dark)'
      }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '40px', color: 'var(--tp-primary)' }}></i>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '600' }}>Loading DSA Mastery Journal...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg-dark)', padding: '20px'
      }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '32px', textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '60px', color: 'var(--error)', marginBottom: '20px' }}></i>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>CORS / Fetch Error Detected</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            Browser security rules restrict loading local JSON files via the <strong>file://</strong> protocol. 
            You must run the project using a local web server.
          </p>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '16px', fontSize: '13px', textAlign: 'left', marginBottom: '24px', lineHeight: '1.5' }}>
            <h4 style={{ color: 'var(--error)', fontWeight: '700', marginBottom: '6px' }}>How to fix:</h4>
            <ol style={{ paddingLeft: '20px', color: 'var(--text-main)' }}>
              <li>Double-click the <strong>serve.bat</strong> file in the project folder to start a local server.</li>
              <li>Open <strong>http://localhost:8000/journal.html</strong> in your browser.</li>
            </ol>
          </div>
          <button className="primary-action-btn" onClick={() => window.location.reload()} style={{ width: '100%', justifyContent: 'center' }}>
            <i className="fa-solid fa-rotate-right"></i> Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a 
            href="index.html" 
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px', padding: '8px 14px',
              color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '14px', fontWeight: '600', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
            title="Back to Main Dashboard"
          >
            <i className="fa-solid fa-house" style={{ marginRight: '8px' }}></i> Home
          </a>
          <div className="logo" onClick={() => setActiveDay(null)} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-graduation-cap logo-badge"></i>
            <span>DSA <span className="logo-badge">Mastery</span> Journal</span>
            <span className="logo-subtitle">Interactive Blueprint</span>
          </div>
        </div>
        
        <div className="overall-stats">
          <div 
            className={`bypass-toggle-container ${bypassLocks ? 'active' : ''}`}
            onClick={toggleBypassLocks}
            title="Bypass locking rules to test any day immediately"
          >
            <i className={`fa-solid ${bypassLocks ? 'fa-lock-open' : 'fa-lock'}`}></i>
            <span className="bypass-toggle-text">Unlock All (Test Mode)</span>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>
            Total Progress: {getCompletionPercentage()}%
          </span>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${getCompletionPercentage()}%` }}></div>
          </div>
        </div>
      </header>

      <div className="app-container">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <div className="sidebar-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Mastery Timeline
            <button 
              onClick={() => setActiveDay('java')}
              style={{
                background: activeDay === 'java' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#38bdf8', padding: '4px 8px', borderRadius: '4px',
                fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Java Reference Cheat Sheet"
            >
              <i className="fa-brands fa-java" style={{ marginRight: '4px' }}></i>Java
            </button>
          </div>
          
          {curriculumIndex.map(day => {
            const dayNum = day.id;
            const isActive = activeDay === dayNum;
            const isLocked = isDayLocked(day, curriculumIndex, progress);
            let activeClass = "";
            if (isActive) {
              activeClass = day.patternType === "tp" ? "active-two-pointer" : 
                            day.patternType === "sw" ? "active-sliding-window" : 
                            `active-${day.patternType}`;
            }
            
            return (
              <div 
                key={dayNum} 
                className={`day-card ${activeClass} ${isLocked ? 'locked' : ''}`}
                style={isLocked ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                onClick={() => !isLocked && selectDay(dayNum)}
              >
                <div className="day-info">
                  <span className={`day-num ${isLocked ? '' : day.patternType}`} style={isLocked ? { color: 'var(--text-muted)' } : {}}>
                    Day {dayNum} ({day.category})
                  </span>
                  <span className="day-name">{day.title.split(" — ")[1] || day.title}</span>
                  <span className="day-subtitle">
                    {day.id % 3 === 1 ? "Learn Pattern 2x" : day.id % 3 === 2 ? "Dry Run & Quiz" : "Active Recall"}
                  </span>
                </div>
                <div className={`day-status ${progress[dayNum] ? "completed" : ""}`}>
                  {progress[dayNum] ? (
                    <i className="fa-solid fa-check"></i>
                  ) : isLocked ? (
                    <i className="fa-solid fa-lock"></i>
                  ) : (
                    <i className="fa-solid fa-lock-open"></i>
                  )}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Main Content Workspace */}
        <main className="workspace">
          {dayLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', minHeight: '300px' }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: 'var(--tp-primary)' }}></i>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading day content...</p>
            </div>
          ) : activeDay === null ? (
            <window.DashboardView 
              progress={progress} 
              setActiveDay={selectDay} 
              percent={getCompletionPercentage()} 
              curriculumIndex={curriculumIndex}
              isDayLocked={(day) => isDayLocked(day, curriculumIndex, progress)}
            />
          ) : activeDay === 'java' ? (
            <window.JavaBuildingBlocks onBack={() => setActiveDay(null)} />
          ) : (
            getDayComponent(
              loadedDays[activeDay],
              () => completeDay(activeDay),
              progress[activeDay],
              () => setActiveDay(null)
            )
          )}
        </main>
      </div>

      {/* Mastery Celebratory Modal */}
      {showMasteryModal && (
        <div className="modal-overlay" onClick={() => setShowMasteryModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <i className="fa-solid fa-circle-check"></i>
            <h2>Day Completed!</h2>
            <p>
              You've successfully completed the learning, recall, and coding tasks for this day. 
              Keep up the high-ROI daily consistency to master DSA patterns for your interviews!
            </p>
            <button 
              className="primary-action-btn" 
              onClick={() => setShowMasteryModal(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* ⚡ Complexity Floating Drawer */}
      <button
        onClick={() => setShowComplexity(v => !v)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 300,
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          border: 'none', borderRadius: '50px',
          padding: '12px 20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          color: '#000', fontWeight: '800', fontSize: '13px',
          boxShadow: '0 8px 32px rgba(245,158,11,0.4)',
          transition: 'all 0.3s ease',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        <i className={`fa-solid ${showComplexity ? 'fa-xmark' : 'fa-bolt'}`}></i>
        {showComplexity ? 'Close' : 'Big-O Cheat'}
      </button>

      {showComplexity && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 200,
          width: '380px',
          background: 'rgba(7,9,19,0.97)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          overflowY: 'auto',
          padding: '28px 20px 100px',
          boxShadow: '-12px 0 60px rgba(0,0,0,0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f59e0b', fontWeight: '800', marginBottom: '4px' }}>
                <i className="fa-solid fa-bolt" style={{ marginRight: '6px' }}></i>Big-O Complexity
              </div>
              <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Outfit' }}>Mental Story Guide</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Understand the intent, not just the math</div>
            </div>
            <button 
              onClick={() => setShowComplexity(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Time Complexity Section */}
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f59e0b', fontWeight: '800', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
            ⏱ Time Complexity
          </div>

          {[
            {
              notation: 'O(1)',
              label: 'Instant',
              color: '#10b981',
              story: '🔑 You have the exact locker number. Walk straight to it, no searching, no matter if there are 10 or 10 million lockers.',
              pattern: 'HashMap get/put, array[i] access, pointer math',
              signal: 'No loop depends on input size — just direct access'
            },
            {
              notation: 'O(log N)',
              label: 'Halving',
              color: '#0ea5e9',
              story: '📖 Finding a word in a dictionary by opening the middle, deciding left or right, repeating. 1 million words takes only 20 decisions.',
              pattern: 'Binary Search, balanced BST operations',
              signal: 'Sorted input + find target → always try Binary Search first'
            },
            {
              notation: 'O(N)',
              label: 'One Pass',
              color: '#38bdf8',
              story: '🚶 Reading every page of a book exactly once. Cost grows directly with book length. No re-reading, no skipping.',
              pattern: 'Two Pointers, Sliding Window, single-pass HashMap',
              signal: 'One for-loop with no inner scan over full array = O(N)'
            },
            {
              notation: 'O(N·K)',
              label: 'Outer × Window',
              color: '#a78bfa',
              story: '🔍 For each of N seats in a stadium, you inspect K neighboring seats. Sliding Window removes this by reusing old work.',
              pattern: 'Brute-force subarray scan (what SW is optimizing away)',
              signal: 'If you’re re-scanning the window each step, you have this'
            },
            {
              notation: 'O(N²)',
              label: 'Every Pair',
              color: '#f97316',
              story: '🤝 Introducing every person in a room to every other person. Double the guests = quadruple the handshakes. Interview red flag.',
              pattern: 'Nested loops over same array — brute force',
              signal: 'Two nested for-loops over input → always ask: can Two Pointers help?'
            },
            {
              notation: 'O(N log N)',
              label: 'Sort First',
              color: '#eab308',
              story: '📂 Alphabetizing a bookshelf (sort), then searching it in 20 steps (log N). The sort is where the time is spent.',
              pattern: '3Sum (sort + two pointers), Merge Sort, Heap push/pop N times',
              signal: '"Sort then solve linearly" pattern always lands here'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: `${item.color}0a`,
              border: `1px solid ${item.color}25`,
              borderLeft: `3px solid ${item.color}`,
              borderRadius: '10px', padding: '12px 14px', marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '15px', fontWeight: '700', color: item.color }}>{item.notation}</span>
                <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: item.color, background: `${item.color}20`, padding: '2px 8px', borderRadius: '20px' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '8px' }}>{item.story}</div>
              <div style={{ fontSize: '10px', color: item.color, fontWeight: '700', marginBottom: '2px' }}>DSA Pattern:</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '4px' }}>{item.pattern}</div>
              <div style={{ fontSize: '10px', color: '#475569', fontStyle: 'italic', lineHeight: '1.4' }}>💡 {item.signal}</div>
            </div>
          ))}

          {/* Space Complexity Section */}
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#a78bfa', fontWeight: '800', margin: '16px 0 10px', paddingBottom: '6px', borderBottom: '1px solid rgba(167,139,250,0.2)' }}>
            📦 Space Complexity
          </div>

          {[
            {
              notation: 'Space O(1)',
              label: 'No Notepad',
              color: '#10b981',
              story: '👆 You solve it purely with your two fingers on the page — two pointer variables, nothing else. No extra paper no matter how big the input.',
              pattern: 'Two Pointers, Fixed Sliding Window (just pointer vars)',
              signal: 'No new array, map, or set created that scales with N'
            },
            {
              notation: 'Space O(K)',
              label: 'Sticky Note',
              color: '#f97316',
              story: '📝 You carry one small sticky note tracking only what’s inside the window — never the whole input. Window grows, note grows, but stays small.',
              pattern: 'Variable Sliding Window with HashMap/Set tracking window state',
              signal: 'You store "what is currently in the window" — not the full array'
            },
            {
              notation: 'Space O(N)',
              label: 'Full Photocopy',
              color: '#ef4444',
              story: '📄 You make a full photocopy of the entire input to work on separately. Copy size = input size. Recursion goes N levels deep = N stack frames.',
              pattern: 'DFS recursion stack, BFS queue, DP arrays, result lists',
              signal: 'You store all N elements OR recurse N levels deep'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: `${item.color}0a`,
              border: `1px solid ${item.color}25`,
              borderLeft: `3px solid ${item.color}`,
              borderRadius: '10px', padding: '12px 14px', marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '14px', fontWeight: '700', color: item.color }}>{item.notation}</span>
                <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: item.color, background: `${item.color}20`, padding: '2px 8px', borderRadius: '20px' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '8px' }}>{item.story}</div>
              <div style={{ fontSize: '10px', color: item.color, fontWeight: '700', marginBottom: '2px' }}>DSA Pattern:</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '4px' }}>{item.pattern}</div>
              <div style={{ fontSize: '10px', color: '#475569', fontStyle: 'italic', lineHeight: '1.4' }}>💡 {item.signal}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Render React Root
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);