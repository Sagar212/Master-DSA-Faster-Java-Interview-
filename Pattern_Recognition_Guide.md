# Pattern Recognition Guide

Recognizing the correct pattern is 80% of solving a DSA problem. Use these signals to identify the right approach.

## 1. Arrays + HashMap
- **Signals**: Need to look up elements in `O(1)` time; frequency counting; finding pairs that sum to a target; tracking elements previously seen.
- **Keywords**: "Frequency", "duplicates", "pairs", "O(N) time constraint".

## 2. Two Pointers
- **Signals**: Sorted arrays/strings; comparing elements from opposite ends; finding pairs in a sorted array; removing duplicates in place.
- **Keywords**: "Sorted array", "in-place", "pairs", "palindrome".

## 3. Sliding Window
- **Signals**: Contiguous subarray or substring problems; finding min/max/longest/shortest sequence satisfying a condition.
- **Keywords**: "Contiguous", "subarray", "substring", "longest/shortest", "window".

## 4. Binary Search
- **Signals**: Sorted array or search space; finding exact target or boundary; "minimize the maximum" or "maximize the minimum" problems.
- **Keywords**: "Sorted", "O(log N)", "search space", "first/last occurrence", "rotated".

## 5. Stack / Queue
- **Signals**: LIFO/FIFO requirements; matching brackets; processing elements in reverse; finding the "Next Greater" element (Monotonic Stack); undo operations.
- **Keywords**: "Next greater", "balanced parentheses", "parsing", "undo", "nearest".

## 6. Trees / Graphs
- **Signals**: Hierarchical data; connected nodes; "levels"; parent-child relationships; shortest path; connected components.
- **Keywords**: "Tree", "graph", "root", "leaf", "path", "connected", "levels", "BFS", "DFS".

## 7. Heap / Priority Queue
- **Signals**: Need the smallest/largest element repeatedly; "Top K" problems; merging sorted data; running median.
- **Keywords**: "Kth largest", "top K", "merge K sorted", "median", "priority".

## 8. Core DP
- **Signals**: Overlapping subproblems; optimal cost/value; counting ways; "can you reach?" problems; decisions at each step affect future.
- **Keywords**: "Minimum cost", "maximum profit", "number of ways", "can you", "longest/shortest path".

## 9. Backtracking
- **Signals**: Generate ALL possible solutions; combinations; permutations; constraint satisfaction; "N-Queens" style placement.
- **Keywords**: "All combinations", "all permutations", "generate all", "valid configurations".
