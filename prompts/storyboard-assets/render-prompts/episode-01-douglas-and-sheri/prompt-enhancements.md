# Prompt Enhancements — V2.1 Upgrade Proposal
**Episode 01 — Douglas & Sheri**
`PROPOSAL ONLY` · `Do NOT modify render-master-v2-proven.md until Fabian approves` · `Review during preflight`

> **What this document is:** V1 carried motion, mood, light, and duration directives as Settings metadata outside the prompt body. V2 omitted them from the prompt text because it was optimized for static Cinema Studio Image renders. This document proposes embedding those directives directly into each V2 prompt body so Higgsfield receives them as generation instructions — not just notes for the operator.
>
> **What to do with it:** Review each enhancement block. If the enhanced prompt feels right, copy it into a `render-master-v2.1-enhanced.md`. Keep V2 as the untouched baseline.

---

## Enhancement Blocks — Renders A, B, C, D, E, G, K

---

### Render A · BEFORE — Cinematic Wide Establish

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of a [stucco / craftsman / two-story — describe their home style] home in Fontana, California. Current paint color is [describe: beige / tan / light brown] with [red / brown / wood] accents. Slightly desaturated. Soft overcast sky, flat diffused light — no golden hour. Slightly underexposed. Architectural details preserved exactly. Clean driveway, trimmed but unremarkable landscaping. Cinematic wide shot, slight low angle, subtle lens compression. No people. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Slow zoom in
- Mood: Pre-transformation
- Duration: 4 sec clip
- Light: (already in prompt — overcast, flat, no golden hour)

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of a [stucco / craftsman / two-story — describe their home style] home in Fontana, California. Current paint color is [describe: beige / tan / light brown] with [red / brown / wood] accents. Slightly desaturated. Soft overcast sky, flat diffused light — no golden hour. Slightly underexposed. Architectural details preserved exactly. Clean driveway, trimmed but unremarkable landscaping. Cinematic wide shot, slight low angle, subtle lens compression. No people. Ultra high resolution. Camera motion: slow zoom in toward the facade. Mood: pre-transformation — quiet, unremarkable, uninspired. Clip duration: 4 seconds.
```

**Validation Note**
- seedance_lint risk: LOW. Simple single-element prompt. Motion directive is compatible with Seedance. No content filter triggers. Safe to run as-is.

---

### Render B · BEFORE — Worn Paint Detail Close-Up

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic close-up exterior detail of the same [stucco / wood / siding] home. Focus on [front trim / window frame / fascia board / eave]. Paint is visibly faded, slightly chalking, showing age — not peeling dramatically, just tired and dull. [Describe current color: beige / tan] tone has lost its richness over the years. Flat overcast light. Tight shot, shallow depth of field. Melancholy, lived-in mood. No people. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Static hold
- Mood: Worn / Neglected
- Duration: 2 sec clip
- Light: (already in prompt — flat overcast)

**Recommended Enhanced V2 Prompt**
```
Photorealistic close-up exterior detail of the same [stucco / wood / siding] home. Focus on [front trim / window frame / fascia board / eave]. Paint is visibly faded, slightly chalking, showing age — not peeling dramatically, just tired and dull. [Describe current color: beige / tan] tone has lost its richness over the years. Flat overcast light. Tight shot, shallow depth of field. Melancholy, lived-in mood. No people. Ultra high resolution. Camera motion: static hold — no movement. Mood: worn, neglected, emotionally heavy. Clip duration: 2 seconds.
```

**Validation Note**
- seedance_lint risk: LOW. Static + close-up. "Faded" and "chalking" language is fine — describes paint condition, not prohibited content. No filter risk. Note: if using real iPhone photo for B instead of a render, this whole block is skipped.

---

### Render C · Palette A — Gateway Gray + Tricorn Black ⭐

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 7644 Gateway Gray (medium cool gray). Shutters, front door, and garage door: SW 6258 Tricorn Black (deep matte black). Trim, fascia, and window surrounds: SW 7636 Origami White (warm crisp white). Golden hour lighting, 5:00pm sun from left side. Warm light kisses the facade. Long soft shadows. Lush manicured California landscaping — deep green lawn, trimmed hedges. Architectural details preserved exactly — same roofline, same windows, same driveway. No people. Magazine cover quality. HGTV Dream Home aesthetic. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Slow pull back
- Mood: Bold Modern
- Light: Golden Hour (already present — 5:00pm sun from left side)
- Duration: (not specified in V1 settings for C — add standard 4 sec)

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 7644 Gateway Gray (medium cool gray). Shutters, front door, and garage door: SW 6258 Tricorn Black (deep matte black). Trim, fascia, and window surrounds: SW 7636 Origami White (warm crisp white). Golden hour lighting, 5:00pm sun from left side. Warm light kisses the facade. Long soft shadows. Lush manicured California landscaping — deep green lawn, trimmed hedges. Architectural details preserved exactly — same roofline, same windows, same driveway. No people. Magazine cover quality. HGTV Dream Home aesthetic. Ultra high resolution. Camera motion: slow pull back — reveal the full transformed facade. Mood: bold, modern, confident. Clip duration: 4 seconds.
```

