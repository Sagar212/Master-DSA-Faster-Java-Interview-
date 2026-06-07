
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


public class Test_day_11_validSudoku {
    public static boolean solve(char[][] board) {
    // STEP 1 — INIT: Create 3 sets of guest books
    Set<Character>[] rows = new HashSet[9];
    Set<Character>[] cols = new HashSet[9];
    Set<Character>[] boxes = new HashSet[9];
    for (int i = 0; i < 9; i++) {
        rows[i] = new HashSet<>();
        cols[i] = new HashSet<>();
        boxes[i] = new HashSet<>();
    }

    // STEP 2 — LOOP: Check in each guest (cell)
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            char num = board[row][col];

            // STEP 3 — SKIP: Empty cells
            if (num == '.') continue;

            // STEP 4 — BOX INDEX
            int boxIndex = (row / 3) * 3 + (col / 3);

            // STEP 5 — CHECK: Duplicate in any guest book?
            if (rows[row].contains(num) || cols[col].contains(num) || boxes[boxIndex].contains(num)) {
                return false;
            }

            // STEP 6 — STORE: Register in all 3 books
            rows[row].add(num);
            cols[col].add(num);
            boxes[boxIndex].add(num);
        }
    }

    // STEP 7 — RETURN: No duplicates
    return true;
}
}
