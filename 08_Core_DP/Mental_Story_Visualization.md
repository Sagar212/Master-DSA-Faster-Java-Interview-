# 🧠 Mental Story Visualization — Core DP

> **ONE SENTENCE TO REMEMBER**: "Don't solve the same puzzle twice — save the answer in a notebook (memo) and look it up next time."

---

## 📗 Easy: Climbing Stairs — "How many ways to climb N stairs taking 1 or 2 steps?"
At step N, you could have come from step N-1 (1 step) or N-2 (2 steps).
`ways(N) = ways(N-1) + ways(N-2)` — it's Fibonacci!

## 📙 Medium: Coin Change — "Fewest coins to make amount?"
For each amount, try every coin. `dp[amount] = min(dp[amount], dp[amount - coin] + 1)`.
Like choosing the least number of bus rides to reach your destination.

## 📕 Hard: Longest Increasing Subsequence — "Longest chain of rising dominoes?"
For each element, check all previous elements. If smaller, extend their chain.
`dp[i] = max(dp[j] + 1)` for all j < i where nums[j] < nums[i].
