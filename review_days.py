import json
import os

days_to_check = [34, 35, 36, 37, 38, 39]
for d in days_to_check:
    filepath = f'journal_data/day_{d}.json'
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f'=== DAY {d}: {data.get("title", "Unknown")} ===')
    
    if 'template' in data and 'codeLines' in data['template']:
        print('TEMPLATE CODE:')
        for line in data['template']['codeLines']:
            print(line['text'])
        print('-'*40)
        
    if 'problems' in data:
        print('PROBLEM CODE:')
        problems_iterable = data['problems'].items() if isinstance(data['problems'], dict) else enumerate(data['problems'])
        for pid, pdata in problems_iterable:
            if 'title' in pdata:
                print(f"Problem: {pdata['title']}")
            elif 'title' in data:
                print(f"Problem {pid}")
            if 'code' in pdata:
                print('\n'.join(pdata['code']))
                print('-'*20)
    print('\n')
