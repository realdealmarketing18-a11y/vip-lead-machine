---
name: html-to-elementor
description: Convert HTML pages, sections, or snippets into importable Elementor templates (flexbox container JSON). Use when the user wants to turn HTML/CSS into Elementor widgets, layouts, or templates, rebuild a webpage design in Elementor, generate Elementor JSON, or push a converted layout live to a WordPress site. Triggers include "html to elementor", "convert to elementor", "elementor template", "elementor json", "rebuild this in elementor".
---

# HTML to Elementor Converter

Convert HTML (a full page, a section, or a snippet) into a valid Elementor template `.json` file the user can import via **Elementor → Templates → Import**, or optionally push straight to their WordPress site.

Output targets **flexbox containers** (Elementor's current default layout system) — never legacy sections/columns unless the user explicitly asks.

## Workflow

### Step 0 — Gather input

Establish before converting (ask only what's missing, in one round):

1. **Source HTML** — a file, a pasted snippet, or a URL to fetch. If a URL, also fetch its linked CSS where possible.
2. **Scope** — full page template (`"type": "page"`), a reusable section block (`"type": "container"`), or **section-library mode**: split a full page into separate block files (`hero.json`, `features.json`, `cta.json`, each `"type": "container"`) so the user builds a reusable library. Default: full page for whole documents, container for fragments. Offer section-library mode when the user mentions reusing pieces across pages/sites.
3. **Delivery** — `.json` file only (default), or also push live to a site (needs site URL + credentials — see `references/push-live.md`).
4. **Elementor tier** — free or Pro. Affects widget choices (forms, custom CSS). Assume free if unknown and note any Pro-only compromises. If Pro is confirmed, read `references/pro-widgets.md` before using any Pro widget.

### Step 1 — Parse and plan

Read the HTML and sketch the structure before writing any JSON:

- Split the page into top-level bands (header, hero, features, testimonials, pricing, CTA, footer). Each band = one top-level container.
- Inside each band, identify rows of side-by-side items → child container with `flex_direction: row`, one child container per column.
- Map each content element to a widget using the table in `references/widgets.md`.
- Collect the styles that matter: colors, fonts, sizes, spacing, backgrounds, borders, shadows. **For URLs — or any HTML with non-trivial stylesheets — don't resolve CSS by hand.** Run the computed-styles extractor:

  ```bash
  pip list 2>/dev/null | grep -qi playwright || pip install playwright --break-system-packages --quiet
  python3 scripts/extract_styles.py <url-or-file> extract-out
  ```

  Then **Read `extract-out/desktop.png`, `extract-out/tablet.png`, and `extract-out/mobile.png`** (seeing the page beats guessing from markup) and use `extract-out/styles.json` — each element's final cascaded styles (`s`), tablet overrides (`t`), mobile overrides (`m`), position/size (`rect`), decorative `::before`/`::after` styles (`pe` — map to shape dividers or overlays, see css-mapping.md), image `src`, link `href`, and icon classes. Map values to settings with `references/css-mapping.md`. Only fall back to reading raw CSS for tiny inline-styled snippets.
- Flag anything unmappable (nav menus, complex JS components, forms on free tier) and decide the fallback per the "Fallbacks" section of `references/widgets.md`.

Present the plan briefly if the page is large or ambiguous; otherwise proceed.

### Step 2 — Build the JSON

If you ran the extractor, generate a draft mechanically first:

```bash
python3 scripts/generate_skeleton.py extract-out/styles.json draft.json "Page Title"
```

This builds the container tree with unique ids, real-geometry column widths, flex settings, and first-pass style mapping, and prints review notes. **The draft is a starting point — always refine it**: fix wrong widget guesses, merge icon+heading+text stacks into `icon-box` widgets, compare against the screenshots, tighten spacing. For small snippets (or no extractor run), write the JSON directly.

Either way, follow `references/schema.md` for the template envelope, container settings, and responsive keys, and `references/widgets.md` for per-widget settings. Build iteratively for large pages (structure first, then settings).

For section-library mode: build the full page first, then split each top-level container into its own file with a `"type": "container"` envelope and a descriptive `title` (shown in the user's template library).

**Hard rules — violating these produces templates that import broken:**

- Every element needs a unique `id`: 7–8 char lowercase hex (e.g. `"a1b2c3d"`). Never duplicate.
- Widgets are `"elType": "widget"` with a `"widgetType"`; layout nodes are `"elType": "container"`. Every element has `settings` (object) and `elements` (array — empty for widgets), plus `isInner` (`false` for top-level containers, `true` for nested ones).
- **Activation keys**: style groups do nothing without their switch. Custom typography needs `"typography_typography": "custom"` alongside the `typography_*` values. Backgrounds need `"background_background": "classic"` (or `"gradient"`) alongside color/image. Box shadow needs `"box_shadow_box_shadow_type": "yes"`.
- Dimension values (padding, margin, border radius) are objects: `{"unit": "px", "top": "20", "right": "20", "bottom": "20", "left": "20", "isLinked": true}` — sides as **strings**. Slider values (font size, gap, width) are `{"unit": "px", "size": 20}` — size as a **number**.
- Repeater items (icon-list items, social icons, gallery images) each need a unique `_id` (7-char hex).
- Only use widget types listed in `references/widgets.md` for the user's tier. No invented widget names.
- Don't emit `custom_css` on free tier (Pro-only, silently ignored). Put unavoidable extra CSS in one `html` widget with a `<style>` tag, and tell the user you did.

### Step 3 — Validate

Run the bundled validator on the generated file:

```bash
python3 scripts/validate_template.py path/to/template.json
```

Fix every error it reports and re-run until clean. Warnings are judgment calls — resolve or explain them.

**Visual check (full pages — skip for small snippets):** structure can be valid and still look wrong. Render an approximate preview and compare against the extractor screenshots:

```bash
python3 scripts/render_preview.py path/to/template.json preview-out
```

Read `preview-out/preview-desktop.png` next to `extract-out/desktop.png`, then the tablet pair, then the mobile pair. Ignore icon dots, font substitution, and grey placeholder boxes (video/map/form) — those are expected approximations. Fix real problems: wrong column widths, missing backgrounds, spacing way off, tablet columns squished, mobile not stacking.

### Step 4 — Deliver

1. Name the file descriptively: `hero-section.json`, `saas-landing-page.json`.
2. Send the `.json` to the user with one-line import instructions: **Elementor → Templates → Saved Templates → Import Templates**, then insert from the library (folder icon) inside the editor.
3. Mention the after-import checklist: replace placeholder images, check tablet/mobile preview, set fonts to site Global Fonts if desired.
4. If pushing live: follow `references/push-live.md` (REST helper plugin or WP-CLI), then remind the user to regenerate CSS (**Elementor → Tools → Regenerate CSS & Data**).

## Conversion judgment calls

- **Fidelity vs. editability**: the goal is a template a human can keep editing in Elementor, not a pixel-perfect fossil. Prefer native widgets with proper settings over `html` widget dumps. An 90%-faithful page built from real widgets beats a 100%-faithful page of frozen HTML.
- **Images**: external image URLs import fine but remain hotlinked. Keep original URLs, use `"id": ""` for external images, and tell the user to swap them for Media Library uploads.
- **Fonts**: map to the same font family via custom typography; if the font is obscure, fall back to a close Google Font and say so.
- **Icons**: map to the closest Font Awesome 5 free icon (`fas`/`far`/`fab`). Inline SVGs that have no close FA match go in an `html` widget.
- **Mobile**: always stack multi-column rows on mobile — `flex_direction_mobile: "column"` on the row parent **plus** `width_mobile: {"unit": "%", "size": 100}` on column containers (width alone doesn't stack a nowrap row) — and reduce oversized hero font sizes with `_mobile` keys. A converted page that breaks on phones is a failed conversion.
- **Tablet**: don't leave tablet to chance. Use the extractor's `t` overrides and `tablet.png` to see what the source actually does at 768–1024px. If the source stacks at tablet, stack (`flex_direction_tablet: "column"` + `width_tablet` 100%); if it goes 2-up, use `width_tablet: 50%`. When there's no source data (hand-written snippets), default 3–4 column rows to 50% at tablet and scale hero headings with `_tablet` font sizes.

## Keeping the skill accurate (calibration)

Elementor setting keys drift between versions. Whenever the user provides a **real template export** from their site (Templates → Saved Templates → Export), calibrate:

```bash
python3 scripts/calibrate_from_export.py their-export.json calibration-report.md
```

The report flags widget types and setting keys the skill doesn't know, plus value-shape deviations. Use it to update `references/widgets.md`, `references/schema.md`, and the widget lists in `scripts/validate_template.py` — then tell the user what was updated. If a conversion ever imports wrong on their site, ask for an export of a similar page they built manually and calibrate against it.
