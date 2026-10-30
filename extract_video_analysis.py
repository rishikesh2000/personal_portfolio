import cv2
import os

video_path = r'C:/Users/Rishi/.gemini/antigravity/brain/fce20837-650e-44f7-bec1-47171e1216eb/.user_uploaded/media_1793254568100_f42e2970.mp4'
out_dir = r'video_frames'
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Video Info: {width}x{height}, FPS: {fps:.2f}, Total Frames: {total_frames}, Duration: {duration:.2f}s")

# Extract 1 frame every 1.5 seconds to see the full interaction
interval = int(fps * 1.5)
saved_count = 0
frame_idx = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    if frame_idx % interval == 0:
        sec = frame_idx / fps
        fn = os.path.join(out_dir, f"frame_{saved_count:03d}_sec_{sec:.1f}.jpg")
        # Save a resized version for fast inspection
        cv2.imwrite(fn, frame)
        saved_count += 1
    frame_idx += 1

cap.release()
print(f"Saved {saved_count} frames to {out_dir}/")

