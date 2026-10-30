with open('navigation-BQ5-cxHW.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'(\.[a-zA-Z0-9_\-\:\[\]\.\#]+)\s*\{([^}]+)\}', css)
for sel, body in matches:
    if any(k in sel for k in ['.scene', '.shell', 'layer-stack', '.stack', '.step', '.reel']):
        print(f'{sel} -> {body}')
