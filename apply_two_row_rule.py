import base64
import io
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent
APP = ROOT.parent / "02 macOS App Store Edition" / "DesktopLightsAppStore" / "App"
OUT = ROOT / "images" / "showcases"
OUT.mkdir(parents=True, exist_ok=True)

# Halloween's already-shipped multicolor palette (identical to tint_showcases.py) --
# re-laying it out in 2 rows must not change its colors.
HAUNTED_GLOW_PALETTE = ["#A60016", "#FF6A00", "#8B35D1", "#39FF14", "#F2E9D8"]
TINT_ALPHA = 0.82

# Collections with more than 6 bulbs that were still on the old 1-row layout
# (threshold used to be "rows=2 only past 8"). Everyday Joy/Autumn Glow/
# Celestial Dreams (6 each) and the rest of the catalog at <=6 are untouched --
# they were already single-row and stay that way. Halloween keeps its existing
# multicolor tint; the other six were never re-tinted this project and keep
# their original untinted art -- this pass only changes row layout.
TWO_ROW_TARGETS = {
    "haunted-glow": True,
    "gemstones": False,
    "premium-capiz-parols": False,
    "classic-christmas": False,
    "nordic-christmas": False,
    "gambler-collection": False,
    "japanese-origami": False,
}


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4))


def tint_bulb(image, hex_color, alpha=TINT_ALPHA):
    img = image.convert("RGBA")
    arr = np.asarray(img).astype(np.float32)
    rgb = arr[..., :3]
    alpha_ch = arr[..., 3:4]
    tint = np.array(hex_to_rgb(hex_color), dtype=np.float32).reshape(1, 1, 3)
    multiplied = rgb * tint / 255.0
    out_rgb = rgb * (1 - alpha) + multiplied * alpha
    out = np.concatenate([out_rgb, alpha_ch], axis=-1)
    return Image.fromarray(np.clip(out, 0, 255).astype("uint8"), "RGBA")


