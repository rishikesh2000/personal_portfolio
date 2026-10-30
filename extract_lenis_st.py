with open('navigation-DiPJwl4U.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Look for Lenis initialization
lenis_matches = [m.start() for m in re.finditer(r'new Lenis', text, re.I)]
print('new Lenis matches:', len(lenis_matches))
for idx in lenis_matches:
    start = max(0, idx - 100)
    end = min(len(text), idx + 300)
    print('--- Lenis init snippet ---')
    print(text[start:end])

# Look for ScrollTrigger.create or gsap.to with scrollTrigger
st_matches = [m.start() for m in re.finditer(r'scrollTrigger\s*:\s*\{', text, re.I)]
print('\nscrollTrigger config matches:', len(st_matches))
for idx in st_matches[:8]:
    start = max(0, idx - 50)
    end = min(len(text), idx + 350)
    print('--- ScrollTrigger snippet ---')
    print(text[start:end])
