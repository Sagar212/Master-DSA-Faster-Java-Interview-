import java.util.*;
public class Tree_DFS_Template {
    public static int solve(TreeNode root) {
        // STEP 1 — BASE CASE: Empty node means depth is 0
        if (root == null) {
            return 0;
        }

        // STEP 2 — DIVIDE: Recursively find the depth of the left subtree
        int leftDepth = solve(root.left);

        // STEP 3 — DIVIDE: Recursively find the depth of the right subtree
        int rightDepth = solve(root.right);

        // STEP 4 — CONQUER: The depth is 1 (for current node) + max of left/right subtrees
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
