import cv2
import numpy as np

img = cv2.imread('frame_15_left.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Mean color of background
bg_color = np.median(img[:40, :40], axis=(0,1))
print("Background color of white section:", bg_color)

# Detect dark text lines
_, thresh = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)
h_proj = np.sum(thresh, axis=1)

print("Text lines detected at Y coordinates:")
lines = np.where(h_proj > 1000)[0]
if len(lines) > 0:
    print(f"Y ranges with text: min={lines.min()}, max={lines.max()}, total active rows={len(lines)}")

