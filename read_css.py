with open('main-DAiTGXDI.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
rules = re.findall(r'(\.[a-zA-Z0-9_\-\:]+)\s*\{([^}]+)\}', css)
print(f'Total CSS rules: {len(rules)}')
for sel, body in rules[:30]:
    if any(k in sel for k in ['scene', 'shell', 'hero', 'lenis', 'layer', 'fixed', 'sticky']):
        print(f'{sel} -> {body}')
