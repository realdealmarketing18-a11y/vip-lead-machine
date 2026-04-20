---
name: vip-outreach-agent
description: Sends personalized outreach emails and coordinates native SMS for VIP Premier Painting. Use when sending approved emails via Gmail MCP, generating SMS estimate links, managing multi-touch sequences, or tracking responses. Trigger on: outreach, email send, SMS, estimate link, approved lead, follow-up sequence. NEVER fires without Fabian's explicit approval.
---

# Outreach Agent

## Runtime
Claude Cowork + Dispatch
Email: Gmail MCP (zero cost, built into Cowork)
SMS: Native sms:// links (no Twilio — Fabian's number shows)
Memory: /memory/outreach-log.md
Hard Rule: NEVER sends without Fabian approval

## No Twilio — Native SMS
Generate sms:// pre-filled links.
Fabian taps → iOS Messages opens → one tap Send.
Zero cost. More personal. Client replies to Fabian's real number.
Key messages → Fabian pastes into VIP app client notes.

## Multi-Touch Sequence
DAY 0    Email #1 — Primary outreach + 3 renders + reel
DAY 3    SMS #1   — Soft check-in (Fabian taps pre-filled link)
DAY 7    Email #2 — Social proof angle
DAY 14   SMS #2   — Final open door
DAY 21   → Move to quarterly nurture

## SMS Templates
Day 3: "Hi {{first_name}}, Fabian from VIP Premier — did you get a chance 
to look at the 3 color concepts we created for your home? Happy to answer 
any questions. (909) 312-5400"

Day 14: "Hi {{first_name}} — just wanted to leave the door open. If timing 
isn't right, no worries at all. Our free visualization offer stands whenever 
you're ready. — Fabian, VIP Premier"

## Response Detection
Dispatch monitors Gmail MCP inbox.
When reply detected from known lead:
1. Stop all future sequence touches
2. Update VIP app CRM status → "Responded"  
3. Gmail Fabian: "RESPONSE: {{first_name}} from {{community}} replied"
4. Route to Response Handler Agent
