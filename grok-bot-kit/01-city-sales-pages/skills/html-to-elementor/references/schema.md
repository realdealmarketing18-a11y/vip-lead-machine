# Elementor Template JSON Schema

## Template envelope (the file you deliver)

```json
{
  "content": [ /* array of top-level container elements */ ],
  "page_settings": {},
  "version": "0.4",
  "title": "SaaS Landing Page",
  "type": "page"
}
```

- `type`: `"page"` for full-page templates, `"container"` for a reusable section/block, `"section"` only for legacy layouts (avoid).
- `version`: keep `"0.4"` — current Elementor export format version.
- `page_settings`: page-level options (see below). `{}` is fine for blocks.

### Useful page_settings (type "page" only)

```json
"page_settings": {
  "hide_title": "yes",
  "template": "elementor_canvas"
}
```

- `"template": "elementor_canvas"` — blank canvas, no theme header/footer. Best for full landing pages that ship their own header/footer.
- `"template": "elementor_header_footer"` — full width, keeps theme header/footer.
- Omit `template` to use the theme default.

## Element schema (every node in `content`)

```json
{
  "id": "7a3f2b1",
  "elType": "container",
  "isInner": false,
  "settings": { },
  "elements": [ ],
  "widgetType": "heading"
}
```

- `id` — unique 7–8 char lowercase hex string per element. Generate randomly, never reuse.
- `elType` — `"container"` or `"widget"`.
- `widgetType` — only on widgets.
- `isInner` — `false` for top-level containers, `true` for containers nested inside another container. Widgets: `false`.
- `settings` — object of control values (never an array in output).
- `elements` — children. Widgets: `[]` (nested-capable widgets like tabs excepted).

## Container settings (flexbox)

### Top-level section container (a page "band")

```json
{
  "id": "a1b2c3d",
  "elType": "container",
  "isInner": false,
  "settings": {
    "content_width": "boxed",
    "flex_direction": "column",
    "flex_gap": {"column": "20", "row": "20", "isLinked": true, "unit": "px", "size": 20},
    "background_background": "classic",
    "background_color": "#F7F9FC",
    "padding": {"unit": "px", "top": "100", "right": "20", "bottom": "100", "left": "20", "isLinked": false}
  },
  "elements": [ ]
}
```

- `content_width`: `"boxed"` (inner content capped at site width — the normal choice) or `"full"`.
- `boxed_width`: `{"unit": "px", "size": 1140}` — override the boxed cap if the design needs it.
- `min_height`: `{"unit": "vh", "size": 100}` — for full-height heroes.

### Flex properties

| Setting | Values |
|---|---|
| `flex_direction` | `"row"`, `"column"`, `"row-reverse"`, `"column-reverse"` |
| `flex_justify_content` | `"flex-start"`, `"center"`, `"flex-end"`, `"space-between"`, `"space-around"`, `"space-evenly"` |
| `flex_align_items` | `"flex-start"`, `"center"`, `"flex-end"`, `"stretch"` |
| `flex_wrap` | `"wrap"` or `""` (nowrap) |
| `flex_gap` | `{"column": "24", "row": "24", "isLinked": true, "unit": "px", "size": 24}` |

Default direction inside a container is `column` (stacked). For side-by-side layouts set `flex_direction: "row"` on the parent.

### Column-style child container (an item in a row)

```json
{
  "id": "b2c3d4e",
  "elType": "container",
  "isInner": true,
  "settings": {
    "content_width": "full",
    "width": {"unit": "%", "size": 33.33},
    "width_mobile": {"unit": "%", "size": 100},
    "flex_direction": "column",
    "flex_align_items": "flex-start"
  },
  "elements": [ ]
}
```

- Child containers acting as columns: `content_width: "full"` + percentage `width`. Percentages should account for the parent's `flex_gap`.
- **Mobile stacking needs BOTH**: `flex_direction_mobile: "column"` on the row parent AND `width_mobile: {"unit": "%", "size": 100}` on each child. Width alone doesn't stack a nowrap flex row — the columns just squish. Add `width_tablet` (often `50`) for 3-4 column rows.

### Backgrounds, borders, effects

