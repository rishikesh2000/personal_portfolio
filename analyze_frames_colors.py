import os
import cv2
import numpy as np

files = sorted([f for f in os.listdir("video_frames") if f.endswith(".jpg")])

print(f"Total files: {len(files)}")
for f in files[::3]:
    p = os.path.join("video_frames", f)
    img = cv2.imread(p)
    bgr = np.mean(img, axis=(0, 1))
    print(f"{f}: mean BGR = {bgr.astype(int)}")

