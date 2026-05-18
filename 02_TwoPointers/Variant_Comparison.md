# Variant Comparison: Two Pointers

Understanding the different ways pointers can move helps you quickly adapt to the problem.

## 1. Opposite Ends (Inward)
- **How it works:** `left` starts at `0`, `right` starts at `n - 1`. They move towards each other until `left >= right`.
- **Use Cases:** Sorted array pair sums, palindromes, reversing arrays.
- **Key Mechanic:** Moving `left` increases the value (if sorted), moving `right` decreases the value.

## 2. Same Direction (Slow/Fast)
- **How it works:** `slow` and `fast` start at `0`. `fast` moves every iteration. `slow` only moves when a specific condition is met.
- **Use Cases:** Removing duplicates in place, moving zeroes to the end.
- **Key Mechanic:** `slow` tracks the boundary of the "processed/valid" section. `fast` acts as an explorer/scanner finding the next valid element.

## 3. Two Different Arrays
- **How it works:** Pointer `p1` traverses `array1`, pointer `p2` traverses `array2`.
- **Use Cases:** Merging two sorted arrays, finding intersections.
- **Key Mechanic:** Compare `array1[p1]` and `array2[p2]` and advance the pointer that points to the smaller/larger value depending on the goal.
