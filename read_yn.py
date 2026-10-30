with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find where length and steps are created for a scene:
# e.g., something that defines .length, .steps, .at
idx = text.find('Yn(')
print('Yn definition snippet:')
print(text[max(0, idx - 400):min(len(text), idx + 1000)])
