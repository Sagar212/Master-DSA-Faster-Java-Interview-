
import java.util.*;


import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


public class Test_day_11_subarraySum {
    public static int solve(int[] nums, int k) {
    int count = 0;
    int runningSum = 0;

    // STEP 1 — INIT: Create logbook of prefix sums
    Map<Integer, Integer> logbook = new HashMap<>();

    // STEP 2 — SEED: Distance 0 happened 1 time
    logbook.put(0, 1);

    // STEP 3 — LOOP: Walk the road
    for (int num : nums) {
        runningSum += num;

        // STEP 4 — CHECK: Gap = runningSum - k. In logbook?
        if (logbook.containsKey(runningSum - k)) {
            count += logbook.get(runningSum - k);
        }

        // STEP 5 — STORE: Record this milestone
        logbook.put(runningSum, logbook.getOrDefault(runningSum, 0) + 1);
    }

    // STEP 6 — RETURN
    return count;
}
}
