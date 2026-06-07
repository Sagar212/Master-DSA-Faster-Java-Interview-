
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


public class Test_day_2_twoSumII {
    public static int[] solve(int[] nums, int target) {
    // STEP 1 — INIT: Place pointers at opposite ends of the sorted array
    int left = 0, right = nums.length - 1;
    
    // STEP 2 — LOOP: Narrow inward until the pointers meet
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        // STEP 3 — CHECK: Compare sum against target and decide which pointer to move
        if (sum == target) {
            return new int[]{left + 1, right + 1};
        } else if (sum < target) {
            left++;   // sum too small → move left up to increase
        } else {
            right--;  // sum too big → move right down to decrease
        }
    }
    
    // STEP 4 — RETURN: Fallback (problem guarantees a solution)
    return new int[]{-1, -1};
}
}
