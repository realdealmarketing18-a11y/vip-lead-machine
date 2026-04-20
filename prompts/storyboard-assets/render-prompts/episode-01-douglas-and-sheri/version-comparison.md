# V1 vs V2 · Decision Matrix
**Episode 01 — Douglas & Sheri · Fabian's Production Reference**
Consult this before opening Higgsfield. Pick your version in under 60 seconds.

---

## 1 · Side-by-Side Comparison

| Criteria | V1 · iPhone Expanded | V2 · Proven (Default) |
|----------|----------------------|-----------------------|
| **Total renders** | 11 (A–K, all discrete) | 11 (A–K, G is a grid) |
| **Upsell approach** | H, I, J = 3 separate isolated renders | G = 1 Shots 4K 9-panel auto-grid |
| **Higgsfield credits** | 8 (A–E + H, I, J + K — each counts) | 5 (A–E + G as 1 grid + K) |
| **Time to produce** | ~45–60 min (more runs, more decisions) | ~25–35 min (fewer runs, faster) |
| **Production complexity** | Low — one upgrade per render, easy to QC | Medium — grid must produce clean isolated panels |
| **Upsell panel quality** | High control, each panel clean by design | Variable — grid may merge upgrades or muddy panels |
| **Content filter risk** | Lower — simpler prompts, one element each | Higher — G's combined prompt has 4 simultaneous upgrades |
| **Cinema Studio S35** | No — iPhone workflow, no feature specified | Yes — C and K use Cinema Studio Image S35 |
| **Shots 4K** | No — all standard image renders | Yes — Render G uses Shots 4K 9-panel |
| **Best case credits** | 8 | 5 |
| **Worst case credits** | 8 (same — no fallback needed) | 8 (if G fails → add H + I + J = 3 extra) |

---

## 2 · When to Use V2 (Default)

Use V2 on every production run unless a trigger condition below is met.

- You have 5 or fewer credits remaining
- You have less than 45 minutes
- You want Cinema Studio S35 quality on Renders C and K (almost always)
- You're confident the house photo is clean and straight-on (grid needs a good source)
- First episode run — V2 is the tested, optimized path

---

## 3 · When to Fall Back to V1

Switch to V1 prompts H, I, J (or the full V1 queue) if any of these happen:

| Trigger | What It Looks Like | Response |
|---------|--------------------|----------|
| G grid produces muddy panels | Stone, garage door, and lighting all visible in every panel cell — no isolation | Discard G. Run V1 H, I, J individually. +3 credits. |
| G fails content filter | Higgsfield rejects the combined prompt outright | Run V1 H prompt first (simplest). If that passes, continue with I and J. |
| G panels too small for CapCut | 9-panel cells too tiny to use as full-frame Scene 6 panels | Discard G grid. Run V1 H, I, J for full-frame panels. |
| You need a dusk render only | J (lighting at dusk) is the most visually distinct upgrade — sometimes worth running standalone | Run V1 J prompt directly. 1 credit. |
| Source photo is angled or cluttered | Shots 4K grid needs a cleaner source than single renders | Use V1 H, I, J — they tolerate imperfect source photos better. |

**Rule:** V1 is never a full replacement for V2 — it's a surgical fallback for Render G only. Renders A–F and K always use V2.

---

## 4 · What V1 Has That V2 Should Adopt

Both V1 and V2 carry motion directives, mood tags, and duration specs in their **Settings** metadata blocks — but neither version embeds these values inside the actual Higgsfield prompt text. V2's next enhancement pass should inline them.

**Motion directives to embed in V2 prompt body:**

| Render | Motion Directive | Embed After: |
|--------|-----------------|--------------|
| A | Slow zoom in | `...Ultra high resolution.` → append `Camera motion: slow zoom in. Duration: 4 seconds.` |
| B | Static hold | Append `Camera: static. Duration: 2 seconds.` |
| C | Slow pull back | Append `Camera motion: slow pull back. Duration: 4 seconds.` |
| D | Lateral drift left | Append `Camera motion: slow lateral drift left. Duration: 4 seconds.` |
| E | Slow zoom out | Append `Camera motion: slow zoom out. Duration: 4 seconds.` |
| G | Epic Ken Burns pull-back | Append `Camera motion: epic Ken Burns pull-back. Duration: 6 seconds.` |
| J | Slow zoom in | Append `Camera motion: slow zoom in. Duration: 4 seconds.` |
| K | Slow epic pull-back | Append `Camera motion: slow epic pull-back. Duration: 6 seconds. Hold final frame.` |

**Why this matters:** Higgsfield responds to motion direction when it's in the prompt body, not just in metadata that only you see. Embedding these turns V2 prompts from stills-optimized into video-optimized. Log enhancements in `prompt-enhancements.md`.

---

## 5 · Production Day Decision Tree

```
START HERE on production day
│
├─ Q1: Does Render G (Shots 4K 9-panel) need to run?
│   └─ YES → Run V2 G prompt first as a test render
│       │
│       ├─ PASS: Panels are clean and isolated?
│       │   └─ YES → Continue full V2 queue. Done.
│       │
│       └─ FAIL: Panels muddy, merged, or content-filtered?
│           └─ Skip G. Run V1 prompts H, I, J individually.
│               Add 3 credits to your count.
│
├─ Q2: Do you have 5 credits or fewer?
│   └─ YES → Run V2 only. Skip H, I, J entirely.
│             Use G grid even if imperfect — crop panels in CapCut.
│
└─ Q3: Is your source photo clean? (Straight-on, no cars, good light)
    ├─ YES → V2 full queue. No changes.
    └─ NO  → Run V2 A–F and K normally.
             For upsell panels, switch to V1 H, I, J (more forgiving of imperfect source).
```

**Bottom line:** Start with V2 every time. Only deviate at Render G. Renders A–F and K never change.

---

*Last updated: Episode 01 production · See `prompt-enhancements.md` for V1 language worth merging into V2 prompts.*
