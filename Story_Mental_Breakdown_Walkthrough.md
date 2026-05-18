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

## 🎯 What is a HashMap?

A **HashMap** is like a **phonebook** — you give it a NAME (key), it instantly gives you the PHONE NUMBER (value).
- `map.put(key, value)` → write an entry
- `map.get(key)` → look up a value
- `map.containsKey(key)` → check if an entry exists
- **Speed:** All operations are O(1) — instant, no searching!

**WHY use it?** Without a HashMap, finding something in an array means scanning every element → O(N).
With a HashMap, you look it up instantly → O(1). You **trade memory for speed**.

## 🎯 The Pattern Story: The Guest Book

Imagine you're at a **PARTY** with 1000 people. Without a guest book, to find someone you'd ask EVERY person → O(N).
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
| **Story** | You walk into a party wearing shirt #2. Target=9. You NEED partner wearing #7 (because 9-2=7). CHECK guest book → not there. SIGN guest book. Later someone wearing #7 walks in, checks → finds you! |

**Full dry run:**
```
nums = [2, 7, 11, 15], target = 9

i=0, nums[0]=2: need = 9-2 = 7. Guest book has 7? NO → Sign: {2: 0}
i=1, nums[1]=7: need = 9-7 = 2. Guest book has 2? YES at index 0!
   → return [0, 1] ✓

Guest Book (HashMap):
┌─────────┬───────┐
│ Number  │ Index │
├─────────┼───────┤
│    2    │   0   │  ← signed in
│    7    │   1   │  ← found partner!
└─────────┴───────┘
```

**Intent of each step:**
1. **Calculate what you NEED** — `need = target - current`
2. **CHECK** the guest book for your need — O(1) lookup
3. **SIGN** the guest book with yourself — so your future partner can find you

**⚠️ Pitfall:** Always CHECK before you SIGN (prevents matching with yourself!)

⏱ O(N) time, O(N) space

---

### 📙 Medium: Group Anagrams — "Filing Cabinet" (LC #49)

| | |
|---|---|
| **Problem** | Group words that are anagrams of each other |
| **Story** | You have scrambled words. SORT each word's letters → they become a FINGERPRINT (like DNA). Same fingerprint = same group! |

**Full dry run:**
```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

"eat" → sort letters → "aet" → file into drawer "aet": ["eat"]
"tea" → sort letters → "aet" → file into drawer "aet": ["eat", "tea"]
"tan" → sort letters → "ant" → new drawer "ant": ["tan"]
"ate" → sort letters → "aet" → file into drawer "aet": ["eat", "tea", "ate"]
"nat" → sort letters → "ant" → file into drawer "ant": ["tan", "nat"]
"bat" → sort letters → "abt" → new drawer "abt": ["bat"]

Filing Cabinet (HashMap):
┌──────────────┬──────────────────┐
│ Fingerprint  │ Words            │
├──────────────┼──────────────────┤
│    "aet"     │ [eat, tea, ate]  │
│    "ant"     │ [tan, nat]       │
│    "abt"     │ [bat]            │
└──────────────┴──────────────────┘

Return all drawers → [[eat,tea,ate], [tan,nat], [bat]]
```

**Intent:** Sorting letters converts any anagram into the SAME key. Then HashMap groups them automatically.

**⚠️ Pitfall:** Don't forget to `new ArrayList<>()` when encountering a new key

⏱ O(N × K log K) time

---

### 📙 Medium: Valid Sudoku — "Hotel Check-In with 3 Guest Books" (LC #36)

| | |
|---|---|
| **Problem** | Check if a 9×9 Sudoku board is valid (no duplicates in row/col/box) |
| **Story** | Hotel with 3 guest books. Every guest must be unique on their FLOOR (row), WING (col), and SUITE (3×3 box). |

**What is a HashSet?** Like a guest book that only records NAMES (no values). You can instantly ask: "Is this name already here?" → O(1). Perfect for duplicate detection.

**Full dry run (partial):**
```
Board row 0: [5, 3, ., ., 7, ., ., ., .]

Cell (0,0) = 5:
  rows[0] has 5? NO. cols[0] has 5? NO. boxes[0] has 5? NO.
  → Add 5 to all three books ✓

Cell (0,1) = 3:
  rows[0] has 3? NO. cols[1] has 3? NO. boxes[0] has 3? NO.
  → Add 3 to all three books ✓

Cell (0,2) = '.': SKIP (empty cell)

If cell (0,3) were 5:
  rows[0] has 5? YES! → DUPLICATE → return false!
```

**Box index formula (memorize!):**
```
boxIndex = (row / 3) * 3 + (col / 3)

Row 0-2, Col 0-2 → box 0    Row 0-2, Col 3-5 → box 1
Row 3-5, Col 0-2 → box 3    Row 3-5, Col 3-5 → box 4
```

**⚠️ Pitfall:** Forgetting box formula. Not skipping '.' cells.

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

## 🎯 What are Two Pointers?

Two **index variables** (usually called `left` and `right`) that move through an array. Instead of checking every pair with nested loops O(N²), two pointers narrow the search in O(N).

**WHY does it work?** Because the array is **SORTED**:
- Moving `left` RIGHT always **increases** the value
- Moving `right` LEFT always **decreases** the value
- So you can **control the direction** of change!

