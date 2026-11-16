# HTML → Elementor Converter Skill

A Claude skill that converts HTML — a full page, a section, or a URL — into importable Elementor templates built with modern flexbox containers.

## What it does

Give Claude any HTML (or a live URL) and ask it to "convert this to Elementor." Claude renders the page, reads the real computed styles, maps every element to native Elementor widgets, and delivers a `.json` file you import via **Elementor → Templates → Saved Templates → Import**. It can also push the result straight to your WordPress site as a draft page — images included.

## Installing the skill

Upload the skill zip in the Claude desktop app: **Settings → Capabilities → Skills**. That's it — then just ask Claude to convert HTML to Elementor in any session.

## What's inside

| File | Purpose |
|---|---|
| `SKILL.md` | The conversion workflow Claude follows |
| `references/schema.md` | Elementor template + container JSON schema |
| `references/widgets.md` | HTML → widget mapping with settings examples |
| `references/css-mapping.md` | CSS property → Elementor setting translation |
| `references/pro-widgets.md` | Pro widget keys (only loaded when the site runs Pro) |
| `references/push-live.md` | Import methods + push-to-site instructions |
| `scripts/extract_styles.py` | Headless-browser computed-styles extractor (+ screenshots, lazy images, pseudo-elements) |
| `scripts/generate_skeleton.py` | Auto-builds a draft template from extracted styles |
| `scripts/render_preview.py` | Renders the finished JSON back to a screenshot for visual comparison |
| `scripts/validate_template.py` | Catches import-breaking mistakes before delivery |
| `scripts/calibrate_from_export.py` | Diffs a real Elementor export against the skill's docs |
| `assets/elementor-connect.php` | Optional WordPress plugin for push-live + image import |

## Optional: push-live setup (one time, per site)

1. Upload `assets/elementor-connect.php` to `wp-content/plugins/` and activate it.
2. Create an Application Password (Users → Profile → Application Passwords).
3. Give Claude your site URL, username, and the app password when asked.

Pages are always created as **drafts** for you to review.

## Tips

- Works with Elementor **free** — Pro-only widgets (forms, sliders) get sensible fallbacks and a note.
- Ask for "section library mode" to get separate importable blocks (hero, features, CTA) instead of one page.
- If a conversion imports oddly, export any template from your site and give it to Claude — it will calibrate itself against your Elementor version.
