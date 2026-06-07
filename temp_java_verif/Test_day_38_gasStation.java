
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


public class Test_day_38_gasStation {
    public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalGas = 0, currentGas = 0, startIndex = 0;
    for (int i = 0; i < gas.length; i++) {
        int net = gas[i] - cost[i];
        totalGas += net;
        currentGas += net;
        if (currentGas < 0) {
            startIndex = i + 1;
            currentGas = 0;
        }
    }
    return totalGas >= 0 ? startIndex : -1;
}
}
