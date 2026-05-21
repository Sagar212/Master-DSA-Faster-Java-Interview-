public class TwoPointer_Pattern_Template {

    /*
     * PROBLEM: 
     *
     * PATTERN: Two Pointers
     *
     * ====== MENTAL STORY ======
     * ...
     * ==========================================
     *
     * CORE IDEA:
     * TIME:
     * SPACE:
     */

    public static void main(String[] args) {
        // sample test cases with expected outputs in comments
    }

    public static int solve(int[] nums) {
        // STEP 1 — INIT: Place pointers at opposite ends (or same direction)
        int left = 0;
        int right = nums.length - 1;

        // STEP 2 — LOOP: Narrow inward until they meet
        while (left < right) {

            // STEP 3 — CHECK: Evaluate condition and decide which pointer to move
            // int sum = nums[left] + nums[right];
            // if (sum == target) {
            //     return ...; // match → return
            // } else if (sum < target) {
            //     left++;  // too small → move left up
            // } else {
            //     right--; // too big → move right down
            // }
        }

        // STEP 4 — RETURN
        return 0;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    public static int solveSkeleton(int[] nums) {
        // STEP 1 — INIT: Place pointers at opposite ends (or same direction)
        int left = ___, right = ___;

        // STEP 2 — LOOP: Narrow inward until they meet
        while (___ < ___) {
            // STEP 3 — CHECK: Evaluate condition and decide which pointer to move
        }

        // STEP 4 — RETURN
        return ___;
    }
    */
}
