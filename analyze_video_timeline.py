import cv2
import numpy as np
import os

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])

print("=== FRAME-BY-FRAME ANALYSIS ===")
for i, f in enumerate(files):
    p = os.path.join('video_frames', f)
    img = cv2.imread(p)
    h, w, _ = img.shape
    
    # Check brightness
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean_brightness = np.mean(gray)
    
    # Check top header (first 60px)
    header = gray[:60, :]
    header_bright = np.mean(header)
    
    # Detect edges / text complexity
    edges = cv2.Canny(gray, 50, 150)
    edge_density = np.sum(edges > 0) / (h * w)
    
    # Check if there is a 3D canvas or white background
    is_white_theme = mean_brightness > 140
    theme = "LIGHT (WHITE)" if is_white_theme else "DARK (SPACE)"
    
    sec = float(f.split('_')[-1].replace('.jpg', ''))
    print(f"Sec {sec:04.1f} | Frame {i:02d} | Theme: {theme:<14} | Brightness: {mean_brightness:5.1f} | Edges: {edge_density:.3f}")

