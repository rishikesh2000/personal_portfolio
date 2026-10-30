import subprocess
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
out_works = os.path.abspath("screenshots/oneframe_rising_panels.png")

# Use a test html or script that triggers wheel events on load
test_script = """
(() => {
  let count = 0;
  const interval = setInterval(() => {
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 600, cancelable: true }));
    count++;
    if (count > 8) clearInterval(interval);
  }, 100);
})();
"""

print("Capturing 3D camera travel / rising panels...")
# We can run headless chrome with a virtual time budget
subprocess.run([
    chrome,
    "--headless=new",
    "--window-size=1440,900",
    "--virtual-time-budget=5000",
    f"--screenshot={out_works}",
    "http://localhost:4173/"
])

artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"
if os.path.exists(out_works):
    shutil.copy(out_works, os.path.join(artifact_dir, "oneframe_rising_panels.png"))
    print("Saved and copied oneframe_rising_panels.png")

