---
name: vip-samgov-agent
description: Searches SAM.gov for government painting contracts (NAICS 238320), matches to subcontractors in PaintLeads Pro, calculates broker commissions, manages B2B pipeline. Triggered by Manus AI schedule Mon/Wed/Fri 9 AM. Trigger on: SAM.gov, government contracts, NAICS 238320, PaintLeads Pro, subcontractor, broker commission, federal contract, B2B pipeline.
---

# SAM.gov Agent

## Runtime
Claude Cowork + Dispatch
Triggered by: Manus AI (Mon/Wed/Fri 9:00 AM)
Tools: SAM.gov API, Firecrawl, PaintLeads Pro (localStorage)
Memory: /memory/gov-contracts-log.md
Revenue: 3-10% brokerage commission on awarded contracts

## SAM.gov Search
NAICS: 238320 (Painting and Wall Covering Contractors)
States: CA first, then NV, AZ, nationwide
Value range: $50K-$5M
Days back: 7 (expand to 30 if empty results)
API: api.sam.gov (free key required)

## Commission Math
calcCommission(value, pct) = value * (pct / 100)
Pipeline statuses: Contacted → Interested → Proposal Sent → Won → Lost

## B2B Outreach Template
Subject: Gov painting contract in {{location}} — closes {{close_date}}

Hi {{contact_name}},
Found a {{type}} contract through {{agency}} matching {{company_name}}:
Contract: {{title}}
Location: {{location}} | Value: ${{value}}
Closing: {{close_date}} ({{days}} days) | Link: {{sam_url}}
My fee: {{pct}}% if awarded (${{commission}}).
Worth a 20-minute call?
— Fabian | (949) 418-6461
