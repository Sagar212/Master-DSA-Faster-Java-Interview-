# Variant Comparison: Binary Search
## 1. Standard — `while (left <= right)`, return when `nums[mid] == target`
## 2. Left Boundary — `while (left < right)`, `right = mid` when found
## 3. Right Boundary — `while (left < right)`, `left = mid + 1` when found
## 4. Rotated — Check which half sorted → check if target in sorted half
## 5. Search on Answer — `canAchieve(mid)` → binary search [low, high]
