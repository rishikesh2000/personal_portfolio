with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('Length of ContactDialog JS:', len(text))

import re
# Check for scene__frame or scene__layer or scroll triggers in this file
for term in ['scene__frame', 'scene__layer', 'scene', 'data-chapter', 'scrollTrigger', 'pin', 'stack']:
    m = re.findall(term, text)
    print(f'{term}: {len(m)} matches')
