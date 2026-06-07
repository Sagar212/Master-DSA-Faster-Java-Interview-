
import java.util.*;


import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


public class Test_day_8_medianOfTwoSortedArrays {
    public static double solve(int[] nums1, int[] nums2) {
    // STEP 1 — INIT: Binary search shorter array for efficiency
    if (nums1.length > nums2.length) return solve(nums2, nums1);
    
    int m = nums1.length, n = nums2.length;
    int left = 0, right = m;
    
    // STEP 2 — LOOP
    while (left <= right) {
        // STEP 3 — PARTITION: Find division indices
        int i = left + (right - left) / 2;
        int j = (m + n + 1) / 2 - i;
        
        // STEP 4 — BOUNDARIES: Get boundary values (use MIN/MAX for edge cases)
        int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
        int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
        int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
        int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];
        
        // STEP 5 — CHECK: Is the partition valid?
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Valid! Calculate median
            if ((m + n) % 2 == 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = i - 1; // too far right -> go left
        } else {
            left = i + 1;  // too far left -> go right
        }
    }
    return 0.0;
}
}
