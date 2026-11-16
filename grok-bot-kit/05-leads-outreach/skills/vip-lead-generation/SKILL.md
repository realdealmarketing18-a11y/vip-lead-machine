---
name: vip-lead-generation
description: Manages the full lead generation pipeline for VIP Premier Painting — a luxury residential and government contract painting company. Use this skill when the user asks to find leads, score prospects, generate outreach, update the SAM.gov pipeline, modify PaintLeads Pro app.js logic, manage the Apify-to-Gemini-to-Higgsfield visualization workflow, create community landing pages, run ad campaigns, or automate any part of the VIP Premier sales funnel. Trigger on any mention of: leads, prospects, Apify, SAM.gov, painting contracts, The Bridges, community landing pages, Claire Robertson, outreach emails, color visualization, Higgsfield, Gemini, or any of the 8 VIP agents. Always use this skill before answering questions about VIP Premier's systems, communities, or marketing strategy.
---

# VIP Lead Generation System

## System Architecture Overview

VIP Premier Painting runs **two parallel lead pipelines** from a single agent ecosystem:

| Pipeline | Source | Target | Revenue |
|---|---|---|---|
| **Luxury Residential** | Apify (Zillow) → Gemini → Higgsfield | Homeowners $2M–$20M homes | $25K–$150K/project |
| **Gov Contracts** | SAM.gov (NAICS 238320) → PaintLeads Pro | Painting subcontractors (brokered) | 3–10% commission |

Both pipelines feed into the same CRM, reporting to the COO Agent.

---

## Workflow 1: Luxury Residential Pipeline

### Trigger
Apify webhook fires daily ~5:30 AM with new Zillow property data.

### Plan-Validate-Execute Checklist
- [ ] **Receive** Apify webhook payload (property address, photos, sale date, price)
- [ ] **Enrich** with contact details via Apify Contact Details Scraper
- [ ] **Score** lead against Claire Robertson avatar (see Scoring Rules below)
- [ ] **Filter** hot leads (score 9–10) for outreach generation
- [ ] **Analyze** home architecture via Gemini (style, trim, roof, hardscape)
- [ ] **Generate** 3 Sherwin-Williams color schemes via Gemini prompt
- [ ] **Render** photorealistic visualizations via Higgsfield Nano Banana 2
- [ ] **Draft** personalized outreach email with visualization hook
- [ ] **Write** approval ticket to /leads/hot/[slug].md for Fabian
- [ ] **Log** results to /memory/lead-gen-log.md
- [ ] **Flag** hot leads in /memory/lead-gen-log.md for the COO morning briefing

### Lead Scoring Rules (Claire Robertson Avatar)

Score each lead 1–10. Hot = 9–10 only.

```
+3  Home value $2M–$20M (Zillow estimate)
+2  Purchased within last 6 months (new owner = paint motivation)
+2  Vibe intent signals: home improvement, interior design, renovation
+1  Gated/luxury community (The Bridges, Covenant Hills, Eagle Glen, etc.)
+1  Architectural style: Mediterranean, Tuscan, Spanish Colonial, Modern Craftsman
+1  Property photos show faded/dated exterior paint
-2  Rental property indicators
-3  Home value below $800K
```

### Gemini Architecture Analysis Prompt

```
Analyze this home photo and provide:
1. Architectural style (Mediterranean/Tuscan/Spanish Colonial/Modern/Craftsman/Other)
2. Primary exterior surface (stucco/wood siding/brick/stone/mix)
3. Trim color currently visible
4. Roof tile color
5. Hardscape/driveway color
6. Generate 3 premium Sherwin-Williams color schemes:
   - Scheme A: [Mood: Timeless Elegance] Body + Trim + Accent hex codes + SW names
   - Scheme B: [Mood: Modern Coastal] Body + Trim + Accent hex codes + SW names  
   - Scheme C: [Mood: Bold Statement] Body + Trim + Accent hex codes + SW names
Output as JSON only. No preamble.
```

### Outreach Email Framework (Sabri Suby — Doctor Diagnosis)

Use this structure. NEVER mention AI. NEVER use: cheap, affordable, discount, sale.

```
Subject: [Street Name] home — 3 custom color transformations I designed for you

Hi [First Name],

I noticed your home at [Address] recently and wanted to share something I put together.

Our design team created 3 custom color transformations specifically for your home's 
[architectural style] architecture — before you ever commit to a single brushstroke.

[Attach Higgsfield visualization images]

Most homeowners we work with in [Community Name] tell us the same thing: 
"I was afraid I'd choose the wrong color." That's exactly why we created our 
Custom Visualization Service — so you see it first, love it, then we paint it.

No pressure. No commitment. Just clarity.

If any of these resonate, I'd love to schedule a quick 15-minute call to walk you 
through your options.

— Fabian
VIP Premier Painting
(949) 418-6461
```

---

## Workflow 2: Government Contracts Pipeline (PaintLeads Pro)

### SAM.gov API Integration

```javascript
// Core fetch function — replace DEMO_KEY with live key from api.sam.gov
async function fetchSAMContracts(state, minValue, maxValue) {
  const params = new URLSearchParams({
    api_key: 'DEMO_KEY',
    naics: '238320',           // Painting and Wall Covering Contractors
    postedFrom: getDateRange(90), // Last 90 days
    postedTo: getTodayDate(),
    ptype: 'o',                // Solicitations only
    deptname: '',
    state: state,
    limit: 25,
    offset: 0
  });
  
  const res = await fetch(`https://api.sam.gov/opportunities/v2/search?${params}`);
  const data = await res.json();
  return data.opportunitiesData || [];
}

