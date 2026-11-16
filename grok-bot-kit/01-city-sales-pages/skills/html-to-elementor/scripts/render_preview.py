#!/usr/bin/env python3
"""Render an APPROXIMATE visual preview of an Elementor template JSON.

Converts the template back into plain HTML/CSS (not a real Elementor renderer),
screenshots it at desktop (1440), tablet (810) and mobile (390) widths, and writes
preview-desktop.png / preview-tablet.png / preview-mobile.png. Compare these
side-by-side with the extractor's screenshots to catch structural mistakes BEFORE import:
wrong column widths, missing backgrounds, spacing way off, mobile not stacking.

Ignore in the comparison: icon placeholders (rendered as dots), font
substitution, video/map/form grey boxes. Those are expected approximations.

Usage: python3 render_preview.py template.json [outdir]
Requires: playwright (same as extract_styles.py).
"""
import html as H
import json
import pathlib
import sys

BUCKETS = {"": None, "_tablet": "@media (max-width: 1024px)", "_mobile": "@media (max-width: 767px)"}
css_rules = {b: [] for b in BUCKETS}


def sl(v, default_unit="px"):
    """Slider object -> css value."""
    if isinstance(v, dict) and v.get("size") not in (None, ""):
        return f'{v["size"]}{v.get("unit", default_unit)}'
    return None


def dim(v):
    """Dimension object -> 'top right bottom left'."""
    if not isinstance(v, dict):
        return None
    u = v.get("unit", "px")
    sides = [v.get(s, "0") or "0" for s in ("top", "right", "bottom", "left")]
    if all(s in ("0", 0) for s in sides):
        return None
    return " ".join(f"{s}{u}" for s in sides)


def typo(s, suf, prefix=""):
    """Typography group (with activation key) -> css dict."""
    if s.get(f"{prefix}typography_typography") != "custom":
        return {}
    g, c = lambda k: s.get(f"{prefix}typography_{k}{suf}"), {}
    if g("font_family"): c["font-family"] = f"'{g('font_family')}', sans-serif"
    if sl(g("font_size")): c["font-size"] = sl(g("font_size"))
    if g("font_weight"): c["font-weight"] = g("font_weight")
    if sl(g("line_height"), "em"): c["line-height"] = sl(g("line_height"), "em")
    if sl(g("letter_spacing")): c["letter-spacing"] = sl(g("letter_spacing"))
    for k, p in (("text_transform", "text-transform"), ("font_style", "font-style"), ("text_decoration", "text-decoration")):
        if g(k): c[p] = g(k)
    return c


def background(s, suf, css, pre="background"):
    b = s.get(f"{pre}_background")
    # responsive buckets: emit only if some suffixed background key actually exists
    if suf and not any(f"{pre}_{k}{suf}" in s for k in ("color", "color_b", "image", "gradient_angle", "size", "position")):
        return
    gv = lambda k, d=None: s.get(f"{pre}_{k}{suf}", s.get(f"{pre}_{k}", d))  # suffixed, then base, then default
    if b == "classic":
        if gv("color"): css["background-color"] = gv("color")
        img = gv("image")
        if isinstance(img, dict) and img.get("url"):
            css["background-image"] = f'url("{img["url"]}")'
            css["background-size"] = gv("size", "cover")
            css["background-position"] = gv("position", "center center")
    elif b == "gradient":
        ang = sl(gv("gradient_angle"), "deg") or "180deg"
        css["background-image"] = f'linear-gradient({ang}, {gv("color", "#fff")}, {gv("color_b", "#fff")})'


def common_css(s, suf, is_container):
    """Shared container/widget box styles for one responsive bucket."""
    css = {}
    pad = dim(s.get(("padding" if is_container else "_padding") + suf))
    mar = dim(s.get(("margin" if is_container else "_margin") + suf))
    if pad: css["padding"] = pad
    if mar: css["margin"] = mar
    if dim(s.get(f"border_radius{suf}")): css["border-radius"] = dim(s[f"border_radius{suf}"])
    if s.get("border_border") and dim(s.get(f"border_width{suf}")):
        css["border"] = f'{s[f"border_width{suf}"].get("top","1")}px {s["border_border"]} {s.get("border_color", "#000")}'
    if s.get("box_shadow_box_shadow_type") == "yes" and isinstance(s.get("box_shadow_box_shadow"), dict):
        v = s["box_shadow_box_shadow"]
        css["box-shadow"] = f'{v.get("horizontal",0)}px {v.get("vertical",0)}px {v.get("blur",0)}px {v.get("spread",0)}px {v.get("color","rgba(0,0,0,.2)")}'
    if sl(s.get(f"min_height{suf}")): css["min-height"] = sl(s[f"min_height{suf}"])
    if sl(s.get(f"width{suf}"), "%") and is_container: css["width"] = sl(s[f"width{suf}"], "%")
    background(s, suf, css)
    return css


