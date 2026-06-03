import json

# Day 23: Stack Dry Run
day_23 = {
  "id": 23,
  "title": "Stack \u2014 Dry Run & Recall",
  "patternType": "st",
  "category": "Stack",
  "problems": {
    "validParentheses": {
      "title": "Valid Parentheses",
      "patternSubtype": "Stack Parsing",
      "description": "Determine if input string is valid.",
      "story": "Track expected closing brackets.",
      "array": ["(", "[", "]", ")"],
      "code": [
        "public boolean isValid(String s) {",
        "    Stack<Character> stack = new Stack<>();",
        "    for (char c : s.toCharArray()) {",
        "        if (c == '(') stack.push(')');",
        "        else if (c == '{') stack.push('}');",
        "        else if (c == '[') stack.push(']');",
        "        else if (stack.isEmpty() || stack.pop() != c) return false;",
        "    }",
        "    return stack.isEmpty();",
        "}"
      ],
      "steps": [
        { "left": -1, "right": -1, "line": 1, "desc": "Init empty stack to track expected closing brackets." },
        { "left": 0, "right": -1, "line": 3, "desc": "c = '('. It is an open bracket, push expected ')' to stack. Stack: [')']" },
        { "left": 1, "right": -1, "line": 5, "desc": "c = '['. It is an open bracket, push expected ']' to stack. Stack: [')', ']']" },
        { "left": 2, "right": -1, "line": 6, "desc": "c = ']'. It is a closing bracket. Pop from stack (']') and compare. Matches! Stack: [')']" },
        { "left": 3, "right": -1, "line": 6, "desc": "c = ')'. It is a closing bracket. Pop from stack (')') and compare. Matches! Stack: []" },
        { "left": -1, "right": -1, "line": 8, "desc": "Loop ends. Return stack.isEmpty() -> true." }
      ],
      "quiz": [
        {
          "q": "Why do we push the closing bracket instead of the open bracket?",
          "options": ["It makes the comparison step easier later", "It saves memory", "Java requires it"],
          "correct": 0,
          "explain": "Pushing the closing bracket means when we encounter a closing bracket in the string, we can simply pop and check for exact equality without needing an extra mapping logic."
        }
      ]
    },
    "dailyTemperatures": {
      "title": "Daily Temperatures",
      "patternSubtype": "Monotonic Stack",
      "description": "Find next warmer temperature.",
      "story": "Keep track of unresolved days.",
      "array": [73, 74, 75, 71, 69, 72, 76, 73],
      "code": [
        "public int[] dailyTemperatures(int[] temperatures) {",
        "    int[] res = new int[temperatures.length];",
        "    Stack<Integer> stack = new Stack<>();",
        "    for (int i = 0; i < temperatures.length; i++) {",
        "        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {",
        "            int prev = stack.pop();",
        "            res[prev] = i - prev;",
        "        }",
        "        stack.push(i);",
        "    }",
        "    return res;",
        "}"
      ],
      "steps": [
        { "left": -1, "right": -1, "line": 2, "desc": "Init stack to hold indices of days waiting for a warmer temp." },
        { "left": 0, "right": -1, "line": 8, "desc": "i=0, temp=73. Stack is empty. Push index 0. Stack: [0]" },
        { "left": 1, "right": -1, "line": 4, "desc": "i=1, temp=74. 74 > temps[0] (73). We found a warmer day!" },
        { "left": 0, "right": 1, "line": 6, "desc": "Pop 0. res[0] = 1 - 0 = 1. Stack: []" },
        { "left": 1, "right": -1, "line": 8, "desc": "Push index 1. Stack: [1]" },
        { "left": 2, "right": -1, "line": 4, "desc": "i=2, temp=75. 75 > temps[1] (74). Warmer day!" },
        { "left": 1, "right": 2, "line": 6, "desc": "Pop 1. res[1] = 2 - 1 = 1. Stack: []" },
        { "left": 2, "right": -1, "line": 8, "desc": "Push index 2. Stack: [2]" },
        { "left": 3, "right": -1, "line": 8, "desc": "i=3, temp=71. 71 is NOT > 75. Just push index 3. Stack: [2, 3]" },
        { "left": 4, "right": -1, "line": 8, "desc": "i=4, temp=69. 69 is NOT > 71. Push index 4. Stack: [2, 3, 4]" },
        { "left": 5, "right": -1, "line": 4, "desc": "i=5, temp=72. 72 > temps[4] (69)!" },
        { "left": 4, "right": 5, "line": 6, "desc": "Pop 4. res[4] = 5 - 4 = 1. Stack: [2, 3]" },
        { "left": 5, "right": -1, "line": 4, "desc": "Still at i=5. 72 > temps[3] (71)!" },
        { "left": 3, "right": 5, "line": 6, "desc": "Pop 3. res[3] = 5 - 3 = 2. Stack: [2]" },
        { "left": 5, "right": -1, "line": 8, "desc": "72 is NOT > 75. Push index 5. Stack: [2, 5]" }
      ],
      "quiz": [
        {
          "q": "Why do we store indices in the stack instead of the temperatures themselves?",
          "options": ["Because we need the index to calculate the distance (days waited) to the next warmer temperature.", "To save memory.", "Because temperatures can be negative."],
          "correct": 0,
          "explain": "The problem asks for the NUMBER OF DAYS you have to wait. By storing the index, we can compute the difference `i - prev` to get the days. We can always look up the temperature using `temperatures[index]`."
        }
      ]
    }
  }
}

