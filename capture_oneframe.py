import subprocess
import os

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
os.makedirs("screenshots", exist_ok=True)

# 1. Desktop hero frame (progress 0)
out1 = os.path.abspath("screenshots/oneframe_hero.png")
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=4000",
    f"--screenshot={out1}",
    "http://localhost:4173/"
])
print("Hero frame captured:", os.path.exists(out1), os.path.getsize(out1) if os.path.exists(out1) else 0)

# 2. Check for console logs and WebGL errors
cmd_log = [
    chrome,
    "--headless=new",
    "--enable-logging=stderr",
    "--v=1",
    "--virtual-time-budget=3000",
    "http://localhost:4173/"
]
res = subprocess.run(cmd_log, capture_output=True, text=True)
errors = [line for line in res.stderr.splitlines() if 'ERROR:' in line or 'Uncaught' in line]
print("Browser console errors:", errors)

