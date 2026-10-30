with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
idx = text.find('scene__frame')
print(text[max(0, idx - 1500):min(len(text), idx + 800)])
