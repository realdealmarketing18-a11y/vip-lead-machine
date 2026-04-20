# VIP Premier Painting Design System

**Vibe:** Professional, High-End, Aspirational. "Makeover Visualized First, Then Painted." 
**Target Audience:** $150K+ HHI, $2M+ homes (e.g., The Bridges).
**Inspiration:** Apple (premium whitespace, large imagery), Ferrari (extreme sparseness, stark contrast).

## 1. Visual Theme & Atmosphere
- **Extreme Sparsity:** Let the high-definition photography of luxury homes do the talking.
- **Cinematic Drama:** Use deep dark backgrounds overlaid with high-contrast, perfectly lit imagery to make the paint colors vibrant.
- **Micro-interactions:** Soft, ease-in-out animations. No erratic bouncing or generic library animations. Keep it solid, smooth, and grounded.

## 2. Color Palette & Roles
> **Note to Claude:** Extract the exact hex codes from the current `viphomepainting.com` to replace the primary accent if necessary.

| Role | Hex | Usage |
|------|-----|-------|
| **Background (Void)** | `#0A0A0A` | Main application background. True black cinematic canvas. |
| **Surface (Elevated)**| `#111111` | For cards, modals, and the visualization timeline container. |
| **Accent (Gold/Rich)** | `#D4AF37` | **Use Brand Color Here.** Primary CTAs, active states, timeline progress. |
| **Text Primary** | `#FFFFFF` | Headlines, primary body text. High contrast on void. |
| **Text Secondary** | `#888888` | Subtext, less critical labels. Soft and elegant. |

## 3. Typography Rules
- **Primary Typeface:** `Inter`, `Outfit` or `SF Pro Display`.
- **Headings:** Massive, tight letter-spacing. `-2%` tracking for main heroic headlines.
- **Body:** Weight 300 (Light) or 400 (Regular). 150% line height for readable elegance.
- **Format:** Always format comparisons or dense data as Markdown tables or structured grids.

## 4. Component Stylings
- **Buttons (Primary):** Solid Accent Color. No border radius (`0px`) or extremely slight (`2px`) for a sharp, architectural feel. Hover state dims slightly, no border.
- **Interactive Timeline (Before -> Simulation -> After):**
  - **Slider/Drag knob:** Minimalist white vertical line with a subtle drop shadow.
  - **Images:** Must be identical angles, transitioning flawlessly. 
- **Cards/Images:** Zero radius. Edge-to-edge full bleed where possible.

## 5. Depth & Elevation
- Do not use traditional drop shadows on dark mode. Use subtle border lighting (`1px solid rgba(255,255,255,0.05)`) to create separation.

## 6. Do's and Don'ts
- **DO:** Use large, full-width placeholders for hero images (e.g., Unsplash premium architecture).
- **DO NOT:** Use overly round corners (gives a friendly/cheap SaaS vibe, not luxury).
- **DO NOT:** Use generic "AI" text in customer-facing copy. Use terms like "Digital Twin", "Custom Visualization".

## 7. Responsive Behavior
- **Mobile First:** Ensure the Before/After timeline slider works perfectly via touch tracking.
- **Desktop:** Expand the timeline to take up majestic cinematic screen real-estate.