**Validation Note**
- seedance_lint risk: LOW. SW color names and hex-less descriptors are both safe. "HGTV Dream Home" reference is fine — brand name in context is not flagged. "Slow pull back" is one of Higgsfield's native motion styles. This is the most important render — if only one enhancement gets merged, make it this one.

---

### Render D · Palette B — Rookwood Red + Virtual Taupe

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 2801 Rookwood Red (deep warm terracotta-brick red). Shutters and accent trim: SW 7039 Virtual Taupe (warm greige). Fascia and window surrounds: natural stone-toned warm white. Warm afternoon light, golden tones. Slightly lower sun — 4:00pm feel. California native landscaping — drought-tolerant shrubs, terracotta pots, warm earthy groundcover. Architectural details preserved exactly. No people. Warm, inviting, rustic California feel. Think Napa Valley estate meets Southern California craftsman. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Lateral drift left
- Mood: Warm Earthy
- Light: Warm Afternoon (already present — 4:00pm feel)
- Duration: (not specified — add standard 4 sec)

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 2801 Rookwood Red (deep warm terracotta-brick red). Shutters and accent trim: SW 7039 Virtual Taupe (warm greige). Fascia and window surrounds: natural stone-toned warm white. Warm afternoon light, golden tones. Slightly lower sun — 4:00pm feel. California native landscaping — drought-tolerant shrubs, terracotta pots, warm earthy groundcover. Architectural details preserved exactly. No people. Warm, inviting, rustic California feel. Think Napa Valley estate meets Southern California craftsman. Ultra high resolution. Camera motion: slow lateral drift left — smooth parallax across the facade. Mood: warm, earthy, grounded, proud. Clip duration: 4 seconds.
```

**Validation Note**
- seedance_lint risk: LOW. "Lateral drift left" is a clean camera directive — Seedance handles this well. "Terracotta pots" and native landscaping are safe descriptors. No filter risk identified.

---

### Render E · Palette C — Gray Area + Origami White

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 7044 Gray Area (soft medium gray, slightly warm undertone). Shutters and front door: SW 7044 Gray Area one shade deeper. All trim, fascia, and window surrounds: SW 7636 Origami White (warm bright white). Soft overcast light — cloud-diffused, even tones, no harsh shadows. Clean, pristine, architectural feel. Manicured formal hedges, clipped lawn, minimal decorative plantings. Architectural details preserved exactly. No people. Understated luxury. Think high-end Pasadena estate — quiet confidence, impeccable taste. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Slow zoom out
- Mood: Subtle Elegant
- Light: Soft Overcast (already present)
- Duration: (not specified — add standard 4 sec)

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of the exact same home, freshly repainted. Body: SW 7044 Gray Area (soft medium gray, slightly warm undertone). Shutters and front door: SW 7044 Gray Area one shade deeper. All trim, fascia, and window surrounds: SW 7636 Origami White (warm bright white). Soft overcast light — cloud-diffused, even tones, no harsh shadows. Clean, pristine, architectural feel. Manicured formal hedges, clipped lawn, minimal decorative plantings. Architectural details preserved exactly. No people. Understated luxury. Think high-end Pasadena estate — quiet confidence, impeccable taste. Ultra high resolution. Camera motion: slow zoom out — start tight on entry, pull back to reveal the full facade. Mood: subtle, elegant, refined, quietly expensive. Clip duration: 4 seconds.
```

