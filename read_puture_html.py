with open('puture_source.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print('Length:', len(text))
print(text[:1500])
print('--- Script tags ---')
for m in re.finditer(r'<script.*?</script>', text, re.S):
    print(m.group(0)[:200])
