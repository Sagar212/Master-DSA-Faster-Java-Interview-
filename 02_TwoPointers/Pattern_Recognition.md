# Pattern Recognition: Two Pointers

Look for these signals to know when to use the Two Pointers pattern:

## Explicit Signals
- **"Sorted Array" or "Sorted List"**: A strong indicator. Two pointers on opposite ends can intelligently narrow down the search space.
- **"In-place" requirement**: When asked to manipulate an array (like removing duplicates) with `O(1)` extra space.
- **"Palindrome"**: Checking if a string reads the same forwards and backwards naturally maps to opposite-end pointers.
- **"Linked List Cycles" or "Middle of Linked List"**: A classic use case for the Fast/Slow pointer variant.

## Implicit Signals
- **Searching for a pair**: "Find two numbers that sum to target." If the array is unsorted, sorting it (`O(N log N)`) + Two Pointers (`O(N)`) might be better than nested loops (`O(N^2)`).
- **Comparing adjacent elements**: "Remove duplicates." A slow pointer tracks the position of the last unique element, while a fast pointer scans for the next unique element.
