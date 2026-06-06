import re

with open('journal/DashboardView.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update color mapping in dash-day-header
old_color_map = "day.patternType === 'll' ? 'var(--ll-primary)' : 'var(--bs-primary)'"
new_color_map = "day.patternType === 'll' ? 'var(--ll-primary)' : day.patternType === 'gr' ? 'var(--gr-primary)' : day.patternType === 'dp' ? 'var(--dp-primary)' : day.patternType === 'iv' ? 'var(--iv-primary)' : day.patternType === 'gd' ? 'var(--gd-primary)' : 'var(--bs-primary)'"
content = content.replace(old_color_map, new_color_map)

# Update icon mapping
old_icon_map = "day.patternType === 'll' ? <i className=\"fa-solid fa-link\"></i> : <i className=\"fa-solid fa-bullseye\"></i>"
new_icon_map = "day.patternType === 'll' ? <i className=\"fa-solid fa-link\"></i> : day.patternType === 'gr' ? <i className=\"fa-solid fa-circle-nodes\"></i> : day.patternType === 'dp' ? <i className=\"fa-solid fa-brain\"></i> : day.patternType === 'iv' ? <i className=\"fa-solid fa-arrows-left-right-to-line\"></i> : day.patternType === 'gd' ? <i className=\"fa-solid fa-money-bill-trend-up\"></i> : <i className=\"fa-solid fa-bullseye\"></i>"
content = content.replace(old_icon_map, new_icon_map)

with open('journal/DashboardView.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated DashboardView.jsx")
