import java.util.HashMap;
import java.util.Map;

public class ArraysHashMap_Pattern_Template {

    /*
     * PROBLEM: 
     *
     * PATTERN: Arrays + HashMap
     *
     * ====== MENTAL STORY ======
     * ...
     * ==========================================
     *
     * CORE IDEA:
     * TIME:
     * SPACE:
     */

    public static void main(String[] args) {
        // sample test cases with expected outputs in comments
    }

    public static int solve(int[] nums) {
        // STEP 1 — INIT: Create the map to remember what we've seen
        Map<Integer, Integer> seen = new HashMap<>(); // KEY = ?, VALUE = ?

        // STEP 2 — LOOP: Walk through each element
        for (int i = 0; i < nums.length; i++) {

            // STEP 3 — CHECK: Has the thing we NEED already been seen?
            // int need = target - nums[i];
            // if (seen.containsKey(need)) {
            //     return ...; // found → return result
            // }

            // STEP 4 — STORE: Not found → remember this element for the future
            // seen.put(nums[i], i);
        }

        // STEP 5 — RETURN
        return 0;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    public static int solveSkeleton(int[] nums) {
        // STEP 1 — INIT
        Map<___, ___> seen = new HashMap<>();

        // STEP 2 — LOOP
        for (int i = 0; i < ___; i++) {
            // STEP 3 — CHECK
            // STEP 4 — STORE
        }

        // STEP 5 — RETURN
        return ___;
    }
    */
}
