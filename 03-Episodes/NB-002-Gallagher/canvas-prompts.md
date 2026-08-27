# Higgsfield Canvas Asset Generation Prompts (Episode 2: The Gallaghers)

This file contains the exact, copy-pasteable prompts for the image generation nodes in your Higgsfield Canvas. These prompts implement the **Condensed Style Prefix** to stay under the 220-word linter limit of `seedance_lint.py`, enforce the luxury brand guidelines, and use the **Identity vs. Composition** separation format to prevent visual drift.

---

## 🎨 Global Visual Style Prefix
This prefix must be prepended verbatim to the top of every prompt to lock in the 8K commercial aesthetic:

```
Style: 8K IMAX commercial, 16:9 widescreen, photorealistic. Lighting: Soft natural daylight, gentle haze. Color: 60:30:10. Camera: Cine lens, 180° shutter blur. Realism: Pore-level skin detail, Hollywood acting, natural physics, rule of thirds, 24fps. Continuity: Identical characters and environment.
```

---

## 📝 Canvas Node Prompts

### Node 1: The Gallaghers (Homeowners)
* **Canvas Location**: Row 1 Image Generation node (connected to your uploaded homeowners image)
* **Aspect Ratio in UI**: Change from `1:1` to `16:9`
* **Model in UI**: `GPT Image 2` (or `Soul 2.0` for high-aesthetic fashion portraiture)

```
/tv-ad Style: 8K IMAX commercial, 16:9 widescreen, photorealistic. Lighting: Soft natural daylight, gentle haze. Color: 60:30:10. Camera: Cine lens, 180° shutter blur. Realism: Pore-level skin detail, Hollywood acting, natural physics, rule of thirds, 24fps. Continuity: Identical characters and environment.

Characters:
@Richard — distinguished gentleman in his 50s, refined coastal look, graying hair at temples, warm brown eyes, wearing a light blue linen button-down shirt and beige chinos.
@Elizabeth — elegant woman in her 50s, shoulder-length champagne-blonde hair, warm eyes, wearing a white silk blouse and gold earrings.

Scene:
Starting from the facial identities in the reference image. Richard and Elizabeth stand side-by-side on the stone terrace of their Newport Beach Mediterranean estate, looking towards their home with expressions of deep pride and satisfaction.

Composition:
Medium two-shot, eye-level, static. The warm beige Mediterranean facade of the villa is softly out of focus in the background, illuminated by natural morning daylight. Anatomically correct, natural skin texture, subtle imperfections.
```

---

### Node 2: Fabian (CEO - Host/Narrator)
* **Canvas Location**: Row 2 Image Generation node (connected to your uploaded Fabian image)
* **Aspect Ratio in UI**: Change from `1:1` to `16:9`
* **Model in UI**: `GPT Image 2` (or `Nano Banana Pro` for maximum sharpness)

```
/tv-ad Style: 8K IMAX commercial, 16:9 widescreen, photorealistic. Lighting: Soft natural daylight, gentle haze. Color: 60:30:10. Camera: Cine lens, 180° shutter blur. Realism: Pore-level skin detail, Hollywood acting, natural physics, rule of thirds, 24fps. Continuity: Identical characters and environment.

Characters:
@fabian-5 — athletic, muscular bald Latin man in his late 30s, warm brown eyes, clean-shaven, wearing a custom white polo shirt with the gold crown logo embroidered on the left chest, and fitted white jeans.

Scene:
Starting from the facial identity in the reference image. Host (@fabian-5) stands in the front driveway courtyard of the luxury Newport Beach estate, smiling confidently.

Composition:
Medium close portrait, eye-level, static. Host (@fabian-5) is centered, looking directly into the camera with an expression of warmth and prestige. The grand facade of the estate melts into a soft background bokeh. Anatomically correct, natural skin texture, subtle imperfections.
```

---

### Node 3: House (Before)
* **Canvas Location**: Row 3 Image Generation node (connected to your uploaded house image)
* **Aspect Ratio in UI**: Change from `1:1` to `16:9`
* **Model in UI**: `GPT Image 2` (or `Nano Banana Pro` for architectural detail)

```
/tv-ad Style: 8K IMAX commercial, 16:9 widescreen, photorealistic. Lighting: Soft natural daylight, gentle haze. Color: 60:30:10. Camera: Cine lens, 180° shutter blur. Realism: natural physics, rule of thirds, 24fps. Continuity: Identical environment.

Scene:
Starting from the architectural layout of the reference image (@villa_before). A grand Mediterranean Revival villa (@villa_before) in Pelican Hill, Newport Beach. The exterior walls are weathered off-white stucco with faded, peeling brown wood trim and outdated heavy black coach lights. Worn wood wood carriage garage doors line the side.

Composition:
Wide establishing shot, low-angle, static. The brick-accented stone driveway stretches into the foreground, flanked by manicured green hedges. Soft morning daylight washes over the facade, highlighting the weathered textures. Clean vertical lines, realistic surfaces.
```

---

### Node 4: House (After - Newport Fog Palette)
* **Canvas Location**: Create a new node or use for the final transition step
* **Aspect Ratio in UI**: `16:9`
* **Model in UI**: `GPT Image 2` (or `Nano Banana Pro` for architectural detail)

```
/tv-ad Style: 8K IMAX commercial, 16:9 widescreen, photorealistic. Lighting: Soft natural daylight, gentle haze. Color: 60:30:10. Camera: Cine lens, 180° shutter blur. Realism: natural physics, rule of thirds, 24fps. Continuity: Identical environment.

Scene:
Starting from the architectural layout of the reference image (@villa_after). The same grand Mediterranean Revival villa (@villa_after) in Pelican Hill, Newport Beach, now pristine and fully transformed. The main stucco body is painted in a clean, modern Sherwin-Williams Repose Gray. The trim, fascia, and moldings are in a crisp Sherwin-Williams Origami White. The shutters, front double door, and the newly upgraded modern glass-panel carriage garage doors are in a deep Sherwin-Williams Tricorn Black. Minimalist LED wall sconces replace the old coach lights. The front entrance columns feature a base of stacked natural stone cladding.

Composition:
Wide establishing shot, low-angle, static. The brick-accented stone driveway is clean, flanked by manicured green hedges. Warm daylight illuminates the flawless paint finish and architectural upgrades. Clean vertical lines, realistic paint and stone textures.
```
