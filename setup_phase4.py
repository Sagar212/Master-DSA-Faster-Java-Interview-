import json
import os

base_path = 'journal_data'

# 1. Update index.json
index_path = os.path.join(base_path, 'index.json')
with open(index_path, 'r', encoding='utf-8') as f:
    index_data = json.load(f)

new_days = [
    {"id": 28, "title": "Graphs — ROI & Pattern", "patternType": "gr", "category": "Graphs"},
    {"id": 29, "title": "Graphs — Dry Run & Quiz", "patternType": "gr", "category": "Graphs"},
    {"id": 30, "title": "Graphs — Active Recall", "patternType": "gr", "category": "Graphs"},
    
    {"id": 31, "title": "1D DP — ROI & Pattern", "patternType": "dp", "category": "1D Dynamic Programming"},
    {"id": 32, "title": "1D DP — Dry Run & Quiz", "patternType": "dp", "category": "1D Dynamic Programming"},
    {"id": 33, "title": "1D DP — Active Recall", "patternType": "dp", "category": "1D Dynamic Programming"},
    
    {"id": 34, "title": "Intervals — ROI & Pattern", "patternType": "iv", "category": "Intervals"},
    {"id": 35, "title": "Intervals — Dry Run & Quiz", "patternType": "iv", "category": "Intervals"},
    {"id": 36, "title": "Intervals — Active Recall", "patternType": "iv", "category": "Intervals"},
    
    {"id": 37, "title": "Greedy — ROI & Pattern", "patternType": "gd", "category": "Greedy"},
    {"id": 38, "title": "Greedy — Dry Run & Quiz", "patternType": "gd", "category": "Greedy"},
    {"id": 39, "title": "Greedy — Active Recall", "patternType": "gd", "category": "Greedy"}
]

# Avoid duplicates
existing_ids = {d['id'] for d in index_data}
index_data.extend([d for d in new_days if d['id'] not in existing_ids])

with open(index_path, 'w', encoding='utf-8') as f:
    json.dump(index_data, f, indent=2)


# 2. Update leetcode_map.json
lc_map_path = os.path.join(base_path, 'leetcode_map.json')
with open(lc_map_path, 'r', encoding='utf-8') as f:
    lc_map = json.load(f)

new_lc_problems = {
    # Graphs
    "numIslands": {"name": "Number of Islands", "difficulty": "Medium", "link": "https://leetcode.com/problems/number-of-islands/"},
    "courseSchedule": {"name": "Course Schedule", "difficulty": "Medium", "link": "https://leetcode.com/problems/course-schedule/"},
    "rottingOranges": {"name": "Rotting Oranges", "difficulty": "Medium", "link": "https://leetcode.com/problems/rotting-oranges/"},
    
    # DP
    "climbStairs": {"name": "Climbing Stairs", "difficulty": "Easy", "link": "https://leetcode.com/problems/climbing-stairs/"},
    "coinChange": {"name": "Coin Change", "difficulty": "Medium", "link": "https://leetcode.com/problems/coin-change/"},
    "houseRobber": {"name": "House Robber", "difficulty": "Medium", "link": "https://leetcode.com/problems/house-robber/"},
    
    # Intervals
    "mergeIntervals": {"name": "Merge Intervals", "difficulty": "Medium", "link": "https://leetcode.com/problems/merge-intervals/"},
    "insertInterval": {"name": "Insert Interval", "difficulty": "Medium", "link": "https://leetcode.com/problems/insert-interval/"},
    "meetingRoomsII": {"name": "Meeting Rooms II", "difficulty": "Medium", "link": "https://leetcode.com/problems/meeting-rooms-ii/"},
    
    # Greedy
    "jumpGame": {"name": "Jump Game", "difficulty": "Medium", "link": "https://leetcode.com/problems/jump-game/"},
    "gasStation": {"name": "Gas Station", "difficulty": "Medium", "link": "https://leetcode.com/problems/gas-station/"},
    "partitionLabels": {"name": "Partition Labels", "difficulty": "Medium", "link": "https://leetcode.com/problems/partition-labels/"}
}

lc_map.update(new_lc_problems)
with open(lc_map_path, 'w', encoding='utf-8') as f:
    json.dump(lc_map, f, indent=2)


