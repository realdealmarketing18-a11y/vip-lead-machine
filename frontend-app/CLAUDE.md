# frontend-app — CLAUDE.md
*Last updated: 2026-08-26 · Owner: Fabian*

Read `../CLAUDE.md` first for brand rules (NEVER SAY list, colors, pricing) — this file only covers what's specific to this folder.

---

## A · What this folder is
A Vite + React rebuild of the VIP Premier Painting landing experience — a from-scratch interactive site, separate from the static HTML pages in `../sales-pages-oc/`. Stage: early build, per `../02-The-Wiki/website-redesign-spec.md`.

## B · The Goal
- **Why it exists:** the static HTML pages can't do the interactive "Before → Visualization → After" slider experience the redesign spec calls for; this needs a real component framework.
- **Done looks like:** the interactive timeline component (Before/Visualization/After) is live, either standalone or embedded into WordPress via shortcode/iframe — see `../02-The-Wiki/website-redesign-spec.md` for the full spec.
- **Out of scope:** SEO city/community pages — those stay in `../sales-pages-oc/` and get published via WordPress, not this app.

## C · Stack
- **Languages:** JavaScript (React 18)
- **Frameworks:** Vite 5, framer-motion (for the slider/scroll animation), MongoDB driver (local dev DB)
- **Hosting / infra:** Vercel (`vercel.json` present)
- **Run locally:** `npm run dev` (from this folder)
- **Key files:** `src/` (components), `api/` (server routes), `.env` (local Mongo URI + admin password — not committed)

## D · Decisions
- No dated decisions logged yet for this folder specifically. Log them here as they're made — don't let this section go stale.

## E · Memory Map
Project-wide state lives in root `../memory/` — this folder doesn't have its own. The full build spec lives in `../02-The-Wiki/website-redesign-spec.md`, not here — don't duplicate it into this file.

## F · References
- Spec: `../02-The-Wiki/website-redesign-spec.md`
- Design system authority: `../DESIGN.md` (per the spec's Execution Rules — read this before styling anything)
