# Common Mistakes: Arrays + HashMap

When implementing HashMap-based solutions, watch out for these traps:

1. **Autoboxing/Unboxing Overhead in Java**: Using `HashMap<Integer, Integer>` inside a tight loop with millions of elements can cause performance hits due to object creation (autoboxing `int` to `Integer`). In extremely performance-sensitive scenarios, consider using a raw array `int[]` if the key range is small and known.
2. **Hash Collisions**: Not usually an issue with standard Java `HashMap`, but remember that worst-case time complexity degrades to `O(N)` if many collisions occur.
3. **Checking Key vs Value**: Using `.containsValue()` instead of `.containsKey()`. `.containsKey()` is `O(1)`, but `.containsValue()` is `O(N)` because it has to search all values.
4. **Order of Operations (Two Sum variant)**: Inserting the current element into the map *before* checking if its complement exists can cause you to use the same element twice (e.g., if target is 6, current is 3, you might pair 3 with itself if inserted first). Always *check* for the complement before inserting the current element.
