public class SlidingWindow_Pattern_Template {

    /*
     * PROBLEM: 
     *
     * PATTERN: Sliding Window
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

    // ========== FIXED WINDOW ==========
    public static int solveFixedWindow(int[] nums, int k) {
        int windowSum = 0;
        int maxSum = 0;

        // STEP 1 — BUILD: Sum up the first window of size K
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        maxSum = windowSum;

        // STEP 2 — SLIDE: Move the window one step at a time
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i];      // right enters → add
            windowSum -= nums[i - k];  // left exits → remove

            // STEP 3 — TRACK: Update the best
            maxSum = Math.max(maxSum, windowSum);
        }

        // STEP 4 — RETURN
        return maxSum;
    }

    // ========== VARIABLE WINDOW ==========
    public static int solveVariableWindow(int[] nums) {
        int left = 0;
        int maxLen = 0;
        // int state = 0; // whatever you're tracking (sum, count, freq map, etc.)

        // STEP 1 — EXPAND: Move right pointer to grow the window
        for (int right = 0; right < nums.length; right++) {
            // state += nums[right]; // add right element to state

            // STEP 2 — SHRINK: While condition is violated, shrink from left
            // while (state > target) {
            //     state -= nums[left]; // remove left element from state
            //     left++;              // shrink → move left up
            // }

            // STEP 3 — TRACK: Window is valid here, update best
            maxLen = Math.max(maxLen, right - left + 1);
        }

        // STEP 4 — RETURN
        return maxLen;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL (FIXED) ---
    public static int skeletonFixed(int[] nums, int k) {
        // STEP 1 — BUILD
        // STEP 2 — SLIDE (+right, -left)
        // STEP 3 — TRACK
        // STEP 4 — RETURN
        return ___;
    }

    // --- SKELETON FOR ACTIVE RECALL (VARIABLE) ---
    public static int skeletonVariable(int[] nums) {
        // STEP 1 — EXPAND (right)
        // STEP 2 — SHRINK (left while invalid)
        // STEP 3 — TRACK (window is valid)
        // STEP 4 — RETURN
        return ___;
    }
    */
}
