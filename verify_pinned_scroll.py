import subprocess
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

# 1. Capture at top
out_top = os.path.abspath("screenshots/pinned_scroll_top.png")
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=4000",
    f"--screenshot={out_top}",
    "http://localhost:4173/"
])
shutil.copy(out_top, os.path.join(artifact_dir, "pinned_scroll_top.png"))
print("Saved pinned_scroll_top.png")

# 2. Check browser console errors
res = subprocess.run([
    chrome,
    "--headless=new",
    "--enable-logging=stderr",
    "--v=1",
    "--virtual-time-budget=3000",
    "http://localhost:4173/"
], capture_output=True, text=True)

errors = [l for l in res.stderr.splitlines() if 'ERROR:' in l or 'Uncaught' in l]
print("Browser console errors:", errors)
