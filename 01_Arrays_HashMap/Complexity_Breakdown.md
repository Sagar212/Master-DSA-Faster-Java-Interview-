# Complexity Breakdown: Arrays + HashMap

## Time Complexity: `O(N)`
By utilizing a HashSet or HashMap, we reduce nested loops `O(N^2)` into a single pass `O(N)`. For every element, we perform a map lookup `containsKey()` which operates in `O(1)` average time.
`N` iterations * `O(1)` work = `O(N)` total time complexity.

*Note: The worst-case time complexity for HashMap operations is technically `O(N)` due to hash collisions, meaning the worst-case overall time could theoretically be `O(N^2)`. However, Java 8 mitigates this by turning bins into balanced trees when they get too large, reducing the worst-case to `O(N log N)`. In interviews, it is standard to quote `O(1)` average time.*

## Space Complexity: `O(N)`
To achieve the `O(N)` time complexity, we must store elements we have seen so far. In the worst-case scenario (e.g., no pairs are found, or all elements are unique), we will insert all `N` elements into the HashMap.
Therefore, the space complexity is `O(N)`.
