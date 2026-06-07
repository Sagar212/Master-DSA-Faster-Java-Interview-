import java.util.*;
public class BinarySearch_Template {
    public static int search(int[] nums, int target) {
        // STEP 1 — INIT: Define search bounds
        int low = 0;
        int high = nums.length - 1;

        // STEP 2 — LOOP: Keep searching while bounds are valid
        while (low <= high) {
            // STEP 3 — MID: Calculate middle element (prevent overflow)
            int mid = low + (high - low) / 2;

            // STEP 4 — CHECK: Evaluate mid and prune half of search space
            if (nums[mid] == target) {
                return mid; // Found it!
            } else if (nums[mid] < target) {
                low = mid + 1; // Prune left half
            } else {
                high = mid - 1; // Prune right half
            }
        }
        // STEP 5 — RETURN
        return -1;
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
