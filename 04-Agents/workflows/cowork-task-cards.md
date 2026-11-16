# Claude Cowork — Task Cards
**How to use:** Copy the task card for the step you want to run → paste into Claude Cowork → New Task → Run.

Each card is self-contained. No setup needed beyond pasting.

---

## CARD 0 — FULL CITY RUN (all 5 agents, one paste)

```
TASK NAME: VIP Full City Build — [REPLACE WITH CITY]

You are the COO of VIP Premier Painting's AI system. Run a full city build for [CITY NAME].

CONTEXT:
- VIP Premier Painting: luxury exterior painting, Southern California, $2M-$20M homes
- Brand: Custom Visualization Service, Sherwin-Williams Emerald, VIP Concierge
- Avatar: Claire Robertson — 42-55, HNW female, fears wrong contractor
- Phone: (949) 418-6461 | Web: viphomepainting.com
- Price in [CITY]: $[X.XX]/sqft exterior
- NEVER say: AI, cheap, affordable, discount, budget
- ALWAYS say: Custom Visualization Service, investment, estate, prestige

YOUR TASKS (run in this order):

TASK 1 — CITY RESEARCH
Use Firecrawl to research [CITY]:
- Scrape top 5 painting competitor sites, check if ANY offer visualization/rendering
- Pull Zillow data: avg home prices, luxury neighborhoods, $2M+ sales
- Find top 3 luxury HOA communities and any color restriction policies
- Build avatar profile specific to this city
- Identify 3 hyper-local hooks (neighborhoods, landmarks, real estate news)
Save output as: city-intel-[city-slug].md

TASK 2 — SALES PAGE COPY (start after Task 1)
Using the city intel, write a complete sales page with:
- Hero: headline using one of 6 formulas, subheadline, CTA
- Problem section: agitate the fear of wrong color choice
- Solution: Custom Visualization Service explained
- 3-step process: Concierge Assessment → Visualization → Execution
- 3 testimonials (customize for this city's avatar)
- Pricing anchor starting at $[X.XX]/sqft
- 5 FAQ answers using HOA and city-specific context
- Final CTA with phone number
- SEO meta: title, description, primary + 2 secondary keywords
Save output as: sales-page-[city-slug].md

TASK 3 — VIDEO SCRIPTS (start after Task 1, can run parallel with Task 2)
Write 4 video scripts:
1. Awareness (35s) — hook with fear, tease visualization, no hard sell
2. Trust (75s) — show the process, before/after transformation
3. Conversion (40s) — direct offer, free visualization, hard CTA
4. Storytelling Commercial (115s) — full story arc: problem → VIP → certainty → transformation
Each script must include upsell mentions for: protective sealant, Duration system, VIP Home Value Package
Save output as: video-scripts-[city-slug].md

TASK 4 — WORDPRESS PUBLISH (start after Task 2)
Convert the sales page copy into HTML using:
- Brand colors: #C9A961 gold CTAs, #1A1F4E navy headings, #F5EFE2 cream backgrounds, #E8833A orange secondary accents
- Fonts: Fraunces (headlines), Inter (body/buttons)
- Sharp corners on all buttons (no border-radius)
- 8 sections: Hero, Problem, Solution, Process, Testimonials, Pricing, FAQ, CTA
Publish via: POST https://viphomepainting.com/wp-json/vip/v1/page
Slug: exterior-painting-[city-slug]

TASK 5 — VIDEO PRODUCTION BRIEF (start after Task 3)
For each of the 4 scripts, write:
- Scene-by-scene Higgsfield prompts (photorealistic, luxury, cinematic)
- Shot timing sheet
- Seedance/ffmpeg assembly notes
- Clean VO script (words only)
- Music direction
Save output as: production-brief-[city-slug].md

FINAL STEP:
Write a summary of everything completed, any gaps or errors, and what city should run next.
```

---

## CARD 1 — RESEARCH ONLY

```
TASK NAME: VIP City Research — [REPLACE WITH CITY]

Research [CITY NAME] for VIP Premier Painting.

Use Firecrawl to:
1. Find top 5 exterior painting competitors in [city]. For each: website, do they offer visualization (yes/no), Google rating, what avatar they serve (budget vs luxury).
2. Pull Zillow/Realtor.com: average home prices, top luxury neighborhoods, $2M+ sales in last 6 months.
3. Find 3+ luxury gated communities or HOAs. Do any have architectural committees with color requirements?
4. Build a specific avatar profile for [city] homeowners. Who are they? What do they fear? What do they aspire to?
5. Find 3 hyper-local hooks (specific neighborhoods, landmarks, local news) that make copy feel native to this city.

Save as a markdown file with all findings organized clearly.
Flag loudly if NO competitor offers visualization — that is VIP's #1 differentiator.
```

