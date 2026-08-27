# Activity Log — VIP Premier Lead Machine
Append entries at TOP. Format: ## YYYY-MM-DD — [What happened]

## 2026-08-26 — Memory Architecture Overhaul: Two-Layer Split + Folder-Level Briefs
Fabian shared two external patterns (an "LLM Wiki" idea doc, already covered by today's earlier Lint Report entry, and a folder-level "Operating Manual" CLAUDE.md template) and asked for a memory system covering VIP Lead Machine, the OC sales pages, and the agent system that compounds daily.

**Decided:** no per-agent wikis. `02-The-Wiki/` stays the single shared knowledge layer; `04-Agents/outputs/{type}/` is per-run scratch/output. `memory/` is a new, separate project-*state* layer (decisions/strategy/next-actions/bugs-risks/session-summaries) — distinct from wiki *knowledge*. Full rationale in `memory/decisions.md`.

**Changed:**
- Rebuilt `memory/` from scratch. Removed `findings.md` (duplicated the Claire Robertson avatar + pricing, which live more completely in `02-The-Wiki/sales/Claire-Robertson-Avatar.md` and CLAUDE.md), `progress.md`, and `task_plan.md` (tracked a never-implemented "A.N.T./B.L.A.S.T." framework referencing folders that don't exist). Replaced with `decisions.md`, `current-strategy.md`, `next-actions.md`, `bugs-and-risks.md`, `session-summaries.md`.
- `index.md`'s "Open Tasks" section now just points to `memory/next-actions.md` instead of maintaining a second, drifting copy of the punch list.
- Added a MEMORY MAP section to root `CLAUDE.md` and `AGENTS.md` (mirrored, Claude/Codex terms swapped as the rest of the file does) documenting the three layers and an explicit-trigger-only rule for writing `session-summaries.md`.
- Added folder-level `CLAUDE.md` briefs to `frontend-app/`, `sales-pages-oc/`, and `04-Agents/` so an agent opening one of those folders directly gets oriented immediately.

**New findings surfaced while doing this** (now in `memory/bugs-and-risks.md`): `build-oc-pages.js` is broken — it reads `VIP_Newport_Beach_SalesPage_20260527.html`, deleted in the 2026-06-09 cleanup. `AGENTS.md` references `.Codex/skills/higgsfield/`, which was never actually created (only `.claude/skills/` and `.agents/skills/` exist).

## 2026-08-26 — Lint Report: Wiki Audit + Index Refresh
Ran the LINT PROTOCOL (`.agent/workflows/lint.md`) for the first time on record — no prior Lint Report existed in this log despite the protocol calling for bi-weekly passes.

**Findings:**
1. **Stale index — FIXED.** `index.md` had not been touched since 2026-04-12 despite six log entries of work landing after that date. 3 of 6 `02-The-Wiki` pages were completely unlisted (`Claire-Robertson-Avatar.md`, `Doctor-Diagnosis-Script.md`, `Higgsfield-Prompt-Templates.md`), and `website-redesign-spec.md` was never indexed at all. DS-001's `action-plan.md` and `notes.md` were also missing from the index tree, and the two HTML storyboard dashboards + the `05-Designs/` folder weren't reflected anywhere. All fixed in this pass.
2. **No [[wikilinks]] in use — FIXED for index.md.** CLAUDE.md's INGEST PROTOCOL (step 4) calls for `[[wikilinks]]`, but every cross-reference in the wiki was either absent or used raw `file://` markdown links. Converted `index.md`'s wiki listing to proper Obsidian `[[wikilinks]]` (the vault has `.obsidian/` configured, so these will resolve and show in graph view). The six wiki pages themselves still contain zero internal cross-links to each other — flagging as an open gap, not auto-fixed, since deciding what should link to what is an editorial call.
3. **"Free" vs. "Complimentary" — FLAGGED, NOT AUTO-FIXED.** `02-The-Wiki/marketing/3-Step-Funnel-Framework.md` ("Always free", "Get My Free Visualization") and `02-The-Wiki/website-redesign-spec.md` ("Book Free Estimate") use "Free" directly. Meanwhile the 2026-06-24 and 2026-06-16 log entries both note that episode copy deliberately substitutes "complimentary" for "free" to preserve the luxury tone. CLAUDE.md's NEVER SAY list does not actually ban "free" (it explicitly greenlights "Stress-Free Concierge Experience"), so this isn't a hard brand-rule violation — but it is an inconsistency between two wiki pages and established production practice. Left as-is pending a decision from Fabian on which convention is canonical.
4. **No "AI" mentions found** in any of the 6 wiki pages — brand rule holding.
5. **`02-The-Wiki/communities/`** exists as an empty folder with no pages — not a defect, just unpopulated.

**Action taken:** Updated `index.md` (status table, wiki tree, episode tree, open-tasks list, footer date). No wiki content was rewritten — only the index and this log entry.

## 2026-06-24 — Generated Episode 2 (NB-002-Gallagher) Storyboards and Prompts
- Created the detailed frame-by-frame visual storyboard in `03-Episodes/NB-002-Gallagher/storyboard.md`, using Higgsfield Seedance 2.0 prompts customized from the cinematic headphones blog structure.
- Generated the campaign production master sheet in `03-Episodes/NB-002-Gallagher/production-master.md` containing the word-for-word script, canvas lanes, and GPT Image 2 ad prompts.
- Built the interactive visual dashboard in `03-Episodes/gallagher-episode-02-storyboard.html` using the official Fraunces (headlines) and Inter (body) fonts, custom CSS animations, localStorage-backed checkboxes for tracking progress, and copy-ready expanded prompts.
- Ensured all copy adheres strictly to luxury-tier branding rules (substituting "complimentary" and "prestige" for cost-centric terms, and avoiding mentions of "AI").


## 2026-06-16 — Finalized DS-001 Production Master and Avatar Configs
- Generated the consolidated `03-Episodes/DS-001-Douglas-Sheri/production-master.md` detailing the entire commercial pipeline, settings, Canvas lanes, and GPT Image 2 ad prompts.
- Configured specific Soul ID prompts for Fabian (@Image1 — muscular bald Latin man in an embroidered white polo with the gold crown logo and white jeans), Douglas (@Image2 — distinguished African American man in a navy blazer), and Sheri (@Image3 — elegant African American woman in a cream silk blouse).
- Refined the word-for-word 8-scene script and storyboard (`script.md` and `storyboard.md`) using strict luxury branding rules (substituting "complimentary" for "free" and omitting all cost-centric phrases to maintain the premium estate aesthetic).
- Updated lead `brief.md` to A-qualification status and set next steps in `action-plan.md` to in-production.

## 2026-06-16 — Ingesting Higgsfield Commercial Video Workflows
- Extracted and documented the proven **MCSLA Prompting Formula** (Model, Camera, Subject, Look, Action) and the global cinematic Style Prefix.
- Created new wiki page `02-The-Wiki/marketing/Higgsfield-Commercial-Workflow.md`.
- Linked new wiki page in the master `index.md`.

## 2026-06-09 — Purging Legacy Files and Creating Orange County JSON-LD Schema
- Deleted the legacy folder `awesome-design-md` from the root workspace.
- Deleted the 9 legacy root HTML city sales pages from April 2026 (`VIP_*_SalesPage_20260421.html`).
- Generated and saved the Orange County JSON-LD schema (covering LocalBusiness, Service, and FAQPage with zero placeholders and premium luxury branding) in `assets/orange-county-schema.json` and a copy-paste ready HTML version in `assets/orange-county-schema.html`.

## 2026-06-09 — Consolidating Design System & Purging Banned Colors
- Purged all remaining instances of banned colors (`#FF8210` -> `#C9A961`, `#262362` -> `#1A1F4E`, and `rgba(38,35,98` -> `rgba(26,31,78`) in design system templates, preview cards, and city-generation upgrade script `upgrade-oc-pages.js`.
- Cleaned up design system folder structure by renaming `VIP Home Painting Design System (4)` to `VIP-Home-Painting-Design-System`.
- Removed redundant nested `assets/assets` folder.
- Created local junction folder link in `frontend-app/public/assets` to point directly to the central `assets/` directory.

## 2026-06-05 — Local Environment Configuration
- Set up local `.env` file in `frontend-app/` directory.
- Configured local MongoDB URI (`mongodb://localhost:27017/vip_db`) and secure VIP admin dashboard password (`VIP_ADMIN_PASSWORD`).

## 2026-06-05 — Design Authority Precedence & Color Purge
- Established `assets/css/colors_and_type.css` as the single source of truth for the design system.
- Purged all deprecated values globally across the repo: `#FF8210` -> `#C9A961`, `#262362` -> `#1A1F4E`, `rgba(38,35,98, x)` -> `rgba(26,31,78, x)`, and `--shadow-cta` -> `--shadow-gold`.
- Linked all community pages utilizing `--vip-*` variables to `assets/css/colors_and_type.css`.
- Created root `README.md` and updated `CLAUDE.md` to define design authority and list banned color tokens.
- Ran comprehensive grep validation confirming zero remaining occurrences of deprecated values in design and HTML files.

## 2026-04-12 — Avatar Upgrade: The Ultra-Affluent Pivot
- Upgraded the Claire Robertson persona from $150K income / $800K+ home to $1M+ income / $2M+ estate
- Replaced "affordable/budget" language with "investment/prestige/architectural integrity"
- Updated lead scoring thresholds to hard-disqualify properties under $1.5M
- Updated Doctor Diagnosis script to emphasize the pain of a $30K-$50K mistake on high-end real estate

## 2026-04-12 — Full Vault Initialized
- Created complete folder structure
- Populated CLAUDE.md, GEMINI.md, index.md
- All 9 agent SKILL.md files created
- Wiki pages created (marketing, sales, production, communities)
- DS-001 Douglas & Sheri episode package created
- All workflows created (ingest, episode, lint)
- API keys added to .env (Anthropic, Gemini, Manus)
- VIP Agent Bridge plugin active on WordPress
- Manus webhook endpoint live
