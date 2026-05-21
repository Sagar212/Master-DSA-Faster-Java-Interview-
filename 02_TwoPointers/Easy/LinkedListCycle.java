public class LinkedListCycle {

    /*
     * PROBLEM: Linked List Cycle (LeetCode #141)
     * Given head, the head of a linked list, determine if the linked list has a cycle in it.
     * There is a cycle in a linked list if there is some node in the list that can be reached
     * again by continuously following the next pointer. Return true if there is a cycle in the
     * linked list. Otherwise, return false.
     *
     * PATTERN: Two Pointers (Fast & Slow / Tortoise & Hare)
     *
     * RECOGNITION SIGNALS:
     * - Circular dependencies / cycles in linear structures
     * - Walking through a linked list or similar state space
     * - Need O(1) space (no extra Set to store visited nodes)
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * Imagine a TORTOISE (slow pointer) and a HARE (fast pointer) running on a track.
     * 
     * If the track is straight, the Hare will reach the end and finish, while the Tortoise lags behind.
     * But if the track has a LOOP (cycle), they will run in circles forever.
     * Since the Hare runs TWICE as fast as the Tortoise (steps of 2 vs steps of 1), the distance between 
     * them shrinks by exactly 1 node per step.
     * Eventually, on a circular loop, the Hare is GUARANTEED to lap the Tortoise and collide with it!
     * 
     * If they meet at the exact same node, there is a cycle. If the Hare reaches the end (null), no cycle!
     * ==========================================
     *
     * CORE IDEA: Slow pointer moves 1 step, fast pointer moves 2 steps. If they collide, there is a cycle.
     *
     * TIME:  O(N) — slow pointer walks at most N nodes once cycle is entered
     * SPACE: O(1) — in-place pointers, no extra memory
     */

    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) {
            val = x;
            next = null;
        }
    }

    public static void main(String[] args) {
        // Create a list: 3 -> 2 -> 0 -> -4
        ListNode head = new ListNode(3);
        ListNode node1 = new ListNode(2);
        ListNode node2 = new ListNode(0);
        ListNode node3 = new ListNode(-4);
        
        head.next = node1;
        node1.next = node2;
        node2.next = node3;
        
        // Create cycle: -4 points back to 2
        node3.next = node1;

        System.out.println("Test 1 (Has Cycle): " + solve(head)); // Expected: true
        
        // Create a straight list: 1 -> 2
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        
        System.out.println("Test 2 (No Cycle): " + solve(head2)); // Expected: false
    }

    public static boolean solve(ListNode head) {
        // STEP 1 — INIT: Both pointers start at the head node
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;

        // STEP 2 — LOOP: Walk through the list as long as the fast pointer can move 2 steps
        while (fast != null && fast.next != null) {
            // STEP 3 — MOVE: Slow moves 1 step, Fast moves 2 steps
            slow = slow.next;
            fast = fast.next.next;

            // STEP 4 — CHECK: If they meet at the same node, a cycle is detected!
            if (slow == fast) {
                return true;
            }
        }

        // STEP 5 — RETURN: Fast pointer reached the end of the list → no cycle
        return false;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Tortoise (1 step) and Hare (2 steps) run on a circular track. Collide if cycle exists.
    public static boolean solveSkeleton(ListNode head) {
        // STEP 1 — INIT: Both pointers start at the head node
        if (head == null) return ___;
        ListNode slow = ___, fast = ___;

        // STEP 2 — LOOP: Walk through the list as long as the fast pointer can move 2 steps
        while (___ != null && ___.next != null) {
            // STEP 3 — MOVE: Slow moves 1 step, Fast moves 2 steps
            slow = ___;
            fast = ___;

            // STEP 4 — CHECK: If they meet at the same node, a cycle is detected!
            if (___ == ___) {
                return ___;
            }
        }

        // STEP 5 — RETURN: Fast pointer reached the end of the list → no cycle
        return ___;
    }
    */
}
