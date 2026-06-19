# VIP Premier Painting — VIP Lead Machine

Welcome to the VIP Premier Painting lead acquisition, community landing page, and estimation system.

## ⚜️ Design System & Authority Guidelines

The single source of truth for all VIP Premier Painting design tokens, typography, and styling is the canonical stylesheet:
🔗 **[colors_and_type.css](file:///c:/Users/Owner/VIP-Lead-Machine/assets/css/colors_and_type.css)**

### 🎨 Canonical Color System

All generated pages, templates, and frontend components must strictly adhere to the following color palette:

| Token Name | Canonical Hex | Usage / Role |
| :--- | :--- | :--- |
| `--vip-gold` | `#C9A961` | **Primary Luxury Gold** — CTAs, buttons, headline accents, active states |
| `--vip-gold-deep` | `#A88A47` | **Deep Luxury Gold Accent** — Hover states, serif italic emphasis |
| `--vip-gold-bright` | `#FFB200` | **Bright Badge Gold** — Laurel highlights, 5-star rating icons *ONLY* |
| `--vip-navy` | `#1A1F4E` | **Primary Navy** — Text on light background, dark section backgrounds |
| `--vip-navy-deep` | `#141838` | **Deep Navy** — Footer backgrounds, deepest dark layers |
| `--vip-cream` | `#F5EFE2` | **Warm Cream** — Primary alternating background surfaces |
| `--vip-orange` | `#E8833A` | **Secondary Brand Accent** — Accent bands, secondary highlights *ONLY* (never primary CTAs) |
| `--vip-beige` | `#BAAEA1` | **Warm Gray** — Card borders, subtle separators, subheadings |

### 🚫 Banned / Deprecated Colors & Tokens

Do **NOT** use the following deprecated colors or tokens under any circumstances:
- **Banned Gold:** `#FF8210` (Replaced by `#C9A961`)
- **Banned Navy:** `#262362` (Replaced by `#1A1F4E`)
- **Banned Shadow Base:** `rgba(38,35,98, x)` (Replaced by `rgba(26,31,78, x)`)
- **Banned Token:** `--shadow-cta` or `--shadow-cta-hover` (Replaced by `--shadow-gold` / `--shadow-gold-hover`)

---

## 🚀 Execution & Implementation Rules
1. **No Inline redefinitions:** Never redefine `:root` variables outside of `colors_and_type.css`.
2. **Page Linkage:** All community landing pages must include `<link rel="stylesheet" href="assets/css/colors_and_type.css">` to import the design system.
3. **No AI Jargon:** Customer-facing copy must **NEVER** mention "AI", "automated", "algorithm", or "machine learning". Use premium terms such as "Custom Visualization Service" or "our design team".
4. **Tone & Audience:** Professional, high-end, and aspirational copy tailored for ultra-high-net-worth homeowners ($2M–$20M estates).
