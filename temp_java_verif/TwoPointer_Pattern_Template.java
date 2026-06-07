import java.util.*;
public class TwoPointer_Pattern_Template {
    public static int solve(int[] nums) {
        // STEP 1 — INIT: Place pointers at opposite ends
        int left = 0;
        int right = nums.length - 1;

        // STEP 2 — LOOP: Narrow inward until they meet
        while (left < right) {
            // STEP 3 — CHECK: Evaluate condition and decide pointer step
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{}; // MATCH found!
            } else if (sum < target) {
                left++;  // Too small -> need larger -> move left up
            } else {
                right--; // Too big -> need smaller -> move right down
            }
        }
        // STEP 4 — RETURN
        return -1;
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
