# Session Summaries
*Dated wrap-ups. Only written when explicitly asked to "save this / wrap this up / remember this" — never written silently mid-session. Newest at top.*

## 2026-08-26 — Memory Architecture Overhaul

**TL;DR:** Restructured project memory into two clean layers — `02-The-Wiki` for shared domain knowledge, `memory/` for project state — and gave the OC sales pages and agent system their own folder-level briefs.

**What we discussed:** Fabian shared two external patterns — an "LLM Wiki" idea doc and a folder-level "Operating Manual" CLAUDE.md template — and asked how to give VIP Lead Machine, the OC sales pages, and the AI agents a memory system that compounds daily.

**What we decided:**
- No per-agent wikis — one shared `02-The-Wiki`, agents get scratch space in `04-Agents/outputs/` instead. See [[decisions]].
- `memory/` gets rebuilt around [[decisions]] / [[current-strategy]] / [[next-actions]] / [[bugs-and-risks]] / session-summaries, replacing the stale, never-implemented "A.N.T./B.L.A.S.T." files that were sitting there since April.
- `next-actions.md` is now the single punch list; `index.md`'s open-tasks section just points to it.
- Added folder-level `CLAUDE.md` briefs to `frontend-app/`, `sales-pages-oc/`, and `04-Agents/` so an agent opening those folders directly gets oriented without re-reading the whole root file.

**What's next:** See [[next-actions]]. Biggest lever is unblocking the three unconfigured integrations (Firecrawl, VIP_AGENT_KEY, SAM.gov) — that's what's actually stopping the pipeline from running on cities 2-8, not content quality.
