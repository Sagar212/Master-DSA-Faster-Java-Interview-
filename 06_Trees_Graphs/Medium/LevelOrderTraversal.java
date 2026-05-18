import java.util.*;

public class LevelOrderTraversal {

    /*
     * PROBLEM: Binary Tree Level Order Traversal (LeetCode #102)
     *
     * PATTERN: Trees (BFS with Queue)
     *
     * ====== MENTAL STORY ======
     * ANNOUNCING EACH FLOOR of a building over a loudspeaker.
     * Use a QUEUE. Process all nodes at current level, then move to the next level.
     * ==========================================
     *
     * TIME: O(N), SPACE: O(N)
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
        System.out.println("Test 1: " + solve(root)); // Expected: [[3], [9, 20], [15, 7]]
    }

    public static List<List<Integer>> solve(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        // STEP 1 — INIT: Create a queue with the root
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        // STEP 2 — LOOP: Process level by level
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            // STEP 3 — PROCESS: Handle each node on this floor
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                // STEP 4 — EXPAND: Add children (next floor) to queue
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }

        // STEP 5 — RETURN
        return result;
    }

    /*
    // --- SKELETON ---
    // STORY: Announce each floor. Queue → process level → add children.
    public static List<List<Integer>> solveSkeleton(TreeNode root) {
        // STEP 1 — Queue + root
        // STEP 2 — while queue not empty
        //   levelSize = queue.size()
        //   STEP 3 — for i=0 to levelSize: poll, add val
        //   STEP 4 — offer left/right children
        // STEP 5 — return
        return null;
    }
    */
}
