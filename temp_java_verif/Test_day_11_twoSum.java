
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


public class Test_day_11_twoSum {
    public static int[] solve(int[] nums, int target) {
    // STEP 1 — INIT: Create guest book (HashMap)
    Map<Integer, Integer> guestBook = new HashMap<>();

    // STEP 2 — LOOP: Go through each guest at the party
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];

        // STEP 3 — CHECK: Has my dance partner already signed in?
        if (guestBook.containsKey(need)) {
            return new int[] { guestBook.get(need), i };
        }

        // STEP 4 — STORE: Sign myself into the guest book
        guestBook.put(nums[i], i);
    }

    return new int[] {};
}
}
