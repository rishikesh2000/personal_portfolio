import subprocess
import time
import json
import urllib.request
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

# Launch chrome with remote debugging
proc = subprocess.Popen([
    chrome,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--window-size=1440,900",
    "http://localhost:4173/"
])

time.sleep(2)

try:
    # Get WebSocket debugger URL
    resp = urllib.request.urlopen("http://localhost:9222/json")
    tabs = json.loads(resp.read().decode())
    print("Found tabs:", len(tabs))
    ws_url = tabs[0]["webSocketDebuggerUrl"]
    print("WS url:", ws_url)
finally:
    proc.terminate()