def crop_visible(image, threshold=5):
    image = image.convert("RGBA")
    alpha = np.asarray(image.getchannel("A"))
    ys, xs = np.where(alpha > threshold)
    if not len(xs):
        return image
    pad = max(3, min(image.size) // 120)
    box = (
        max(0, int(xs.min()) - pad), max(0, int(ys.min()) - pad),
        min(image.width, int(xs.max()) + pad + 1),
        min(image.height, int(ys.max()) + pad + 1),
    )
    return image.crop(box)


def collection_images(collection):
    designs = collection.get("assets", {}).get("designs", {})
    ordered = []
    for preset in collection.get("presets", []):
        asset_ids = preset.get("assetIds") or ([preset["assetId"]] if preset.get("assetId") else [])
        for asset_id in asset_ids:
            if asset_id in designs and asset_id not in ordered:
                ordered.append(asset_id)
    if not ordered:
        ordered.extend(designs)
    threshold = 45 if collection.get("builtInReceptacle") else 5
    return [
        crop_visible(Image.open(io.BytesIO(base64.b64decode(designs[asset_id]))), threshold)
        for asset_id in ordered
    ]


def make_background(width=1600, height=1000):
    top = np.array([8, 12, 23], dtype=np.float32)
    bottom = np.array([37, 22, 41], dtype=np.float32)
    blend = np.linspace(0, 1, height)[:, None, None]
    rgb = top[None, None, :] * (1 - blend) + bottom[None, None, :] * blend
    rgb = np.repeat(rgb, width, axis=1)
    yy, xx = np.mgrid[0:height, 0:width]
    glow = np.exp(-(((xx - width * .5) / (width * .55)) ** 2 + ((yy - height * .34) / (height * .52)) ** 2))[:, :, None]
    rgb += glow * np.array([18, 10, 18], dtype=np.float32)
    return Image.fromarray(np.clip(rgb, 0, 255).astype("uint8"), "RGB").convert("RGBA")


def wire_points(y, width):
    return [(x, y + 10 * math.sin((x / width) * math.pi * 4)) for x in range(-20, width + 21, 4)]


def draw_socket(canvas, cx, y):
    draw = ImageDraw.Draw(canvas)
    w, h = 36, 26
    x0 = round(cx - w / 2)
    for row in range(h):
        t = row / (h - 1)
        rgb = tuple(round(a * (1 - t) + b * t) for a, b in zip((255, 203, 82), (103, 49, 7)))
        draw.rounded_rectangle((x0, y + row, x0 + w, y + row + 2), radius=5, fill=rgb + (255,))
    draw.rounded_rectangle((x0, y, x0 + w, y + h), radius=5, outline=(79, 37, 5, 230), width=2)


def place_bulb(canvas, bulb, cx, top, cell_width, max_height, glow_rgb=(255, 161, 55)):
    scale = min(cell_width * .76 / bulb.width, max_height / bulb.height)
    bulb = bulb.resize(
        (max(1, round(bulb.width * scale)), max(1, round(bulb.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x, y = round(cx - bulb.width / 2), round(top)
    mask = Image.new("L", canvas.size, 0)
    mask.paste(bulb.getchannel("A"), (x, y))
    mask = mask.filter(ImageFilter.GaussianBlur(max(10, round(max(bulb.size) * .055))))
    glow = Image.new("RGBA", canvas.size, glow_rgb + (0,))
    glow.putalpha(mask.point(lambda value: min(78, value)))
    canvas.alpha_composite(glow)
    canvas.alpha_composite(bulb, (x, y))


def make_showcase(collection_id, images, built_in=False, glow_colors=None, rows=None):
    canvas = make_background()
    count = len(images)
    if rows is None:
        rows = 2 if count > 6 else 1
    per_row = math.ceil(count / rows)
    row_height = 430 if rows == 2 else 720
    first_wire = 100 if rows == 2 else 170
    draw = ImageDraw.Draw(canvas)
    index = 0
    for row in range(rows):
        remaining = count - index
        row_count = min(per_row, remaining)
        wire_y = first_wire + row * row_height
        points = wire_points(wire_y, canvas.width)
        draw.line(points, fill=(83, 43, 10, 255), width=7)
        draw.line(points, fill=(239, 170, 54, 255), width=3)
        cell_width = canvas.width / row_count
        for col in range(row_count):
            cx = cell_width * (col + .5)
            local_wire_y = wire_y + 10 * math.sin((cx / canvas.width) * math.pi * 4)
            if not built_in:
                draw_socket(canvas, cx, round(local_wire_y - 2))
            top = local_wire_y + (2 if built_in else 22)
            glow_rgb = glow_colors[index] if glow_colors else (255, 161, 55)
            place_bulb(canvas, images[index], cx, top, cell_width, row_height - 72, glow_rgb)
            index += 1
    draw.rounded_rectangle((7, 7, 1592, 992), radius=30, outline=(244, 196, 99, 70), width=2)
    canvas.convert("RGB").save(OUT / f"{collection_id}.jpg", quality=92, optimize=True, progressive=True)


catalog = json.loads((APP / "Resources" / "AppStore-Collections.json").read_text())
collections = {item["id"]: item for item in catalog["collections"]}

for collection_id, needs_tint in TWO_ROW_TARGETS.items():
    collection = collections[collection_id]
    images = collection_images(collection)
    built_in = bool(collection.get("builtInReceptacle"))
    if needs_tint:
        tinted, glow_colors = [], []
        for i, img in enumerate(images):
            hex_color = HAUNTED_GLOW_PALETTE[i % len(HAUNTED_GLOW_PALETTE)]
            tinted.append(tint_bulb(img, hex_color))
            glow_colors.append(hex_to_rgb(hex_color))
        make_showcase(collection_id, tinted, built_in=built_in, glow_colors=glow_colors, rows=2)
    else:
        make_showcase(collection_id, images, built_in=built_in, rows=2)
    print(f"{collection_id}: {len(images)} bulbs -> 2 rows" + (" (kept multicolor)" if needs_tint else " (original art)"))

print("Done.")
