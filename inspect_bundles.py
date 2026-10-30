import re

for fname in ['main-7Jk9ujX-.js', 'navigation-DiPJwl4U.js']:
    with open(fname, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    print(f'=== {fname} ({len(text)} chars) ===')
    
    for lib in ['lenis', 'gsap', 'ScrollTrigger', 'locomotive', 'three', 'swiper', 'fullpage', 'framer', 'motion', 'scroll']:
        matches = len(re.findall(lib, text, re.I))
        if matches > 0:
            print(f'  Found {lib}: {matches} times')

    chunks = re.findall(r'["\'](/assets/[^"\']+\.js)["\']', text)
    if chunks:
        print(f'  Assets: {set(chunks)}')
