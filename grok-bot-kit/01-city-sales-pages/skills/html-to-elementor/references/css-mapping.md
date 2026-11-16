# CSS → Elementor Settings Mapping

How to translate the source page's CSS into Elementor settings. **Preferred input: the output of `scripts/extract_styles.py`** — it renders the page headlessly and gives you each element's final *computed* styles (cascade already resolved) plus tablet (`t`) and mobile (`m`) overrides and screenshots at all three widths. Reading raw stylesheets by hand is the fallback for tiny snippets only. Either way: work per element, then map its effective styles onto the widget or container that replaces it.

Notes on computed values: colors arrive as `rgb()`/`rgba()` — convert to hex where opaque. `line-height` arrives in px — divide by font-size for an `em` value. Shorthand `padding: 120px 20px` expands to top/bottom 120, left/right 20. A `margin: 0px 380px` on a centered element is auto-centering, not real margin — use container alignment instead. `font-family` arrives as a full stack (`"Inter", ui-sans-serif, system-ui`) — take the **first** family and strip the quotes for `typography_font_family`.

## Typography

| CSS | Elementor setting | Notes |
|---|---|---|
| `font-family` | `typography_font_family` | Plus `"typography_typography": "custom"` — always |
| `font-size` | `typography_font_size` | `{"unit": "px", "size": N}` |
| `font-weight` | `typography_font_weight` | String: `"400"`, `"600"`, `"700"` |
| `line-height` | `typography_line_height` | Unitless CSS → `{"unit": "em", "size": 1.5}` |
| `letter-spacing` | `typography_letter_spacing` | `{"unit": "px", "size": N}` |
| `text-transform` | `typography_text_transform` | `"uppercase"`, `"lowercase"`, `"capitalize"` |
| `font-style` | `typography_font_style` | `"italic"` |
| `text-decoration` | `typography_text_decoration` | `"underline"`, `"line-through"` |
| `text-align` | `align` (most widgets) | `"left"`, `"center"`, `"right"`, `"justify"` |
| `color` | `title_color` (heading), `text_color` (text-editor), `button_text_color` (button) | Per-widget key — check widgets.md |

On sub-styled widgets (icon-box title vs description) the group gets a prefix: `title_typography_typography: "custom"` + `title_typography_font_size`, `description_typography_*`, etc.

## Box model → containers

Prefer putting spacing on containers, not widgets.

| CSS | Elementor setting |
|---|---|
| `padding` | `padding` dimension object |
| `margin` | `margin` dimension object (widgets: `_margin`) |
| `max-width` on a section wrapper | `content_width: "boxed"` + `boxed_width` |
| `width` on a column | `width: {"unit": "%", "size": N}` on child container |
| `min-height` | `min_height` |
| `gap` | `flex_gap` |

Widget-level spacing uses underscore-prefixed common keys: `_margin`, `_padding`, and also `_element_width`, `_align_self`, `_animation`.

## Flexbox / layout

| CSS | Elementor container setting |
|---|---|
| `display: flex; flex-direction: row` | `flex_direction: "row"` |
| `justify-content: X` | `flex_justify_content: "X"` |
| `align-items: X` | `flex_align_items: "X"` |
| `flex-wrap: wrap` | `flex_wrap: "wrap"` |
| CSS grid `grid-template-columns: repeat(3, 1fr)` | Row container + 3 child containers at ~33% width (minus gap) |

Elementor containers also support a grid mode (`container_type: "grid"`), but flex + percentage widths is more predictable for conversions — use it unless the source is a complex asymmetric grid.

## Backgrounds

| CSS | Elementor setting |
|---|---|
| `background-color: #X` | `background_background: "classic"` + `background_color` |
| `background-image: url(…)` | `background_background: "classic"` + `background_image: {"url": "…", "id": ""}` |
| `background-size: cover` | `background_size: "cover"` |
| `background-position: center` | `background_position: "center center"` |
| `background-attachment: fixed` | `background_attachment: "fixed"` |
| `linear-gradient(135deg, #A, #B)` | `background_background: "gradient"` + `background_color` + `background_color_b` + `background_gradient_angle: {"unit": "deg", "size": 135}` |
| Dark overlay on hero image | `background_overlay_background: "classic"` + `background_overlay_color` + `background_overlay_opacity: {"unit": "px", "size": 0.5}` |

Gradients with 3+ stops: use the first and last stop, note the simplification to the user.

## Borders & effects

| CSS | Elementor setting |
|---|---|
| `border: 1px solid #X` | `border_border: "solid"` + `border_width` + `border_color` |
| `border-radius` | `border_radius` dimension object |
| `box-shadow: X Y B S color` | `box_shadow_box_shadow_type: "yes"` + `box_shadow_box_shadow: {"horizontal": X, "vertical": Y, "blur": B, "spread": S, "color": "…"}` |
| `opacity` | `_css_opacity: {"unit": "px", "size": 0.9}` (widget common tab) |

## Hover states

Buttons have native hover keys: `button_background_hover_color`, `hover_color` (text), `button_hover_border_color`, `hover_animation` (e.g. `"grow"`). Other widgets' hover styling is limited on free — drop non-essential hover effects and mention it.

## Pseudo-elements (`pe` in styles.json)

The extractor records decorative `::before`/`::after` styles under a `pe` field — these are invisible in per-element computed styles and get lost silently if ignored. Map them:

- Angled/wave/curve section edges → container **shape dividers** (see schema.md), never `html` hacks.
- Full-bleed tints over a background image → `background_overlay_*` on the container.
- Small decorative blobs/badges → drop if purely cosmetic; otherwise one flagged `html` widget.

Also cross-check the screenshots: anything visible there but absent from `styles.json` elements is usually a pseudo-element or an icon font.

## What NOT to carry over

- Resets and utility noise: `box-sizing`, vendor prefixes, `outline: none`.
- Positioning hacks (`position: absolute` overlaps): Elementor common tab has `_position: "absolute"` with `_offset_x`/`_offset_y`, but absolutely-positioned conversions break responsively — rebuild the visual intent with flex instead where possible.
- CSS animations/transitions → use `_animation` entrance animations instead.
- Media queries → translate into `_tablet`/`_mobile` setting overrides, don't copy the CSS.
