import subprocess
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

# Copy hero screenshot
shutil.copy("screenshots/oneframe_hero.png", os.path.join(artifact_dir, "oneframe_hero.png"))
print("Copied hero screenshot to artifact directory.")

