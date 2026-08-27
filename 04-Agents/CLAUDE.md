# 04-Agents — CLAUDE.md
*Last updated: 2026-08-26 · Owner: Fabian*

Read `../CLAUDE.md` first for the full AGENT ROSTER, tool stack, and protocols — this file only covers what's specific to this folder.

---

## A · What this folder is
The operational home of the 9-agent system (COO Orchestrator, Lead Gen, Landing Page, Video Creation, Outreach, Ad Campaign Mgr, Response Handler, SAM.gov, Episode Creator — full list in root `CLAUDE.md`). Holds each agent's prompt/skill definition, the dispatch queue that drives the 8-city rollout, and per-agent generated output.

## B · The Goal
- **Why it exists:** one place to define what each agent does and route work between them, separate from the knowledge they read (`../02-The-Wiki/`) and the state of the overall project (`../memory/`).
- **Done looks like:** `queue/DISPATCH.md` runs through all 8 cities with `skip_if_exists: true`, each agent's `outputs/` folder fills in accordingly, without manual babysitting per city.
- **Out of scope:** this folder does not hold shared domain knowledge — an agent's SKILL.md can *reference* `../02-The-Wiki/`, but should never fork a copy of wiki content into a prompt file.

## C · Stack
- **Prompts/skills:** `prompts/00-coo-orchestrator.md` through `05-video-production-agent.md`; `skills/video-production/` (sub-skills for commercial production)
- **Queue:** `queue/DISPATCH.md` — single source of truth for "what city runs next"
- **Outputs:** `outputs/{city-intel,sales-pages,video-scripts}/` — per-run generated artifacts, one subfolder per output type (not per agent, currently — see note below)
- **Execution engine:** Claude Cowork + Dispatch (per root CLAUDE.md TOOL STACK) — this folder holds the definitions, not the runtime

## D · Decisions
- `2026-08-26` — Confirmed: agents do not get individual wikis. Shared knowledge stays in `../02-The-Wiki/`; this folder is for routing, prompts, and generated output only. See `../memory/decisions.md`.
- Note: `outputs/` is currently organized by output *type* (`city-intel/`, `sales-pages/`, `video-scripts/`), not by *agent*. If this folder grows and that stops scaling, revisit — but don't reorganize it without a reason, since DISPATCH.md and the agent prompts already reference these exact paths.

## E · Memory Map
Project-wide state (decisions, strategy, punch list, risks) lives in root `../memory/` — this folder doesn't have its own. `queue/DISPATCH.md`'s "COMPLETED RUNS LOG" section is the agent-run-specific log; `../log.md` is the project-wide activity log. Don't merge the two.

## F · References
- Agent roster + tool stack: root `CLAUDE.md`
- Setup guide: `SETUP-GUIDE.md` (this folder)
- Architecture blueprint: `BLUEPRINT.md` (this folder)
- Workflows: `workflows/city-to-published-page.md`, `workflows/cowork-task-cards.md`
