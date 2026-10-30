import cv2
import os

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])

# Save high-res crops of frames 0, 7, 12, 17, 22, 27, 32, 37, 43
indices = [0, 7, 12, 17, 22, 27, 32, 37, 43]
os.makedirs('frame_crops', exist_ok=True)

artifact_dir = r"C:\Users\Rishi\.gemini\antigravity\brain\fce20837-650e-44f7-bec1-47171e1216eb"

for idx in indices:
    if idx < len(files):
        fn = files[idx]
        img = cv2.imread(os.path.join('video_frames', fn))
        out_fn = f"crop_frame_{idx:02d}_{fn}"
        cv2.imwrite(os.path.join('frame_crops', out_fn), img)
        # also copy to artifact directory
        cv2.imwrite(os.path.join(artifact_dir, out_fn), img)
        print("Saved and copied", out_fn)

