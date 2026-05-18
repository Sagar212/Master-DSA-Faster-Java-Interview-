# 🧠 Mental Story Visualization — Arrays + HashMap

> **ONE SENTENCE TO REMEMBER**: "Trade space for time — use a map as a guest book to avoid searching twice."

---

## 🎯 The Pattern Story: The Guest Book

Imagine you're at a PARTY. Without a guest book, to find someone you'd ask EVERY person → O(N²).
With a GUEST BOOK at the door, you just check the book → O(1) lookup.

**HashMap = Guest Book**
- When someone arrives → they SIGN the book (map.put)
- When you need someone → you CHECK the book (map.containsKey)

---

## 📗 Easy: Count Occurrences — "Voting Booth"

```
People walk in and cast their vote.
The BALLOT BOX (HashMap) tracks how many votes each candidate got.
  KEY   = candidate (element)
  VALUE = vote count (frequency)

nums = [1, 2, 2, 3, 3, 3]

1 votes → {1: 1}
2 votes → {1: 1, 2: 1}
2 votes → {1: 1, 2: 2}  ← getOrDefault(2, 0) + 1 = 2
3 votes → {1: 1, 2: 2, 3: 1}
3 votes → {1: 1, 2: 2, 3: 2}
3 votes → {1: 1, 2: 2, 3: 3}
```

**THE MOST REUSABLE LINE IN DSA:**
```java
freq.put(num, freq.getOrDefault(num, 0) + 1);
```

**Remember**: This is the FOUNDATION for Top K Frequent, Anagrams, Sudoku, Majority Element.

---

## 📗 Easy: Two Sum — "Party Partner"

```
You walk into a party wearing shirt #2. Target = 9.
You NEED a partner wearing #7 (because 9 - 2 = 7).

CHECK the guest book: "Is #7 here?" → NO
SIGN the guest book: "I'm #2, at position 0"

Next person walks in wearing #7.
They NEED #2 (because 9 - 7 = 2).
CHECK the guest book: "Is #2 here?" → YES, at position 0!
MATCH FOUND → return [0, 1]
```

**Visualization:**
```
Guest Book (HashMap):
┌─────────┬───────┐
│ Number  │ Index │
├─────────┼───────┤
│    2    │   0   │  ← signed in
│    7    │   1   │  ← found partner!
└─────────┴───────┘
```

**Remember**: Always CHECK before you SIGN. (Prevents matching with yourself!)

---

## 📙 Medium: Group Anagrams — "Filing Cabinet"

```
You have scrambled words: "eat", "tea", "ate"
SORT each word's letters → they all become "aet"
That sorted form is the FINGERPRINT (drawer label).
File each word into the correct drawer.

Filing Cabinet:
┌──────────────┬──────────────────┐
│ Fingerprint  │ Words            │
├──────────────┼──────────────────┤
│    "aet"     │ [eat, tea, ate]  │
│    "ant"     │ [tan, nat]       │
│    "abt"     │ [bat]            │
└──────────────┴──────────────────┘
```

**Remember**: Sort = Fingerprint. Same fingerprint = same drawer.

---

## 📙 Medium: Valid Sudoku — "Hotel Check-In with 3 Guest Books"

```
A hotel with 3 rules:
  1. No same-name guests on the same FLOOR (row)
  2. No same-name guests in the same WING (column)
  3. No same-name guests in the same SUITE (3×3 box)

For each guest (cell), check 3 GUEST BOOKS (HashSets):
  - rows[row].contains(num)?       → duplicate on this floor!
  - cols[col].contains(num)?       → duplicate in this wing!
  - boxes[boxIndex].contains(num)? → duplicate in this suite!

If ANY book has a duplicate → INVALID
Otherwise → register in all 3 books

BOX INDEX FORMULA (memorize this!):
  boxIndex = (row / 3) * 3 + (col / 3)

  Row 0-2, Col 0-2 → box 0    Row 0-2, Col 3-5 → box 1    Row 0-2, Col 6-8 → box 2
  Row 3-5, Col 0-2 → box 3    Row 3-5, Col 3-5 → box 4    Row 3-5, Col 6-8 → box 5
  Row 6-8, Col 0-2 → box 6    Row 6-8, Col 3-5 → box 7    Row 6-8, Col 6-8 → box 8
```

**Remember**: 3 HashSet arrays (rows, cols, boxes). Check all 3 → then add to all 3. Box = (row/3)*3 + col/3.

---

## 📕 Hard: Subarray Sum Equals K — "Road Milestones"

```
Walking a road, tracking total distance (runningSum).
At each step: "Was there a PAST milestone where the GAP = K?"

Numbers: [1, 1, 1], K = 2

Step 0: runningSum = 0 → Logbook: {0: 1}  ← SEED this!
Step 1: runningSum = 1 → need 1-2 = -1? NO  → Log: {0:1, 1:1}
Step 2: runningSum = 2 → need 2-2 = 0? YES! → count = 1. Log: {0:1, 1:1, 2:1}
Step 3: runningSum = 3 → need 3-2 = 1? YES! → count = 2. Log: {0:1, 1:1, 2:1, 3:1}

Answer: 2 subarrays sum to K.
```

**Visualization:**
```
Road:    [1]  [1]  [1]
Sum:   0   1    2    3
              ╰──K=2──╯  ← subarray [1,1] starting at index 1
         ╰──K=2──╯       ← subarray [1,1] starting at index 0
```

**Remember**: SEED the logbook with (0, 1)! Otherwise you miss subarrays starting at index 0.
