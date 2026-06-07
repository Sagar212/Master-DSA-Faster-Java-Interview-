
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


public class Test_day_5_longestNoRepeat {
    public static int solve(String s) {
    // STEP 1 — INIT: Set up the window tracking and pointer variables
    Set<Character> window = new HashSet<>();
    int left = 0, maxLen = 0;
    
    // STEP 2 — EXPAND: Move the right pointer to expand the window
    for (int right = 0; right < s.length(); right++) {
        char current = s.charAt(right);
        
        // STEP 3 — SHRINK: If duplicate exists, shrink left pointer until duplicate is removed
        while (window.contains(s.charAt(right))) {
            window.remove(s.charAt(left));
            left++; // shrink from left
        }
        
        // STEP 4 — ADD: It's now safe to add the current character to the window
        window.add(s.charAt(right));
        
        // STEP 5 — TRACK: The window is guaranteed valid (no duplicates) — update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    // STEP 6 — RETURN
    return maxLen;
}
}
