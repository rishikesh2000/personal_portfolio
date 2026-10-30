import subprocess
import os
import shutil

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

# Let's test taking a screenshot after scrolling to #work with a node or puppeteer script, or running chrome
# We can create a tiny node script using puppeteer or CDP or simply test with a test html that scrolls
test_script = """
const { execSync } = require('child_process');
console.log('Testing...');
"""

