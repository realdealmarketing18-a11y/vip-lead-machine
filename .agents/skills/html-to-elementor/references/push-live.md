# Getting the Template Onto a Site

## Method 1 — Manual import (default, always works)

1. WordPress admin → **Templates → Saved Templates → Import Templates** → upload the `.json`.
2. Or inside the Elementor editor: click the **folder icon** (Add Template) → **My Templates** → insert.
3. After inserting, replace hotlinked images with Media Library uploads.

This is the delivery to recommend unless the user asked to push live.

## Method 2 — Push live via REST API (needs the helper plugin)

Elementor's data lives in **protected post meta** (`_elementor_data` — underscore prefix), which the standard WP REST API refuses to write. The bundled helper plugin (`assets/elementor-connect.php`) registers a small authenticated endpoint that does it properly.

### One-time site setup (walk the user through this)

1. Install the helper: upload `assets/elementor-connect.php` to `wp-content/plugins/` (or zip it and install via Plugins → Add New → Upload), then activate **Elementor Connect (HTML-to-Elementor helper)**.
2. Create an Application Password: **Users → Profile → Application Passwords** → name it (e.g. "Claude") → copy the generated password.
3. The user gives you: site URL, WP username, application password. Treat the password as a secret — never echo it back or store it in files you deliver.

### Pushing a template

```bash
curl -sS -X POST "https://SITE/wp-json/elementor-connect/v1/pages" \
  -u "USERNAME:APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d @payload.json
```

`payload.json`:

```json
{
  "title": "SaaS Landing Page",
  "status": "draft",
  "content": [ /* the template's content array */ ],
  "page_settings": { "hide_title": "yes", "template": "elementor_canvas" },
  "import_images": true
}
```

The endpoint creates a **draft page** with `_elementor_data`, `_elementor_edit_mode = builder`, `_elementor_page_settings`, and the active Elementor version, then returns the page id and edit URL. Always push as `draft` and let the user review + publish — never publish directly unless they explicitly say to.

With `"import_images": true`, every external image URL in the template (hero backgrounds, image widgets, testimonial avatars) is downloaded into the site's Media Library and the template rewritten to use the local attachment — no hotlinking. Recommend it by default when pushing live. The response's `images` field reports `imported` count and `failed` entries (e.g. SVGs, which WordPress blocks by default — leave those hotlinked and tell the user).

Response:

```json
{"id": 123, "edit_url": "https://SITE/wp-admin/post.php?post=123&action=elementor", "preview_url": "https://SITE/?page_id=123&preview=true", "images": {"imported": 4, "failed": []}}
```

### After pushing

Tell the user to open the page in Elementor once and click **Update** (or run **Elementor → Tools → Regenerate CSS & Data**) so Elementor generates the page's CSS file. Until then the front-end may look unstyled.

## Method 3 — WP-CLI (if the user has shell access)

```bash
wp post create --post_type=page --post_title="Landing Page" --post_status=draft --porcelain
# → returns ID
wp post meta update <ID> _elementor_edit_mode builder
wp post meta update <ID> _elementor_template_type wp-page
wp post meta update <ID> _elementor_data "$(cat content-array.json)"   # JSON of the content ARRAY only, slashes escaped
wp elementor flush-css
```

Note: `_elementor_data` stores only the `content` array (as a JSON string), not the full template envelope. WP-CLI handles most escaping, but backslashes in the JSON need doubling (`wp post meta update` runs through `wp_slash` semantics inconsistently across versions) — verify the page renders after pushing.

## Security rules

- Credentials (app passwords, site URLs with auth) never go into delivered files, logs, or the final response.
- Ask before installing anything on the user's site; the helper plugin is opt-in.
- Default to `draft` status, always.
- If the site has security plugins blocking REST (Wordfence etc.), the endpoint may 401/403 — tell the user to allowlist the REST route rather than disabling security features.