def flex_css(s, suf):
    css = {}
    if not suf:  # base bucket carries the defaults
        css = {"display": "flex", "flex-direction": s.get("flex_direction", "column")}
        if s.get("container_type") == "grid":
            css["display"] = "grid"
            cols = sl(s.get("grid_columns_grid")) or "3"
            css["grid-template-columns"] = f"repeat({str(cols).rstrip('frpx')}, 1fr)"
    elif f"flex_direction{suf}" in s:  # responsive: only explicitly suffixed keys
        css["flex-direction"] = s[f"flex_direction{suf}"]
    if s.get(f"flex_justify_content{suf}"): css["justify-content"] = s[f"flex_justify_content{suf}"]
    if s.get(f"flex_align_items{suf}"): css["align-items"] = s[f"flex_align_items{suf}"]
    if s.get(f"flex_wrap{suf}"): css["flex-wrap"] = s[f"flex_wrap{suf}"]
    g = s.get(f"flex_gap{suf}")
    if isinstance(g, dict) and (g.get("row") or g.get("column")):
        css["gap"] = f'{g.get("row","0")}{g.get("unit","px")} {g.get("column","0")}{g.get("unit","px")}'
    return css


def rule(cls, bucket, css):
    if css:
        css_rules[bucket].append(f".{cls}{{{';'.join(f'{k}:{v}' for k, v in css.items())}}}")


def esc(t):
    return H.escape(str(t or ""))


def icon_dot(color="#94a3b8", size="40px"):
    return f'<span style="display:inline-block;width:{size};height:{size};border-radius:50%;background:{color};flex:none"></span>'


def grey_box(label, h="220px"):
    return (f'<div style="background:#e2e8f0;color:#64748b;display:flex;align-items:center;'
            f'justify-content:center;height:{h};border-radius:8px;font:600 14px sans-serif">{esc(label)}</div>')


