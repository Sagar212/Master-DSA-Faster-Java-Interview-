import java.util.Arrays;

public class LongestIncreasingSubsequence {

    /*
     * PROBLEM: Longest Increasing Subsequence (LeetCode #300)
     * Find the length of the longest strictly increasing subsequence.
     *
     * PATTERN: Core DP
     *
     * ====== MENTAL STORY ======
     * RISING DOMINOES. Each domino has a number. You want the longest chain
     * where each next domino is TALLER than the previous.
     *
     * For each domino i, look at ALL previous dominoes j (where j < i).
     * If domino j is shorter: I can extend j's chain by 1.
     * dp[i] = max(dp[j] + 1) for all valid j.
     * ==========================================
     *
     * TIME: O(N^2), SPACE: O(N)
     */

    public static void main(String[] args) {
        int[] nums1 = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("Test 1: " + solve(nums1)); // Expected: 4 → [2, 3, 7, 101]
    }

    public static int solve(int[] nums) {
        if (nums.length == 0) return 0;

        // STEP 1 — INIT: dp[i] = length of LIS ending at index i. Min is 1 (the element itself).
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1); // every element alone is a subsequence of length 1
        int maxLen = 1;

        // STEP 2 — LOOP: For each domino
        for (int i = 1; i < nums.length; i++) {

            // STEP 3 — CHECK ALL PREVIOUS: Can I extend any previous chain?
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    // STEP 4 — RECURRENCE: Extend j's chain
                    dp[i] = Math.max(dp[i], dp[j] + 1); // j is shorter → I can follow j
                }
            }

            // STEP 5 — TRACK: Update global max
            maxLen = Math.max(maxLen, dp[i]);
        }

        // STEP 6 — RETURN
        return maxLen;
    }

    /*
    // --- SKELETON ---
    // STORY: Rising dominoes. dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
    public static int solveSkeleton(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, ___);
        int maxLen = ___;

        for (int i = 1; i < ___; i++) {
            for (int j = 0; j < ___; j++) {
                if (nums[___] < nums[___]) {
                    dp[i] = Math.max(dp[___], dp[___] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[___]);
        }
        return maxLen;
    }
    */
}
