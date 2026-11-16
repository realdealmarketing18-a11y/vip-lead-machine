#!/usr/bin/env node
/*
 * VIP COO — health check. Answers one question: is everything running correctly?
 *
 *   node 04-Agents/coo/health-check.js            print the report
 *   node 04-Agents/coo/health-check.js --save     also save it to 04-Agents/outputs/coo/health-YYYY-MM-DD.md
 *   OC=/path/to/oc-site node 04-Agents/coo/health-check.js
 *
 * Read-only: it never sends, publishes, edits or deletes anything.
 * Exit code 1 when anything is RED, so a scheduler can alert on it.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const LM = path.resolve(__dirname, '..', '..');
const OC = path.resolve(process.env.OC || path.join(LM, '..', 'Vip-home-painting-orange-county'));
const LIVE = process.env.LIVE_SITE || 'https://viphomepainting.com';
const PHONE = '(949) 418-6461';
const TODAY = new Date().toISOString().slice(0, 10);

const results = []; // { area, level: 'red'|'yellow'|'green', msg, fix }
const add = (area, level, msg, fix) => results.push({ area, level, msg, fix });

const exists = (p) => fs.existsSync(p);
const read = (p) => fs.readFileSync(p, 'utf8');
const daysSince = (iso) => Math.floor((Date.now() - new Date(iso + 'T00:00:00Z')) / 864e5);

function walk(dir, skip = []) {
  const out = [];
  if (!exists(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || skip.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, skip));
    else if (/\.(md|js|json|html|py|txt)$/i.test(e.name)) out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(path.dirname(LM), p);

function run(cmd, args, cwd, timeout = 180000) {
  try {
    return { ok: true, out: execFileSync(cmd, args, { cwd, timeout, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || '') + (e.stderr || '') + (e.message || '') };
  }
}

/* ---------------- 1. Website build (OC repo) ---------------- */
function checkSiteBuild() {
  const A = 'Website build';
  if (!exists(path.join(OC, 'generator'))) {
    return add(A, 'red', `Can't find the website repo at ${OC}.`, 'Set OC=/path/to/oc-site and run again.');
  }
  const gate = run('node', ['generator/verify-site.js'], OC);
  const summary = (gate.out.match(/(✓ PASSED.*|✗.*FAIL.*|FAILED.*)/) || [])[0] || '';
  if (gate.ok) add(A, 'green', `Quality gate passes. ${summary.replace(/^✓\s*/, '')}`);
  else {
    const fails = gate.out.split('\n').filter((l) => /^\s*(FAIL|✗)/.test(l)).slice(0, 5).map((l) => l.trim());
    add(A, 'red', `Quality gate FAILS — nothing should be published until it's green. ${fails.join(' | ')}`,
      'Run `node generator/verify-site.js` in the website repo and fix each FAIL line.');
  }
}

