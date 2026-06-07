
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


public class Test_day_5_maxAvgSubarray {
    public static double solve(int[] nums, int k) {
    double windowSum = 0, maxSum = 0;
    
    // STEP 1 — BUILD: Place the magnifying glass at the start — sum up the first K elements
    for (int i = 0; i < k; i++) windowSum += nums[i];
    maxSum = windowSum; // first window is our initial best
    
    // STEP 2 — SLIDE: Move the glass one step at a time
    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i];    // new number enters from the right → add it
        windowSum -= nums[i - k]; // old number exits from the left → subtract it
        
        // STEP 3 — TRACK: Is this new window better than our best?
        maxSum = Math.max(maxSum, windowSum);
    }
    
    // STEP 4 — RETURN: Convert the best sum to average
    return maxSum / k;
}
}
