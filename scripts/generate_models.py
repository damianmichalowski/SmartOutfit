#!/usr/bin/env python3
"""
Generate 5 progressive outfit model images for SmartOutfit demo.
Transparent PNG background, full body head-to-toe visible.
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

MODELS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

# Shared model description — used identically in every prompt for consistency
MODEL_DESC = (
    "Tall slim female fashion model, 178 cm, warm olive skin, "
    "dark brown hair neatly tied back. "
    "FULL BODY VISIBLE from the very top of the head to the bottom of the feet — "
    "do not crop any part of the body. "
    "Straight neutral standing pose facing forward, arms relaxed at sides. "
    "Transparent background — no background at all, just the model. "
    "Soft even studio lighting. "
    "Full body portrait, 85mm equivalent, sharp focus everywhere. "
    "No text, no watermarks, no props."
)

IMAGES = [
    (
        "model-base.png",
        "Base — white pajamas / loungewear",
        (
            f"{MODEL_DESC} "
            "She wears very simple plain white cotton pajama set: "
            "loose white long-sleeve top and white wide-leg pants. "
            "Minimal, no patterns, no logos. Barefoot or white socks. "
            "Complete body visible, head to feet."
        )
    ),
    (
        "model-jacket.png",
        "Step 1 — beige business jacket",
        (
            f"{MODEL_DESC} "
            "She wears an elegant structured beige camel business blazer jacket "
            "over a simple white top, with simple beige trousers or skirt below. "
            "Premium wool, padded shoulders, tailored fit. "
            "Complete body visible from top of head to feet."
        )
    ),
    (
        "model-jacket-trousers.png",
        "Step 2 — jacket + black tailored trousers",
        (
            f"{MODEL_DESC} "
            "She wears a coordinated business suit: "
            "structured beige camel blazer jacket on top, "
            "high-waisted black tailored dress trousers on the bottom. "
            "Slim straight cut, sharp crease. Simple flat shoes or bare feet. "
            "Complete body visible from top of head to bottom of feet."
        )
    ),
    (
        "model-jacket-trousers-shoes.png",
        "Step 3 — full suit + cognac loafers",
        (
            f"{MODEL_DESC} "
            "She wears: structured beige camel business blazer jacket, "
            "high-waisted black tailored dress trousers, "
            "and cognac brown leather penny loafers. "
            "Classic loafer silhouette, hand-stitched. "
            "SHOES MUST BE FULLY VISIBLE at the bottom. "
            "Complete body from top of head to bottom of shoes."
        )
    ),
    (
        "model-business-complete.png",
        "Step 4 — complete AI-styled business look",
        (
            f"{MODEL_DESC} "
            "She wears the complete polished business outfit: "
            "crisp white minimal dress shirt with clean collar, "
            "structured beige camel blazer jacket over the shirt, "
            "high-waisted black tailored dress trousers, "
            "cognac brown leather penny loafers, "
            "slim silver minimalist watch on left wrist. "
            "SHOES MUST BE FULLY VISIBLE at the bottom. "
            "Complete body from very top of head to bottom of shoes — nothing cropped."
        )
    ),
]

def generate(prompt: str) -> Image.Image:
    r = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "model": "gpt-image-1",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
            "quality": "high",
            "background": "transparent",
            "output_format": "png",
        },
        timeout=180
    )
    d = r.json()
    if 'error' in d:
        raise RuntimeError(f"API error: {d['error']['message']}")
    raw = base64.b64decode(d['data'][0]['b64_json'])
    return Image.open(io.BytesIO(raw)).convert('RGBA')

def save(img: Image.Image, filename: str):
    path = os.path.join(MODELS_DIR, filename)
    img.save(path, 'PNG')
    print(f"  ✓ {filename}  ({os.path.getsize(path)//1024} KB)")

def main():
    print(f"\n══════════════════════════════════════════")
    print(f"  SmartOutfit — Model Images (transparent PNG)")
    print(f"══════════════════════════════════════════\n")

    for i, (filename, label, prompt) in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {label}…")
        try:
            img = generate(prompt)
            save(img, filename)
        except Exception as e:
            print(f"  ✗ FAILED: {e}")
            sys.exit(1)
        if i < len(IMAGES):
            time.sleep(3)

    print(f"\n══════════════════════════════════════════")
    print(f"  ✓ All done!")
    print(f"══════════════════════════════════════════\n")

if __name__ == '__main__':
    main()
