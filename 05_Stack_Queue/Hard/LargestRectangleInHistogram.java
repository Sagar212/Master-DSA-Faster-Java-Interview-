import java.util.Stack;

public class LargestRectangleInHistogram {

    /*
     * PROBLEM: Largest Rectangle in Histogram (LeetCode #84)
     * Given bar heights, find the largest rectangle area.
     *
     * PATTERN: Monotonic Stack (Increasing)
     *
     * ====== MENTAL STORY ======
     * BUILDING SKYLINE. Bars of different heights.
     * Stack keeps bars in INCREASING order.
     * When a SHORTER bar arrives:
     *   - Pop taller bars → they can't extend further right.
     *   - Calculate their rectangle: height × width.
     *   - Width = distance from current bar to the bar below in stack.
     * ==========================================
     *
     * TIME:  O(N), SPACE: O(N)
     */

    public static void main(String[] args) {
        int[] heights1 = {2, 1, 5, 6, 2, 3};
        System.out.println("Test 1: " + solve(heights1)); // Expected: 10
    }

    public static int solve(int[] heights) {
        // STEP 1 — INIT: Stack of bar indices (increasing order)
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        // STEP 2 — LOOP: Process each bar + one extra "0-height" bar to flush the stack
        for (int i = 0; i <= heights.length; i++) {
            int currentHeight = (i == heights.length) ? 0 : heights[i];

            // STEP 3 — CHECK: While current bar is shorter than stack top → pop and calculate
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }

            // STEP 4 — STORE: Push current bar index
            stack.push(i);
        }

        // STEP 5 — RETURN
        return maxArea;
    }

    /*
    // --- SKELETON ---
    // STORY: Skyline. Increasing stack. Shorter bar → pop taller, calculate area.
    public static int solveSkeleton(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= ___; i++) {
            int currentHeight = (i == heights.length) ? 0 : heights[i];

            while (!stack.isEmpty() && ___ < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? ___ : ___ - stack.peek() - 1;
                maxArea = Math.max(maxArea, ___ * ___);
            }
            stack.push(___);
        }
        return maxArea;
    }
    */
}
