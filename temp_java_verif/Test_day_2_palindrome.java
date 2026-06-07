
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


public class Test_day_2_palindrome {
    public static boolean solve(String s) {
    // STEP 1 — INIT: Place pointers at both ends of the string
    int left = 0;
    int right = s.length() - 1;
    
    // STEP 2 — LOOP: Walk inward until the two friends meet
    while (left < right) {
        
        // STEP 3 — SKIP: Jump over non-alphanumeric junk on both sides
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++; // junk on left → skip it
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--; // junk on right → skip it
        
        // STEP 4 — CHECK: Compare the two valid characters (case-insensitive)
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
            return false; // mismatch → NOT a palindrome
        
        // STEP 5 — MOVE: Both matched → step inward
        left++; right--;
    }
    
    // STEP 6 — RETURN: All matched → IS a palindrome
    return true;
}
}
