with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find SceneSection / wt usages:
usages = [m.start() for m in re.finditer(r'wt,\{id:', text)]
print('SceneSection usages:', len(usages))
for idx in usages:
    print('--- Usage ---')
    print(text[idx:idx+600])
