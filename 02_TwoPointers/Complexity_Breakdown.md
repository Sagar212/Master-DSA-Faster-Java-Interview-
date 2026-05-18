# Complexity Breakdown: Two Pointers

## Time Complexity: `O(N)`
In the vast majority of Two Pointers problems, the pointers iterate through the array/string at most once. Whether it's opposite ends moving inwards or slow/fast pointers moving in the same direction, every element is visited a constant number of times (usually once or twice). Therefore, the time complexity is `O(N)`, where `N` is the number of elements.

*Note: If the array must be sorted first to use Two Pointers, the overall time complexity becomes `O(N log N)` due to the sorting step.*

## Space Complexity: `O(1)`
The primary advantage of the Two Pointers pattern is that it operates in place. We only need a few variables to store the pointer indices (`left`, `right`, `slow`, `fast`), resulting in constant `O(1)` space complexity. This makes it heavily preferred over HashMaps when space optimization is required.
