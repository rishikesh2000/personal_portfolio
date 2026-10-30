with open('main-DAiTGXDI.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Split by } and print
parts = css.split('}')
for p in parts:
    print(p.strip() + '}')
