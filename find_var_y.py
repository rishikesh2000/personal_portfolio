with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('var X={')
print(text[max(0, idx - 800):idx])
