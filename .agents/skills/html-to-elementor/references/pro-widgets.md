# Elementor Pro Widgets (load only when the user confirms Pro)

Pro widget keys drift more between versions than free ones. If the conversion matters, **calibrate from one of the user's exports first** (`scripts/calibrate_from_export.py`). All snippets below are `settings` only — wrap in the standard widget envelope.

### form

```json
{
  "form_name": "Contact",
  "form_fields": [
    {"_id": "5e6f7a8", "custom_id": "name", "field_type": "text", "field_label": "Name", "placeholder": "Name", "required": "true", "width": "100"},
    {"_id": "6f7a8b9", "custom_id": "email", "field_type": "email", "field_label": "Email", "required": "true", "width": "100"},
    {"_id": "7a8b9c0", "custom_id": "message", "field_type": "textarea", "field_label": "Message", "width": "100"}
  ],
  "button_text": "Send",
  "success_message": "Thanks — we'll be in touch."
}
```

`field_type`: `text`, `email`, `textarea`, `tel`, `url`, `select`, `checkbox`, `radio`, `acceptance`, `number`, `date`, `upload`, `hidden`. `width` is a string percent per field. Email delivery (Actions After Submit) is configured on-site — tell the user to set it after import.

### nav-menu

```json
{"menu": "main-menu", "layout": "horizontal"}
```

`menu` is the site's menu slug — it won't exist on import; the user must reselect their menu in the editor. Still usually better to leave menus to the theme/header template.

### slides

```json
{
  "slides": [
    {"_id": "8b9c0d1", "heading": "Headline", "description": "Sub copy", "button_text": "Learn More",
     "link": {"url": "https://…"}, "background_color": "#0F172A", "background_image": {"url": "https://…", "id": ""}}
  ],
  "navigation": "both", "autoplay": "yes", "transition": "slide"
}
```

### price-table

```json
{
  "heading": "Pro", "sub_heading": "For freelancers",
  "currency_symbol": "dollar", "price": "29", "period": "/mo",
  "features_list": [
    {"_id": "9c0d1e2", "item_text": "Unlimited sites", "selected_item_icon": {"value": "fas fa-check", "library": "fa-solid"}}
  ],
  "button_text": "Choose Plan", "link": {"url": "https://…"}
}
```

### animated-headline

```json
{"headline_style": "rotate", "animation_type": "typing", "before_text": "Build sites", "rotating_text": "faster\nsmarter\nbetter", "after_text": ""}
```

`headline_style: "highlight"` instead uses `highlighted_text` + `marker` shape (`circle`, `underline`, `double_underline`, …).

### countdown

```json
{"due_date": "2026-12-31 23:59"}
```
