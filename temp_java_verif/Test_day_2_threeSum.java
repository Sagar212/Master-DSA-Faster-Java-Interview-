
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


public class Test_day_2_threeSum {
    public static List<List<Integer>> solve(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    
    // STEP 1 — INIT: Sort the array (required for two pointers to work)
    Arrays.sort(nums);
    
    // STEP 2 — LOOP: Pick each element as the "anchor"
    for (int i = 0; i < nums.length - 2; i++) {
        
        // STEP 3 — PRUNE: Early exit & skip duplicate anchors
        if (nums[i] > 0) break;                           // impossible to sum to 0 → stop
        if (i > 0 && nums[i] == nums[i-1]) continue;    // same anchor → skip duplicate
        
        // STEP 4 — INIT POINTERS: Set up TwoSumII on the remaining subarray
        int left = i + 1, right = nums.length - 1;
        
        // STEP 5 — INNER LOOP: TwoSumII to find pairs that cover the anchor's debt
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            // STEP 6 — CHECK: Compare sum and decide which pointer to move
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                left++; right--;
                while (left < right && nums[left] == nums[left-1]) left++;   // skip dup left
                while (left < right && nums[right] == nums[right+1]) right--; // skip dup right
            } else if (sum < 0) left++;   // sum too small → need bigger, move left up
            else right--;  // sum too big → need smaller, move right down
        }
    }
    
    // STEP 7 — RETURN: All unique triplets
    return res;
}
}
