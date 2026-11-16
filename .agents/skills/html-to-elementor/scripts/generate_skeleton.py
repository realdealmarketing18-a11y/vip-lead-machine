#!/usr/bin/env python3
"""Generate a DRAFT Elementor template from extract_styles.py output.

Reads the extractor's styles.json and mechanically builds the container/widget
tree: unique ids, flex layout, column widths from real rendered geometry, and
first-pass style mapping (colors, typography, backgrounds, padding, shadows).

The output is a STARTING POINT, not a finished conversion. Claude must review
and refine it: fix widget choices the heuristics got wrong, tighten spacing,
merge icon+heading+text stacks into icon-box widgets where appropriate, and
run validate_template.py before delivery.

Usage:
  python3 generate_skeleton.py style-extract/styles.json skeleton.json ["Page Title"]
"""
import json
import re
import secrets
import sys

INLINE_TAGS = {"strong", "em", "b", "u", "small", "span", "sub", "sup", "mark", "abbr", "code"}
CONTAINER_TAGS = {"div", "section", "article", "header", "footer", "main", "aside", "figure", "form"}
HEADINGS = {"h1", "h2", "h3", "h4", "h5", "h6"}
notes = []


def eid():
    return secrets.token_hex(4)[:7]


def px(v):
    m = re.match(r"(-?[\d.]+)px", v or "")
    return float(m.group(1)) if m else None


def rgb_to_hex(v):
    m = re.match(r"rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)", v or "")
    if not m:
        return v
    r, g, b, a = m.group(1), m.group(2), m.group(3), m.group(4)
    if a is not None and float(a) < 1:
        return f"rgba({r},{g},{b},{a})"
    return "#{:02X}{:02X}{:02X}".format(int(r), int(g), int(b))


def expand_box(v):
    parts = [str(round(px(p) or 0)) if "px" in p else "0" for p in (v or "").split()]
    if not parts:
        return None
    t, r, b, l = (parts + parts * 3)[:4] if len(parts) == 1 else (
        (parts[0], parts[1], parts[0], parts[1]) if len(parts) == 2 else
        (parts[0], parts[1], parts[2], parts[1]) if len(parts) == 3 else tuple(parts[:4]))
    return {"unit": "px", "top": t, "right": r, "bottom": b, "left": l,
            "isLinked": len({t, r, b, l}) == 1}


def dim(size):
    return {"unit": "px", "size": round(size)}


def parse_shadow(v):
    m = re.match(r"(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px(?:\s+(-?[\d.]+)px)?", v or "")
    if not m:
        return None
    return {"horizontal": round(float(m.group(2))), "vertical": round(float(m.group(3))),
            "blur": round(float(m.group(4))), "spread": round(float(m.group(5) or 0)),
            "color": m.group(1)}


def parse_gradient(v):
    m = re.match(r"linear-gradient\((?:([\d.]+)deg,\s*)?(rgba?\([^)]+\)|#\w+)[^,]*,.*?(rgba?\([^)]+\)|#\w+)[^,)]*\)$", v or "")
    if not m:
        return None
    return {"angle": round(float(m.group(1) or 180)),
            "a": rgb_to_hex(m.group(2)), "b": rgb_to_hex(m.group(3))}


class Tree:
    def __init__(self, data):
        self.nodes = {el["i"]: el for el in data["elements"]}
        self.kids = {}
        for el in data["elements"]:
            self.kids.setdefault(el["p"], []).append(el)

    def children(self, el):
        return self.kids.get(el["i"], [])

    def collect_text(self, el):
        parts = [el.get("text", "")]
        for c in self.children(el):
            parts.append(self.collect_text(c))
        return " ".join(p for p in parts if p).strip()


def typography(s, m=None, prefix="typography", t=None):
    out = {}
    fs = px(s.get("font-size", ""))
    if fs:
        out[f"{prefix}_font_size"] = dim(fs)
        tfs = px((t or {}).get("font-size", ""))
        if tfs and round(tfs) != round(fs):
            out[f"{prefix}_font_size_tablet"] = dim(tfs)
        mfs = px((m or {}).get("font-size", ""))
        if mfs and round(mfs) != round(fs):
            out[f"{prefix}_font_size_mobile"] = dim(mfs)
    if s.get("font-weight") not in (None, "400"):
        out[f"{prefix}_font_weight"] = s["font-weight"]
    if s.get("font-family"):
        out[f"{prefix}_font_family"] = s["font-family"].split(",")[0].strip().strip('"\'')
    lh = px(s.get("line-height", ""))
    if lh and fs:
        out[f"{prefix}_line_height"] = {"unit": "em", "size": round(lh / fs, 2)}
    if s.get("text-transform") not in (None, "none"):
        out[f"{prefix}_text_transform"] = s["text-transform"]
    if out:
        out[f"{prefix}_typography"] = "custom"
    return out


