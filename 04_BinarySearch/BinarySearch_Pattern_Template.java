public class BinarySearch_Pattern_Template {

    /*
     * PATTERN: Binary Search
     *
     * ====== MENTAL STORY ======
     * Dictionary: open to middle → too far? go left → too early? go right → repeat.
     * ==========================================
     */

    public static void main(String[] args) {}

    public static int solve(int[] nums, int target) {
        // STEP 1 — INIT: Set search boundaries
        int left = 0;
        int right = nums.length - 1;

        // STEP 2 — LOOP: Keep halving until boundaries cross
        while (left <= right) {
            // STEP 3 — MID: Calculate the middle (overflow-safe)
            int mid = left + (right - left) / 2;

            // STEP 4 — CHECK: Compare mid value to target and halve
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // STEP 5 — RETURN
        return -1;
    }

    /*
    // --- SKELETON ---
    public static int solveSkeleton(int[] nums, int target) {
        int left = ___, right = ___;
        while (___ <= ___) {
            int mid = ___ + (___ - ___) / 2;
            if (nums[mid] == ___) return ___;
            else if (nums[mid] < ___) left = ___;
            else right = ___;
        }
        return ___;
    }
    */
}
