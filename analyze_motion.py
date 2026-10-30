import cv2
import numpy as np
import os

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])

print("Calculating frame-to-frame motion and scroll shift...")

prev_gray = None
for i in range(len(files)):
    fn = files[i]
    img = cv2.imread(os.path.join('video_frames', fn))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    sec = float(fn.split('_')[-1].replace('.jpg', ''))
    
    if prev_gray is not None:
        # Calculate optical flow
        flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        # Average vertical movement (dy)
        dy = np.median(flow[..., 1])
        dx = np.median(flow[..., 0])
        mag = np.mean(np.sqrt(flow[..., 0]**2 + flow[..., 1]**2))
        
        # Check right side scrollbar position if any
        # Rightmost 20px
        right_strip = gray[:, -25:]
        scrollbar_y = np.argmin(np.mean(right_strip, axis=1)) # dark thumb or bright thumb
        
        print(f"Sec {sec:04.1f} | Frame {i:02d} | dy: {dy:6.2f}px | dx: {dx:6.2f}px | motion: {mag:5.2f} | mean: {np.mean(gray):5.1f}")
    prev_gray = gray

