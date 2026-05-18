public class MedianOfTwoSortedArrays {

    /*
     * PROBLEM: Median of Two Sorted Arrays (LeetCode #4)
     * Given two sorted arrays, return the median in O(log(m+n)).
     *
     * PATTERN: Binary Search (Partition)
     *
     * ====== MENTAL STORY ======
     * Two ASSEMBLY LINES of sorted items. Find the middle item
     * without fully merging. Binary search on the SHORTER array.
     * Try partition points. Valid: everything left ≤ everything right.
     *
     * STEP BY STEP:
     * 1. Always binary search on the SHORTER array (for efficiency).
     * 2. For a partition at index i in short array, the partition in long array is:
     *    j = (total_length + 1) / 2 - i
     * 3. Valid partition when: maxLeft1 ≤ minRight2 AND maxLeft2 ≤ minRight1
     * 4. Median: odd → max(maxLeft1, maxLeft2)
     *            even → avg(max(lefts), min(rights))
     * ==========================================
     *
     * TIME: O(log(min(m,n))), SPACE: O(1)
     */

    public static void main(String[] args) {
        int[] nums1a = {1, 3}, nums1b = {2};
        System.out.println("Test 1: " + solve(nums1a, nums1b)); // Expected: 2.0

        int[] nums2a = {1, 2}, nums2b = {3, 4};
        System.out.println("Test 2: " + solve(nums2a, nums2b)); // Expected: 2.5
    }

    public static double solve(int[] nums1, int[] nums2) {
        // STEP 1 — INIT: Always binary search on the SHORTER array
        if (nums1.length > nums2.length) return solve(nums2, nums1);

        int m = nums1.length, n = nums2.length;
        int left = 0, right = m;

        // STEP 2 — LOOP: Binary search for the correct partition on the shorter array
        while (left <= right) {

            // STEP 3 — PARTITION: Calculate partition points for both arrays
            int i = left + (right - left) / 2;    // partition in nums1
            int j = (m + n + 1) / 2 - i;          // partition in nums2 (auto-calculated)

            // STEP 4 — BOUNDARIES: Get the 4 boundary values (use MIN/MAX for edge cases)
            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            // STEP 5 — CHECK: Is this a valid partition?
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                // Valid! Calculate median
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
                } else {
                    return Math.max(maxLeft1, maxLeft2);
                }
            } else if (maxLeft1 > minRight2) {
                right = i - 1; // nums1 partition too far right → move left
            } else {
                left = i + 1;  // nums1 partition too far left → move right
            }
        }

        // STEP 6 — RETURN
        return 0.0;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Two assembly lines. Binary search shorter one. Partition so left ≤ right.
    public static double solveSkeleton(int[] nums1, int[] nums2) {
        // STEP 1 — Ensure nums1 is shorter
        if (nums1.length > nums2.length) return solveSkeleton(nums2, nums1);

        int m = nums1.length, n = nums2.length;
        int left = 0, right = ___;

        // STEP 2 — LOOP
        while (___ <= ___) {
            // STEP 3 — PARTITION
            int i = ___ + (___ - ___) / 2;
            int j = (___ + ___ + 1) / 2 - ___;

            // STEP 4 — BOUNDARIES (use MIN_VALUE/MAX_VALUE for edges)
            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[___];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[___];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[___];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[___];

            // STEP 5 — CHECK
            if (___ <= ___ && ___ <= ___) {
                // Valid → calculate median
                // odd:  max(maxLeft1, maxLeft2)
                // even: avg(max(lefts), min(rights))
            } else if (maxLeft1 > minRight2) {
                right = ___;
            } else {
                left = ___;
            }
        }

        // STEP 6 — RETURN
        return 0.0;
    }
    */
}