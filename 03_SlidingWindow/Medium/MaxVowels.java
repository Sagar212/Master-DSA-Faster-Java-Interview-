public class MaxVowels {

    /*
     * PROBLEM: Maximum Number of Vowels in a Substring of Given Length (LeetCode #1456)
     * Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k. Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
     *
     * PATTERN: Sliding Window (Fixed)
     *
     * RECOGNITION SIGNALS:
     * - "Substring" + "length k" → Fixed Window
     * - "Maximum number of..." → Tracking a count inside the window
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * Same magnifying glass as MaxAverageSubarray, but this time:
     *   - Instead of SUMMING numbers, you're COUNTING vowels.
     *
     * 1. BUILD: Count vowels in the first window of size K.
     * 2. SLIDE: Move glass one step right.
     *    - New char enters from right → if it's a vowel, count++
     *    - Old char exits from left  → if it was a vowel, count--
     * 3. TRACK: Is the new count better than our best?
     *
     * SAME EXACT TEMPLATE as MaxAverage, just replace "sum" with "vowel count"!
     * ==========================================
     *
     * CORE IDEA: Fixed window. Track vowel count. Slide: +right vowel, -left vowel.
     *
     * TIME:  O(N) — one pass
     * SPACE: O(1) — just a few variables
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve("abciiidef", 3)); // Expected: 3
        System.out.println("Test 2: " + solve("aeiou", 2));     // Expected: 2
    }

    public static int solve(String s, int k) {
        int vowelCount = 0;
        int maxVowels = 0;

        // STEP 1 — BUILD: Count vowels in the first window of size K
        for (int i = 0; i < k; i++) {
            if (isVowel(s.charAt(i))) vowelCount++;
        }
        maxVowels = vowelCount;

        // STEP 2 — SLIDE: Move the window one step at a time
        for (int i = k; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) vowelCount++;       // vowel enters from right → count up
            if (isVowel(s.charAt(i - k))) vowelCount--;   // vowel exits from left → count down

            // STEP 3 — TRACK: Is this window better than our best?
            maxVowels = Math.max(maxVowels, vowelCount);
        }

        // STEP 4 — RETURN
        return maxVowels;
    }

    // Helper: check if a character is a vowel
    private static boolean isVowel(char c) {
        return "aeiou".indexOf(c) != -1;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Same magnifying glass. Count vowels instead of summing numbers.
    public static int solveSkeleton(String s, int k) {
        int vowelCount = 0;
        int maxVowels = 0;

        // STEP 1 — BUILD: Count vowels in the first window of size K
        for (int i = 0; i < ___; i++) {
            if (___) vowelCount++;
        }
        maxVowels = vowelCount;

        // STEP 2 — SLIDE: Move the window one step at a time
        for (int i = ___; i < s.length(); i++) {
            if (___) vowelCount++;   // vowel enters from right → count up
            if (___) vowelCount--;   // vowel exits from left → count down

            // STEP 3 — TRACK: Is this window better than our best?
            maxVowels = Math.max(___, ___);
        }

        // STEP 4 — RETURN
        return ___;
    }
    */
}
