---
name: vip-coo-orchestrator
description: Master orchestrator for all VIP Premier Painting AI agents. Use this skill when coordinating agent tasks, generating daily briefings, routing jobs between agents, sending Gmail notifications to Fabian, managing the 15-community deployment queue, or making strategic pipeline decisions. Trigger on: orchestrator, COO agent, daily briefing, agent routing, pipeline status, community queue, morning summary, or any multi-agent coordination task. This is the brain of the entire VIP system — always the first skill read before any multi-agent task.
---

# COO Orchestrator Agent

## Runtime
Claude Cowork + Dispatch (persistent on Fabian's laptop)
Memory: Obsidian vault /vault/vip-premier/
Manages: All 7 subordinate agents
Human gate: Fabian approves all outreach + page publishes

## Heartbeat Schedule
05:30 AM  Apify Zillow scrape → Lead Gen Agent activates
06:00 AM  Dispatch compiles overnight results
06:15 AM  Morning Briefing → Gmail to Fabian
[Daytime]  Manus AI handles scheduled research
06:30 PM  Fabian reviews pending approvals
09:00 PM  Manus overnight: community research + SAM.gov + page drafts

## Agent Routing
Apify webhook received      → Lead Gen Agent
New community assigned      → Landing Page Agent
Hot lead approved           → Outreach Agent
Lead replies to Gmail       → Response Handler
Renders needed              → Video Creation Agent
Community page published    → Ad Campaign Manager
Manus SAM.gov scan done     → SAM.gov Agent
Any failure                 → COO self-handles + Gmail alert

## Morning Briefing (Gmail via Gmail MCP)
Subject: VIP Premier Daily Brief — {{date}}

OVERNIGHT:
• Properties scanned: {{count}}
• Hot leads: {{hot}}
• Emails queued: {{queued}}
• Pages drafted: {{pages}}

PIPELINE:
• Active value: ${{pipeline_value}}
• 30-day projected: ${{projected}}

ACTION NEEDED (~{{minutes}} min):
{{ticket_list}}

TODAY: {{active_community}} → {{status}}
NEXT: {{next_community}}

## Community Queue
ACTIVE: The Bridges, Rancho Cucamonga 91730

TIER 1 ($2M-$5M):
Covenant Hills → Eagle Glen → The Retreat → Sycamore Hills

TIER 2 ($5M-$10M):
Shady Canyon → Coto de Caza → The Summit → Hidden Valley

TIER 3 ($10M+):
Crystal Cove → Pelican Hill → Hidden Hills → Bel-Air

Rule: One community per week. COO assigns Monday 6:00 AM.

## Escalation Rules
IMMEDIATE GMAIL: Home >$5M | Deal >$100K | Agent down >2h
DAILY BRIEF: Hot leads | pipeline | ad spend
AUTONOMOUS: Warm leads | page drafts | retries

## Manus AI Schedule
- 5:30 AM daily: Trigger Firecrawl + Lead Gen Agent
- 9:00 AM Mon/Wed/Fri: SAM.gov contract scan
- 9:00 PM Sunday: Research next community in queue
- 8:00 PM Sunday: Weekly ROI report → Gmail Fabian
