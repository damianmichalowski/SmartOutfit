#!/usr/bin/env python3
"""
Generate 5 progressive outfit model images for SmartOutfit demo.
Each image is generated directly with gpt-image-1 using consistent prompts.
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

# Consistent model description used in every prompt
MODEL_DESC = (
    "Tall slim female fashion model, approximately 175cm, warm olive skin tone, "
    "dark brown straight hair neatly pulled back in a tight low bun. "
    "Neutral straight standing pose facing forward, arms relaxed at sides, feet hip-width apart. "
    "Pure seamless bright white studio background. "
    "Soft even diffused studio lighting from front-left, no harsh shadows. "
    "Full body shot, head to toe, 85mm lens perspective, sharp focus throughout. "
    "High-end fashion editorial photography style. "
    "No text, no logos, no watermarks."
)

IMAGES = [
    (
        "model-base.jpg",
        "Step 0 — neutral base",
        (
            f"Professional fashion editorial photograph. {MODEL_DESC} "
            "She wears a plain light cream minimalist fitted turtleneck top and plain cream slim tailored trousers. "
            "Minimal white low-top sneakers. Completely plain, no patterns, no accessories. "
            "This is the starting neutral look."
        )
    ),
    (
        "model-jacket.jpg",
        "Step 1 — beige business jacket",
        (
            f"Professional fashion editorial photograph. {MODEL_DESC} "
            "She wears an elegant structured beige camel business blazer jacket. "
            "Premium wool fabric, padded structured shoulders, slightly open front showing a white shirt collar. "
            "Slim light-colored trousers below. Low heeled loafers. "
            "Sophisticated business casual silhouette."
        )
    ),
    (
        "model-jacket-trousers.jpg",
        "Step 2 — jacket + black trousers",
        (
            f"Professional fashion editorial photograph. {MODEL_DESC} "
            "She wears a coordinated premium business suit: "
            "elegant structured beige camel blazer jacket on top, "
            "and high-waisted black tailored dress trousers on the bottom. "
            "Italian crepe fabric trousers with sharp pressed crease, slim straight cut. "
            "Simple loafers. Refined business professional silhouette."
        )
    ),
    (
        "model-jacket-trousers-shoes.jpg",
        "Step 3 — full suit + leather loafers",
        (
            f"Professional fashion editorial photograph. {MODEL_DESC} "
            "She wears a complete premium business suit: "
            "structured beige camel business blazer jacket, "
            "high-waisted black tailored dress trousers, "
            "and cognac brown leather penny loafers — classic shape, hand-stitched detail. "
            "The full outfit: sophisticated, elegant, business professional."
        )
    ),
    (
        "model-business-complete.jpg",
        "Step 4 — complete AI-styled look",
        (
            f"Professional fashion editorial photograph. {MODEL_DESC} "
            "She wears a complete polished business meeting outfit: "
            "crisp white minimal dress shirt with clean collar visible, "
            "structured beige camel business blazer jacket over the shirt, "
            "high-waisted black tailored dress trousers, "
            "cognac brown leather penny loafers, "
            "and a slim elegant silver minimalist watch on the left wrist. "
            "The look is refined, polished, and perfectly styled for a high-end business meeting. "
            "Premium fashion editorial, every detail perfect."
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
    path = os.path.join(MODELS_DIR, filename)
    img.save(path, 'JPEG', quality=92)
    print(f"  ✓ {filename}  ({os.path.getsize(path)//1024} KB)")

def main():
    print("\n══════════════════════════════════════════")
    print("  SmartOutfit — AI Model Image Pipeline")
    print(f"  Generating {len(IMAGES)} images with gpt-image-1")
    print("══════════════════════════════════════════\n")

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

    print("\n══════════════════════════════════════════")
    print("  ✓ All images generated!")
    print("══════════════════════════════════════════\n")

if __name__ == '__main__':
    main()
