import json
with open('journal_data/leetcode_map.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['validParentheses'] = {
    'id': '20',
    'title': 'Valid Parentheses',
    'url': 'https://leetcode.com/problems/valid-parentheses/',
    'desc': 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    'example': {
        'input': 's = "()[]{}"',
        'output': 'true',
        'explanation': 'The string contains valid matching brackets in correct order.'
    },
    'constraints': [
        '1 <= s.length <= 10^4',
        's consists of parentheses only.'
    ]
}

data['dailyTemperatures'] = {
    'id': '739',
    'title': 'Daily Temperatures',
    'url': 'https://leetcode.com/problems/daily-temperatures/',
    'desc': 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
    'example': {
        'input': 'temperatures = [73,74,75,71,69,72,76,73]',
        'output': '[1,1,4,2,1,1,0,0]',
        'explanation': 'For 73, the next warmer is 74 (1 day). For 75, the next warmer is 76 (4 days).'
    },
    'constraints': [
        '1 <= temperatures.length <= 10^5',
        '30 <= temperatures[i] <= 100'
    ]
}

data['reverseList'] = {
    'id': '206',
    'title': 'Reverse Linked List',
    'url': 'https://leetcode.com/problems/reverse-linked-list/',
    'desc': 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    'example': {
        'input': 'head = [1,2,3,4,5]',
        'output': '[5,4,3,2,1]',
        'explanation': 'The linked list pointers are reversed.'
    },
    'constraints': [
        'The number of nodes in the list is the range [0, 5000].',
        '-5000 <= Node.val <= 5000'
    ]
}

data['mergeTwoLists'] = {
    'id': '21',
    'title': 'Merge Two Sorted Lists',
    'url': 'https://leetcode.com/problems/merge-two-sorted-lists/',
    'desc': 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    'example': {
        'input': 'list1 = [1,2,4], list2 = [1,3,4]',
        'output': '[1,1,2,3,4,4]',
        'explanation': 'Nodes are merged in sorted order.'
    },
    'constraints': [
        'The number of nodes in both lists is in the range [0, 50].',
        '-100 <= Node.val <= 100',
        'Both list1 and list2 are sorted in non-decreasing order.'
    ]
}

with open('journal_data/leetcode_map.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Added new problems to leetcode_map.json')
