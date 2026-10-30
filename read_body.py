with open('puture_source.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
body = re.search(r'<body[^>]*>(.*?)</body>', text, re.S)
if body:
    print('Body length:', len(body.group(1)))
    # Write body to a file
    with open('puture_body.html', 'w', encoding='utf-8') as bf:
        bf.write(body.group(1))
    print('Saved puture_body.html')
