with open('navigation-DiPJwl4U.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for pattern in ['scene__frame', 'scene__layer', 'scene-gap', 'scene__mark']:
    matches = [m.start() for m in re.finditer(pattern, text)]
    print(f'{pattern}: {len(matches)} occurrences')
    for idx in matches[:3]:
        print('  Snippet:', text[max(0, idx-40):min(len(text), idx+150)])
