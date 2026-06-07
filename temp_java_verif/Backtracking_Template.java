import java.util.*;
public class Backtracking_Template {
    public static List<List<Integer>> solve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> bag, List<List<Integer>> result) {
        // STEP 1 — SAVE: Current bag state is a valid subset (even empty bag)
        result.add(new ArrayList<>(bag)); // snapshot the bag

        // STEP 2 — LOOP: Try including each remaining item
        for (int i = start; i < nums.length; i++) {

            // STEP 3 — CHOOSE: Add item to the bag
            bag.add(nums[i]);

            // STEP 4 — EXPLORE: Go deeper (only items AFTER i to avoid duplicates)
            backtrack(nums, i + 1, bag, result);

            // STEP 5 — UNCHOOSE (BACKTRACK): Remove item and try skipping it
            bag.remove(bag.size() - 1);
        }
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
