import json
import os

# Helper to read json
def read_json(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# Helper to write json
def write_json(filename, data):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

base_path = 'journal_data'

# Fix 1: Day 14 (Missing quiz)
d14_path = os.path.join(base_path, 'day_14.json')
if os.path.exists(d14_path):
    d14 = read_json(d14_path)
    if 'topK' in d14.get('problems', {}):
        if 'quiz' not in d14['problems']['topK']:
            d14['problems']['topK']['quiz'] = [
                {
                    "q": "Why do we use a Min-Heap (PriorityQueue) instead of sorting the array?",
                    "options": ["To keep the time complexity at O(N log K) instead of O(N log N)", "Because Java arrays cannot be sorted", "To save memory space"],
                    "correct": 0,
                    "explain": "Sorting takes O(N log N) time. By maintaining a Min-Heap of size K, pushing/popping takes O(log K), resulting in O(N log K) overall time. If K is small compared to N, this is much faster."
                }
            ]
            write_json(d14_path, d14)
            print("Fixed Day 14")

# Fix 2: Day 17 (Wrong quiz keys)
d17_path = os.path.join(base_path, 'day_17.json')
if os.path.exists(d17_path):
    d17 = read_json(d17_path)
    fixed17 = False
    for prob_key, prob_val in d17.get('problems', {}).items():
        if 'quiz' in prob_val:
            new_quiz = []
            for q in prob_val['quiz']:
                if 'question' in q:
                    fixed17 = True
                    # convert answer string to correct index based on options
                    correct_idx = 0
                    if 'options' in q and 'answer' in q:
                        try:
                            correct_idx = q['options'].index(q['answer'])
                        except ValueError:
                            correct_idx = 0
                    
                    new_q = {
                        "q": q['question'],
                        "options": q.get('options', []),
                        "correct": correct_idx,
                        "explain": q.get('explanation', '')
                    }
                    new_quiz.append(new_q)
                else:
                    new_quiz.append(q)
            prob_val['quiz'] = new_quiz
    if fixed17:
        write_json(d17_path, d17)
        print("Fixed Day 17")

# Fix 3: Day 22 (Sparse content)
d22_path = os.path.join(base_path, 'day_22.json')
if os.path.exists(d22_path):
    d22 = read_json(d22_path)
    if 'template' in d22:
        # Expand traceSteps
        d22['template']['traceSteps'] = [
            { "line": 3, "title": "Init Stack", "text": "Create an empty stack to track closing brackets." },
            { "line": 4, "title": "Loop", "text": "Iterate through every character in the string." },
            { "line": 5, "title": "Push Expected", "text": "If we see an open bracket '(', push the expected closing bracket ')' to the stack." },
            { "line": 6, "title": "Match & Pop", "text": "If it's a closing bracket, check if the stack is empty (unmatched closing bracket) or if the popped element doesn't match the current character." },
            { "line": 8, "title": "Final Check", "text": "After the loop, the stack MUST be empty. If it's not, there were unmatched open brackets left over." }
        ]
        # Expand sandbox
        d22['template']['sandbox'] = [
            { "step": "INIT", "question": "Why use a stack for Valid Parentheses?", "options": ["LIFO matches nested pairs (last opened must be first closed)", "FIFO is faster", "It saves memory compared to an array"], "correct": 0 },
            { "step": "PUSH", "question": "Why push the closing bracket instead of the opening bracket?", "options": ["It makes the matching step later a simple equality check `stack.pop() != c`", "Java requires it", "It is easier to type"], "correct": 0 },
            { "step": "FINAL", "question": "If the string is just `((`, what happens?", "options": ["The loop finishes, but stack is not empty, returning false", "It returns true", "It throws an exception"], "correct": 0 }
        ]
        write_json(d22_path, d22)
        print("Fixed Day 22")

# Fix 4: Add oneSentence to Days 23, 24, 26, 27
fixes = {
    'day_23.json': "Trace Valid Parentheses and Daily Temperatures step-by-step.",
    'day_24.json': "Fill in the blanks for Valid Parentheses and Daily Temperatures.",
    'day_26.json': "Trace Reverse Linked List and Merge Two Sorted Lists.",
    'day_27.json': "Fill in the blanks for Reverse Linked List and Merge Two Sorted Lists."
}
for filename, sentence in fixes.items():
    fpath = os.path.join(base_path, filename)
    if os.path.exists(fpath):
        data = read_json(fpath)
        if 'oneSentence' not in data:
            data['oneSentence'] = sentence
            write_json(fpath, data)
            print(f"Fixed {filename}")

print("Phase 1 Bug Fixes Complete.")
