# Recall Notes: Two Pointers

Use these prompts for spaced repetition (Anki/Flashcards).

- **Q: What is the primary benefit of Two Pointers in an unsorted pair-sum problem?**
  - **A**: It is NOT useful directly. You must sort first (`O(N log N)`). If you need `O(N)`, use a HashMap instead. Two pointers shine when the array is *already* sorted or when finding pairs doesn't require extra space.
- **Q: How does the fast/slow pointer variant work for removing duplicates in place?**
  - **A**: `slow` points to the index of the last unique element. `fast` scans ahead. When `nums[fast] != nums[slow]`, increment `slow` and set `nums[slow] = nums[fast]`.
- **Q: What is the typical loop condition for opposite end pointers?**
  - **A**: `while (left < right)` (stops before they cross or meet).
