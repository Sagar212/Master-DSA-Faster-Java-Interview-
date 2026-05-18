public class ClimbingStairs {

    /*
     * PROBLEM: Climbing Stairs (LeetCode #70)
     * You can climb 1 or 2 steps. How many distinct ways to reach the top?
     *
     * PATTERN: Core DP (Fibonacci variant)
     *
     * ====== MENTAL STORY ======
     * Standing at the BOTTOM of a staircase.
     * To reach step N, you either came from step N-1 (took 1 step) or N-2 (took 2 steps).
     * So: ways(N) = ways(N-1) + ways(N-2) — it's literally FIBONACCI!
     *
     * Base cases: ways(1) = 1, ways(2) = 2
     * ==========================================
     *
     * TIME: O(N), SPACE: O(1) — just track two variables
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve(2)); // Expected: 2
        System.out.println("Test 2: " + solve(3)); // Expected: 3
        System.out.println("Test 3: " + solve(5)); // Expected: 8
    }

    public static int solve(int n) {
        if (n <= 2) return n;

        // STEP 1 — INIT: Base cases (like Fibonacci seeds)
        int prev2 = 1; // ways to reach step 1
        int prev1 = 2; // ways to reach step 2

        // STEP 2 — LOOP: Build up from step 3 to step N
        for (int i = 3; i <= n; i++) {
            // STEP 3 — RECURRENCE: ways(i) = ways(i-1) + ways(i-2)
            int current = prev1 + prev2;

            // STEP 4 — SHIFT: Move the window forward
            prev2 = prev1;
            prev1 = current;
        }

        // STEP 5 — RETURN
        return prev1;
    }

    /*
    // --- SKELETON ---
    // STORY: Fibonacci staircase. ways(N) = ways(N-1) + ways(N-2)
    public static int solveSkeleton(int n) {
        if (n <= 2) return n;
        int prev2 = ___, prev1 = ___;
        for (int i = ___; i <= ___; i++) {
            int current = ___ + ___;
            prev2 = ___;
            prev1 = ___;
        }
        return ___;
    }
    */
}
