public class ValidPalindrome {

    /*
     * PROBLEM: Valid Palindrome (LeetCode #125)
     * Given a string s, return true if it is a palindrome (only alphanumeric, ignore case).
     *
     * PATTERN: Two Pointers (Opposite Ends)
     *
     * RECOGNITION SIGNALS:
     * - "Palindrome" keyword → instant Two Pointers signal
     * - Checking symmetry of a sequence
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You have a WORD written on a BANNER. You stand at BOTH ENDS with two friends.
     * 
     * Friend A reads from the LEFT. Friend B reads from the RIGHT.
     * They skip over any spaces, commas, colons (non-letters).
     * At each step, they compare their letters (ignoring uppercase).
     *   - MATCH?    → Both step inward.
     *   - MISMATCH? → "NOT a palindrome!" — stop immediately.
     *   - They meet in the middle without mismatching? → "It IS a palindrome!"
     * ==========================================
     *
     * CORE IDEA: Compare chars from outside-in, skip junk, ignore case.
     *
     * TIME:  O(N) — one pass through the string
     * SPACE: O(1) — only two pointer variables
     *
     * COMMON MISTAKES:
     * - Forgetting `left < right` check INSIDE the skip loops → out of bounds!
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println("Test 2: " + solve("race a car"));                     // Expected: false
    }

    public static boolean solve(String s) {
        // STEP 1 — INIT: Place pointers at both ends of the string
        int left = 0;
        int right = s.length() - 1;

        // STEP 2 — LOOP: Walk inward until the two friends meet
        while (left < right) {

            // STEP 3 — SKIP: Jump over non-alphanumeric junk on both sides
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++; // junk on left → skip it
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--; // junk on right → skip it
            }

            // STEP 4 — CHECK: Compare the two valid characters (case-insensitive)
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false; // mismatch → NOT a palindrome
            }

            // STEP 5 — MOVE: Both matched → step inward
            left++;
            right--;
        }

        // STEP 6 — RETURN: All matched → IS a palindrome
        return true;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Two friends at each end of a banner, skipping junk, comparing letters.
    public static boolean solveSkeleton(String s) {
        // STEP 1 — INIT
        int left = ___;
        int right = ___;

        // STEP 2 — LOOP
        while (___ < ___) {

            // STEP 3 — SKIP
            while (___ < ___ && !Character.isLetterOrDigit(___)) ___;
            while (___ < ___ && !Character.isLetterOrDigit(___)) ___;

            // STEP 4 — CHECK
            if (Character.toLowerCase(___) != Character.toLowerCase(___)) {
                return false;
            }

            // STEP 5 — MOVE
            ___;
            ___;
        }

        // STEP 6 — RETURN
        return true;
    }
    */
}
