
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


public class Test_day_5_maxVowels {
    public static int solve(String s, int k) {
    int vowelCount = 0, maxVowels = 0;
    
    // STEP 1 — BUILD: Count vowels in the first window of size K
    for (int i = 0; i < k; i++) if (isVowel(s.charAt(i))) vowelCount++;
    maxVowels = vowelCount;
    
    // STEP 2 — SLIDE: Move the window one step at a time
    for (int i = k; i < s.length(); i++) {
        if (isVowel(s.charAt(i))) vowelCount++;      // vowel enters from right → count up
        if (isVowel(s.charAt(i - k))) vowelCount--;  // vowel exits from left → count down
        
        // STEP 3 — TRACK: Is this window better than our best?
        maxVowels = Math.max(maxVowels, vowelCount);
    }
    
    // STEP 4 — RETURN
    return maxVowels;
}
private static boolean isVowel(char c) { return c=='a'||c=='e'||c=='i'||c=='o'||c=='u'; }
}
