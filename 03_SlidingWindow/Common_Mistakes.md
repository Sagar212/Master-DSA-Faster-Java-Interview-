# Common Mistakes: Sliding Window

When implementing Sliding Window, watch out for these traps:

1. **Updating the Answer in the Wrong Place**: 
   - *Variable Window (Longest)*: Update the `max` length *after* the inner `while` loop finishes shrinking the window, because that guarantees the window is valid.
   - *Variable Window (Shortest)*: Update the `min` length *inside* the `while` loop just before you shrink it, because the window is currently valid and we are trying to make it shorter.
2. **Off-by-One Errors in Fixed Window**: 
   - When sliding the fixed window at index `i`, the element leaving the window is at index `i - k`. Forgetting this and using `i - k + 1` or `i - k - 1` is a classic bug.
3. **Array Out of Bounds**: Not checking if `right` or `left` exceeds the array length, especially when aggressively moving the `left` pointer in a while loop.
4. **Not Initializing the First Window**: For fixed windows, trying to do it all in one loop can get messy. It's much cleaner to explicitly build the first window of size `k` in its own loop before sliding.
