# Common Mistakes: Two Pointers

When implementing Two Pointers, watch out for these traps:

1. **Infinite Loops**: Failing to advance the pointers in the `while` loop, or setting up the condition such that the pointers get stuck. Always verify `left++` and `right--` (or `slow++`, `fast++`) happen on every necessary branch.
2. **Out of Bounds Errors**: 
   - Not checking `left < right` before accessing elements.
   - Accessing `nums[fast + 1]` without verifying `fast + 1 < nums.length`.
3. **Overlapping Pointers**: Using `while (left <= right)` when the logic requires two distinct elements, which can lead to a pointer interacting with itself (e.g., adding an element to itself). Use `while (left < right)` for distinct pairs.
4. **Incorrect Condition Logic**: When looking for a sum, moving the `left` pointer when the sum is too large instead of moving the `right` pointer (in a sorted array). Remember: `left++` increases sum, `right--` decreases sum.
