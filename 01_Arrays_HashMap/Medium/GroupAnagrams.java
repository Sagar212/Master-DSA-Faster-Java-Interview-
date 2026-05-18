import java.util.*;

public class GroupAnagrams {

    /*
     * PROBLEM: Group Anagrams (LeetCode #49)
     * Given an array of strings strs, group the anagrams together.
     *
     * PATTERN: Arrays + HashMap
     *
     * RECOGNITION SIGNALS:
     * - Need to find relations between strings based on character frequencies
     * - Grouping items by a common property
     *
     * ====== MENTAL STORY (Imagine this!) ======
     * You have a pile of SCRAMBLED words ("eat", "tea", "ate").
     * You need to group words that use the EXACT SAME letters.
     *
     * TRICK: If you SORT the letters of each word alphabetically:
     *   "eat" → "aet"
     *   "tea" → "aet"
     *   "ate" → "aet"
     * They ALL become the same key! Like a fingerprint.
     *
     * So you create a filing cabinet (HashMap):
     *   - The DRAWER LABEL (key) = sorted word (fingerprint)
     *   - INSIDE THE DRAWER (value) = list of all original words with that fingerprint
     * ==========================================
     *
     * CORE IDEA: Sort each word to get its "fingerprint". Group by fingerprint.
     *
     * TIME:  O(N × K log K) — N words, each sorted in K log K
     * SPACE: O(N × K) — storing all words in the map
     *
     * COMMON MISTAKES:
     * - Comparing words character by character in nested loops → O(N^2)
     * - Not initializing the ArrayList when encountering a new key
     */

    public static void main(String[] args) {
        String[] strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println("Test 1: " + solve(strs1)); // Expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
    }

    public static List<List<String>> solve(String[] strs) {
        // STEP 1 — INIT: Create the filing cabinet (HashMap)
        Map<String, List<String>> groups = new HashMap<>(); // KEY = fingerprint, VALUE = list of words

        // STEP 2 — LOOP: Go through each word in the pile
        for (String word : strs) {

            // STEP 3 — CHECK: Create the fingerprint (sort the letters)
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String fingerprint = new String(chars);

            // STEP 4 — STORE: Open the correct drawer. Create it if it doesn't exist.
            if (!groups.containsKey(fingerprint)) {
                groups.put(fingerprint, new ArrayList<>()); // new fingerprint → new drawer
            }
            groups.get(fingerprint).add(word); // drop the word into the right drawer

        }

        // STEP 5 — RETURN: Return all the drawers as a list of lists
        return new ArrayList<>(groups.values());
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Filing cabinet. Sort word → fingerprint → file into drawer.
    public static List<List<String>> solveSkeleton(String[] strs) {
        // STEP 1 — INIT
        Map<___, ___> groups = new HashMap<>();

        // STEP 2 — LOOP
        for (String word : ___) {

            // STEP 3 — CHECK (create fingerprint)
            char[] chars = ___;
            Arrays.sort(___);
            String fingerprint = ___;

            // STEP 4 — STORE
            if (!groups.containsKey(___)) {
                groups.put(___, ___);
            }
            groups.get(___).add(___);
        }

        // STEP 5 — RETURN
        return new ArrayList<>(___);
    }
    */
}
