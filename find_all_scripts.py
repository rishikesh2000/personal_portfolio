with open('puture_source.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
all_src = re.findall(r'src=["\']([^"\']+)["\']', text)
for s in all_src:
    print('src:', s)
