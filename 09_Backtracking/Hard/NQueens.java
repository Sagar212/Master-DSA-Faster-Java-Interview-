import java.util.ArrayList;
import java.util.List;

public class NQueens {

    /*
     * PROBLEM: N-Queens (LeetCode #51)
     * Place N queens on an N×N chessboard so no two attack each other.
     *
     * PATTERN: Backtracking + Constraint Pruning
     *
     * ====== MENTAL STORY ======
     * SEATING ROYALS at a long table. No two queens can be in the same:
     *   - ROW (solved by placing one per row)
     *   - COLUMN (track used columns)
     *   - DIAGONAL (track used diagonals: row-col and row+col)
     *
     * For each ROW:
     *   Try each COLUMN → Is it safe? → Place queen → Move to next row → Backtrack if needed.
     * ==========================================
     *
     * TIME: O(N!), SPACE: O(N^2)
     */

    public static void main(String[] args) {
        System.out.println("Test (N=4): " + solve(4).size() + " solutions"); // Expected: 2
    }

    public static List<List<String>> solve(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                board[i][j] = '.';

        backtrack(board, 0, result);
        return result;
    }

    private static void backtrack(char[][] board, int row, List<List<String>> result) {
        // STEP 1 — SAVE: If all rows filled → valid solution!
        if (row == board.length) {
            List<String> solution = new ArrayList<>();
            for (char[] r : board) solution.add(new String(r));
            result.add(solution);
            return;
        }

        // STEP 2 — LOOP: Try placing queen at each column in this row
        for (int col = 0; col < board.length; col++) {

            // STEP 3 — CHECK: Is this position safe?
            if (isSafe(board, row, col)) {

                // STEP 4 — CHOOSE: Place queen
                board[row][col] = 'Q';

                // STEP 5 — EXPLORE: Move to next row
                backtrack(board, row + 1, result);

                // STEP 6 — UNCHOOSE (BACKTRACK): Remove queen
                board[row][col] = '.';
            }
        }
    }

    private static boolean isSafe(char[][] board, int row, int col) {
        // Check column above
        for (int i = 0; i < row; i++)
            if (board[i][col] == 'Q') return false;

        // Check upper-left diagonal
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 'Q') return false;

        // Check upper-right diagonal
        for (int i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++)
            if (board[i][j] == 'Q') return false;

        return true; // no conflicts → safe!
    }

    /*
    // --- SKELETON ---
    // STORY: Seating royals. Place 1 per row. Check column + both diagonals. Backtrack if unsafe.
    // STEP 1 — If all rows done → save solution
    // STEP 2 — Loop columns
    // STEP 3 — isSafe? (check col, upper-left diag, upper-right diag)
    // STEP 4 — Place queen
    // STEP 5 — Recurse next row
    // STEP 6 — Remove queen (backtrack)
    */
}
