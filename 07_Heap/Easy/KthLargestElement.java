import java.util.PriorityQueue;

public class KthLargestElement {

    /*
     * PROBLEM: Kth Largest Element in a Stream (LeetCode #703)
     *
     * PATTERN: Heap (Min-Heap of size K)
     *
     * ====== MENTAL STORY ======
     * VIP LIST at a club. Only K people allowed inside.
     * New person arrives → if more important than least VIP, swap them in.
     * The LEAST important VIP (top of min-heap) is your "Kth largest".
     * ==========================================
     *
     * TIME: O(N log K), SPACE: O(K)
     */

    public static void main(String[] args) {
        int[] nums = {4, 5, 8, 2};
        int k = 3;
        System.out.println("Kth largest: " + solve(nums, k)); // Expected: 4
    }

    public static int solve(int[] nums, int k) {
        // STEP 1 — INIT: Min-heap (VIP list) of size K
        PriorityQueue<Integer> vipList = new PriorityQueue<>();

        // STEP 2 — LOOP: Process each number
        for (int num : nums) {
            // STEP 3 — ADD: Let them into the VIP area
            vipList.offer(num);

            // STEP 4 — PRUNE: If too many VIPs, kick out the least important
            if (vipList.size() > k) {
                vipList.poll();
            }
        }

        // STEP 5 — RETURN: The least important VIP is the Kth largest
        return vipList.peek();
    }

    /*
    // --- SKELETON ---
    // STORY: VIP list. Min-heap of size K. peek() = Kth largest.
    public static int solveSkeleton(int[] nums, int k) {
        PriorityQueue<Integer> vipList = new PriorityQueue<>();
        for (int num : ___) {
            vipList.offer(___);
            if (vipList.size() > ___) vipList.poll();
        }
        return vipList.peek();
    }
    */
}
