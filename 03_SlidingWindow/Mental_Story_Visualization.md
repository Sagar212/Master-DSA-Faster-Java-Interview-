# 🧠 Mental Story Visualization — Sliding Window

> **ONE SENTENCE TO REMEMBER**: "A magnifying glass sliding across data — add right, remove left, track the best."

---

## 📗 Easy: Max Average Subarray — "Magnifying Glass on Numbers"
BUILD first window → SLIDE (+right, -left) → TRACK best.

## 📙 Medium: Max Vowels — "Counting Jewels in the Glass"
Same as above, just count vowels instead of summing numbers.

## 📕 Hard: Minimum Window Substring — "Detective Telescope + Shopping List"
EXPAND until valid → SHRINK while still valid (track min INSIDE shrink) → keep going.

**WHERE to update min?**
- SHORTEST → update INSIDE the shrink loop
- LONGEST → update OUTSIDE/AFTER the shrink loop
