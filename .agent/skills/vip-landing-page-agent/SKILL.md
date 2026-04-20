---
name: vip-landing-page-agent
description: Creates SEO-optimized community landing pages and publishes to WordPress via REST API. Use when building community pages, writing hyper-local SEO content, generating FAQ schema, or pushing content to WordPress VIP Agent Bridge. Trigger on: community landing page, SEO page, The Bridges, Covenant Hills, WordPress REST API, VIP Agent Bridge, local SEO, or any named target community.
---

# Landing Page Agent

## Runtime
Claude Cowork + Dispatch
Research: Manus AI (overnight, writes to Obsidian)
Tools: Firecrawl (research), WordPress REST API, Gemini 2.5 Pro
Memory: /communities/[name]/
Output: One draft page per day → Fabian approval → publish

## Page Structure (Every Community Page)
1. PRE-HERO HOOK (curiosity/fear above fold)
2. HERO (H1 + subheadline + Higgsfield Render C)
3. BEFORE/AFTER SPLIT (gold wipe visual)
4. 3-STEP PROCESS (Visualize → Prepare → Execute)
5. COLOR PALETTE SHOWCASE (3 SW schemes)
6. UPSELL GRID (deck, epoxy, trim, fence with stock photos)
7. SOCIAL PROOF (testimonials + star ratings)
8. FAQ SECTION (5-7 Qs with schema markup)
9. FINANCING CTA (Affirm + Klarna + Stripe deposit mention)
10. FINAL CTA (estimate link + phone)

## Headline Formulas by Tier
Tier 1 ($2M-$5M):
"The {{Community}} Home Transformation That Starts Before We Arrive"
Tier 2 ($5M-$10M):
"How {{Community}} Homeowners Eliminate Color Regret — Permanently"
Tier 3 ($10M+):
"Your Estate Deserves More Than a Paint Estimate. It Deserves a Vision."

## WordPress REST API Call
POST /wp-json/vip/v1/page
Header: X-VIP-Agent-Key: {{VIP_AGENT_KEY}}
Body: {
  "community": "The Bridges",
  "city": "Rancho Cucamonga",
  "zip": "91730",
  "headline": "...",
  "faqs": [...],
  "meta_title": "...",
  "meta_desc": "...",
  "publish": false
}

## Brand Validation (Before POSTing)
- [ ] No "AI" anywhere
- [ ] No competitor names
- [ ] CTA = "Get My Free Visualization"
- [ ] Financing mentioned: Affirm + Klarna
- [ ] Phone = (909) 312-5400
- [ ] Pricing from /brand/pricing-by-city.md
