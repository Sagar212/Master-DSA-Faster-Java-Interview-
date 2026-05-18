# Recall Notes: Arrays + HashMap

Use these prompts for spaced repetition (Anki/Flashcards).

- **Q: What is the core paradigm of the HashMap pattern?**
  - **A**: Trading Space for Time. Using `O(N)` memory to reduce time complexity from `O(N^2)` to `O(N)`.
- **Q: In the Two Sum problem, why do we insert elements into the map AFTER checking for their complement?**
  - **A**: To prevent an element from matching with itself if the target is exactly double the element's value.
- **Q: What is the time complexity of `containsKey()` in Java?**
  - **A**: `O(1)` average case, `O(N)` worst case (in case of severe hash collisions).
- **Q: When should you prefer an `int[]` array over a `HashMap<Integer, Integer>`?**
  - **A**: When the keys are integers within a small, bounded, and known range (e.g., ASCII characters `new int[256]`, or frequencies of elements limited to `1..100`). It avoids autoboxing overhead and is purely `O(1)` with smaller constant factors.
