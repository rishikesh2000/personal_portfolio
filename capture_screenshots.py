import subprocess
import time
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
os.makedirs("screenshots", exist_ok=True)

# 1. Desktop viewport screenshot
out_desktop = os.path.abspath("screenshots/desktop_hero.png")
cmd = [
    chrome_path,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=4000",
    f"--screenshot={out_desktop}",
    "http://localhost:4173/"
]
print("Capturing desktop hero screenshot...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Result:", res.returncode, "Size:", os.path.getsize(out_desktop) if os.path.exists(out_desktop) else 0)

# 2. Mobile viewport screenshot
out_mobile = os.path.abspath("screenshots/mobile_view.png")
cmd_mob = [
    chrome_path,
    "--headless=new",
    "--window-size=390,844",
    "--virtual-time-budget=4000",
    f"--screenshot={out_mobile}",
    "http://localhost:4173/"
]
print("Capturing mobile screenshot...")
res_mob = subprocess.run(cmd_mob, capture_output=True, text=True)
print("Result mobile:", res_mob.returncode, "Size:", os.path.getsize(out_mobile) if os.path.exists(out_mobile) else 0)

print("Screenshots captured successfully!")

