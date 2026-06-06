import json
import os

def read_json(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_json(filename, data):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

base_path = 'journal_data'

follow_ups_map = {
    'day_1.json': [
        {"q": "What if the array is not sorted? Can you still use two pointers if you sort first?", "a": "Yes, but sorting takes O(N log N). If the optimal solution is O(N) (like using a HashMap for Two Sum), sorting makes it slower. It's a trade-off between O(1) space (sorting) and O(N) space (HashMap)."},
        {"q": "How would you solve this for triplets (3Sum) instead of pairs?", "a": "Sort the array first. Iterate with a fixed pointer `i`, and then use Two Pointers (`left` and `right`) for the remaining array to find pairs that sum to `-nums[i]`."},
        {"q": "Can you solve this without extra space (O(1) space)?", "a": "Yes, Two Pointers inherently uses O(1) space, making it highly memory efficient compared to Hash-based solutions."},
        {"q": "What if pointers move same direction at different speeds?", "a": "That's the Fast/Slow Pointer pattern (Floyd's Cycle Finding), used for detecting cycles in Linked Lists or finding the middle element."},
        {"q": "What if the array contains duplicates?", "a": "You must skip over duplicates by checking `while(left < right && nums[left] == nums[left+1]) left++;` to avoid duplicate results."}
    ],
    'day_4.json': [
        {"q": "If the window size isn't fixed, how do you decide when to shrink the left side?", "a": "You use a `while` loop to shrink `left` as long as the current window violates the problem constraint (e.g., duplicate characters found, sum exceeded)."},
        {"q": "What if you need to track frequency of elements within the window?", "a": "Use a HashMap (or an integer array of size 26 for letters) to maintain counts of elements currently in the window."},
        {"q": "How would you handle 'at most K unique elements' or 'at most K replacements'?", "a": "Keep a frequency map. When `map.size() > K`, shrink the window from the left until `map.size() <= K`. For replacements, track `max_freq` and ensure `window_size - max_freq <= K`."},
        {"q": "Can you optimize space if input is limited to lowercase letters?", "a": "Yes, use a fixed `int[26]` array instead of a generic HashMap to achieve true O(1) auxiliary space and faster memory access."},
        {"q": "Can you do this in a single pass?", "a": "Yes, standard Sliding Window guarantees O(N) time because both `right` and `left` pointers only move forward, visiting each element at most twice."}
    ],
    'day_7.json': [
        {"q": "What if the array is rotated? Can you still achieve O(log n)?", "a": "Yes, by checking which half of the array is properly sorted (`nums[mid] >= nums[left]`) and then determining if the target falls within that sorted half."},
        {"q": "How would you find the first/last occurrence instead of any occurrence?", "a": "When you find `nums[mid] == target`, don't return immediately. To find the first occurrence, move `right = mid - 1`. For the last occurrence, move `left = mid + 1`."},
        {"q": "Can you binary search on the answer?", "a": "Yes! For optimization problems (e.g., 'minimum capacity to ship in D days'), if the answer space is monotonic (feasible for all values >= X, infeasible < X), you can Binary Search the range of possible answers."},
        {"q": "How would you adapt this for a 2D sorted matrix?", "a": "Treat the 2D matrix as a 1D array. A 1D index `i` maps to `matrix[i / cols][i % cols]`."},
        {"q": "What if the array has duplicates?", "a": "In standard BS it's fine, but in Rotated Sorted Arrays with duplicates, if `nums[left] == nums[mid] == nums[right]`, you cannot determine the sorted half. You must `left++` and `right--`, reducing worst-case to O(N)."}
    ],
    'day_10.json': [
        {"q": "What if the data is too large to fit in memory (streaming data)?", "a": "For exact lookups, you might need distributed caching (Redis) or database indexes. For probabilistic existence checks, use a Bloom Filter."},
        {"q": "How does Java's HashMap handle collisions?", "a": "It uses chaining (LinkedLists). If a bucket gets more than 8 items, Java automatically converts the LinkedList to a Red-Black Tree to degrade gracefully from O(1) to O(log N) instead of O(N)."},
        {"q": "If data is constantly changing, how to keep the map updated efficiently?", "a": "Use a `ConcurrentHashMap` in multithreaded environments to prevent locking the entire map during updates."},
        {"q": "Can you solve this with O(1) space instead of using a HashMap?", "a": "Usually requires sorting the input first (which takes O(N log N) time), then using Two Pointers. You trade O(N) space for O(N log N) time."},
        {"q": "What happens when the load factor is exceeded?", "a": "The HashMap undergoes 'rehashing'. It creates a new array double the size and redistributes all existing entries. This is an O(N) operation but amortizes to O(1) over time."}
    ],
    'day_13.json': [
        {"q": "What if you need top K from trillions of numbers in a stream?", "a": "Maintain a Min-Heap of exactly size K. For each new number, if it's larger than the heap's minimum (root), pop the root and push the new number. Space is strictly O(K)."},
        {"q": "How would you implement decrease-key or remove-arbitrary-element efficiently?", "a": "Standard PriorityQueue takes O(N) to find and remove an arbitrary element. You can maintain a separate HashMap mapping elements to their heap indices to achieve O(log N) removal, or use Java's TreeSet."},
        {"q": "How to merge M sorted lists optimally using a heap?", "a": "Insert the head of each list into a Min-Heap. Pop the smallest, append to result, and insert the next element from the popped node's list. Time: O(N log M)."},
        {"q": "Min-Heap vs Max-Heap — when to use which?", "a": "Use a Min-Heap to find the Top K LARGEST elements (it evicts the smallest). Use a Max-Heap to find the Top K SMALLEST elements."},
        {"q": "What's the time complexity of building a heap from N elements?", "a": "Inserting N elements one by one takes O(N log N). But using heapify (bottom-up), it takes exactly O(N) time."}
    ],
    'day_16.json': [
        {"q": "How can we prune the search space to make it faster?", "a": "Sort the input first to easily skip duplicates, or maintain 'visited' arrays/sets. If a partial solution already violates constraints, `return` immediately (backtrack) rather than exploring its children."},
        {"q": "Can you reduce space by using bitmasks instead of storing full state?", "a": "Yes, if the set of items is small (<= 32 or 64), a single integer can represent a subset where the i-th bit indicates inclusion. This allows O(1) state copying and minimal memory."},
        {"q": "Can this backtracking problem be converted to Dynamic Programming?", "a": "If the problem asks for the *number of ways* or *optimal value* rather than listing all combinations, AND there are overlapping subproblems, it can be optimized with DP/Memoization."},
        {"q": "What's the time complexity of your backtracking solution?", "a": "Typically O(2^N) for subsets/combinations, or O(N!) for permutations. It represents generating the entire state space."},
        {"q": "How would you handle duplicates in the input?", "a": "Sort the input array first. During the loop, if `i > start_index` and `nums[i] == nums[i-1]`, use `continue` to skip the duplicate branch."}
    ],
    'day_19.json': [
        {"q": "Can you do this iteratively instead of recursively?", "a": "Yes, use an explicit `Stack` for DFS or a `Queue` for BFS. Iterative approaches prevent StackOverflowErrors on very deep trees."},
        {"q": "What if it's an N-ary tree instead of binary?", "a": "Instead of `node.left` and `node.right`, iterate through `node.children` in a `for` loop during traversal."},
        {"q": "How would you find LCA if parent pointers are available?", "a": "Treat it like finding the intersection of two Linked Lists. Traverse from both nodes up to the root to get their depths, equalize depths, then move up together until they meet."},
        {"q": "DFS vs BFS — when to use which for tree problems?", "a": "Use BFS (Level Order) when searching for the shortest path or level-specific data. Use DFS for deep path logic, full traversals, or when memory is a concern (O(H) vs O(W))."},
        {"q": "What if the tree is too large to fit on one machine?", "a": "You must distribute the graph/tree across machines and use distributed algorithms (like Pregel/MapReduce), or store it in a Graph Database and query it iteratively."}
    ],
    'day_22.json': [
        {"q": "What if the array is circular?", "a": "If you need the Next Greater Element in a circular array, iterate up to `2*N` using modulo `i % N` to simulate wrapping around."},
        {"q": "How does your solution handle duplicate values?", "a": "Monotonic Stacks handle duplicates fine. You just decide whether to strictly increase (`>`) or monotonic non-decreasing (`>=`) when popping from the stack."},
        {"q": "Can you optimize space further?", "a": "Sometimes you can reuse the input array as the stack itself using a pointer, achieving O(1) auxiliary space, but this destroys the original input."},
        {"q": "Can you solve Trapping Rain Water with a monotonic stack?", "a": "Yes, use a decreasing monotonic stack. When you find a taller bar, you pop from the stack to form 'valleys' and calculate trapped water bounded by the current bar and the new top of the stack."},
        {"q": "What's the difference between increasing vs decreasing monotonic stack?", "a": "Decreasing stack (larger at bottom) finds the Next Greater Element. Increasing stack (smaller at bottom) finds the Next Smaller Element."}
    ],
    'day_25.json': [
        {"q": "Can you reverse just nodes from position m to n?", "a": "Yes, traverse to position `m-1`, save that connection point, then use standard reversal for `n-m` steps, and finally reconnect the severed ends."},
        {"q": "Reverse in groups of K?", "a": "Count nodes to ensure there are at least K left. Reverse the K group, then recursively call the function on the `next` pointer of the original group's head."},
        {"q": "Detect the cycle AND return the node where the cycle begins?", "a": "Use Fast/Slow pointers. Once they meet, reset one pointer to the `head`. Move both one step at a time; where they meet again is the cycle start (Floyd's algorithm)."},
        {"q": "Can you remove the cycle once detected?", "a": "Yes, once you find the start node of the cycle, traverse the cycle one more time to find the node whose `next` points to the start, and set `next = null`."},
        {"q": "How would you handle concurrency in LRU Cache?", "a": "Use a `ConcurrentHashMap` for node lookup, and `ReentrantLock` or `synchronized` blocks around Doubly-LinkedList modifications to prevent race conditions during evictions."}
    ]
}

for filename, follow_ups in follow_ups_map.items():
    filepath = os.path.join(base_path, filename)
    if os.path.exists(filepath):
        data = read_json(filepath)
        data['followUps'] = follow_ups
        write_json(filepath, data)
        print(f"Added followUps to {filename}")

print("Phase 3 Follow-Ups Complete.")
