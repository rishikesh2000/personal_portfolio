import re

with open("ref_assets/assets_SpaceScene-Di910BNj.js", "r", encoding="utf-8") as f:
    text = f.read()

# Look for rotation, rise, angle, panel positions
snippets = []
for m in re.finditer(r'(?:panel|rise|travel|camera|walk|stand|tilt|lerp|quaternion)', text, re.IGNORECASE):
    pos = m.start()
    snippet = text[max(0, pos-50):min(len(text), pos+150)]
    snippets.append(snippet)

print(f"Found {len(snippets)} snippets related to 3d travel/panel.")
with open("scene_movement_snippets.txt", "w", encoding="utf-8") as out:
    for s in snippets[:60]:
        out.write(s.replace('\n', ' ') + "\n---\n")

print("Wrote scene_movement_snippets.txt")

