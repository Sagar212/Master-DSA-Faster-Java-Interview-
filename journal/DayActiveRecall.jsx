
function DayActiveRecall({ dayData, onComplete, isCompleted, onBack }) {
  const pKeys = Object.keys(dayData.problems);
  const [activeTab, setActiveTab] = useState(pKeys[0]);
  
  // Store user inputs for each problem
  const [inputs, setInputs] = useState({});
  const [validation, setValidation] = useState({}); // { [probKey]: { [idx]: 'correct'|'incorrect' } }
  const [checked, setChecked] = useState({}); // { [probKey]: boolean }
  const [showHints, setShowHints] = useState({}); // { [probKey]: boolean }
  const [completedTabsAR, setCompletedTabsAR] = useState([]);

  const activeProb = dayData.problems[activeTab];

  // Parse template strings into segments with [[answers]]
  // e.g. "int left = [[0]], right = [[nums.length - 1]];" -> segments and answer keys
  const parsedTemplate = activeProb.template.map(line => {
    const regex = /\[\[(.*?)\]\]/g;
    let match;
    const segments = [];
    let lastIndex = 0;
    
    while ((match = regex.exec(line)) !== null) {
      const textBefore = line.substring(lastIndex, match.index);
      const answer = match[1];
      segments.push({ type: 'text', value: textBefore });
      segments.push({ type: 'input', expected: answer });
      lastIndex = regex.lastIndex;
    }
    
    segments.push({ type: 'text', value: line.substring(lastIndex) });
    return segments;
  });

  // Count total inputs across this template
  let inputCounter = 0;
  parsedTemplate.forEach(line => {
    line.forEach(seg => {
      if (seg.type === 'input') {
        seg.inputIdx = inputCounter++;
      }
    });
  });

  const handleInputChange = (idx, value) => {
    setInputs({
      ...inputs,
      [activeTab]: {
        ...inputs[activeTab],
        [idx]: value
      }
    });
  };

  const handleVerifyAnswers = () => {
    const results = {};
    const currentInputs = inputs[activeTab] || {};
    let counter = 0;
    parsedTemplate.forEach(line => {
      line.forEach(seg => {
        if (seg.type === 'input') {
          const userVal = (currentInputs[counter] || "").trim().replace(/\s+/g, "");
          const expectedVal = seg.expected.trim().replace(/\s+/g, "");
          const isMatch = userVal.toLowerCase() === expectedVal.toLowerCase() ||
            (expectedVal === "nums.length-1" && userVal === "nums.length-1") ||
            (expectedVal === "nums.length-2" && userVal === "nums.length-2");
          results[counter] = isMatch ? 'correct' : 'incorrect';
          counter++;
        }
      });
    });
    setValidation({ ...validation, [activeTab]: results });
    setChecked({ ...checked, [activeTab]: true });
    // If all inputs correct, mark this problem as completed and auto-advance
    const allCorrect = Object.values(results).every(v => v === 'correct');
    if (allCorrect) {
      setCompletedTabsAR(prev => {
        const newSet = [...prev];
        if (!newSet.includes(activeTab)) newSet.push(activeTab);
        return newSet;
      });
      const currentIdx = pKeys.indexOf(activeTab);
      if (currentIdx < pKeys.length - 1) {
        setActiveTab(pKeys[currentIdx + 1]);
      }
    }
  };

  const handleRevealSolution = () => {
    const solutionInputs = {};
    let counter = 0;
    parsedTemplate.forEach(line => {
      line.forEach(seg => {
        if (seg.type === 'input') {
          solutionInputs[counter] = seg.expected;
          counter++;
        }
      });
    });
    
    setInputs({
      ...inputs,
      [activeTab]: solutionInputs
    });
    
    const results = {};
    for (let i = 0; i < counter; i++) {
      results[i] = 'correct';
    }
    
    setValidation({ ...validation, [activeTab]: results });
    setChecked({ ...checked, [activeTab]: true });
  };

  // Check if all problems on this day are validated as correct
  const isDayFullyValid = () => {
    let fullyValid = true;
    pKeys.forEach(probKey => {
      const prob = dayData.problems[probKey];
      const valStates = validation[probKey] || {};
      
      // Get total input count for this problem
      let probInputsCount = 0;
      prob.template.forEach(line => {
        const matches = line.match(/\[\[(.*?)\]\]/g);
        if (matches) probInputsCount += matches.length;
      });

      // Check if we have that many correct states
      let correctCount = 0;
      for (let i = 0; i < probInputsCount; i++) {
        if (valStates[i] === 'correct') correctCount++;
      }
      if (correctCount !== probInputsCount) fullyValid = false;
    });
    return fullyValid;
  };

  const activeProbInputs = inputs[activeTab] || {};
  const activeProbValidation = validation[activeTab] || {};
  const isActiveProbChecked = checked[activeTab] || false;

  return (
    <div>
      <a href="#" className="back-dashboard-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>
        <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>

      <div className="card">
        <div className="dashboard-header" style={{ border: 'none', marginBottom: '0', paddingBottom: '16px' }}>
          <div className="dashboard-title-area">
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : 'var(--bs-primary)' }}>
              Day {dayData.id} Curriculum — Active Recall Skeletons
            </span>
            <h1 style={{ marginTop: '4px' }}>{dayData.title}</h1>
          </div>
        </div>

        {/* Problem Tabs */}
        <div className="problem-tabs">
          {pKeys.map((key, idx) => {
            const isSolved = completedTabsAR.includes(key);
            return (
              <button 
                key={key} 
                className={`prob-tab ${activeTab === key ? `active ${dayData.patternType}` : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {isSolved && <i className="fa-solid fa-circle-check" style={{ color: 'var(--success)', marginRight: '8px' }}></i>}
                {dayData.problems[key].title}
              </button>
            );
          })}
        </div>

        {/* Problem Info & Reference Grid */}
        <div className="problem-info-grid">
          {/* Mental Story Banner */}
          <div className={`story-banner ${dayData.patternType}`} style={{ marginBottom: 0 }}>
            <i className="fa-solid fa-brain"></i>
            <div className="story-text">
              <h4>Active Recall Story Prompt</h4>
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
                <i className="fa-solid fa-vial" style={{ color: dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : 'var(--bs-primary)' }}></i>
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
                <i className="fa-solid fa-list-check" style={{ color: dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : 'var(--bs-primary)' }}></i>
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

        {/* Interactive Code Editor with Blanks */}
        <div className="editor-wrapper">
          <div className="editor-header">
            <div className="editor-dots">
              <div className="editor-dot dot-red"></div>
              <div className="editor-dot dot-yellow"></div>
              <div className="editor-dot dot-green"></div>
            </div>
            <div className="editor-title">{activeProb.title.split(" — ")[0]}.java</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {activeProb.patternSubtype && (
                <span style={{ 
                  fontSize: '10px', 
                  color: dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : 'var(--bs-primary)', 
                  background: dayData.patternType === 'tp' ? 'var(--tp-glow)' : dayData.patternType === 'sw' ? 'var(--sw-glow)' : 'var(--bs-glow)', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  fontWeight: '800',
                  border: `1px solid ${dayData.patternType === 'tp' ? 'rgba(14, 165, 233, 0.3)' : dayData.patternType === 'sw' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`
                }}>
                  {activeProb.patternSubtype}
                </span>
              )}
              <span style={{ fontSize: '10px', color: '#ffb020', background: 'rgba(255, 176, 32, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                Active Recall Skeleton
              </span>
            </div>
          </div>

          <div className="editor-body">
            {parsedTemplate.map((lineSegments, lineIdx) => {
              return (
                <div key={lineIdx} className="code-line">
                  <span className="line-number">{lineIdx + 1}</span>
                  <span className="code-content">
                    {lineSegments.map((seg, segIdx) => {
                      if (seg.type === 'text') {
                        return <span key={segIdx}>{seg.value}</span>;
                      } else {
                        const valState = activeProbValidation[seg.inputIdx] || '';
                        let validationClass = '';
                        if (valState === 'correct') validationClass = 'correct';
                        if (valState === 'incorrect') validationClass = 'incorrect';

                        // Dynamic size depending on expected length
                        const width = Math.max(80, seg.expected.length * 9);

                        return (
                          <input 
                            key={segIdx}
                            type="text"
                            className={`skeleton-input ${validationClass}`}
                            style={{ width: `${width}px` }}
                            placeholder="___"
                            value={activeProbInputs[seg.inputIdx] || ""}
                            onChange={(e) => handleInputChange(seg.inputIdx, e.target.value)}
                            disabled={valState === 'correct'}
                          />
                        );
                      }
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skeleton Controls */}
        <div className="skeleton-controls">
          <button 
            className={`primary-action-btn ${dayData.patternType}`}
            onClick={handleVerifyAnswers}
          >
            <i className="fa-solid fa-circle-check"></i> Check Code Blanks
          </button>
          
          <button 
            className="secondary-action-btn"
            onClick={handleRevealSolution}
          >
            Reveal Solution
          </button>

          {isActiveProbChecked && (
            <span style={{ fontWeight: '700', fontSize: '14px' }}>
              {Object.values(activeProbValidation).every(v => v === 'correct') ? (
                <span style={{ color: 'var(--success)' }}>
                  <i className="fa-solid fa-star"></i> Challenge solved! You recalled this pattern perfectly.
                </span>
              ) : (
                <span style={{ color: 'var(--error)' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i> Some blanks are incorrect. Try again!
                </span>
              )}
            </span>
          )}
        </div>

        {/* Complete Day footer */}
        <div className="day-complete-section">
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {!isDayFullyValid() ? "💡 Reconstruct all templates on this page to clear this recall challenge." : "🎉 You have recalled all templates for this day!"}
          </div>
          <button 
            className="day-complete-btn" 
            onClick={onComplete}
            disabled={!isCompleted && !isDayFullyValid()}
          >
            <i className="fa-solid fa-graduation-cap"></i> Mark Day {dayData.id} Complete
          </button>
        </div>
      </div>
    </div>
  );
}

window.DayActiveRecall = DayActiveRecall;
