with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find occurrences of scene__frame
for m in re.finditer(r'scene__frame', text):
    idx = m.start()
    print('=== scene__frame ===')
    print(text[max(0, idx - 150):min(len(text), idx + 400)])

# Find occurrences of scrollTrigger
for m in re.finditer(r'scrollTrigger', text):
    idx = m.start()
    print('=== scrollTrigger ===')
    print(text[max(0, idx - 100):min(len(text), idx + 300)])