function getDateRange(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - daysBack);
  return d.toISOString().split('T')[0].replace(/-/g, '/');
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0].replace(/-/g, '/');
}
```

### localStorage State Management

Always parse on load, stringify on save. Treat as primary DB.

```javascript
const DB_KEYS = {
  companies: 'paintleads_companies',
  leads: 'paintleads_leads', 
  commissions: 'paintleads_commissions',
  activity: 'paintleads_activity'
};

function loadState(key) {
  try {
    return JSON.parse(localStorage.getItem(DB_KEYS[key])) || [];
  } catch { return []; }
}

function saveState(key, data) {
  localStorage.setItem(DB_KEYS[key], JSON.stringify(data));
  logActivity(`Updated ${key}`);
}
```

### Commission Math Rules

```javascript
// ALWAYS use this formula — never modify the logic
function calcCommission(contractValue, pct) {
  return parseFloat(contractValue) * (parseFloat(pct) / 100);
}

// Pipeline statuses — enforce exact string matching
const PIPELINE_STATUSES = ['Contacted', 'Interested', 'Proposal Sent', 'Won', 'Lost'];

// Dashboard KPI calculation
function getDashboardKPIs(leads) {
  const active = leads.filter(l => !['Won','Lost'].includes(l.status));
  const won = leads.filter(l => l.status === 'Won');
  return {
    activeLeads: active.length,
    pipelineValue: active.reduce((sum, l) => sum + (l.contractValue || 0), 0),
    commissionsEarned: won.reduce((sum, l) => sum + calcCommission(l.contractValue, l.commissionPct), 0)
  };
}
```

---

## Agent Roster & Status

| Agent | Status | Purpose |
|---|---|---|
| Lead Gen Agent | ✅ Built | Apify → score → outreach tickets |
| Landing Page Agent | ✅ Built | Community SEO pages via WP REST API |
| SAM.gov Agent | ✅ Built | Gov contracts → PaintLeads Pro |
| Video Creation Agent | 🔲 Pending | Higgsfield video ads |
| Outreach Agent | 🔲 Pending | Gmail MCP email + native sms:// links |
| Ad Campaign Manager | 🔲 Pending | Meta Ads API |
| Response Handler | 🔲 Pending | Inbound lead qualification |
| COO/Orchestrator | 🔲 Pending | Routes all agents, Gmail briefings |

---

## Community Priority Queue

**Tier 1 — Active ($2M–$5M)**
1. The Bridges, Rancho Cucamonga 91730 ← **CURRENT FOCUS**
2. Covenant Hills, Ladera Ranch
3. Eagle Glen, Corona

**Tier 2 — Next ($5M–$10M)**
4. Shady Canyon, Irvine
5. Coto de Caza, Orange County
6. The Summit, Alta Loma

**Tier 3 — Scale ($10M+)**
7. Crystal Cove, Newport Coast
8. Pelican Hill, Newport Beach
9. Hidden Hills, LA County

---

## WordPress REST API — Quick Reference

```bash
# Create/update community landing page
POST /wp-json/vip/v1/page
Header: X-VIP-Agent-Key: [key from wp-config.php]
Body: { "slug": "the-bridges-painting", "fields": { ... } }

# Check page status
GET /wp-json/vip/v1/page/the-bridges-painting

# Log incoming lead
POST /wp-json/vip/v1/lead
Body: { "name": "", "phone": "", "community": "", "source": "" }
```

---

## Brand Rules (Customer-Facing Content)

- ✅ Use: "VIP Premier's Custom Visualization Service", "our design team", "VIP Concierge"
- ❌ Never: "AI", "artificial intelligence", "automated", "machine learning"
- ✅ Tone: Confident, premium, personal — never pushy
- ❌ Never: "cheap", "affordable", "discount", "sale", "budget"
- Colors: Orange `#e8833a` | Navy `#1a1f4e` | Gold `#FFB200`
- Fonts: Cormorant Garamond (headlines) | Montserrat (buttons) | Poppins (body)

---

## Pricing Reference (City-Specific)

| Market | Exterior $/sqft | Interior $/sqft |
|---|---|---|
| Rancho Cucamonga | $3.25 | $2.75 |
| Newport Beach | $5.50 | $4.50 |
| Irvine | $4.75 | $3.95 |
| Corona/Riverside | $3.00 | $2.50 |

---

## Error Handling

- If Apify webhook fails → Check the Apify run log, retry manually
- If Gemini returns non-JSON → Strip markdown fences, re-parse
- If Higgsfield render fails → Queue for retry, flag in lead ticket
- If WP REST API 401 → Verify X-VIP-Agent-Key matches wp-config.php constant
- If SAM.gov returns empty → Expand date range to 180 days, broaden state filter

---

## Resources

- [Lead Gen Agent Full Spec](resources/LEAD_GEN_AGENT_FINAL.md)
- [Gemini + Higgsfield Workflow](resources/GEMINI_HIGGSFIELD_WORKFLOW.md)
- [Hyper-Local Campaign Templates](resources/HYPER_LOCAL_CAMPAIGNS.md)
- [Headline Formulas](resources/HEADLINE_FORMULAS.md)