def fa_icon(cls):
    style = next((t for t in cls.split() if t in ("fas", "far", "fab", "fa-solid", "fa-regular", "fa-brands")), "fas")
    name = next((t for t in cls.split() if t.startswith("fa-") and t not in ("fa-solid", "fa-regular", "fa-brands")), None)
    lib = {"fas": "fa-solid", "far": "fa-regular", "fab": "fa-brands",
           "fa-solid": "fa-solid", "fa-regular": "fa-regular", "fa-brands": "fa-brands"}[style]
    return {"value": f"{style} {name}", "library": lib} if name else None


def widget(wt, settings):
    return {"id": eid(), "elType": "widget", "widgetType": wt,
            "isInner": False, "settings": settings, "elements": []}


def convert(tree, el, depth):
    tag, s, m, t = el["tag"], el.get("s", {}), el.get("m", {}), el.get("t", {})

    if tag == "nav":
        notes.append(f"skipped <nav> ({el.get('cls','')}) — menus belong in the theme/header")
        return []
    if tag in INLINE_TAGS and not el.get("icon"):
        return []  # absorbed by parent text collection

    if tag in HEADINGS:
        st = {"title": tree.collect_text(el), "header_size": tag}
        if s.get("color"):
            st["title_color"] = rgb_to_hex(s["color"])
        if s.get("text-align") in ("center", "right"):
            st["align"] = s["text-align"]
        st.update(typography(s, m, t=t))
        return [widget("heading", st)]

    if tag == "p" or (tag in ("blockquote",) and tree.collect_text(el)):
        st = {"editor": f"<p>{tree.collect_text(el)}</p>"}
        if s.get("color"):
            st["text_color"] = rgb_to_hex(s["color"])
        if s.get("text-align") in ("center", "right"):
            st["align"] = s["text-align"]
        st.update(typography(s, m, t=t))
        return [widget("text-editor", st)]

    if tag == "img":
        return [widget("image", {"image": {"url": el.get("src", ""), "id": ""},
                                 "image_size": "full"})]

    if tag in ("a", "button"):
        st = {"text": tree.collect_text(el) or "Button",
              "link": {"url": el.get("href", "#") or "#", "is_external": "", "nofollow": "", "custom_attributes": ""}}
        if s.get("background-color"):
            st["background_color"] = rgb_to_hex(s["background-color"])
        if s.get("color"):
            st["button_text_color"] = rgb_to_hex(s["color"])
        if s.get("border-radius"):
            st["border_radius"] = expand_box(s["border-radius"])
        if s.get("padding"):
            st["text_padding"] = expand_box(s["padding"])
        st.update(typography(s, m, t=t))
        if not (s.get("background-color") or s.get("border")):
            notes.append(f"<a> '{st['text'][:30]}' had no button styling — converted to button anyway; "
                         "consider inline link or text-editor instead")
        return [widget("button", st)]

    if el.get("icon"):
        ic = fa_icon(el["icon"])
        if ic:
            st = {"selected_icon": ic}
            if s.get("color"):
                st["primary_color"] = rgb_to_hex(s["color"])
            fs = px(s.get("font-size", ""))
            if fs:
                st["size"] = dim(fs)
            return [widget("icon", st)]

    if tag in ("ul", "ol"):
        items = []
        for li in tree.children(el):
            txt = tree.collect_text(li)
            if txt:
                item = {"_id": eid(), "text": txt,
                        "selected_icon": {"value": "fas fa-check", "library": "fa-solid"}}
                icon_child = next((c for c in tree.children(li) if c.get("icon")), None)
                if icon_child:
                    ic = fa_icon(icon_child["icon"])
                    if ic:
                        item["selected_icon"] = ic
                items.append(item)
        if not items:
            return []
        st = {"icon_list": items}
        if s.get("color"):
            st["text_color"] = rgb_to_hex(s["color"])
        if s.get("text-align") == "center":
            st["icon_align"] = "center"
        notes.append(f"<{tag}> → icon-list with default check icons — verify")
        return [widget("icon-list", st)]

    if tag == "iframe":
        src = el.get("src", "")
        if "youtube" in src or "youtu.be" in src:
            return [widget("video", {"video_type": "youtube", "youtube_url": src})]
        if "vimeo" in src:
            return [widget("video", {"video_type": "vimeo", "vimeo_url": src})]
        notes.append(f"iframe ({src[:60]}) → html widget")
        return [widget("html", {"html": f'<iframe src="{src}" style="width:100%;border:0" height="400"></iframe>'})]

    if tag == "svg":
        notes.append("inline <svg> → html widget — consider replacing with an icon widget")
        return [widget("html", {"html": el.get("svg", "")})]

    if tag in CONTAINER_TAGS or tag == "body":
        return [convert_container(tree, el, depth)] if tree.children(el) else (
            [widget("text-editor", {"editor": f"<p>{tree.collect_text(el)}</p>"})]
            if tree.collect_text(el) else [])

    # unknown tag with text → text-editor; else recurse into children
    if tree.collect_text(el) and not tree.children(el):
        return [widget("text-editor", {"editor": f"<p>{tree.collect_text(el)}</p>"})]
    out = []
    for c in tree.children(el):
        out.extend(convert(tree, c, depth))
    return out


