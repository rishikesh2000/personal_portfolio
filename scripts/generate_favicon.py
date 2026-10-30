import os, base64, io
from PIL import Image, ImageDraw, ImageEnhance

src = r'C:/Users/Rishi/.gemini/antigravity/brain/fce20837-650e-44f7-bec1-47171e1216eb/.user_uploaded/media_1793348271862_175ce37a.png'
im = Image.open(src).convert('RGBA')

# Crop face cleanly
crop_box = (27, 5, 207, 185)
face = im.crop(crop_box)

# Enhance slightly for small icon clarity
enhancer = ImageEnhance.Sharpness(face)
face = enhancer.enhance(1.35)
enhancer = ImageEnhance.Contrast(face)
face = enhancer.enhance(1.1)

# Target base canvas 512x512
size = 512
canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))

# Create circular mask
mask = Image.new('L', (size, size), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((8, 8, size - 8, size - 8), fill=255)

# Resize face to fit inner circle
inner_size = size - 16
face_resized = face.resize((inner_size, inner_size), Image.Resampling.LANCZOS)

# Create circular face
face_circle = Image.new('RGBA', (size, size), (0, 0, 0, 0))
face_circle.paste(face_resized, (8, 8))

# Put circular face on canvas
canvas.paste(face_circle, (0, 0), mask=mask)

# Draw cyber red border ring
draw_canvas = ImageDraw.Draw(canvas)
# Outer red ring
draw_canvas.ellipse((4, 4, size - 4, size - 4), outline=(239, 68, 68, 255), width=10)
# Subtle inner dark ring
draw_canvas.ellipse((10, 10, size - 10, size - 10), outline=(13, 9, 11, 200), width=4)

# Ensure public directory exists
os.makedirs('public', exist_ok=True)

# Save standard png sizes
canvas.save('public/favicon-512x512.png', 'PNG')
canvas.resize((192, 192), Image.Resampling.LANCZOS).save('public/favicon-192x192.png', 'PNG')
canvas.resize((180, 180), Image.Resampling.LANCZOS).save('public/apple-touch-icon.png', 'PNG')
canvas.resize((64, 64), Image.Resampling.LANCZOS).save('public/favicon-64x64.png', 'PNG')
canvas.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon-32x32.png', 'PNG')
canvas.resize((16, 16), Image.Resampling.LANCZOS).save('public/favicon-16x16.png', 'PNG')
canvas.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon.png', 'PNG')

# Save multi-resolution .ico
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
canvas.save('public/favicon.ico', format='ICO', sizes=ico_sizes)

# Also create high-res SVG with embedded base64
buffered = io.BytesIO()
canvas.resize((128, 128), Image.Resampling.LANCZOS).save(buffered, format='PNG')
img_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <clipPath id="circleClip">
      <circle cx="64" cy="64" r="60" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,{img_b64}" width="128" height="128" clip-path="url(#circleClip)" />
  <circle cx="64" cy="64" r="61" fill="none" stroke="#ef4444" stroke-width="4" />
</svg>"""

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('SUCCESS: All favicon assets generated from Rishikesh photo.')