/* ---------------- 2. Page pipeline / one-at-a-time rule ---------------- */
function checkPipeline() {
  const A = 'Page pipeline';
  const qp = path.join(OC, 'generator', 'queue.json');
  if (!exists(qp)) return add(A, 'red', 'generator/queue.json is missing.', 'Restore it from git.');
  const q = JSON.parse(read(qp));
  const inFlight = q.clusters.filter((c) => !['queued', 'published', 'blocked'].includes(c.stage));
  const unapproved = q.clusters.filter((c) => c.stage === 'published' && !c.approved);
  const blocked = q.clusters.filter((c) => c.stage === 'blocked');

  if (inFlight.length + unapproved.length > 1) {
    add(A, 'red', `One-at-a-time rule broken: ${[...inFlight, ...unapproved].map((c) => `${c.name} (${c.stage})`).join(', ')} are all open.`,
      'Finish and approve one (`node generator/pipeline.js approve <slug>`) before anything else moves.');
  } else if (inFlight.length === 1) {
    add(A, 'green', `Working on one cluster: ${inFlight[0].name} — ${inFlight[0].stage}.`);
  } else if (unapproved.length === 1) {
    add(A, 'yellow', `${unapproved[0].name} is published and waiting for Fabian's approval.`,
      `Review it, then \`node generator/pipeline.js approve ${unapproved[0].slug}\`.`);
  } else add(A, 'green', 'Nothing in progress — next city is ready to start.');

  if (blocked.length) add(A, 'yellow', `Blocked on Fabian: ${blocked.map((c) => c.name).join(', ')}.`, 'See memory/task_plan.md in the website repo.');

  // Drift: the queue says "not live" but memory says the city is live.
  const memDir = path.join(OC, 'memory');
  const mem = ['task_plan.md', 'progress.md'].map((f) => (exists(path.join(memDir, f)) ? read(path.join(memDir, f)) : '')).join('\n');
  const drift = q.clusters.filter((c) => c.stage !== 'published' && !c.hand_maintained &&
    new RegExp(`\\|\\s*${c.name}\\s*\\|\\s*\\*\\*published\\*\\*`, 'i').test(mem));
  if (drift.length) {
    add(A, 'yellow', `The queue is out of date: ${drift.map((c) => `${c.name} says "${c.stage}" but memory says published`).join('; ')}. An agent could redo finished work.`,
      'Update generator/queue.json to match what is really live.');
  }
}

/* ---------------- 3. Live website ---------------- */
function scanLiveHtml(html, url) {
  const issues = [];
  const phones = [...new Set((html.match(/\(\d{3}\)\s?\d{3}-\d{4}/g) || []))].filter((p) => p.replace(/\s/, ' ') !== PHONE);
  if (phones.length) issues.push(`wrong phone number ${phones.join(', ')}`);
  if (!html.includes('418-6461')) issues.push(`the phone ${PHONE} is missing`);
  if (/aggregateRating|5-Star Rated/i.test(html)) issues.push('a star rating / review count (not allowed)');
  if (/\bfree (quote|estimate|consultation)/i.test(html)) issues.push('the word "free" (must be "complimentary")');
  if (/1-year warranty|one-year warranty/i.test(html)) issues.push('a 1-year warranty (it is 2 years)');
  return issues.map((i) => `${url}: ${i}`);
}
async function checkLiveSite() {
  const A = 'Live website';
  const pages = ['/', '/irvine/', '/anaheim/'];
  const problems = [];
  let reached = 0;
  for (const p of pages) {
    const url = LIVE + p;
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
      reached++;
      if (res.status !== 200) { problems.push(`${url} returned ${res.status}`); continue; }
      const html = await res.text();
      problems.push(...scanLiveHtml(html, url));
      if (p === '/' && /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) {
        problems.push(`${url}: the FRONT PAGE is set to noindex — Google will drop the homepage`);
      }
    } catch (e) {
      problems.push(`${url}: couldn't reach it (${e.cause ? e.cause.code || e.cause.message : e.message})`);
    }
  }
  if (!reached) add(A, 'yellow', `Couldn't reach ${LIVE} from here, so the live pages were not checked.`, 'Run this on your laptop, or check the network.');
  else if (problems.length) add(A, 'red', problems.join(' · '), 'Fix the page in the website repo, rebuild, and republish.');
  else add(A, 'green', `${pages.length} key pages load, show ${PHONE}, and have no banned claims.`);
}

