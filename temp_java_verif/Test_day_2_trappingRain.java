
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


public class Test_day_2_trappingRain {
    public static int solve(int[] height) {
    // STEP 1 — INIT: Place pointers at both ends, track max heights from each side
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    
    // STEP 2 — LOOP: Walk inwards until pointers meet
    while (left < right) {
        
        // STEP 3 — CHECK: Which side is the bottleneck? Process that side.
        if (height[left] < height[right]) {
            // Left side is shorter → it's the bottleneck
            
            // STEP 4a — UPDATE: Is this wall taller than any we've seen on the left?
            if (height[left] >= leftMax) leftMax = height[left]; // new tallest wall → update boundary
            else water += leftMax - height[left]; // lower than boundary → water trapped!
            
            // STEP 5a — MOVE: Done with this position → move inward
            left++;
        } else {
            // Right side is shorter → it's the bottleneck
            
            // STEP 4b — UPDATE: Is this wall taller than any we've seen on the right?
            if (height[right] >= rightMax) rightMax = height[right]; // new tallest wall → update boundary
            else water += rightMax - height[right]; // lower than boundary → water trapped!
            
            // STEP 5b — MOVE: Done with this position → move inward
            right--;
        }
    }
    
    // STEP 6 — RETURN: Total water trapped
    return water;
}
}
