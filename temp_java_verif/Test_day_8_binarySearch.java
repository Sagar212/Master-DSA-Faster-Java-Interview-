
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


public class Test_day_8_binarySearch {
    public static int solve(int[] nums, int target) {
    // STEP 1 — INIT: Set boundary pointers
    int left = 0, right = nums.length - 1;
    
    // STEP 2 — LOOP: Halve the search space
    while (left <= right) {
        // STEP 3 — MID: Calculate middle index
        int mid = left + (right - left) / 2;
        
        // STEP 4 — CHECK: Is target found or in which half?
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1; // go right
        } else {
            right = mid - 1; // go left
        }
    }
    
    // STEP 5 — RETURN: Not found
    return -1;
}
}