**Validation Note**
- seedance_lint risk: LOW. "Slow zoom out" is a native Higgsfield motion. "Pasadena estate" is a location reference, not a brand — clean. Overcast light avoids any golden hour over-saturation that sometimes trips edge-case filters on luxury exterior renders.

---

### Render G · Upsell Hero — All Upgrades Combined

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of the exact same home, fully transformed. Body: SW 7644 Gateway Gray. Trim and fascia: SW 7636 Origami White. Additional upgrades applied: ① Garage door replaced with modern frameless glass panel door — black aluminum frame, clear tempered glass panels, flush hardware. ② Natural stone accent panel added to left side of main entry — stacked ledger stone in warm charcoal/gray tones, floor to roofline. ③ Premium black exterior wall sconces flanking the front door — sleek cylindrical fixtures, warm glow visible even in daylight. ④ Front door: matte black with brushed gold handle set. Perfect golden hour lighting — 5:30pm sun, dramatic warm glow across facade, slight lens flare top-left. Deep green manicured lawn. Blooming privacy hedges. Clean stamped concrete driveway. No people. HGTV Dream Home 2025. Architectural Digest cover quality. Ultra high resolution.
```

**V1 Directives Extracted**
- Motion: Epic Ken Burns pull-back
- Mood: Aspirational
- Light: Peak Golden Hour (already present — 5:30pm sun)
- Duration: 6 sec clip

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of the exact same home, fully transformed. Body: SW 7644 Gateway Gray. Trim and fascia: SW 7636 Origami White. Additional upgrades applied: ① Garage door replaced with modern frameless glass panel door — black aluminum frame, clear tempered glass panels, flush hardware. ② Natural stone accent panel added to left side of main entry — stacked ledger stone in warm charcoal/gray tones, floor to roofline. ③ Premium black exterior wall sconces flanking the front door — sleek cylindrical fixtures, warm glow visible even in daylight. ④ Front door: matte black with brushed gold handle set. Perfect golden hour lighting — 5:30pm sun, dramatic warm glow across facade, slight lens flare top-left. Deep green manicured lawn. Blooming privacy hedges. Clean stamped concrete driveway. No people. HGTV Dream Home 2025. Architectural Digest cover quality. Ultra high resolution. Camera motion: epic Ken Burns pull-back — start wide on entry, slow pull back to reveal full house. Mood: peak aspirational — this is the home they've always imagined. Clip duration: 6 seconds.
```

**Validation Note**
- seedance_lint risk: MEDIUM. This is the highest-risk prompt in the queue. Four simultaneous architectural upgrades in one prompt is the most likely trigger for content filtering or for Higgsfield to "blend" upgrades into each other rather than rendering them distinctly. If seedance_lint flags G, the recommended fix is: remove upgrade ④ (front door handle) — it's the least visible element and simplifying to 3 upgrades reduces filter risk significantly. If still flagged, fall back to V1 H/I/J as documented in `version-comparison.md`.

---

### Render K · Final CTA Hero

