# Pattern Recognition: Sliding Window

Look for these signals to know when to use the Sliding Window pattern:

## Explicit Signals
- **"Contiguous Subarray" or "Substring"**: This is the massive glaring signal. If the problem asks for a contiguous sequence, Sliding Window is the prime candidate.
- **"Longest", "Shortest", "Maximum", "Minimum"**: Combined with subarray/substring, this almost guarantees Sliding Window.
- **"Size K"**: Whenever the problem asks for a subarray of exactly size K.

## Implicit Signals
- **Running sums or frequencies**: If you're doing nested loops where the inner loop recalculates the sum of elements that the previous iteration *already calculated*, you have overlapping work. A window fixes this.
- **"Contains all characters of..."**: Problems like Minimum Window Substring ask you to maintain a frequency map of characters inside a sliding boundary.
