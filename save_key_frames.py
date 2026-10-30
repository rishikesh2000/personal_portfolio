import cv2
import os

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])

# Let's inspect frames:
# Frame 00 (0.0s): Hero
# Frame 04 (5.9s): Hero scroll
# Frame 08 (11.8s): Statement / Transition
# Frame 11 (16.2s): White section start (Selected work / KT AI Station)
# Frame 15 (22.1s): White section sticky work / project showcase
# Frame 18 (26.5s): White section next project / Jimssalabium
# Frame 23 (33.8s): 3-Beat process on white space
# Frame 27 (39.7s): Process beats / route
# Frame 31 (45.6s): Dark space return (Layer Stack / Systems thinking)
# Frame 35 (51.5s): Interactive capability mocks
# Frame 40 (58.8s): Studio & recognition
# Frame 44 (64.7s): Contact chat dialog open
# Frame 48 (70.6s): Footer

key_indices = [0, 4, 8, 11, 15, 18, 23, 27, 31, 35, 40, 44, 48]
os.makedirs('key_section_frames', exist_ok=True)

for idx in key_indices:
    if idx < len(files):
        src = os.path.join('video_frames', files[idx])
        dst = os.path.join('key_section_frames', f"section_step_{idx:02d}_{files[idx]}")
        img = cv2.imread(src)
        cv2.imwrite(dst, img)
        print(f"Saved {dst}")

