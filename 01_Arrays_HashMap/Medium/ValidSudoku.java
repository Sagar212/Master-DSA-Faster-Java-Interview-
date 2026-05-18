import java.util.HashSet;
import java.util.Set;

public class ValidSudoku {

    /*
     * PROBLEM: Valid Sudoku (LeetCode #36)
     * Determine if a 9×9 Sudoku board is valid. Only filled cells need to be validated.
     * Rules: Each row, column, and 3×3 box must contain digits 1-9 without repetition.
     *
     * PATTERN: Arrays + HashMap/HashSet (Duplicate Detection)
     *
     * RECOGNITION SIGNALS:
     * - "No duplicates" in specific groups → HashSet for O(1) duplicate check
     * - Multiple overlapping groups (rows, cols, boxes) to validate
     *
     * ====== MENTAL STORY ======
     * HOTEL CHECK-IN with 3 rules:
     *   1. No two guests with the same name on the same FLOOR (row)
     *   2. No two guests with the same name in the same WING (column)
     *   3. No two guests with the same name in the same SUITE (3×3 box)
     *
     * As each guest checks in, you look them up in 3 GUEST BOOKS (HashSets):
     *   - Floor guest book (one per row)
     *   - Wing guest book (one per column)
     *   - Suite guest book (one per 3×3 box)
     *
     * If a name already exists in ANY of the 3 books → DUPLICATE → INVALID!
     *
     * BOX INDEX TRICK: For cell (row, col), which 3×3 box is it in?
     *   boxIndex = (row / 3) * 3 + (col / 3)
     *   This maps 9 possible (row/3, col/3) combos → indices 0-8.
     * ==========================================
     *
     * CORE IDEA: For each cell, check 3 HashSets (row, col, box). If duplicate → invalid.
     *
     * TIME:  O(1) — board is always 9×9 = 81 cells (constant)
     * SPACE: O(1) — at most 9×3 = 27 HashSets, each with at most 9 items (constant)
     *
     * COMMON MISTAKES:
     * - Forgetting the box index formula: (row / 3) * 3 + (col / 3)
     * - Not skipping empty cells ('.')
     */

    public static void main(String[] args) {
        char[][] board = {
            {'5','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };
        System.out.println("Test 1: " + solve(board)); // Expected: true
    }

    @SuppressWarnings("unchecked")
    public static boolean solve(char[][] board) {
        // STEP 1 — INIT: Create 3 sets of guest books (9 rows, 9 cols, 9 boxes)
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

                // STEP 3 — SKIP: Empty cells don't need validation
                if (num == '.') continue;

                // STEP 4 — BOX INDEX: Which 3×3 suite is this cell in?
                int boxIndex = (row / 3) * 3 + (col / 3);

                // STEP 5 — CHECK: Does this number already exist in any of the 3 guest books?
                if (rows[row].contains(num) || cols[col].contains(num) || boxes[boxIndex].contains(num)) {
                    return false; // duplicate found → INVALID
                }

                // STEP 6 — STORE: Register this number in all 3 guest books
                rows[row].add(num);
                cols[col].add(num);
                boxes[boxIndex].add(num);
            }
        }

        // STEP 7 — RETURN: No duplicates found in any group
        return true;
    }

    /*
    // --- SKELETON FOR ACTIVE RECALL ---
    // STORY: Hotel check-in. 3 guest books (row, col, box). Duplicate in any = invalid.
    // KEY FORMULA: boxIndex = (row / 3) * 3 + (col / 3)
    public static boolean solveSkeleton(char[][] board) {
        // STEP 1 — INIT: 3 arrays of 9 HashSets
        Set<Character>[] rows = new HashSet[___];
        Set<Character>[] cols = new HashSet[___];
        Set<Character>[] boxes = new HashSet[___];
        // ... initialize each ...

        // STEP 2 — LOOP
        for (int row = 0; row < ___; row++) {
            for (int col = 0; col < ___; col++) {
                char num = board[___][___];
                if (num == ___) continue; // skip empty

                // STEP 4 — BOX INDEX
                int boxIndex = (___ / 3) * 3 + (___ / 3);

                // STEP 5 — CHECK all 3 books
                if (rows[___].contains(___) || cols[___].contains(___) || boxes[___].contains(___)) {
                    return false;
                }

                // STEP 6 — STORE in all 3 books
                rows[___].add(___);
                cols[___].add(___);
                boxes[___].add(___);
            }
        }

        // STEP 7 — RETURN
        return true;
    }
    */
}
