#!/usr/bin/env python3
"""
Generate product images matching the clothing shown on the AI model.
Editorial flat-lay / product photography style.
"""

import os, time, io, sys, base64
import requests
from PIL import Image

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
API_KEY = ""
with open(env_path) as f:
    for line in f:
        if line.startswith('OPENAI_API_KEY='):
            API_KEY = line.split('=', 1)[1].strip()

if not API_KEY:
    sys.exit("ERROR: OPENAI_API_KEY not found in .env")

PRODUCTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'products')
os.makedirs(PRODUCTS_DIR, exist_ok=True)

# Style base for all product shots
SHOT_STYLE = (
    "Clean editorial fashion product photography. "
    "Pure white seamless background. "
    "Soft even studio lighting, no harsh shadows. "
    "Premium, high-end fashion store aesthetic. "
    "No text, no logos, no watermarks, no price tags. "
    "Professional product photography, sharp focus."
)

PRODUCTS = [
    (
        "beige-business-jacket.jpg",
        "Beige business jacket",
        (
            f"{SHOT_STYLE} "
            "A single elegant structured beige camel-colored business blazer jacket, "
            "displayed on an invisible mannequin. "
            "Premium wool fabric, padded structured shoulders, clean tailored silhouette. "
            "Slightly open front, no shirt underneath. "
            "Neutral beige-camel color, refined and sophisticated."
        )
    ),
    (
        "white-minimal-shirt.jpg",
        "White minimal shirt",
        (
            f"{SHOT_STYLE} "
            "A single crisp white minimal dress shirt, "
            "displayed neatly folded or on invisible mannequin. "
            "Clean poplin cotton, hidden button placket, spread collar. "
            "Pure optic white color, perfectly pressed, no wrinkles."
        )
    ),
    (
        "black-tailored-trousers.jpg",
        "Black tailored trousers",
        (
            f"{SHOT_STYLE} "
            "A single pair of high-waisted black tailored dress trousers, "
            "displayed on invisible mannequin or flat-lay. "
            "Italian crepe fabric, slim straight cut, sharp pressed center crease. "
            "Deep solid black color, elegant drape."
        )
    ),
    (
        "leather-loafers.jpg",
        "Leather loafers",
        (
            f"{SHOT_STYLE} "
            "A pair of cognac brown leather penny loafers, "
            "displayed side by side at a slight angle. "
            "Classic silhouette, hand-stitched detail, leather sole, low heel. "
            "Rich warm cognac-brown color, high-gloss polished leather."
        )
    ),
    (
        "silver-watch.jpg",
        "Silver watch",
        (
            f"{SHOT_STYLE} "
            "A single elegant slim silver minimalist watch, "
            "displayed flat on white surface. "
            "Clean round case, white dial, silver Milanese mesh bracelet or slim steel bracelet. "
            "Swiss-style minimal design, no numerals or minimal markers."
        )
    ),
    (
        "black-bag.jpg",
        "Black leather tote bag",
        (
            f"{SHOT_STYLE} "
            "A single structured black leather tote bag, "
            "standing upright. "
            "Full-grain calf leather, gold-tone hardware, clean minimal design. "
            "Medium size, business appropriate, elegant silhouette."
        )
    ),
    (
        "casual-hoodie.jpg",
        "Camel hoodie",
        (
            f"{SHOT_STYLE} "
            "A single premium camel-colored heavyweight hoodie, "
            "displayed folded or on invisible mannequin. "
            "Oversized relaxed fit, soft fleece interior, no logos. "
            "Warm camel-beige color, elevated casual aesthetic."
        )
    ),
    (
        "blue-jeans.jpg",
        "Dark wash jeans",
        (
            f"{SHOT_STYLE} "
            "A single pair of dark indigo slim-straight jeans, "
            "displayed flat-lay or on invisible mannequin. "
            "Clean dark wash, minimal visible seams, no distressing. "
            "Deep indigo-navy color, Japanese selvedge denim aesthetic."
        )
    ),
    (
        "white-sneakers.jpg",
        "White leather sneakers",
        (
            f"{SHOT_STYLE} "
            "A pair of clean white leather low-top sneakers, "
            "displayed side by side at slight angle. "
            "Minimal design, smooth full-grain leather upper, white cupsole. "
            "Pure white color, elegant and minimal."
        )
    ),
    (
        "trench-coat.jpg",
        "Classic trench coat",
        (
            f"{SHOT_STYLE} "
            "A single elegant classic camel trench coat, "
            "displayed on invisible mannequin, belt loosely tied. "
            "Double-breasted, structured lapels, water-resistant gabardine fabric. "
            "Classic camel color, timeless silhouette."
        )
    ),
    (
        "black-dress.jpg",
        "Tailored black midi dress",
        (
            f"{SHOT_STYLE} "
            "A single elegant tailored black midi dress, "
            "displayed on invisible mannequin. "
            "Structured bodice, midi length, clean minimal silhouette. "
            "Deep solid black color, sophisticated and refined."
        )
    ),
    (
        "knit-sweater.jpg",
        "Cream merino knit sweater",
        (
            f"{SHOT_STYLE} "
            "A single premium cream-colored fine merino knit sweater, "
            "displayed folded or on invisible mannequin. "
            "Fine ribbed texture, crew neck, ribbed cuffs and hem. "
            "Warm oat-cream color, luxurious soft feel."
        )
    ),
]

def generate(prompt: str) -> Image.Image:
    r = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={"model": "gpt-image-1", "prompt": prompt, "n": 1,
              "size": "1024x1024", "quality": "medium"},
        timeout=120
    )
    d = r.json()
    if 'error' in d:
        raise RuntimeError(f"API error: {d['error']['message']}")
    raw = base64.b64decode(d['data'][0]['b64_json'])
    return Image.open(io.BytesIO(raw)).convert('RGB')

def save(img: Image.Image, filename: str):
    path = os.path.join(PRODUCTS_DIR, filename)
    img.save(path, 'JPEG', quality=92)
    print(f"  ✓ {filename}  ({os.path.getsize(path)//1024} KB)")

def main():
    print(f"\n══════════════════════════════════════════")
    print(f"  SmartOutfit — Product Image Pipeline")
    print(f"  Generating {len(PRODUCTS)} product photos")
    print(f"══════════════════════════════════════════\n")

    for i, (filename, label, prompt) in enumerate(PRODUCTS, 1):
        print(f"[{i}/{len(PRODUCTS)}] {label}…")
        try:
            img = generate(prompt)
            save(img, filename)
        except Exception as e:
            print(f"  ✗ FAILED: {e}")
            # Continue with remaining products
        if i < len(PRODUCTS):
            time.sleep(2)

    print(f"\n══════════════════════════════════════════")
    print(f"  ✓ Product images done!")
    print(f"══════════════════════════════════════════\n")

if __name__ == '__main__':
    main()