## 🎯 The Pattern Story: Two People on a Sorted Road

Imagine kids standing in a LINE sorted by height. You need two kids whose combined height = target.
- Start with the SHORTEST (left) and TALLEST (right)
- Too short together? → Replace the shorter kid with the next taller one (`left++`)
- Too tall together? → Replace the taller kid with the next shorter one (`right--`)
- Perfect match? → DONE!

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
| **Story** | Two friends stand at opposite ends of a BANNER. They read toward each other, skipping spaces and punctuation, comparing lowercase letters. |

**Full dry run:**
```
s = "A man, a plan, a canal: Panama"

left=0 ('A'), right=29 ('a') → both alphanumeric → 'a'=='a' ✓ → move inward
left=1 (' ') → NOT alphanumeric → skip → left=2
left=2 ('m'), right=28 ('m') → 'm'=='m' ✓ → move inward
left=3 ('a'), right=27 ('a') → 'a'=='a' ✓ → move inward
left=4 ('n'), right=26 ('n') → 'n'=='n' ✓ → move inward
... all match → return true!

s = "race a car"
left=0 ('r'), right=9 ('r') → ✓
left=1 ('a'), right=8 ('a') → ✓
left=2 ('c'), right=7 ('c') → ✓
left=3 ('e'), right=5 ('a') → 'e'≠'a' → return false!
```

**⚠️ Pitfall:** Must check `left < right` INSIDE the skip loops — otherwise you go out of bounds on strings like `".,"`!

⏱ O(N) time, O(1) space

---

### 📙 Medium: ThreeSum — "Anchor + TwoSumII" (LC #15)

| | |
|---|---|
| **Problem** | Find all unique triplets [a,b,c] where a+b+c = 0 |
| **Story** | Sort the kids. Pick one as an ANCHOR (they stand still). The other two kids do TwoSumII to find the pair that cancels the anchor's value. |

**Key Insight: 3Sum = for each anchor, solve TwoSumII!**

**Full dry run:**
```
nums = [-1, 0, 1, 2, -1, -4]
After sort: [-4, -1, -1, 0, 1, 2]

Anchor i=0 (-4): need two nums summing to 4
  left=1(-1), right=5(2) → sum=-1+2=1 < 4 → left++
  left=2(-1), right=5(2) → sum=-1+2=1 < 4 → left++
  left=3(0), right=5(2) → sum=0+2=2 < 4 → left++
  left=4(1), right=5(2) → sum=1+2=3 < 4 → left++
  left=5 >= right=5 → STOP. No triplet with -4.

Anchor i=1 (-1): need two nums summing to 1
  left=2(-1), right=5(2) → sum=-1+2=1 = 1 → FOUND [-1,-1,2] ✓
  Skip dup left, skip dup right → left=3, right=4
  left=3(0), right=4(1) → sum=0+1=1 = 1 → FOUND [-1,0,1] ✓

Anchor i=2 (-1): same as i=1 → SKIP duplicate anchor!

Anchor i=3 (0): 0 > 0? No. left=4(1), right=5(2) → sum=3 > 0 → right--
  left >= right → STOP.

Result: [[-1,-1,2], [-1,0,1]]
```

**⚠️ Pitfalls:** Sort first! Skip duplicate anchors (`nums[i]==nums[i-1]`). Skip duplicate pairs after finding a match.

⏱ O(N²) time, O(1) space

---

### 📕 Hard: Trapping Rain Water — "Bathtub Walls" (LC #42)

| | |
|---|---|
| **Problem** | Given elevation map, compute how much rainwater is trapped |
| **Story** | Imagine walls of different heights after rain. Water at any spot is held by the SHORTER of the two tallest walls on either side — like a bathtub overflowing on the lower side. |

