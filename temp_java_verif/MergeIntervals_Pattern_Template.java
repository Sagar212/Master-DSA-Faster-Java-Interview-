import java.util.*;
public class MergeIntervals_Pattern_Template {
    public static int[][] solve(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        // STEP 1 — SORT: Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> merged = new ArrayList<>();
        int[] currentInterval = intervals[0];
        merged.add(currentInterval);
        
        // STEP 2 — LOOP: Iterate through the remaining intervals
        for (int[] nextInterval : intervals) {
            int currentEnd = currentInterval[1];
            int nextStart = nextInterval[0];
            int nextEnd = nextInterval[1];
            
            // STEP 3 — CHECK OVERLAP: If they overlap, merge them
            if (currentEnd >= nextStart) {
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                // STEP 4 — NO OVERLAP: Add next interval to the list and update current
                currentInterval = nextInterval;
                merged.add(currentInterval);
            }
        }
        
        // STEP 5 — RETURN: Convert list to 2D array
        return merged.toArray(new int[merged.size()][]);
    }
}
class ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }
class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }
