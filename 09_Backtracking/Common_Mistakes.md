# Common Mistakes: Backtracking
1. **Forgetting to BACKTRACK** → After recursing, UNDO your choice (remove from list, unmark used).
2. **Not using start index for subsets** → Pass `start = i + 1` to avoid duplicate subsets.
3. **Permutations: using start instead of used[]** → Permutations try ALL positions, so use a boolean[] used.
