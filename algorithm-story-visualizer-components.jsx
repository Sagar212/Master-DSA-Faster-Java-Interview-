function FloydView({ nodes, step, cycleStart, addresses }) {
  return (
    <React.Fragment>
      <div className="ll-node-container" style={{ margin: 'var(--space-6) 0', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
        {nodes.map((value, index) => {
          const nextAddr = index === nodes.length - 1 ? cycleStart : index + 1;
          return (
            <React.Fragment key={index}>
              <div style={{ position: 'relative' }}>
                <div className="ll-struct" style={{ borderColor: index >= cycleStart ? 'var(--color-purple)' : '' }}>
                  <div className="ll-address">{addresses[index]}</div>
                  <div className="ll-val">Val: {value}</div>
                  <div className="ll-next" style={{ fontFamily: 'monospace' }}>{addresses[nextAddr]}</div>
                </div>
                
                {index >= cycleStart && index === cycleStart && (
                  <div style={{ position: 'absolute', top: '-55px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: 'var(--color-purple)', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                    ↺ Loop Target
                  </div>
                )}
                {step.slow === index && <span className="pointer-badge" style={{ top: 'auto', bottom: '-28px' }}>You (Slow)</span>}
                {step.fast === index && <span className="pointer-badge fast" style={{ top: '-45px', bottom: 'auto' }}>Friend (Fast)</span>}
                {step.seeker === index && <span className="pointer-badge low" style={{ top: 'auto', bottom: '-45px' }}>Reset (Head)</span>}
              </div>
              {index < nodes.length - 1 && <div className="arrow">→</div>}
            </React.Fragment>
          );
        })}
        <div className="arrow" style={{ fontSize: 'var(--text-base)', marginLeft: 'var(--space-2)' }}>
          ↘ points to {addresses[cycleStart]}
        </div>
      </div>
      <div className="legend" style={{ justifyContent: 'center' }}>
        <span><i></i> You (slow pointer)</span>
        <span><i style={{background:'var(--color-orange)'}}></i> Friend (fast pointer)</span>
        <span><i style={{background:'var(--color-blue)'}}></i> Reset (head pointer)</span>
      </div>
    </React.Fragment>
  );
}

function KadaneView({ arr, step }) {
  return (
    <React.Fragment>
      <div className="array-row">
        {arr.map((value, index) => {
          const inCurrent = index >= step.windowStart && index <= step.index;
          const inBest = index >= step.bestStart && index <= step.bestEnd;
          return (
            <div key={index} className={`cell ${inCurrent ? 'active' : ''} ${inBest ? 'best' : ''}`}>
              <span className="index">Game {index + 1}</span>
              {value}
            </div>
          );
        })}
      </div>
      <div className="metric-grid">
        <div className="metric-box"><span>Current Team Score</span><strong>{step.currentSum}</strong></div>
        <div className="metric-box"><span>Best Score Ever</span><strong>{step.bestSum}</strong></div>
        <div className="metric-box"><span>Current Window</span><strong>{step.windowStart} → {step.index}</strong></div>
        <div className="metric-box"><span>Best Window</span><strong>{step.bestStart} → {step.bestEnd}</strong></div>
      </div>
    </React.Fragment>
  );
}

function MajorityView({ arr, step }) {
  return (
    <React.Fragment>
      <div className="array-row">
        {arr.map((value, index) => (
          <div key={index} className={`cell ${index === step.index ? 'active' : ''} ${value === step.candidate ? 'best' : 'warn'}`}>
            <span className="index">Kid {index + 1}</span>
            Team {value}
          </div>
        ))}
      </div>
      <div className="metric-grid">
        <div className="metric-box"><span>Current King</span><strong>Team {String(step.candidate)}</strong></div>
        <div className="metric-box"><span>Army Size</span><strong>{step.count}</strong></div>
        <div className="metric-box"><span>Scanned</span><strong>{step.index}</strong></div>
      </div>
    </React.Fragment>
  );
}

function DutchView({ step }) {
  return (
    <React.Fragment>
      <div className="array-row">
        {step.arr.map((value, index) => {
          let cls = '';
          if (value === 0) cls = 'alt';    // Dark
          if (value === 1) cls = 'best';   // White
          if (value === 2) cls = 'purple'; // Color
          return (
            <div key={index} className={`cell ${cls} ${index === step.mid ? 'active' : ''}`}>
              <span className="index">pos {index}</span>
              {value === 0 ? 'Dark' : value === 1 ? 'White' : 'Color'}
              {step.low === index && <span className="pointer-badge low" style={{ top: '-14px' }}>Darks Zone</span>}
              {step.mid === index && <span className="pointer-badge" style={{ top: '-14px' }}>In Hand</span>}
              {step.high === index && <span className="pointer-badge high" style={{ bottom: '-14px', top: 'auto' }}>Colors Zone</span>}
            </div>
          );
        })}
      </div>
      <div className="legend">
        <span><i style={{background:'var(--color-blue)'}}></i> 0 zone / low</span>
        <span><i></i> mid scan</span>
        <span><i style={{background:'var(--color-purple)'}}></i> 2 zone / high</span>
      </div>
    </React.Fragment>
  );
}

function MonoView({ arr, step }) {
  // To visually represent popped items vs in stack, we render the vertical stack.
  return (
    <React.Fragment>
      <div className="stack-layout" style={{ margin: 'var(--space-6) 0' }}>
        <div className="stack-container">
          {step.stack.map((stackIndex, i) => {
            const isTop = i === step.stack.length - 1;
            return (
              <div key={`stack-${i}`} className="stack-item" style={{ 
                borderWidth: isTop ? '3px' : '1px', 
                borderColor: isTop ? 'var(--color-primary)' : 'var(--color-border)' 
              }}>
                {isTop && <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-primary)' }}>Top</span>}
                Day {stackIndex + 1} ({arr[stackIndex]}°)
              </div>
            );
          })}
          {step.stack.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--color-text-faint)', padding: 'var(--space-2)' }}>
              Empty
            </div>
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <div className="temp-row">
            {arr.map((value, index) => (
              <div key={index} className={`cell ${step.stack.includes(index) ? 'warn' : ''} ${step.index === index ? 'active' : ''} ${step.resolved === index ? 'best' : ''}`}>
                <span className="index">Day {index + 1}</span>
                {value}°
                {step.resolved === index && <span className="pointer-badge" style={{ background: 'var(--color-success)', top: '-14px' }}>Popped!</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="metric-grid">
        <div className="metric-box"><span>Waiting Room (Stack Indices)</span><strong>[{step.stack.join(', ')}]</strong></div>
        <div className="metric-box"><span>Days Waited (Result)</span><strong>[{step.result.join(', ')}]</strong></div>
      </div>
      <div className="legend">
        <span><i style={{background:'var(--color-orange)'}}></i> Waiting in stack</span>
        <span><i style={{background:'var(--color-success)'}}></i> Just resolved (Popped)</span>
      </div>
    </React.Fragment>
  );
}

function UnionView({ n, step }) {
  return (
    <React.Fragment>
      <div className="array-row">
        {Array.from({ length: n }, (_, index) => (
          <div key={index} className={`cell ${step.edge && step.edge.includes(index) ? 'active' : ''}`}>
            <span className="index">Boss: {step.parent[index]}</span>
            Person {index}
          </div>
        ))}
      </div>
      <div className="metric-grid">
        <div className="metric-box"><span>New Friendship</span><strong>{step.edge ? `Person ${step.edge[0]} & Person ${step.edge[1]}` : 'None yet'}</strong></div>
        <div className="metric-box"><span>Club Bosses (Parents)</span><strong>[{step.parent.join(', ')}]</strong></div>
        <div className="metric-box"><span>Rank</span><strong>[{step.rank.join(', ')}]</strong></div>
      </div>
    </React.Fragment>
  );
}

window.FloydView = FloydView;
window.KadaneView = KadaneView;
window.MajorityView = MajorityView;
window.DutchView = DutchView;
window.MonoView = MonoView;
window.UnionView = UnionView;
