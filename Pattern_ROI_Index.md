# Pattern ROI Index — Dependency-First Learning Order

Master these patterns IN THIS ORDER. Each one builds on the previous.

## 🏆 The Learning Path

### TIER 1 — Foundation (Week 1–2) 🟢
These are the most frequently tested patterns. Master them first.

| # | Pattern | ROI | Depends On | One-Sentence Summary |
|---|---|---|---|---|
| 01 | **Arrays + HashMap** | ⭐⭐⭐⭐⭐ | Nothing | Trade O(N) space for O(N) time using a map for instant lookups. |
| 02 | **Two Pointers** | ⭐⭐⭐⭐⭐ | Arrays | Two pointers narrow down the search space in sorted data. |
| 03 | **Sliding Window** | ⭐⭐⭐⭐⭐ | Two Pointers | A moving window avoids recalculating overlapping subarray work. |

### TIER 2 — Core Skills (Week 2–3) 🟡
Essential for mid-level interviews. Build on Tier 1 foundations.

| # | Pattern | ROI | Depends On | One-Sentence Summary |
|---|---|---|---|---|
| 04 | **Binary Search** | ⭐⭐⭐⭐ | Arrays (sorted) | Halve the search space every step to find targets in O(log N). |
| 05 | **Stack / Queue** | ⭐⭐⭐⭐ | Arrays | LIFO/FIFO processing for matching, ordering, and next-greater problems. |

### TIER 3 — Advanced Structures (Week 3–4) 🟠
Required for FAANG-level interviews. Depends on recursion understanding.

| # | Pattern | ROI | Depends On | One-Sentence Summary |
|---|---|---|---|---|
| 06 | **Trees / Graphs** | ⭐⭐⭐⭐ | Stack/Queue + Recursion | Traverse hierarchical/connected data using DFS/BFS. |
| 07 | **Heap** | ⭐⭐⭐ | Trees concept | A priority queue that always gives you the min/max in O(log N). |

### TIER 4 — Complex Optimization (Week 4+) 🔴
High difficulty, but patterns are standardized. Focus on templates.

| # | Pattern | ROI | Depends On | One-Sentence Summary |
|---|---|---|---|---|
| 08 | **Core DP** | ⭐⭐⭐ | Recursion (Trees) | Break problems into overlapping subproblems + memoize. |
| 09 | **Backtracking** | ⭐⭐ | Recursion + DP | Explore all paths, backtrack on dead ends. Template-heavy. |

## 🎯 Quick Reference: When to Use What?

| If you see... | Use... |
|---|---|
| "Unsorted array" + "find pair" | 01 — HashMap |
| "Sorted array" + "find pair" | 02 — Two Pointers |
| "Contiguous subarray/substring" + "max/min/longest" | 03 — Sliding Window |
| "Sorted array" + "O(log N)" | 04 — Binary Search |
| "Next greater" / "balanced brackets" / "undo" | 05 — Stack |
| "Tree" / "graph" / "connected" / "levels" | 06 — Trees/Graphs |
| "Top K" / "Kth largest" / "merge K sorted" | 07 — Heap |
| "Min/max ways" / "can you reach?" / "optimal cost" | 08 — DP |
| "All combinations" / "all permutations" / "generate all" | 09 — Backtracking |
