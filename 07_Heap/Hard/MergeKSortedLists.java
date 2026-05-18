import java.util.PriorityQueue;

public class MergeKSortedLists {

    /*
     * PROBLEM: Merge K Sorted Lists (LeetCode #23)
     *
     * PATTERN: Heap (Min-Heap of K heads)
     *
     * ====== MENTAL STORY ======
     * K CHECKOUT LINES at a grocery store, each sorted by ticket number.
     * A COORDINATOR (min-heap) always picks the customer with the smallest ticket.
     * After serving that customer, the next person from that line joins the heap.
     * ==========================================
     *
     * TIME: O(N log K) where N = total nodes, K = number of lists
     * SPACE: O(K)
     */

    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        // lists: [1->4->5], [1->3->4], [2->6]
        System.out.println("Test: Merge K sorted lists"); // Expected: 1->1->2->3->4->4->5->6
    }

    public static ListNode solve(ListNode[] lists) {
        // STEP 1 — INIT: Min-heap comparing node values
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);

        // STEP 2 — SEED: Add the head of each list to the heap
        for (ListNode head : lists) {
            if (head != null) heap.offer(head);
        }

        // STEP 3 — INIT: Dummy head for result list
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        // STEP 4 — LOOP: Always pick the smallest node from the heap
        while (!heap.isEmpty()) {
            ListNode smallest = heap.poll(); // smallest ticket number
            current.next = smallest;
            current = current.next;

            // STEP 5 — EXPAND: Next person from that line joins the heap
            if (smallest.next != null) {
                heap.offer(smallest.next);
            }
        }

        // STEP 6 — RETURN
        return dummy.next;
    }

    /*
    // --- SKELETON ---
    // STORY: K checkout lines. Heap picks smallest ticket. Serve → add next from same line.
    public static ListNode solveSkeleton(ListNode[] lists) {
        // STEP 1 — Min-heap
        // STEP 2 — Add heads
        // STEP 3 — Dummy node
        // STEP 4 — Poll smallest, attach to result
        // STEP 5 — If smallest.next exists, offer to heap
        // STEP 6 — Return dummy.next
        return null;
    }
    */
}
