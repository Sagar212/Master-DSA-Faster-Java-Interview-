import json

# Day 24: Stack Active Recall
day_24 = {
  "id": 24,
  "title": "Stack \u2014 Active Recall Skeletons",
  "patternType": "st",
  "category": "Stack",
  "problems": {
    "validParentheses": {
      "title": "Valid Parentheses",
      "patternSubtype": "Stack Parsing",
      "story": "Track expected closing brackets.",
      "template": [
        "public boolean isValid(String s) {",
        "    Stack<Character> stack = new [[Stack<>()]];",
        "    for (char c : s.toCharArray()) {",
        "        if (c == '(') stack.push([[')']]);",
        "        else if (c == '{') stack.push([['}']]);",
        "        else if (c == '[') stack.push([[']']]);",
        "        else if ([[stack.isEmpty()]] || stack.pop() != [[c]]) return false;",
        "    }",
        "    return [[stack.isEmpty()]];",
        "}"
      ]
    },
    "dailyTemperatures": {
      "title": "Daily Temperatures",
      "patternSubtype": "Monotonic Stack",
      "story": "Keep track of unresolved days using their indices.",
      "template": [
        "public int[] dailyTemperatures(int[] temperatures) {",
        "    int[] res = new int[temperatures.length];",
        "    Stack<Integer> stack = new Stack<>();",
        "    for (int i = 0; i < temperatures.length; i++) {",
        "        while (!stack.isEmpty() && temperatures[i] > temperatures[[[stack.peek()]]]) {",
        "            int prev = [[stack.pop()]];",
        "            res[prev] = [[i - prev]];",
        "        }",
        "        stack.push([[i]]);",
        "    }",
        "    return [[res]];",
        "}"
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
  "problems": {
    "reverseList": {
      "title": "Reverse Linked List",
      "patternSubtype": "Pointer Manipulation",
      "story": "Turn the arrows around one by one.",
      "template": [
        "public ListNode reverseList(ListNode head) {",
        "    ListNode prev = [[null]];",
        "    ListNode curr = [[head]];",
        "    while ([[curr != null]]) {",
        "        ListNode nextTemp = [[curr.next]];",
        "        curr.next = [[prev]];",
        "        prev = [[curr]];",
        "        curr = [[nextTemp]];",
        "    }",
        "    return [[prev]];",
        "}"
      ]
    },
    "mergeTwoLists": {
      "title": "Merge Two Sorted Lists",
      "patternSubtype": "Dummy Node Pattern",
      "story": "Zip them together using a dummy head.",
      "template": [
        "public ListNode mergeTwoLists(ListNode list1, ListNode list2) {",
        "    ListNode dummy = new ListNode([[-1]]);",
        "    ListNode current = [[dummy]];",
        "    while (list1 != null && [[list2 != null]]) {",
        "        if ([[list1.val <= list2.val]]) {",
        "            current.next = [[list1]];",
        "            list1 = [[list1.next]];",
        "        } else {",
        "            current.next = [[list2]];",
        "            list2 = [[list2.next]];",
        "        }",
        "        current = [[current.next]];",
        "    }",
        "    current.next = [[list1 != null ? list1 : list2]];",
        "    return [[dummy.next]];",
        "}"
      ]
    }
  }
}

with open("journal_data/day_24.json", "w", encoding="utf-8") as f:
    json.dump(day_24, f, indent=2)
with open("journal_data/day_27.json", "w", encoding="utf-8") as f:
    json.dump(day_27, f, indent=2)

print("Fixed day 24 and 27 Active Recall data structures.")
