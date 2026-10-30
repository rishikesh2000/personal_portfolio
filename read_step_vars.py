with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for var_name in ['Zn', 'Z', 'Qn', '$n', 'Q', 'm']:
    matches = re.findall(rf'var\s+{var_name}\s*=\s*\{{[^}}]+}}', text)
    if matches:
        print(f'{var_name}:', matches[0])
    else:
        # try let or const
        matches2 = re.findall(rf'(?:let|const|var)\s+{var_name}\s*=\s*\{{[^}}]+}}', text)
        if matches2:
            print(f'{var_name} (alt):', matches2[0])
