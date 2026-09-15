# Bugs & Risks
*Open issues and watch-outs. Not a task list (see [[next-actions]]) — this is "things that could bite us."*

- ~~**"Free" vs. "Complimentary" inconsistency.**~~ ✅ **Resolved 2026-09-15** — "complimentary" is canonical for anything offered; "free" is now on CLAUDE.md's NEVER SAY list; idioms get reworded ("Concierge Experience"), not swapped. The two wiki pages that said "Free" were updated. See [[decisions]].
- **`build-oc-pages.js` is broken.** It reads `VIP_Newport_Beach_SalesPage_20260527.html` from repo root as its base template — that file doesn't exist (the 2026-06-09 log entry shows the legacy root HTML pages were deleted). Anyone running this script will get a file-not-found crash. Found 2026-08-26, not yet fixed.
- **`AGENTS.md` references `.Codex/skills/higgsfield/`**, which doesn't exist — only `.claude/skills/higgsfield/` and `.agents/skills/higgsfield/` exist on disk. `AGENTS.md` is meant to mirror `CLAUDE.md` for Codex; this path was never actually created for Codex's runtime. Low priority unless Codex is actually being used to drive Higgsfield work.
- **`02-The-Wiki/communities/` is empty.** Referenced in `index.md`'s tree since April but no pages exist. Not urgent — no source material to ingest yet.
- **Three unconfigured integrations block scale-up**: Firecrawl API key, `VIP_AGENT_KEY` (WordPress publish), SAM.gov API key. See [[current-strategy]] and [[next-actions]].
