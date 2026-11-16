# HTML → Elementor Widget Mapping

## Mapping table

| HTML | Widget (`widgetType`) | Tier | Notes |
|---|---|---|---|
| `h1`–`h6` | `heading` | Free | Set `header_size` to match the tag |
| `p`, rich text blocks, multi-paragraph divs | `text-editor` | Free | Keep inner HTML (`<p>`, `<strong>`, `<a>`, `<ul>`) in `editor` |
| `img` | `image` | Free | External URL + `"id": ""` |
| `a` styled as button, `button` | `button` | Free | |
| `ul`/`ol` of short items (features, checkmarks) | `icon-list` | Free | Repeater; each item needs `_id` |
| Icon + title + paragraph card | `icon-box` | Free | The workhorse for feature grids |
| Image + title + paragraph card | `image-box` | Free | |
| `<i class="fa…">`, simple SVG icon | `icon` | Free | Map to closest FA5 free icon |
| YouTube/Vimeo `iframe` | `video` | Free | `video_type` + `youtube_url`/`vimeo_url` |
| `hr`, thin divider lines | `divider` | Free | |
| Empty spacing divs | `spacer` | Free | Prefer container padding/gap; spacer as last resort |
| Star ratings | `rating` | Free | `rating` value + `rating_scale` |
| Quote + avatar + name | `testimonial` | Free | |
| Number counters ("500+ customers") | `counter` | Free | |
| Progress bars | `progress` | Free | |
| Social link rows | `social-icons` | Free | Repeater with `_id` |
| Tabbed content | `tabs` | Free | Prefer flattening to stacked sections if tabs are decorative |
| Accordion / FAQ | `accordion` | Free | Repeater with `_id` |
| Alerts / notices | `alert` | Free | |
| Google Maps embed | `google_maps` | Free | `address` string |
| Contact/signup `form` | `form` | **Pro** | Free fallback: `shortcode` widget for the user's form plugin, or `html` |
| Raw/unmappable markup | `html` | Free | Last resort — flag every use to the user |
| Nav menus (`nav`) | — | — | Don't convert; menus belong to the theme/header. Tell the user. Only if they insist: `html` widget |

## Widget settings examples

### heading

```json
{
  "id": "c3d4e5f",
  "elType": "widget",
  "widgetType": "heading",
  "isInner": false,
  "settings": {
    "title": "Build Websites Faster With AI",
    "header_size": "h1",
    "align": "center",
    "title_color": "#0F172A",
    "typography_typography": "custom",
    "typography_font_family": "Inter",
    "typography_font_size": {"unit": "px", "size": 56},
    "typography_font_size_mobile": {"unit": "px", "size": 34},
    "typography_font_weight": "700",
    "typography_line_height": {"unit": "em", "size": 1.2}
  },
  "elements": []
}
```

`header_size`: `"h1"`…`"h6"`, `"div"`, `"span"`, `"p"`. Optional `link`.

### text-editor

```json
{
  "id": "d4e5f6a",
  "elType": "widget",
  "widgetType": "text-editor",
  "isInner": false,
  "settings": {
    "editor": "<p>Launch your site in minutes. <strong>No code required.</strong></p>",
    "align": "center",
    "text_color": "#475569",
    "typography_typography": "custom",
    "typography_font_size": {"unit": "px", "size": 18},
    "typography_line_height": {"unit": "em", "size": 1.7}
  },
  "elements": []
}
```

`editor` is an HTML string — keep semantic inner markup, strip classes/ids/styles (styles move into settings).

### button

```json
{
  "id": "e5f6a7b",
  "elType": "widget",
  "widgetType": "button",
  "isInner": false,
  "settings": {
    "text": "Start Free Trial",
    "link": {"url": "https://example.com/signup", "is_external": "", "nofollow": "", "custom_attributes": ""},
    "align": "center",
    "size": "lg",
    "button_text_color": "#FFFFFF",
    "background_color": "#4F46E5",
    "hover_color": "#FFFFFF",
    "button_background_hover_color": "#4338CA",
    "border_radius": {"unit": "px", "top": "8", "right": "8", "bottom": "8", "left": "8", "isLinked": true},
    "text_padding": {"unit": "px", "top": "16", "right": "36", "bottom": "16", "left": "36", "isLinked": false},
    "typography_typography": "custom",
    "typography_font_weight": "600",
    "typography_font_size": {"unit": "px", "size": 17}
  },
  "elements": []
}
```

