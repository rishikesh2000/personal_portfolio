with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
idx = text.find('Zn=X.hero')
print(text[max(0, idx - 1200):idx + 200])
