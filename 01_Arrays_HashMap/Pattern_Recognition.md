# Pattern Recognition: Arrays + HashMap

Look for these signals to know when to use the Arrays + HashMap pattern:

## Explicit Signals
- **"O(N) Time Complexity Requirement"**: When nested loops are too slow and the array is unsorted.
- **"Pairs or Complements"**: Problems asking for two elements that satisfy a condition (like adding to a target) in an *unsorted* array.
- **"Frequencies" or "Counts"**: Finding the most common element, checking if characters can form a palindrome, or anagram validation.
- **"Duplicates"**: Checking if an array contains duplicates or finding the first non-repeating character.

## Implicit Signals
- **Subarrays with specific sum**: "Find the number of continuous subarrays that sum to K". This implies using a HashMap to store Prefix Sums.
- **Need for fast lookups**: If you find your algorithm doing a linear scan `O(N)` inside another linear scan `O(N)` just to find an element, a HashSet/HashMap will reduce the inner scan to `O(1)`.