**Key Insight:** Water at position i = `min(leftMax, rightMax) - height[i]`. Always process the SHORTER side (it's the bottleneck).

**Full dry run:**
```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

left=0, right=11, leftMax=0, rightMax=0, water=0

h[0]=0 < h[11]=1 → process LEFT
  h[0]=0 >= leftMax=0 → update leftMax=0. left++

left=1: h[1]=1 < h[11]=1? NO → process RIGHT
  h[11]=1 >= rightMax=0 → update rightMax=1. right--

left=1, right=10: h[1]=1 < h[10]=2 → process LEFT
  h[1]=1 >= leftMax=0 → update leftMax=1. left++

left=2: h[2]=0 < h[10]=2 → process LEFT
  h[2]=0 < leftMax=1 → water += 1-0 = 1. left++. water=1

left=3: h[3]=2 < h[10]=2? NO → process RIGHT
  h[10]=2 >= rightMax=1 → update rightMax=2. right--

... continuing → final water = 6 ✓
```

**⚠️ Pitfall:** Always process the SHORTER side. Water = min(leftMax, rightMax) - height, NOT max!

⏱ O(N) time, O(1) space

---

# 3 — Sliding Window

> **ONE SENTENCE**: "A magnifying glass sliding across data — add right, remove left, track the best."

## 🎯 What is a Sliding Window?

Instead of re-examining the entire subarray every time you move, you **reuse** the previous result:
- **Add** the new element entering from the right
- **Remove** the old element exiting from the left
- This turns O(N×K) brute force into O(N)!

**Two types:**
- **Fixed Window:** Window size is always K. BUILD first → SLIDE → TRACK best
- **Variable Window:** Window grows/shrinks. EXPAND until valid → SHRINK while still valid → TRACK best

---

### 📗 Easy: Max Average Subarray — "Magnifying Glass on Numbers" (LC #643)

| | |
|---|---|
| **Problem** | Find contiguous subarray of length k with max average |
| **Story** | You have a magnifying glass exactly K cells wide. Place it at the start, sum everything inside. Slide it one step right: a new number enters from the right edge, an old number exits from the left edge. |

**Full dry run:**
```
nums = [1, 12, -5, -6, 50, 3], k = 4

BUILD first window [1, 12, -5, -6]: sum = 1+12+(-5)+(-6) = 2. maxSum=2

SLIDE right by 1:
  i=4: +50, -1 → sum = 2 + 50 - 1 = 51. maxSum=51
  i=5: +3, -12 → sum = 51 + 3 - 12 = 42. maxSum=51

Return 51 / 4 = 12.75 ✓
```

**WHY O(N) not O(N×K)?** Brute force recalculates all K elements for each position. Sliding window just does ONE add and ONE subtract → O(N).

⏱ O(N) time, O(1) space

---

### 📙 Medium: Max Vowels — "Counting Jewels in the Glass" (LC #1456)

| | |
|---|---|
| **Problem** | Max number of vowels in any substring of length k |
| **Story** | Same magnifying glass, but instead of summing numbers, you're counting VOWELS (a,e,i,o,u). |

**Full dry run:**
```
s = "abciiidef", k = 3

BUILD first window "abc": vowels = 1 (just 'a'). maxVowels=1

SLIDE:
  i=3: entering 'i' (vowel +1), exiting 'a' (vowel -1) → count=1. max=1
  i=4: entering 'i' (vowel +1), exiting 'b' (not vowel) → count=2. max=2
  i=5: entering 'i' (vowel +1), exiting 'c' (not vowel) → count=3. max=3 ★
  i=6: entering 'd' (not vowel), exiting 'i' (vowel -1) → count=2. max=3
  i=7: entering 'e' (vowel +1), exiting 'i' (vowel -1) → count=2. max=3
  i=8: entering 'f' (not vowel), exiting 'i' (vowel -1) → count=1. max=3

Return 3 ✓ (window "iii" at positions 3-5)
```

**Intent:** Exact same template as MaxAverage — just replace "sum += num" with "if vowel, count++"

⏱ O(N) time, O(1) space

---

### 📕 Hard: Minimum Window Substring — "Detective Telescope + Shopping List" (LC #76)

| | |
|---|---|
| **Problem** | Smallest window in s containing all characters of t |
| **Story** | You're a detective looking through a TELESCOPE at a street of letters. You have a SHOPPING LIST of letters you must find. Widen the telescope until you have everything, then shrink it to find the smallest valid window. |

**Full dry run:**
```
s = "ADOBECODEBANC", t = "ABC"

Shopping list (need): {A:1, B:1, C:1}. required=3

EXPAND right:
  right=0 'A': have={A:1}. A matches need → matched=1
  right=1 'D': have={A:1,D:1}. matched=1
  right=2 'O': matched=1
  right=3 'B': have={..B:1}. B matches → matched=2
  right=4 'E': matched=2
  right=5 'C': have={..C:1}. C matches → matched=3 = required!

  SHRINK from left (matched==required):
    Window "ADOBEC" (len=6). bestLen=6, bestStart=0
    Remove 'A': have={A:0} < need={A:1} → matched=2. left=1. STOP shrinking.

  Continue EXPANDING...
  right=9 'A': matched=3 again!
  SHRINK: window "CODEBA" → "ODEBA" → ...
  right=10 'N', right=11 'C': matched=3!
  SHRINK: window "BANC" (len=4). bestLen=4 ★
    Remove 'B' → matched drops. STOP.

Return "BANC" ✓
```

**WHERE to update min (critical rule!):**
- Finding **SHORTEST** → update INSIDE the shrink loop
- Finding **LONGEST** → update OUTSIDE/AFTER the shrink loop

**⚠️ Pitfall:** Use `.intValue()` when comparing Integer objects in Java! `have.get(c).intValue() == need.get(c).intValue()`

⏱ O(S + T) time, O(1) space (alphabet-bounded maps)

---

# 4 — Binary Search

> **ONE SENTENCE**: "Open a dictionary to the middle — too far? Go left half. Too early? Go right half."

## 🎯 The Pattern Story: Dictionary Lookup

Imagine finding the word "mango" in a 1000-page dictionary.
Do you flip page by page? NO! That's O(N) = 1000 flips.

SMART WAY: Open to **page 500** (the MIDDLE).
- "mango" comes AFTER page 500? → **Rip out the left half**, search pages 501-1000.
- "mango" comes BEFORE page 500? → **Rip out the right half**, search pages 1-499.
- Each rip **HALVES** remaining pages. 1000 → 500 → 250 → 125 → ~10 flips total!

**Key formula (memorize!):** `mid = left + (right - left) / 2` (prevents integer overflow)

**WHY not `(left + right) / 2`?** If left and right are both near Integer.MAX_VALUE, their sum overflows!

---

### 📗 Easy: Binary Search — "Dictionary Lookup" (LC #704)

| | |
|---|---|
| **Problem** | Find target in sorted array, return index or -1 |
| **Story** | You have a sorted dictionary. Open to the middle page. Is your word here? Before? After? Halve and repeat. |

**Full dry run:**
```
nums = [-1, 0, 3, 5, 9, 12], target = 9

left=0, right=5 → mid=2 → nums[2]=3  < 9 → go RIGHT → left=3
left=3, right=5 → mid=4 → nums[4]=9  = 9 → FOUND at index 4!

Another: target = 2
left=0, right=5 → mid=2 → nums[2]=3  > 2 → go LEFT → right=1
left=0, right=1 → mid=0 → nums[0]=-1 < 2 → go RIGHT → left=1
left=1, right=1 → mid=1 → nums[1]=0  < 2 → go RIGHT → left=2
left=2 > right=1 → STOP → NOT FOUND → return -1
```

**Key steps:** INIT left=0, right=end → LOOP `while(left<=right)` → MID → CHECK: equal=found, less=go right (`left=mid+1`), more=go left (`right=mid-1`)

⏱ O(log N) time, O(1) space

---

### 📙 Medium: Search in Rotated Array — "Dropped Dictionary" (LC #33)

| | |
|---|---|
| **Problem** | Find target in a rotated sorted array |
| **Story** | You DROPPED the dictionary. Pages got shuffled at a random point! |

**Key Insight: At any mid, at least ONE HALF is perfectly sorted.**
```
Original: [0, 1, 2, 4, 5, 6, 7]
Dropped:  [4, 5, 6, 7 | 0, 1, 2]  ← rotated at index 4
                        ↑ pivot

At mid=3 (value=7):
  Left half [4,5,6,7] → nums[left]=4 <= nums[mid]=7 → LEFT is sorted ✓
  Right half [0,1,2]  → not sorted relative to mid

So: Is target in the sorted half [4..7]?
  YES → search left.  NO → search right.
```

**Full dry run (target=0):**
```
nums=[4,5,6,7,0,1,2], target=0

left=0, right=6, mid=3 → nums[3]=7 ≠ 0
  nums[0]=4 <= nums[3]=7 → LEFT sorted [4,5,6,7]
  Is 0 in [4..7]? NO → go right → left=4

left=4, right=6, mid=5 → nums[5]=1 ≠ 0
  nums[4]=0 <= nums[5]=1 → LEFT sorted [0,1]
  Is 0 in [0..1]? YES → go left → right=4

left=4, right=4, mid=4 → nums[4]=0 = 0 → FOUND!
```

**⚠️ Pitfall:** Use `<=` not `<` when checking `nums[left] <= nums[mid]` (handles single-element halves).

⏱ O(log N) time, O(1) space

---

### 📕 Hard: Median of Two Sorted Arrays — "Two Assembly Lines" (LC #4)

| | |
|---|---|
| **Problem** | Find median of two sorted arrays in O(log(m+n)) |
| **Story** | Two CONVEYOR BELTS of sorted items merging. Find the middle item WITHOUT fully merging. |

**Key Insight: Binary search on the SHORTER array to find the right partition.**
```
nums1 = [1, 3]    (length m=2)
nums2 = [2]        (length n=1)
Combined sorted: [1, 2, 3] → median = 2

Partition nums1 at i=1: left=[1], right=[3]
Partition nums2 at j=(3+1)/2 - 1 = 1: left=[2], right=[]
  → j auto-calculated: j = (m+n+1)/2 - i

Valid partition: maxLeft1(1) ≤ minRight2(∞) ✓
                 maxLeft2(2) ≤ minRight1(3) ✓
→ Median (odd) = max(maxLeft1, maxLeft2) = max(1,2) = 2 ✓
```

**The 4 boundary values (edge cases use MIN/MAX_VALUE):**
```
maxLeft1  = (i==0) ? -∞ : nums1[i-1]   ← biggest on left side of nums1
minRight1 = (i==m) ? +∞ : nums1[i]     ← smallest on right side of nums1
maxLeft2  = (j==0) ? -∞ : nums2[j-1]
minRight2 = (j==n) ? +∞ : nums2[j]
```

**⚠️ Pitfalls:** Always search the SHORTER array. Use -∞/+∞ for edge partitions.

⏱ O(log(min(M,N))) time, O(1) space

---

# 5 — Stack / Queue

> **ONE SENTENCE**: "Stack = undo button (LIFO). Queue = waiting line (FIFO)."

## 🎯 The Pattern Story

**Stack (LIFO):** Imagine a stack of PLATES. You can only add/remove from the TOP.
The LAST plate you put on is the FIRST one you take off.

**Monotonic Stack:** A special stack where elements stay in sorted order.
When a new element would break the order → POP until order is restored.
**CRITICAL:** Store **INDICES** not values — you need indices to calculate distances!

---

### 📗 Easy: Valid Parentheses — "Matching Socks" (LC #20)

| | |
|---|---|
| **Problem** | Check if brackets are properly matched |
| **Story** | Imagine sorting laundry. You pick up socks one by one from a basket. |

**Full dry run:**
```
s = "({[]})"

Read '(' → it's a LEFT sock → push onto pile: ['(']
Read '{' → LEFT sock → push: ['(', '{']
Read '[' → LEFT sock → push: ['(', '{', '[']
Read ']' → RIGHT sock! → peek top: '[' → MATCH! Pop. Pile: ['(', '{']
Read '}' → RIGHT sock! → peek top: '{' → MATCH! Pop. Pile: ['(']
Read ')' → RIGHT sock! → peek top: '(' → MATCH! Pop. Pile: []

Pile empty → ALL socks matched → return true!

s = "(]" → push '(', then ']' doesn't match '(' → return false!
```

**Key steps:** INIT stack + pairs map → LOOP chars → closer? pop & compare → opener? push → RETURN stack.isEmpty()

⏱ O(N) time, O(N) space

---

### 📙 Medium: Daily Temperatures — "Waiting for a Warmer Day" (LC #739)

| | |
|---|---|
| **Problem** | For each day, how many days until a warmer temperature? |
| **Story** | People standing in a queue holding their temperature sign. When someone WARMER arrives, everyone cooler in front finally gets their answer! |

**Full dry run:**
```
temps = [73, 74, 75, 71, 69, 72, 76, 73]

Day 0 (73): nobody waiting. Push 0. Stack=[0]
Day 1 (74): 74 > stack top 73 → pop 0, answer[0]=1-0=1. Push 1. Stack=[1]
Day 2 (75): 75 > 74 → pop 1, answer[1]=2-1=1. Push 2. Stack=[2]
Day 3 (71): 71 < 75 → just push. Stack=[2,3]
Day 4 (69): 69 < 71 → just push. Stack=[2,3,4]
Day 5 (72): 72 > 69 → pop 4, answer[4]=5-4=1
            72 > 71 → pop 3, answer[3]=5-3=2. Stack=[2,5]
Day 6 (76): 76 > 72 → pop 5, answer[5]=6-5=1
            76 > 75 → pop 2, answer[2]=6-2=4. Stack=[6]
Day 7 (73): 73 < 76 → push. Stack=[6,7]

Result: [1, 1, 4, 2, 1, 1, 0, 0]
         Days 6,7 never found warmer → stay 0
```

**Key insight:** Each index is pushed ONCE and popped ONCE → O(N) despite the while loop!

⏱ O(N) time, O(N) space

---

### 📕 Hard: Largest Rectangle in Histogram — "Building Skyline" (LC #84)

| | |
|---|---|
| **Problem** | Find the largest rectangle area in a histogram |
| **Story** | Imagine a city skyline of buildings. The stack keeps buildings in INCREASING height. When a SHORTER building appears, all taller buildings to its left can't extend any further right — so calculate their max rectangle before removing them. |

**Full dry run:**
```
heights = [2, 1, 5, 6, 2, 3]

i=0 (h=2): push 0. Stack=[0]
i=1 (h=1): 1 < 2 → pop 0. height=2, width=1 (stack empty→i). area=2. Stack=[1]
i=2 (h=5): push. Stack=[1,2]
i=3 (h=6): push. Stack=[1,2,3]
i=4 (h=2): 2 < 6 → pop 3. h=6, w=4-2-1=1. area=6.
           2 < 5 → pop 2. h=5, w=4-1-1=2. area=10 ★
           2 ≥ 1 → stop. Push 4. Stack=[1,4]
i=5 (h=3): push. Stack=[1,4,5]
i=6 (h=0 virtual): flush all remaining.
           pop 5. h=3, w=6-4-1=1. area=3.
           pop 4. h=2, w=6-1-1=4. area=8.
           pop 1. h=1, w=6 (empty). area=6.

Max area = 10 (from bars at heights 5,6 with width 2)
```

**Width formula:** `stack.isEmpty() ? i : i - stack.peek() - 1`

**⚠️ Pitfall:** Loop to `heights.length` (add virtual 0-height bar to flush the stack). Width when stack empty = `i` (bar extends all the way left).

⏱ O(N) time, O(N) space

---

# 6 — Trees / Graphs

> **ONE SENTENCE**: "DFS = explore one path deep (recursion/stack). BFS = explore all neighbors first (queue)."

## 🎯 The Pattern Story

Imagine a FAMILY TREE. Two ways to visit everyone:
- **DFS (Depth-First):** Visit one branch ALL THE WAY DOWN before backtracking. Like walking to the deepest room of a house before checking others.
- **BFS (Breadth-First):** Visit EVERYONE on the current floor before going to the next floor. Like a fire drill — evacuate floor by floor.

---

### 📗 Easy: Max Depth — "How Deep is the Well?" (LC #104)

| | |
|---|---|
| **Problem** | Find maximum depth of binary tree |
| **Story** | You drop a ball into a well with FORKS. At each fork the ball splits — one goes LEFT, one goes RIGHT. Report the DEEPEST the ball reaches. |

**Full dry run:**
```
        3          ← depth 1
       / \
      9   20       ← depth 2
         /  \
        15   7     ← depth 3

solve(3):
  leftDepth  = solve(9) → solve(null)=0, solve(null)=0 → max(0,0)+1 = 1
  rightDepth = solve(20) → solve(15)=1, solve(7)=1 → max(1,1)+1 = 2
  return max(1, 2) + 1 = 3 ✓
```

**The magic 3-line pattern (memorize this!):**
```java
if (root == null) return 0;                              // base case
return Math.max(solve(root.left), solve(root.right)) + 1; // max child + 1
```

⏱ O(N) time, O(H) space (H = height, recursion stack)

---

### 📙 Medium: Level Order Traversal — "Announcing Each Floor" (LC #102)

| | |
|---|---|
| **Problem** | Return tree nodes level by level |
| **Story** | A building with a LOUDSPEAKER. Announce everyone on floor 1, then floor 2, etc. Use a QUEUE — it naturally processes people in arrival order (FIFO). |

**Full dry run:**
```
        3
       / \
      9   20
         /  \
        15   7

Queue starts: [3]

Level 1: size=1. Process 3 → add children 9,20. Queue=[9,20]. Result=[[3]]
Level 2: size=2. Process 9 (no kids), 20 (kids 15,7). Queue=[15,7]. Result=[[3],[9,20]]
Level 3: size=2. Process 15,7 (no kids). Queue=[]. Result=[[3],[9,20],[15,7]]
```

**Key insight:** `levelSize = queue.size()` — snapshot the count BEFORE processing! This prevents mixing levels.

⏱ O(N) time, O(N) space

---

### 📕 Hard: Lowest Common Ancestor — "Two Cousins" (LC #236)

| | |
|---|---|
| **Problem** | Find the lowest common ancestor of two nodes p and q |
| **Story** | Two COUSINS at a family reunion. They each walk UP the family tree. The FIRST ancestor they BOTH pass through is the LCA (nearest common grandparent). |

**How the recursion thinks:**
```
         3  ← if BOTH sides return something, I'M the LCA!
        / \
       5   1
      / \
     6   2

Looking for p=5 and q=1:
  solve(3):
    left  = solve(5) → root==p → return 5 (found!)
    right = solve(1) → root==q → return 1 (found!)
    Both non-null → return 3 → I AM THE LCA! ✓

Looking for p=5 and q=6:
  solve(3):
    left = solve(5):
      left  = solve(6) → root==q → return 6
      right = solve(2) → null
      Only left returned → pass up 6... wait,
      Actually root==p → return 5 (found p first!)
    right = solve(1) → null
    Only left returned → pass up 5 → LCA = 5 ✓
```

**The 4-line pattern:**
```java
if (root == null || root == p || root == q) return root;  // base: found or dead end
TreeNode left = solve(root.left, p, q);                   // search left
TreeNode right = solve(root.right, p, q);                 // search right
if (left != null && right != null) return root;           // both found → I'm LCA!
return left != null ? left : right;                       // pass up whichever found
```

⏱ O(N) time, O(H) space

---

# 7 — Heap

> **ONE SENTENCE**: "A VIP bouncer that always hands you the smallest (or largest) item in O(log N)."

## 🎯 The Pattern Story

**Java:** `PriorityQueue<>()` = **min-heap** by default (smallest on top).
For max-heap: `new PriorityQueue<>(Collections.reverseOrder())`

Think of a min-heap as a **BOUNCER** at a club who always knows the smallest person inside.

---

### 📗 Easy: Kth Largest Element — "VIP List" (LC #703)

| | |
|---|---|
| **Problem** | Find kth largest element |
| **Story** | VIP club with EXACTLY K spots. New person arrives → if better than the WEAKEST VIP, kick the weakest out and let the new person in. |

**Key insight: For Kth LARGEST, use a MIN-heap of size K!**
```
WHY min-heap? Because peek() gives the SMALLEST in the heap.
If heap has K elements → the smallest is the Kth largest overall!

nums = [4, 5, 8, 2], K=3

Process 4: heap=[4]          (size 1 ≤ 3, just add)
Process 5: heap=[4,5]        (size 2 ≤ 3, just add)
Process 8: heap=[4,5,8]      (size 3 = K, full)
Process 2: 2 < peek()=4      (not better than weakest VIP → REJECT)

peek() = 4 → that's the 3rd largest! ✓ (8 > 5 > 4)
```

**Key steps:** INIT min-heap → LOOP: offer each → PRUNE: if size > k, poll() → RETURN peek()

⏱ O(N log K) time, O(K) space

---

### 📙 Medium: Top K Frequent Elements — "Election" (LC #347)

| | |
|---|---|
| **Problem** | Find k most frequent elements |
| **Story** | ELECTION DAY. Phase 1: Count all votes. Phase 2: Heap picks the top K vote-getters. |

**Full dry run:**
```
nums = [1,1,1,2,2,3], k=2

Phase 1 — COUNT VOTES (HashMap):
  {1: 3, 2: 2, 3: 1}

Phase 2 — HEAP PICKS TOP K (min-heap sorted by frequency):
  Process candidate 1 (3 votes): heap=[1(3)]       size 1 ≤ 2
  Process candidate 2 (2 votes): heap=[2(2), 1(3)]  size 2 = k
  Process candidate 3 (1 vote):  1 < peek()=2 votes → REJECT

  Heap contains: [2, 1] → the top 2 most frequent! ✓
```

**Key steps:** COUNT frequencies → MIN-HEAP sorted by freq → add candidates, PRUNE to K → collect

⏱ O(N log K) time, O(N) space

---

### 📕 Hard: Merge K Sorted Lists — "K Checkout Lines" (LC #23)

| | |
|---|---|
| **Problem** | Merge k sorted linked lists into one sorted list |
| **Story** | K checkout lines at a store, each sorted by ticket number. A COORDINATOR (min-heap) always serves the customer with the SMALLEST ticket. After serving, the next person from that same line steps up. |

**Full dry run:**
```
List 1: 1 → 4 → 5
List 2: 1 → 3 → 4
List 3: 2 → 6

SEED heap with heads: [1, 1, 2]

Poll 1 (from list 1) → result: 1 → add 4 from list 1. Heap=[1, 2, 4]
Poll 1 (from list 2) → result: 1→1 → add 3. Heap=[2, 4, 3]
Poll 2 (from list 3) → result: 1→1→2 → add 6. Heap=[3, 4, 6]
Poll 3 (from list 2) → result: ...→3 → add 4. Heap=[4, 4, 6]
Poll 4 (from list 1) → result: ...→4 → add 5. Heap=[4, 5, 6]
Poll 4 (from list 2) → result: ...→4 → no next. Heap=[5, 6]
Poll 5 → result: ...→5 → no next. Heap=[6]
Poll 6 → result: ...→6 → done!

Final: 1→1→2→3→4→4→5→6 ✓
```

**Key steps:** INIT min-heap → SEED with heads → LOOP: poll smallest, attach to result, offer .next if exists

⏱ O(N log K) time, O(K) space

---

# 8 — Core DP

> **ONE SENTENCE**: "Don't solve the same puzzle twice — save the answer in a notebook and look it up next time."

## 🎯 The Pattern Story

Imagine a student solving a MATH WORKBOOK. Some problems require answers from earlier pages.
STUPID way: re-solve earlier problems every time → exponential time.
SMART way: write answers in a NOTEBOOK (dp array). Look them up when needed → polynomial time.

**DP Recipe:** 1) Define what dp[i] MEANS → 2) Find the RECURRENCE → 3) Set BASE CASES → 4) Build BOTTOM-UP

