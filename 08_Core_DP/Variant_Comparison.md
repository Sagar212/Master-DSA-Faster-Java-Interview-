# Variant Comparison: Core DP
## 1. Fibonacci-style — dp[n] = dp[n-1] + dp[n-2]. (Climbing Stairs)
## 2. Knapsack — For each item, include or exclude. dp[i][w] = max(include, exclude).
## 3. Unbounded Knapsack — Same item can be used multiple times. (Coin Change)
## 4. LIS — dp[i] = max(dp[j] + 1) for valid j < i. O(N²) or O(N log N) with patience sort.
