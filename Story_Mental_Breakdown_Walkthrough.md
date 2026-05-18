# 🧠 Story Mental Breakdown — Complete Walkthrough

> **Read this ONE file to get familiar with ALL 9 patterns, their stories, problems, and solution approaches.**
> Each pattern follows: **Story → Problem → How to think → Key code → Pitfalls**

---

# 📘 Table of Contents

| # | Pattern | Story Metaphor | Problems |
|---|---------|---------------|----------|
| 1 | [Arrays + HashMap](#1--arrays--hashmap) | Guest Book at a Party | Count Occurrences, Two Sum, Group Anagrams, Valid Sudoku, Subarray Sum = K |
| 2 | [Two Pointers](#2--two-pointers) | Two People on a Sorted Road | TwoSumII, Valid Palindrome, ThreeSum, Trapping Rain Water |
| 3 | [Sliding Window](#3--sliding-window) | Magnifying Glass Sliding | Max Average Subarray, Max Vowels, Minimum Window Substring |
| 4 | [Binary Search](#4--binary-search) | Dictionary Lookup | Binary Search, Rotated Array, Median of Two Arrays |
| 5 | [Stack / Queue](#5--stack--queue) | Undo Button (LIFO) | Valid Parentheses, Daily Temperatures, Largest Rectangle |
| 6 | [Trees / Graphs](#6--trees--graphs) | DFS = Deep Path, BFS = Level by Level | Max Depth, Level Order, LCA |
| 7 | [Heap](#7--heap) | VIP Bouncer | Kth Largest, Top K Frequent, Merge K Sorted |
| 8 | [Core DP](#8--core-dp) | Notebook of Saved Answers | Climbing Stairs, Coin Change, LIS |
| 9 | [Backtracking](#9--backtracking) | Try Every Door | Subsets, Permutations, N-Queens |

---

# 1 — Arrays + HashMap

> **ONE SENTENCE**: "Trade space for time — use a map as a guest book to avoid searching twice."

## 🎯 The Pattern Story: The Guest Book

Imagine you're at a **PARTY**. Without a guest book, to find someone you'd ask EVERY person → O(N²).
With a **GUEST BOOK** at the door, you just check the book → O(1) lookup.

**HashMap = Guest Book**
- When someone arrives → they **SIGN** the book (`map.put`)
- When you need someone → you **CHECK** the book (`map.containsKey`)

---

### 📗 Easy: Count Occurrences — "Voting Booth"

| | |
|---|---|
| **LeetCode** | Frequency Counter (foundation technique) |
| **Problem** | Count how many times each element appears in an array |
| **Story** | People walk in and cast their vote. The BALLOT BOX (HashMap) tracks votes per candidate |

**How to think:**
```
nums = [1, 2, 2, 3, 3, 3]

1 votes → {1: 1}
2 votes → {1: 1, 2: 1}
2 votes → {1: 1, 2: 2}  ← getOrDefault(2, 0) + 1
3 votes → {1: 1, 2: 2, 3: 3}
```

**The MOST reusable line in DSA:**
```java
freq.put(num, freq.getOrDefault(num, 0) + 1);
```

**Key steps:** INIT map → LOOP each element → COUNT with getOrDefault → RETURN map

**Where this is reused:** Top K Frequent, Anagrams, Sudoku, Majority Element

⏱ O(N) time, O(N) space

---

### 📗 Easy: Two Sum — "Party Partner" (LC #1)

| | |
|---|---|
| **Problem** | Find two numbers that add up to target, return their indices |
| **Story** | You walk in wearing shirt #2. Target=9. You NEED partner #7. CHECK guest book → not there. SIGN guest book. Next person wearing #7 checks → finds you! |

**How to think:**
```
Guest Book (HashMap):
┌─────────┬───────┐
│ Number  │ Index │
├─────────┼───────┤
│    2    │   0   │  ← signed in
│    7    │   1   │  ← found partner!
└─────────┴───────┘
```

**Key steps:** INIT map → LOOP → CHECK `need = target - nums[i]` → if found return → else STORE

**⚠️ Pitfall:** Always CHECK before you SIGN (prevents matching with yourself!)

⏱ O(N) time, O(N) space

---

### 📙 Medium: Group Anagrams — "Filing Cabinet" (LC #49)

| | |
|---|---|
| **Problem** | Group words that are anagrams of each other |
| **Story** | SORT each word's letters → they become a FINGERPRINT. File each word into the correct drawer |

**How to think:**
```
"eat" → sort → "aet"    ┐
"tea" → sort → "aet"    ├─ same drawer!
"ate" → sort → "aet"    ┘
"tan" → sort → "ant"    → different drawer
```

**Key steps:** INIT `Map<String, List<String>>` → LOOP words → SORT letters = fingerprint → FILE into drawer

**⚠️ Pitfall:** Don't forget to `new ArrayList<>()` when encountering a new key

⏱ O(N × K log K) time

---

### 📙 Medium: Valid Sudoku — "Hotel Check-In with 3 Guest Books" (LC #36)

| | |
|---|---|
| **Problem** | Check if a 9×9 Sudoku board is valid (no duplicates in row/col/box) |
| **Story** | Hotel with 3 rules: no same-name on same FLOOR (row), WING (col), or SUITE (3×3 box) |

**How to think:**
```
For each cell → check 3 HashSets:
  rows[row].contains(num)?       → duplicate on this floor!
  cols[col].contains(num)?       → duplicate in this wing!
  boxes[boxIndex].contains(num)? → duplicate in this suite!

BOX INDEX FORMULA (memorize!):
  boxIndex = (row / 3) * 3 + (col / 3)
```

**Key steps:** INIT 3 arrays of 9 HashSets → LOOP cells → SKIP '.' → CHECK all 3 → STORE in all 3

**⚠️ Pitfall:** Forgetting `boxIndex = (row / 3) * 3 + (col / 3)`. Not skipping empty cells.

⏱ O(1) time (board is always 81 cells)

---

### 📕 Hard: Subarray Sum Equals K — "Road Milestones" (LC #560)

| | |
|---|---|
| **Problem** | Count continuous subarrays whose sum equals K |
| **Story** | Walking a road tracking total distance (runningSum). At each step: "Was there a PAST milestone where the GAP = K?" |

**How to think:**
```
Numbers: [1, 1, 1], K = 2

Step 0: runningSum = 0 → Logbook: {0: 1}  ← SEED!
Step 1: runningSum = 1 → need 1-2 = -1? NO
Step 2: runningSum = 2 → need 2-2 = 0? YES! → count = 1
Step 3: runningSum = 3 → need 3-2 = 1? YES! → count = 2

Road:    [1]  [1]  [1]
Sum:   0   1    2    3
              ╰──K=2──╯  ← subarray [1,1]
         ╰──K=2──╯       ← subarray [1,1]
```

**Key formula:** `if (logbook.containsKey(runningSum - k))` → count those subarrays

**⚠️ Pitfall:** SEED the logbook with `(0, 1)`! Sliding Window FAILS here (negative numbers!)

⏱ O(N) time, O(N) space

---

# 2 — Two Pointers

> **ONE SENTENCE**: "Two people walking toward each other on a sorted road — move the one that fixes the problem."

## 🎯 The Pattern Story: Two People on a Sorted Road

Sorted row of items. Place one person at each END. Walk TOWARD each other:
- Too small? → Move LEFT person right (bigger values)
- Too big? → Move RIGHT person left (smaller values)
- Just right? → DONE!

---

### 📗 Easy: TwoSumII — "Shortest + Tallest Kid" (LC #167)

| | |
|---|---|
| **Problem** | Sorted array, find two numbers that sum to target |
| **Story** | Kids sorted by height. Start with shortest (left) and tallest (right). Adjust. |

**How to think:**
```
[2, 7, 11, 15], target = 9
left=2, right=15 → 17 → too big → right--
left=2, right=11 → 13 → too big → right--
left=2, right=7  → 9  → MATCH!
```

**Key steps:** INIT left=0, right=end → LOOP while left<right → CHECK sum → move accordingly

**Remember:** `left++` increases sum. `right--` decreases sum.

⏱ O(N) time, O(1) space

---

### 📗 Easy: Valid Palindrome — "Two Friends on a Banner" (LC #125)

| | |
|---|---|
| **Problem** | Is string a palindrome? (alphanumeric only, ignore case) |
| **Story** | Friend A reads LEFT, Friend B reads RIGHT. Skip junk. Compare lowercase. |

**Key steps:** INIT both ends → LOOP → SKIP non-alphanumeric → CHECK lowercase match → MOVE inward

**⚠️ Pitfall:** Must check `left < right` INSIDE the skip loops to avoid out of bounds!

⏱ O(N) time, O(1) space

---

### 📙 Medium: ThreeSum — "Anchor + TwoSumII" (LC #15)

| | |
|---|---|
| **Problem** | Find all unique triplets [a,b,c] where a+b+c = 0 |
| **Story** | Sort → Pick an ANCHOR kid → Run TwoSumII on the rest → Skip duplicates |

**How to think:**
```
3Sum = for each anchor, solve TwoSumII
Sort → Fix one element → Two pointers on rest → Skip duplicate anchors & pairs
```

**Key steps:** SORT → LOOP anchor i → PRUNE (skip dup anchors, break if >0) → TwoSumII inner loop → SKIP duplicate pairs

**⚠️ Pitfall:** Forgetting to sort first. Not skipping duplicates → duplicate triplets.

⏱ O(N²) time, O(1) space

---

### 📕 Hard: Trapping Rain Water — "Bathtub Walls" (LC #42)

| | |
|---|---|
| **Problem** | Given elevation map, compute trapped water |
| **Story** | Walls of different heights. Water = min(leftMax, rightMax) - current. Always process SHORTER side. |

**How to think:**
```
Water at any spot = min(tallest wall left, tallest wall right) - height
Always process the SHORTER side (it's the bottleneck).

If height[left] < height[right]:
  left is bottleneck → if height[left] >= leftMax: update. else: water += leftMax - height[left]
  left++
Else: same for right side
```

**⚠️ Pitfall:** Moving the WRONG pointer. Water level = min(leftMax, rightMax), not max!

⏱ O(N) time, O(1) space

---

# 3 — Sliding Window

> **ONE SENTENCE**: "A magnifying glass sliding across data — add right, remove left, track the best."

## 🎯 The Pattern Story: Magnifying Glass

A fixed-width (or variable-width) lens slides across data. Instead of recalculating everything, just **+right, -left**.

**Fixed Window:** BUILD first window → SLIDE (add right, remove left) → TRACK best
**Variable Window:** EXPAND right until valid → SHRINK left while still valid → TRACK best

---

### 📗 Easy: Max Average Subarray — "Magnifying Glass on Numbers" (LC #643)

| | |
|---|---|
| **Problem** | Find contiguous subarray of length k with max average |
| **Story** | Place magnifying glass at start, sum first k. Slide: +right, -left. Track best sum. |

**Key steps:** BUILD first window sum → SLIDE: `windowSum += nums[i] - nums[i-k]` → TRACK max → RETURN max/k

**Why O(N) not O(N×K)?** With sliding, you just do +1 and -1 at each position.

⏱ O(N) time, O(1) space

---

### 📙 Medium: Max Vowels — "Counting Jewels in the Glass" (LC #1456)

| | |
|---|---|
| **Problem** | Max vowels in any substring of length k |
| **Story** | Same magnifying glass. Count vowels instead of summing numbers. |

**Key steps:** Same template as MaxAverage! BUILD vowel count → SLIDE: if entering is vowel ++, if exiting is vowel -- → TRACK max

⏱ O(N) time, O(1) space

---

### 📕 Hard: Minimum Window Substring — "Detective Telescope + Shopping List" (LC #76)

| | |
|---|---|
| **Problem** | Smallest window in s containing all chars of t |
| **Story** | Detective with telescope + shopping list. EXPAND until all items found → SHRINK while still valid → Track shortest INSIDE shrink loop |

**How to think:**
```
Tracking:
  "need" map   = shopping list (what t requires)
  "have" map   = what's currently in telescope
  "matched"    = how many UNIQUE chars fully satisfied
  "required"   = total unique chars needed
  When matched == required → window is VALID → shrink!

WHERE to update min?
  SHORTEST → update INSIDE the shrink loop
  LONGEST → update OUTSIDE/AFTER the shrink loop
```

**Key steps:** BUILD need map from t → EXPAND right → CHECK if char completes a requirement (matched++) → SHRINK while matched==required → TRACK min inside shrink → RETURN best

**⚠️ Pitfall:** Use `.intValue()` when comparing Integer objects! Update min INSIDE shrink loop for shortest.

⏱ O(S + T) time, O(1) space (alphabet-bounded maps)

---

# 4 — Binary Search

> **ONE SENTENCE**: "Open a dictionary to the middle — too far? Go left half. Too early? Go right half."

## 🎯 The Pattern Story: Dictionary Lookup

Open to middle page. Word comes after? → ignore left half. Before? → ignore right half. Each flip HALVES remaining pages.

**Key formula (memorize!):** `mid = left + (right - left) / 2` (overflow-safe)

---

### 📗 Easy: Binary Search — "Dictionary Lookup" (LC #704)

| | |
|---|---|
| **Problem** | Find target in sorted array |
| **Story** | Open dictionary to middle → halve. 1000 pages → ~10 flips. |

**Key steps:** INIT left=0, right=end → LOOP while left<=right → MID → CHECK: equal=found, less=go right, more=go left

⏱ O(log N) time, O(1) space

---

### 📙 Medium: Search in Rotated Array — "Dropped Dictionary" (LC #33)

| | |
|---|---|
| **Problem** | Find target in a rotated sorted array |
| **Story** | Dictionary was DROPPED. Pages shuffled. But ONE HALF is always sorted! |

**How to think:**
```
[4, 5, 6, 7 | 0, 1, 2] — two sorted halves

At any mid:
1. Figure out WHICH half is sorted (nums[left] <= nums[mid]?)
2. Check if target is IN that sorted half's range
3. Yes → search that half. No → search the other half.
```

**⚠️ Pitfall:** Use `<=` when checking if left half is sorted (`nums[left] <= nums[mid]`).

⏱ O(log N) time, O(1) space

---

### 📕 Hard: Median of Two Sorted Arrays — "Two Assembly Lines" (LC #4)

| | |
|---|---|
| **Problem** | Find median of two sorted arrays in O(log(m+n)) |
| **Story** | Two assembly lines. Binary search the shorter one. Partition so left ≤ right. |

⏱ O(log(min(M,N))) time, O(1) space

---

# 5 — Stack / Queue

> **ONE SENTENCE**: "Stack = undo button (LIFO). Queue = waiting line (FIFO)."

## 🎯 The Pattern Story

**Stack:** Last In, First Out. Like an undo button — the most recent action gets undone first.
**Monotonic Stack:** Keeps elements in sorted order. Pop when the condition breaks.
**Key:** Monotonic stacks store **INDICES** not values!

---

### 📗 Easy: Valid Parentheses — "Matching Socks" (LC #20)

| | |
|---|---|
| **Problem** | Check if brackets are properly matched |
| **Story** | Opener (left sock) → PUSH to pile. Closer (right sock) → POP and compare. End: pile should be EMPTY. |

**Key steps:** INIT stack + pairs map → LOOP chars → if closer: pop & compare → if opener: push → RETURN stack.isEmpty()

⏱ O(N) time, O(N) space

---

### 📙 Medium: Daily Temperatures — "Waiting for a Warmer Day" (LC #739)

| | |
|---|---|
| **Problem** | For each day, how many days until warmer? |
| **Story** | People waiting in line. When a WARMER person arrives → they "answer" everyone cooler. |

**How to think:**
```
Stack stores INDICES of days still waiting.
When warmer temp arrives → pop all cooler days, calculate wait: today - coldDay
```

**Key steps:** INIT stack of indices → LOOP → while top is cooler: POP, answer[coldDay] = today - coldDay → PUSH today

⏱ O(N) time (each index pushed/popped at most once)

---

### 📕 Hard: Largest Rectangle in Histogram — "Building Skyline" (LC #84)

| | |
|---|---|
| **Problem** | Find largest rectangle area in histogram |
| **Story** | Stack keeps bars in INCREASING order. Shorter bar arrives → pop taller bars, calculate their rectangle area. |

**How to think:**
```
When shorter bar arrives:
  Pop taller bar → height = popped height
  Width = stack empty ? i : i - stack.peek() - 1
  Area = height × width
  
Trick: Loop to heights.length (add virtual 0-height bar to flush stack)
```

**⚠️ Pitfall:** Width calculation when stack is empty = `i` (extends to the very left edge).

⏱ O(N) time, O(N) space

---

# 6 — Trees / Graphs

> **ONE SENTENCE**: "DFS = explore one path deep (recursion). BFS = explore all neighbors first (queue)."

---

### 📗 Easy: Max Depth — "How Deep is the Well?" (LC #104)

| | |
|---|---|
| **Problem** | Find maximum depth of binary tree |
| **Story** | Drop a ball. At each fork, go left AND right. Return the DEEPER path + 1. |

**Key code:**
```java
if (root == null) return 0;
return Math.max(solve(root.left), solve(root.right)) + 1;
```

⏱ O(N) time, O(H) space

---

### 📙 Medium: Level Order Traversal — "Announcing Each Floor" (LC #102)

| | |
|---|---|
| **Problem** | Return nodes level by level |
| **Story** | Loudspeaker announces each floor. Use a QUEUE. Process all nodes at current level, add their children. |

**Key steps:** INIT queue with root → LOOP while queue not empty → `levelSize = queue.size()` → process that many nodes → add children → save level list

**Key insight:** `levelSize` snapshot prevents mixing levels!

⏱ O(N) time, O(N) space

---

### 📕 Hard: Lowest Common Ancestor — "Two Cousins" (LC #236)

| | |
|---|---|
| **Problem** | Find LCA of two nodes in binary tree |
| **Story** | Two cousins finding their nearest common grandparent. DFS from root. If both sides return non-null → I'm the LCA! |

**Key code:**
```java
if (root == null || root == p || root == q) return root;
TreeNode left = solve(root.left, p, q);
TreeNode right = solve(root.right, p, q);
if (left != null && right != null) return root;  // I'm the grandparent!
return left != null ? left : right;               // pass up whichever found
```

⏱ O(N) time, O(H) space

---

# 7 — Heap

> **ONE SENTENCE**: "A VIP bouncer that always hands you the smallest (or largest) item in O(log N)."

**Java:** `PriorityQueue<>()` = min-heap by default.

---

### 📗 Easy: Kth Largest Element — "VIP List" (LC #703)

| | |
|---|---|
| **Problem** | Find kth largest element |
| **Story** | VIP club with K spots. New person arrives → if better than least VIP, swap in. peek() = Kth largest. |

**Key steps:** INIT min-heap → LOOP: offer each element → PRUNE: if size > k, poll → RETURN peek()

**Key insight:** Min-heap of size K. The TOP (smallest in heap) is the Kth largest overall!

⏱ O(N log K) time, O(K) space

---

### 📙 Medium: Top K Frequent Elements — "Election" (LC #347)

| | |
|---|---|
| **Problem** | Find k most frequent elements |
| **Story** | Election: count votes (frequency map) → heap picks top K winners |

**Key steps:** COUNT frequencies (HashMap) → MIN-HEAP sorted by frequency → add candidates, PRUNE to size K → collect results

**Key insight:** Two-phase: frequency counting THEN heap selection.

⏱ O(N log K) time, O(N) space

---

### 📕 Hard: Merge K Sorted Lists — "K Checkout Lines" (LC #23)

| | |
|---|---|
| **Problem** | Merge k sorted linked lists into one |
| **Story** | K checkout lines. Coordinator (min-heap) picks smallest ticket. After serving → next from same line joins. |

**Key steps:** INIT min-heap → SEED with head of each list → LOOP: poll smallest, attach to result, offer smallest.next if exists

⏱ O(N log K) time, O(K) space

---

# 8 — Core DP

> **ONE SENTENCE**: "Don't solve the same puzzle twice — save the answer in a notebook and look it up next time."

**DP Pattern:** Define subproblem → Find recurrence → Set base cases → Build bottom-up

---

### 📗 Easy: Climbing Stairs — "Fibonacci Staircase" (LC #70)

| | |
|---|---|
| **Problem** | How many ways to climb N stairs (1 or 2 steps)? |
| **Story** | To reach step N, you came from N-1 or N-2. `ways(N) = ways(N-1) + ways(N-2)` → it's Fibonacci! |

**Key code:**
```java
int prev2 = 1, prev1 = 2;  // base cases
for (int i = 3; i <= n; i++) {
    int current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
}
return prev1;
```

⏱ O(N) time, O(1) space (just two variables!)

---

### 📙 Medium: Coin Change — "Bus Rides" (LC #322)

| | |
|---|---|
| **Problem** | Fewest coins to make amount |
| **Story** | At distance 0, want to reach `amount`. Each coin = bus route. dp[d] = fewest rides to reach distance d. |

**Key formula:**
```java
dp[d] = Math.min(dp[d], dp[d - coin] + 1);
// "If I take this bus, I need 1 ride + rides to reach d-coin"
```

**Key steps:** INIT dp array with amount+1 (infinity) → dp[0]=0 → LOOP amounts 1..target → TRY each coin → RETURN dp[amount] or -1

⏱ O(amount × coins) time, O(amount) space

---

### 📕 Hard: Longest Increasing Subsequence — "Rising Dominoes" (LC #300)

| | |
|---|---|
| **Problem** | Length of longest strictly increasing subsequence |
| **Story** | Chain of rising dominoes. For each domino, check all previous — if shorter, extend their chain. |

**Key formula:**
```java
dp[i] = Math.max(dp[i], dp[j] + 1);  // for all j < i where nums[j] < nums[i]
```

**Key steps:** INIT dp[] all 1s → LOOP i → inner LOOP j<i → if nums[j]<nums[i]: extend → TRACK global max

⏱ O(N²) time, O(N) space

---

# 9 — Backtracking

> **ONE SENTENCE**: "Try every door. Dead end? Back up and try the next door. Save all successful paths."

**Template:** CHOOSE → EXPLORE → UNCHOOSE (backtrack)

---

### 📗 Easy: Subsets — "Packing a Bag" (LC #78)

| | |
|---|---|
| **Problem** | Return all possible subsets |
| **Story** | For each item: INCLUDE it or SKIP it. Every combination = different subset. |

**Key steps:** SAVE current bag → LOOP from start → CHOOSE (add) → EXPLORE (recurse i+1) → UNCHOOSE (remove last)

**Key insight:** Start from `i+1` to avoid duplicates. Save at EVERY level (even empty bag).

⏱ O(2^N × N) time

---

### 📙 Medium: Permutations — "Arranging Books" (LC #46)

| | |
|---|---|
| **Problem** | Return all permutations of distinct integers |
| **Story** | Try every order. At each position, place each UNUSED book. |

**Key difference from Subsets:**
- Subsets: include/skip, order doesn't matter, use `start` index
- Permutations: every element used, ORDER matters → use `boolean[] used` tracker

**Key steps:** If shelf full → SAVE → LOOP all elements → skip if used → CHOOSE (add + mark) → EXPLORE → UNCHOOSE (remove + unmark)

⏱ O(N! × N) time

---

### 📕 Hard: N-Queens — "Seating Royals" (LC #51)

| | |
|---|---|
| **Problem** | Place N queens so no two attack each other |
| **Story** | No two queens in same ROW (one per row), COLUMN, or DIAGONAL. |

**How to think:**
```
For each ROW:
  Try each COLUMN → isSafe? → Place queen → Next row → Backtrack

isSafe checks 3 things:
  1. Column above (any Q in same col?)
  2. Upper-left diagonal
  3. Upper-right diagonal
```

**Key steps:** All rows done → SAVE → LOOP columns → isSafe? → PLACE queen → RECURSE next row → REMOVE queen

⏱ O(N!) time, O(N²) space

---

# 🔑 Quick Reference: Pattern Recognition Cheat Sheet

| Signal in Problem | → Use This Pattern |
|---|---|
| "Find pair/complement" + unsorted | Arrays + HashMap |
| "Sorted array" + "pair" | Two Pointers |
| "Contiguous subarray" + "length k" | Sliding Window (Fixed) |
| "Shortest/longest substring" + condition | Sliding Window (Variable) |
| "Sorted" + "find target" | Binary Search |
| "Matching/nesting" brackets | Stack |
| "Next greater/smaller" element | Monotonic Stack |
| "Level by level" tree traversal | BFS (Queue) |
| "Depth/path" in tree | DFS (Recursion) |
| "Top K" / "Kth largest" | Heap |
| "How many ways" / "minimum cost" | DP |
| "All combinations/permutations" | Backtracking |
| Negative numbers + subarray sum | Prefix Sum + HashMap (NOT sliding window!) |

---

# ⚡ Top 10 Most Critical Pitfalls

1. **Two Sum:** CHECK before STORE (prevent self-matching)
2. **Subarray Sum = K:** SEED logbook with `(0, 1)` — don't use Sliding Window with negatives
3. **Valid Sudoku:** Box index = `(row/3)*3 + col/3`
4. **Valid Palindrome:** `left < right` check INSIDE skip loops
5. **ThreeSum:** SORT first, skip ALL duplicates (anchor + both pointers)
6. **Trapping Rain Water:** Process the SHORTER side, not the taller
7. **Min Window Substring:** Update min INSIDE shrink loop (shortest). Use `.intValue()` for Integer comparison
8. **Binary Search:** `mid = left + (right - left) / 2` (overflow-safe)
9. **Largest Rectangle:** Width = `stack.empty() ? i : i - stack.peek() - 1`
10. **Backtracking:** Always UNCHOOSE after EXPLORE (remove + unmark)