---

### 📗 Easy: Climbing Stairs — "Fibonacci Staircase" (LC #70)

| | |
|---|---|
| **Problem** | How many ways to climb N stairs (1 or 2 steps at a time)? |
| **Story** | Standing at the BOTTOM. To reach step N, you MUST have come from step N-1 (1 step) or N-2 (2 steps). So ways(N) = ways(N-1) + ways(N-2). It's FIBONACCI! |

**Full dry run:**
```
N = 5

Step 1: 1 way   (just take 1 step)
Step 2: 2 ways  (1+1 or 2)
Step 3: ways(2) + ways(1) = 2 + 1 = 3 ways
Step 4: ways(3) + ways(2) = 3 + 2 = 5 ways
Step 5: ways(4) + ways(3) = 5 + 3 = 8 ways ✓

Optimization: Don't need an array! Just two variables:
  prev2=1, prev1=2
  i=3: current=3, shift → prev2=2, prev1=3
  i=4: current=5, shift → prev2=3, prev1=5
  i=5: current=8, shift → prev2=5, prev1=8
  return prev1 = 8 ✓
```

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
| **Story** | You're at distance 0, want to reach distance `amount`. Each coin denomination is a BUS ROUTE. dp[d] = fewest bus rides to reach distance d. |

**Full dry run:**
```
coins = [1, 5, 10], amount = 11

dp[0] = 0  (base: 0 rides to stay at 0)
dp[1] = min(dp[1-1]+1) = min(dp[0]+1) = 1         → one $1 coin
dp[2] = min(dp[2-1]+1) = 2                         → two $1 coins
...
dp[5] = min(dp[5-1]+1, dp[5-5]+1) = min(5, 1) = 1  → one $5 coin!
dp[6] = min(dp[6-1]+1, dp[6-5]+1) = min(2, 2) = 2  → $5 + $1
...
dp[10] = min(dp[9]+1, dp[5]+1, dp[0]+1) = min(?, 2, 1) = 1  → one $10!
dp[11] = min(dp[10]+1, dp[6]+1, dp[1]+1) = min(2, 3, 2) = 2 → $10 + $1 ✓
```