def render_widget(el, cls):
    s, wt = el.get("settings", {}), el.get("widgetType", "?")
    for suf, _ in BUCKETS.items():
        css = common_css(s, suf, False)
        if s.get(f"align{suf}"): css["text-align"] = s[f"align{suf}"]
        css.update(typo(s, suf))
        rule(cls, suf, css)

    if wt == "heading":
        tag = s.get("header_size", "h2")
        tag = tag if tag in ("h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span") else "h2"
        rule(cls, "", {"color": s["title_color"]} if s.get("title_color") else {})
        return f'<{tag} class="{cls}" style="margin:0">{esc(s.get("title", ""))}</{tag}>'
    if wt == "text-editor":
        rule(cls, "", {"color": s["text_color"]} if s.get("text_color") else {})
        return f'<div class="{cls}">{s.get("editor", "")}</div>'
    if wt == "button":
        b = {"display": "inline-block", "text-decoration": "none",
             "background": s.get("background_color", "#4F46E5"), "color": s.get("button_text_color", "#fff"),
             "padding": dim(s.get("text_padding")) or "12px 24px",
             "border-radius": dim(s.get("border_radius")) or "4px"}
        b.update(typo(s, ""))
        rule(cls + "-a", "", b)
        return f'<div class="{cls}"><a class="{cls}-a" href="#">{esc(s.get("text", "Button"))}</a></div>'
    if wt == "image":
        img = s.get("image", {})
        w = sl(s.get("width"), "%") or "auto"
        return (f'<div class="{cls}"><img src="{esc(img.get("url", ""))}" '
                f'style="max-width:100%;width:{w};border-radius:{dim(s.get("image_border_radius")) or "0"}"></div>')
    if wt in ("icon-box", "image-box"):
        pos = s.get("position", "top")
        drc = "column" if pos == "top" else ("row" if pos == "left" else "row-reverse")
        head = (f'<img src="{esc(s.get("image", {}).get("url", ""))}" style="max-width:120px">' if wt == "image-box"
                else icon_dot(s.get("primary_color", "#4F46E5"), sl(s.get("icon_size")) or "40px"))
        t = {"color": s.get("title_color", "#111")}; t.update(typo(s, "", "title_"))
        d = {"color": s.get("description_color", "#555")}; d.update(typo(s, "", "description_"))
        rule(cls + "-t", "", t); rule(cls + "-d", "", d)
        tag = s.get("title_size", "h3")
        return (f'<div class="{cls}" style="display:flex;flex-direction:{drc};gap:14px;'
                f'align-items:{"center" if pos == "top" else "flex-start"}">{head}<div>'
                f'<{tag} class="{cls}-t" style="margin:0 0 6px">{esc(s.get("title_text", ""))}</{tag}>'
                f'<div class="{cls}-d">{esc(s.get("description_text", ""))}</div></div></div>')
    if wt == "icon-list":
        gap = sl(s.get("space_between")) or "10px"
        items = "".join(
            f'<li style="display:flex;gap:10px;align-items:center;margin-bottom:{gap}">'
            f'<span style="color:{s.get("icon_color", "#22C55E")}">{"✓" if "check" in str(i.get("selected_icon", {}).get("value", "")) else "●"}</span>'
            f'<span style="color:{s.get("text_color", "#333")}">{esc(i.get("text", ""))}</span></li>'
            for i in s.get("icon_list", []))
        return f'<ul class="{cls}" style="list-style:none;margin:0;padding:0">{items}</ul>'
    if wt == "icon":
        return f'<div class="{cls}">{icon_dot(s.get("primary_color", "#4F46E5"), sl(s.get("size")) or "48px")}</div>'
    if wt == "testimonial":
        img = s.get("testimonial_image", {}).get("url", "")
        av = f'<img src="{esc(img)}" style="width:56px;height:56px;border-radius:50%;object-fit:cover">' if img else icon_dot("#cbd5e1", "56px")
        return (f'<div class="{cls}" style="text-align:{s.get("testimonial_alignment", "center")}">'
                f'<p style="font-style:italic">{esc(s.get("testimonial_content", ""))}</p>{av}'
                f'<div style="font-weight:700">{esc(s.get("testimonial_name", ""))}</div>'
                f'<div style="font-size:13px;color:#64748b">{esc(s.get("testimonial_job", ""))}</div></div>')
    if wt == "counter":
        return (f'<div class="{cls}" style="text-align:center"><div style="font-size:40px;font-weight:700;'
                f'color:{s.get("number_color", "#111")}">{esc(s.get("prefix", ""))}{esc(s.get("ending_number", "0"))}'
                f'{esc(s.get("suffix", ""))}</div><div>{esc(s.get("title", ""))}</div></div>')
    if wt == "progress":
        pct = (s.get("percent") or {}).get("size", 50)
        return (f'<div class="{cls}"><div style="margin-bottom:6px">{esc(s.get("title", ""))}</div>'
                f'<div style="background:{s.get("bar_bg_color", "#e2e8f0")};border-radius:6px;height:22px">'
                f'<div style="background:{s.get("bar_color", "#4F46E5")};width:{pct}%;height:100%;border-radius:6px"></div></div></div>')
    if wt == "divider":
        return (f'<div class="{cls}"><hr style="border:0;border-top:{sl(s.get("weight")) or "1px"} solid '
                f'{s.get("color", "#e2e8f0")};margin:0"></div>')
    if wt == "spacer":
        return f'<div class="{cls}" style="height:{sl(s.get("space")) or "20px"}"></div>'
    if wt == "video":
        return f'<div class="{cls}">{grey_box("▶ VIDEO", "300px")}</div>'
    if wt == "google_maps":
        return f'<div class="{cls}">{grey_box("MAP: " + s.get("address", ""), sl(s.get("height")) or "300px")}</div>'
    if wt == "social-icons":
        dots = "".join(icon_dot(s.get("icon_primary_color", "#334155"), "36px") for _ in s.get("social_icon_list", []) or range(3))
        return f'<div class="{cls}" style="display:flex;gap:10px">{dots}</div>'
    if wt in ("tabs", "accordion", "toggle", "nested-tabs", "nested-accordion"):
        items = "".join(
            f'<div style="border:1px solid #e2e8f0;border-radius:6px;margin-bottom:8px">'
            f'<div style="padding:12px 16px;font-weight:600;background:#f8fafc">{esc(i.get("tab_title", ""))}</div>'
            f'<div style="padding:12px 16px">{i.get("tab_content", "")}</div></div>'
            for i in s.get("tabs", []))
        return f'<div class="{cls}">{items or grey_box(wt, "120px")}</div>'
    if wt == "alert":
        colors = {"info": "#dbeafe", "success": "#dcfce7", "warning": "#fef9c3", "danger": "#fee2e2"}
        return (f'<div class="{cls}" style="background:{colors.get(s.get("alert_type", "info"), "#dbeafe")};'
                f'padding:16px;border-radius:6px"><strong>{esc(s.get("alert_title", ""))}</strong> '
                f'{esc(s.get("alert_description", ""))}</div>')
    if wt == "image-carousel":
        imgs = "".join(f'<img src="{esc(i.get("url", ""))}" style="width:32%;object-fit:cover">'
                       for i in (s.get("carousel", []) or [])[:3])
        return f'<div class="{cls}" style="display:flex;gap:2%">{imgs or grey_box("CAROUSEL")}</div>'
    if wt == "html":
        return f'<div class="{cls}">{s.get("html", "")}</div>'
    return f'<div class="{cls}">{grey_box(wt.upper(), "100px")}</div>'


