public class TwoSumII {

    /*
     * PROBLEM: Two Sum II - Input Array Is Sorted (LeetCode #167)
     * Given a 1-indexed sorted array, find two numbers that add up to a specific target.
     *
     * PATTERN: Two Pointers (Opposite Ends)
     *
     * RECOGNITION SIGNALS:
     * - Sorted array
     * - Finding a pair that sums to a target
     * - Need O(1) space (in-place)
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You have kids standing in a LINE, sorted by HEIGHT (shortest to tallest).
     * You need to find two kids whose combined height = target.
     *
     * Start with the SHORTEST kid (left) and the TALLEST kid (right).
     * Add their heights:
     *   - TOO SHORT? → Replace the shorter kid with the next taller one (left++)
     *   - TOO TALL?  → Replace the taller kid with the next shorter one (right--)
     *   - PERFECT?   → That's your answer!
     *
     * WHY does this work? Because the array is SORTED:
     *   - Moving left UP always INCREASES the sum
     *   - Moving right DOWN always DECREASES the sum
     * ==========================================
     *
     * CORE IDEA: Two pointers from opposite ends. Move the one that fixes the sum.
     *
     * TIME:  O(N) — each pointer moves at most N times
     * SPACE: O(1) — only two pointer variables
     */

    public static void main(String[] args) {
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] result = solve(nums1, target1);
        System.out.println("Test 1: [" + result[0] + ", " + result[1] + "]"); // Expected: [1, 2]
    }

    public static int[] solve(int[] nums, int target) {
        // STEP 1 — INIT: Place pointers at opposite ends of the sorted array
        int left = 0, right = nums.length - 1;

        // STEP 2 — LOOP: Narrow inward until the pointers meet
        while (left < right) {
            int sum = nums[left] + nums[right];

            // STEP 3 — CHECK: Compare sum against target and decide which pointer to move
            if (sum == target) {
                return new int[]{left + 1, right + 1}; // match → return 1-indexed answer
            } else if (sum < target) {
                left++;   // sum too small → move left up to increase
            } else {
                right--;  // sum too big → move right down to decrease
            }
        }

        // STEP 4 — RETURN: Fallback (problem guarantees a solution)
        return new int[]{-1, -1};
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Shortest + tallest kid. Too short? Next taller. Too tall? Next shorter.
    public static int[] solveSkeleton(int[] nums, int target) {
        // STEP 1 — INIT
        int left = ___, right = ___;

        // STEP 2 — LOOP
        while (___ < ___) {
            int sum = ___ + ___;

            // STEP 3 — CHECK
            if (sum == ___) {
                return new int[]{___, ___};
            } else if (sum < ___) {
                ___;
            } else {
                ___;
            }
        }

        // STEP 4 — RETURN
        return new int[]{-1, -1};
    }
    */
}