`size`: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`. Optional icon: `"selected_icon": {"value": "fas fa-arrow-right", "library": "fa-solid"}`, `"icon_align": "right"`.

### image

```json
{
  "id": "f6a7b8c",
  "elType": "widget",
  "widgetType": "image",
  "isInner": false,
  "settings": {
    "image": {"url": "https://example.com/screenshot.png", "id": ""},
    "image_size": "full",
    "align": "center",
    "width": {"unit": "%", "size": 100},
    "image_border_radius": {"unit": "px", "top": "12", "right": "12", "bottom": "12", "left": "12", "isLinked": true}
  },
  "elements": []
}
```

Optional link: `"link_to": "custom"`, `"link": {"url": "…"}`.

### icon-box

```json
{
  "id": "a7b8c9d",
  "elType": "widget",
  "widgetType": "icon-box",
  "isInner": false,
  "settings": {
    "selected_icon": {"value": "fas fa-bolt", "library": "fa-solid"},
    "title_text": "Lightning Fast",
    "description_text": "Pages load in under a second thanks to built-in optimization.",
    "position": "top",
    "title_size": "h3",
    "primary_color": "#4F46E5",
    "icon_size": {"unit": "px", "size": 40},
    "content_vertical_alignment": "top"
  },
  "elements": []
}
```

`position`: `"top"`, `"left"`, `"right"`. Style title/description via `title_color`, `title_typography_typography` + `title_typography_*`, `description_color`, `description_typography_*` (same activation-key pattern).

### icon-list

```json
{
  "id": "b8c9d0e",
  "elType": "widget",
  "widgetType": "icon-list",
  "isInner": false,
  "settings": {
    "icon_list": [
      {"_id": "1a2b3c4", "text": "Unlimited pages", "selected_icon": {"value": "fas fa-check", "library": "fa-solid"}},
      {"_id": "2b3c4d5", "text": "Free SSL included", "selected_icon": {"value": "fas fa-check", "library": "fa-solid"}},
      {"_id": "3c4d5e6", "text": "24/7 support", "selected_icon": {"value": "fas fa-check", "library": "fa-solid"}}
    ],
    "icon_color": "#22C55E",
    "text_color": "#334155",
    "space_between": {"unit": "px", "size": 12}
  },
  "elements": []
}
```

Every repeater item needs a unique `_id`. Items support `"link"`.

### video

```json
{
  "id": "c9d0e1f",
  "elType": "widget",
  "widgetType": "video",
  "isInner": false,
  "settings": {
    "video_type": "youtube",
    "youtube_url": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
    "aspect_ratio": "169"
  },
  "elements": []
}
```

`video_type`: `"youtube"`, `"vimeo"`, `"dailymotion"`, `"hosted"`. Options: `"autoplay": "yes"`, `"mute": "yes"`, `"loop": "yes"`, `"controls": "yes"`.

### testimonial

```json
{
  "id": "d0e1f2a",
  "elType": "widget",
  "widgetType": "testimonial",
  "isInner": false,
  "settings": {
    "testimonial_content": "This tool cut my build time in half. My clients love the results.",
    "testimonial_image": {"url": "https://example.com/avatar.jpg", "id": ""},
    "testimonial_name": "Sarah Chen",
    "testimonial_job": "Freelance Designer",
    "testimonial_alignment": "center"
  },
  "elements": []
}
```

### spacer / divider

```json
{"id": "e1f2a3b", "elType": "widget", "widgetType": "spacer", "isInner": false,
 "settings": {"space": {"unit": "px", "size": 40}}, "elements": []}

{"id": "f2a3b4c", "elType": "widget", "widgetType": "divider", "isInner": false,
 "settings": {"color": "#E2E8F0", "weight": {"unit": "px", "size": 1}}, "elements": []}
