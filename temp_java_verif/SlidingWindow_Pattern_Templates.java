import java.util.*;
public class SlidingWindow_Pattern_Templates {
    // ========== FIXED WINDOW PATTERN ==========
    public static int solveFixed(int[] nums, int k) {
        int windowSum = 0, maxSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        maxSum = windowSum;
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i];     // Right enters -> add
            windowSum -= nums[i - k]; // Left exits -> subtract
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    // ========== VARIABLE WINDOW PATTERN ==========
    public static int solveVariable(int[] nums, int target) {
        int left = 0, maxLen = 0, currentSum = 0;
        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right]; // Expand window right
            // Shrink window left while condition is violated
            while (currentSum > target) {
                currentSum -= nums[left];
                left++;
            }
            // Window is guaranteed valid here
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
