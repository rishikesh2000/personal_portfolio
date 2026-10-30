with open('navigation-DiPJwl4U.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Search for section identifiers or names
names = set(re.findall(r'id:\s*["\']([^"\']+)["\']', text))
print('IDs:', [n for n in names if len(n) < 30])

classes = set(re.findall(r'className:\s*["\']([^"\']+)["\']', text))
print('Class examples:', [c for c in classes if any(k in c for k in ['hero', 'project', 'process', 'studio', 'work'])][:10])

# Search for english text strings in the bundle
strings = re.findall(r'["\'](KT AI Station|Champion of the WSIS|Offline-ready|Creative Engineering|Creative Technologist|Interactive AI experiences)[^"\']*["\']', text)
print('Key text strings found:', strings[:10])
