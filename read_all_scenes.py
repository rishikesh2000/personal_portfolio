with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# find nr, etc.
idx = text.find('function nr()')
print('nr to end snippet:')
print(text[idx:idx+3500])
