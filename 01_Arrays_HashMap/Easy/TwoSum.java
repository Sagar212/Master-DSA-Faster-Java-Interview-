import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class TwoSum {

    /*
     * PROBLEM: Two Sum (LeetCode #1)
     * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
     *
     * PATTERN: Arrays + HashMap
     *
     * RECOGNITION SIGNALS:
     * - Unsorted array
     * - Looking for a pair of elements
     * - Need O(N) time complexity instead of O(N^2)
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You walk into a party looking for your PARTNER to complete a dance pair.
     * Your number is written on your shirt. Your partner's shirt number + yours = target.
     * 
     * BRUTE FORCE (slow): You ask EVERY person at the party → O(N^2)
     * SMART WAY: There's a guest book (HashMap) at the door.
     *   - When you walk in, you CHECK the guest book: "Is my partner already here?"
     *   - If YES → you found your pair! Return both positions.
     *   - If NO → you SIGN the guest book with your number, so your future partner can find YOU.
     * Each person only signs once → O(N)
     * ==========================================
     *
     * CORE IDEA: For each number, calculate what you NEED (complement = target - current).
     *            Check if that NEED is already in the map. If not, store yourself for later.
     *
     * TIME:  O(N) — one pass through the array
     * SPACE: O(N) — storing numbers in the map
     *
     * COMMON MISTAKES:
     * - Storing BEFORE checking → you could match with yourself!
     *   Always CHECK first, STORE second.
     */

    public static void main(String[] args) {
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test 1: " + Arrays.toString(solve(nums1, target1))); // Expected: [0, 1]

        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        System.out.println("Test 2: " + Arrays.toString(solve(nums2, target2))); // Expected: [1, 2]
    }

    public static int[] solve(int[] nums, int target) {
        // STEP 1 — INIT: Create the guest book (HashMap) to remember who's arrived
        Map<Integer, Integer> seen = new HashMap<>(); // KEY = number, VALUE = index

        // STEP 2 — LOOP: Walk through each person at the party
        for (int i = 0; i < nums.length; i++) {

            // STEP 3 — CHECK: "What partner do I NEED? Is that partner already in the guest book?"
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i }; // partner found → return both indices
            }

            // STEP 4 — STORE: "No partner yet → sign the guest book so someone can find me later"
            seen.put(nums[i], i); // store AFTER checking → prevents self-matching
        }

        // STEP 5 — RETURN: No pair found
        return new int[0];
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Guest book at a party. Check → then Sign.
    public static int[] solveSkeleton(int[] nums, int target) {
        // STEP 1 — INIT
        Map<___, ___> seen = new HashMap<>();

        // STEP 2 — LOOP
        for (int i = 0; i < ___; i++) {

            // STEP 3 — CHECK
            int need = ___ - ___;
            if (seen.containsKey(___)) {
                return new int[] { seen.get(___), ___ };
            }

            // STEP 4 — STORE
            seen.put(___, ___);
        }

        // STEP 5 — RETURN
        return new int[0];
    }
    */
}
