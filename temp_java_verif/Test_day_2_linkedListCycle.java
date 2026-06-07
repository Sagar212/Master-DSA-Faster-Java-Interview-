
import java.util.*;


import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


public class Test_day_2_linkedListCycle {
    public static boolean hasCycle(ListNode head) {
    // STEP 1 — INIT: Both pointers start at the head node
    if (head == null) return false;
    ListNode slow = head, fast = head;
    
    // STEP 2 — LOOP: Walk through the list as long as the fast pointer can move 2 steps
    while (fast != null && fast.next != null) {
        // STEP 3 — MOVE: Slow moves 1 step, Fast moves 2 steps
        slow = slow.next;
        fast = fast.next.next;
        
        // STEP 4 — CHECK: If they meet at the same node, a cycle is detected!
        if (slow == fast) {
            return true; // Cycle detected!
        }
    }
    
    // STEP 5 — RETURN: Fast pointer reached the end of the list → no cycle
    return false;
}
}
