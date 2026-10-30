import cv2
import os

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])
print('Total files:', len(files))

selected = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44]
rows = []
for r in range(4):
    row_imgs = []
    for c in range(3):
        idx = selected[r * 3 + c]
        fn = os.path.join('video_frames', files[idx])
        img = cv2.imread(fn)
        thumb = cv2.resize(img, (400, 220))
        sec_str = files[idx].split('_')[-1].replace('.jpg', '')
        cv2.putText(thumb, f"Frame {idx} ({sec_str}s)", (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        row_imgs.append(thumb)
    rows.append(cv2.hconcat(row_imgs))

montage = cv2.vconcat(rows)
cv2.imwrite('video_montage.jpg', montage)
print('Saved video_montage.jpg!')

