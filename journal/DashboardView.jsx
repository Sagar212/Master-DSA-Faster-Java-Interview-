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

      <div className="atomic-habit-note" style={{ margin: '0 auto 32px auto' }}>
        <i className="fa-solid fa-leaf" style={{ color: '#4ade80' }}></i>
        <span><strong>Gentle Reminder:</strong> You don{"'"}t have to master it all today. The secret to learning is simply focusing on deeply understanding <em>one problem at a time</em> until it clicks effortlessly. Small, atomic habits build unbreakable mastery.</span>
      </div>

      <div style={{ margin: '24px 0', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}>
        <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-bolt" style={{ color: 'var(--warning)' }}></i> 
          The 3-Day Pattern Rotation Strategy
        </h3>
        Each pattern is mastered in a high-retention 3-day cycle:
        <ul style={{ marginLeft: '20px', marginTop: '6px', color: 'var(--text-muted)' }}>
          <li><strong>Phase 1: Pattern Learn (2x Trace):</strong> Build conceptual understanding by tracing templates line-by-line and doing step-by-step reconstruction.</li>
          <li><strong>Phase 2: Visual Dry Run & Quiz:</strong> Analyze execution flow line-by-line using pointer visualization on real LeetCode problems.</li>
          <li><strong>Phase 3: Active Recall Skeletons:</strong> Force memory retrieval by writing the core logic from blank templates under time pressure.</li>
        </ul>
      </div>

      <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}>
        <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-ranking-star" style={{ color: 'var(--success)' }}></i> 
          Pattern ROI Legend
        </h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '16px' }}>🟢</span> <strong>Must Know</strong> <span style={{ color: 'var(--text-muted)' }}>(70% of interviews)</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '16px' }}>🟡</span> <strong>High Yield</strong> <span style={{ color: 'var(--text-muted)' }}>(Memorize Template)</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '16px' }}>🔴</span> <strong>Low ROI</strong> <span style={{ color: 'var(--text-muted)' }}>(Skip if Cramming)</span></div>
        </div>
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
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: isLocked ? 'var(--text-muted)' : (day.patternType === 'tp' ? 'var(--tp-primary)' : day.patternType === 'sw' ? 'var(--sw-primary)' : day.patternType === 'hashmap' ? 'var(--hm-primary)' : day.patternType === 'heap' ? 'var(--hp-primary)' : day.patternType === 'backtrack' ? 'var(--bt-primary)' : day.patternType === 'tr' ? 'var(--tr-primary)' : day.patternType === 'st' ? 'var(--st-primary)' : day.patternType === 'll' ? 'var(--ll-primary)' : day.patternType === 'gr' ? 'var(--gr-primary)' : day.patternType === 'dp' ? 'var(--dp-primary)' : day.patternType === 'iv' ? 'var(--iv-primary)' : day.patternType === 'gd' ? 'var(--gd-primary)' : 'var(--bs-primary)') }}>Day {dayNum}</span>
                <div className={`dash-day-icon ${isLocked ? 'locked' : day.patternType}`} style={isLocked ? { background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' } : {}}>
                  {isLocked ? <i className="fa-solid fa-lock"></i> : (day.patternType === 'tp' ? <i className="fa-solid fa-arrows-left-right"></i> : day.patternType === 'sw' ? <i className="fa-solid fa-magnifying-glass"></i> : day.patternType === 'hashmap' ? <i className="fa-solid fa-table-list"></i> : day.patternType === 'heap' ? <i className="fa-solid fa-layer-group"></i> : day.patternType === 'backtrack' ? <i className="fa-solid fa-code-branch"></i> : day.patternType === 'tr' ? <i className="fa-solid fa-network-wired"></i> : day.patternType === 'st' ? <i className="fa-solid fa-layer-group"></i> : day.patternType === 'll' ? <i className="fa-solid fa-link"></i> : day.patternType === 'gr' ? <i className="fa-solid fa-circle-nodes"></i> : day.patternType === 'dp' ? <i className="fa-solid fa-brain"></i> : day.patternType === 'iv' ? <i className="fa-solid fa-arrows-left-right-to-line"></i> : day.patternType === 'gd' ? <i className="fa-solid fa-money-bill-trend-up"></i> : <i className="fa-solid fa-bullseye"></i>)}
                </div>
              </div>
              <div className="dash-day-body">
                <h3><span style={{opacity: 0.8, fontSize: '0.85em', display: 'block', marginBottom: '4px', fontWeight: '600'}}>{day.title.split(" — ")[0]}</span>{day.title.split(" — ")[1] || ""}</h3>
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

      <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: '40px', marginBottom: '16px', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <i className="fa-solid fa-briefcase" style={{ color: 'var(--success)' }}></i> Interview Preparation Guides
      </h2>
      
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        <a href="accolite-interview.html" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="dash-day-card accolite-card" style={{ cursor: 'pointer' }}>
            <div className="dash-day-header">
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--success)' }}>INTERVIEW GUIDE</span>
              <div className="dash-day-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <i className="fa-brands fa-java"></i>
              </div>
            </div>
            <div className="dash-day-body">
              <h3>Accolite L1 Backend</h3>
              <p>Exhaustive, production-grade answers to Core Java, Spring Boot, and System Design.</p>
            </div>
          </div>
        </a>
        <a href="java-8-coding-interview.html" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="dash-day-card streams-card" style={{ cursor: 'pointer' }}>
            <div className="dash-day-header">
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--warning)' }}>INTERVIEW GUIDE</span>
              <div className="dash-day-icon" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                <i className="fa-solid fa-code"></i>
              </div>
            </div>
            <div className="dash-day-body">
              <h3>Java 8 Streams Coding</h3>
              <p>Highly optimized, production-grade coding solutions using lambdas and advanced Collectors.</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

window.DashboardView = DashboardView;
