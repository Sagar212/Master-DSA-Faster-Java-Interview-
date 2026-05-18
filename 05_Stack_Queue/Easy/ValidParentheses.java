import java.util.Stack;
import java.util.HashMap;
import java.util.Map;

public class ValidParentheses {

    /*
     * PROBLEM: Valid Parentheses (LeetCode #20)
     * Given a string containing '(', ')', '{', '}', '[', ']', determine if it is valid.
     *
     * PATTERN: Stack
     *
     * ====== MENTAL STORY ======
     * MATCHING SOCKS from a laundry pile.
     * You pick up socks one by one:
     * - LEFT sock (opener) → throw it onto the pile (push to stack)
     * - RIGHT sock (closer) → check if it matches the sock on TOP of the pile
     *   - MATCH → remove the pair (pop). 
     *   - MISMATCH → INVALID!
     * End: pile should be EMPTY (all matched).
     * ==========================================
     *
     * TIME:  O(N)
     * SPACE: O(N)
     */

    public static void main(String[] args) {
        System.out.println("Test 1: " + solve("()"));     // Expected: true
        System.out.println("Test 2: " + solve("()[]{}"));  // Expected: true
        System.out.println("Test 3: " + solve("(]"));      // Expected: false
    }

    public static boolean solve(String s) {
        // STEP 1 — INIT: Create the sock pile (stack) and a matching guide
        Stack<Character> pile = new Stack<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put('}', '{');
        pairs.put(']', '[');

        // STEP 2 — LOOP: Go through each character
        for (char c : s.toCharArray()) {

            // STEP 3 — CHECK: Is it a closer (right sock)?
            if (pairs.containsKey(c)) {
                char top = pile.isEmpty() ? '#' : pile.pop();
                if (top != pairs.get(c)) {
                    return false; // mismatch → invalid
                }
            } else {
                // STEP 4 — STORE: It's an opener → throw onto the pile
                pile.push(c);
            }
        }

        // STEP 5 — RETURN: Pile should be empty (all socks matched)
        return pile.isEmpty();
    }

    /*
    // --- SKELETON ---
    // STORY: Matching socks. Opener → push. Closer → pop and compare.
    public static boolean solveSkeleton(String s) {
        Stack<Character> pile = new Stack<>();
        // STEP 1 — INIT pairs map

        // STEP 2 — LOOP
        for (char c : s.toCharArray()) {
            // STEP 3 — CHECK: closer?
            if (pairs.containsKey(___)) {
                char top = pile.isEmpty() ? '#' : pile.pop();
                if (top != ___) return false;
            } else {
                // STEP 4 — STORE: opener
                pile.push(___);
            }
        }
        // STEP 5 — RETURN
        return pile.isEmpty();
    }
    */
}
