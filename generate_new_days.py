import json
import os

days = {
  22: {
    "id": 22,
    "title": "Stack \u2014 ROI & Pattern",
    "patternType": "st",
    "category": "Stack",
    "oneSentence": "Use a LIFO structure to parse expressions or track previous states.",
    "description": "Master the Stack pattern. Use it to reverse strings, evaluate expressions, or track state history.",
    "roi": {
      "frequency": "\u2b50\u2b50\u2b50\u2b50\u2b50",
      "complexity": "Time: O(N) | Space: O(N)",
      "dependsOn": "None",
      "signals": "LIFO requirements, parsing nested structures (parentheses), tracking recent elements (Next Greater Element)."
    },
    "template": {
      "filename": "Stack_Template.java",
      "codeLines": [
        { "num": 1, "text": "public class Stack_Template {" },
        { "num": 2, "text": "    public boolean solve(String s) {" },
        { "num": 3, "text": "        Stack<Character> stack = new Stack<>();" },
        { "num": 4, "text": "        for (char c : s.toCharArray()) {" },
        { "num": 5, "text": "            if (c == '(') stack.push(')');" },
        { "num": 6, "text": "            else if (stack.isEmpty() || stack.pop() != c) return false;" },
        { "num": 7, "text": "        }" },
        { "num": 8, "text": "        return stack.isEmpty();" },
        { "num": 9, "text": "    }" },
        { "num": 10, "text": "}" }
      ],
      "traceSteps": [
        { "line": 3, "title": "Init Stack", "text": "Create an empty stack to track closing brackets." }
      ],
      "sandbox": [
        { "step": "INIT", "question": "Why use a stack?", "options": ["LIFO matches nested pairs", "FIFO is faster"], "correct": 0 }
      ]
    }
  },
  23: {
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
        "array": ["(", ")"],
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
          { "left": 0, "right": -1, "line": 1, "desc": "Init stack" }
        ],
        "quiz": []
      },
      "dailyTemperatures": {
        "title": "Daily Temperatures",
        "patternSubtype": "Monotonic Stack",
        "description": "Find next warmer temperature.",
        "story": "Keep track of unresolved days.",
        "array": [73, 74],
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
          { "left": 0, "right": -1, "line": 2, "desc": "Init stack" }
        ],
        "quiz": []
      }
    }
  },
  24: {
    "id": 24,
    "title": "Stack \u2014 Active Recall Skeletons",
    "patternType": "st",
    "category": "Stack",
    "skeletons": [
      {
        "id": "validParentheses",
        "title": "Valid Parentheses",
        "difficulty": "Easy",
        "code": "class Solution {\n    public boolean isValid(String s) {\n        // TODO: Init stack\n        // TODO: Push closing bracket if open bracket\n        // TODO: Else pop and check if matches\n        // TODO: Return if stack is empty\n    }\n}"
      }
    ]
  },
  25: {
    "id": 25,
    "title": "Linked List \u2014 ROI & Pattern",
    "patternType": "ll",
    "category": "Linked List",
    "oneSentence": "Manipulate node pointers directly to reverse or merge structures.",
    "description": "Master pointer manipulation.",
    "roi": {
      "frequency": "\u2b50\u2b50\u2b50\u2b50\u2b50",
      "complexity": "Time: O(N) | Space: O(1)",
      "dependsOn": "Pointers",
      "signals": "Node connections, reversing flow, merging lists."
    },
    "template": {
      "filename": "LinkedList_Template.java",
      "codeLines": [
        { "num": 1, "text": "public class LinkedList_Template {" },
        { "num": 2, "text": "    public ListNode reverseList(ListNode head) {" },
        { "num": 3, "text": "        ListNode prev = null;" },
        { "num": 4, "text": "        ListNode curr = head;" },
        { "num": 5, "text": "        while (curr != null) {" },
        { "num": 6, "text": "            ListNode nextTemp = curr.next;" },
        { "num": 7, "text": "            curr.next = prev;" },
        { "num": 8, "text": "            prev = curr;" },
        { "num": 9, "text": "            curr = nextTemp;" },
        { "num": 10, "text": "        }" },
        { "num": 11, "text": "        return prev;" },
        { "num": 12, "text": "    }" },
        { "num": 13, "text": "}" }
      ],
      "traceSteps": [
        { "line": 3, "title": "Init Pointers", "text": "Create prev and curr pointers." }
      ],
      "sandbox": [
        { "step": "INIT", "question": "Why do we need nextTemp?", "options": ["To avoid losing the rest of the list", "To speed up"], "correct": 0 }
      ]
    }
  },
  26: {
    "id": 26,
    "title": "Linked List \u2014 Dry Run & Recall",
    "patternType": "ll",
    "category": "Linked List",
    "problems": {
      "reverseList": {
        "title": "Reverse Linked List",
        "patternSubtype": "Pointer Manipulation",
        "description": "Reverse a linked list.",
        "story": "Turn the arrows around.",
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
          { "left": 0, "right": -1, "line": 1, "desc": "Init prev" }
        ],
        "quiz": []
      },
      "mergeTwoLists": {
        "title": "Merge Two Sorted Lists",
        "patternSubtype": "Dummy Node Pattern",
        "description": "Merge two sorted lists.",
        "story": "Zip them together.",
        "array": [1, 2],
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
          { "left": 0, "right": -1, "line": 1, "desc": "Init dummy node" }
        ],
        "quiz": []
      }
    }
  },
  27: {
    "id": 27,
    "title": "Linked List \u2014 Active Recall Skeletons",
    "patternType": "ll",
    "category": "Linked List",
    "skeletons": [
      {
        "id": "reverseList",
        "title": "Reverse Linked List",
        "difficulty": "Easy",
        "code": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // TODO: Init prev and curr\n        // TODO: Loop while curr not null\n        // TODO: Save next, update curr.next to prev\n        // TODO: Move prev and curr forward\n        // TODO: Return prev\n    }\n}"
      }
    ]
  }
}

for day, data in days.items():
    with open(f"journal_data/day_{day}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

print("Generated skeleton files for days 22-27")
