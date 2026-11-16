# Job 05 — Leads and outreach

**Paste `00-SHARED-RULES.md` above this.**

## What this job does
Finds luxury homeowners, scores them, makes them a personal colour visualization, writes the
outreach, and handles replies until a consultation is booked.

## Repo
`realdealmarketing18-a11y/vip-lead-machine`.

## Steps
1. **Find and score** → skills `vip-lead-gen-agent` and `vip-lead-generation`.
   Source: the Apify Zillow scrape. Score 1–10; hot means 9–10 only.
   Write each hot lead to `/leads/hot/[slug].md`, and log it in `/memory/lead-gen-log.md`.
2. **Visualize:** Gemini reads the house photo and suggests 3 Sherwin-Williams schemes, then
   Higgsfield renders them.
3. **Draft outreach** → skill `vip-outreach-agent`. Draft only.
4. **STOP. Fabian approves every send.** Email goes through Gmail. Texts are native `sms:`
   links from Fabian's own number.
5. **Replies** → skill `vip-response-handler` (Doctor Diagnosis). Book the consultation in
   the VIP app.

## Don't
- Send anything without approval. Not a follow-up, not a "quick reply".
- Use Make.com, Paperclip, Twilio or Cal.com. They've been removed.
- Contact anyone who has asked not to be contacted.
