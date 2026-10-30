import subprocess
import os
import shutil
import time

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

shots = [
    ("oneframe_hero.png", "http://localhost:4173/#welcome"),
    ("oneframe_about.png", "http://localhost:4173/#about"),
    ("oneframe_work.png", "http://localhost:4173/#work"),
    ("oneframe_process.png", "http://localhost:4173/#process"),
    ("oneframe_studio.png", "http://localhost:4173/#studio"),
    ("oneframe_contact.png", "http://localhost:4173/#contact")
]

for filename, url in shots:
    out_path = os.path.abspath(f"screenshots/{filename}")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    subprocess.run([
        chrome,
        "--headless=new",
        "--window-size=1440,900",
        "--virtual-time-budget=3500",
        f"--screenshot={out_path}",
        url
    ])
    if os.path.exists(out_path):
        dest = os.path.join(artifact_dir, filename)
        shutil.copy(out_path, dest)
        print(f"Captured {filename}: {os.path.getsize(dest)} bytes")

