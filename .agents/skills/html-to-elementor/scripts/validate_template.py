#!/usr/bin/env python3
"""Validate an Elementor template JSON file produced by the html-to-elementor skill.

Usage: python3 validate_template.py template.json
Exit code 0 = no errors (warnings allowed), 1 = errors found.
"""
import json
import re
import sys

FREE_WIDGETS = {
    "heading", "image", "text-editor", "video", "button", "divider", "spacer",
    "google_maps", "icon", "image-box", "icon-box", "rating", "star-rating",
    "image-carousel", "basic-gallery", "image-gallery", "icon-list", "counter",
    "progress", "testimonial", "tabs", "accordion", "toggle", "social-icons",
    "alert", "audio", "shortcode", "html", "menu-anchor", "sidebar", "read-more",
    "text-path", "nested-tabs", "nested-accordion", "link-in-bio",
}
PRO_WIDGETS = {
    "form", "posts", "portfolio", "slides", "gallery", "flip-box", "price-table",
    "price-list", "countdown", "share-buttons", "theme-post-title",
    "theme-post-content", "theme-site-logo", "nav-menu", "search-form",
    "animated-headline", "hotspot", "call-to-action", "testimonial-carousel",
    "reviews", "table-of-contents", "lottie", "video-playlist", "paypal-button",
    "stripe-button", "blockquote", "mega-menu", "loop-grid", "loop-carousel",
}
VALID_ELTYPES = {"container", "section", "column", "widget"}
ID_RE = re.compile(r"^[0-9a-f]{7,8}$")
# settings groups that need an activation key to take effect.
# scope: "all" = every element, "container" = layout containers only
# (widgets have standalone background_*/border_radius controls, e.g. button).
ACTIVATION_GROUPS = [
    ("typography_", "typography_typography", "custom", "all", None),
    ("title_typography_", "title_typography_typography", "custom", "all", None),
    ("description_typography_", "description_typography_typography", "custom", "all", None),
    ("background_", "background_background", None, "container", None),
    ("background_overlay_", "background_overlay_background", None, "container", None),
    # border_radius is independent of border type; only width/color need border_border
    ("border_", "border_border", None, "all", {"border_width", "border_color"}),
    ("box_shadow_box_shadow", "box_shadow_box_shadow_type", "yes", "all", None),
]
DIMENSION_KEYS = {"padding", "margin", "_padding", "_margin", "border_radius",
                  "border_width", "image_border_radius", "text_padding"}

errors, warnings = [], []
seen_ids = {}


def err(path, msg):
    errors.append(f"[ERROR] {path}: {msg}")


def warn(path, msg):
    warnings.append(f"[WARN]  {path}: {msg}")


def strip_responsive(key):
    for suf in ("_widescreen", "_laptop", "_tablet_extra", "_tablet", "_mobile_extra", "_mobile"):
        if key.endswith(suf):
            return key[: -len(suf)]
    return key


def check_activation(settings, path, eltype):
    keys = {strip_responsive(k) for k in settings}
    for prefix, activator, expected, scope, only in ACTIVATION_GROUPS:
        if scope == "container" and eltype != "container":
            continue
        group_keys = [k for k in keys
                      if k.startswith(prefix) and k != activator
                      and not k.endswith(("_background", "_border", "_type"))
                      and (only is None or k in only)]
        if group_keys and activator not in keys:
            err(path, f"has {prefix}* settings {sorted(group_keys)[:3]} but missing "
                      f"activation key '{activator}'"
                      + (f" = '{expected}'" if expected else "") + " — these styles will be IGNORED")


def check_dimension(key, val, path):
    if not isinstance(val, dict):
        err(path, f"'{key}' should be a dimension object, got {type(val).__name__}")
        return
    for side in ("top", "right", "bottom", "left"):
        if side in val and not isinstance(val[side], str):
            err(path, f"'{key}.{side}' must be a string (got {val[side]!r})")
    if "unit" not in val:
        warn(path, f"'{key}' missing 'unit'")


