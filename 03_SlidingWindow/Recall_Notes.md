# Recall Notes: Sliding Window

Use these prompts for spaced repetition (Anki/Flashcards).

- **Q: How do you calculate the element leaving a Fixed Window of size `k` at current index `i`?**
  - **A**: `i - k`.
- **Q: Why is a Variable Sliding Window `O(N)` time complexity despite having a nested `while` loop?**
  - **A**: Because the `left` pointer only moves forwards. Each element is added by `right` at most once, and removed by `left` at most once. `2N` operations = `O(N)`.
- **Q: In a problem looking for the LONGEST valid substring, where do you update your `max` variable?**
  - **A**: *After* the inner `while` loop. The `while` loop restores the window to a valid state, so it's only safe to record the length once the loop terminates.
- **Q: In a problem looking for the SHORTEST valid substring, where do you update your `min` variable?**
  - **A**: *Inside* the inner `while` loop. The `while` loop triggers because the window is currently valid (and we want to shrink it), so we must record the length before shrinking.
