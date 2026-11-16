#!/usr/bin/env python3
"""Calibrate the skill against a REAL Elementor template export.

Feed this a .json exported from an actual Elementor site (Templates → Saved
Templates → hover → Export, or a full page export). It inventories what real
Elementor emits and diffs it against this skill's assumptions, reporting:

  - widget types not in the skill's known lists (docs need a new entry)
  - setting keys per widget/container (ground truth for widgets.md examples)
  - value-shape mismatches (e.g. dimension sides as numbers vs strings)
  - envelope fields and format version

Use the report to update references/widgets.md, references/schema.md, and the
validator's widget lists. Run:

  python3 calibrate_from_export.py real-export.json [report.md]
"""
import json
import sys
from collections import defaultdict

from validate_template import FREE_WIDGETS, PRO_WIDGETS, DIMENSION_KEYS

KNOWN = FREE_WIDGETS | PRO_WIDGETS


def walk(elements, stats):
    for el in elements:
        if not isinstance(el, dict):
            continue
        eltype = el.get("elType", "?")
        wt = el.get("widgetType") if eltype == "widget" else None
        bucket = wt or eltype
        stats["counts"][bucket] += 1
        if wt and wt not in KNOWN:
            stats["unknown_widgets"].add(wt)
        settings = el.get("settings") or {}
        if isinstance(settings, dict):
            for k, v in settings.items():
                stats["keys"][bucket].add(k)
                # value-shape observations
                if isinstance(v, dict) and {"top", "right", "bottom", "left"} <= set(v):
                    side_types = {type(v[s]).__name__ for s in ("top", "right", "bottom", "left")}
                    stats["dimension_side_types"][f"{bucket}.{k}"] = side_types
                if isinstance(v, dict) and "size" in v and "unit" in v and "top" not in v:
                    stats["slider_size_types"][f"{bucket}.{k}"] = type(v["size"]).__name__
                if isinstance(v, list) and v and all(isinstance(i, dict) for i in v):
                    missing = sum(1 for i in v if "_id" not in i)
                    if missing:
                        stats["repeaters_missing_id"].add(f"{bucket}.{k}")
        walk(el.get("elements") or [], stats)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    with open(sys.argv[1]) as f:
        data = json.load(f)

    if isinstance(data, list):
        envelope, content = {}, data
    else:
        envelope, content = data, data.get("content", [])

    stats = {
        "counts": defaultdict(int),
        "keys": defaultdict(set),
        "unknown_widgets": set(),
        "dimension_side_types": {},
        "slider_size_types": {},
        "repeaters_missing_id": set(),
    }
    walk(content, stats)

    lines = ["# Calibration report", ""]
    if envelope:
        lines += ["## Envelope", ""]
        lines += [f"- fields: {sorted(k for k in envelope if k != 'content')}",
                  f"- version: {envelope.get('version')!r}, type: {envelope.get('type')!r}", ""]

    lines += ["## Element inventory", ""]
    for bucket, n in sorted(stats["counts"].items(), key=lambda x: -x[1]):
        flag = ""
        if bucket in stats["unknown_widgets"]:
            flag = "  ← NOT in skill's widget lists: add to docs + validator"
        elif bucket in PRO_WIDGETS:
            flag = "  (Pro)"
        lines.append(f"- `{bucket}` ×{n}{flag}")
    lines.append("")

    if stats["unknown_widgets"]:
        lines += ["## ACTION: unknown widget types", ""]
        lines += [f"- `{w}` — document settings (see key inventory below) and add to "
                  f"FREE_WIDGETS or PRO_WIDGETS in validate_template.py"
                  for w in sorted(stats["unknown_widgets"])]
        lines.append("")

    # dimension side types: skill assumes strings
    bad_dims = {k: t for k, t in stats["dimension_side_types"].items() if t != {"str"}}
    lines += ["## Value shapes", ""]
    lines.append(f"- dimension objects observed: {len(stats['dimension_side_types'])}; "
                 f"non-string sides: {len(bad_dims)}")
    for k, t in sorted(bad_dims.items())[:15]:
        lines.append(f"  - `{k}` sides are {sorted(t)} — if real exports do this, "
                     f"relax the docs/validator")
    non_num = {k: t for k, t in stats["slider_size_types"].items()
               if t not in ("int", "float")}
    lines.append(f"- slider objects observed: {len(stats['slider_size_types'])}; "
                 f"non-numeric sizes: {len(non_num)}")
    for k, t in sorted(non_num.items())[:15]:
        lines.append(f"  - `{k}` size is {t}")
    if stats["repeaters_missing_id"]:
        lines.append(f"- repeaters with items missing `_id`: "
                     f"{sorted(stats['repeaters_missing_id'])}")
    lines.append("")

    lines += ["## Setting-key inventory (ground truth per element type)", ""]
    for bucket in sorted(stats["keys"]):
        keys = sorted(stats["keys"][bucket])
        lines.append(f"### {bucket} ({len(keys)} keys)")
        lines.append("`" + "`, `".join(keys) + "`")
        lines.append("")

    report = "\n".join(lines)
    out = sys.argv[2] if len(sys.argv) > 2 else "calibration-report.md"
    with open(out, "w") as f:
        f.write(report)
    print(f"Report written to {out}")
    print(f"{sum(stats['counts'].values())} elements, "
          f"{len(stats['unknown_widgets'])} unknown widget type(s), "
          f"{len(bad_dims)} dimension-shape deviation(s)")


if __name__ == "__main__":
    main()
