import java.util.ArrayList;
import java.util.List;

public class Subsets {

    /*
     * PROBLEM: Subsets (LeetCode #78)
     * Given an integer array, return all possible subsets.
     *
     * PATTERN: Backtracking
     *
     * ====== MENTAL STORY ======
     * PACKING A BAG for a trip. For each item you have TWO choices:
     *   1. INCLUDE it in the bag
     *   2. SKIP it
     * Every combination of include/skip gives you a different subset.
     *
     * At each level of the decision tree:
     *   - ADD item to current bag → explore deeper
     *   - BACKTRACK: REMOVE item from bag → try skipping it
     * ==========================================
     *
     * TIME: O(2^N × N), SPACE: O(N) recursion depth
     */

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println("Test 1: " + solve(nums)); // Expected: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
    }

    public static List<List<Integer>> solve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> bag, List<List<Integer>> result) {
        // STEP 1 — SAVE: Current bag state is a valid subset (even empty bag)
        result.add(new ArrayList<>(bag)); // snapshot the bag

        // STEP 2 — LOOP: Try including each remaining item
        for (int i = start; i < nums.length; i++) {

            // STEP 3 — CHOOSE: Add item to the bag
            bag.add(nums[i]);

            // STEP 4 — EXPLORE: Go deeper (only items AFTER i to avoid duplicates)
            backtrack(nums, i + 1, bag, result);

            // STEP 5 — UNCHOOSE (BACKTRACK): Remove item and try skipping it
            bag.remove(bag.size() - 1);
        }
    }

    /*
    // --- SKELETON ---
    // STORY: Packing a bag. Include → explore → backtrack (remove).
    // STEP 1 — SAVE current state
    // STEP 2 — LOOP from start
    // STEP 3 — CHOOSE (add)
    // STEP 4 — EXPLORE (recurse with i+1)
    // STEP 5 — UNCHOOSE (remove last)
    */
}