def render(el, depth=0):
    cls = f'e{el.get("id", f"x{depth}")}'
    if el.get("elType") != "container":
        return render_widget(el, cls)
    s = el.get("settings", {})
    boxed = s.get("content_width", "boxed" if depth == 0 else "full") == "boxed"
    inner_cls = cls + "-in"
    for suf, _ in BUCKETS.items():
        outer = common_css(s, suf, True)
        fx = flex_css(s, suf) if any(k.startswith("flex") or k == "container_type" for k in s) or True else {}
        if boxed:
            rule(cls, suf, outer)
            if suf == "":
                fx.update({"max-width": sl(s.get("boxed_width")) or "1140px", "margin": "0 auto", "width": "100%"})
            rule(inner_cls, suf, fx)
        else:
            outer.update(fx)
            rule(cls, suf, outer)
    kids = "".join(render(c, depth + 1) for c in el.get("elements", []))
    return (f'<div class="{cls}"><div class="{inner_cls}">{kids}</div></div>' if boxed
            else f'<div class="{cls}">{kids}</div>')


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    outdir = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "preview-out")
    outdir.mkdir(parents=True, exist_ok=True)
    data = json.loads(pathlib.Path(sys.argv[1]).read_text())
    content = data if isinstance(data, list) else data.get("content", [])
    body = "".join(render(el) for el in content)

    sheets = [" ".join(css_rules[""])]
    for suf, media in BUCKETS.items():
        if media and css_rules[suf]:
            sheets.append(f'{media}{{{" ".join(css_rules[suf])}}}')
    page = (f'<!doctype html><meta charset="utf-8"><style>*{{box-sizing:border-box}}'
            f'body{{margin:0;font-family:Arial,Helvetica,sans-serif;color:#1e293b;line-height:1.6}}'
            f'img{{max-width:100%;display:block}} {" ".join(sheets)}</style><body>{body}</body>')
    html_file = outdir / "preview.html"
    html_file.write_text(page)

    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        pg = browser.new_page(viewport={"width": 1440, "height": 900})
        pg.goto(html_file.resolve().as_uri())
        pg.wait_for_timeout(700)
        pg.screenshot(path=str(outdir / "preview-desktop.png"), full_page=True)
        pg.set_viewport_size({"width": 810, "height": 1080})
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(outdir / "preview-tablet.png"), full_page=True)
        pg.set_viewport_size({"width": 390, "height": 844})
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(outdir / "preview-mobile.png"), full_page=True)
        browser.close()
    print(f"Wrote {outdir}/preview-desktop.png, preview-tablet.png, preview-mobile.png")
    print("Compare against the extractor's desktop.png / tablet.png / mobile.png. "
          "Ignore icon dots, font substitution, and grey placeholder boxes — fix structure, spacing, colors, stacking.")


main()
