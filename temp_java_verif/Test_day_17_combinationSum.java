
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


public class Test_day_17_combinationSum {
    public void backtrack(List<List<Integer>> res, List<Integer> curr, int[] nums, int remain, int start) {
    if (remain < 0) return;
    if (remain == 0) {
        res.add(new ArrayList<>(curr));
        return;
    }
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(res, curr, nums, remain - nums[i], i);
        curr.remove(curr.size() - 1);
    }
}
}
