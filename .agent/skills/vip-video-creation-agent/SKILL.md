---
name: vip-video-creation-agent
description: Creates transformation reels and ad creative videos using Higgsfield Nano Banana 2 and Seedance 2.0. Use when generating Higgsfield renders, assembling before/after videos, creating Meta ad creatives, or building community reels. Trigger on: Higgsfield, video ad, transformation video, before/after, color scheme renders, visualization reel, Seedance, ad creative, commercial. Always use for any visual render or video creation task.
---

# Video Creation Agent

## Runtime
Claude Cowork + Dispatch
Tools: Higgsfield Nano Banana 2 API, Gemini 2.5 Pro, ffmpeg (local)
Memory: /memory/video-log.md
Triggered by: Lead Gen Agent (per-lead) or Ad Campaign Manager

## Higgsfield Proven Format
ALWAYS USE:
Feature: Cinema Studio Image
Camera: Studio Digital S35
Upsell grid: Shots 4K (9-panel auto-grid)

PROMPT FORMULA:
"Repaint the house on the left using the following colors:
Main Body: [SW Name] [SW XXXX] – Hex #[XXXXXX]
Fascia and Under-Eaves: [SW Name] [SW XXXX] – Hex #[XXXXXX]
Shutters: [SW Name] [SW XXXX] – Hex #[XXXXXX]
Front Door: [SW Name] [SW XXXX] – Hex #[XXXXXX]
Window Trim: [SW Name] [SW XXXX] – Hex #[XXXXXX]
[Architectural additions for Bold/Upsell schemes]
Ensure the home reflects a [STYLE LABEL] style with [mood descriptors].
[LIGHTING PHRASE]"

STYLE LABELS → LIGHTING:
Bold Modern              → sharp contrast, cool tones
Warm Rustic California   → golden hour automatic
Contemporary Modern      → soft overcast, clean
Luxury Modern            → HGTV Dream Home energy
Mediterranean Revival    → warm afternoon light
Coastal Elegant          → bright natural California light

LIGHTING PHRASES:
Standard:  "Photographed during golden hour."
Hero only: "peak golden hour with dramatic cloud sky and warm sun on facade."

## 7 Renders Per Episode (5 Credits)
A — BEFORE wide shot (real photo, 0 credits)
B — BEFORE trim close-up (iPhone, 0 credits)
C — Palette A: CHOSEN scheme ⭐ (1 credit) — RUN FIRST
D — Palette B: Alternate 1 (1 credit)
E — Palette C: Alternate 2 (1 credit)
F — 6 SW Swatch Cards (Canva, 0 credits)
G — Upsell Hero: Shots 4K 9-panel (1 credit) — includes "Create Video"
K — Final CTA Hero ⭐ (1 credit) — RUN SECOND

Run order: C → K → G → D → E

## Step 1: Create a Consistent AI Double with Branded Clothing

This section outlines the workflow for creating a photorealistic AI double (Soul ID) and generating highly consistent commercial images wearing custom-branded clothing (VIP polo shirt).

### Phase 1: Create Your AI Twin (Soul ID)
*   **Angles**: Front-facing, profile, 3/4 angle, looking up, looking down.
*   **Lighting**: Natural outdoor light, indoor window light, studio light.
*   **Framing**: Close-up face shots, medium shots, and full-body shots.
*   **Clothing**: Wear the type of clothing you plan to generate (e.g., plain white polo shirts) in at least 15 of the photos.
*   **Avoid**: Duplicates, group shots, heavy filters, sunglasses, hats.
*   **Action**: Go to Image > Soul ID Character > Create New Character. Upload 40-50 curated photos and name it (e.g., FABIAN).

### Phase 2: Design the Master Polo Reference
*   **Tool**: Image Menu > Nano Banana Pro
*   **Prompt**: A high-resolution, photorealistic flat-lay product shot of a crisp white men's short-sleeve polo shirt. The shirt is laid perfectly flat on a seamless, neutral light gray background. On the left chest of the polo shirt, there is a sharp, embroidered gold crown logo with the text "VIP HOME PAINTING" directly underneath it in bold, elegant gold lettering. Clean studio lighting, macro details on the fabric texture, 4k resolution, symmetrical composition.
*   **Action**: Generate until the logo and text are perfect. Download this image. This is your Master Polo Reference.

