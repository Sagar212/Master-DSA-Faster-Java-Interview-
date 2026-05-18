# Common Mistakes: Heap
1. **Min vs Max heap confusion** → Java `PriorityQueue` is MIN-heap by default.
2. **For Kth LARGEST, use MIN-heap of size K** (not max-heap!). peek() gives the Kth largest.
3. **Forgetting null checks** when polling from empty heap.