# Day 24: Stack Active Recall
day_24 = {
  "id": 24,
  "title": "Stack \u2014 Active Recall Skeletons",
  "patternType": "st",
  "category": "Stack",
  "skeletons": [
    {
      "id": "validParentheses",
      "title": "Valid Parentheses",
      "difficulty": "Easy",
      "code": "class Solution {\n    public boolean isValid(String s) {\n        // TODO: Create a Stack of Characters\n        \n        for (char c : s.toCharArray()) {\n            // TODO: If open bracket, push corresponding closing bracket\n            \n            // TODO: Else if stack is empty OR popped char doesn't match current char, return false\n            \n        }\n        \n        // TODO: Return whether stack is empty\n    }\n}"
    },
    {
      "id": "dailyTemperatures",
      "title": "Daily Temperatures",
      "difficulty": "Medium",
      "code": "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        // TODO: Create result array and a Stack of Integers (to store indices)\n        \n        for (int i = 0; i < temperatures.length; i++) {\n            // TODO: While stack is not empty AND current temp > temp at stack.peek()\n                // TODO: Pop from stack\n                // TODO: Calculate distance and store in result array\n                \n            // TODO: Push current index to stack\n        }\n        \n        return res;\n    }\n}"
    }
  ]
}

# Day 25: Linked List Learn
day_25 = {
  "id": 25,
  "title": "Linked List \u2014 ROI & Pattern",
  "patternType": "ll",
  "category": "Linked List",
  "oneSentence": "Manipulate node pointers directly to reverse or merge structures.",
  "description": "Master pointer manipulation. Tracing the Reverse Linked List pattern is essential.",
  "roi": {
    "frequency": "\u2b50\u2b50\u2b50\u2b50\u2b50",
    "complexity": "Time: O(N) | Space: O(1)",
    "dependsOn": "Pointers",
    "signals": "Node connections, reversing flow, merging lists, cycle detection."
  },
  "template": {
    "filename": "ReverseLinkedList.java",
    "codeLines": [
      { "num": 1, "text": "public class ReverseLinkedList {" },
      { "num": 2, "text": "    public ListNode reverseList(ListNode head) {" },
      { "num": 3, "text": "        ListNode prev = null;" },
      { "num": 4, "text": "        ListNode curr = head;" },
      { "num": 5, "text": "        while (curr != null) {" },
      { "num": 6, "text": "            ListNode nextTemp = curr.next; // 1. SAVE the rest of the list" },
      { "num": 7, "text": "            curr.next = prev;              // 2. REVERSE the pointer" },
      { "num": 8, "text": "            prev = curr;                   // 3. MOVE prev forward" },
      { "num": 9, "text": "            curr = nextTemp;               // 4. MOVE curr forward" },
      { "num": 10, "text": "        }" },
      { "num": 11, "text": "        return prev;" },
      { "num": 12, "text": "    }" },
      { "num": 13, "text": "}" }
    ],
    "traceSteps": [
      { "line": 3, "title": "Init Pointers", "text": "Create 'prev' initialized to null, and 'curr' initialized to head." },
      { "line": 6, "title": "Save Next", "text": "Temporarily save curr.next so we don't lose the rest of the list when we rewrite the pointer." },
      { "line": 7, "title": "Reverse Arrow", "text": "Point curr's next arrow backwards towards prev." },
      { "line": 8, "title": "Advance Prev", "text": "Slide the prev pointer forward to where curr is currently sitting." },
      { "line": 9, "title": "Advance Curr", "text": "Slide the curr pointer forward to the saved nextTemp node." },
      { "line": 11, "title": "Return", "text": "When curr reaches null, prev will be sitting on the new head of the reversed list." }
    ],
    "sandbox": [
      {
        "step": "INIT",
        "question": "Why do we need to save curr.next in a temporary variable?",
        "options": ["Because in the very next step, we overwrite curr.next to point backwards. If we didn't save it, we would lose access to the rest of the list.", "To make the algorithm run in O(1) time.", "It is required by Java garbage collection."],
        "correct": 0
      }
    ]
  }
}

