#!/usr/bin/env python3
"""Render a page in headless Chromium and extract per-element COMPUTED styles.

Use this instead of reading raw CSS when converting from a URL (or an HTML file
with non-trivial stylesheets). It resolves the full CSS cascade and outputs a
compact JSON tree plus full-page screenshots (desktop + tablet + mobile) you should Read
before mapping elements to Elementor widgets.

Usage:
  python3 extract_styles.py <url-or-html-file> [outdir]

Outputs (in outdir, default ./style-extract):
  styles.json        element tree with computed styles (desktop + tablet/mobile diffs)
  desktop.png        full-page screenshot @ 1440px
  tablet.png         full-page screenshot @ 810px
  mobile.png         full-page screenshot @ 390px

Requires: pip install playwright  (Chromium itself is usually preinstalled in
the Cowork cloud environment; elsewhere run `playwright install chromium`).
"""
import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

EXTRACT_JS = r"""
() => {
  const INHERITED = ['font-family','font-size','font-weight','line-height',
    'letter-spacing','text-transform','color','text-align','font-style','text-decoration-line'];
  const BOX_DEFAULTS = {
    'background-color': ['rgba(0, 0, 0, 0)'],
    'background-image': ['none'],
    'border-radius': ['0px'],
    'box-shadow': ['none'],
    'padding': ['0px'],
    'margin': ['0px'],
    'justify-content': ['normal','flex-start'],
    'align-items': ['normal','stretch'],
    'gap': ['normal','normal normal','0px','0px 0px'],
    'flex-direction': ['row'],
    'max-width': ['none'],
    'min-height': ['auto','0px'],
    'position': ['static'],
    'opacity': ['1'],
    'flex-wrap': ['nowrap'],
  };
  const SKIP = new Set(['SCRIPT','STYLE','META','LINK','NOSCRIPT','TEMPLATE','HEAD','TITLE','BR','PATH','G','DEFS','USE','CIRCLE','RECT','LINE','POLYGON','POLYLINE','ELLIPSE']);
  const MAX = 1500;
  const out = [];
  window.__extractedEls = [];
  let truncated = false;

  function ownText(el) {
    let t = '';
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent;
    t = t.replace(/\s+/g, ' ').trim();
    return t.length > 90 ? t.slice(0, 90) + '…' : t;
  }

  function walk(el, parentIdx, parentStyle) {
    if (out.length >= MAX) { truncated = true; return; }
    if (SKIP.has(el.tagName)) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    // icon elements can measure 0x0 when their icon font hasn't loaded — keep them anyway
    const iconish = /(^|\s)(fa[srblt]?|fa-[\w-]+|[\w-]*icon[\w-]*)(\s|$)/i.test(el.getAttribute('class') || '');
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && (r.width > 0 || r.height > 0 || iconish);
    if (!visible) return;

    const idx = out.length;
    const node = {
      i: idx, p: parentIdx, tag: el.tagName.toLowerCase(),
      rect: [Math.round(r.x + scrollX), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)],
      s: {}
    };
    const cls = (el.getAttribute('class') || '').trim();
    if (cls) node.cls = cls.split(/\s+/).slice(0, 4).join(' ');
    const txt = ownText(el);
    if (txt) node.text = txt;
    if (el.tagName === 'IMG') {
      let src = el.currentSrc || el.src || '';
      // lazy-load placeholders (tiny data: URIs / 1px gifs) — prefer the real source attr
      if (!src || src.startsWith('data:'))
        src = el.dataset.src || el.dataset.lazySrc || el.dataset.original || el.getAttribute('data-srcset')?.split(/[\s,]/)[0] || src;
      node.src = src; if (el.alt) node.alt = el.alt;
    }
    if (el.tagName === 'A') node.href = el.getAttribute('href');
    if (el.tagName === 'IFRAME') node.src = el.src;
    if (el.tagName === 'SVG') node.svg = el.outerHTML.length > 400 ? '(large inline svg)' : el.outerHTML;
    if (el.tagName === 'I' && cls) node.icon = cls;

    for (const p of INHERITED) {
      const v = cs.getPropertyValue(p);
      if (!parentStyle || parentStyle[p] !== v) node.s[p] = v;
    }
    for (const [p, defs] of Object.entries(BOX_DEFAULTS)) {
      const v = cs.getPropertyValue(p);
      if (v && !defs.includes(v)) node.s[p] = v;
    }
    const d = cs.display;
    if (d.includes('flex') || d.includes('grid')) {
      node.s['display'] = d;
      if (d.includes('grid')) node.s['grid-template-columns'] = cs.gridTemplateColumns;
    }
    if (cs.borderTopWidth !== '0px') node.s['border'] = cs.borderTop;
    // decorative ::before/::after (shape edges, overlays, blobs) — otherwise lost silently
    for (const pe of ['::before', '::after']) {
      const ps = getComputedStyle(el, pe);
      const content = ps.getPropertyValue('content');
      if (!content || content === 'none' || content === 'normal') continue;
      const keep = {};
      for (const p of ['background-image','background-color','width','height','position','opacity','border-radius','transform']) {
        const v = ps.getPropertyValue(p);
        if (v && v !== 'none' && v !== 'rgba(0, 0, 0, 0)' && v !== 'auto' && v !== '1' && v !== '0px') keep[p] = v;
      }
      if (content !== '""') keep.content = content;
      if (Object.keys(keep).length) (node.pe = node.pe || {})[pe] = keep;
    }
    // background shorthand noise: keep gradients, drop bare url() repeats
    const thisStyle = {};
    for (const p of INHERITED) thisStyle[p] = cs.getPropertyValue(p);

    out.push(node);
    window.__extractedEls[idx] = el;
    if (el.tagName !== 'SVG')
      for (const child of el.children) walk(child, idx, thisStyle);
  }

  walk(document.body, null, null);
  return { elements: out, truncated };
}
"""

