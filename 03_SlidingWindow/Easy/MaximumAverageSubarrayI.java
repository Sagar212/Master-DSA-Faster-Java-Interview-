public class MaximumAverageSubarrayI {

    /*
     * PROBLEM: Maximum Average Subarray I (LeetCode #643)
     * Find a contiguous subarray of length k that has the maximum average value.
     *
     * PATTERN: Sliding Window (Fixed)
     *
     * RECOGNITION SIGNALS:
     * - "Contiguous subarray" + "length k" → Fixed Window
     * - "Maximum" → Tracking a max state
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You're looking through a MAGNIFYING GLASS of fixed width K at a row of numbers.
     * 
     * 1. FIRST LOOK: Place the glass at the start. Sum up everything inside → that's your first sum.
     * 2. SLIDE IT: Move the glass one step to the right.
     *    - A new number ENTERS from the right edge → ADD it.
     *    - An old number EXITS from the left edge → SUBTRACT it.
     *    This avoids recalculating the ENTIRE sum each time!
     * 3. TRACK BEST: After each slide, check if the new sum beats your best sum.
     *
     * WHY O(N) instead of O(N×K)?
     *   Without sliding: for each of the N positions, you sum K numbers → O(N×K)
     *   With sliding: you just do +1 and -1 at each position → O(N)
     * ==========================================
     *
     * CORE IDEA: Build window → Slide: add right, remove left → Track max.
     *
     * TIME:  O(N) — one pass
     * SPACE: O(1) — just a few variables
     */

    public static void main(String[] args) {
        int[] nums1 = {1, 12, -5, -6, 50, 3};
        int k1 = 4;
        System.out.println("Test 1: " + solve(nums1, k1)); // Expected: 12.75

        int[] nums2 = {5};
        int k2 = 1;
        System.out.println("Test 2: " + solve(nums2, k2)); // Expected: 5.0
    }

    public static double solve(int[] nums, int k) {
        double windowSum = 0;
        double maxSum = 0;

        // STEP 1 — BUILD: Place the magnifying glass at the start — sum up the first K elements
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        maxSum = windowSum; // first window is our initial best

        // STEP 2 — SLIDE: Move the glass one step at a time
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i];       // new number enters from the right → add it
            windowSum -= nums[i - k];   // old number exits from the left → subtract it

            // STEP 3 — TRACK: Is this new window better than our best?
            maxSum = Math.max(maxSum, windowSum);
        }

        // STEP 4 — RETURN: Convert the best sum to average
        return maxSum / k;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Magnifying glass. Build → Slide (+right, -left) → Track best.
    public static double solveSkeleton(int[] nums, int k) {
        double windowSum = 0;
        double maxSum = 0;

        // STEP 1 — BUILD
        for (int i = 0; i < ___; i++) {
            windowSum += ___;
        }
        maxSum = ___;

        // STEP 2 — SLIDE
        for (int i = ___; i < nums.length; i++) {
            windowSum += ___;   // add right
            windowSum -= ___;   // remove left

            // STEP 3 — TRACK
            maxSum = Math.max(___, ___);
        }

        // STEP 4 — RETURN
        return ___ / ___;
    }
    */
}
