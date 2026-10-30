with open('navigation-DiPJwl4U.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Look for occurrences of Lenis after index 355000 (after the class definition)
sub = text[355000:]
for m in re.finditer(r'new\s+[\w$]+(?=\([^\)]*duration)', sub):
    print(m.group(0))
    idx = 355000 + m.start()
    print(text[idx-50:idx+300])

# Also search for GSAP ScrollTrigger creation
for m in re.finditer(r'ScrollTrigger\.create', text):
    idx = m.start()
    print('ST create:', text[idx-50:idx+200])

for m in re.finditer(r'pin\s*:\s*!0|pin\s*:\s*true', text):
    idx = m.start()
    print('Pin true:', text[idx-50:idx+200])
