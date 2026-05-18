# AGENTS – DSA-Java-Mastery

Think of this as the guide for any coding agent working in this repo.

## 1. Project Overview

- Purpose: High-ROI DSA practice in Java using **patterns**.
- Usage:
  - For humans: revision + interview prep + pattern recall.
  - For agents: generate new pattern-based solutions that fit this structure.

## 2. Pattern & ROI Rules

- Always think in terms of patterns first, not standalone problems.
- Use `Pattern_ROI_Index.md` and `Pattern_Roadmap.md` to decide:
  - Which pattern to practice.
  - Which folder to place new problems into.
- High ROI patterns (in order):
  1. Arrays + HashMap
  2. Two Pointers
  3. Sliding Window
  4. Binary Search
  5. Stack/Queue
  6. Trees/Graphs
  7. Heap
  8. Core DP
  9. Backtracking
  10. Others (Trie, Union-Find, Segment Tree)

## 3. Repository Conventions

- Pattern folders:
  - Each pattern folder (e.g., `03_SlidingWindow/`) MUST contain:
    - `README.md`
    - `Pattern_Template.java`
    - `Pattern_Recognition.md`
    - `Common_Mistakes.md`
    - `Recall_Notes.md`
    - `Complexity_Breakdown.md`
    - `Variant_Comparison.md`
    - Subfolders: `Easy/`, `Medium/`, `Hard/`
- Never place problem files directly in the pattern root.
- Name problem files like:
  - `<Pattern>_<ShortProblemName>.java`
  - Example: `SlidingWindow_LongestSubstringWithoutRepeatingCharacters.java`

## 4. Java & Code Style

- Java 8 only (no records, var, streams, or advanced APIs).
- Use standard template:

```java
public class ProblemName {

    /*
     * PROBLEM:
     *
     * PATTERN:
     *
     * RECOGNITION SIGNALS:
     *
     * CORE IDEA:
     *
     * TIME COMPLEXITY:
     *
     * SPACE COMPLEXITY:
     *
     * COMMON MISTAKES:
     *
     */

    public static void main(String[] args) {

        // sample test cases

    }

    public static int solve(int[] nums) {

        // explain intent before logic

        return 0;
    }
}
```

- Preferred variable names for patterns:
  - Pointers: `left`, `right`, `slow`, `fast`, `windowStart`
  - Accumulators: `sum`, `current`, `best`, `result`
  - Maps: `freqMap`, `countMap`

- Commenting rule:
  - Every critical line must explain:
    - intent,
    - invariant,
    - reasoning,
    - optimization purpose.

## 5. Tasks Agents Should Perform

When asked to add a new problem solution:

1. Identify the right pattern.
2. Place the file in `<PatternFolder>/<Difficulty>/`.
3. Use the standard Java template.
4. Fill all documentation sections at the top in comments:
   - Problem link
   - Problem summary
   - Pattern used
   - Recognition signals
   - Brute force explanation
   - Optimization insight
   - Final algorithm
   - Dry run (short)
   - Complexity analysis
   - Edge cases
   - Reusable lessons
5. Ensure `main()` has sample inputs + expected outputs as comments.

When asked to improve documentation:

- Update `Pattern_Recognition.md`, `Recall_Notes.md`, `Variant_Comparison.md` instead of scattering notes elsewhere.

## 6. DSA Knowledge Graph Expectations

Agents should preserve and extend these relationships:

- Sliding Window builds on Two Pointers (contiguous + window invariant).
- DP builds on Recursion (overlapping subproblems + optimal substructure).
- Heap often replaces sorting for “Top K” or streaming.
- Binary Search on answer space is distinct from binary search on array indices.

When adding explanations, explicitly mention:
- Which simpler pattern this builds on.
- How to transform brute force into the chosen pattern.

## 7. Testing & Execution

- Every Java file must compile standalone.
- `main` method should be runnable without external input libraries.
- No external frameworks or dependencies.

## 8. DON’Ts for Agents

- Do NOT:
  - Change the core Java template structure.
  - Randomly place files outside the pattern/difficulty folders.
  - Introduce advanced Java features not suitable for interviews.
  - Solve problems without mentioning the pattern and why it fits.