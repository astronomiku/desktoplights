import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent
APP = ROOT.parent / "02 macOS App Store Edition" / "DesktopLightsAppStore" / "App"
OUT = ROOT / "images" / "showcases"
OUT.mkdir(parents=True, exist_ok=True)

# Real bulb-shape lists, read directly from ChristmasLights.m's
# loadBasicLightFramesAtIndex:/loadVintageGlassFramesAtIndex: (the actual
# assetIDs arrays the app loads), NOT from the BasicLights folder's full
# file listing -- that folder has 16 PNGs but only 6 are actually wired up
# for Basic Lights; the other 10 are unused leftovers. Basic Lights also has
# two non-artwork style entries (Fairy Lights: procedural, no image; Mixed
# Incandescent: cycles these same 6) which aren't distinct shapes to show.
BASIC = [
    "mini-edison", "classic-a19", "short-tube",
    "spiral-edison", "round-globe", "oversized-globe",
]
VINTAGE = [
    "mini-globe", "edison-teardrop", "tapered-c7", "fluted-oval",
    "diamond", "shallow-dome", "smooth-capsule", "tube",
]

# Classic Collection's real "Multicolor" palette, read directly from
# ChristmasLights.m's effectivePaletteSets (the same color menu Basic
# Lights and Vintage Glass Bulbs are styled through -- neither is a JSON
# catalog collection with its own palette). Not naturalHueTint, so the app
# renders it with kCGBlendModeMultiply at tintAlpha .82, reproduced here.
#   deepRed      colorWithCalibratedRed:.72 green:.025 blue:.055 -> #B8060E
#   systemGreen  NSColor.systemGreenColor                        -> #34C759
#   systemYellow NSColor.systemYellowColor                       -> #FFCC00
#   deepBlue     colorWithCalibratedRed:.025 green:.14 blue:.72  -> #0624B8
#   warmWhite    colorWithCalibratedRed:1 green:.82 blue:.54     -> #FFD18A
#   white        NSColor.whiteColor                              -> #FFFFFF
#   paleIceBlue  colorWithCalibratedRed:.72 green:.88 blue:1     -> #B8E0FF
CLASSIC_MULTICOLOR = ["#B8060E", "#34C759", "#FFCC00", "#0624B8", "#FFD18A", "#FFFFFF", "#B8E0FF"]
TINT_ALPHA = 0.82


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


def folder_images(folder, names):
    return [crop_visible(Image.open(APP / "Resources" / folder / f"{name}.png")) for name in names]


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


FAIRY = "__fairy_lights__"


def draw_fairy_tile(canvas, cx, wire_y, cell_width, max_height, colors):
    """Fairy Lights has no bundled artwork -- it's the app's own procedural
    look (drawFairyLightsWithScale: 3 loose copper micro-wire strands with
    small multicolor LED dots, no socket/bulb shell). Reproduced here at
    showcase scale rather than substituting an unrelated bulb image."""
    draw = ImageDraw.Draw(canvas)
    copper_dark, copper_gold = (110, 61, 20, 255), (230, 163, 64, 255)
    span = cell_width * 0.92
    x0, x1 = cx - span / 2, cx + span / 2
    strands = 3
    tile_h = max_height * 0.82
    glow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    dots = []
    for strand in range(strands):
        y_base = wire_y + 16 + tile_h * ((strand + 0.5) / strands)
        amp = tile_h / strands * 0.32
        pts = [
            (x0 + t / 30 * (x1 - x0), y_base + amp * math.sin((t / 30) * math.pi * 3 + strand * 1.7))
            for t in range(31)
        ]
        draw.line(pts, fill=copper_dark, width=3)
        draw.line(pts, fill=copper_gold, width=1)
        n_dots = 7
        for d in range(n_dots):
            t = (d + 0.5) / n_dots
            x = x0 + t * (x1 - x0)
            y = y_base + amp * math.sin(t * math.pi * 3 + strand * 1.7)
            dots.append((x, y, strand * n_dots + d))
    for x, y, idx in dots:
        color = hex_to_rgb(colors[idx % len(colors)])
        glow_draw.ellipse((x - 22, y - 22, x + 22, y + 22), fill=color + (190,))
    canvas.alpha_composite(glow_layer.filter(ImageFilter.GaussianBlur(9)))
    draw = ImageDraw.Draw(canvas)
    for x, y, idx in dots:
        color = hex_to_rgb(colors[idx % len(colors)])
        r = 6.5
        draw.ellipse((x - r, y - r, x + r, y + r), fill=color + (255,))
        draw.ellipse((x - r * .4, y - r * .55, x - r * .4 + r * .7, y - r * .55 + r * .7), fill=(255, 255, 255, 235))


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


def make_showcase(collection_id, images, glow_colors=None, rows=None):
    canvas = make_background()
    count = len(images)
    # Michiko's rule for this pass: more than 6 bulbs -> split across 2 rows
    # (both Basic Lights at 16 and Vintage Glass Bulbs at 8 qualify).
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
            if images[index] == FAIRY:
                draw_fairy_tile(canvas, cx, local_wire_y, cell_width, row_height - 72, CLASSIC_MULTICOLOR)
            else:
                draw_socket(canvas, cx, round(local_wire_y - 2))
                top = local_wire_y + 22
                glow_rgb = glow_colors[index] if glow_colors else (255, 161, 55)
                place_bulb(canvas, images[index], cx, top, cell_width, row_height - 72, glow_rgb)
            index += 1
    draw.rounded_rectangle((7, 7, 1592, 992), radius=30, outline=(244, 196, 99, 70), width=2)
    canvas.convert("RGB").save(OUT / f"{collection_id}.jpg", quality=92, optimize=True, progressive=True)


for collection_id, folder, names, include_fairy in [
    ("basic-lights", "BasicLights", BASIC, True),
    ("vintage-glass-bulbs", "VintageGlassBulbs", VINTAGE, False),
]:
    images = folder_images(folder, names)
    tinted, glow_colors = [], []
    for i, img in enumerate(images):
        hex_color = CLASSIC_MULTICOLOR[i % len(CLASSIC_MULTICOLOR)]
        tinted.append(tint_bulb(img, hex_color))
        glow_colors.append(hex_to_rgb(hex_color))
    if include_fairy:
        # Fairy Lights is a real, selectable Basic Lights style (it just has
        # no bundled bulb artwork -- procedural, see draw_fairy_tile above).
        # Michiko asked for it shown alongside the other bulbs.
        tinted.append(FAIRY)
        glow_colors.append((255, 255, 255))
    # Michiko's rule: more than 6 bulbs -> 2 rows. Basic Lights is 6 real
    # shapes + Fairy Lights = 7, so it now crosses into 2 rows too;
    # Vintage Glass Bulbs (8) stays 2 rows as before.
    rows = 2 if len(tinted) > 6 else 1
    make_showcase(collection_id, tinted, glow_colors=glow_colors, rows=rows)
    print(f"Retinted {collection_id} with {len(tinted)} item(s) across {rows} row(s), multicolor" + (" (incl. Fairy Lights)" if include_fairy else ""))

print("Done.")
