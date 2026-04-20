# Preflight Report — Episode 01 · Douglas & Sheri
**Simulated seedance_lint + MCSLA audit across all 11 renders**
`Generated: 2026-04-19` · `Against: higgsfield/SKILL.md v3.3.0 + higgsfield-seedance v1.0.0`

> **How to read this:** Each render gets a lint verdict, MCSLA compliance score, quality failure risk, Cinema Studio 3.0 opportunity, and Soul ID note for Episode 2 cloning. Run order at the bottom.
>
> **Note on scope:** Renders A–E and G–K are Higgsfield image/video prompts. Render F is Canva only — no lint needed. V2 shares prompt text with V1 for C/D/E/G/K; V2 adds Cinema Studio Image S35 as the optical stack (set in UI, not in the prompt body).

---

## Render A · BEFORE — Cinematic Wide Establish
`V1 + V2 shared prompt` · `Higgsfield image · source reference`

- **Content filter:** ✅ PASS — no real names, no IP, no violence, no age markers. Length ~75 words. Clean.
- **MCSLA:** M=implicit · C=partial ("cinematic wide shot, slight low angle" — not a named preset) · S=explicit · L=explicit · A=❌ absent
- **Quality risk:** `qual-003` pattern — no animation directive means Higgsfield may render a near-static image. For video use: add "Camera motion: slow zoom in" to prompt body.
- **Cinema Studio 3.0:** Soul Cast Location mode (4K) viable. Genre: General. No audio needed. Straight upgrade path over standard generation.
- **Soul ID (Ep. 2):** N/A — no people in frame.
- **Verdict:** ✅ Low risk. Run as-is. If converting to video clip, add motion directive first.

---

## Render B · BEFORE — Worn Paint Detail Close-Up
`V1 prompt` · `Higgsfield image or real iPhone photo — real photo preferred`

- **Content filter:** ✅ PASS — "faded," "chalking," "tired," "dull" are all safe. No flag triggers. Length ~65 words.
- **MCSLA:** M=implicit · C=partial ("tight shot, shallow depth of field") · S=explicit · L=explicit · A=❌ absent
- **Quality risk:** `qual-003` — pure static description. For a 2-second cut this is fine as a still. If used as video, add "Camera: Static hold" explicitly.
- **Cinema Studio 3.0:** Not recommended — use a real iPhone close-up of their actual trim instead. Authenticity beats a rendered close-up here every time.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ SKIP Higgsfield — take the real photo. If real photo isn't possible, Higgsfield render is safe.

---

## Render C · Palette A — Gateway Gray + Tricorn Black ⭐
`V1 prompt` · `V2: Cinema Studio Image · Studio Digital S35`

- **Content filter:** ✅ PASS — SW color names (SW 7644, SW 6258, SW 7636) are product references, not trademarks that trigger filters. "HGTV Dream Home aesthetic" is a style reference, not an IP claim. Length ~95 words. Clean.
- **MCSLA:** M=implicit (V2 sets S35 in UI) · C=❌ absent from prompt body · S=explicit · L=explicit · A=❌ absent — static composition
- **Quality risk:** `qual-003` — if rendered as video, no motion directive will produce a still. Add "Camera motion: slow pull back" per `prompt-enhancements.md` proposal.
- **Cinema Studio 3.0:** Soul Cast Location mode, Genre=Epic, no audio. Smart shot control could add cinematic motion automatically.
- **Soul ID (Ep. 2):** N/A for house. When Douglas & Sheri portraits appear (Scene 2 thumbnail), create a Soul Cast Character for each using their real photos — lock before Episode 2 cloning.
- **Verdict:** ✅ PASS — run 3–4 variations. Most critical render in queue. Run first tonight.

---

## Render D · Palette B — Rookwood Red + Virtual Taupe
`V1 prompt` · `V2: Cinema Studio Image · Studio Digital S35`

