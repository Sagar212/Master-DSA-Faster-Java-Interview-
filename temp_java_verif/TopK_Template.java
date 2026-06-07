import java.util.*;
public class TopK_Template {
public int findKthLargest(int[] nums, int k) {
    // STEP 1 - INIT: Min-heap to store Top K
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    // STEP 2 - LOOP: Stream elements
    for (int num : nums) {
        minHeap.offer(num);
        // STEP 3 - EJECT: Keep size exactly K
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    // STEP 4 - RETURN: Top is Kth largest
    return minHeap.peek();
}
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
