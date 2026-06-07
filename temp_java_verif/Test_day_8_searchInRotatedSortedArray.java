
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


public class Test_day_8_searchInRotatedSortedArray {
    public static int solve(int[] nums, int target) {
    // STEP 1 — INIT [INTENT: Establish search space across the entire array]
    // ACTION: Set left pointer to index 0 and right pointer to the last index.
    int left = 0, right = nums.length - 1;
    
    // STEP 2 — LOOP [INTENT: Repeatedly halve the search space until pointers cross]
    while (left <= right) {
        // ACTION: Calculate mid safely to prevent integer overflow.
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        // STEP 3 — IDENTIFY [INTENT: Since the array is rotated, at least one half must be strictly sorted]
        // ACTION: Compare left element to mid element. If left <= mid, the left half is perfectly sorted.
        if (nums[left] <= nums[mid]) {
            
            // STEP 4A — CHECK LEFT HALF [INTENT: Determine if the target falls within this known sorted range]
            // ACTION: If target is bounded between nums[left] and nums[mid], prune right half. Otherwise, prune left.
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            
            // STEP 4B — CHECK RIGHT HALF [INTENT: The right half must be the strictly sorted one]
            // ACTION: If target is bounded between nums[mid] and nums[right], prune left half. Otherwise, prune right.
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    // STEP 5 — RETURN [INTENT: Target was not found in the array]
    return -1;
}
}
