public class LowestCommonAncestor {

    /*
     * PROBLEM: Lowest Common Ancestor of a Binary Tree (LeetCode #236)
     *
     * PATTERN: Trees (DFS Recursion)
     *
     * ====== MENTAL STORY ======
     * TWO COUSINS finding their nearest common grandparent.
     * DFS from root. If a node is p or q, return it.
     * If left and right both return non-null, current node is the LCA.
     * ==========================================
     *
     * TIME: O(N), SPACE: O(H)
     */

    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(5);
        root.right = new TreeNode(1);
        root.left.left = new TreeNode(6);
        root.left.right = new TreeNode(2);
        System.out.println("Test 1: " + solve(root, root.left, root.right).val); // Expected: 3
    }

    public static TreeNode solve(TreeNode root, TreeNode p, TreeNode q) {
        // STEP 1 — BASE CASE: null or found p or q
        if (root == null || root == p || root == q) return root;

        // STEP 2 — RECURSE: Search left and right subtrees
        TreeNode leftResult = solve(root.left, p, q);
        TreeNode rightResult = solve(root.right, p, q);

        // STEP 3 — CHECK: Both sides found something? I am the LCA!
        if (leftResult != null && rightResult != null) return root;

        // STEP 4 — RETURN: Only one side found → pass it up
        return leftResult != null ? leftResult : rightResult;
    }

    /*
    // --- SKELETON ---
    // STORY: Two cousins. If both sides return → I'm the grandparent (LCA).
    public static TreeNode solveSkeleton(TreeNode root, TreeNode p, TreeNode q) {
        if (root == ___ || root == ___ || root == ___) return ___;
        TreeNode leftResult = solveSkeleton(___, p, q);
        TreeNode rightResult = solveSkeleton(___, p, q);
        if (___ != null && ___ != null) return ___;
        return ___ != null ? ___ : ___;
    }
    */
}