def check_settings(settings, path, eltype):
    if not isinstance(settings, dict):
        err(path, f"settings must be an object, got {type(settings).__name__}")
        return
    check_activation(settings, path, eltype)
    for key, val in settings.items():
        base = strip_responsive(key)
        if base in DIMENSION_KEYS:
            check_dimension(key, val, path)
        # repeater arrays: every item dict needs a unique _id
        if isinstance(val, list) and val and all(isinstance(i, dict) for i in val):
            ids = [i.get("_id") for i in val]
            if any(i is None for i in ids):
                err(path, f"repeater '{key}' has items missing '_id'")
            elif len(set(ids)) != len(ids):
                err(path, f"repeater '{key}' has duplicate '_id' values")


def walk(el, path, depth):
    if not isinstance(el, dict):
        err(path, f"element must be an object, got {type(el).__name__}")
        return
    eid = el.get("id")
    if not eid:
        err(path, "missing 'id'")
    else:
        if not ID_RE.match(str(eid)):
            warn(path, f"id '{eid}' is not 7-8 char lowercase hex")
        if eid in seen_ids:
            err(path, f"duplicate id '{eid}' (also at {seen_ids[eid]})")
        seen_ids.setdefault(eid, path)

    eltype = el.get("elType")
    if eltype not in VALID_ELTYPES:
        err(path, f"invalid elType {eltype!r}")
    if eltype in ("section", "column"):
        warn(path, f"legacy elType '{eltype}' — this skill targets flexbox containers")

    if eltype == "widget":
        wt = el.get("widgetType")
        if not wt:
            err(path, "widget missing 'widgetType'")
        elif wt in PRO_WIDGETS:
            warn(path, f"'{wt}' is an Elementor PRO widget — breaks on free sites")
        elif wt not in FREE_WIDGETS:
            warn(path, f"unknown widgetType '{wt}' — verify it exists (typo? Pro? third-party addon?)")
        if wt == "html":
            warn(path, "html widget used — confirm this compromise was flagged to the user")
        if el.get("elements") and wt not in ("nested-tabs", "nested-accordion"):
            warn(path, f"widget '{wt}' has child elements — usually wrong")
    elif eltype == "container":
        is_inner = el.get("isInner")
        if depth == 0 and is_inner is True:
            warn(path, "top-level container has isInner=true (should be false)")
        if depth > 0 and is_inner is False:
            warn(path, "nested container has isInner=false (should be true)")

    if "settings" in el:
        check_settings(el["settings"], path, eltype)
    else:
        err(path, "missing 'settings'")

    children = el.get("elements")
    if children is None:
        err(path, "missing 'elements' array")
    elif isinstance(children, list):
        for i, child in enumerate(children):
            label = child.get("widgetType") or child.get("elType", "?") if isinstance(child, dict) else "?"
            walk(child, f"{path}>{label}[{i}]", depth + 1)


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    try:
        with open(sys.argv[1]) as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"[ERROR] cannot parse {sys.argv[1]}: {e}")
        sys.exit(1)

    if isinstance(data, list):
        warn("root", "file is a bare elements array — fine for _elementor_data, "
                     "but Template Import needs the {content, title, type, version} envelope")
        content = data
    else:
        for field in ("content", "title", "type", "version"):
            if field not in data:
                err("root", f"template envelope missing '{field}'")
        if data.get("type") not in ("page", "container", "section", "wp-page", "wp-post", None):
            warn("root", f"unusual template type {data.get('type')!r}")
        content = data.get("content", [])

    if not content:
        err("root", "no elements in content")
    for i, el in enumerate(content):
        label = el.get("elType", "?") if isinstance(el, dict) else "?"
        walk(el, f"content[{i}]:{label}", 0)

    for line in errors + warnings:
        print(line)
    print(f"\n{len(errors)} error(s), {len(warnings)} warning(s), "
          f"{len(seen_ids)} elements checked.")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
