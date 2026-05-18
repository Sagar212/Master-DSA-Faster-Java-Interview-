# Sliding Window Pattern

The Sliding Window pattern is a specialized two-pointer technique used heavily on arrays and strings. It defines a "window" of elements bounded by a `left` and `right` pointer, and slides this window across the data structure to find a specific condition (like max sum, longest substring, etc.).

## Why it's High ROI
This pattern is the ultimate tool for converting `O(N^2)` nested loop subarray/substring problems into `O(N)` linear time solutions. By avoiding recalculating the overlapping elements between adjacent windows, we save massive amounts of compute time.

## Primary Variants
1. **Fixed Window**: The size of the window `k` is fixed. You build the first window of size `k`, and then iteratively slide it by adding the new right element and removing the old left element.
2. **Variable Window**: The size of the window changes based on a condition. The `right` pointer aggressively expands the window until the condition is violated, at which point the `left` pointer shrinks the window until the condition is satisfied again.
