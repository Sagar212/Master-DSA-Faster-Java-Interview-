import java.util.HashMap;
import java.util.Map;

public class CountOccurrences {

    /*
     * PROBLEM: Count Occurrences / Frequency Counter
     * Given an array, count how many times each element appears.
     * This is the FOUNDATION technique used in dozens of other problems.
     *
     * PATTERN: Arrays + HashMap (Frequency Map)
     *
     * RECOGNITION SIGNALS:
     * - "How many times does X appear?"
     * - "Most/least frequent element"
     * - "Duplicates" or "unique count"
     * - Preprocessing step for Top K, Anagram grouping, etc.
     *
     * ====== MENTAL STORY ======
     * VOTING BOOTH. People walk in and cast their vote.
     * The BALLOT BOX (HashMap) tracks how many votes each candidate got.
     *   - KEY   = candidate name (element)
     *   - VALUE = vote count (frequency)
     *
     * Each person votes → if candidate already in the box, increment count.
     *                    → if new candidate, start count at 1.
     * At the end, you can answer ANY frequency question instantly.
     * ==========================================
     *
     * CORE IDEA: Loop through array, use map.getOrDefault(key, 0) + 1 to count.
     *
     * TIME:  O(N) — one pass through the array
     * SPACE: O(N) — storing frequencies
     *
     * WHERE THIS IS USED:
     * - Top K Frequent (07_Heap) → build frequency map FIRST, then heap
     * - Group Anagrams → frequency as fingerprint
     * - Valid Sudoku → check if duplicate exists in row/col/box
     * - Majority Element → find element with count > N/2
     */

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 2, 3, 3, 3};
        System.out.println("Test 1: " + solve(nums1)); // Expected: {1=1, 2=2, 3=3}

        String s = "hello";
        System.out.println("Test 2: " + solveString(s)); // Expected: {h=1, e=1, l=2, o=1}
    }

    // --- VERSION 1: Count frequency of integers ---
    public static Map<Integer, Integer> solve(int[] nums) {
        // STEP 1 — INIT: Create the ballot box
        Map<Integer, Integer> freq = new HashMap<>();

        // STEP 2 — LOOP: Each person casts their vote
        for (int num : nums) {
            // STEP 3 — COUNT: Increment the vote count for this candidate
            freq.put(num, freq.getOrDefault(num, 0) + 1);
            // getOrDefault → "if never voted before, start at 0, then add 1"
        }

        // STEP 4 — RETURN: The complete vote tally
        return freq;
    }

    // --- VERSION 2: Count frequency of characters in a string ---
    public static Map<Character, Integer> solveString(String s) {
        // STEP 1 — INIT: Create the ballot box
        Map<Character, Integer> freq = new HashMap<>();

        // STEP 2 — LOOP: Each character casts a vote
        for (char c : s.toCharArray()) {
            // STEP 3 — COUNT: Increment
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        // STEP 4 — RETURN
        return freq;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Voting booth. Each element votes. Count the ballots.
    // THIS IS THE MOST REUSABLE SNIPPET IN ALL OF DSA!
    public static Map<Integer, Integer> solveSkeleton(int[] nums) {
        // STEP 1 — INIT
        Map<___, ___> freq = new HashMap<>();

        // STEP 2 — LOOP
        for (int num : ___) {
            // STEP 3 — COUNT
            freq.put(___, freq.getOrDefault(___, 0) + 1);
        }

        // STEP 4 — RETURN
        return freq;
    }
    */
}