/* ---------------- 4. Skills and instructions (lead-machine) ---------------- */
function checkSkills() {
  const A = 'Skills & instructions';
  const roots = ['.agent', '.agents', '.claude/skills', '04-Agents', 'grok-bot-kit', 'CLAUDE.md', 'AGENTS.md', 'GEMINI.md'].map((r) => path.join(LM, r));
  const files = roots.flatMap((r) => (exists(r) && fs.statSync(r).isFile() ? [r] : walk(r, ['outputs'])));
  const stale = [];
  const removed = [];
  for (const f of files) {
    if (f === __filename) continue; // this file names the old number on purpose
    const t = read(f);
    if (/\(909\)\s?312-5400/.test(t)) stale.push(rel(f));
    // "REMOVED FOREVER" / "no Twilio" lines are allowed; using the tool is not.
    const lines = t.split('\n').filter((l) => /Paperclip|Make\.com|Slack webhook|via Twilio/i.test(l) && !/REMOVED|no Twilio|No Twilio|never/i.test(l));
    if (lines.length) removed.push(rel(f));
  }
  if (stale.length) add(A, 'red', `Old phone (909) 312-5400 in: ${stale.join(', ')}.`, `Replace with ${PHONE}.`);
  if (removed.length) add(A, 'red', `Instructions still tell agents to use a removed tool (Paperclip/Make.com/Slack/Twilio): ${removed.join(', ')}.`, 'Rewrite those steps.');
  if (!stale.length && !removed.length) add(A, 'green', `${files.length} skill and instruction files: right phone, no removed tools.`);

  const hf = path.join(LM, '.claude', 'skills', 'higgsfield');
  if (exists(hf) && fs.readdirSync(hf).length === 0) {
    add(A, 'yellow', 'The Higgsfield sub-skills folder is empty, so the Seedance preflight check (seedance_lint.py) is missing.', 'Find the original Higgsfield skills and add them to .agents/skills/.');
  }
}

/* ---------------- 5. Grok Bot kit in sync with the real skills ---------------- */
function checkKit() {
  const A = 'Grok Bot kit';
  const kit = path.join(LM, 'grok-bot-kit');
  if (!exists(kit)) return add(A, 'yellow', 'No grok-bot-kit folder.', '');
  const srcFor = (s) => {
    if (['marcus-local-seo', 'vip-research-agent', 'vip-copywriter', 'vip-copywriter-agent', 'vip-page-builder', 'vip-sales-funnel', 'vip-blog-writer'].includes(s)) return path.join(OC, 'generator', 'skills', s);
    if (s === 'vip-design-system') return path.join(OC, 'design-system');
    if (s === 'video-production') return path.join(LM, '.claude', 'skills', 'video-production');
    if (exists(path.join(LM, '.agents', 'skills', s))) return path.join(LM, '.agents', 'skills', s);
    return path.join(LM, '.agent', 'skills', s);
  };
  const out = [];
  for (const wf of fs.readdirSync(kit).filter((d) => /^0[1-9]-/.test(d) && fs.statSync(path.join(kit, d)).isDirectory())) {
    const sk = path.join(kit, wf, 'skills');
    if (!exists(sk)) { out.push(`${wf} has no skills`); continue; }
    for (const s of fs.readdirSync(sk)) {
      const a = path.join(sk, s, 'SKILL.md');
      const b = path.join(srcFor(s), 'SKILL.md');
      if (!exists(b)) out.push(`${wf}/${s}: source skill missing`);
      else if (!exists(a) || read(a) !== read(b)) out.push(`${wf}/${s}`);
    }
  }
  if (out.length) add(A, 'yellow', `Kit is out of date with the real skills: ${out.join(', ')}.`, 'Run `bash grok-bot-kit/build.sh`, then re-upload the changed zips to Grok.');
  else add(A, 'green', 'Every skill in the kit matches its real source.');
}

/* ---------------- 6. Memory freshness and open work ---------------- */
function checkMemory() {
  const A = 'Memory & to-do';
  const strat = path.join(LM, 'memory', 'current-strategy.md');
  if (exists(strat)) {
    const m = read(strat).match(/Last updated:\*?\*?\s*(\d{4}-\d{2}-\d{2})/);
    if (m && daysSince(m[1]) > 14) add(A, 'yellow', `current-strategy.md was last updated ${m[1]} (${daysSince(m[1])} days ago). It's meant to be weekly — stale strategy steers agents wrong.`, 'Fabian: 5-minute update of where things stand.');
  }
  const dispatch = path.join(LM, '04-Agents', 'queue', 'DISPATCH.md');
  if (exists(dispatch)) {
    const m = read(dispatch).match(/Last updated:\*?\*?\s*(\d{4}-\d{2}-\d{2})/);
    if (m && daysSince(m[1]) > 30) add(A, 'yellow', `The lead-machine city queue (DISPATCH.md) hasn't moved since ${m[1]}, but pages are being built in the website repo. The two disagree.`, 'Decide which queue is real, and retire the other.');
  }
  const na = path.join(LM, 'memory', 'next-actions.md');
  if (exists(na)) {
    const open = read(na).split('\n').filter((l) => /^- \[ \]/.test(l)).map((l) => l.replace(/^- \[ \]\s*/, ''));
    if (open.length) add(A, open.length > 8 ? 'yellow' : 'green', `${open.length} open item(s) in next-actions.md. Top: ${open.slice(0, 3).join(' · ')}`);
  }
}

