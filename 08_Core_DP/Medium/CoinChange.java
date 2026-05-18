import java.util.Arrays;

public class CoinChange {

    /*
     * PROBLEM: Coin Change (LeetCode #322)
     * Find the fewest number of coins that make up a given amount.
     *
     * PATTERN: Core DP (Unbounded Knapsack variant)
     *
     * ====== MENTAL STORY ======
     * BUS RIDES to a destination.
     * You're at distance 0. You want to reach distance `amount`.
     * Each coin is a bus route that takes you `coin` distance forward.
     *
     * For each distance d from 1 to amount:
     *   "What's the fewest buses to reach here?"
     *   Try each bus route (coin): dp[d] = min(dp[d], dp[d - coin] + 1)
     *   Meaning: "If I take this bus, I need 1 ride + however many rides to reach d-coin"
     * ==========================================
     *
     * TIME: O(amount × coins), SPACE: O(amount)
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve(new int[]{1, 5, 10}, 11)); // Expected: 2
        System.out.println("Test 2: " + solve(new int[]{2}, 3));          // Expected: -1
    }

    public static int solve(int[] coins, int amount) {
        // STEP 1 — INIT: dp[i] = fewest coins to make amount i. Fill with "impossible" value.
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // amount+1 acts as infinity
        dp[0] = 0; // base case: 0 coins needed to make amount 0

        // STEP 2 — LOOP: For each amount from 1 to target
        for (int d = 1; d <= amount; d++) {

            // STEP 3 — TRY EACH COIN: Which bus route gets me here cheapest?
            for (int coin : coins) {
                if (coin <= d) {
                    // STEP 4 — RECURRENCE: dp[d] = min(dp[d], dp[d - coin] + 1)
                    dp[d] = Math.min(dp[d], dp[d - coin] + 1); // 1 ride + rides to get to d-coin
                }
            }
        }

        // STEP 5 — RETURN: If still "impossible", return -1
        return dp[amount] > amount ? -1 : dp[amount];
    }

    /*
    // --- SKELETON ---
    // STORY: Bus rides. dp[d] = min(dp[d], dp[d - coin] + 1)
    public static int solveSkeleton(int[] coins, int amount) {
        int[] dp = new int[___];
        Arrays.fill(dp, ___);
        dp[0] = ___;

        for (int d = 1; d <= ___; d++) {
            for (int coin : ___) {
                if (___ <= d) {
                    dp[d] = Math.min(dp[___], dp[___ - ___] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[___];
    }
    */
}
