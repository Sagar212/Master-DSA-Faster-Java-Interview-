import java.util.*;
public class TwoSum_HashMap_Template {
    public static int[] solve(int[] nums, int target) {
        // STEP 1 — INIT: Create the guest book (HashMap) to remember who's arrived
        Map<Integer, Integer> seen = new HashMap<>(); // KEY = number, VALUE = index

        // STEP 2 — LOOP: Walk through each person at the party
        for (int i = 0; i < nums.length; i++) {

            // STEP 3 — CHECK: "What partner do I NEED? Is that partner already in the guest book?"
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i }; // partner found → return both indices
            }

            // STEP 4 — STORE: "No partner yet → sign the guest book so someone can find me later"
            seen.put(nums[i], i); // store AFTER checking → prevents self-matching
        }

        // STEP 5 — RETURN: No pair found
        return new int[0];
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
