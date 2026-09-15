# VIP Premier Painting — AI Agent Blueprint
**Version:** 1.0 | **Updated:** 2026-04-16
**Goal:** Build one sales page + video content per city while you're at work.

---

## THE MACHINE AT A GLANCE

```
7:00 AM  COO Orchestrator wakes up
         ↓ reads queue/DISPATCH.md
         ↓
[CITY RESEARCH AGENT]      — pulls competitor data, Zillow, HOA intel per city
         ↓
[SALES PAGE COPYWRITER]    — writes full page copy with headline formulas
         ↓
[VIDEO SCRIPT CREATOR]     — writes 3-step funnel + commercial scripts
         ↓
[WEB DESIGN AGENT]         — builds WordPress page via REST API
         ↓
[VIDEO PRODUCTION AGENT]   — creates Higgsfield render queue + Seedance brief
         ↓
You come home to: published page + video production files ready
```

---

## AGENT ROSTER

| # | Agent | Tool | Output | Runtime |
|---|-------|------|--------|---------|
| 0 | COO Orchestrator | Claude Cowork Dispatch | Briefing + queue routing | 7:00 AM daily |
| 1 | City Research Agent | Firecrawl + Manus + Apify | `city-intel/[city].md` | ~20 min/city |
| 2 | Sales Page Copywriter | Claude + city-intel | `sales-pages/[city]-page.md` | ~15 min/city |
| 3 | Video Script Creator | Claude + city-intel + avatar | `video-scripts/[city]-scripts.md` | ~10 min/city |
| 4 | Web Design Agent | WordPress REST API | Live page at viphomepainting.com | ~5 min/city |
| 5 | Video Production Agent | Higgsfield + Seedance | Render queue JSON + storyboard | ~10 min/city |

**Total per city: ~60 minutes unattended**

---

## TARGET CITIES — PRODUCTION QUEUE

| Priority | City | Price/sqft | Target Avatar | Status |
|----------|------|-----------|---------------|--------|
| 1 | Newport Beach | $5.50 | Ultra-HNW, beach estates | 🔴 Not started |
| 2 | Irvine | $4.75 | Tech exec, master-planned luxury | 🔴 Not started |
| 3 | Rancho Cucamonga | $3.25 | Business owner, The Bridges/Thoroughbred | 🔴 Not started |
| 4 | Corona | $3.00 | Upper-middle, HOA communities | 🔴 Not started |
| 5 | Riverside | $3.00 | Professional, historic estates | 🔴 Not started |
| 6 | Fontana | $3.00 | New construction, Crestwood | 🔴 Not started |
| 7 | Mission Viejo | $4.00 | Empty nester, Lake MV estates | 🔴 Not started |
| 8 | Laguna Hills | $4.25 | Executive, Aliso Viejo corridor | 🔴 Not started |

---

## DISPATCH SYSTEM

### How to trigger agents

**Option A — Morning Auto-Run (Claude Cowork)**
Paste the COO Orchestrator prompt into a Claude Cowork session scheduled at 7 AM.
It reads `04-Agents/queue/DISPATCH.md`, picks the next city, and chains all 5 agents.

**Option B — Manual Single City**
Open Claude Cowork → New Task → paste the agent prompt for the step you want → specify the city.

**Option C — Full Batch (all cities)**
Set DISPATCH.md mode to `batch` → COO runs all 8 cities sequentially overnight.

---

## OUTPUT STRUCTURE

```
04-Agents/outputs/
├── city-intel/
│   ├── newport-beach.md      ← competitor data, Zillow, HOA, avatar notes
│   ├── irvine.md
│   └── ...
├── sales-pages/
│   ├── newport-beach-page.md ← full page copy, ready to paste into WordPress
│   └── ...
├── video-scripts/
│   ├── newport-beach-scripts.md  ← 3-step funnel + 1 commercial
│   └── ...
└── web-design/
    ├── newport-beach-brief.md    ← design spec for Higgsfield visuals
    └── ...
```

---

## WORDPRESS PUBLISHING

Every sales page publishes automatically via:
```
POST https://viphomepainting.com/wp-json/vip/v1/page
Header: X-VIP-Agent-Key: [VIP_AGENT_KEY]

Body:
{
  "slug": "exterior-painting-newport-beach",
  "title": "Luxury Exterior Painting Newport Beach",
  "content": "[generated HTML]",
  "meta_description": "[SEO description]",
  "city": "Newport Beach",
  "price_per_sqft": "5.50"
}
```

---

## BRAND RULES — ALL AGENTS MUST FOLLOW

- NEVER say: AI, automated, algorithm, cheap, affordable, discount, budget, save money
- ALWAYS say: Custom Visualization Service, VIP Concierge, estate, investment, prestige
- Colors: Orange #E8833A | Navy #1A1F4E | Gold #C9A961
- Phone: (909) 312-5400 | Email: Contact@VIPHomePainting.com
- Tagline: "Visualize It. Love It. Paint It."
- Avatar: Claire Robertson — 42-55, CEO/Business Owner, $1M-$5M HHI, fear = wrong contractor

---

## AGENT PROMPT FILES

| File | Purpose |
|------|---------|
| `prompts/00-coo-orchestrator.md` | Master dispatcher — reads queue, chains agents |
| `prompts/01-city-research-agent.md` | Deep city intel gatherer |
| `prompts/02-sales-page-copywriter.md` | Full page copywriter with headline formulas |
| `prompts/03-video-script-creator.md` | 3-step funnel + commercial script writer |
| `prompts/04-web-design-agent.md` | Landing page builder + WordPress publisher |
| `prompts/05-video-production-agent.md` | Higgsfield + Seedance production brief |

---

## QUICK START

1. Open `queue/DISPATCH.md` — set `next_city: Newport Beach`
2. Open Claude Cowork → New Dispatch Task
3. Paste contents of `prompts/00-coo-orchestrator.md`
4. Hit Run — walk away
5. Check `outputs/` folder when you get home
