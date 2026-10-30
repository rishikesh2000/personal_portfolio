import subprocess
import os
import shutil
import time

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

# 1. Dark Hero
out_hero = os.path.abspath("screenshots/final_dark_hero.png")
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=4000",
    f"--screenshot={out_hero}",
    "http://localhost:4173/"
])
shutil.copy(out_hero, os.path.join(artifact_dir, "final_dark_hero.png"))
print("Saved final_dark_hero.png")

# 2. Complete flow screenshot (1440x7000) showing the transitions between Dark Space and White Editorial Chapter
out_full = os.path.abspath("screenshots/final_editorial_flow.png")
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,6500",
    "--virtual-time-budget=5000",
    f"--screenshot={out_full}",
    "http://localhost:4173/"
])
shutil.copy(out_full, os.path.join(artifact_dir, "final_editorial_flow.png"))
print("Saved final_editorial_flow.png")

# 3. Check for any console errors
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