---

## CARD 2 — SALES PAGE ONLY

```
TASK NAME: VIP Sales Page — [REPLACE WITH CITY]

Write a complete luxury sales page for VIP Premier Painting targeting [CITY NAME].

VIP Premier Painting: luxury exterior painting company. $2M-$20M homes. Southern California.
Key offer: Free Custom Visualization Service — photorealistic rendering of the client's home before we paint.
Price: $[X.XX]/sqft exterior in [city].
Phone: (949) 418-6461
NEVER say: AI, cheap, affordable, discount, budget, save money
ALWAYS say: Custom Visualization Service, investment, estate, prestige, VIP Concierge

The page must include:
- HERO: headline (max 10 words, use one of these formulas: Risk Reversal / Status Play / Transformation Promise / Certainty Angle / Competitor Gap / Prestige Proof), subheadline, 2-sentence body, CTA button, 4 trust badges
- PROBLEM: Agitate the fear of choosing wrong color. Mention specific [city] luxury neighborhoods. Don't sell VIP yet.
- SOLUTION: Explain the visualization service clearly. What they get. How it works. The feeling of certainty.
- PROCESS: 3 steps — VIP Concierge Assessment, Custom Visualization Service, Precision Execution
- TESTIMONIALS: 3 testimonials, each with estate value, project scope, and dollar investment
- PRICING: Starting price anchor, what's included, "investment" framing
- FAQ: 5 questions specific to [city] (HOA, climate, product, cost, timeline)
- FINAL CTA: 1 emotional sentence + button + phone + disclaimer

Also write SEO meta: title tag, meta description (155 chars), H1, primary keyword, 2 secondary keywords.
```

---

## CARD 3 — VIDEO SCRIPTS ONLY

```
TASK NAME: VIP Video Scripts — [REPLACE WITH CITY]

Write 4 video scripts for VIP Premier Painting targeting [CITY NAME] homeowners.

VIP's offer: Free Custom Visualization Service. We render the home in photorealistic color before painting.
Avatar: Claire — 42-55, HNW female business owner, fears wrong contractor, aspires to prestige.
NEVER say: AI, cheap, affordable. ALWAYS say: Custom Visualization Service, estate, investment.

SCRIPT 1 — AWARENESS (35 seconds, Meta Reels/TikTok)
Hook with FEAR. Don't sell. Create curiosity. Soft CTA: "Follow for the reveal."

SCRIPT 2 — TRUST (75 seconds, Meta Feed/YouTube)
Show the 3-step process. Before/after transformation. Proof points. CTA: "Free visualization — link in bio."

SCRIPT 3 — CONVERSION (40 seconds, Retargeting)
Direct address. State the offer clearly. Remove risk. Hard CTA: phone number + website.

SCRIPT 4 — STORYTELLING COMMERCIAL (115 seconds, YouTube/Facebook)
Full story: Homeowner's fear → VIP discovery → visualization reveal → transformation → new life.
Emotional. Cinematic. Make it feel like a mini-documentary.

Each script must include upsell mentions (protective sealant, Duration system, Home Value Package) woven naturally — not as ads, as expert advice.

Format each script with: Hook, Scene breakdown (Visual + Audio + Text overlay), CTA.
```

---

## CARD 4 — VIDEO PRODUCTION BRIEF ONLY

```
TASK NAME: VIP Video Production — [REPLACE WITH CITY]

Convert VIP Premier Painting's video scripts into production-ready briefs for [CITY NAME].

For each of 4 videos (Awareness, Trust, Conversion, Commercial):
1. Write detailed Higgsfield prompts for every scene — photorealistic, cinematic, luxury aesthetic.
   Home style: [architectural style from city research]
   Color scheme: Sherwin-Williams [colors from city research]
   Setting: [specific neighborhood from city research]
   
2. Create scene timing sheet (exact start/end seconds for each shot)

3. Write clean voiceover script (words only, no stage directions)

4. Write Seedance assembly notes with ffmpeg sequence

5. Write music direction (mood, tempo, tone — no specific songs)

Higgsfield prompt style: "Cinematic [shot type] of [subject] in [city] California. [lighting]. [mood]. [brand color reference]. Photorealistic. Luxury real estate quality."

Output everything in one organized markdown file with clear sections for each video.
```
