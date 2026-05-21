import java.util.HashMap;
import java.util.Map;

public class MinimumWindowSubstring {

    /*
     * PROBLEM: Minimum Window Substring (LeetCode #76)
     * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
     *
     * PATTERN: Sliding Window (Variable) + HashMap
     *
     * RECOGNITION SIGNALS:
     * - "Minimum window" or "Shortest Substring" → Variable Window looking for SHORTEST
     * - "Contain all characters" → frequency tracking with HashMap
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You're a DETECTIVE looking through a TELESCOPE at a long street of letter signs.
     * You have a SHOPPING LIST of letters you need to find (string t).
     *
     * 1. EXPAND: Keep widening the telescope to the RIGHT, collecting letters.
     *    Tick off letters from your shopping list as you find them.
     *
     * 2. ALL FOUND? When your telescope view contains ALL the letters on your list:
     *    - Record the current window size (it's a valid answer!)
     *    - Now try to SHRINK from the LEFT to see if a SMALLER window still works.
     *
     * 3. SHRINK: Move the LEFT edge in. Remove that letter from your collection.
     *    - Still have all needed letters? → Record the new (smaller!) size. Keep shrinking.
     *    - Missing a letter now? → Stop shrinking. Go back to expanding RIGHT.
     *
     * TRACKING:
     *   - "need" map   = shopping list (what t requires)
     *   - "have" map   = what's currently in our telescope window
     *   - "matched"    = how many UNIQUE characters are fully satisfied
     *   - "required"   = how many UNIQUE characters we need to satisfy
     *   - When matched == required → window is VALID
     *
     * WHERE TO UPDATE MIN?
     *   → INSIDE the shrink loop! Because the window is currently VALID and we want the shortest.
     * ==========================================
     *
     * CORE IDEA: Expand right until valid → Shrink left while still valid → Track shortest.
     *
     * TIME:  O(S + T) — each pointer moves forward only once
     * SPACE: O(1) — maps are bounded by alphabet size (constant)
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve("ADOBECODEBANC", "ABC")); // Expected: "BANC"
        System.out.println("Test 2: " + solve("a", "aa"));              // Expected: ""
    }

    public static String solve(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";

        // STEP 1 — INIT: Build the shopping list from t
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        int required = need.size();  // how many UNIQUE chars must be fully matched
        int matched = 0;             // how many unique chars ARE fully matched now

        // STEP 2 — INIT: Set up the window tracking
        Map<Character, Integer> have = new HashMap<>();
        int bestLen = Integer.MAX_VALUE;
        int bestStart = 0;
        int left = 0;

        // STEP 3 — EXPAND: Widen the telescope to the right, one character at a time
        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);
            have.put(rightChar, have.getOrDefault(rightChar, 0) + 1);

            // STEP 4 — CHECK: Did adding this char complete a shopping list requirement?
            if (need.containsKey(rightChar) && have.get(rightChar).intValue() == need.get(rightChar).intValue()) {
                matched++; // one more requirement fully satisfied
            }

            // STEP 5 — SHRINK: While ALL shopping list items are found → try shrinking from left
            while (matched == required) {

                // STEP 6 — TRACK: This is a valid window! Is it shorter than our best?
                int windowLen = right - left + 1;
                if (windowLen < bestLen) {
                    bestLen = windowLen;
                    bestStart = left;
                }

                // Remove the leftmost character from the window
                char leftChar = s.charAt(left);
                have.put(leftChar, have.get(leftChar) - 1);

                // Did removing this char break a shopping list requirement?
                if (need.containsKey(leftChar) && have.get(leftChar).intValue() < need.get(leftChar).intValue()) {
                    matched--; // lost a requirement → loop will exit
                }

                left++; // shrink window from left
            }
        }

        // STEP 7 — RETURN: Return the shortest valid window, or empty if none found
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Detective + telescope + shopping list. Expand → All found? → Shrink → Track shortest.
    public static String solveSkeleton(String s, String t) {
        // STEP 1 — INIT: Build the shopping list from t
        Map<Character, Integer> need = new HashMap<>();
        // ... populate need from t ...
        int required = ___;
        int matched = 0;

        // STEP 2 — INIT: Set up the window tracking
        Map<Character, Integer> have = new HashMap<>();
        int bestLen = Integer.MAX_VALUE;
        int bestStart = 0;
        int left = 0;

        // STEP 3 — EXPAND: Widen the telescope to the right, one character at a time
        for (int right = 0; right < ___; right++) {
            char rightChar = s.charAt(___);
            have.put(rightChar, have.getOrDefault(rightChar, 0) + 1);

            // STEP 4 — CHECK: Did adding this char complete a shopping list requirement?
            if (need.containsKey(___) && have.get(___).intValue() == need.get(___).intValue()) {
                ___;
            }

            // STEP 5 — SHRINK: While ALL shopping list items are found → try shrinking from left
            while (___ == ___) {

                // STEP 6 — TRACK: This is a valid window! Is it shorter than our best?
                int windowLen = ___ - ___ + 1;
                if (windowLen < ___) {
                    bestLen = ___;
                    bestStart = ___;
                }

                char leftChar = s.charAt(___);
                have.put(leftChar, have.get(leftChar) - 1);

                if (need.containsKey(___) && have.get(___).intValue() < need.get(___).intValue()) {
                    ___;
                }
                left++;
            }
        }

        // STEP 7 — RETURN: Return the shortest valid window, or empty if none found
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(___, ___);
    }
    */
}
