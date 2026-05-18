# 🧠 Mental Story Visualization — Two Pointers

> **ONE SENTENCE TO REMEMBER**: "Two people walking toward each other on a sorted road — move the one that fixes the problem."

---

## 🎯 The Pattern Story: Two People on a Sorted Road

Imagine a sorted row of items. Place one person at each END.
They walk TOWARD each other. At each step, evaluate:
- Too small? → Move the LEFT person right (bigger values)
- Too big? → Move the RIGHT person left (smaller values)
- Just right? → DONE!

---

## 📗 Easy: TwoSumII — "Shortest + Tallest Kid"

```
Kids sorted by height: [2, 7, 11, 15], target = 9

left=2, right=15 → sum=17 → too big → right--
left=2, right=11 → sum=13 → too big → right--
left=2, right=7  → sum=9  → MATCH! → return [1, 2]
```

**Remember**: left++ increases sum. right-- decreases sum.

---

## 📗 Easy: Valid Palindrome — "Two Friends on a Banner"

```
Friend A (left)  → reads from LEFT, skips junk
Friend B (right) → reads from RIGHT, skips junk

A='A', B='a' → match (case-insensitive) → both step inward
... all match → IS a palindrome!
```

**Remember**: Skip junk + compare lowercase. Check `left < right` in skip loops!

---

## 📙 Medium: ThreeSum — "Anchor + TwoSumII"

```
Sort → Pick anchor → Run TwoSumII on the rest → Skip duplicates
3Sum = for each anchor, solve TwoSumII.
```

---

## 📕 Hard: Trapping Rain Water — "Bathtub Walls"

```
Water at any spot = min(leftMax, rightMax) - height
Always process the SHORTER side (it's the bottleneck).
```

**Remember**: Process shorter side. Water = maxBoundary - currentHeight.
