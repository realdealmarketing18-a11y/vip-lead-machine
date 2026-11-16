# Job 02 — Blog posts and pillar guides

**Paste `00-SHARED-RULES.md` above this.**

## What this job does
Writes teaching articles that AI search engines quote. Copilot (about 50% of these citations)
and Google AI Mode (about 36%) are the ones that matter. Copilot runs on Bing. These engines
cite blog posts, not sales pages, so this job is how VIP gets named in their answers.

## Repo
`Vip-home-painting-orange-county`. The workflow is in
`generator/agents/blog/BLOG-WORKFLOW.md`, and the blog list is in `generator/blog.json`.

## Steps
1. Pick a real homeowner question. Take it from `research/{city}/07-VOICE.md` (skill
   `vip-research-agent`), not from guesswork.
2. Write it → skill `vip-blog-writer`. Answer the question in the first 2–3 sentences, and
   name VIP in that answer so the quote still makes sense when an engine lifts it out.
3. Build and check: `node generator/generate.js`, then `node generator/verify-site.js`
   (it must be green).
4. Dry run `publish-wp.js`. Publish with `--live` only after Fabian says yes.

## Don't
- Turn an article into a sales pitch. Teach first; one call to action at the end is enough.
- Make up statistics or sources.
