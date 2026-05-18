import java.util.Stack;

public class DailyTemperatures {

    /*
     * PROBLEM: Daily Temperatures (LeetCode #739)
     * Given daily temperatures, return how many days you must wait for a warmer temperature.
     *
     * PATTERN: Monotonic Stack (Decreasing)
     *
     * ====== MENTAL STORY ======
     * WAITING IN LINE for a warmer day.
     * People (days) stand in a queue. Each holds their temperature.
     * When a WARMER person arrives, they "answer" everyone cooler waiting in line.
     *
     * Stack stores INDICES (not values) of days still waiting.
     * When a warmer temp arrives → pop all cooler days, calculate wait time.
     * ==========================================
     *
     * TIME:  O(N) — each index pushed/popped at most once
     * SPACE: O(N)
     */

    public static void main(String[] args) {
        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};
        int[] result = solve(temps);
        // Expected: [1, 1, 4, 2, 1, 1, 0, 0]
        for (int r : result) System.out.print(r + " ");
    }

    public static int[] solve(int[] temperatures) {
        int[] answer = new int[temperatures.length];

        // STEP 1 — INIT: Stack of INDICES of days waiting for warmer weather
        Stack<Integer> waiting = new Stack<>();

        // STEP 2 — LOOP: Go through each day
        for (int today = 0; today < temperatures.length; today++) {

            // STEP 3 — CHECK: Is today warmer than the day at top of the stack?
            while (!waiting.isEmpty() && temperatures[today] > temperatures[waiting.peek()]) {
                int coldDay = waiting.pop();
                answer[coldDay] = today - coldDay; // wait time = today - that day
            }

            // STEP 4 — STORE: Push today onto the stack (still waiting)
            waiting.push(today);
        }

        // STEP 5 — RETURN
        return answer;
    }

    /*
    // --- SKELETON ---
    // STORY: Waiting in line. Warmer day arrives → pop cooler days, calculate wait.
    public static int[] solveSkeleton(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        Stack<Integer> waiting = new Stack<>();

        for (int today = 0; today < ___; today++) {
            while (!waiting.isEmpty() && temperatures[___] > temperatures[waiting.peek()]) {
                int coldDay = waiting.pop();
                answer[coldDay] = ___ - ___;
            }
            waiting.push(___);
        }
        return answer;
    }
    */
}