### Phase 3: Generate Your Character Scene (No Logo First)
*   **Tool**: Image Menu > Higgsfield Soul 2.0
*   **Character**: Click your character thumbnail (FABIAN) in the bottom right corner to activate Soul ID.
*   **Prompt**: A cinematic medium shot of a completely bald professional painting contractor with a clean-shaved bare head, standing confidently in a modern, beautifully painted luxury home exterior. He is wearing a plain white short-sleeve polo shirt. His arms are clean and free of tattoos. He is speaking directly to the camera with a confident, welcoming, and reassuring smile. Professional studio lighting. Photorealistic, 8k resolution.
*   **Action**: Use Inpaint if there are any stray artifacts to remove. Save this image once it is 10/10.

### Phase 4: Place the Branded Logo
*   **Tool**: Inpaint
*   **Reference**: Add your Master Polo Reference from Phase 2 via the + Add Image icon in the Inpaint menu.
*   **Method**: Paint ONLY over the left chest area of the plain white polo where the logo should go.
*   **Prompt**: Add an embroidered gold crown logo with the text "VIP HOME PAINTING" in bold gold lettering directly below it, on the left chest of the white polo shirt. Match the lighting and fabric texture of the shirt. Keep everything else identical.
*   **Refinement**: If text is blurry, use Inpaint again, brush only the text, and prompt: Sharpen the text "VIP HOME PAINTING" — make it crisp, bold, and legible gold lettering.

### Phase 5: The Homeowners (Clients)
*   **Input**: A high-quality photo of the couple.
*   **Prompt**: Generate a complete character sheet of this married couple. They are dressed in casual, stylish weekend attire. Their expressions range from thoughtful consideration to bright, excited smiles. Provide multiple angles of them standing together. Ensure realistic skin textures, natural lighting, and a relatable, affluent suburban aesthetic.

## Step 2: Scene-by-Scene Generation (Seedance 2.0 & CapCut)

**Scene 1: The Hook (0:00 - 0:30)**
Asset: Render A (Before) + Render K (After). CapCut gold split-reveal. No Seedance needed.

**Scene 2: Meet the Homeowners (0:30 - 1:00)**
Input Elements: Soul Cast Character Sheet of Homeowners + blurred background.
Prompt: A warm, natural portrait of a married couple standing close together. They are smiling confidently and warmly directly at the camera. Subtle, natural human movement, slight breathing, soft blinking. The lighting is soft and flattering, like a high-end lifestyle commercial. No 3D, no cartoon, no VFX, photorealistic, cinematic.

**Scene 3: The Struggle (1:00 - 1:45)**
Asset: Graphic panels + real iPhone close up (Render B). No Seedance needed.

**Scene 4: The Discovery (1:45 - 2:15)**
Input Elements: Finished Branded AI Double Image (from Step 1) + Seedance 2.0.
Prompt: Subtle, natural human movement. Breathing softly, giving a confident and welcoming smile directly at the camera. He makes subtle, natural hand gestures to emphasize his points.

**Scene 5: Step 1 — Discovering Their Vision (2:15 - 2:55)**
Asset: Canva swatch cards (Render F) over Render A. No Seedance needed.

**Scene 6: Step 2 — Exploring Styles + Upgrades (2:55 - 3:45)**
Tool: Cinema Studio Image (Studio Digital S35)
Renders C, D, E, G (See render queue prompts for colors and upsells).

**Scene 7: Step 3 — Choosing the Perfect Palette (3:45 - 4:15)**
Input Elements: Last frame of Scene 2 (Frame Chaining) + Render C background.
Prompt: The married couple is looking at their newly painted home. Their eyes widen in pleasant surprise, and they turn to each other with bright, excited smiles, nodding in enthusiastic agreement. Subtle, realistic human movement and facial expressions. The lighting is warm and matches the golden hour lighting of the background house. Photorealistic, cinematic, no 3D, no cartoon, no VFX.

**Scene 8: The Result + CTA (4:15 - 5:00)**
Tool: Cinema Studio Image (Render K) + Seedance (Image-to-Video)
Prompt: A professional painting contractor standing proudly in front of a stunningly painted luxury home. He is speaking directly to the camera with a confident, triumphant smile, gesturing warmly toward the house behind him to invite the viewer in. The lighting is peak golden hour, perfectly matching the warm sun on the house behind him. Realistic skin texture, natural movement. No cuts, no zooms, no 3D, no cartoon, no VFX, 4k.
