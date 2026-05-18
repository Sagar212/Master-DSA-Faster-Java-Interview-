# Common Mistakes: Core DP
1. **Not identifying the state** → Always define what dp[i] MEANS before coding.
2. **Wrong base case** → dp[0] is usually 0 or 1. Think carefully.
3. **Wrong recurrence direction** → Bottom-up: iterate forward. Top-down: recurse backward.
4. **Using recursion without memo** → Exponential blowup. Always memoize.
