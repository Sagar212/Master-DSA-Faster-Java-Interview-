# Recall Notes: Core DP
- **Q: DP recipe?** → 1) Define state 2) Recurrence 3) Base case 4) Build up
- **Q: Top-down vs bottom-up?** → Top-down = recursion + memo. Bottom-up = iterative array.
- **Q: Coin change recurrence?** → `dp[amount] = min(dp[amount], dp[amount - coin] + 1)`
- **Q: LIS recurrence?** → `dp[i] = max(dp[j] + 1)` for all j < i where nums[j] < nums[i]
