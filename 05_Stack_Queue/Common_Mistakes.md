# Common Mistakes: Stack / Queue
1. **Popping from empty stack** → Always check `!stack.isEmpty()` before `stack.pop()`.
2. **Storing values instead of indices** in monotonic stack → You need INDICES to calculate distances.
3. **Not handling remaining items** → After the loop, items left on stack may still need processing.
