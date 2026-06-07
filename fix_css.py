import os

css_fix = """
/* Missing sidebar active states for new patterns */
.day-card.active-gr {
  background: rgba(234, 179, 8, 0.06);
  border-color: rgba(234, 179, 8, 0.3);
  box-shadow: 0 4px 20px rgba(234, 179, 8, 0.08);
}

.day-card.active-dp {
  background: rgba(244, 63, 94, 0.06);
  border-color: rgba(244, 63, 94, 0.3);
  box-shadow: 0 4px 20px rgba(244, 63, 94, 0.08);
}

.day-card.active-iv {
  background: rgba(6, 182, 212, 0.06);
  border-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.08);
}

.day-card.active-gd {
  background: rgba(132, 204, 22, 0.06);
  border-color: rgba(132, 204, 22, 0.3);
  box-shadow: 0 4px 20px rgba(132, 204, 22, 0.08);
}
"""

with open('journal.css', 'a', encoding='utf-8') as f:
    f.write(css_fix)

print("CSS Fixed")
