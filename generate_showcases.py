import base64
import io
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
APP = Path("/Users/michikoyamamoto/Documents/Desktop Lights Projects/02 macOS App Store Edition/DesktopLightsAppStore/App")
OUT = ROOT / "images" / "showcases"
OUT.mkdir(parents=True, exist_ok=True)

BASIC = [
    "mini-globe", "classic-a19", "round-globe", "mini-edison",
    "spiral-edison", "oversized-globe", "shallow-dome", "short-tube",
    "slender-teardrop", "fluted-oval", "smooth-capsule", "long-tube",
    "tube", "diamond", "edison-teardrop", "tapered-c7",
]
VINTAGE = [
    "mini-globe", "shallow-dome", "fluted-oval", "smooth-capsule",
    "tube", "diamond", "edison-teardrop", "tapered-c7",
]


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
    # Only showcase actual bulb presets. Some collections also keep artwork
    # used solely by garlands (for example the Origami Crane); presenting
    # every raw asset would incorrectly advertise those as bulb designs.
    if not ordered:
        ordered.extend(designs)
    threshold = 45 if collection.get("builtInReceptacle") else 5
    return [
        crop_visible(Image.open(io.BytesIO(base64.b64decode(designs[asset_id]))), threshold)
        for asset_id in ordered
    ]


def folder_images(folder, names):
    return [
        crop_visible(Image.open(APP / "Resources" / folder / f"{name}.png"))
        for name in names
    ]


def make_background(width=1600, height=1000):
    top = np.array([8, 12, 23], dtype=np.float32)
    bottom = np.array([37, 22, 41], dtype=np.float32)
    blend = np.linspace(0, 1, height)[:, None, None]
    rgb = top[None, None, :] * (1 - blend) + bottom[None, None, :] * blend
    rgb = np.repeat(rgb, width, axis=1)
    yy, xx = np.mgrid[0:height, 0:width]
    glow = np.exp(-(((xx-width*.5)/(width*.55))**2 + ((yy-height*.34)/(height*.52))**2))[:, :, None]
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
        rgb = tuple(round(a*(1-t)+b*t) for a, b in zip((255, 203, 82), (103, 49, 7)))
        draw.rounded_rectangle((x0, y+row, x0+w, y+row+2), radius=5, fill=rgb + (255,))
    draw.rounded_rectangle((x0, y, x0+w, y+h), radius=5, outline=(79, 37, 5, 230), width=2)


def place_bulb(canvas, bulb, cx, top, cell_width, max_height):
    scale = min(cell_width * .76 / bulb.width, max_height / bulb.height)
    bulb = bulb.resize(
        (max(1, round(bulb.width*scale)), max(1, round(bulb.height*scale))),
        Image.Resampling.LANCZOS,
    )
    x, y = round(cx-bulb.width/2), round(top)
    mask = Image.new("L", canvas.size, 0)
    mask.paste(bulb.getchannel("A"), (x, y))
    mask = mask.filter(ImageFilter.GaussianBlur(max(10, round(max(bulb.size)*.055))))
    glow = Image.new("RGBA", canvas.size, (255, 161, 55, 0))
    glow.putalpha(mask.point(lambda value: min(78, value)))
    canvas.alpha_composite(glow)
    canvas.alpha_composite(bulb, (x, y))


def make_showcase(collection_id, images, built_in=False):
    canvas = make_background()
    count = len(images)
    rows = 1 if count <= 8 else 2
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
            place_bulb(canvas, images[index], cx, top, cell_width, row_height - 72)
            index += 1
    draw.rounded_rectangle((7, 7, 1592, 992), radius=30, outline=(244, 196, 99, 70), width=2)
    canvas.convert("RGB").save(OUT / f"{collection_id}.jpg", quality=92, optimize=True, progressive=True)


catalog = json.loads((APP / "Resources" / "AppStore-Collections.json").read_text())
collections = {item["id"]: item for item in catalog["collections"]}
make_showcase("basic-lights", folder_images("BasicLights", BASIC))
make_showcase("vintage-glass-bulbs", folder_images("VintageGlassBulbs", VINTAGE))
for collection_id, collection in collections.items():
    make_showcase(collection_id, collection_images(collection), bool(collection.get("builtInReceptacle")))
print(f"Generated {len(collections)+2} collection showcases in {OUT}")