/* ---------------- 7. Leads waiting on Fabian ---------------- */
function checkLeads() {
  const A = 'Leads';
  const hot = path.join(LM, 'leads', 'hot');
  if (!exists(hot)) return add(A, 'yellow', 'No /leads/hot/ folder yet — the lead machine has not produced a hot lead here.', 'Check the 5:30 AM Apify scrape is running.');
  const files = fs.readdirSync(hot).filter((f) => f.endsWith('.md'));
  const stale = files.filter((f) => (Date.now() - fs.statSync(path.join(hot, f)).mtimeMs) / 864e5 > 2);
  if (stale.length) add(A, 'red', `${stale.length} hot lead(s) waiting over 2 days for approval: ${stale.slice(0, 5).join(', ')}. Hot leads go cold.`, 'Approve or drop them today.');
  else add(A, 'green', `${files.length} hot lead(s) waiting, none older than 2 days.`);
}

/* ---------------- 8. Secrets ---------------- */
function checkSecrets() {
  const A = 'Secrets';
  const bad = [];
  for (const [name, dir] of [['lead-machine', LM], ['website', OC]]) {
    const r = run('git', ['ls-files'], dir, 30000);
    if (!r.ok) continue;
    const hits = r.out.split('\n').filter((f) => /(^|\/)\.env(\.|$)|credentials|\.pem$|id_rsa/i.test(f) && !/\.example$/.test(f));
    hits.forEach((h) => bad.push(`${name}: ${h}`));
  }
  if (bad.length) add(A, 'red', `A secrets file is saved in git: ${bad.join(', ')}. The website repo is PUBLIC.`, 'Remove it, rotate the key, and add it to .gitignore.');
  else add(A, 'green', 'No .env or key files saved in either repo.');
}

/* ---------------- report ---------------- */
if (require.main === module) (async () => {
  for (const fn of [checkSiteBuild, checkPipeline, checkSkills, checkKit, checkMemory, checkLeads, checkSecrets]) {
    try { fn(); } catch (e) { add(fn.name, 'yellow', `Check crashed: ${e.message}`, 'Tell Claude/Grok to fix the health check.'); }
  }
  await checkLiveSite();

  const icon = { red: '🔴', yellow: '🟡', green: '🟢' };
  const order = { red: 0, yellow: 1, green: 2 };
  results.sort((a, b) => order[a.level] - order[b.level]);
  const count = (l) => results.filter((r) => r.level === l).length;
  const overall = count('red') ? '🔴 NEEDS ATTENTION' : count('yellow') ? '🟡 RUNNING — a few things to look at' : '🟢 ALL GOOD';

  const lines = [
    `# VIP Health Check — ${TODAY}`,
    '',
    `**${overall}** · ${count('red')} red · ${count('yellow')} yellow · ${count('green')} green`,
    '',
  ];
  for (const r of results) {
    lines.push(`- ${icon[r.level]} **${r.area}** — ${r.msg}`);
    if (r.fix && r.level !== 'green') lines.push(`  - Fix: ${r.fix}`);
  }
  const report = lines.join('\n') + '\n';
  process.stdout.write(report);

  if (process.argv.includes('--save')) {
    const dir = path.join(LM, '04-Agents', 'outputs', 'coo');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `health-${TODAY}.md`), report);
  }
  process.exitCode = count('red') ? 1 : 0;
})();

module.exports = { scanLiveHtml };
