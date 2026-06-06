import json
import os

base_path = 'journal_data'

# Update Day 14 (Dry Run)
d14_path = os.path.join(base_path, 'day_14.json')
if os.path.exists(d14_path):
    d14 = json.load(open(d14_path, 'r', encoding='utf-8'))
    
    if 'mergeKLists' not in d14['problems']:
        d14['problems']['mergeKLists'] = {
            "title": "Merge K Sorted Lists",
            "patternSubtype": "Min-Heap K-way Merge",
            "description": "Merge k sorted linked lists and return it as one sorted list.",
            "story": "Merging multiple sorted queues. Compare the front of all queues simultaneously using a Min-Heap.",
            "array": ["L1: 1->4->5", "L2: 1->3->4", "L3: 2->6"],
            "code": [
                "public ListNode solve(ListNode[] lists) {",
                "    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);",
                "    for (ListNode head : lists) {",
                "        if (head != null) pq.offer(head);",
                "    }",
                "    ListNode dummy = new ListNode(0);",
                "    ListNode curr = dummy;",
                "    while (!pq.isEmpty()) {",
                "        ListNode node = pq.poll();",
                "        curr.next = node;",
                "        curr = curr.next;",
                "        if (node.next != null) pq.offer(node.next);",
                "    }",
                "    return dummy.next;",
                "}"
            ],
            "steps": [
                { "left": 0, "right": -1, "line": 1, "desc": "Initialize Min-Heap." },
                { "left": 0, "right": -1, "line": 3, "desc": "Push head of L1 (1), L2 (1), L3 (2) into Heap." },
                { "left": 1, "right": -1, "line": 8, "desc": "Pop minimum (1). Append to result. Push next node (4)." }
            ],
            "quiz": [
                {
                    "q": "What is the time complexity of pushing the initial heads into the heap?",
                    "options": ["O(1)", "O(K log K)", "O(N log K)"],
                    "correct": 1,
                    "explain": "We push exactly K nodes (one for each list). Each push takes O(log K), so O(K log K) total for initialization."
                }
            ]
        }
    
    if 'findMedian' not in d14['problems']:
        d14['problems']['findMedian'] = {
            "title": "Find Median from Data Stream",
            "patternSubtype": "Two Heaps",
            "description": "Design a data structure that supports adding numbers and finding the median.",
            "story": "Two buckets balancing a scale. Small bucket (Max-Heap) holds bottom half, large bucket (Min-Heap) holds top half.",
            "array": [1, 2, 3],
            "code": [
                "class MedianFinder {",
                "    PriorityQueue<Integer> small = new PriorityQueue<>((a, b) -> b - a); // Max-Heap",
                "    PriorityQueue<Integer> large = new PriorityQueue<>(); // Min-Heap",
                "    ",
                "    public void addNum(int num) {",
                "        small.offer(num);",
                "        large.offer(small.poll());",
                "        if (small.size() < large.size()) {",
                "            small.offer(large.poll());",
                "        }",
                "    }",
                "    ",
                "    public double findMedian() {",
                "        if (small.size() > large.size()) return small.peek();",
                "        return (small.peek() + large.peek()) / 2.0;",
                "    }",
                "}"
            ],
            "steps": [
                { "left": 0, "right": -1, "line": 1, "desc": "Init small (Max-Heap) and large (Min-Heap)." },
                { "left": 1, "right": -1, "line": 5, "desc": "Add 1: small=[1], push to large=[1], small is smaller so small=[1]." },
                { "left": 2, "right": -1, "line": 5, "desc": "Add 2: small=[2,1], large=[2], small size < large size so small=[1], large=[2]." }
            ],
            "quiz": [
                {
                    "q": "Why do we use two heaps instead of a sorted array?",
                    "options": ["To achieve O(log N) insertion time instead of O(N).", "Because heaps use less memory.", "Because arrays cannot hold floating point medians."],
                    "correct": 0,
                    "explain": "Inserting into a sorted array takes O(N) because you have to shift elements. Two heaps allow inserting in O(log N) while keeping the middle elements accessible in O(1)."
                }
            ]
        }
        
    with open(d14_path, 'w', encoding='utf-8') as f:
        json.dump(d14, f, indent=2)

# Update Day 15 (Active Recall)
d15_path = os.path.join(base_path, 'day_15.json')
if os.path.exists(d15_path):
    d15 = json.load(open(d15_path, 'r', encoding='utf-8'))
    
    if 'mergeKLists' not in d15['problems']:
        d15['problems']['mergeKLists'] = {
            "title": "Merge K Sorted Lists",
            "template": [
                "public ListNode solve(ListNode[] lists) {",
                "    PriorityQueue<ListNode> pq = new [[PriorityQueue<>]]((a, b) -> a.val - b.val);",
                "    for (ListNode head : lists) {",
                "        if (head != null) pq.[[offer]](head);",
                "    }",
                "    ListNode dummy = new ListNode(0);",
                "    ListNode curr = dummy;",
                "    while (!pq.[[isEmpty]]()) {",
                "        ListNode node = pq.[[poll]]();",
                "        curr.next = node;",
                "        curr = curr.next;",
                "        if (node.next != null) pq.offer(node.[[next]]);",
                "    }",
                "    return dummy.next;",
                "}"
            ]
        }
        
    if 'findMedian' not in d15['problems']:
        d15['problems']['findMedian'] = {
            "title": "Find Median from Data Stream",
            "template": [
                "class MedianFinder {",
                "    PriorityQueue<Integer> small = new PriorityQueue<>((a, b) -> [[b - a]]); // Max-Heap",
                "    PriorityQueue<Integer> large = new PriorityQueue<>(); // Min-Heap",
                "    ",
                "    public void addNum(int num) {",
                "        small.[[offer]](num);",
                "        large.offer(small.[[poll]]());",
                "        if (small.size() < large.size()) {",
                "            small.offer(large.[[poll]]());",
                "        }",
                "    }",
                "    ",
                "    public double findMedian() {",
                "        if (small.size() > large.size()) return small.[[peek]]();",
                "        return (small.peek() + large.peek()) / [[2.0]];",
                "    }",
                "}"
            ]
        }
        
    with open(d15_path, 'w', encoding='utf-8') as f:
        json.dump(d15, f, indent=2)

print("Phase 5 (Heap Content) update complete.")
