# Variant Comparison: Arrays + HashMap

Understanding how HashMaps are utilized differently based on the problem.

## 1. Value to Index Mapping
- **How it works:** Store `Map<Element_Value, Index>`. 
- **Use Cases:** Two Sum. We need to return the *indices* of the two numbers.
- **Key Mechanic:** When the complement is found, we can immediately retrieve its original index from the map.

## 2. Frequency Counting
- **How it works:** Store `Map<Element_Value, Frequency>`. Iterate the array and do `map.put(num, map.getOrDefault(num, 0) + 1)`.
- **Use Cases:** Valid Anagram, Majority Element, Subarrays sum equals K.
- **Key Mechanic:** Useful when we don't care *where* the element is, just *how many times* it appears.

## 3. Pure Existence (HashSet)
- **How it works:** Store elements in a `Set<Element_Value>`.
- **Use Cases:** Contains Duplicate, Longest Consecutive Sequence.
- **Key Mechanic:** Used when we only care if an element exists or has been seen before, without needing frequency or index. Uses slightly less memory overhead than a full HashMap.

## 4. Prefix Sum Map
- **How it works:** Store `Map<Running_Sum, Frequency>`.
- **Use Cases:** Subarray sums.
- **Key Mechanic:** Instead of storing elements, we store the cumulative sum at each index. If `current_sum - target` exists in the map, a valid subarray has been found.
