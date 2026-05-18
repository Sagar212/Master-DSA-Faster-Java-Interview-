# Two Pointers Pattern

The Two Pointers pattern is a core technique where two pointers iterate through a data structure (usually an array or a string) in tandem until one or both hit a certain condition.

## Why it's High ROI
This pattern frequently allows us to drop the time complexity of a naive `O(N^2)` solution (like nested loops checking every pair) down to a linear `O(N)` scan. 

## Primary Variants
1. **Opposite Ends**: Pointers start at index `0` and index `n-1` and move inwards. Often used when the array is sorted and you're searching for a pair, or when you are checking for a palindrome.
2. **Same Direction**: Both pointers start at index `0`. One pointer (usually `fast`) moves ahead, and the other (usually `slow`) follows behind. Used for removing duplicates or detecting cycles.
