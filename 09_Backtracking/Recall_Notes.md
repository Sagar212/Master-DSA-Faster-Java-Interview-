# Recall Notes: Backtracking
- **Q: Backtracking template?** → CHOOSE → EXPLORE → UNCHOOSE
- **Q: Subsets vs Permutations?** → Subsets: use start index. Permutations: use boolean[] used.
- **Q: How to avoid duplicates?** → Sort first + skip `if (i > start && nums[i] == nums[i-1])`.
