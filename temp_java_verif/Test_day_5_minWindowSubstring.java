
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


public class Test_day_5_minWindowSubstring {
    public static String solve(String s, String t) {
    // STEP 1 — INIT: Build the shopping list from t
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
    int required = need.size(); // how many UNIQUE chars must be fully matched
    int matched = 0;            // how many unique chars ARE fully matched now
    
    // STEP 2 — INIT: Set up the window tracking
    Map<Character, Integer> have = new HashMap<>();
    int bestLen = Integer.MAX_VALUE, bestStart = 0, left = 0;
    
    // STEP 3 — EXPAND: Widen the telescope to the right, one character at a time
    for (int right = 0; right < s.length(); right++) {
        char r = s.charAt(right);
        have.put(r, have.getOrDefault(r, 0) + 1);
        
        // STEP 4 — CHECK: Did adding this char complete a shopping list requirement?
        if (need.containsKey(r) && have.get(r).intValue() == need.get(r).intValue()) matched++; // one more requirement satisfied
        
        // STEP 5 — SHRINK: While ALL shopping list items are found → try shrinking from left
        while (matched == required) {
            
            // STEP 6 — TRACK: This is a valid window! Is it shorter than our best?
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1; bestStart = left;
            }
            
            // Remove the leftmost character from the window
            char l = s.charAt(left);
            have.put(l, have.get(l) - 1);
            
            // Did removing this char break a shopping list requirement?
            if (need.containsKey(l) && have.get(l).intValue() < need.get(l).intValue()) matched--; // lost a requirement → loop will exit
            left++; // shrink window from left
        }
    }
    
    // STEP 7 — RETURN: Return the shortest valid window, or empty if none found
    return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
}
}
