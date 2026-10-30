with open('navigation-DiPJwl4U.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for m in re.finditer(r'lenis', text, re.I):
    idx = m.start()
    print('--- match at', idx, '---')
    print(text[max(0, idx - 80):min(len(text), idx + 120)])
    print()
    if idx > 150000: break
