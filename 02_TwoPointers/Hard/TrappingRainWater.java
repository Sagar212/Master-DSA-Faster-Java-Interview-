public class TrappingRainWater {

    /*
     * PROBLEM: Trapping Rain Water (LeetCode #42)
     * Given n non-negative integers representing an elevation map, compute how much water it can trap.
     *
     * PATTERN: Two Pointers (Opposite Ends + Max Tracking)
     *
     * RECOGNITION SIGNALS:
     * - Need to find bounded area/volume between elements
     * - Water at index i depends on max height to its left AND right
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * Imagine WALLS of different heights. Rain falls. Water gets trapped between tall walls.
     *
     * KEY INSIGHT: Water at any position = min(tallest wall on left, tallest wall on right) - current wall height.
     * Think of it like a BATHTUB: water level is set by the SHORTER side.
     *
     * TWO POINTER TRICK:
     *   - Stand at BOTH ENDS of the wall row (left=0, right=end).
     *   - Track the tallest wall you've seen from each side (leftMax, rightMax).
     *   - ALWAYS process the SHORTER side first. WHY?
     *     Because the shorter side is the BOTTLENECK.
     *     The taller side doesn't matter yet — water overflows on the short side first.
     *
     * STEP BY STEP:
     *   1. If height[left] < height[right] → left side is the bottleneck
     *      - If height[left] >= leftMax → update leftMax (new tallest wall on left)
     *      - Else → water is trapped here! Add (leftMax - height[left])
     *      - Move left++
     *   2. Else → right side is the bottleneck
     *      - Same logic but for rightMax
     *      - Move right--
     * ==========================================
     *
     * CORE IDEA: Process the shorter side. Water = max boundary - current height.
     *
     * TIME:  O(N) — one pass with two pointers
     * SPACE: O(1) — only a few tracking variables
     *
     * COMMON MISTAKES:
     * - Moving the WRONG pointer (must always process the shorter side)
     * - Confusing min/max: water level = min(leftMax, rightMax), not max!
     */

    public static void main(String[] args) {
        int[] height1 = {0,1,0,2,1,0,1,3,2,1,2,1};
        System.out.println("Test 1: " + solve(height1)); // Expected: 6

        int[] height2 = {4,2,0,3,2,5};
        System.out.println("Test 2: " + solve(height2)); // Expected: 9
    }

    public static int solve(int[] height) {
        if (height == null || height.length == 0) return 0;

        // STEP 1 — INIT: Place pointers at both ends, track max heights from each side
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;

        // STEP 2 — LOOP: Walk inwards until pointers meet
        while (left < right) {

            // STEP 3 — CHECK: Which side is the bottleneck? Process that side.
            if (height[left] < height[right]) {
                // Left side is shorter → it's the bottleneck

                // STEP 4a — UPDATE: Is this wall taller than any we've seen on the left?
                if (height[left] >= leftMax) {
                    leftMax = height[left]; // new tallest wall → update boundary
                } else {
                    water += leftMax - height[left]; // lower than boundary → water trapped!
                }

                // STEP 5a — MOVE: Done with this position → move inward
                left++;

            } else {
                // Right side is shorter → it's the bottleneck

                // STEP 4b — UPDATE: Is this wall taller than any we've seen on the right?
                if (height[right] >= rightMax) {
                    rightMax = height[right]; // new tallest wall → update boundary
                } else {
                    water += rightMax - height[right]; // lower than boundary → water trapped!
                }

                // STEP 5b — MOVE: Done with this position → move inward
                right--;
            }
        }

        // STEP 6 — RETURN: Total water trapped
        return water;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Bathtub walls. Process the shorter side. Water = max boundary - current height.
    public static int solveSkeleton(int[] height) {
        // STEP 1 — INIT
        int left = 0, right = ___;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        // STEP 2 — LOOP
        while (___ < ___) {

            // STEP 3 — CHECK (which side is bottleneck?)
            if (height[left] < height[right]) {
                // STEP 4a — UPDATE
                if (___ >= leftMax) {
                    leftMax = ___;
                } else {
                    water += ___ - ___;
                }
                // STEP 5a — MOVE
                ___;
            } else {
                // STEP 4b — UPDATE
                if (___ >= rightMax) {
                    rightMax = ___;
                } else {
                    water += ___ - ___;
                }
                // STEP 5b — MOVE
                ___;
            }
        }

        // STEP 6 — RETURN
        return water;
    }
    */
}
