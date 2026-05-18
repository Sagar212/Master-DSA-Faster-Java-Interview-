# Recall Notes: Binary Search
- **Q: How to calculate mid safely?** → `mid = left + (right - left) / 2`
- **Q: `<=` vs `<`?** → `<=` for exact target. `<` for boundary search.
- **Q: Rotated array — which half sorted?** → If `nums[left] <= nums[mid]`, LEFT is sorted.
- **Q: "Binary search on answer"?** → Search a range [low, high] checking `canAchieve(mid)`.
