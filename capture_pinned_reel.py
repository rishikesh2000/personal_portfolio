import subprocess
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

out_reel = os.path.abspath("screenshots/pinned_horizontal_reel.png")
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=4000",
    f"--screenshot={out_reel}",
    "http://localhost:4173/#works"
])

if os.path.exists(out_reel):
    shutil.copy(out_reel, os.path.join(artifact_dir, "pinned_horizontal_reel.png"))
    print("Saved and copied pinned_horizontal_reel.png, size:", os.path.getsize(out_reel))