VIEWPORT_DIFF_JS = r"""
() => {
  const PROPS = ['font-size','padding','margin','flex-direction','display',
                 'text-align','gap','line-height'];
  const diffs = {};
  (window.__extractedEls || []).forEach((el, idx) => {
    if (!el || !el.isConnected) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const d = {};
    for (const p of PROPS) d[p] = cs.getPropertyValue(p);
    d.hidden = cs.display === 'none' || (r.width === 0 && r.height === 0);
    diffs[idx] = d;
  });
  return diffs;
}
"""


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    target = sys.argv[1]
    outdir = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "style-extract")
    outdir.mkdir(parents=True, exist_ok=True)

    if "://" not in target:
        target = pathlib.Path(target).resolve().as_uri()

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(target, wait_until="load", timeout=45000)
        try:
            page.wait_for_load_state("networkidle", timeout=8000)
        except Exception:
            pass  # busy pages never go idle; proceed
        # trigger lazy-loaded content
        page.evaluate("async () => { for (let y=0; y<document.body.scrollHeight; y+=800) { scrollTo(0,y); await new Promise(r=>setTimeout(r,100)); } scrollTo(0,0); }")
        page.wait_for_timeout(500)

        data = page.evaluate(EXTRACT_JS)
        page.screenshot(path=str(outdir / "desktop.png"), full_page=True)

        # tablet pass on the same DOM (810px sits inside Elementor's default 768-1024 tablet range)
        page.set_viewport_size({"width": 810, "height": 1080})
        page.wait_for_timeout(700)
        tablet = page.evaluate(VIEWPORT_DIFF_JS)
        page.screenshot(path=str(outdir / "tablet.png"), full_page=True)

        # mobile pass on the same DOM
        page.set_viewport_size({"width": 390, "height": 844})
        page.wait_for_timeout(700)
        mobile = page.evaluate(VIEWPORT_DIFF_JS)
        page.screenshot(path=str(outdir / "mobile.png"), full_page=True)
        browser.close()

    # attach tablet/mobile overrides only where they differ from desktop
    desk_by_idx = {el["i"]: el for el in data["elements"]}
    for key, diffset in (("t", tablet), ("m", mobile)):
        for idx_str, vstyles in diffset.items():
            el = desk_by_idx.get(int(idx_str))
            if not el:
                continue
            hidden = vstyles.pop("hidden", False)
            # record props present on the desktop node whose value differs at this viewport
            changed = {p: v for p, v in vstyles.items() if p in el["s"] and el["s"][p] != v}
            if hidden:
                changed["hidden"] = True
            if changed:
                el[key] = changed

    result = {
        "source": target,
        "viewports": {"desktop": 1440, "tablet": 810, "mobile": 390},
        "truncated": data["truncated"],
        "legend": "i=index p=parent-index s=desktop computed styles (diffed vs parent/defaults) "
                  "t=tablet overrides m=mobile overrides rect=[x,y,w,h] pe=decorative ::before/::after styles",
        "elements": data["elements"],
    }
    out = outdir / "styles.json"
    out.write_text(json.dumps(result, indent=1))
    print(f"{len(data['elements'])} elements -> {out}")
    if data["truncated"]:
        print("WARNING: element cap (1500) hit — tree truncated. Extract section by section.")
    print(f"Screenshots: {outdir/'desktop.png'}, {outdir/'tablet.png'}, {outdir/'mobile.png'}")


main()
