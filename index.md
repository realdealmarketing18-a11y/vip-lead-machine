# VIP Premier Lead Machine — Project Index

> **The authoritative starting point for any agent session.**
> Read this first. Always.

---

## 🚦 Current Status

| Item | Status |
|------|--------|
| Project Phase | 🟢 Agent System Live |
| Cities Researched | 1/8 (Newport Beach ✅) |
| Sales Pages Written | 1/8 (Newport Beach ✅) |
| Video Scripts Written | 2/8 (Newport Beach ✅, Coto de Caza ✅) |
| Pages Published | 0/8 (API key needed) |
| Wiki Pages | 6 (see 02-The-Wiki below) |
| Episodes | 2 active (DS-001, NB-002) |
| Last Lint Pass | 2026-08-26 (see log.md) |
| Last Updated | 2026-08-26 |

---

## 🎯 Active Priorities

1. **Publish Newport Beach page** — copy is ready in `04-Agents/outputs/sales-pages/newport-beach-page.md`
2. **Set Firecrawl API key** — needed for live competitor research on remaining 7 cities
3. **Set VIP_AGENT_KEY** — needed for WordPress auto-publishing
4. **Queue Irvine** — set `next_city: Irvine` in `04-Agents/queue/DISPATCH.md`
5. **Send Newport Beach and Coto de Caza scripts to Higgsfield** — Episode 1 & 2 assets ready in `03-Episodes/`

---

## 📂 What Lives Where

```
VIP-Lead-Machine/
├── CLAUDE.md           ← Agent rules for Claude
├── GEMINI.md           ← Agent rules for Gemini/Antigravity
├── index.md            ← THIS FILE — content catalog & navigation
├── log.md              ← Activity log — what happened, what's next
│
├── memory/             ← PROJECT STATE — decisions, strategy, punch list, risks
│   ├── decisions.md          ← Dated decisions + why (includes what's been superseded)
│   ├── current-strategy.md   ← The "now" state — updated weekly
│   ├── next-actions.md       ← THE canonical punch list
│   ├── bugs-and-risks.md     ← Open issues and watch-outs
│   └── session-summaries.md  ← Dated wrap-ups (written only on explicit request)
│
├── 01-Raw-Sources/     ← DROP ZONE — unprocessed inputs only
│   ├── web-clips/      ← Scraped pages, screenshots, web research
│   ├── call-transcripts/  ← Call recordings, notes, summaries
│   └── research-pdfs/  ← Bid docs, spec sheets, government PDFs
│
├── 02-The-Wiki/        ← KNOWLEDGE BASE — distilled & verified
│   ├── marketing/      ← ICP, messaging, channels, campaigns
│   │   ├── [[3-Step-Funnel-Framework]] ← 3-step ad funnel (cold/warm/hot) + UTM scheme
│   │   └── [[Higgsfield-Commercial-Workflow]] ← MCSLA prompting formula + cinematic style prefix
│   ├── sales/          ← Scripts, objections, closing frameworks
│   │   ├── [[Claire-Robertson-Avatar]] ← Target buyer profile (demographics, fears, desires, messaging rules)
│   │   └── [[Doctor-Diagnosis-Script]] ← Sabri Suby 5-stage diagnose-before-prescribe sales script
│   ├── production/     ← Crew capacity, pricing, timelines
│   │   └── [[Higgsfield-Prompt-Templates]] ← Proven SW palette + prompt templates for renders
│   ├── communities/    ← Networks, referrals, associations (empty — no pages yet)
│   └── [[website-redesign-spec]] ← Vite/React landing funnel spec (uncategorized, root of wiki)
│
├── 03-Episodes/        ← ONE FOLDER PER LEAD
│   ├── DS-001-Douglas-Sheri/  ← First active episode
│   │   ├── brief.md        ← Lead qualification brief
│   │   ├── notes.md        ← Client meeting notes
│   │   ├── action-plan.md  ← Project schedule and task breakdown
│   │   ├── script.md       ← 8-scene storytelling commercial script
│   │   ├── storyboard.md   ← Frame-by-frame storyboard with Soul ID prompts
│   │   ├── render-queue.md ← Exact Higgsfield prompts and settings
│   │   └── production-master.md ← Consolidated commercial production plan
│   ├── douglas-sheri-episode-01-storyboard.html ← Interactive visual dashboard for DS-001
│   ├── NB-002-Gallagher/   ← Second active episode
│   │   ├── brief.md        ← Lead qualification brief
│   │   ├── notes.md        ← Client meeting notes
│   │   ├── action-plan.md  ← Project schedule and task breakdown
│   │   ├── script.md       ← 8-scene storytelling commercial script
│   │   ├── storyboard.md   ← Frame-by-frame storyboard with prompts
│   │   ├── render-queue.md ← Higgsfield queue & canvas layout
│   │   └── production-master.md ← Consolidated commercial production plan
│   ├── gallagher-episode-02-storyboard.html ← Interactive visual dashboard for NB-002
│   └── 05-Designs/Sales-Page-10k-Design/CLAUDE-DESIGN-PROMPT.md ← Design brief (not yet an episode)
│
└── .agent/             ← AGENT BRAIN — rules, workflows, skills
    ├── rules/          ← Governance and compliance rules
    ├── workflows/      ← Step-by-step repeatable processes
    └── skills/         ← Reusable templates and capabilities
```

---

## 🏆 Lead Scoring Quick Reference

| Score | Criteria | Action |
|-------|----------|--------|
| **A** | Budget confirmed, decision maker, < 90 days | Immediate priority |
| **B** | Budget likely, influencer, 90–180 days | Active nurture |
| **C** | Budget unknown, no timeline | Light touch |
| **Dead** | No response × 3, wrong fit | Archive |

---

## 📡 Active Integrations

- [ ] SAM.gov API — *not yet configured*
- [ ] Claude API — *not yet configured*
- [ ] VIP CMS (React) — *local file: `C:\Users\Owner\Downloads\VIP_Complete_CMS_1.jsx`*

---

## 📋 Open Tasks for Next Session

See `memory/next-actions.md` — that's the canonical punch list now, not this section (avoids the two drifting out of sync). Project state generally (decisions, current strategy, bugs/risks, session wrap-ups) lives under `memory/` — see the Memory Map in `CLAUDE.md`.

---

*Updated: 2026-08-26 | Next review: next agent session*
