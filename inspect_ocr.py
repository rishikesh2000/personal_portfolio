import cv2
import numpy as np
import os

try:
    import pytesseract
    # Check if tesseract binary is on windows default path
    for p in [r"C:\Program Files\Tesseract-OCR\tesseract.exe", r"C:\Users\Rishi\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"]:
        if os.path.exists(p):
            pytesseract.pytesseract.tesseract_cmd = p
            print("Found tesseract at", p)
            break
except Exception as e:
    print("pytesseract exception:", e)

files = sorted([f for f in os.listdir('video_frames') if f.endswith('.jpg')])

for idx in [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44]:
    if idx >= len(files): break
    fn = files[idx]
    img = cv2.imread(os.path.join('video_frames', fn))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Try OCR
    text = ""
    try:
        text = pytesseract.image_to_string(gray).strip()
    except Exception as e:
        # If no tesseract exe, do basic analysis
        pass
    
    sec = fn.split('_')[-1].replace('.jpg', '')
    print(f"\n--- Frame {idx} ({sec}s) ---")
    if text:
        # print first few lines of text
        lines = [l.strip() for l in text.split('\n') if len(l.strip()) > 3]
        print("Text detected:", " | ".join(lines[:6]))
    else:
        print(f"Mean brightness: {np.mean(gray):.1f}")

