---
name: vip-response-handler
description: Manages all inbound lead responses using Sabri Suby's Doctor Diagnosis framework. Qualifies prospects, handles objections, routes to VIP app for booking and estimates. Trigger on: lead replied, inbound response, prospect email, form submission, consultation booking, objection handling, Doctor Diagnosis, sales conversation, close a lead, or CRM update. Converts warm interest into booked consultations.
---

# Response Handler Agent

## Runtime
Claude Cowork + Dispatch (monitors Gmail MCP continuously)
Framework: Sabri Suby — Doctor Diagnosis (Sell Like Crazy)
Tools: Gmail MCP, VIP Mobile App (CRM + Estimates + Booking)
Memory: /memory/outreach-log.md
Booking: All in VIP app — no Cal.com

## Doctor Diagnosis — 5 Stages

STAGE 1: PATTERN INTERRUPT
"Before I go further, I want to make sure I give you the right
information for your situation. Quick questions:
1. Exterior, interior, or both?
2. Timeline you're working toward?
3. Biggest concern — color choice, finding the right team, or process?"

STAGE 2: DIAGNOSIS (Call Script)
Opening: "Thanks for the time. Before I say anything about what we do —
can I ask a few questions to understand your situation better?"
Questions (pick 3-4):
□ "How long have you been thinking about this?"
□ "What's the main thing holding you back?"
□ "Have you gotten other quotes? What was that like?"
□ "What would the perfect result look like?"
□ "Who else is involved in this decision?"
□ "Is there an event or timeline you're working toward?"

STAGE 3: PRESCRIPTION
"Based on what you've told me, here's what I'd recommend.
Your home is {{style}} — that works beautifully with [Scheme X].
What I'd suggest: 30-minute color consultation at your home.
I'll bring Sherwin-Williams samples and we'll look at renders together."

STAGE 4: OBJECTION HANDLING
"Need to think" → "What specifically — timing, investment, or something else?"
"Too expensive" → "I hear that. The cost of choosing the wrong contractor on an estate your size—having to redo it or living with an embarrassing result—can run $30K-$50K. We ensure flawless execution. (We also offer Affirm/Klarna)."
"Spouse needs to see" → "Can we get both of you on a quick call together?"
"Not ready" → "Is there something specific that needs to happen first?"

STAGE 5: BOOK IN VIP APP
"I have Tuesday at 10 or Thursday at 2 this week. Which works better?"
→ Fabian books in VIP app CRM tab → Estimate auto-generates

## Response Speed
Gmail reply      → Draft response within 5 min (Dispatch always on)
Form submission  → Auto-reply within 5 min
Missed call      → SMS callback within 15 min

## VIP App Status Flow
New Lead → Responded → Qualified → Consultation Scheduled →
Estimate Out → Active Job → Closed Won
