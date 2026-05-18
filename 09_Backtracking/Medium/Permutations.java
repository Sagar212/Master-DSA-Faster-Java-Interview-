import java.util.ArrayList;
import java.util.List;

public class Permutations {

    /*
     * PROBLEM: Permutations (LeetCode #46)
     * Given distinct integers, return all possible permutations.
     *
     * PATTERN: Backtracking
     *
     * ====== MENTAL STORY ======
     * ARRANGING BOOKS on a shelf. Try every possible order.
     * At each position, try placing each UNUSED book.
     * After trying, REMOVE the book (backtrack) and try the next one.
     *
     * Difference from Subsets:
     *   - Subsets: include/skip (order doesn't matter)
     *   - Permutations: every element used, ORDER matters → use a "used" tracker
     * ==========================================
     *
     * TIME: O(N! × N), SPACE: O(N)
     */

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        System.out.println("Test 1: " + solve(nums)); // Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
    }

    public static List<List<Integer>> solve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }

    private static void backtrack(int[] nums, List<Integer> shelf, boolean[] used, List<List<Integer>> result) {
        // STEP 1 — SAVE: If shelf is full → save this arrangement
        if (shelf.size() == nums.length) {
            result.add(new ArrayList<>(shelf));
            return;
        }

        // STEP 2 — LOOP: Try placing each unused book at current position
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue; // book already on shelf → skip

            // STEP 3 — CHOOSE: Place this book
            shelf.add(nums[i]);
            used[i] = true;

            // STEP 4 — EXPLORE: Fill the next position
            backtrack(nums, shelf, used, result);

            // STEP 5 — UNCHOOSE (BACKTRACK): Remove book, mark unused
            shelf.remove(shelf.size() - 1);
            used[i] = false;
        }
    }

    /*
    // --- SKELETON ---
    // STORY: Arrange books. Try unused → place → recurse → remove → unmark.
    // STEP 1 — If shelf full → save
    // STEP 2 — Loop ALL elements (skip used)
    // STEP 3 — CHOOSE (add + mark used)
    // STEP 4 — EXPLORE (recurse)
    // STEP 5 — UNCHOOSE (remove + unmark)
    */
}
