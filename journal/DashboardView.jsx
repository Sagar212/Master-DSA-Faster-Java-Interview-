function DashboardView({ progress, setActiveDay, percent, curriculumIndex, isDayLocked }) {
  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h1>DSA Pattern Mastery Blueprint</h1>
          <p>Traces and templates optimized for Java Technical Interviews</p>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Current Plan Status</span>
          <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: percent === 100 ? 'var(--success)' : 'var(--tp-primary)' }}>
            {percent === 100 ? "🏆 All Days Mastered!" : `${percent}% Complete`}
          </div>
        </div>
      </div>

      <div style={{ margin: '24px 0', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}>
        <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-bolt" style={{ color: 'var(--warning)' }}></i> 
          The 3-Day Pattern Rotation Strategy
        </h3>
        Each pattern is mastered in a high-retention 3-day cycle:
        <ul style={{ marginLeft: '20px', marginTop: '6px', color: 'var(--text-muted)' }}>
          <li><strong>Day 1 / 4 (Pattern Learn 2x):</strong> Build conceptual understanding by tracing templates and doing step-by-step reconstruction.</li>
          <li><strong>Day 2 / 5 (Dry Run & Recall):</strong> Analyze execution flow line-by-line using pointer visualization on existing interview problems.</li>
          <li><strong>Day 3 / 6 (Active Recall Skeletons):</strong> Force memory retrieval by writing/filling the code from blank templates.</li>
        </ul>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: '32px', marginBottom: '16px', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="fa-solid fa-road" style={{ color: 'var(--tp-primary)' }}></i> Roadmap Tasks
      </h2>

      <div className="dashboard-grid">
        {curriculumIndex.map(day => {
          const dayNum = day.id;
          const isDone = progress[dayNum];
          const isLocked = isDayLocked(day);
          
          return (
            <div 
              key={dayNum} 
              className={`dash-day-card ${day.patternType}-card ${isDone ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
              style={isLocked ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              onClick={() => !isLocked && setActiveDay(dayNum)}
            >
              <div className="dash-day-header">
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: isLocked ? 'var(--text-muted)' : (day.patternType === 'tp' ? 'var(--tp-primary)' : day.patternType === 'sw' ? 'var(--sw-primary)' : day.patternType === 'hashmap' ? 'var(--hm-primary)' : day.patternType === 'heap' ? 'var(--hp-primary)' : day.patternType === 'backtrack' ? 'var(--bt-primary)' : day.patternType === 'tr' ? 'var(--tr-primary)' : 'var(--bs-primary)') }}>Day {dayNum}</span>
                <div className={`dash-day-icon ${isLocked ? 'locked' : day.patternType}`} style={isLocked ? { background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' } : {}}>
                  {isLocked ? <i className="fa-solid fa-lock"></i> : (day.patternType === 'tp' ? <i className="fa-solid fa-arrows-left-right"></i> : day.patternType === 'sw' ? <i className="fa-solid fa-magnifying-glass"></i> : day.patternType === 'hashmap' ? <i className="fa-solid fa-table-list"></i> : day.patternType === 'heap' ? <i className="fa-solid fa-layer-group"></i> : day.patternType === 'backtrack' ? <i className="fa-solid fa-code-branch"></i> : day.patternType === 'tr' ? <i className="fa-solid fa-network-wired"></i> : <i className="fa-solid fa-bullseye"></i>)}
                </div>
              </div>
              <div className="dash-day-body">
                <h3>{day.title.split(" — ")[1] || day.title}</h3>
                <p>{day.oneSentence}</p>
              </div>
              <div className={`dash-day-footer ${isDone ? 'completed' : ''}`}>
                <span className="status-text">
                  {isDone ? (
                    <React.Fragment><i className="fa-solid fa-circle-check"></i> Mastered</React.Fragment>
                  ) : isLocked ? (
                    <React.Fragment><i className="fa-solid fa-lock"></i> Locked</React.Fragment>
                  ) : (
                    "To Do"
                  )}
                </span>
                {!isLocked && (
                  <span className="action-link">
                    Start <i className="fa-solid fa-arrow-right-long"></i>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.DashboardView = DashboardView;
