"""
Turns the Google Flow head-turn video into the frames the hero uses.

    python3 scripts/build-hero-frames.py path/to/video.mov

How it works (in simple words):
1. The video shows my head turning from looking UP, round to the RIGHT, then DOWN.
   I picked the moments (timestamps) for each direction by watching it frame by frame.
2. For every one of 64 directions around a circle (5.625 degrees apart) we grab the
   best-matching frame. The LEFT half of the circle is the right half MIRRORED,
   because the video only turns one way, and my face and hair are nearly symmetric.
3. Frames are cropped so I'm in the middle, the screen-recording cursor is painted out,
   and everything is saved as small WebP images in public/hero/frames/.
4. center.webp = looking straight at you. cutout.png = me with the yellow removed.
"""
import sys, os, math, json
import cv2
import numpy as np

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "hero")
os.makedirs(os.path.join(OUT, "frames"), exist_ok=True)

# (time in seconds, head direction in degrees: 0 = right, 90 = up, -90 = down)
ANCHORS = [(1.80, 90), (2.10, 66), (2.50, 42), (2.90, 20), (3.40, 0), (4.00, -15),
           (4.50, -30), (4.90, -46), (5.20, -66), (5.55, -90)]
CENTER_T = 0.55
AXIS_X = 550            # where my body's centre line is in the recording
TRIM = (2, 2, 3, 3)     # black recording border: top, bottom, left, right
N = 64

cap = cv2.VideoCapture(SRC)
FPS = cap.get(cv2.CAP_PROP_FPS)

def grab(t):
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(t * FPS))
    ok, f = cap.read()
    assert ok, t
    t0, b0, l0, r0 = TRIM
    f = f[t0:f.shape[0] - b0, l0:f.shape[1] - r0]
    ax = AXIS_X - l0
    half = min(ax, f.shape[1] - ax)
    f = f[:, ax - half: ax + half]
    # paint out the pink mouse cursor from the screen recording
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (125, 60, 90), (172, 255, 255))
    mask = cv2.dilate(mask, np.ones((5, 5), np.uint8), iterations=2)
    if mask.any():
        f = cv2.inpaint(f, mask, 5, cv2.INPAINT_TELEA)
    return f

def time_for(angle):
    """Linear interpolation between the anchor directions → a moment in the video."""
    for (t1, a1), (t2, a2) in zip(ANCHORS, ANCHORS[1:]):
        if a2 <= angle <= a1:
            k = (a1 - angle) / (a1 - a2)
            return t1 + k * (t2 - t1)
    return ANCHORS[0][0] if angle > 90 else ANCHORS[-1][0]

cache = {}
for i in range(N):
    a = 360 * i / N                       # 0 = right, counter-clockwise (screen "up" is +90)
    a = (a + 180) % 360 - 180             # → -180..180
    if -90 <= a <= 90:
        t, mirror = time_for(a), False
    else:
        t, mirror = time_for(180 - a if a > 0 else -180 - a), True
    key = (round(t * FPS), mirror)
    if key not in cache:
        f = grab(t)
        cache[key] = cv2.flip(f, 1) if mirror else f
    cv2.imwrite(os.path.join(OUT, "frames", f"{i:02d}.webp"), cache[key], [cv2.IMWRITE_WEBP_QUALITY, 82])

center = grab(CENTER_T)
cv2.imwrite(os.path.join(OUT, "frames", "center.webp"), center, [cv2.IMWRITE_WEBP_QUALITY, 86])

# background colour (median of the top corners) so the page can match it exactly
corners = np.concatenate([center[:40, :40].reshape(-1, 3), center[:40, -40:].reshape(-1, 3)])
b, g, r = np.median(corners, axis=0).astype(int)
meta = {"count": N, "width": center.shape[1], "height": center.shape[0], "bg": f"#{r:02x}{g:02x}{b:02x}"}
json.dump(meta, open(os.path.join(OUT, "frames", "meta.json"), "w"))

# cut-out of me (yellow removed) for the classroom scene
hsv = cv2.cvtColor(center, cv2.COLOR_BGR2HSV)
bg = cv2.inRange(hsv, (12, 110, 140), (35, 255, 255))
bg = cv2.morphologyEx(bg, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
# keep only yellow that touches the edge of the picture (so warm skin tones inside me stay)
n, lab = cv2.connectedComponents(bg)
edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(edge)).astype(np.uint8) * 255
person = (255 - bg).astype(np.uint8)
n, lab, stats, _ = cv2.connectedComponentsWithStats(person)
biggest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
person = np.where(lab == biggest, 255, 0).astype(np.uint8)
alpha = cv2.GaussianBlur(person, (5, 5), 0)
rgba = cv2.cvtColor(center, cv2.COLOR_BGR2BGRA)
rgba[:, :, 3] = alpha
ys, xs = np.where(alpha > 20)
rgba = rgba[ys.min():, xs.min(): xs.max() + 1]
h = 520
rgba = cv2.resize(rgba, (round(rgba.shape[1] * h / rgba.shape[0]), h), interpolation=cv2.INTER_AREA)
cv2.imwrite(os.path.join(OUT, "cutout.webp"), rgba, [cv2.IMWRITE_WEBP_QUALITY, 88])
print("done", meta, "unique frames:", len(cache))
