#!/usr/bin/env python3
"""
Full-generation approach for SmartOutfit.
Each step generates a complete new image with the full accumulated outfit.
Same model description in every prompt for maximum consistency.
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

W, H = 1024, 1536

# ── Model identity anchor (repeated in every prompt for consistency) ──────────
MODEL_ANCHOR = (
    "Full body fashion photo from top of head to tips of toes, no cropping. "
    "Tall slim female model, warm olive skin, long dark hair loosely tied back. "
    "Standing straight, arms relaxed at sides, neutral confident expression. "
    "Barefoot unless shoes are specified. "
    "Transparent background. Soft even studio lighting, sharp focus. "
    "No text, no logos, no watermarks."
)

# ── Per-step outfit descriptions ──────────────────────────────────────────────

STEP_PROMPTS = {
    'model-base': (
        MODEL_ANCHOR +
        " Outfit: simple white cotton loungewear — loose long-sleeve top and wide-leg pants."
    ),
    'model-jacket': (
        MODEL_ANCHOR +
        " Outfit: elegant structured beige camel business blazer jacket worn open,"
        " over a simple white top. White loose trousers or pajama pants on the lower body."
        " Padded shoulders, tailored fit, premium wool look."
    ),
    'model-jacket-trousers': (
        MODEL_ANCHOR +
        " Outfit: elegant beige camel business blazer jacket worn open,"
        " over a simple white top."
        " High-waisted black tailored dress trousers on the lower body,"
        " slim straight cut, sharp pressed crease."
        " Barefoot."
    ),
    'model-jacket-trousers-shoes': (
        MODEL_ANCHOR +
        " Outfit: elegant beige camel business blazer jacket worn open,"
        " over a simple white top."
        " High-waisted black tailored dress trousers."
        " Cognac brown leather penny loafers on both feet,"
        " classic silhouette, low heel."
    ),
    'model-business-complete': (
        MODEL_ANCHOR +
        " Outfit: elegant beige camel business blazer jacket."
        " Crisp white dress shirt with visible collar above the lapel."
        " High-waisted black tailored dress trousers."
        " Cognac brown leather penny loafers."
        " Slim silver minimalist watch on the left wrist."
        " Complete polished business look."
    ),
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def b64_to_img(b64: str, size=(W, H)) -> Image.Image:
    raw = base64.b64decode(b64)
    img = Image.open(io.BytesIO(raw)).convert('RGBA')
    if img.size != size:
        img = img.resize(size, Image.LANCZOS)
    return img

def save(img: Image.Image, name: str):
    path = os.path.join(MODELS_DIR, name)
    img.save(path, 'PNG')
    print(f"  ✓ {name}  ({os.path.getsize(path)//1024} KB)")

def generate(prompt: str) -> Image.Image:
    print("  → gpt-image-1 generation (1024×1536)…")
    r = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "model": "gpt-image-1",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1536",
            "quality": "high",
            "background": "transparent",
            "output_format": "png",
        },
        timeout=180
    )
    d = r.json()
    if 'error' in d:
        raise RuntimeError(d['error']['message'])
    return b64_to_img(d['data'][0]['b64_json'])

# ── Pipeline ──────────────────────────────────────────────────────────────────

STEPS = [
    ('model-base',                  '[1/5] Base — white loungewear…'),
    ('model-jacket',                '[2/5] + Beige business jacket…'),
    ('model-jacket-trousers',       '[3/5] + Black tailored trousers…'),
    ('model-jacket-trousers-shoes', '[4/5] + Cognac leather loafers…'),
    ('model-business-complete',     '[5/5] + White shirt + silver watch…'),
]

def main():
    print("\n══════════════════════════════════════════")
    print("  SmartOutfit — Full-Generation Pipeline")
    print("  Portrait 1024×1536 | Transparent PNG")
    print("══════════════════════════════════════════\n")

    for name, label in STEPS:
        print(label)
        img = generate(STEP_PROMPTS[name])
        save(img, f'{name}.png')
        if name != 'model-business-complete':
            print("  (waiting 4s…)")
            time.sleep(4)

    print("\n══════════════════════════════════════════")
    print("  ✓ All 5 images generated!")
    print("══════════════════════════════════════════\n")

if __name__ == '__main__':
    main()
