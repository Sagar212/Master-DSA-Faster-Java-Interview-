import java.util.HashSet;
import java.util.Set;

public class LongestSubstringWithoutRepeating {

    /*
     * PROBLEM: Longest Substring Without Repeating Characters (LeetCode #3)
     * Given a string s, find the length of the longest substring without repeating characters.
     *
     * PATTERN: Sliding Window (Variable Length)
     *
     * RECOGNITION SIGNALS:
     * - "Longest substring..." or "longest contiguous subarray"
     * - Characters must be unique (checking duplicates)
     * - Variable window size dynamically expands and shrinks
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * Imagine a high-end CLUB with a strict "NO DUPLICATES allowed inside" bouncer rule.
     * 
     * People are entering one by one from the right (right pointer).
     * 
     * 1. EXPAND: A new person wants to enter.
     * 2. CHECK & SHRINK: Oh no! The bouncer sees that someone with the exact same name (character) 
     *    is ALREADY inside the club.
     *    To maintain the rule, the bouncer goes to the very front of the line (left pointer) and kicks 
     *    people out of the club ONE BY ONE until the original duplicate person has left.
     *    Once the duplicate is gone, the new person is safe to enter!
     * 3. TRACK BEST: Now that the club has no duplicates, count how many people are inside (right - left + 1).
     *    Compare this count against your historic high.
     * ==========================================
     *
     * CORE IDEA: Dynamically expand right pointer. Shrink left pointer whenever a duplicate character is found.
     *
     * TIME:  O(N) — each character enters the set once and exits the set at most once
     * SPACE: O(Min(M, N)) — hash set size is capped by size of the string or the character alphabet
     */

    public static void main(String[] args) {
        String test1 = "abcabcbb";
        System.out.println("Test 1 (\"abcabcbb\"): " + solve(test1)); // Expected: 3 ("abc")

        String test2 = "bbbbb";
        System.out.println("Test 2 (\"bbbbb\"): " + solve(test2)); // Expected: 1 ("b")

        String test3 = "pwwkew";
        System.out.println("Test 3 (\"pwwkew\"): " + solve(test3)); // Expected: 3 ("wke")
    }

    public static int solve(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0;
        int maxLen = 0;

        // STEP 1 — EXPAND: Move the right pointer to expand the window
        for (int right = 0; right < s.length(); right++) {
            char current = s.charAt(right);

            // STEP 2 — SHRINK: If duplicate exists, shrink left pointer until duplicate is removed
            while (window.contains(current)) {
                window.remove(s.charAt(left));
                left++; // shrink from left
            }

            // STEP 3 — ADD: It's now safe to add the current character to the window
            window.add(current);

            // STEP 4 — TRACK: The window is guaranteed valid (no duplicates) — update max length
            maxLen = Math.max(maxLen, right - left + 1);
        }

        // STEP 5 — RETURN
        return maxLen;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Club bouncer. If duplicate enters, kick leftmost out until set has no duplicates.
    public static int solveSkeleton(String s) {
        Set<Character> window = new HashSet<>();
        int left = ___, maxLen = ___;

        // STEP 1 — EXPAND: Move the right pointer to expand the window
        for (int right = 0; right < ___; right++) {
            // STEP 2 — SHRINK: If duplicate exists, shrink left pointer until duplicate is removed
            while (window.contains(___)) {
                window.remove(___);
                ___;
            }
            // STEP 3 — ADD: It's now safe to add the current character to the window
            window.add(___);
            // STEP 4 — TRACK: The window is guaranteed valid (no duplicates) — update max length
            maxLen = Math.max(___, ___);
        }
        // STEP 5 — RETURN
        return ___;
    }
    */
}
