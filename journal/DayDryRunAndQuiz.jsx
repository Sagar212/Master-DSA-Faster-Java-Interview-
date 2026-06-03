
function DayDryRunAndQuiz({ dayData, onComplete, isCompleted, onBack }) {
  const pKeys = Object.keys(dayData.problems);
  const [activeTab, setActiveTab] = useState(pKeys[0]);
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedQuizOpts, setSelectedQuizOpts] = useState({});
  const [quizChecked, setQuizChecked] = useState({});
  const [completedTabs, setCompletedTabs] = useState([]);

  const activeProb = dayData.problems[activeTab];
  const trace = activeProb.steps[stepIdx];

  // Reset step index when problem changes
  useEffect(() => {
    setStepIdx(0);
  }, [activeTab]);

  // Mark current tab as completed when user reaches the last step of the dry-run
  useEffect(() => {
    if (stepIdx === activeProb.steps.length - 1) {
      setCompletedTabs(prev => {
        if (!prev.includes(activeTab)) return [...prev, activeTab];
        return prev;
      });
    }
  }, [stepIdx, activeTab, activeProb.steps.length]);

  const handleQuizSelect = (qIdx, optIdx) => {
    setSelectedQuizOpts(prev => ({
      ...prev,
      [activeTab]: {
        ...(prev[activeTab] || {}),
        [qIdx]: optIdx
      }
    }));
    setQuizChecked(prev => ({
      ...prev,
      [activeTab]: false
    }));
  };

  const handleVerifyQuiz = () => {
    setQuizChecked(prev => ({
      ...prev,
      [activeTab]: true
    }));
  };

  // Check if all quiz questions are answered correctly for a specific problem key
  const isProbQuizPassed = (probKey) => {
    const prob = dayData.problems[probKey];
    if (!prob || !prob.quiz) return true;
    const probAnswers = selectedQuizOpts[probKey] || {};
    if (Object.keys(probAnswers).length < prob.quiz.length) return false;
    let passed = true;
    prob.quiz.forEach((q, idx) => {
      if (probAnswers[idx] !== q.correct) passed = false;
    });
    return passed;
  };

  // Check if all quizzes on this day are passed
  const areAllQuizzesPassed = () => {
    return pKeys.every(key => {
      const prob = dayData.problems[key];
      if (!prob.quiz || prob.quiz.length === 0) return true;
      return quizChecked[key] && isProbQuizPassed(key);
    });
  };

  return (
    <div>
      <a href="#" className="back-dashboard-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>
        <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>

      <div className="card">
        <div className="dashboard-header" style={{ border: 'none', marginBottom: '0', paddingBottom: '16px' }}>
          <div className="dashboard-title-area">
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}>
              Day {dayData.id} Curriculum — Visual Dry Runs
            </span>
            <h1 style={{ marginTop: '4px' }}>{dayData.title}</h1>
          </div>
        </div>

        {/* Problem Tabs */}
        <div className="problem-tabs">
          {pKeys.map((key) => {
            const isTabDryRunDone = completedTabs.includes(key);
            const isTabQuizPassed = quizChecked[key] && isProbQuizPassed(key);
            const isTabComplete = isTabDryRunDone && isTabQuizPassed;
            return (
              <button 
                key={key} 
                className={`prob-tab ${activeTab === key ? `active ${dayData.patternType}` : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {isTabComplete && <i className="fa-solid fa-circle-check" style={{ color: 'var(--success)', marginRight: '8px' }}></i>}
                {dayData.problems[key].title}
              </button>
            );
          })}
        </div>

        {/* Problem Info & Reference Grid */}
        <div className="problem-info-grid">
          {/* Mental Story Banner */}
          <div className={`story-banner ${dayData.patternType}`} style={{ marginBottom: 0 }}>
            <i className="fa-solid fa-lightbulb"></i>
            <div className="story-text">
              <h4>Mental Story Tool</h4>
              <p>"{activeProb.story}"</p>
            </div>
          </div>

          {/* LeetCode Reference Card */}
          {LEETCODE_MAP[activeTab] && (
            <div className={`leetcode-card ${dayData.patternType}`}>
              <div>
                <h4>
                  <i className="fa-solid fa-code"></i>
                  <span>LeetCode {LEETCODE_MAP[activeTab].id}: {LEETCODE_MAP[activeTab].title}</span>
                </h4>
                <p style={{ marginTop: '6px' }}>{LEETCODE_MAP[activeTab].desc}</p>
              </div>
              <a 
                href={LEETCODE_MAP[activeTab].url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="leetcode-link-btn"
              >
                <span>Solve on LeetCode</span>
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
            </div>
          )}
        </div>

        {/* LeetCode Specification Panel */}
        {LEETCODE_MAP[activeTab] && LEETCODE_MAP[activeTab].example && (
          <div className="leetcode-spec-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-vial" style={{ color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}></i>
                Example
              </h4>
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#e2e8f0',
                border: '1px solid rgba(255, 255, 255, 0.03)'
              }}>
                <div><span style={{ color: '#888' }}>Input:</span> {LEETCODE_MAP[activeTab].example.input}</div>
                <div><span style={{ color: '#888' }}>Output:</span> {LEETCODE_MAP[activeTab].example.output}</div>
                {LEETCODE_MAP[activeTab].example.explanation && (
                  <div style={{ marginTop: '4px', fontStyle: 'italic', color: '#94a3b8', fontSize: '11.5px' }}>
                    <span style={{ color: '#888', fontStyle: 'normal' }}>Explanation:</span> {LEETCODE_MAP[activeTab].example.explanation}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-list-check" style={{ color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}></i>
                Constraints
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--text-muted)'
              }}>
                {LEETCODE_MAP[activeTab].constraints.map((constraint, cIdx) => (
                  <li key={cIdx}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Dry Run Workspace */}
        <div className="dry-run-workspace">
          {/* Visual Simulation Card */}
          <div className="simulation-card">
            <div>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Visual State Simulation</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activeProb.description}</p>
            </div>

            <div className="sim-array-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Array 1 (or the only array) */}
              <div>
                {activeProb.nums2 && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}>nums1 (Shorter Array)</div>}
                <div className="array-row">
                  {activeProb.array.map((val, idx) => {
                    let cellClass = "";
                    
                    // Highlights for Two Pointer
                    if (dayData.patternType === 'tp') {
                      if (trace.left === idx) cellClass = "active-left";
                      else if (trace.right === idx) cellClass = "active-right";
                    }
                    // Highlights for Sliding Window
                    if (dayData.patternType === 'sw') {
                      const inWin = idx >= trace.leftIdx && idx <= trace.rightIdx;
                      if (inWin) {
                        cellClass = "in-window";
                      }
                      if (trace.leftIdx === idx || trace.rightIdx === idx) {
                        cellClass = "active-left-sw";
                      }
                    }
                    // Highlights for Binary Search
                    if (dayData.patternType === 'bs') {
                      if (!activeProb.nums2) {
                        if (trace.mid === idx) {
                          cellClass = "active-mid-bs";
                        } else if (idx >= trace.left && idx <= trace.right) {
                          cellClass = "in-range-bs";
                        }
                      } else {
                        if (trace.i !== null && trace.i !== undefined) {
                          if (idx === trace.i) {
                            cellClass = "partition-right-bs";
                          } else if (idx === trace.i - 1) {
                            cellClass = "partition-left-bs";
                          }
                        }
                        if (idx >= trace.left && idx <= trace.right) {
                          cellClass += " in-range-bs";
                        }
                      }
                    }
                    // Highlights for HashMap, Heap, Backtracking
                    if (dayData.patternType === 'hashmap' || dayData.patternType === 'heap' || dayData.patternType === 'backtrack' || dayData.patternType === 'tr') {
                      if (trace.left === idx) cellClass = "active-left";
                      else if (trace.right === idx && trace.right >= 0) cellClass = "active-right";
                    }

                    return (
                      <div key={idx} className={`array-cell ${cellClass}`}>
                        <span className="array-index">{idx}</span>
                        <span>{val}</span>

                        {/* Render Pointers */}
                        {dayData.patternType === 'tp' && trace.left === idx && (
                          <span className="cell-pointer lp">
                            <i className="fa-solid fa-circle-arrow-up"></i>
                            <span>left</span>
                          </span>
                        )}
                        {dayData.patternType === 'tp' && trace.right === idx && (
                          <span className="cell-pointer rp">
                            <i className="fa-solid fa-circle-arrow-up"></i>
                            <span>right</span>
                          </span>
                        )}

                        {dayData.patternType === 'sw' && trace.leftIdx === idx && (
                          <span className="cell-pointer sw-lp">
                            <i className="fa-solid fa-caret-up"></i>
                            <span>L</span>
                          </span>
                        )}
                        {dayData.patternType === 'sw' && trace.rightIdx === idx && (
                          <span className="cell-pointer sw-rp">
                            <i className="fa-solid fa-caret-up"></i>
                            <span>R</span>
                          </span>
                        )}

                        {dayData.patternType === 'bs' && !activeProb.nums2 && (
                          <React.Fragment>
                            {trace.left === idx && (
                              <span className="cell-pointer bs-lp">
                                <i className="fa-solid fa-caret-up"></i>
                                <span>L</span>
                              </span>
                            )}
                            {trace.right === idx && (
                              <span className="cell-pointer bs-rp">
                                <i className="fa-solid fa-caret-up"></i>
                                <span>R</span>
                              </span>
                            )}
                            {trace.mid === idx && (
                              <span className="cell-pointer bs-mp">
                                <i className="fa-solid fa-circle-dot"></i>
                                <span>mid</span>
                              </span>
                            )}
                          </React.Fragment>
                        )}

                        {dayData.patternType === 'bs' && activeProb.nums2 && (
                          <React.Fragment>
                            {trace.left === idx && (
                              <span className="cell-pointer bs-lp">
                                <i className="fa-solid fa-caret-up"></i>
                                <span>L</span>
                              </span>
                            )}
                            {trace.right === idx && (
                              <span className="cell-pointer bs-rp">
                                <i className="fa-solid fa-caret-up"></i>
                                <span>R</span>
                              </span>
                            )}
                            {trace.i === idx && (
                              <span className="cell-pointer bs-mp">
                                <i className="fa-solid fa-grip-lines-vertical"></i>
                                <span>i</span>
                              </span>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Array 2 (for Median of Two Sorted Arrays) */}
              {activeProb.nums2 && (
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}>nums2 (Longer Array)</div>
                  <div className="array-row">
                    {activeProb.nums2.map((val, idx) => {
                      let cellClass = "";
                      if (trace.j !== null && trace.j !== undefined) {
                        if (idx === trace.j) {
                          cellClass = "partition-right-bs";
                        } else if (idx === trace.j - 1) {
                          cellClass = "partition-left-bs";
                        }
                      }

                      return (
                        <div key={idx} className={`array-cell ${cellClass}`}>
                          <span className="array-index">{idx}</span>
                          <span>{val}</span>

                          {trace.j === idx && (
                            <span className="cell-pointer bs-mp">
                              <i className="fa-solid fa-grip-lines-vertical"></i>
                              <span>j</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Variable block */}
            <div className="vars-container">
              {dayData.patternType === 'tp' ? (
                <React.Fragment>
                  <div className="var-badge">
                    <span className="var-name">left pointer</span>
                    <span className="var-value" style={{ color: 'var(--tp-primary)' }}>{trace.left}</span>
                  </div>
                  <div className="var-badge">
                    <span className="var-name">right pointer</span>
                    <span className="var-value" style={{ color: 'var(--warning)' }}>{trace.right}</span>
                  </div>
                  <div className="var-badge">
                    <span className="var-name">sum check</span>
                    <span className="var-value">{trace.sum !== null ? trace.sum : "N/A"}</span>
                  </div>
                  <div className="var-badge">
                    <span className="var-name">target</span>
                    <span className="var-value">{activeProb.target || "N/A"}</span>
                  </div>
                  {trace.leftMax !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">leftMax</span>
                      <span className="var-value">{trace.leftMax}</span>
                    </div>
                  )}
                  {trace.rightMax !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">rightMax</span>
                      <span className="var-value">{trace.rightMax}</span>
                    </div>
                  )}
                  {trace.water !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">water trapped</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.water}</span>
                    </div>
                  )}
                </React.Fragment>
              ) : dayData.patternType === 'sw' ? (
                <React.Fragment>
                  <div className="var-badge">
                    <span className="var-name">left L</span>
                    <span className="var-value">{trace.leftIdx !== undefined ? trace.leftIdx : '—'}</span>
                  </div>
                  <div className="var-badge">
                    <span className="var-name">right R</span>
                    <span className="var-value" style={{ color: 'var(--sw-primary)' }}>{trace.rightIdx !== undefined ? trace.rightIdx : '—'}</span>
                  </div>
                  {trace.windowSum !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">windowSum</span>
                      <span className="var-value">{trace.windowSum}</span>
                    </div>
                  )}
                  {trace.maxSum !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">maxSum</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.maxSum}</span>
                    </div>
                  )}
                  {trace.vowelCount !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">vowelCount</span>
                      <span className="var-value">{trace.vowelCount}</span>
                    </div>
                  )}
                  {trace.maxVowels !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">maxVowels</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.maxVowels}</span>
                    </div>
                  )}
                  {trace.winStr !== undefined && (
                    <div className="var-badge" style={{ minWidth: '160px' }}>
                      <span className="var-name">window set</span>
                      <span className="var-value" style={{ color: '#a78bfa', fontFamily: 'Fira Code, monospace', fontSize: '11px' }}>{trace.winStr}</span>
                    </div>
                  )}
                  {trace.maxLen !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">maxLen</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.maxLen}</span>
                    </div>
                  )}
                </React.Fragment>
              ) : (dayData.patternType === 'hashmap' || dayData.patternType === 'heap') ? (
                <React.Fragment>
                  <div className="var-badge">
                    <span className="var-name">current index</span>
                    <span className="var-value" style={{ color: dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : 'var(--hp-primary)' }}>{trace.left !== undefined && trace.left !== null && trace.left >= 0 ? trace.left : '—'}</span>
                  </div>
                  {trace.right !== undefined && trace.right >= 0 && (
                    <div className="var-badge">
                      <span className="var-name">found at</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.right}</span>
                    </div>
                  )}
                  {activeProb.target !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">target</span>
                      <span className="var-value" style={{ fontWeight: 'bold' }}>{activeProb.target}</span>
                    </div>
                  )}
                </React.Fragment>
              ) : (dayData.patternType === 'backtrack') ? (
                <React.Fragment>
                  <div className="var-badge">
                    <span className="var-name">depth / start</span>
                    <span className="var-value" style={{ color: 'var(--bt-primary)' }}>{trace.left !== undefined && trace.left !== null && trace.left >= 0 ? trace.left : '—'}</span>
                  </div>
                  {trace.right !== undefined && trace.right >= 0 && (
                    <div className="var-badge">
                      <span className="var-name">chosen element</span>
                      <span className="var-value" style={{ color: 'var(--success)' }}>{trace.right}</span>
                    </div>
                  )}
                  {activeProb.target !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">target</span>
                      <span className="var-value" style={{ fontWeight: 'bold' }}>{activeProb.target}</span>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="var-badge">
                    <span className="var-name">left</span>
                    <span className="var-value" style={{ color: 'var(--tp-primary)' }}>{trace.left !== undefined && trace.left !== null ? trace.left : '—'}</span>
                  </div>
                  <div className="var-badge">
                    <span className="var-name">right</span>
                    <span className="var-value" style={{ color: 'var(--sw-primary)' }}>{trace.right !== undefined && trace.right !== null ? trace.right : '—'}</span>
                  </div>
                  {trace.mid !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">mid</span>
                      <span className="var-value" style={{ color: 'var(--bs-primary)' }}>{trace.mid !== null ? trace.mid : '—'}</span>
                    </div>
                  )}
                  {trace.i !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">i (partition 1)</span>
                      <span className="var-value" style={{ color: 'var(--bs-primary)' }}>{trace.i !== null ? trace.i : '—'}</span>
                    </div>
                  )}
                  {trace.j !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">j (partition 2)</span>
                      <span className="var-value" style={{ color: '#a78bfa' }}>{trace.j !== null ? trace.j : '—'}</span>
                    </div>
                  )}
                  {trace.maxLeft1 !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">maxLeft1</span>
                      <span className="var-value">{trace.maxLeft1 === -2147483648 ? "-INF" : trace.maxLeft1}</span>
                    </div>
                  )}
                  {trace.minRight1 !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">minRight1</span>
                      <span className="var-value">{trace.minRight1 === 2147483647 ? "INF" : trace.minRight1}</span>
                    </div>
                  )}
                  {trace.maxLeft2 !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">maxLeft2</span>
                      <span className="var-value">{trace.maxLeft2 === -2147483648 ? "-INF" : trace.maxLeft2}</span>
                    </div>
                  )}
                  {trace.minRight2 !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">minRight2</span>
                      <span className="var-value">{trace.minRight2 === 2147483647 ? "INF" : trace.minRight2}</span>
                    </div>
                  )}
                  {activeProb.target !== undefined && (
                    <div className="var-badge">
                      <span className="var-name">target</span>
                      <span className="var-value" style={{ fontWeight: 'bold' }}>{activeProb.target}</span>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>

            {/* Step Controls */}
            <div className="sim-controls">
              <button 
                className="sim-btn" 
                onClick={() => setStepIdx(prev => prev - 1)} 
                disabled={stepIdx === 0}
              >
                <i className="fa-solid fa-chevron-left"></i> Prev
              </button>
              <span className="step-indicator">
                Step {stepIdx + 1} / {activeProb.steps.length}
              </span>
              <button 
                className="sim-btn" 
                onClick={() => setStepIdx(prev => prev + 1)} 
                disabled={stepIdx === activeProb.steps.length - 1}
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Code Display area */}
          <div className="editor-wrapper">
            <div className="editor-header">
              <div className="editor-dots">
                <div className="editor-dot dot-red"></div>
                <div className="editor-dot dot-yellow"></div>
                <div className="editor-dot dot-green"></div>
              </div>
              <div className="editor-title">{activeProb.title}.java</div>
              <div><span style={{ fontSize: '10px', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Active Code Trace</span></div>
            </div>

            <div className="editor-body" style={{ fontSize: '13px' }}>
              {activeProb.code.map((line, idx) => {
                const isCodeLineHighlighted = trace.line === idx;
                const trimmed = line.trimStart();
                const isFullLineComment = trimmed.startsWith('//');

                // Split inline trailing comment: e.g. "left++;  // sum too small → ..."
                let codePart = line;
                let commentPart = null;
                if (!isFullLineComment && line.includes('//')) {
                  const commentIdx = line.indexOf('//');
                  codePart = line.slice(0, commentIdx);
                  commentPart = line.slice(commentIdx);
                }

                return (
                  <div
                    key={idx}
                    className={`code-line ${isFullLineComment ? 'code-comment' : ''} ${isCodeLineHighlighted ? ((dayData.patternType === 'tp' ? 'highlighted' : dayData.patternType === 'sw' ? 'highlighted-sw' : dayData.patternType === 'bs' ? 'highlighted-bs' : 'highlighted-' + dayData.patternType)) : ''}`}
                  >
                    <span className="line-number">{idx + 1}</span>
                    {isFullLineComment ? (
                      <span className="code-content">{line}</span>
                    ) : (
                      <span className="code-content">
                        {codePart}
                        {commentPart && <span className="inline-comment">{commentPart}</span>}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>


            {/* Explanation panel */}
            <div className="step-explain-box" style={{ margin: '16px', background: 'rgba(0,0,0,0.3)', border: 'none' }}>
              <i className="fa-solid fa-circle-play" style={{ color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}></i>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>Line Step Explanation</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{trace.desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Recognition Quiz Section */}
        {activeProb.quiz && activeProb.quiz.length > 0 && (
          <div className="quiz-panel">
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-clipboard-question" style={{ color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}></i> Active Recall Pitfall Quiz
            </h3>

            {activeProb.quiz.map((item, qIdx) => {
              const activeProbAnswers = selectedQuizOpts[activeTab] || {};
              const isSelected = activeProbAnswers[qIdx] !== undefined;
              const selectedOpt = activeProbAnswers[qIdx];
              const isTabQuizChecked = !!quizChecked[activeTab];

              return (
                <div key={qIdx} className="quiz-question-box">
                  <div className="quiz-question">
                    <span style={{ color: 'var(--text-muted)' }}>Q{qIdx + 1}.</span>
                    <span>{item.q}</span>
                  </div>

                  <div className="quiz-options">
                    {item.options.map((opt, optIdx) => {
                      const isOptSelected = selectedOpt === optIdx;
                      let optionClass = "";
                      
                      if (isOptSelected) {
                        optionClass = `selected ${dayData.patternType}`;
                      }
                      if (isTabQuizChecked) {
                        if (optIdx === item.correct) {
                          optionClass = "correct";
                        } else if (isOptSelected) {
                          optionClass = "incorrect";
                        }
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={`quiz-option ${optionClass}`}
                          onClick={() => handleQuizSelect(qIdx, optIdx)}
                        >
                          <span>{opt}</span>
                          {isTabQuizChecked && optIdx === item.correct && <i className="fa-solid fa-circle-check" style={{ color: 'var(--success)' }}></i>}
                          {isTabQuizChecked && isOptSelected && optIdx !== item.correct && <i className="fa-solid fa-circle-xmark" style={{ color: 'var(--error)' }}></i>}
                        </div>
                      );
                    })}
                  </div>

                  {isTabQuizChecked && isSelected && (
                    <div className="quiz-feedback">
                      <strong>Explanation:</strong> {item.explain}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button 
                className={`primary-action-btn ${dayData.patternType}`}
                onClick={handleVerifyQuiz}
                disabled={!!quizChecked[activeTab] || Object.keys(selectedQuizOpts[activeTab] || {}).length < activeProb.quiz.length}
              >
                Verify Quiz Answers
              </button>
              {!!quizChecked[activeTab] && (
                <span style={{ color: isProbQuizPassed(activeTab) ? 'var(--success)' : 'var(--warning)', fontWeight: '700', fontSize: '14px' }}>
                  {isProbQuizPassed(activeTab) ? "🎉 All answers correct! Tab cleared." : "⚠️ Some answers were incorrect. Review explanations."}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Mark completed */}
        <div className="day-complete-section">
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {completedTabs.length < pKeys.length 
              ? "💡 Step through the dry-run simulation to the end for all problems on this page." 
              : !areAllQuizzesPassed() 
                ? "💡 Complete the Pitfall Quiz below and get all answers correct for all problems to unlock day completion." 
                : "🎉 You have completed all dry runs and passed all quizzes!"}
          </div>
          <button 
            className="day-complete-btn" 
            onClick={onComplete}
            disabled={!isCompleted && (completedTabs.length < pKeys.length || !areAllQuizzesPassed())}
          >
            <i className="fa-solid fa-graduation-cap"></i> Mark Day {dayData.id} Complete
          </button>
        </div>
      </div>
    </div>
  );
}

window.DayDryRunAndQuiz = DayDryRunAndQuiz;
