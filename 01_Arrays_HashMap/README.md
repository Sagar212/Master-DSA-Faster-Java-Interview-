# Arrays + HashMap Pattern

The Arrays + HashMap pattern is the most frequently tested concept in DSA interviews. It leverages the O(1) average time complexity of HashMaps (or HashSets) for lookups to drastically optimize algorithms, usually trading `O(N)` space to achieve `O(N)` time complexity.

## Why it's High ROI
Almost every naive `O(N^2)` solution that involves "searching" for a previously seen element or a needed complement can be optimized to `O(N)` using a HashMap. It is the core of the "trade space for time" paradigm.

## Primary Variants
1. **Frequency Counter**: Counting occurrences of elements to find duplicates, majorities, or validate anagrams.
2. **Complement Lookup**: Storing elements you've seen so far, and checking if the "complement" needed for the current element (like in Two Sum) is already in the map.
3. **Index Mapping**: Storing the index of where an element was last seen to calculate distances or subarray sums (like Prefix Sum maps).
