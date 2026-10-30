import cv2
import numpy as np
import os

crops = [
    ("crop_frame_00_frame_000_sec_0.0.jpg", "0.0s Hero opening"),
    ("crop_frame_07_frame_007_sec_10.3.jpg", "10.3s Hero statement"),
    ("crop_frame_12_frame_012_sec_17.7.jpg", "17.7s White transition / Selected work"),
    ("crop_frame_17_frame_017_sec_25.0.jpg", "25.0s Work showcase sticky card"),
    ("crop_frame_22_frame_022_sec_32.4.jpg", "32.4s Process 3 beats on white"),
    ("crop_frame_27_frame_027_sec_39.7.jpg", "39.7s Process steps route"),
    ("crop_frame_32_frame_032_sec_47.1.jpg", "47.1s Dark space transition"),
    ("crop_frame_37_frame_037_sec_54.4.jpg", "54.4s Capabilities mocks"),
    ("crop_frame_43_frame_043_sec_63.2.jpg", "63.2s Contact chat dialog")
]

artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

for fn, desc in crops:
    p = os.path.join(artifact_dir, fn)
    img = cv2.imread(p)
    if img is None: continue
    h, w, _ = img.shape
    
    # Analyze sections: top, middle, bottom
    top = np.mean(img[:80, :], axis=(0,1)).astype(int)
    mid = np.mean(img[80:h-80, :], axis=(0,1)).astype(int)
    bot = np.mean(img[h-80:, :], axis=(0,1)).astype(int)
    
    # Check if there are cards/boxes in middle
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    large_boxes = [c for c in contours if cv2.contourArea(c) > 20000]
    
    print(f"[{desc}] ({fn}):")
    print(f"  Top BGR: {top}, Mid BGR: {mid}, Bot BGR: {bot}")
    print(f"  Large boxes/panels count: {len(large_boxes)}")