# Day 26: Linked List Dry Run
day_26 = {
  "id": 26,
  "title": "Linked List \u2014 Dry Run & Recall",
  "patternType": "ll",
  "category": "Linked List",
  "problems": {
    "reverseList": {
      "title": "Reverse Linked List",
      "patternSubtype": "Pointer Manipulation",
      "description": "Reverse a linked list.",
      "story": "Turn the arrows around one by one.",
      "array": [1, 2, 3],
      "code": [
        "public ListNode reverseList(ListNode head) {",
        "    ListNode prev = null;",
        "    ListNode curr = head;",
        "    while (curr != null) {",
        "        ListNode nextTemp = curr.next;",
        "        curr.next = prev;",
        "        prev = curr;",
        "        curr = nextTemp;",
        "    }",
        "    return prev;",
        "}"
      ],
      "steps": [
        { "left": -1, "right": -1, "line": 1, "desc": "Init prev = null, curr = node(1)." },
        { "left": 0, "right": -1, "line": 4, "desc": "curr is node(1). Save nextTemp = node(2)." },
        { "left": 0, "right": -1, "line": 5, "desc": "Reverse! node(1).next points to null." },
        { "left": 0, "right": -1, "line": 6, "desc": "Move prev = node(1)." },
        { "left": -1, "right": -1, "line": 7, "desc": "Move curr = node(2)." },
        { "left": 1, "right": -1, "line": 4, "desc": "curr is node(2). Save nextTemp = node(3)." },
        { "left": 1, "right": 0, "line": 5, "desc": "Reverse! node(2).next points to node(1)." },
        { "left": 1, "right": -1, "line": 6, "desc": "Move prev = node(2)." },
        { "left": -1, "right": -1, "line": 7, "desc": "Move curr = node(3)." },
        { "left": 2, "right": -1, "line": 4, "desc": "curr is node(3). Save nextTemp = null." },
        { "left": 2, "right": 1, "line": 5, "desc": "Reverse! node(3).next points to node(2)." },
        { "left": 2, "right": -1, "line": 6, "desc": "Move prev = node(3)." },
        { "left": -1, "right": -1, "line": 7, "desc": "Move curr = null. Loop ends." },
        { "left": 2, "right": -1, "line": 9, "desc": "Return prev, which is node(3) (the new head)." }
      ],
      "quiz": [
        {
          "q": "What happens if we forget to update curr to nextTemp?",
          "options": ["Infinite loop", "NullPointerException", "The list remains unchanged"],
          "correct": 0,
          "explain": "If we don't advance `curr = nextTemp`, `curr` will never become null, and the while loop will run forever."
        }
      ]
    },
    "mergeTwoLists": {
      "title": "Merge Two Sorted Lists",
      "patternSubtype": "Dummy Node Pattern",
      "description": "Merge two sorted lists.",
      "story": "Zip them together.",
      "array": [1, 2, 4],
      "code": [
        "public ListNode mergeTwoLists(ListNode list1, ListNode list2) {",
        "    ListNode dummy = new ListNode(-1);",
        "    ListNode current = dummy;",
        "    while (list1 != null && list2 != null) {",
        "        if (list1.val <= list2.val) {",
        "            current.next = list1;",
        "            list1 = list1.next;",
        "        } else {",
        "            current.next = list2;",
        "            list2 = list2.next;",
        "        }",
        "        current = current.next;",
        "    }",
        "    current.next = list1 != null ? list1 : list2;",
        "    return dummy.next;",
        "}"
      ],
      "steps": [
        { "left": -1, "right": -1, "line": 1, "desc": "Create a dummy node to act as the head of the new merged list." },
        { "left": 0, "right": 0, "line": 4, "desc": "Compare list1 (1) and list2 (1). They are equal. Append list1." },
        { "left": 0, "right": 0, "line": 6, "desc": "Advance list1 to next node (2)." },
        { "left": 1, "right": 0, "line": 4, "desc": "Compare list1 (2) and list2 (1). list2 is smaller. Append list2." },
        { "left": 1, "right": 0, "line": 9, "desc": "Advance list2 to next node (3)." },
        { "left": 1, "right": 1, "line": 4, "desc": "Compare list1 (2) and list2 (3). list1 is smaller. Append list1." },
        { "left": 1, "right": 1, "line": 6, "desc": "Advance list1 to next node (4)." },
        { "left": -1, "right": -1, "line": 13, "desc": "Loop continues... finally, attach any remaining nodes from the non-empty list." }
      ],
      "quiz": [
        {
          "q": "What is the purpose of the dummy node?",
          "options": ["It simplifies edge cases when inserting the very first node, avoiding a lot of null checks.", "It reduces time complexity to O(log N).", "It prevents garbage collection."],
          "correct": 0,
          "explain": "Without a dummy node, we would need special if-logic to initialize the head of the merged list on the first iteration. A dummy node gives `current` an initial object to point `next` to immediately."
        }
      ]
    }
  }
}

