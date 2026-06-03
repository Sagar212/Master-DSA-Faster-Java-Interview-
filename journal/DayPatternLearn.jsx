function DayPatternLearn({ dayData, onComplete, isCompleted, onBack }) {
  const [activePass, setActivePass] = React.useState(1); // 1 = Trace study, 2 = Reconstruction
  const [highlightedLine, setHighlightedLine] = React.useState(null);
  const [sandboxAnswers, setSandboxAnswers] = React.useState({ 0: "", 1: "", 2: "" });
  const [sandboxErrors, setSandboxErrors] = React.useState({});
  const [sandboxCorrect, setSandboxCorrect] = React.useState(false);

  const handleLineClick = (lineNum) => {
    const step = dayData.template.traceSteps.find(s => s.line === lineNum);
    if (step) {
      setHighlightedLine(lineNum);
    }
  };

  const handleSandboxChange = (index, val) => {
    setSandboxAnswers({ ...sandboxAnswers, [index]: val });
  };

  const verifySandbox = () => {
    let errors = {};
    let isAllCorrect = true;
    dayData.template.sandbox.forEach((q, idx) => {
      if (parseInt(sandboxAnswers[idx]) !== q.correct) {
        errors[idx] = true;
        isAllCorrect = false;
      }
    });
    setSandboxErrors(errors);
    setSandboxCorrect(isAllCorrect);
  };

  const activeStepExplain = dayData.template.traceSteps.find(s => s.line === highlightedLine);

  return (
    <div>
      <a href="#" className="back-dashboard-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>
        <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
      </a>

      <div className="card">
        <div className="dashboard-header" style={{ border: 'none', marginBottom: '0', paddingBottom: '0' }}>
          <div className="dashboard-title-area">
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}>
              Day {dayData.id} Curriculum — {dayData.category}
            </span>
            <h1 style={{ marginTop: '4px' }}>{dayData.title}</h1>
          </div>
        </div>

        {/* ROI statistics cards */}
        <div className="roi-grid">
          <div className="roi-card">
            <div className={`roi-icon-container ${dayData.patternType}`}>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <div className="roi-content">
              <h3>Frequency in Interviews</h3>
              <p>{dayData.roi.frequency}</p>
            </div>
          </div>

          <div className="roi-card">
            <div className={`roi-icon-container ${dayData.patternType}`}>
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <div className="roi-content">
              <h3>Complexity Bounds</h3>
              <p>{dayData.roi.complexity}</p>
            </div>
          </div>

          <div className="roi-card">
            <div className={`roi-icon-container ${dayData.patternType}`}>
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>
            <div className="roi-content">
              <h3>Recognition Signals</h3>
              <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)' }}>{dayData.roi.signals}</p>
            </div>
          </div>
        </div>

        {/* Two Pass Learn Controller */}
        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>
          <i className="fa-solid fa-repeat" style={{ color: (dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)') }}></i> Learn The Pattern Twice
        </h3>

        <div className="two-pass-selector">
          <button 
            className={`pass-btn ${activePass === 1 ? `active ${dayData.patternType}` : ''}`}
            onClick={() => setActivePass(1)}
          >
            <i className="fa-solid fa-eye"></i> Pass 1: Line-by-Line Study Trace
          </button>
          <button 
            className={`pass-btn ${activePass === 2 ? `active ${dayData.patternType}` : ''}`}
            onClick={() => setActivePass(2)}
          >
            <i className="fa-solid fa-code"></i> Pass 2: Reconstruct Core Logic
          </button>
        </div>

        {activePass === 1 ? (
          <div className="learn-panel">
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Click on highlighted rows of the Java template below to view the logical purpose and explanation of each step.
            </p>

            <div className="editor-wrapper">
              <div className="editor-header">
                <div className="editor-dots">
                  <div className="editor-dot dot-red"></div>
                  <div className="editor-dot dot-yellow"></div>
                  <div className="editor-dot dot-green"></div>
                </div>
                <div className="editor-title">{dayData.template.filename}</div>
                <div><span style={{ fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Java</span></div>
              </div>
              
              <div className="editor-body">
                {dayData.template.codeLines.map((line, idx) => {
                  const hasStep = dayData.template.traceSteps.some(s => s.line === line.num);
                  const isHighlighted = highlightedLine === line.num;
                  const trimmed = line.text.trimStart();
                  const isFullLineComment = trimmed.startsWith('//');

                  // Split inline trailing comment
                  let codePart = line.text;
                  let commentPart = null;
                  if (!isFullLineComment && line.text.includes('//')) {
                    const commentIdx = line.text.indexOf('//');
                    codePart = line.text.slice(0, commentIdx);
                    commentPart = line.text.slice(commentIdx);
                  }

                  return (
                    <div 
                       key={idx} 
                       className={`code-line ${isFullLineComment ? 'code-comment' : ''} ${isHighlighted ? ((dayData.patternType === 'tp' ? 'highlighted' : dayData.patternType === 'sw' ? 'highlighted-sw' : dayData.patternType === 'bs' ? 'highlighted-bs' : 'highlighted-' + dayData.patternType)) : ''}`}
                       style={{ cursor: hasStep ? 'pointer' : 'default' }}
                       onClick={() => handleLineClick(line.num)}
                    >
                      <span className="line-number">{line.num}</span>
                      {isFullLineComment ? (
                        <span className="code-content">{line.text}</span>
                      ) : (
                        <span className="code-content" style={{ color: hasStep ? ((dayData.patternType === 'tp' ? 'var(--tp-primary)' : dayData.patternType === 'sw' ? 'var(--sw-primary)' : dayData.patternType === 'bs' ? 'var(--bs-primary)' : dayData.patternType === 'hashmap' ? 'var(--hm-primary)' : dayData.patternType === 'heap' ? 'var(--hp-primary)' : dayData.patternType === 'backtrack' ? 'var(--bt-primary)' : dayData.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--tp-primary)')) : 'inherit', fontWeight: hasStep ? '600' : 'normal' }}>
                          {codePart}
                          {commentPart && <span className="inline-comment">{commentPart}</span>}
                        </span>
                      )}
                      {hasStep && !isHighlighted && (
                        <i className="fa-solid fa-circle-question" style={{ opacity: 0.4, fontSize: '10px', alignSelf: 'center', marginLeft: '6px' }}></i>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>

            <div className={`step-explain-box ${dayData.patternType}`}>
              <i className="fa-solid fa-circle-info"></i>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
                  {activeStepExplain ? activeStepExplain.title : "Trace Step Explanation"}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {activeStepExplain ? activeStepExplain.text : "Click any colored code lines in the editor above to trace the template execution."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="sandbox-container">
            <p className="sandbox-instruction">
              Reconstruct the core pattern steps by choosing the correct operations for the pattern.
            </p>

            <div className="sandbox-steps-grid">
              {dayData.template.sandbox.map((item, idx) => {
                const hasErr = sandboxErrors[idx];
                return (
                  <div key={idx} className={`sandbox-step-card ${dayData.patternType}`} style={{ borderColor: hasErr ? 'var(--error)' : 'var(--border-color)' }}>
                    <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Step {idx + 1} — {item.step}</h4>
                    <p style={{ fontSize: '13px', minHeight: '38px' }}>{item.question}</p>
                    <select 
                      className="sandbox-select" 
                      value={sandboxAnswers[idx]} 
                      onChange={(e) => handleSandboxChange(idx, e.target.value)}
                    >
                      <option value="">-- Choose Code Line --</option>
                      {item.options.map((opt, oIdx) => (
                        <option key={oIdx} value={oIdx}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
              <button className={`primary-action-btn ${dayData.patternType}`} onClick={verifySandbox}>
                Verify Reconstruction
              </button>
              {sandboxCorrect && (
                <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-circle-check"></i> Perfect! Core logic reconstructed.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Complete Day action */}
        <div className="day-complete-section">
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {!sandboxCorrect && activePass === 2 ? "💡 Complete the Pass 2 Reconstruction challenge to unlock day completion." : ""}
          </div>
          <button 
            className="day-complete-btn" 
            onClick={onComplete}
            disabled={!isCompleted && activePass === 2 && !sandboxCorrect}
          >
            <i className="fa-solid fa-graduation-cap"></i> Mark Day {dayData.id} Complete
          </button>
        </div>
      </div>
    </div>
  );
}

window.DayPatternLearn = DayPatternLearn;
