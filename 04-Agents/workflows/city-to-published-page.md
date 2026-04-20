# WORKFLOW: City → Published Sales Page + Video Content
**Trigger:** Manual (you) or COO Orchestrator (scheduled)
**Total runtime:** ~60 minutes per city, fully unattended
**End state:** Live WordPress page + 4 video scripts ready for production

---

## PRE-FLIGHT CHECKLIST

Before starting, confirm:
- [ ] `VIP_AGENT_KEY` is set in environment (for WordPress API)
- [ ] Firecrawl API key is active
- [ ] Target city is set in `queue/DISPATCH.md`
- [ ] `outputs/` directories exist

---

## STEP-BY-STEP EXECUTION

### STEP 1 — CITY RESEARCH (Agent 1)
```
Trigger: COO reads queue → dispatches Agent 1 with city name
Agent prompt: prompts/01-city-research-agent.md
Input: City name (e.g. "Newport Beach")
Tools used: Firecrawl (competitor sites, Zillow, HOA pages)
Output: outputs/city-intel/newport-beach.md
Time: ~20 minutes
Gate: Do not proceed to Step 2 until city-intel file exists and has all 5 phases
```

**What to look for in the output:**
- Visualization gap confirmed (competitors offering it or not)
- 3+ luxury subdivisions named
- Avatar profile complete
- At least 3 local hooks

---

### STEP 2A — SALES PAGE COPY (Agent 2)
```
Trigger: city-intel file complete → dispatch Agent 2
Agent prompt: prompts/02-sales-page-copywriter.md
Input: outputs/city-intel/newport-beach.md
Tools used: Claude only
Output: outputs/sales-pages/newport-beach-page.md
Time: ~15 minutes
Gate: Page must have all 8 sections + SEO meta complete
```

### STEP 2B — VIDEO SCRIPTS (Agent 3) — RUNS PARALLEL WITH 2A
```
Trigger: city-intel file complete → dispatch Agent 3 simultaneously
Agent prompt: prompts/03-video-script-creator.md
Input: outputs/city-intel/newport-beach.md
Tools used: Claude only
Output: outputs/video-scripts/newport-beach-scripts.md
Time: ~10 minutes
Gate: All 4 scripts complete (V1, V2, V3, Commercial)
```

---

### STEP 3 — PUBLISH TO WORDPRESS (Agent 4)
```
Trigger: sales page copy complete → dispatch Agent 4
Agent prompt: prompts/04-web-design-agent.md
Input: outputs/sales-pages/newport-beach-page.md
Tools used: WordPress REST API
Output: Live page + outputs/web-design/newport-beach-brief.md
Time: ~5 minutes
Gate: HTTP 200 from WordPress API OR fallback HTML file saved
```

### STEP 4 — VIDEO PRODUCTION BRIEF (Agent 5) — RUNS AFTER STEP 2B
```
Trigger: video scripts complete → dispatch Agent 5
Agent prompt: prompts/05-video-production-agent.md
Input: outputs/video-scripts/newport-beach-scripts.md
Tools used: Higgsfield + Seedance specs (no API calls — just brief generation)
Output: outputs/video-scripts/newport-beach-production.md
Time: ~10 minutes
Gate: All 4 production briefs complete with Higgsfield JSON
```

---

### STEP 5 — UPDATE QUEUE + LOG
```
1. Open queue/DISPATCH.md
2. Mark all 5 columns ✅ for the completed city
3. Set next_city to next unfinished city
4. Append to log.md:

## [Date] — [City] Complete
- Sales page: [URL or pending]
- Scripts: 4 scripts written (V1, V2, V3, Commercial)
- Production brief: Ready for Higgsfield
- Estimated revenue unlock: $[avg project value × 10 leads expected]
- Next city: [next city name]
```

---

## PARALLEL EXECUTION MAP

```
START
  │
  ▼
[Agent 1: Research] ──────────────────── ~20 min
  │
  ├──────────────────┐
  ▼                  ▼
[Agent 2: Copy]   [Agent 3: Scripts]  ── ~15 min / ~10 min (parallel)
  │                  │
  ▼                  ▼
[Agent 4: Publish] [Agent 5: Production] ── ~5 min / ~10 min (parallel)
  │                  │
  └──────────────────┘
             │
             ▼
      [Step 5: Update queue + log]
             │
             ▼
           DONE
Total wall clock: ~50-55 minutes
```

---

## ERROR HANDLING

| Error | Action |
|-------|--------|
| Firecrawl blocked by site | Skip that source, note in city-intel, continue |
| WordPress API timeout | Save HTML file, flag for manual upload |
| Incomplete city-intel | Proceed with available data, flag gaps |
| Brand rule violation found | Rewrite flagged section before publishing |
| Output file already exists | If skip_if_exists=true, skip; else overwrite |

---

## TRIGGERING MANUALLY IN CLAUDE COWORK

1. Open Claude Cowork → New Task
2. Set task name: `VIP City Build — [City Name]`
3. Paste the COO Orchestrator prompt: `04-Agents/prompts/00-coo-orchestrator.md`
4. Add at the end: `The city for today's run is: [City Name]`
5. Attach files: `queue/DISPATCH.md` and `02-The-Wiki/marketing/Claire-Robertson-Avatar.md`
6. Hit Run

The agent will chain all 5 sub-agents automatically.