**Key formula:**
```java
dp[d] = Math.min(dp[d], dp[d - coin] + 1);
// "If I take this bus, I need 1 ride + rides to reach d-coin"
```

**⚠️ Pitfall:** Initialize dp with `amount+1` (acts as infinity). Return -1 if dp[amount] > amount.

⏱ O(amount × coins) time, O(amount) space

---

### 📕 Hard: Longest Increasing Subsequence — "Rising Dominoes" (LC #300)

| | |
|---|---|
| **Problem** | Length of longest strictly increasing subsequence |
| **Story** | Chain of DOMINOES with numbers. You want the longest chain where each next domino is TALLER. For each domino i, check ALL previous dominoes j — if j is shorter, extend j's chain. |

**Full dry run:**
```
nums = [10, 9, 2, 5, 3, 7, 101, 18]
dp   = [ 1, 1, 1, 1, 1, 1,  1,   1]  (each element alone = length 1)

i=1 (9):  check j=0 (10>9 NO)  → dp=[1,1,1,1,1,1,1,1]
i=2 (2):  check j=0,1 (both>2) → dp=[1,1,1,1,1,1,1,1]
i=3 (5):  j=2 (2<5 YES) dp[3]=dp[2]+1=2  → dp=[1,1,1,2,1,1,1,1]
i=4 (3):  j=2 (2<3 YES) dp[4]=dp[2]+1=2  → dp=[1,1,1,2,2,1,1,1]
i=5 (7):  j=2 (2<7) dp[5]=2, j=3 (5<7) dp[5]=3, j=4 (3<7) dp[5]=3
          → dp=[1,1,1,2,2,3,1,1]
i=6 (101): j=5 (7<101) dp[6]=4  → dp=[1,1,1,2,2,3,4,1]
i=7 (18):  j=5 (7<18) dp[7]=4  → dp=[1,1,1,2,2,3,4,4]

Max = 4 → subsequence [2, 5, 7, 101] or [2, 3, 7, 101] ✓
```