def convert_container(tree, el, depth):
    s, m, t = el.get("s", {}), el.get("m", {}), el.get("t", {})
    kids = tree.children(el)

    # collapse styleless single-child wrappers
    visual = any(k in s for k in ("background-color", "background-image", "padding",
                                  "border-radius", "box-shadow", "border", "display", "gap"))
    if not visual and len(kids) == 1 and depth > 0:
        inner = convert(tree, kids[0], depth)
        if len(inner) == 1:
            return inner[0]

    settings = {"content_width": "boxed" if depth == 0 else "full"}
    is_flex = "flex" in s.get("display", "")
    is_row = is_flex and s.get("flex-direction", "row").startswith("row")
    settings["flex_direction"] = "row" if is_row else "column"
    if is_row and (m.get("flex-direction", "").startswith("column") or True):
        settings["flex_direction_mobile"] = "column"
    if is_row and t.get("flex-direction", "").startswith("column"):
        settings["flex_direction_tablet"] = "column"
    if s.get("justify-content"):
        settings["flex_justify_content"] = s["justify-content"]
    if s.get("align-items"):
        settings["flex_align_items"] = s["align-items"]
    if s.get("text-align") == "center":
        settings["flex_align_items"] = "center"
    gap = px((s.get("gap", "") or "").split()[0]) if s.get("gap") else None
    if gap:
        g = str(round(gap))
        settings["flex_gap"] = {"column": g, "row": g, "isLinked": True, "unit": "px", "size": round(gap)}

    if s.get("background-image", "").startswith("linear-gradient"):
        gr = parse_gradient(s["background-image"])
        if gr:
            settings.update({"background_background": "gradient", "background_color": gr["a"],
                             "background_color_b": gr["b"],
                             "background_gradient_angle": {"unit": "deg", "size": gr["angle"]}})
    elif "url(" in s.get("background-image", ""):
        u = re.search(r'url\(["\']?([^"\')]+)', s["background-image"])
        if u:
            settings.update({"background_background": "classic",
                             "background_image": {"url": u.group(1), "id": ""},
                             "background_size": "cover", "background_position": "center center"})
    elif s.get("background-color"):
        settings.update({"background_background": "classic",
                         "background_color": rgb_to_hex(s["background-color"])})

    if s.get("padding"):
        settings["padding"] = expand_box(s["padding"])
    if s.get("border-radius"):
        settings["border_radius"] = expand_box(s["border-radius"])
    sh = parse_shadow(s.get("box-shadow", ""))
    if sh:
        settings["box_shadow_box_shadow_type"] = "yes"
        settings["box_shadow_box_shadow"] = sh
    if s.get("min-height"):
        mh = px(s["min-height"])
        if mh and mh > 100:
            settings["min_height"] = dim(mh)

    node = {"id": eid(), "elType": "container", "isInner": depth > 0,
            "settings": settings, "elements": []}

    for c in kids:
        node["elements"].extend(convert(tree, c, depth + 1))

    # column widths for children of row containers, from real geometry
    if is_row:
        pw = el["rect"][2] or 1
        child_containers = [(c, n) for c, n in zip(kids, node["elements"])
                            if isinstance(n, dict) and n.get("elType") == "container"]
        for c, n in child_containers:
            w = round(c["rect"][2] / pw * 100, 2)
            n["settings"]["width"] = {"unit": "%", "size": w}
            n["settings"]["width_mobile"] = {"unit": "%", "size": 100}
            if settings.get("flex_direction_tablet") == "column":
                n["settings"]["width_tablet"] = {"unit": "%", "size": 100}
            elif len(child_containers) >= 3:
                n["settings"]["width_tablet"] = {"unit": "%", "size": 50}
    return node


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    with open(sys.argv[1]) as f:
        data = json.load(f)
    title = sys.argv[3] if len(sys.argv) > 3 else "Converted Page"

    tree = Tree(data)
    body = tree.nodes[0]
    bands = []
    for band in tree.children(body):
        bands.extend(convert(tree, band, 0))

    template = {"content": bands, "page_settings": {"hide_title": "yes"},
                "version": "0.4", "title": title, "type": "page"}
    with open(sys.argv[2], "w") as f:
        json.dump(template, f, indent=1)

    n_widgets = json.dumps(template).count('"widget"')
    print(f"Draft written to {sys.argv[2]}: {len(bands)} top-level section(s), {n_widgets} widget(s)")
    print("\nREVIEW NOTES (fix these while refining):")
    for n in notes or ["(none)"]:
        print(f"  - {n}")
    print("\nNext: refine the draft (merge icon+heading+text stacks into icon-box, "
          "check spacing), then run validate_template.py on it.")


if __name__ == "__main__":
    main()