# Day 27: Linked List Active Recall
day_27 = {
  "id": 27,
  "title": "Linked List \u2014 Active Recall Skeletons",
  "patternType": "ll",
  "category": "Linked List",
  "skeletons": [
    {
      "id": "reverseList",
      "title": "Reverse Linked List",
      "difficulty": "Easy",
      "code": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // TODO: Init prev to null and curr to head\n        \n        while (curr != null) {\n            // TODO: Save curr.next to nextTemp\n            \n            // TODO: Point curr.next to prev\n            \n            // TODO: Move prev to curr\n            \n            // TODO: Move curr to nextTemp\n            \n        }\n        \n        // TODO: Return the new head (prev)\n    }\n}"
    },
    {
      "id": "mergeTwoLists",
      "title": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "code": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // TODO: Create a dummy node and a current pointer starting at dummy\n        \n        // TODO: While both lists are not null, compare values\n            // TODO: Append smaller node to current.next, and advance that list's pointer\n            // TODO: Advance current pointer\n            \n        // TODO: After loop, if one list is not null, append it to current.next\n        \n        // TODO: Return dummy.next\n    }\n}"
    }
  ]
}

# Write files
with open("journal_data/day_23.json", "w", encoding="utf-8") as f:
    json.dump(day_23, f, indent=2)
with open("journal_data/day_24.json", "w", encoding="utf-8") as f:
    json.dump(day_24, f, indent=2)
with open("journal_data/day_25.json", "w", encoding="utf-8") as f:
    json.dump(day_25, f, indent=2)
with open("journal_data/day_26.json", "w", encoding="utf-8") as f:
    json.dump(day_26, f, indent=2)
with open("journal_data/day_27.json", "w", encoding="utf-8") as f:
    json.dump(day_27, f, indent=2)

print("Generated full traces for days 23-27")