**Current V2 Prompt (baseline — do not touch)**
```
Photorealistic exterior of the exact same home, fully transformed to its highest expression. Body: SW 7644 Gateway Gray. Trim and fascia: SW 7636 Origami White. Front door, shutters, garage door frame: SW 6258 Tricorn Black. All upgrades present: glass panel garage door, natural stone accent entry panel, premium wall sconces with warm glow, brushed gold door hardware. PEAK golden hour — 5:45pm, sun almost at horizon, warm amber-gold light flooding the facade from the left. Dramatic cloud formation with deep blue upper sky transitioning to warm orange at the horizon. Long shadows. The Gateway Gray takes on a rich silver-gold cast. Every surface glows. Pristine deep green lawn. Perfect manicured hedges. Clean driveway. Wide establishing shot, slight low angle hero perspective. This is the single most stunning real estate image ever taken of this home. Architectural Digest. HGTV Dream Home finale. Award-winning real estate photography. No people. Ultra high resolution 8K quality.
```

**V1 Directives Extracted**
- Motion: Slow epic pull-back
- Mood: Peak Aspirational
- Light: Peak Golden Hour Dramatic (already present — 5:45pm, dramatic clouds)
- Hold: 5+ seconds on screen (becomes clip duration)

**Recommended Enhanced V2 Prompt**
```
Photorealistic exterior of the exact same home, fully transformed to its highest expression. Body: SW 7644 Gateway Gray. Trim and fascia: SW 7636 Origami White. Front door, shutters, garage door frame: SW 6258 Tricorn Black. All upgrades present: glass panel garage door, natural stone accent entry panel, premium wall sconces with warm glow, brushed gold door hardware. PEAK golden hour — 5:45pm, sun almost at horizon, warm amber-gold light flooding the facade from the left. Dramatic cloud formation with deep blue upper sky transitioning to warm orange at the horizon. Long shadows. The Gateway Gray takes on a rich silver-gold cast. Every surface glows. Pristine deep green lawn. Perfect manicured hedges. Clean driveway. Wide establishing shot, slight low angle hero perspective. This is the single most stunning real estate image ever taken of this home. Architectural Digest. HGTV Dream Home finale. Award-winning real estate photography. No people. Ultra high resolution 8K quality. Camera motion: slow epic pull-back — unhurried, cinematic, final reveal energy. Mood: peak aspirational — the dream realized. Clip duration: 6 seconds minimum. Hold final frame.
```

**Validation Note**
- seedance_lint risk: LOW-MEDIUM. K has the same multi-upgrade complexity as G but the light and sky language ("PEAK golden hour," "dramatic cloud formation") can occasionally push Higgsfield into over-saturation artifacts. If the output looks blown out, remove "Every surface glows" — it's the most likely culprit for oversaturation. The motion directive ("slow epic pull-back") is safe and well within Higgsfield's native vocabulary.

---

## Enhancement Summary

| Render | Motion Added | Mood Added | Duration Added | seedance_lint Risk | Priority |
|--------|-------------|------------|----------------|--------------------|----------|
| A | Slow zoom in | Pre-transformation | 4 sec | Low | Standard |
| B | Static hold | Worn / Neglected | 2 sec | Low | Standard |
| C | Slow pull back | Bold Modern | 4 sec | Low | **Merge first** |
| D | Lateral drift left | Warm Earthy | 4 sec | Low | Standard |
| E | Slow zoom out | Subtle Elegant | 4 sec | Low | Standard |
| G | Epic Ken Burns pull-back | Aspirational | 6 sec | Medium — see note | Review before merge |
| K | Slow epic pull-back | Peak Aspirational | 6 sec + hold | Low-Medium | Merge after C |

---

## Approval Checklist (Fabian)

- [ ] Review each enhanced prompt — confirm motion/mood language feels right
- [ ] Run `seedance_lint.py` against G enhanced prompt before approving
- [ ] If G passes lint → approve all 7 enhancements → create `render-master-v2.1-enhanced.md`
- [ ] If G fails lint → approve A–F and K only → leave G as V2 baseline until further testing
- [ ] Update `preflight-report.md` with lint results after review

---

*VIP Premier Painting · V2.1 Enhancement Proposal · Do not merge without Fabian's approval · (909) 312-5400*
