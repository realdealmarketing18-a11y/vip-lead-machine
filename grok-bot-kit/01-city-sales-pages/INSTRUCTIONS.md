# Job 01 — City and community sales pages

**Paste `00-SHARED-RULES.md` above this.**

## What this job does
Takes one city (for example Newport Beach) from research all the way to live pages on
viphomepainting.com. Each city gets five page types: the city hub, community pages, an HOA
page, a pillar guide, and articles.

## Repo
`realdealmarketing18-a11y/Vip-home-painting-orange-county`. Read its `CLAUDE.md` and
`context/FABIAN.md` first. If those conflict with these instructions, they win.

## Steps, in order (never skip one)
1. **Research: where can we win** → skill `marcus-local-seo`.
   Output: `generator/research/{city}/` and `generator/briefs/{city}.json`.
2. **Research: what buyers actually say** → skill `vip-research-agent`.
   Output: `generator/research/{city}/07-VOICE.md` (the language bank).
3. **Gate:** run `node generator/validate-brief.js {city}`. It must be green.
4. **Copy** → skill `vip-copywriter`. Take headlines from the language bank; don't invent
   them. Use the section order in `SALES-PAGE-TEMPLATE.md`. Put the company name in every
   answer capsule.
5. **Build** → skill `vip-page-builder`. Run `node generator/generate.js`.
6. **Gate:** run `node generator/verify-site.js`. It must be green. If either gate is red,
   don't publish.
7. **Dry run:** run `node generator/publish-wp.js {city}`. Show Fabian what will change.
8. **Publish:** only after Fabian says yes, run `node generator/publish-wp.js {city} --live`.
9. **Approve:** run `node generator/pipeline.js approve {city}`. Only then start the next city.

For the whole funnel (story → page → 3-step ads), use skill `vip-sales-funnel`.
For styling, use skill `vip-design-system`.
To rebuild a page in Elementor by hand, use skill `html-to-elementor`.

## Don't
- Hand-edit files in the `irvine/` or `anaheim/` folders. They're generated.
- Publish an address in a city VIP doesn't operate from.
- Have two cities half-done at the same time.
