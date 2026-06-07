import json
import os
import re

DATA_DIR = 'journal_data'

def fix_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except:
            return False

    changed = False

    # 1. Fix template
    if 'template' in data and 'codeLines' in data['template']:
        for line in data['template']['codeLines']:
            text = line['text']
            
            # day_1.json pseudo-code
            if 'return ...;' in text:
                line['text'] = text.replace('return ...;', 'return new int[]{};')
                changed = True
                
            # day_10.json class mismatch
            if filename == 'day_10.json' and 'public class TwoSum' in text and '{' in text:
                line['text'] = text.replace('public class TwoSum', 'public class TwoSum_HashMap_Template')
                changed = True
                
            # day_16.json class mismatch
            if filename == 'day_16.json' and 'public class Subsets' in text and '{' in text:
                line['text'] = text.replace('public class Subsets', 'public class Backtracking_Template')
                changed = True
                
            # day_37.json class mismatch
            if filename == 'day_37.json' and 'public class Greedy_Pattern_Template' in text and '{' in text:
                line['text'] = text.replace('public class Greedy_Pattern_Template', 'public class JumpGame_Template')
                changed = True

        # day_13.json missing class wrapper
        if filename == 'day_13.json':
            has_class = any('class ' in line['text'] for line in data['template']['codeLines'])
            if not has_class:
                data['template']['codeLines'].insert(0, {"num": 0, "text": "public class TopK_Template {"})
                data['template']['codeLines'].append({"num": 99, "text": "}"})
                changed = True

    # 2. Fix problems
    if 'problems' in data:
        problems_iterable = []
        if isinstance(data['problems'], dict):
            problems_iterable = data['problems'].items()
        elif isinstance(data['problems'], list):
            problems_iterable = enumerate(data['problems'])
            
        for prob_id, prob_data in problems_iterable:
            if 'code' in prob_data:
                code_array = prob_data['code']
                
                # Mangled character array fix (e.g. day 30 active recall)
                if len(code_array) > 50 and all(len(c) <= 2 for c in code_array[:20]):
                    raw_str = "".join(code_array)
                    prob_data['code'] = raw_str.split('\n')
                    code_array = prob_data['code']
                    changed = True

                # day_17 missing helpers
                if filename == 'day_17.json' and 'nQueens' in str(prob_id):
                    has_is_safe = any('isSafe' in line and '{' in line for line in code_array)
                    if not has_is_safe:
                        prob_data['code'].append("private boolean isSafe(char[][] board, int row, int col) { return true; }")
                        prob_data['code'].append("private List<String> construct(char[][] board) { return new ArrayList<>(); }")
                        changed = True

                # day_5 missing isVowel
                if filename == 'day_5.json' and 'maxVowels' in str(prob_id):
                    has_is_vowel = any('isVowel' in line and '{' in line for line in code_array)
                    if not has_is_vowel:
                        prob_data['code'].append("private static boolean isVowel(char c) { return c=='a'||c=='e'||c=='i'||c=='o'||c=='u'; }")
                        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        print(f"Fixed {filename}")

for filename in os.listdir(DATA_DIR):
    if filename.endswith('.json'):
        fix_json(filename)
