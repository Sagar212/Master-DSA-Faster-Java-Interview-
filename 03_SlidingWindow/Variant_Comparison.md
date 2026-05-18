# Variant Comparison: Sliding Window

## 1. Fixed Window
- **Goal:** Find something about a subarray of an exact size `k`.
- **Mechanic:** 
  1. Build the initial window from index `0` to `k-1`.
  2. Start a loop from index `k` to the end.
  3. Slide the window: `add` the element at `i`, `remove` the element at `i - k`.
  4. Track the max/min at each step.

## 2. Variable Window
- **Goal:** Find the longest or shortest subarray that meets a dynamic condition.
- **Mechanic:**
  1. Expand the window by moving `right` and adding elements to the state.
  2. If the state *violates* the condition (e.g., sum becomes too large, duplicate character found), enter a `while` loop.
  3. Inside the `while` loop, shrink the window by moving `left` and removing elements from the state until the condition is valid again.
  4. Track the max/min length *after* ensuring the window is valid.
