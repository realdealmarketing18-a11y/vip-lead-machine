# Higgsfield Commercial Production Workflow

This document outlines the proven workflow for generating photorealistic, cinematic commercial videos using Higgsfield AI. It details the **MCSLA Prompting Formula**, style constraints, and sequence chaining rules utilized by our design team to create luxury-tier custom visualizations.

---

## The MCSLA Prompting Formula

To ensure character consistency, correct lighting, precise physics, and realistic camera work, every video generation prompt (targeting a ~15s scene or clip) must follow the **MCSLA** structure.

| Layer | Component | Description & Requirements |
|:---|:---|:---|
| **M** | **Model & Subject** | Name the primary subject using matching input tags (e.g., `@hero`, `@rival`). Define the emotional beat and character goal. Use `MULTISHOT` to structure multiple angles. |
| **C** | **Camera & Constraints** | Specify camera angles, physical lens characteristics, movement type, and emotional motivation. Apply hard constraints (aspect ratio `16:9`, slow-motion/speed-ramping constraints, scale locks). |
| **S** | **Style (60:30:10 Rule)** | Define the color palette layout: Dominant (60%), Secondary (30%), and Accent (10%) colors. Restate target white balance (e.g., `WB 6500K`) and lighting parameters (contre-jour backlight, haze). |
| **L** | **Location & Layout** | Point to a `@location` asset tag (style reference only, allowing the model to extend the environment as the subject moves). Use an optional `@scheme` (aerial layout) for spatial continuity. |
| **A** | **Action (Timecoded)** | Provide a high-level intent statement, followed by distinct, timecoded shots with hard cuts (e.g., `SHOT 1 (0:00–0:05)`, `SHOT 2 (0:05–0:10)`). |

---

## Global Style Prefix

Every generation prompt under this framework must be prepended with the following verbatim Style Prefix to maintain the prestige aesthetic:

```text
Style: 8K cinematic. Photorealistic — no 3D render, no game engine, no game-cutscene aesthetic.
Cinematography: naturalistic master cinematography.
Lighting: Natural light only — contre-jour backlight, camera on shadow side, atmospheric haze. Key light from sky and windows only.
Color: 60:30:10 — dominant / secondary / accent.
Camera: Physical cine lens. 180° shutter motion blur.
Skin: Pore-level realism — vellus hair, asymmetric moles, capillary flush, pore-shadow matching on-set light.
Acting: top-tier cinematic — micro-pauses before reactions, precise eye-line, wet living eyes with catch-lights, visible breath and chest rise.
Physics: Gravity and inertia respected — mass has real weight, correct contact shadows. No floating props.
Composition: Rule of thirds + golden ratio. Every person moving from frame one.
Continuity: Characters, props, environment identical across every cut. No identity drift.
Technical: 24fps smooth motion. 8K detail. No jitter.
Audio: Environmental SFX only. No music. No subtitles.
```

---

## Prompt Template

```text
[STYLE PREFIX]

SUBJECT — @____ (matches input 100%) ... WB 6500K. MULTISHOT — <beat>.
LOCATION — @____ STYLE REFERENCE ONLY, not a fixed keyframe. <mood/light>. Model extends the world; subject moves through space.
ACTION — <intent>.
SHOT 1 (0:00–0:0_) — <beat>. Hard cut.
SHOT 2 (0:0_–0:0_) — <beat>. Hard cut.
SHOT 3 (0:0_–0:15) — <beat>. Hard cut.
CAMERA — SHOT 1: <angle/height/lens/move + why>. SHOT 2: <...>. SHOT 3: <...>.
STYLE — Dominant <…> 60% / Secondary <…> 30% / Accent <…> 10%. WB 6500K.
CONSTRAINTS — 16:9. <slow-mo?> <camera> <scale/legibility> <continuity> NO eye glow.
```

---

## Key Rules for Consistency & Realism

1. **Standalone 15-Second Generations**: Longer scenes must be split into multiple standalone prompts (e.g., Scene 1a, Scene 1b) to prevent detail degradation.
2. **Physical Acting Cues**: Always describe physical indicators (e.g., *"lips part, micro-pause before reacting"*, *"chest rises with visible breath"*) rather than abstract emotional states (e.g., *"he is surprised"*).
3. **Physics & Scale Control**: Specify exact dimensions for props (e.g. *"small 0.33L can"*, *"human-scale 1.85m robot"*) and repeat them in constraints. Avoid using precise mathematical angles (e.g., *45 degrees*) or speed values (e.g., *60 km/h*) as they can conflict with the simulation engine's natural physics.
```
