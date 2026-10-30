import re

with open('puture_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]*src=[\'"]([^\'"]+)[\'"]', html)
print('Scripts count:', len(scripts))
for s in scripts:
    print('Script:', s)

links = re.findall(r'<link[^>]*href=[\'"]([^\'"]+)[\'"]', html)
print('\nLinks count:', len(links))
for l in links:
    if 'css' in l or 'js' in l:
        print('Link:', l)

# Print any javascript bundle contents or mentions of scroll
bundles = [s for s in scripts if '_app' in s or 'main' in s or 'chunk' in s or 'index' in s]
print('\nBundles:', bundles)
