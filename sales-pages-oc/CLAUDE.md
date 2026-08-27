# sales-pages-oc — CLAUDE.md
*Last updated: 2026-08-26 · Owner: Fabian*

Read `../CLAUDE.md` first for brand rules (NEVER SAY list, colors, pricing) — this file only covers what's specific to this folder.

---

## A · What this folder is
Static HTML sales pages for VIP Premier Painting's Orange County city/community rollout. One folder per city (`anaheim/`, `irvine/`), each with subfolders per named community (e.g. `irvine/orchard-hills/`, `irvine/hidden-canyon/`). Some cities are standalone `.html` files at this level (`irvine.html`, `newport-beach.html`) that predate the per-community folder structure. Stage: in progress — Irvine has the most community subpages built (8), Anaheim has 4, most other queued cities (see root `04-Agents/queue/DISPATCH.md`) haven't started.

## B · The Goal
- **Why it exists:** each city/community gets its own SEO-targeted landing page so local searches for "[community] house painting" find a page speaking directly to that community, not a generic city page.
- **Done looks like:** all 8 cities in the DISPATCH queue have a published city page + community subpages, live on `viphomepainting.com` via the WordPress REST API (see root CLAUDE.md's WORDPRESS REST API section).
- **Out of scope:** the React/Vite interactive experience — that's `../frontend-app/`, a separate rebuild effort, not these static pages.

## C · Stack
- **Format:** static HTML, hand-authored or generated from `VIP_SalesPage_Master_Template.html`
- **Generators (at repo root, NOT in this folder):** `build-oc-pages.js`, `upgrade-oc-pages.js`, `VIP_CityPage_Generator.js`
- **Publishing:** WordPress REST API (`POST /page` — see root CLAUDE.md)
- **Run locally:** open any `.html` file directly, or run a generator script from repo root with `node build-oc-pages.js` (⚠️ currently broken — see below)
- **Key files:** `VIP_SalesPage_Master_Template.html` (base template), `irvine/index.html` and `anaheim/index.html` (city hubs)

## D · Decisions
- `2026-08-26` — `build-oc-pages.js` is currently broken: it reads `VIP_Newport_Beach_SalesPage_20260527.html` from repo root as its base, and that file was deleted in the 2026-06-09 cleanup. Don't run it until it's repointed at `VIP_SalesPage_Master_Template.html` or a current source file. See root `memory/bugs-and-risks.md`.
- `2026-06-09` — Deleted 9 legacy root-level HTML city pages (`VIP_*_SalesPage_20260421.html`) and consolidated on the template-based approach.

## E · Memory Map
Project-wide state (decisions, strategy, punch list, risks) lives in root `../memory/` — this folder doesn't have its own. City rollout status is tracked in root `04-Agents/queue/DISPATCH.md`, not here.

## F · References
- Sales copy source: `04-Agents/outputs/sales-pages/` (root)
- City research: `04-Agents/outputs/city-intel/` (root)
- Production URL: viphomepainting.com (not yet live for these pages — see root `memory/next-actions.md`)
