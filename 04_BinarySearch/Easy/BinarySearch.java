public class BinarySearch {

    /*
     * PROBLEM: Binary Search (LeetCode #704)
     * Given a sorted array and a target, return its index or -1.
     *
     * PATTERN: Binary Search (Standard)
     *
     * ====== MENTAL STORY ======
     * Finding a word in a DICTIONARY. Open to middle page.
     * Word comes after? → ignore left half. Before? → ignore right half.
     * Each flip HALVES remaining pages. 1000 pages → ~10 flips.
     * ==========================================
     *
     * TIME:  O(log N)
     * SPACE: O(1)
     */

    public static void main(String[] args) {
        int[] nums1 = {-1, 0, 3, 5, 9, 12};
        System.out.println("Test 1: " + solve(nums1, 9));  // Expected: 4
        System.out.println("Test 2: " + solve(nums1, 2));  // Expected: -1
    }

    public static int solve(int[] nums, int target) {
        // STEP 1 — INIT: Set the search boundaries
        int left = 0;
        int right = nums.length - 1;

        // STEP 2 — LOOP: Keep halving until boundaries cross
        while (left <= right) {

            // STEP 3 — MID: Calculate middle index (overflow-safe)
            int mid = left + (right - left) / 2;

            // STEP 4 — CHECK: Compare and halve the search space
            if (nums[mid] == target) {
                return mid;              // found the word → return page number
            } else if (nums[mid] < target) {
                left = mid + 1;          // word comes after mid → search right half
            } else {
                right = mid - 1;         // word comes before mid → search left half
            }
        }

        // STEP 5 — RETURN: Word not in dictionary
        return -1;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Dictionary. Open middle → halve.
    public static int solveSkeleton(int[] nums, int target) {
        // STEP 1 — INIT
        int left = ___, right = ___;

        // STEP 2 — LOOP
        while (___ <= ___) {
            // STEP 3 — MID
            int mid = ___ + (___ - ___) / 2;

            // STEP 4 — CHECK
            if (nums[mid] == ___) return ___;
            else if (nums[mid] < ___) left = ___;
            else right = ___;
        }

        // STEP 5 — RETURN
        return -1;
    }
    */
}