```json
"background_background": "classic",
"background_color": "#1E293B",
"background_image": {"url": "https://example.com/bg.jpg", "id": ""},
"background_size": "cover",
"background_position": "center center",

"background_background": "gradient",
"background_color": "#4F46E5",
"background_color_b": "#9333EA",
"background_gradient_angle": {"unit": "deg", "size": 135},

"background_overlay_background": "classic",
"background_overlay_color": "#000000",
"background_overlay_opacity": {"unit": "px", "size": 0.5},

"border_border": "solid",
"border_width": {"unit": "px", "top": "1", "right": "1", "bottom": "1", "left": "1", "isLinked": true},
"border_color": "#E2E8F0",
"border_radius": {"unit": "px", "top": "12", "right": "12", "bottom": "12", "left": "12", "isLinked": true},

"box_shadow_box_shadow_type": "yes",
"box_shadow_box_shadow": {"horizontal": 0, "vertical": 8, "blur": 24, "spread": 0, "color": "rgba(15,23,42,0.08)"}
```

Remember the activation keys: `background_background`, `border_border`, `box_shadow_box_shadow_type`. Without them the values are ignored.

### Shape dividers (container edges)

The right mapping for angled/wave/curved section edges (often a `::before`/`::after` in the source — see the `pe` field in styles.json):

```json
"shape_divider_top": "waves",
"shape_divider_top_color": "#FFFFFF",
"shape_divider_top_height": {"unit": "px", "size": 90},
"shape_divider_top_flip": "yes",
"shape_divider_top_negative": "yes"
```

Same keys with `_bottom`. Shapes: `waves`, `curve`, `tilt`, `triangle`, `triangle-asymmetrical`, `arrow`, `split`, `book`, `mountains`, `drops`, `clouds`, `zigzag`, `pyramids`. Never rebuild these with `html` widgets.

### Grid container (use sparingly)

```json
"container_type": "grid",
"grid_columns_grid": {"unit": "fr", "size": 3},
"grid_gap": {"column": "24", "row": "24", "isLinked": true, "unit": "px", "size": 24}
```

Flex + percentage widths remains the default for conversions (more predictable). Grid keys drift between Elementor versions — calibrate from a user export before leaning on grid for a complex design.

## Value formats

| Kind | Format | Example |
|---|---|---|
| Dimensions (padding, margin, radius, border width) | object, sides as **strings** | `{"unit": "px", "top": "20", "right": "0", "bottom": "20", "left": "0", "isLinked": false}` |
| Sliders (size, gap, height, opacity) | object, size as **number** | `{"unit": "px", "size": 48}` |
| Colors | hex or rgba string | `"#4F46E5"`, `"rgba(0,0,0,0.5)"` |
| Links | object | `{"url": "https://…", "is_external": "on", "nofollow": "", "custom_attributes": ""}` |
| Images | object | `{"url": "https://…", "id": ""}` (empty id = external image) |
| Icons | object | `{"value": "fas fa-check", "library": "fa-solid"}` |
| Switches | `"yes"` / `""` | `"hide_title": "yes"` |

## Responsive overrides

Append `_tablet` or `_mobile` to almost any setting key:

```json
"align": "left",
"align_mobile": "center",
"typography_font_size": {"unit": "px", "size": 56},
"typography_font_size_tablet": {"unit": "px", "size": 42},
"typography_font_size_mobile": {"unit": "px", "size": 32},
"flex_direction": "row",
"flex_direction_mobile": "column",
"padding_mobile": {"unit": "px", "top": "60", "right": "16", "bottom": "60", "left": "16", "isLinked": false}
```

Breakpoints (defaults): mobile ≤ 767px, tablet 768–1024px, desktop above. Stick to `_tablet`/`_mobile` — extra breakpoints (widescreen, laptop) only exist if the site enables them.

Standard responsive minimums for every conversion: hero headings sized down for mobile, row containers given `flex_direction_mobile: "column"` with children at `width_mobile` 100%, generous desktop padding reduced on mobile. Tablet gets explicit treatment too — prefer the extractor's observed tablet behavior (`t` overrides) over guessing; 3–4 column rows that stay side-by-side at tablet usually want `width_tablet: 50` so they wrap 2×2 instead of squishing 4-up.

## Global colors and fonts (optional, theme-friendly output)

To bind a setting to the site's Global styles instead of a hard-coded value, use `__globals__`:

```json
"settings": {
  "title_color": "",
  "__globals__": {
    "title_color": "globals/colors?id=primary"
  }
}
```

Default global color ids: `primary`, `secondary`, `text`, `accent`. Global font ids: `primary`, `secondary`, `text`, `accent`.

Use hard-coded values when fidelity to the source HTML matters (the normal case for this skill); offer globals when the user says they want the template to follow their site's design system.

## ID generation

Generate ids like this (or equivalent): 7 random lowercase hex chars.

```python
import secrets
def eid():
    return secrets.token_hex(4)[:7]
```

All element `id`s and repeater `_id`s across the whole file must be unique.
