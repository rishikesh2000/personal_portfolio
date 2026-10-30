import urllib.request

base = "http://localhost:4173/"
res = urllib.request.urlopen(base)
print("Status:", res.status)
html = res.read().decode('utf-8')
print("HTML length:", len(html))
print("Preview server verified!")

