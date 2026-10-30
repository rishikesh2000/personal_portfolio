import urllib.request
import re

base = "http://localhost:4173"
html = urllib.request.urlopen(base).read().decode("utf-8")
print("HTML length:", len(html))

scripts = re.findall(r'src="([^"]+)"', html)
styles = re.findall(r'href="([^"]+\.css)"', html)

for s in scripts:
    url = base + s
    data = urllib.request.urlopen(url).read()
    print("Script:", url, "Status: 200, Bytes:", len(data))

for c in styles:
    url = base + c
    data = urllib.request.urlopen(url).read()
    print("Style:", url, "Status: 200, Bytes:", len(data))

print("All preview assets loaded successfully!")