**Key formula:**
```java
dp[i] = Math.max(dp[i], dp[j] + 1);  // for all j < i where nums[j] < nums[i]
```

⏱ O(N²) time, O(N) space

---

# 9 — Backtracking

> **ONE SENTENCE**: "Try every door. Dead end? Back up and try the next door. Save all successful paths."

## 🎯 The Pattern Story

Imagine exploring a MAZE. At each junction:
1. **CHOOSE** a door to walk through
2. **EXPLORE** what's behind it (recurse deeper)
3. **UNCHOOSE** — walk BACK to the junction and try the NEXT door

**The universal template:** CHOOSE → EXPLORE → UNCHOOSE (backtrack)

---

### 📗 Easy: Subsets — "Packing a Bag" (LC #78)

| | |
|---|---|
| **Problem** | Return all possible subsets of a set of distinct integers |
| **Story** | Packing for a trip. For each item, TWO choices: pack it (INCLUDE) or leave it (SKIP). Every combination = different subset. |

**Full dry run:**
```
nums = [1, 2, 3]

backtrack(start=0, bag=[])
  SAVE [] ✓
  i=0: add 1 → bag=[1]
    backtrack(start=1, bag=[1])
      SAVE [1] ✓
      i=1: add 2 → bag=[1,2]
        backtrack(start=2, bag=[1,2])
          SAVE [1,2] ✓
          i=2: add 3 → bag=[1,2,3]
            backtrack(start=3) → SAVE [1,2,3] ✓
          remove 3 ← BACKTRACK
        remove 2 ← BACKTRACK
      i=2: add 3 → bag=[1,3]
        backtrack(start=3) → SAVE [1,3] ✓
      remove 3 ← BACKTRACK
    remove 1 ← BACKTRACK
  i=1: add 2 → bag=[2]
    ... SAVE [2], [2,3]
  i=2: add 3 → bag=[3]
    ... SAVE [3]

Result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

**Key steps:** SAVE current bag → LOOP from `start` → CHOOSE (add) → EXPLORE (recurse i+1) → UNCHOOSE (remove last)

**Key insight:** `start = i + 1` prevents revisiting earlier items (avoids duplicates like [2,1]).

⏱ O(2^N × N) time

---

### 📙 Medium: Permutations — "Arranging Books" (LC #46)

| | |
|---|---|
| **Problem** | Return all permutations of distinct integers |
| **Story** | Arranging books on a shelf. At each position, try placing each UNUSED book. |

**Key difference from Subsets:**
```
Subsets:      include/skip, ORDER doesn't matter → use `start` index
Permutations: every element used, ORDER matters → use `boolean[] used`
```

**Full dry run (nums=[1,2,3]):**
```
shelf=[], used=[F,F,F]
  Try 1: shelf=[1], used=[T,F,F]
    Try 2: shelf=[1,2], used=[T,T,F]
      Try 3: shelf=[1,2,3] → FULL → SAVE ✓
      Remove 3, unmark
    Try 3: shelf=[1,3], used=[T,F,T]
      Try 2: shelf=[1,3,2] → FULL → SAVE ✓
    Remove 3, unmark
  Remove 1, unmark
  Try 2: shelf=[2], ...
    → [2,1,3], [2,3,1]
  Try 3: ...
    → [3,1,2], [3,2,1]
```

**Key steps:** If shelf full → SAVE → LOOP ALL elements → skip if used → CHOOSE (add + mark) → EXPLORE → UNCHOOSE (remove + unmark)

⏱ O(N! × N) time

---

### 📕 Hard: N-Queens — "Seating Royals" (LC #51)

| | |
|---|---|
| **Problem** | Place N queens on N×N board so no two attack each other |
| **Story** | Seating N QUEENS at a royal banquet table. Rules: no two queens in the same ROW, COLUMN, or DIAGONAL. |

**How to think:**
```
One queen per ROW (we recurse row by row, so rows are automatic).
For each row, try each COLUMN → isSafe()? → place → next row → backtrack.

isSafe(row, col) checks 3 things ABOVE current row:
  1. Same column? → scan straight UP
  2. Upper-left diagonal? → scan ↖
  3. Upper-right diagonal? → scan ↗

N=4 solution:
. Q . .    . . Q .
. . . Q    Q . . .
 Q . . .   . . . Q
. . Q .    . Q . .
```

**Key steps:** All rows done → SAVE → LOOP columns → isSafe? → PLACE 'Q' → RECURSE next row → REMOVE 'Q'

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
