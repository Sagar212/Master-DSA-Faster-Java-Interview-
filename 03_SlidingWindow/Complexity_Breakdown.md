# Complexity Breakdown: Sliding Window

## Time Complexity: `O(N)`
Even though a Variable Sliding Window has a `while` loop *inside* a `for` loop, the time complexity remains `O(N)`. Why?
Because both the `left` pointer and `right` pointer only move in one direction (forwards), and they visit each element in the array at most once. 
`N` steps for the `right` pointer + `N` steps for the `left` pointer = `2N` operations = `O(N)` time complexity.

## Space Complexity: `O(1)` or `O(K)`
- **`O(1)`**: If you are only tracking a running sum, max, or a few variables.
- **`O(K)`**: If you need to track the frequency of characters inside the window, you might use a HashMap or an array of size 26 (for lowercase English letters). In this case, `K` is the size of the character set.