```

Prefer container `padding`/`flex_gap` over spacers — cleaner and responsive by default.

### More widgets — settings only (wrap in the standard widget envelope)

```json
"icon":        {"selected_icon": {"value": "fas fa-gem", "library": "fa-solid"}, "primary_color": "#4F46E5", "size": {"unit": "px", "size": 48}, "view": "default"}
"image-box":   {"image": {"url": "https://…", "id": ""}, "title_text": "…", "description_text": "…", "position": "top", "title_size": "h3"}
"counter":     {"starting_number": 0, "ending_number": 500, "suffix": "+", "duration": 2000, "title": "Happy Customers", "number_color": "#0F172A"}
"progress":    {"title": "Design", "percent": {"unit": "%", "size": 85}, "display_percentage": "show", "bar_color": "#4F46E5", "bar_bg_color": "#E2E8F0"}
"alert":       {"alert_type": "info", "alert_title": "Heads up", "alert_description": "…", "show_dismiss": "hide"}
"google_maps": {"address": "1600 Amphitheatre Pkwy, Mountain View CA", "zoom": {"unit": "px", "size": 14}, "height": {"unit": "px", "size": 400}}
"rating":      {"rating": {"size": 4.5}, "rating_scale": {"size": 5}}
```

`alert_type`: `info`, `success`, `warning`, `danger`. `icon` view: `default`, `stacked`, `framed`. If `rating` imports empty on an older site, calibrate — the legacy `star-rating` widget uses plain numbers.

### tabs / accordion (both use the `tabs` repeater)

```json
"settings": {
  "tabs": [
    {"_id": "3c4d5e6", "tab_title": "Monthly", "tab_content": "<p>Billed every month.</p>"},
    {"_id": "4d5e6f7", "tab_title": "Yearly", "tab_content": "<p>Two months free.</p>"}
  ]
}
```

Repeater key is `tabs` for both widgets; items are `tab_title` + `tab_content` (HTML string). Tabs also take `"type": "horizontal"|"vertical"`.

### social-icons

```json
"settings": {
  "social_icon_list": [
    {"_id": "1a2b3c4", "social_icon": {"value": "fab fa-facebook", "library": "fa-brands"}, "link": {"url": "https://facebook.com/…"}},
    {"_id": "2b3c4d5", "social_icon": {"value": "fab fa-x-twitter", "library": "fa-brands"}, "link": {"url": "https://x.com/…"}}
  ],
  "shape": "circle", "icon_color": "custom", "icon_primary_color": "#0F172A", "icon_secondary_color": "#FFFFFF"
}
```

`icon_color: "official"` uses brand colors; `"custom"` needs primary (background) + secondary (icon).

### image-carousel (gallery control — items use `id`/`url`, no `_id`)

```json
"settings": {
  "carousel": [{"id": "", "url": "https://…/1.jpg"}, {"id": "", "url": "https://…/2.jpg"}],
  "slides_to_show": "3", "slides_to_show_mobile": "1", "navigation": "both", "autoplay": "yes"
}
```

### html (last resort)

```json
{
  "id": "a3b4c5d",
  "elType": "widget",
  "widgetType": "html",
  "isInner": false,
  "settings": {"html": "<style>.badge{…}</style><div class=\"badge\">…</div>"},
  "elements": []
}
```

Every `html` widget is a conversion compromise. Use only for: inline SVGs with no FA equivalent, third-party embeds, genuinely unmappable markup. Always tell the user which parts landed in `html` widgets and why.

## Fallbacks

- **Forms (free tier)**: never fake a Pro `form` widget. Ask which form plugin the site uses and emit a `shortcode` widget (`"settings": {"shortcode": "[contact-form-7 id=\"123\"]"}`) with a placeholder id, or an `html` note block. Tell the user to swap in their real shortcode.
- **Nav menus**: skip and tell the user — headers/menus belong in the theme or Elementor Header template, not inside a page template.
- **Carousels/sliders**: free `image-carousel` handles image-only sliders. Content sliders are Pro (`slides`) — on free, flatten to a stacked layout and say so.
- **Animations**: CSS animations don't translate. Offer Elementor entrance animations instead: `"_animation": "fadeInUp"` on any widget (also `"_animation_delay": 200`).
