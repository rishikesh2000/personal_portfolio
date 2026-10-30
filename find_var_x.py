with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for m in re.finditer(r'(?:var|let|const)\s+X\s*=', text):
    idx = m.start()
    print('X definition snippet:')
    print(text[idx:idx+800])
