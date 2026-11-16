# Job 04 — Video: commercials, client episodes, shotlists

**Paste `00-SHARED-RULES.md` above this.**

## What this job does
Turns a real client's home into a story: **before → visualization → after reveal**, narrated
by Fabian.

## Repo
`realdealmarketing18-a11y/vip-lead-machine`. Episodes go in `03-Episodes/[client-code]/`.

## Steps
1. **Episode package** → skill `vip-episode-creator`. It creates `script.md`,
   `render-queue.md`, `storyboard.md` and `sales-page.md` in the episode folder.
2. **Commercial** → skill `video-production`. It sends each part to brand-story,
   before-after, soul-character or marketing-studio-tvspot.
3. **Shotlist** → skill `vip-seedance-shotlist-director`. Output is one editable HTML file,
   one 15-second prompt per scene.
4. **Seedance prompts** → skill `higgsfield-seedance-prompt`. Check every prompt against the
   content filter before you render it.
5. **Renders and assembly** → skill `vip-video-creation-agent`.
   **Paid renders need Fabian's OK.** Give him a cost estimate first.

## Don't
- Say "AI" anywhere in the video, captions or titles. Say "VIP's Custom Visualization Service".
- Use a real client's name or face without their release on file.
- Show a colour as a flat chip. Show it on the house, or as three cans.
