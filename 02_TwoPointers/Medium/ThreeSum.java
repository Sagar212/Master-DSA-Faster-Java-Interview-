import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ThreeSum {

    /*
     * PROBLEM: 3Sum (LeetCode #15)
     * Find all unique triplets [a, b, c] where a + b + c = 0.
     *
     * PATTERN: Two Pointers (Opposite Ends) + Sorting
     *
     * RECOGNITION SIGNALS:
     * - Finding a triplet that sums to a target
     * - Array has duplicates, output must be unique triplets
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You SORT all the kids by height. Then you do this:
     * 
     * 1. ANCHOR: Pick one kid (index i). This kid stands still.
     *    Their "debt" is -nums[i]. The other two kids must cover that debt.
     * 
     * 2. TWO SUM II: Now it's the EXACT same problem as TwoSumII!
     *    Use left/right pointers on the remaining kids to find a pair
     *    that sums to -nums[i].
     * 
     * 3. SKIP DUPLICATES: Since we sorted, duplicates are neighbors.
     *    After finding a triplet, skip all identical values for i, left, and right.
     *    This prevents duplicate triplets in the output.
     *
     * KEY INSIGHT: 3Sum = for each anchor, solve TwoSumII on the rest.
     * ==========================================
     *
     * CORE IDEA: Sort → Fix one element → TwoSumII on the rest → Skip duplicates.
     *
     * TIME:  O(N^2) — outer loop O(N) × inner two-pointer O(N)
     * SPACE: O(1) — ignoring sort and output storage
     *
     * COMMON MISTAKES:
     * - Forgetting to sort first → two pointers won't work
     * - Not skipping duplicates → duplicate triplets in output
     */

    public static void main(String[] args) {
        int[] nums1 = {-1, 0, 1, 2, -1, -4};
        System.out.println("Test 1: " + solve(nums1)); // Expected: [[-1, -1, 2], [-1, 0, 1]]
    }

    public static List<List<Integer>> solve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        // STEP 1 — INIT: Sort the array (required for two pointers to work)
        Arrays.sort(nums);

        // STEP 2 — LOOP: Pick each element as the "anchor"
        for (int i = 0; i < nums.length - 2; i++) {

            // STEP 3 — PRUNE: Early exit & skip duplicate anchors
            if (nums[i] > 0) break;                           // impossible to sum to 0 → stop
            if (i > 0 && nums[i] == nums[i - 1]) continue;    // same anchor → skip duplicate

            // STEP 4 — INIT POINTERS: Set up TwoSumII on the remaining subarray
            int left = i + 1;
            int right = nums.length - 1;

            // STEP 5 — INNER LOOP: TwoSumII to find pairs that cover the anchor's debt
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                // STEP 6 — CHECK: Compare sum and decide which pointer to move
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right])); // triplet found!
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;   // skip dup left
                    while (left < right && nums[right] == nums[right + 1]) right--; // skip dup right

                } else if (sum < 0) {
                    left++;   // sum too small → need bigger, move left up
                } else {
                    right--;  // sum too big → need smaller, move right down
                }
            }
        }

        // STEP 7 — RETURN: All unique triplets
        return result;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Sort → Pick anchor → TwoSumII on the rest → Skip duplicates.
    public static List<List<Integer>> solveSkeleton(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();

        // STEP 1 — INIT (sort)
        Arrays.sort(___);

        // STEP 2 — LOOP (anchor)
        for (int i = 0; i < ___; i++) {

            // STEP 3 — PRUNE
            if (___) break;
            if (i > 0 && ___) continue;

            // STEP 4 — INIT POINTERS
            int left = ___, right = ___;

            // STEP 5 — INNER LOOP
            while (___ < ___) {
                int sum = ___ + ___ + ___;

                // STEP 6 — CHECK
                if (sum == 0) {
                    result.add(Arrays.asList(___, ___, ___));
                    ___; ___;
                    while (___ < ___ && nums[left] == nums[left - 1]) ___;
                    while (___ < ___ && nums[right] == nums[right + 1]) ___;
                } else if (sum < 0) {
                    ___;
                } else {
                    ___;
                }
            }
        }

        // STEP 7 — RETURN
        return result;
    }
    */
}
