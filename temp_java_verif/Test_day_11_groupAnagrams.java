
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


public class Test_day_11_groupAnagrams {
    public static List<List<String>> solve(String[] strs) {
    // STEP 1 — INIT: Create the filing cabinet (HashMap)
    Map<String, List<String>> groups = new HashMap<>();

    // STEP 2 — LOOP: Go through each word in the pile
    for (String word : strs) {

        // STEP 3 — FINGERPRINT: Sort the letters to create a unique key
        char[] chars = word.toCharArray();
        Arrays.sort(chars);
        String fingerprint = new String(chars);

        // STEP 4 — STORE: File into the correct drawer
        if (!groups.containsKey(fingerprint)) {
            groups.put(fingerprint, new ArrayList<>());
        }
        groups.get(fingerprint).add(word);
    }

    // STEP 5 — RETURN: Return all drawers as a list of lists
    return new ArrayList<>(groups.values());
}
}
