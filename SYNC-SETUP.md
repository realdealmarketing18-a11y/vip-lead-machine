# Sync Setup — Local Folder ⟷ GitHub ⟷ Obsidian

**Goal:** One folder on your computer that is simultaneously your Obsidian vault
**and** a clone of this GitHub repo, kept in sync automatically in both directions.

After this one-time setup, anything you edit locally (in Obsidian or any editor)
auto-pushes to GitHub, and anything Claude Code pushes from the cloud auto-pulls
down to your machine — no manual git commands ever again.

> **Why you do this part, not Claude:** Claude Code (web) runs in a temporary
> cloud container. It can read/write the GitHub repo, but it cannot reach the
> files on your personal computer. The steps below run **on your machine** once.

---

## The Architecture

```
   YOUR COMPUTER                         GITHUB (source of truth)        CLOUD
┌────────────────────┐   auto push    ┌───────────────────────┐   reads/writes
│  VIP Lead Machine  │ ─────────────▶ │ realdealmarketing18-  │ ◀──────────────
│  folder            │                │ a11y/vip-lead-machine │   Claude Code
│  = Obsidian vault  │ ◀───────────── │                       │ ─────────────▶
│  = git clone       │   auto pull    └───────────────────────┘   (this session)
└────────────────────┘
        ▲
        │ Obsidian Git plugin handles commit / push / pull on a timer
```

The local folder, the Obsidian vault, and the git clone are **the same folder**.

---

## STEP 1 — Make your local folder a clone of this repo (one time)

You have two situations. Pick the one that matches you.

### A. You DON'T have the repo cloned locally yet

Open a terminal (Mac: Terminal · Windows: Git Bash) and run:

```bash
cd ~/Documents          # or wherever you keep your vault
git clone https://github.com/realdealmarketing18-a11y/vip-lead-machine.git
```

This creates a folder `vip-lead-machine` that already contains everything.

### B. You already have a local "VIP Lead Generation Machine" folder with files

Your local folder and the repo need to become one. Easiest safe path:

1. Clone the repo into a **new** folder (command in A above).
2. Copy your newer local files **into** the cloned folder (overwriting older ones).
3. From inside the cloned folder, commit the additions:
   ```bash
   cd vip-lead-machine
   git add -A
   git commit -m "Bring in latest local files"
   git push
   ```
4. From now on, use the **cloned folder** as your working folder. Archive the old one.

> Don't try to `git init` your existing folder and point it at this repo — you'll
> fight history mismatches. Cloning fresh and copying files in is cleaner.

---

## STEP 2 — Open the folder as your Obsidian vault

1. Open Obsidian → **Open folder as vault** → select the cloned `vip-lead-machine` folder.
2. The `.obsidian/` config is already in the repo, so your settings travel automatically.

---

## STEP 3 — Install the Obsidian Git plugin (the auto-sync engine)

1. Obsidian → **Settings → Community plugins → Browse**
2. Search **"Git"** → install **Obsidian Git** by Vinzent → **Enable**
3. Open **Settings → Community plugins → Git** and set:

   | Setting | Value |
   |---|---|
   | Vault backup interval (minutes) | `5` |
   | Auto pull interval (minutes) | `5` |
   | Pull updates on startup | ✅ on |
   | Push on backup | ✅ on |
   | Commit message | `vault backup: {{date}}` |

That's it. Every 5 minutes the plugin commits your changes, pushes to GitHub,
and pulls down anything Claude pushed from the cloud.

> **Auth:** the first push will prompt for GitHub credentials. Use a
> [Personal Access Token](https://github.com/settings/tokens) (classic, scope `repo`)
> as the password. On Mac/Windows, git remembers it after the first time.

---

## STEP 4 — Verify the loop works

1. In Obsidian, edit `log.md`, wait ~5 min (or run **Git: Commit-and-sync** from the
   command palette) → confirm the change appears on GitHub.
2. Have Claude push a small change from the cloud → confirm it shows up in Obsidian
   within ~5 min.

When both directions work, the machine is linked. ✅

---

## Daily Workflow After Setup

- **You, locally:** just edit notes in Obsidian. Sync is invisible and automatic.
- **Claude Code (cloud):** works on the branch you assign, pushes results. They land
  in your vault automatically. (Note: Claude often works on a feature branch like
  `claude/...` — merge that into `master`/`main` on GitHub when you want those
  changes to flow to your vault, since the plugin pulls your default branch.)
- **New skills / agents:** drop the files into the right folder locally → they sync
  up to GitHub → Claude sees them next session.

---

## Conflict Notes (rare, but good to know)

- We stopped tracking `.obsidian/workspace.json` (your pane layout) because it
  changes constantly and would create noise/conflicts. Layout stays per-machine.
- If Obsidian Git ever reports a merge conflict, it means the same file was edited
  in two places at once. Open the file, keep the correct version, and run
  **Git: Commit-and-sync**. With a 5-min interval this almost never happens.

---

## Hermes Agent (placeholder — set up after install)

> You mentioned adding a **Hermes** agent once installed. This section is the
> landing spot for it. When Hermes is installed, tell Claude:
> - what Hermes is (model? local agent runtime? Jack Roberts community tool?),
> - how it's invoked (CLI command, API, MCP server),
> - what role it plays in the [[AGENT ROSTER]] (e.g. a 10th agent).
>
> Claude will then: add it to `CLAUDE.md`'s agent roster, create its skill under
> `.agent/skills/`, wire any workflow, and document it here.

**Status:** ⬜ Not yet installed — awaiting details.

---

*This setup is the foundation of the daily AI-agent training + memory phase.
Once sync is live, every refinement you make (and every Jack Roberts $77 Skool
workflow you add) is captured in the vault and version-controlled forever.*
