# Common Mistakes: Binary Search
1. **Off-by-one with mid**: Use `mid = left + (right - left) / 2` to avoid overflow.
2. **Infinite loops**: Always do `left = mid + 1` or `right = mid - 1`.
3. **Wrong loop condition**: `while (left <= right)` for standard, `while (left < right)` for boundary.
4. **Rotated array**: Check which half is sorted FIRST before deciding.
