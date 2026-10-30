import cv2
import numpy as np

img15 = cv2.imread('video_frames/frame_015_sec_22.1.jpg')
img22 = cv2.imread('video_frames/frame_022_sec_32.4.jpg')

print("Frame 15 shape:", img15.shape)
print("Frame 22 shape:", img22.shape)

# Let's save a crop of the left and right halves of frame 15 and 22
h, w, _ = img15.shape
cv2.imwrite('frame_15_left.jpg', img15[:, :w//2])
cv2.imwrite('frame_15_right.jpg', img15[:, w//2:])

cv2.imwrite('frame_22_left.jpg', img22[:, :w//2])
cv2.imwrite('frame_22_right.jpg', img22[:, w//2:])

print("Saved frame crops for inspection.")

