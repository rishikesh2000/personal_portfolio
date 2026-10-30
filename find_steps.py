with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
# Search where `steps:` appears in the file
for m in re.finditer(r'steps\s*:\s*\[', text):
    idx = m.start()
    print('steps snippet:')
    print(text[max(0, idx - 80):min(len(text), idx + 250)])
