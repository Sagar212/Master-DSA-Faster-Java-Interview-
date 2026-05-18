public class SearchInRotatedSortedArray {

    /*
     * PROBLEM: Search in Rotated Sorted Array (LeetCode #33)
     * A sorted array was rotated at some pivot. Find the target index or -1.
     *
     * PATTERN: Binary Search (Rotated)
     *
     * ====== MENTAL STORY ======
     * The dictionary was DROPPED and the pages got shuffled.
     * Pages [4,5,6,7 | 0,1,2] — still sorted in two halves!
     *
     * TRICK: At any mid point, at least ONE HALF is perfectly sorted.
     * 1. Figure out WHICH half is sorted (compare nums[left] with nums[mid]).
     * 2. Check if target is IN that sorted half's range.
     * 3. If yes → search that half. If no → search the other half.
     * ==========================================
     *
     * TIME:  O(log N)
     * SPACE: O(1)
     */

    public static void main(String[] args) {
        int[] nums1 = {4, 5, 6, 7, 0, 1, 2};
        System.out.println("Test 1: " + solve(nums1, 0)); // Expected: 4
        System.out.println("Test 2: " + solve(nums1, 3)); // Expected: -1
    }

    public static int solve(int[] nums, int target) {
        // STEP 1 — INIT: Set search boundaries
        int left = 0;
        int right = nums.length - 1;

        // STEP 2 — LOOP: Binary search with rotation awareness
        while (left <= right) {

            // STEP 3 — MID
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid; // found → return index
            }

            // STEP 4 — IDENTIFY: Which half is sorted?
            if (nums[left] <= nums[mid]) {
                // LEFT half is sorted [left...mid]

                // STEP 5 — CHECK: Is target in the sorted left half?
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1; // target is in sorted left half → go left
                } else {
                    left = mid + 1;  // target is NOT in left half → go right
                }
            } else {
                // RIGHT half is sorted [mid...right]

                // STEP 5 — CHECK: Is target in the sorted right half?
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;  // target is in sorted right half → go right
                } else {
                    right = mid - 1; // target is NOT in right half → go left
                }
            }
        }

        // STEP 6 — RETURN
        return -1;
    }

    /*
    // --- SKELETON ---
    // STORY: Dropped dictionary. One half always sorted. Check if target is in sorted half.
    public static int solveSkeleton(int[] nums, int target) {
        int left = ___, right = ___;

        while (___ <= ___) {
            int mid = ___ + (___ - ___) / 2;
            if (nums[mid] == ___) return ___;

            // Which half is sorted?
            if (nums[left] <= nums[mid]) {
                // Left sorted
                if (target >= ___ && target < ___) right = ___;
                else left = ___;
            } else {
                // Right sorted
                if (target > ___ && target <= ___) left = ___;
                else right = ___;
            }
        }
        return -1;
    }
    */
}
