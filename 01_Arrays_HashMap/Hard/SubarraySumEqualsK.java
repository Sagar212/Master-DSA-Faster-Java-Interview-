import java.util.HashMap;
import java.util.Map;

public class SubarraySumEqualsK {

    /*
     * PROBLEM: Subarray Sum Equals K (LeetCode #560)
     * Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.
     *
     * PATTERN: Arrays + HashMap (Prefix Sum variant)
     *
     * RECOGNITION SIGNALS:
     * - "Continuous subarray"
     * - Finding a specific target sum
     * - Array can contain NEGATIVE numbers (so Sliding Window won't work!)
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You're walking along a road, tracking the TOTAL DISTANCE from the start (runningSum).
     * 
     * At each step, you ask: "Is there a point BEHIND ME where,
     *   if I subtract the distance to THAT point from MY current distance,
     *   the difference is exactly K?"
     *
     * In math: runningSum - pastSum = K  →  pastSum = runningSum - K
     *
     * So you keep a LOGBOOK (HashMap) of every distance milestone you've passed.
     *   - KEY   = a distance milestone (prefix sum)
     *   - VALUE = how many times you've been at that exact milestone
     *
     * CRITICAL SETUP: You write "distance 0 happened 1 time" in the logbook BEFORE starting.
     * WHY? → If your current runningSum equals K exactly, then runningSum - K = 0.
     *         You need "0" to exist in the logbook to count that subarray starting from index 0!
     * ==========================================
     *
     * CORE IDEA: runningSum - K exists in the map → a valid subarray was found.
     *
     * TIME:  O(N) — one pass through the array
     * SPACE: O(N) — storing prefix sums
     *
     * COMMON MISTAKES:
     * - Using Sliding Window → FAILS with negative numbers (window sum can go up AND down)
     * - Forgetting to seed the map with (0, 1) → misses subarrays starting at index 0
     */

    public static void main(String[] args) {
        int[] nums1 = {1, 1, 1};
        int k1 = 2;
        System.out.println("Test 1: " + solve(nums1, k1)); // Expected: 2

        int[] nums2 = {1, 2, 3};
        int k2 = 3;
        System.out.println("Test 2: " + solve(nums2, k2)); // Expected: 2
    }

    public static int solve(int[] nums, int k) {
        int count = 0;
        int runningSum = 0;

        // STEP 1 — INIT: Create the logbook to remember every milestone we've passed
        Map<Integer, Integer> logbook = new HashMap<>(); // KEY = prefix sum, VALUE = frequency

        // STEP 2 — SEED: Write "distance 0, seen 1 time" BEFORE starting the walk
        logbook.put(0, 1); // WHY? → so subarrays starting at index 0 get counted

        // STEP 3 — LOOP: Walk the road, adding each number to our running total
        for (int num : nums) {
            runningSum += num; // take one step forward → update total distance

            // STEP 4 — CHECK: "Was there a past milestone where the gap between there and here = K?"
            if (logbook.containsKey(runningSum - k)) {
                count += logbook.get(runningSum - k); // gap matches K → valid subarray(s) found
            }

            // STEP 5 — STORE: Record this milestone in the logbook for future walkers
            logbook.put(runningSum, logbook.getOrDefault(runningSum, 0) + 1);
        }

        // STEP 6 — RETURN: Total count of valid subarrays
        return count;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Walking a road. Logbook of milestones. Gap between milestones = K?
    public static int solveSkeleton(int[] nums, int k) {
        int count = 0;
        int runningSum = 0;

        // STEP 1 — INIT
        Map<___, ___> logbook = new HashMap<>();

        // STEP 2 — SEED (critical!)
        logbook.put(___, ___);

        // STEP 3 — LOOP
        for (int num : ___) {
            runningSum += ___;

            // STEP 4 — CHECK
            if (logbook.containsKey(___)) {
                count += logbook.get(___);
            }

            // STEP 5 — STORE
            logbook.put(___, logbook.getOrDefault(___, 0) + 1);
        }

        // STEP 6 — RETURN
        return count;
    }
    */
}
