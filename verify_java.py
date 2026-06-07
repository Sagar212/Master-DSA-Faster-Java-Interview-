import os
import json
import subprocess
import shutil

DATA_DIR = 'journal_data'
TEMP_DIR = 'temp_java_verif'

if os.path.exists(TEMP_DIR):
    shutil.rmtree(TEMP_DIR)
os.makedirs(TEMP_DIR)

# Dummy classes needed for compilation
DUMMY_DEFS = """
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
"""

def compile_java(filename, code):
    filepath = os.path.join(TEMP_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    
    # Try compiling
    result = subprocess.run(['javac', filepath], capture_output=True, text=True)
    if result.returncode != 0:
        return result.stderr
    return None

errors = []

for filename in os.listdir(DATA_DIR):
    if not filename.endswith('.json') or filename == 'index.json':
        continue
    
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except:
            continue
    
    # 1. Check template code (Learn Days)
    if 'template' in data and 'codeLines' in data['template']:
        lines = [line['text'] for line in data['template']['codeLines']]
        raw_code = "\n".join(lines)
        
        # Determine class name from filename or raw_code
        class_name = data['template'].get('filename', f"Test_{filename.split('.')[0]}.java").replace('.java', '')
        
        # It's a full class. Just prepend imports and dummy defs if needed, 
        # but Java only allows one public class. We'll strip 'public class' to 'class' for dummy defs.
        # Actually, simpler: Just add imports at top.
        full_code = "import java.util.*;\n" + raw_code
        # Add dummy classes at the end (without public)
        full_code += "\nclass ListNode { int val; ListNode next; ListNode(int x) { val = x; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }\n"
        full_code += "class TreeNode { int val; TreeNode left; TreeNode right; TreeNode(int x) { val = x; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }\n"
        
        err = compile_java(f"{class_name}.java", full_code)
        if err:
            errors.append(f"ERROR in {filename} (Template):\n{err}")

    # 2. Check problems code (Dry Run Days)
    if 'problems' in data:
        # Some JSONs have problems as dict, some as list
        problems_iterable = []
        if isinstance(data['problems'], dict):
            problems_iterable = data['problems'].items()
        elif isinstance(data['problems'], list):
            problems_iterable = enumerate(data['problems'])
            
        for prob_id, prob_data in problems_iterable:
            if 'code' in prob_data:
                lines = prob_data['code']
                raw_code = "\n".join(lines)
                
                # Usually it's just a method `public static ... solve(...)`
                # Wrap it in a class
                class_name = f"Test_{filename.split('.')[0]}_{prob_id}"
                
                full_code = f"""
import java.util.*;

{DUMMY_DEFS}

public class {class_name} {{
    {raw_code}
}}
"""
                err = compile_java(f"{class_name}.java", full_code)
                if err:
                    errors.append(f"ERROR in {filename} (Problem {prob_id}):\n{err}")

if errors:
    print(f"Found {len(errors)} compilation issues:")
    for e in errors[:5]: # Show first 5
        print("-" * 40)
        print(e)
    if len(errors) > 5:
        print(f"... and {len(errors) - 5} more.")
else:
    print("SUCCESS: All extracted Java code compiled successfully!")
