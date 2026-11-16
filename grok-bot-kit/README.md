# Grok Bot Kit — one folder per job

Each folder is one job (one workflow). Every folder has:

- **`INSTRUCTIONS.md`**: paste this into the bot's instructions for that job.
- **`skills/`**: upload every folder inside it as a skill.

| # | Job | Skills | Where the work lands |
|---|---|---|---|
| 01 | City and community sales pages | 7 | OC site repo → viphomepainting.com |
| 02 | Blog posts and pillar guides | 2 | OC site repo → viphomepainting.com |
| 03 | Ads, reels, captions, DMs | 4 | Meta ads, Instagram |
| 04 | Video: commercials, episodes, shotlists | 5 | Higgsfield, Seedance |
| 05 | Leads and outreach | 4 | Gmail, SMS, VIP app |
| 06 | Government contracts (SAM.gov) | 1 | PaintLeads Pro |
| 07 | COO: morning briefing and routing | 1 | Gmail to Fabian |

**One bot per job is best.** If Grok only lets you have one bot, paste `00-SHARED-RULES.md`
first and then the instructions for the job you're running that day.

## Keeping it current

The skills are copies. **Don't edit them here.** Edit the real skill in its repo, then run:

```bash
bash grok-bot-kit/build.sh      # rebuilds every skills/ folder and checks for the old phone and removed tools
```

## Permissions screen: what to set

Keep **Auto-review** selected. Don't choose "Run everything."

**Always ask** (add one rule for each line):
1. Sending any email, text, DM or social post
2. Publishing to the live website (anything with `--live`, or any write to WordPress or Novamira)
3. Spending money: launching or changing a Meta ad budget, paid Higgsfield or Seedance renders, paid Apify runs
4. Deleting or overwriting files, pages or records
5. Pushing to `main`, or merging a pull request
6. Changing the phone number, warranty, pricing, or anything in `communities.json → config`

**Allow without asking:**
1. Reading files, repos and web pages, and web search
2. Writing drafts into the repo (copy, briefs, scripts, shotlists, research notes)
3. Dry runs and checks: `generate.js`, `validate-brief.js`, `verify-site.js`, and `publish-wp.js` without `--live`
4. Committing and pushing to a `claude/...` or `grok/...` working branch

## Known gap

The **Higgsfield sub-skill library** (`higgsfield-prompt`, `cinema`, `soul`, `seedance`,
`troubleshoot`, `models`, and `seedance_lint.py`) is **not in any repo**. The folder at
`vip-lead-machine/.claude/skills/higgsfield/` is an empty link to a repo that git doesn't
have an address for. The video job works without it, but it loses the preflight lint.
Find the original source and add it to `.agents/skills/`.
