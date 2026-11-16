#!/usr/bin/env bash
# Rebuilds every workflow's skills/ folder from the real skill sources,
# so the Grok Bot kit never drifts from the repos.
#
#   bash grok-bot-kit/build.sh            # OC repo assumed next door
#   OC=/path/to/oc-site bash grok-bot-kit/build.sh
#
# The INSTRUCTIONS.md in each folder is hand-written and is NOT touched.
set -euo pipefail
KIT="$(cd "$(dirname "$0")" && pwd)"
LM="$(cd "$KIT/.." && pwd)"
OC="${OC:-$LM/../Vip-home-painting-orange-county}"
[ -d "$OC/generator/skills" ] || { echo "OC repo not found at $OC (set OC=...)"; exit 1; }

src() {  # skill name -> source folder
  case "$1" in
    marcus-local-seo|vip-research-agent|vip-copywriter|vip-copywriter-agent|vip-page-builder|vip-sales-funnel|vip-blog-writer)
      echo "$OC/generator/skills/$1" ;;
    vip-design-system) echo "$OC/design-system" ;;
    html-to-elementor|vip-lead-generation|vip-seedance-shotlist-director|higgsfield-seedance-prompt)
      echo "$LM/.agents/skills/$1" ;;
    video-production) echo "$LM/.claude/skills/video-production" ;;
    *) echo "$LM/.agent/skills/$1" ;;
  esac
}

pack() {  # workflow folder, then its skills
  local wf="$1"; shift
  rm -rf "$KIT/$wf/skills"; mkdir -p "$KIT/$wf/skills"
  for s in "$@"; do
    local from; from="$(src "$s")"
    [ -f "$from/SKILL.md" ] || { echo "MISSING: $s ($from)"; exit 1; }
    mkdir -p "$KIT/$wf/skills/$s"
    if [ "$s" = vip-design-system ]; then   # only the skill, not the whole design system
      cp "$from/SKILL.md" "$from/colors_and_type.css" "$KIT/$wf/skills/$s/" 2>/dev/null || cp "$from/SKILL.md" "$KIT/$wf/skills/$s/"
    else
      cp -r "$from/." "$KIT/$wf/skills/$s/"
    fi
  done
  echo "$wf: $#"
}

pack 01-city-sales-pages  marcus-local-seo vip-research-agent vip-copywriter vip-page-builder vip-sales-funnel vip-design-system html-to-elementor
pack 02-blog-guides       vip-blog-writer vip-research-agent
pack 03-ads-social        vip-research-agent vip-copywriter-agent vip-sales-funnel vip-ad-campaign-manager
pack 04-video             video-production vip-video-creation-agent vip-episode-creator vip-seedance-shotlist-director higgsfield-seedance-prompt
pack 05-leads-outreach    vip-lead-generation vip-lead-gen-agent vip-outreach-agent vip-response-handler
pack 06-gov-contracts     vip-samgov-agent
pack 07-coo-orchestrator  vip-coo-orchestrator

# Guard: nothing old or banned slips into the kit.
if grep -rnE "\(909\) ?312-5400|Paperclip|Slack webhook|Stress-Free" "$KIT"/0*/skills; then
  echo "FAIL: stale phone or removed tool in a skill above"; exit 1
fi
echo "OK — kit built, guard clean"
