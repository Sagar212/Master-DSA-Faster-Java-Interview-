public class MaxDepthOfBinaryTree {

    /*
     * PROBLEM: Maximum Depth of Binary Tree (LeetCode #104)
     *
     * PATTERN: Trees (DFS Recursion)
     *
     * ====== MENTAL STORY ======
     * HOW DEEP IS THE WELL? Drop a ball. At each fork, go left AND right.
     * Return the DEEPER path + 1 (counting current level).
     * Base case: hit the bottom (null) → depth = 0.
     * ==========================================
     *
     * TIME: O(N), SPACE: O(H) where H = height
     */

    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);
        System.out.println("Test 1: " + solve(root)); // Expected: 3
    }

    public static int solve(TreeNode root) {
        // STEP 1 — BASE CASE: Null node = depth 0
        if (root == null) return 0;

        // STEP 2 — RECURSE: Ask left and right subtrees for their depths
        int leftDepth = solve(root.left);
        int rightDepth = solve(root.right);

        // STEP 3 — RETURN: Max of both + 1 (counting this level)
        return Math.max(leftDepth, rightDepth) + 1;
    }

    /*
    // --- SKELETON ---
    // STORY: How deep is the well? max(left, right) + 1
    public static int solveSkeleton(TreeNode root) {
        if (root == ___) return ___;
        int leftDepth = solveSkeleton(___);
        int rightDepth = solveSkeleton(___);
        return Math.max(___, ___) + ___;
    }
    */
}
