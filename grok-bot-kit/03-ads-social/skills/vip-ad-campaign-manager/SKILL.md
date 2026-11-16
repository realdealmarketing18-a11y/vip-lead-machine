---
name: vip-ad-campaign-manager
description: Creates and optimizes Meta Facebook/Instagram ad campaigns for VIP Premier Painting using hyper-local community targeting. Use when building campaigns, writing ad copy, configuring audiences, analyzing ROAS, or scaling winners. Trigger on: Facebook ads, Instagram ads, Meta ads, ad campaign, ad copy, ROAS, CPL, retargeting, lookalike, hyper-local targeting, or any community ad launch.
---

# Ad Campaign Manager

## Runtime
Claude Cowork + Dispatch
Tools: Meta Marketing API direct, Gemini 2.5 Pro (copy), Higgsfield renders
Memory: /memory/campaign-log.md
Budget: $500/month per community → scale winners to $3K-$5K/month
Triggered by: COO Agent when community landing page published

## Campaign Structure
CAMPAIGN: VIP Premier — {{Community}} — {{Month}}
├── AD SET 1A: Cold Feed ($15/day)
│   ├── Ad 1: Before/After static image
│   ├── Ad 2: 30-sec visualization reel
│   └── Ad 3: Carousel 3 color schemes
├── AD SET 1B: Cold Stories/Reels ($10/day)
│   └── Ad 1: 15-sec transformation video
├── AD SET 2: Retargeting page visitors ($5/day)
│   └── Ad 1: Social proof version
└── AD SET 3: Lookalike 1% LAL ($10/day)
    └── Ad 1: Best performer from 1A

## Targeting (The Bridges)
Lat: 34.1063 | Lng: -117.5931 | Radius: 2 miles
Age: 35-65 | Income: Top 25% ZIP codes
Interests: Home improvement, Interior design, Luxury goods, Real estate
Behaviors: Likely to move, Recently moved

## Headline Formulas
1. "3 Ways {{Community}} Homeowners Transform Curb Appeal Without a Designer"
2. "See Your Home Transformed in 48 Hours — Before You Commit"
3. "5 Color Mistakes {{City}} Homeowners Make — And How to Avoid Every One"
4. "The {{Community}} Homeowner's Guide to Exterior Color Confidence"
5. "See Your Home Transformed First — Then Decide. Always Free."

## Scaling Rules
CPL <$25 for 3 days     → Double daily budget
CPL $25-$35 for 5 days  → Hold, test new creative
CPL >$45 for 3 days     → Pause, review targeting
Frequency >3.5          → Refresh creative now
$150 spent, 0 leads     → Kill immediately

## 3-Step Funnel Structure
STEP 1 — COLD (Awareness):
Hook: "Still guessing what color to paint your home?"
Visual: Before photo (pain state — desaturated)
CTA: Learn more
Audience: Homeowners in [community] zip

STEP 2 — WARM (Consideration):
Hook: "See how [community] homeowners transformed their home first"
Visual: Higgsfield render reveal
CTA: See examples
Audience: Watched 50%+ of Step 1 video

STEP 3 — HOT (Conversion):
Hook: "67 homeowners. Zero color regret."
Visual: Before/After split + Render K golden hour
CTA: Get my free visualization
Audience: Step 2 engagers + website visitors
