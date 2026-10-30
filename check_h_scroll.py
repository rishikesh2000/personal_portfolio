import cv2
import numpy as np
import os

files = sorted([f for f in os.listdir('scroll_inspection') if f.endswith('.jpg')])

print("Checking horizontal vs vertical movement in scroll sequence...")
prev_gray = None

for i in range(0, len(files), 3):
    fn = files[i]
    img = cv2.imread(os.path.join('scroll_inspection', fn))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    if prev_gray is not None:
        flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        # Check motion in the middle area (where cards are)
        mid_flow = flow[100:600, 100:1200]
        dx = np.mean(mid_flow[..., 0])
        dy = np.mean(mid_flow[..., 1])
        mag = np.mean(np.sqrt(mid_flow[..., 0]**2 + mid_flow[..., 1]**2))
        sec = fn.replace('sec_', '').replace('.jpg', '')
        print(f"Time {sec}s | dx (horizontal): {dx:6.2f}px | dy (vertical): {dy:6.2f}px | mag: {mag:5.2f}")
    prev_gray = gray
