# Lean Production Playbook — one campaign per month on the Higgsfield Max plan

**Updated 2026-10-20.** Replaces the credit numbers in older episode files (NB-002's
render queue says "1 credit" per render — that pricing is gone). Prompt craft still lives in
[[Higgsfield-Commercial-Workflow]] (MCSLA) and the funnel logic in [[3-Step-Funnel-Framework]].
This page only answers: **what do we make, with which tool, for how many credits.**

---

## 1 · What the Max plan actually buys

Max = **1,800 credits / month** ($79 monthly, or $59/mo billed yearly = $708 up front).

| Item | Credits | Source |
|---|---|---|
| Nano Banana Pro still (2K) | **~2** | plan card: 1,800 = 900 gens |
| Seedance 2.5, 8 s, **480p draft** | **24** (~3/s) | Higgsfield pricing blog, Oct 2026 |
| Seedance 2.5, 8 s, **720p final** | **52** (~6.5/s) | same |
| Seedance 2.0, 8 s | 36 | same |
| Seedance 2.5 at 1080p | not published — check the price shown before you generate | — |

> **Read the plan card carefully.** "~120 Seedance 2.5 videos" = 15 credits each, which is a
> **5-second 480p draft.** In finished 8-second 720p shots, 1,800 credits is about **34 shots.**

**Two catches on the "Unlimited" box:**
1. **"7-day unlimited"** reads as a 7-day window, not every month. Check "Learn more" when you
   buy. Use those 7 days to lock **every still** for the next campaigns.
2. Unlimited and free gens work **only on higgsfield.ai** — not through the MCP/CLI. When Claude
   generates through the connector, it always spends credits. Stills = Fabian on the website.
   Paid video = either.

**Account check:** the Higgsfield connector in Claude was on a **free plan with 0 credits** on
2026-10-20. Buy Max **on the same login the connector uses**, or Claude can't render.

---

## 2 · The monthly package (fits in ~950 credits, leaves ~850 spare)

| Deliverable | Length | What's generated | Credits |
|---|---|---|---|
| **Mini commercial** (16:9, plus a 9:16 crop) | 45–60 s | 6 video shots × 8 s | **~600** |
| **3-step ad set** (Step 1 · 2 · 3, 9:16) | 15 / 30 / 15 s | 1 new hook shot, everything else cut from the commercial | **~100** |
| **Short VSL** (sales page + retargeting) | 60–90 s | 0–1 shots; Fabian on camera + commercial B-roll | **0–50** |
| Stills (palettes, hero, ad statics) | — | 10–15 stills | **0–30** |
| **Retry reserve** (25%) | | | **~200** |
| **Total** | | | **~950** |

**Bottom line:** Max covers **one full campaign per month** (commercial + funnel + VSL) with room
for a second community's **light** set (new stills + re-cut ads). It does **not** cover two
full commercials, and it does **not** cover a fully generated 4–5 minute episode — that's
~34 finished shots plus drafts, i.e. the whole month on one video.

---

## 3 · The light workflow — 7 steps, in order

1. **Script first, 0 credits.** 6 beats, ~8 s each: Hook · Problem · Discovery · Visualization
   reveal · Result · CTA. Write in Claude, run the kill test from the OC repo's `HEADLINE-FORMULAS.md`.
2. **Lock every frame as a still** (Nano Banana Pro, on the website). Before photo → 3 palettes →
   hero. Pick the winners now. **No video until all six start frames are approved.**
3. **Animate from the start frame, never from text alone** (Seedance 2.5, image-to-video).
   Prompt = camera move + one action, MCSLA style. Text-only video drifts and costs retries.
4. **Draft at 480p** (Draft Mode) — 2 drafts per shot max. Pick one.
5. **Finalize only the picked draft** at 720p (within 7 days of the draft). Upscale later only
   for the one hero shot that needs it.
6. **Everything else in CapCut — 0 credits:** logo, gold wipe, text overlays, SW colour labels,
   music, Fabian's voiceover, 9:16 crops. **Never put words or logos in a prompt** — the models
   garble text and you pay for the retry.
7. **Ads = re-cuts, not new renders.** Step 1/2/3 come from the commercial's footage. Only make
   a new variant (Ad Multiplier → "sections", hook only) **after** an ad proves it wins.

**Real footage beats generated footage for anything Fabian says on camera.** It's free, it's
the founder, and it's honest. Generate the house, not the people talking.

---

## 4 · Proven tools only — what to use, what to skip

| Job | Use | Skip for now |
|---|---|---|
| Repaint the client's real house | **Nano Banana Pro** (keeps structure) | Supercomputer "22 variations" batches — burns credits |
| Ad statics with text | **GPT Image 2** or Canva | — |
| House / camera-move video | **Seedance 2.5** draft → final | Cinema Studio 4.0 (new, price unverified) |
| Fallback simple pans | **Kling 3.0 std, sound off** (unlimited on web during the 7 days) | — |
| Ad variants of a winner | **Ad Multiplier — sections (hook / CTA only)** | Full "recreate" — bills the whole ad length |
| Cutting long video into reels | **Clipify** (from the YouTube upload) | — |
| Edit, captions, music | **CapCut** | paid Higgsfield edit tools |

New since June that matter: **Seedance 2.5** (Aug 6 — up to 30 s, audio in the same pass),
**Draft Mode** (Sep 22 — the biggest credit saver), **Cinema Studio 4.0** (Aug 12),
**Ad Multiplier** with a visual interface (Oct 6), **Ads Studio** (Sep 30 — static ads from a URL).
Seedance had provider outages Sep 30 and Oct 3; failed generations were refunded automatically.

---

## 5 · Funnel and VSL — what each piece is made of

**Step 1 — cold, 15 s.** Faded BEFORE photo → 2×2 ft swatch held against a 3,000 sq ft wall
("750 times larger"). 1 new 8 s shot. CTA: "See how."
**Step 2 — warm, 30 s.** Before → palette reveal → hero, cut from the commercial. 0 credits.
**Step 3 — hot, 15 s.** Hero shot + gold wipe + offer + (909) 312-5400. 0 credits.

**Short VSL, 60–90 s** — one structure for the sales page and retargeting:
Fabian on camera, hook (0–10 s) → the swatch problem (10–25) → the Custom Visualization Service
on this house (25–55, commercial B-roll) → 2-Year Craftsmanship Guarantee + complimentary
visualization (55–75) → one ask: book the 30 minutes (75–90).

**Don't put these in any ad or VSL** (OC repo hard rules): review counts or star ratings,
"67 homeowners / zero regrets" (unverified), invented client stories, "AI", "free".
Use real clients only, with their permission.

---

## 6 · Per-campaign checklist

- [ ] Script, 6 beats, kill test passed
- [ ] 6 start frames approved (stills)
- [ ] 12 drafts max → 6 picks → 6 finals
- [ ] Commercial cut (16:9) + 9:16 crop
- [ ] Step 1 · 2 · 3 cut, UTM-tagged
- [ ] VSL recorded and cut
- [ ] Credits used logged at the bottom of the episode's `render-queue.md`
