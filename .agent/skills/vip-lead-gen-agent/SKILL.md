---
name: vip-lead-gen-agent
description: Luxury residential lead generation for VIP Premier Painting. Processes Apify Zillow data, enriches with Vibe Prospecting intent signals, scores leads against Claire Robertson avatar, generates Gemini color schemes, queues Higgsfield renders, and writes approval tickets. Trigger on: Apify, Zillow, property data, lead scoring, Claire Robertson, Vibe Prospecting, intent signals, hot leads, warm leads, or 5:30 AM scrape. Always use before answering anything about residential lead generation.
---

# Lead Gen Agent

## Runtime
Claude Cowork + Dispatch
Triggered by: Apify webhook daily ~5:30 AM
Tools: Apify, Vibe Prospecting, Gemini 2.5 Pro
Memory: /memory/lead-gen-log.md

## Pipeline
- Apify webhook delivers property payload
- Read /brand/claire-robertson-avatar.md
- For each property: Vibe Prospecting enrichment
- Score lead 1-10 against Claire Robertson profile
- Scores 9-10: send photo to Gemini 2.5 Pro
- Gemini returns arch analysis + 3 color schemes + 6 Higgsfield prompts
- Pass prompts to Video Creation Agent
- Draft personalized outreach email
- Write ticket to /leads/hot/[slug].md
- Sync to VIP app CRM via REST API
- Log to /memory/lead-gen-log.md

## Lead Scoring (1-10)
+3  Home value $2M+ 
+2  Purchased within 90 days
+2  Vibe intent signals (Architectural Digest, Houzz premium, Christie's)
+1  Luxury community match
+1  Home 3500+ sqft
+1  Income $500K+ estimated
-3  Rental property
→ 0 Home under $1.5M (hard disqualify)

## Gemini 2.5 Pro Prompt
Analyze home photo. Return ONLY valid JSON. No preamble.
{
  "architectural_style": "Mediterranean|Tuscan|Spanish Colonial|Modern|Craftsman|Contemporary",
  "primary_surface": "stucco|wood siding|brick|stone|mix",
  "distinctive_feature": "[most notable element]",
  "paint_condition": "excellent|good|fair|poor",
  "color_schemes": [
    {
      "mood": "Timeless Elegance",
      "body": {"name":"SW name","sw":"SW XXXX","hex":"#XXXXXX"},
      "trim": {"name":"SW name","sw":"SW XXXX","hex":"#XXXXXX"},
      "accent": {"name":"SW name","sw":"SW XXXX","hex":"#XXXXXX"},
      "door": {"name":"SW name","sw":"SW XXXX","hex":"#XXXXXX"},
      "higgsfield_twilight": "[full cinematic prompt]",
      "higgsfield_sunny": "[full sunny day prompt]"
    },
    {"mood": "Modern Coastal", ...},
    {"mood": "Bold Statement", "additions": "...", ...}
  ]
}

## Outreach Email Template
Subject: {{address}} — 3 color transformations our design team created for you

Hi {{first_name}},

I noticed your {{style}} home at {{address}} recently — stunning architecture.

Our design team was inspired enough to put together 3 custom color 
transformation concepts specifically for your property, designed around 
your home's {{distinctive_feature}} and the character of {{community}}.

[3 renders attached + 30-second visualization reel]

Most homeowners tell us: "I was afraid I'd choose the wrong color and regret it."
That's exactly why we built our Custom Visualization Service.
See it first. Love it. Then we paint it.

If any of these resonate, I'd love a quick 15-minute call.
No pressure. No obligation. Just clarity.

— Fabian | VIP Premier Painting
(909) 312-5400 | viphomepainting.com

NEVER SAY: AI, cheap, affordable, discount, sale, automated, budget, save money
ALWAYS USE TONE: investment, estate, prestige, architectural integrity, flawless execution
