# NB-002 — Painting Time-Lapse | Higgsfield Workflow
**Status**: Proposed beat, not yet in `script.md` · 2026-11-07
**Checked live on Higgsfield 2026-11-07:** there is **no time-lapse preset** (preset searches for "timelapse", "time lapse" and "renovation" return nothing). The time-lapse is built from **keyframe stills + a start/end-frame video model**, then sped up in CapCut.

---

## Where it goes in the story

Scene 7 ends on the chosen palette (the render, the **Love It**). Scene 8 opens on the finished house. The time-lapse sits between them: it's the **Paint It** beat, the moment the render becomes the real house.

**New beat 7.5 · PAINT IT — THE CRAFT (≈ 20 s)** · pushes Scene 8 to start at 4:20, total ≈ 5:05.

* **Fabian (VO)**: "Then our crew made it real. Every surface prepped, primed and finished in Sherwin-Williams Emerald, exactly as they'd seen it."
  *(Confirm with Fabian: is Emerald the product on this job? `brief.md` says yes.)*
* **On screen**: "PREP · PRIME · PAINT" one word per stage, then "2-YEAR WARRANTY".

| Shot | Type | Time | What |
|---|---|---|---|
| **7.5A** | HOUSE time-lapse | 4:00–4:12 | Wide, locked-off: the whole villa goes from before → prep → half-painted → finished. Three chained clips, sped up. |
| **7.5B** | Close-up time-lapse | 4:12–4:16 | One stucco wall section: masking → roller passes → Repose Gray finish. |
| **7.5C** | FABIAN | 4:16–4:20 | `@fabian-5` inspecting a freshly painted shutter edge, a small satisfied nod (normal speed, his own Soul shot). |

---

## Why chained keyframes, not one clip

One clip from before to after lets the model invent the middle: walls change color all at once, the building warps, people morph. **Four stills you approve first** pin the process down, and each video only has to bridge two frames that are close together.

```
K0 Render A (before) ──clip 1──▶ K1 Prep ──clip 2──▶ K2 Half-painted ──clip 3──▶ K3 Render C (finished)
```

**The one rule that makes it work:** every keyframe is the **same camera, same framing, same pixels** as Render A, changed only where the job changed it. Make K1 and K2 by **editing Render A** (image reference), never by generating a new house.

---

## Step 1 · Keyframe stills (image edit, Render A as the reference)

Model: **FLUX 3 Image** or **GPT Image 2.5** (both edit from a reference image). Aspect 16:9, same as Render A. Start every prompt with the lock line.

**Lock line (paste first in every keyframe prompt):**
```
Edit this exact photo. Keep the camera position, lens, framing, lighting direction, architecture, roof tiles, windows, balconies, landscaping and every proportion exactly the same. Change only what is listed below.
```

**K1 · Prep**
```
[lock line]
Change only: white scaffolding along the left third of the facade; two aluminum extension ladders against the right wall; blue canvas drop cloths over the shrubs and the walkway; brown masking paper and tape over every window and the front door glass; the old brown trim is sanded to bare, patchy wood. Three painters in plain white polos and white painter's pants work on the scaffolding, small in frame, mid-task, faces turned to the wall. The stucco is still the old weathered off-white. Daylight, late morning.
```

**K2 · Half-painted**
```
[lock line]
Change only: the left half of the stucco body is freshly painted Repose Gray SW 7015 (#CCC9C0), smooth and even; the right half is still the old weathered off-white, with a clean straight line where they meet. Trim on the left half is Origami White SW 7636 (#E5E2DA). Scaffolding has moved to the right third. Masking paper is still on the windows. Two painters on the scaffolding with rollers, one on the ground with an airless sprayer, all in plain white polos, small in frame, faces to the wall. Afternoon light.
```

**K3 · Finished** = **Render C** as already queued (Newport Fog: Repose Gray SW 7015 body, Origami White SW 7636 trim, Iron Ore SW 7069 shutters, front door and garage door). No people, no equipment.

**Check each still before moving on:** same window count and positions as Render A, roof unchanged, no warped columns, no readable text or logos drawn by the model (the VIP logo is placed in CapCut, never generated).

---

## Step 2 · The three time-lapse clips (start + end frame)

Model: **Seedance 2.0**, mode `std`, **1080p**, 16:9, **8 s**, **generate_audio off** (music and sound come from the edit).
Alternatives with start + end frames: Wan 3.0, MiniMax H3, FLUX 3 Video. *(Kling 3.0 Turbo on the connector takes a start frame only, so it can't do this step.)*

**Clip 1:** start = K0 (Render A) · end = K1
**Clip 2:** start = K1 · end = K2
**Clip 3:** start = K2 · end = K3 (Render C)

**Time-lapse prompt (same for all three, swap the middle line):**
```
Time-lapse, locked-off tripod shot, the camera does not move, zoom or shake at all. The house and its architecture stay perfectly still and unchanged. Shadows sweep steadily across the facade as the sun crosses the sky; clouds streak fast overhead. Painters appear as quick, motion-blurred figures, moving across the scaffolding and ladders in fast jerky time-lapse steps, never seen clearly.
[Clip 1: scaffolding and ladders go up section by section, drop cloths are laid, masking paper appears on the windows one by one.]
[Clip 2: the new gray color spreads across the wall in clean horizontal bands from left to right, section by section, as the scaffolding moves along.]
[Clip 3: the color finishes across the right side, the trim and shutters are painted, then the scaffolding, ladders, masking and drop cloths are removed, leaving the clean finished house in golden-hour light.]
Photorealistic, natural daylight, cinematic color, no text, no logos.
```

**Close-up 7.5B (one clip, start frame only is fine):**
```
Time-lapse, locked-off macro shot of a weathered off-white stucco wall section. Blue tape lines go on at the edges, then a roller sweeps across in fast time-lapse passes, laying down smooth Repose Gray (#CCC9C0) paint band by band until the section is fully, evenly finished. Hands and roller are motion-blurred; the camera never moves. Photorealistic, warm daylight, no text.
```

**Reject a clip if:** the camera drifts, the building changes shape between frames, a window or column appears or disappears, paint appears everywhere at once instead of in sections, or a painter's face is clearly visible (keep them anonymous: they are a dramatized crew, not named people).

---

## Step 3 · CapCut

1. Lay clips 1 → 2 → 3 back to back. Because each clip's end frame is the next clip's start frame, the joins are invisible.
2. Speed: **Curve → Custom**, about 3× in the middle of each clip, back to 1× on the last 10 frames of clip 3 so the finished house "lands".
3. Add a slight flicker-free **frame blend / optical flow** on the speed-up if the motion stutters.
4. Sound: a rising tick-tock or shutter-click pulse under the time-lapse, cutting to silence for one beat, then the music swell as Scene 8 opens on Render K.
5. On-screen "PREP · PRIME · PAINT" lands on the three clips; "2-YEAR WARRANTY" over the last second.

---

## Honesty rule

The Gallaghers' footage is a dramatization (see `script.md`). The time-lapse is too: **never caption it as real job footage**. The opening "Dramatization of a real VIP project" note covers it. Before using it on the website, it needs the same note.

## Tools and characters you're adding in Higgsfield

* **Crew:** keep them generic and faceless (white polos, white pants). The video skill notes Higgsfield takes one character at a time, so don't make painters Soul characters; motion blur hides identity anyway.
* **Fabian:** only in 7.5C, at normal speed, as his own Soul shot.
* **Tools** (airless sprayer, rollers, extension ladders, scaffolding, drop cloths): add them as reference images/elements and attach them to K1 and K2 so they look the same in both stills.
