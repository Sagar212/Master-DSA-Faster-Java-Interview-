import re

with open('journal.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update Array Cell
array_cell_old = """    .array-cell {
      width: 56px;
      height: 56px;
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      position: relative;
      transition: all 0.3s ease;
    }"""

array_cell_new = """    .array-cell {
      width: 56px;
      height: 56px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
      backdrop-filter: blur(10px);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
      position: relative;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      z-index: 1;
    }
    
    .array-cell::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 12px;
      background: inherit;
      z-index: -1;
      transition: opacity 0.4s ease;
      opacity: 0;
    }"""

css = css.replace(array_cell_old, array_cell_new)

# 2. Update Active Cells
active_cells_old = """    .array-cell.active-left {
      border-color: var(--tp-primary);
      background: rgba(14, 165, 233, 0.1);
      box-shadow: 0 0 15px rgba(14, 165, 233, 0.2);
    }

    .array-cell.active-right {
      border-color: var(--warning);
      background: rgba(245, 158, 11, 0.1);
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
    }

    .array-cell.active-left-sw {
      border-color: var(--sw-primary);
      background: rgba(249, 115, 22, 0.1);
      box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
    }

    .array-cell.in-window {
      background: rgba(249, 115, 22, 0.12);
      border-color: var(--sw-primary);
    }

    .array-cell.active-mid-bs {
      background: rgba(168, 85, 247, 0.2) !important;
      border-color: var(--bs-primary) !important;
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.35);
    }"""

active_cells_new = """    .array-cell.active-left {
      border-color: var(--tp-primary);
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(14, 165, 233, 0.05));
      box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: scale(1.15) translateY(-6px);
      z-index: 5;
    }

    .array-cell.active-right {
      border-color: var(--warning);
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05));
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: scale(1.15) translateY(-6px);
      z-index: 5;
    }

    .array-cell.active-left-sw {
      border-color: var(--sw-primary);
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.05));
      box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: scale(1.15) translateY(-6px);
      z-index: 5;
    }

    .array-cell.in-window {
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.02));
      border-color: var(--sw-primary);
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);
      transform: scale(1.05) translateY(-2px);
      z-index: 3;
    }

    .array-cell.active-mid-bs {
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.1)) !important;
      border-color: var(--bs-primary) !important;
      box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
      transform: scale(1.15) translateY(-6px);
      z-index: 5;
    }"""

css = css.replace(active_cells_old, active_cells_new)

# 3. Update Pointers
pointer_old = """    .cell-pointer {
      position: absolute;
      bottom: -24px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      animation: bounce 1.5s infinite;
    }

    .cell-pointer i {
      font-size: 12px;
    }"""

pointer_new = """    .cell-pointer {
      position: absolute;
      bottom: -38px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      background: rgba(13, 17, 33, 0.9);
      backdrop-filter: blur(8px);
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
      z-index: 10;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      white-space: nowrap;
    }

    .cell-pointer::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 12px;
      background: inherit;
      z-index: -1;
    }

    .cell-pointer i {
      font-size: 10px;
    }
    
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(var(--rgb), 0.4); }
      70% { box-shadow: 0 0 0 6px rgba(var(--rgb), 0); }
      100% { box-shadow: 0 0 0 0 rgba(var(--rgb), 0); }
    }
    
    .cell-pointer.lp { border-color: var(--tp-primary); color: var(--tp-primary); }
    .cell-pointer.lp::before { background: var(--tp-primary); box-shadow: 0 0 8px var(--tp-primary); }
    
    .cell-pointer.rp { border-color: var(--warning); color: var(--warning); }
    .cell-pointer.rp::before { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
    
    .cell-pointer.sw-lp { border-color: var(--text-main); color: var(--text-main); }
    .cell-pointer.sw-lp::before { background: var(--text-main); box-shadow: 0 0 8px var(--text-main); }
    
    .cell-pointer.sw-rp { border-color: var(--sw-primary); color: var(--sw-primary); }
    .cell-pointer.sw-rp::before { background: var(--sw-primary); box-shadow: 0 0 8px var(--sw-primary); }
    
    .cell-pointer.bs-lp { border-color: var(--tp-primary); color: var(--tp-primary); }
    .cell-pointer.bs-lp::before { background: var(--tp-primary); }
    
    .cell-pointer.bs-rp { border-color: var(--sw-primary); color: var(--sw-primary); }
    .cell-pointer.bs-rp::before { background: var(--sw-primary); }
    
    .cell-pointer.bs-mp { border-color: var(--bs-primary); color: var(--bs-primary); }
    .cell-pointer.bs-mp::before { background: var(--bs-primary); }
    """

css = css.replace(pointer_old, pointer_new)

# Remove the old cell pointer color blocks since they are replaced above
css = css.replace("    .cell-pointer.lp { color: var(--tp-primary); }", "")
css = css.replace("    .cell-pointer.rp { color: var(--warning); }", "")
css = css.replace("    .cell-pointer.sw-lp { color: var(--text-main); }", "")
css = css.replace("    .cell-pointer.sw-rp { color: var(--sw-primary); }", "")


# 4. Update Variables Container (Telemetry Dashboard)
vars_old = """    .vars-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      background: rgba(0, 0, 0, 0.4);
      padding: 16px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }

    .var-badge {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      padding: 4px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.02);
    }

    .var-name {
      color: var(--text-muted);
      font-family: 'Fira Code', monospace;
    }

    .var-value {
      font-weight: 700;
      font-family: 'Fira Code', monospace;
    }"""

vars_new = """    .vars-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      background: linear-gradient(180deg, rgba(13, 17, 33, 0.8), rgba(8, 11, 22, 0.9));
      backdrop-filter: blur(16px);
      padding: 24px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.5);
      position: relative;
    }
    
    .vars-container::before {
      content: 'TELEMETRY';
      position: absolute;
      top: -10px;
      left: 20px;
      background: var(--bg-card);
      padding: 0 8px;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 2px;
      color: var(--text-muted);
    }

    .var-badge {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      padding: 10px 14px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }
    
    .var-badge:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .var-name {
      color: var(--text-muted);
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .var-value {
      font-weight: 800;
      font-family: 'Fira Code', monospace;
      font-size: 14px;
      text-shadow: 0 0 10px currentColor;
    }"""

css = css.replace(vars_old, vars_new)

# 5. Update Code Highlighting
code_old = """    .code-line.highlighted {
      background: rgba(14, 165, 233, 0.12);
      border-left: 2px solid var(--tp-primary);
    }

    .code-line.highlighted-sw {
      background: rgba(249, 115, 22, 0.12);
      border-left: 2px solid var(--sw-primary);
    }

    .code-line.highlighted-bs {
      background: rgba(168, 85, 247, 0.12);
      border-left: 2px solid var(--bs-primary);
    }"""

code_new = """    @keyframes pulseBorder {
      0% { border-left-color: rgba(255,255,255,0.4); }
      50% { border-left-color: currentColor; }
      100% { border-left-color: rgba(255,255,255,0.4); }
    }

    .code-line.highlighted {
      background: linear-gradient(90deg, rgba(14, 165, 233, 0.2) 0%, transparent 100%);
      border-left: 3px solid var(--tp-primary);
      color: var(--tp-primary);
      animation: pulseBorder 2s infinite;
    }

    .code-line.highlighted-sw {
      background: linear-gradient(90deg, rgba(249, 115, 22, 0.2) 0%, transparent 100%);
      border-left: 3px solid var(--sw-primary);
      color: var(--sw-primary);
      animation: pulseBorder 2s infinite;
    }

    .code-line.highlighted-bs {
      background: linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%);
      border-left: 3px solid var(--bs-primary);
      color: var(--bs-primary);
      animation: pulseBorder 2s infinite;
    }
    
    .code-line.highlighted-hashmap {
      background: linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, transparent 100%);
      border-left: 3px solid var(--hm-primary);
      color: var(--hm-primary);
      animation: pulseBorder 2s infinite;
    }
    
    .code-line.highlighted-heap {
      background: linear-gradient(90deg, rgba(234, 179, 8, 0.2) 0%, transparent 100%);
      border-left: 3px solid var(--hp-primary);
      color: var(--hp-primary);
      animation: pulseBorder 2s infinite;
    }
    
    .code-line.highlighted-backtrack, .code-line.highlighted-tr, .code-line.highlighted-gr {
      background: linear-gradient(90deg, rgba(34, 197, 94, 0.2) 0%, transparent 100%);
      border-left: 3px solid #22c55e;
      color: #22c55e;
      animation: pulseBorder 2s infinite;
    }"""

css = css.replace(code_old, code_new)

with open('journal.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Visuals overhauled!")