- **Content filter:** ✅ PASS — "Napa Valley estate meets Southern California craftsman" is a style descriptor, not an IP claim. SW color names clean. Length ~90 words.
- **MCSLA:** M=implicit · C=❌ absent · S=explicit · L=explicit · A=❌ absent
- **Quality risk:** `qual-003` — static description risk for video. The "California native landscaping" cue is strong and Higgsfield should pick up warm earthy tones, but if the output reads too cool, the prompt needs the warm afternoon light language made more explicit.
- **Cinema Studio 3.0:** Location mode. Genre=General (earthy palette doesn't map cleanly to Epic). Smart mode viable.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ PASS — run 1–2 variations. This is a carousel alternate, not the hero. One clean render is enough.

---

## Render E · Palette C — Gray Area + Origami White
`V1 prompt` · `V2: Cinema Studio Image · Studio Digital S35`

- **Content filter:** ✅ PASS — "Pasadena estate" is a style reference, not a real address or real person. "Understated luxury" is safe. Length ~85 words.
- **MCSLA:** M=implicit · C=❌ absent · S=explicit · L=explicit (overcast deliberately specified) · A=❌ absent
- **Quality risk:** `qual-002` pattern — "Understated luxury. Think high-end Pasadena estate — quiet confidence, impeccable taste" reads slightly like marketing copy. Higgsfield may interpret this as a vague mood instruction and default to generic clean rendering. The overcast light spec saves it from being totally underspecified.
- **Cinema Studio 3.0:** Location mode. Genre=General. Overcast light instruction maps well to General's neutral default.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ PASS — run 1 variation. Carousel alternate; one good render sufficient.

---

## Render F · SW Swatch Card Set (Canva)
`Canva — NOT a Higgsfield render`

- **Content filter:** N/A — no generation.
- **MCSLA:** N/A.
- **Quality risk:** None from generation. Risk is in CapCut timing — each card must appear exactly when the narrator speaks the color name. Animate per the 0.3s stagger spec in `render-master-v2-proven.md`.
- **Cinema Studio 3.0:** N/A.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ Build in Canva. No preflight needed. Create all 6 cards before CapCut assembly.

---

## Render G · Upsell Hero — All Upgrades + Shots 4K
`V2: Higgsfield Shots 4K · 9-panel auto-grid` · `HIGHEST RISK RENDER`

- **Content filter:** ⚠️ WARN — four simultaneous architectural upgrades in one prompt is the primary risk. Complexity triggers `qual-004` pattern: model may blend all upgrades together rather than keeping them distinct. Prompt length ~120 words — within limit but dense. "HGTV Dream Home 2025" and "Architectural Digest cover quality" are antislop superlatives that may weaken generation intent per higgsfield-prompt anti-slop rules.
- **MCSLA:** M=implicit (Shots 4K) · C=partial ("Epic Ken Burns pull-back" in Settings metadata — not embedded in prompt body) · S=explicit · L=explicit · A=multiple simultaneous (❌ exceeds "1 primary action" rule)
- **Quality risk:** `qual-004` — multiple contradictory or competing instructions. The four numbered upgrades (① ② ③ ④) may cause Higgsfield to prioritize one and render others inconsistently or incompletely. "Slight lens flare top-left" adds a 5th visual instruction competing for attention.
- **Recommended fix before running:** Remove upgrade ④ (brushed gold door hardware) — least visible element, lowest upsell value, adds token complexity. Simplify to 3 upgrades: glass garage + stone + sconces. Then regenerate.
- **Cinema Studio 3.0:** Multi-shot opportunity — run G as a 3-scene sequence: Scene 1 = palette base (no upgrades), Scene 2 = all upgrades added, Scene 3 = Ken Burns pull-back CTA. Native audio + Smart camera would be cinematic.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ⚠️ WARN — run simplified 3-upgrade version first. If grid produces muddy panels → fall back to V1 H/I/J individually per `version-comparison.md`.

---

## Render H · Upgrade Panel 1 — Glass Garage Door
`V1 only` · `Fallback for G failure`

- **Content filter:** ✅ PASS — "ONE upgrade only" is the strongest prompt structure in the queue. Single element, single light condition, no competing instructions. Length ~65 words.
- **MCSLA:** M=implicit · C=❌ absent ("Wide shot" noted in Director Notes but not in prompt) · S=explicit (one upgrade, isolated) · L=explicit (midday, blue sky) · A=static
- **Quality risk:** None flagged. The "tight composition so the garage door reads as the focal upgrade" instruction is good explicit direction. Lowest risk render in the upsell category.
- **Cinema Studio 3.0:** Soul Cast Location mode. No special opportunity — single element renders don't benefit from multi-shot.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ PASS — only run if G grid fails. 1 variation sufficient.

---

## Render I · Upgrade Panel 2 — Natural Stone Accent
`V1 only` · `Fallback for G failure`

- **Content filter:** ✅ PASS — "stacked ledger stone," "charcoal-gray natural stone" are pure material descriptions. No brand, IP, or violence language. Length ~60 words — leanest prompt in the queue.
- **MCSLA:** M=implicit · C=❌ absent (static) · S=explicit · L=explicit (golden hour light specified — critical for showing stone texture) · A=static
- **Quality risk:** Light direction is critical here. "Soft golden hour light that catches the stone texture" must produce raking side-light to show depth. If Higgsfield renders even/flat lighting, the stone will look like a flat painted panel. Rephrase to "warm raking side-light from the left, 4:00pm, long horizontal shadows across the stone face" for guaranteed texture depth.
- **Cinema Studio 3.0:** Location mode. Genre=General. No special opportunity.
- **Soul ID (Ep. 2):** N/A.
- **Verdict:** ✅ PASS — only run if G fails. Consider adding "raking side-light" language before generating.

---

## Render J · Upgrade Panel 3 — Premium Lighting at Dusk
`V1 only` · `Fallback for G failure`

- **Content filter:** ✅ PASS — "DUSK lighting," "twilight," "warm amber glow" are all clean descriptors. "Magic hour" is a cinematic style term, not an IP. Length ~75 words.
- **MCSLA:** M=implicit · C=partial ("slow zoom in" in Settings metadata) · S=explicit · L=explicit (dusk/twilight is the most specific light spec in the entire queue) · A=static
- **Quality risk:** Dusk renders are the most atmospheric in the queue — Higgsfield tends to produce strong results on interior-light-against-dark-sky compositions. The "deep blue sky" + "warm amber pools" contrast is a well-understood render pattern. Low failure risk.
- **Cinema Studio 3.0:** Single Shot video mode with Dolly In toward the front entry sconces at dusk would be the strongest version of this render — the light pool depth benefits from motion.
- **Soul ID (Ep. 2):** N/A. However, if Episode 2 adds a couple walking toward a lit entry, use Soul Cast Character mode to generate them here as a bonus element.
- **Verdict:** ✅ PASS — only run if G fails. Highest quality output potential of the three fallback panels.

---

## Render K · Final CTA Hero — Peak Golden Hour
`V1 prompt` · `V2: Cinema Studio Image · Studio Digital S35` · `SECOND MOST CRITICAL`

- **Content filter:** ⚠️ WARN — two brand name flags: "Architectural Digest" and "HGTV Dream Home finale" are recognizable IP. The Seedance linter would flag these as `brand-ip` under `filt-002`. For a static Cinema Studio Image render they are unlikely to cause a hard block (they function as style references not character/scene IP), but they carry elevated filter risk if used in Seedance video mode. "Award-winning real estate photography" is antislop language per higgsfield-prompt rules — it adds zero signal and may dilute prompt focus.
- **MCSLA:** M=implicit (V2: S35 in UI) · C=partial ("slight low angle hero perspective" — not a named Director Panel preset) · S=explicit · L=explicit (peak golden hour, dramatic cloud formation, detailed sky spec) · A=❌ absent from prompt body
- **Quality risk:** "Every surface glows" is the highest oversaturation risk phrase in the queue — `qual-002`/`qual-003` crossover. If the output looks blown out or over-processed, remove this line first and regenerate. "The Gateway Gray takes on a rich silver-gold cast" is strong specific look direction — keep this. Also: multi-upgrade complexity (all 4 present) carries the same `qual-004` risk as Render G, but lower magnitude here because the emphasis is on the FINAL composition, not individual upgrades.
- **Recommended fix before running:** Remove "This is the single most stunning real estate image ever taken of this home. Architectural Digest. HGTV Dream Home finale. Award-winning real estate photography." — all four sentences are antislop and add filter risk without adding visual specificity. Replace with: "High-end real estate photography quality. Every architectural detail sharp and resolved." Length drops from ~145 to ~110 words.
- **Cinema Studio 3.0:** Multi-shot opportunity: Scene 1 = slow pull-back from entry, Scene 2 = golden hour full facade, Scene 3 = hold on final hero frame with audio of ambient crickets + distant highway. Native audio in 3.0 would make this the most cinematic render in the queue.
- **Soul ID (Ep. 2):** If Episode 2 adds the couple walking toward the front door in the final CTA shot, use Soul Cast Character 3.0 (4K) — generate both characters separately, merge in CapCut.
- **Verdict:** ⚠️ WARN — remove antislop sentences before running. Generate 4–5 variations. This is the booking frame; it must be perfect.

---

## Production Run Order — Tonight

**Run in this sequence. Rationale in column 3.**

| # | Render | Why this order | Time to allow |
|---|--------|----------------|---------------|
| 1 | **C** (Gateway Gray) | Most critical. Run first while fresh. Need 3–4 variations. | 15 min |
| 2 | **K** (Final CTA Hero) | Remove antislop lines first. Need 4–5 variations. | 20 min |
| 3 | **D** (Rookwood Red) | Quick. 1–2 variations. Carousel alt. | 5 min |
| 4 | **E** (Gray Area) | Quick. 1 variation. Carousel alt. | 5 min |
| 5 | **A** (BEFORE Wide) | Establishes contrast baseline. 1 variation. | 5 min |
| 6 | **B** (BEFORE Detail) | Use real iPhone photo if possible. Skip render if photo taken. | 5 min |
| 7 | **G** (Upsell Hero) | Highest risk. Run simplified 3-upgrade version. Have V1 H/I/J ready. | 15 min |
| 8 | **H/I/J** (V1 fallback) | Only if G grid produces muddy panels. 1 render each. | 15 min |

**Do NOT run F (Canva) in Higgsfield — build the swatch cards separately.**

---

## Prompts Needing Polish Before Burning Credits

| Render | Issue | Fix |
|--------|-------|-----|
| K | "Architectural Digest", "HGTV Dream Home finale", "Award-winning real estate photography", "Every surface glows" | Remove all 4 lines before running |
| G | 4 simultaneous upgrades + antislop superlatives | Drop upgrade ④ (door hardware); remove "Architectural Digest cover quality" |
| I | Flat light risk on stone texture | Add "warm raking side-light from the left, long horizontal shadows across the stone face" |
| C/D/E/G/K | Camera absent from prompt body | Consider merging V2.1 motion directives from `prompt-enhancements.md` before generating — requires Fabian approval |

---

*Run `seedance_lint.py` against K and G polished prompts before generating. Update this file with actual results after production run.*
*VIP Premier Painting · Episode 01 · (909) 312-5400 · viphomepainting.com*
