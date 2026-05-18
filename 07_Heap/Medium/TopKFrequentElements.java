import java.util.*;

public class TopKFrequentElements {

    /*
     * PROBLEM: Top K Frequent Elements (LeetCode #347)
     *
     * PATTERN: HashMap + Heap
     *
     * ====== MENTAL STORY ======
     * ELECTION. Count votes (frequency map). Then use a heap to pick the top K winners.
     * Min-heap of size K: always holds the K most frequent candidates.
     * ==========================================
     *
     * TIME: O(N log K), SPACE: O(N)
     */

    public static void main(String[] args) {
        int[] nums1 = {1, 1, 1, 2, 2, 3};
        System.out.println("Test 1: " + Arrays.toString(solve(nums1, 2))); // Expected: [1, 2]
    }

    public static int[] solve(int[] nums, int k) {
        // STEP 1 — INIT: Count votes (frequency map)
        Map<Integer, Integer> votes = new HashMap<>();
        for (int num : nums) {
            votes.put(num, votes.getOrDefault(num, 0) + 1);
        }

        // STEP 2 — INIT: Min-heap sorted by frequency (smallest freq on top)
        PriorityQueue<Integer> topK = new PriorityQueue<>((a, b) -> votes.get(a) - votes.get(b));

        // STEP 3 — LOOP: Process each candidate
        for (int candidate : votes.keySet()) {
            topK.offer(candidate);

            // STEP 4 — PRUNE: Keep only top K
            if (topK.size() > k) {
                topK.poll(); // remove least frequent
            }
        }

        // STEP 5 — RETURN: Collect results
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = topK.poll();
        }
        return result;
    }

    /*
    // --- SKELETON ---
    // STORY: Election. Count votes → heap picks top K winners.
    public static int[] solveSkeleton(int[] nums, int k) {
        // STEP 1 — Count frequencies
        // STEP 2 — Min-heap sorted by frequency
        // STEP 3 — Add candidates, prune to size K
        // STEP 4 — Collect results
        return null;
    }
    */
}
