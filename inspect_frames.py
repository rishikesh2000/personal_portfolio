import os
import cv2

frames = sorted([f for f in os.listdir("video_frames") if f.endswith(".jpg")])
print(f"Total frames: {len(frames)}")

# Print frames list with timestamps
for f in frames:
    print(f)