# 3. Update journal.css
css_append = """
/* Phase 4 New Themes (Graphs, DP, Intervals, Greedy) */
:root {
  --gr-primary: #eab308;
  --gr-glow: rgba(234, 179, 8, 0.15);
  --dp-primary: #f43f5e;
  --dp-glow: rgba(244, 63, 94, 0.15);
  --iv-primary: #06b6d4;
  --iv-glow: rgba(6, 182, 212, 0.15);
  --gd-primary: #84cc16;
  --gd-glow: rgba(132, 204, 22, 0.15);
}

.day-num.gr { color: var(--gr-primary); }
.dash-day-icon.gr { background: var(--gr-glow); color: var(--gr-primary); }
.dash-day-card.gr-card .action-link { color: var(--gr-primary); }
.prob-tab.active.gr { color: var(--gr-primary); }
.prob-tab.active.gr::after { background: var(--gr-primary); }
.story-banner.gr { background: var(--gr-glow); border-left: 3px solid var(--gr-primary); }
.story-banner.gr i { color: var(--gr-primary); }
.leetcode-card.gr { border-left: 3px solid var(--gr-primary); background: var(--gr-glow); }
.roi-icon-container.gr { background: var(--gr-glow); color: var(--gr-primary); }
.step-explain-box.gr i { color: var(--gr-primary); }
.sandbox-step-card.gr h4 { color: var(--gr-primary); }
.primary-action-btn.gr { background: var(--gr-primary); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); }
.pass-btn.active.gr { background: var(--gr-primary); color: white; }
.day-card.active-gr::after { background: var(--gr-primary); }
.quiz-option.selected.gr { border-color: var(--gr-primary); background: rgba(234, 179, 8, 0.05); }


.day-num.dp { color: var(--dp-primary); }
.dash-day-icon.dp { background: var(--dp-glow); color: var(--dp-primary); }
.dash-day-card.dp-card .action-link { color: var(--dp-primary); }
.prob-tab.active.dp { color: var(--dp-primary); }
.prob-tab.active.dp::after { background: var(--dp-primary); }
.story-banner.dp { background: var(--dp-glow); border-left: 3px solid var(--dp-primary); }
.story-banner.dp i { color: var(--dp-primary); }
.leetcode-card.dp { border-left: 3px solid var(--dp-primary); background: var(--dp-glow); }
.roi-icon-container.dp { background: var(--dp-glow); color: var(--dp-primary); }
.step-explain-box.dp i { color: var(--dp-primary); }
.sandbox-step-card.dp h4 { color: var(--dp-primary); }
.primary-action-btn.dp { background: var(--dp-primary); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); }
.pass-btn.active.dp { background: var(--dp-primary); color: white; }
.day-card.active-dp::after { background: var(--dp-primary); }
.quiz-option.selected.dp { border-color: var(--dp-primary); background: rgba(244, 63, 94, 0.05); }


.day-num.iv { color: var(--iv-primary); }
.dash-day-icon.iv { background: var(--iv-glow); color: var(--iv-primary); }
.dash-day-card.iv-card .action-link { color: var(--iv-primary); }
.prob-tab.active.iv { color: var(--iv-primary); }
.prob-tab.active.iv::after { background: var(--iv-primary); }
.story-banner.iv { background: var(--iv-glow); border-left: 3px solid var(--iv-primary); }
.story-banner.iv i { color: var(--iv-primary); }
.leetcode-card.iv { border-left: 3px solid var(--iv-primary); background: var(--iv-glow); }
.roi-icon-container.iv { background: var(--iv-glow); color: var(--iv-primary); }
.step-explain-box.iv i { color: var(--iv-primary); }
.sandbox-step-card.iv h4 { color: var(--iv-primary); }
.primary-action-btn.iv { background: var(--iv-primary); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); }
.pass-btn.active.iv { background: var(--iv-primary); color: white; }
.day-card.active-iv::after { background: var(--iv-primary); }
.quiz-option.selected.iv { border-color: var(--iv-primary); background: rgba(6, 182, 212, 0.05); }


.day-num.gd { color: var(--gd-primary); }
.dash-day-icon.gd { background: var(--gd-glow); color: var(--gd-primary); }
.dash-day-card.gd-card .action-link { color: var(--gd-primary); }
.prob-tab.active.gd { color: var(--gd-primary); }
.prob-tab.active.gd::after { background: var(--gd-primary); }
.story-banner.gd { background: var(--gd-glow); border-left: 3px solid var(--gd-primary); }
.story-banner.gd i { color: var(--gd-primary); }
.leetcode-card.gd { border-left: 3px solid var(--gd-primary); background: var(--gd-glow); }
.roi-icon-container.gd { background: var(--gd-glow); color: var(--gd-primary); }
.step-explain-box.gd i { color: var(--gd-primary); }
.sandbox-step-card.gd h4 { color: var(--gd-primary); }
.primary-action-btn.gd { background: var(--gd-primary); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); }
.pass-btn.active.gd { background: var(--gd-primary); color: white; }
.day-card.active-gd::after { background: var(--gd-primary); }
.quiz-option.selected.gd { border-color: var(--gd-primary); background: rgba(132, 204, 22, 0.05); }

"""

with open('journal.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Phase 4 setup complete.")
