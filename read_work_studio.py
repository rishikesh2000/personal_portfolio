with open('ContactDialog-DOlj7i4z.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('function ar()')
print('ar to end snippet:')
print(text[idx+500:idx+4500])
