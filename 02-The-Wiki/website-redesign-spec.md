# VIP Premier Website Redesign Specification

## Architecture Overview
We are building a highly interactive, Vite + React frontend component that will either serve as a standalone, highly-optimized landing funnel or be embedded into the existing WordPress site via a shortcode/iframe to preserve existing SEO while delivering a premium user experience.

## Goal
Build the "Custom Color Scheme Visualization" landing experience.

## Components to Build

### 1. Hero Section
- **Visuals:** Full bleed cinematic image (Placeholder: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop`).
- **Copy:** "Makeover Visualized First, Then Painted." 
- **Action:** A "Book Complimentary Estimate" button pointing to the contact modal.

### 2. The Interactive Timeline (Before -> Visualization -> After)
This is a custom interactive component. It should allow the user to slide or step through three phases of a luxury home:
- **Phase 1 (Before):** Outdated home. Placeholder: `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop` (Desaturated or older looking home).
- **Phase 2 (Visualization):** The "Digital Twin". UI overlays showing a color picker (Sherwin-Williams Emerald palettes) changing the house color in real-time.
- **Phase 3 (After):** The flawlessly painted result. Placeholder: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop`.

*Technical Detail:* Use a dragged slider or a scroll-linked animation leveraging `framer-motion` to transition the image states smoothly. Ensure touch compatibility for mobile.

### 3. SEO & WordPress Integration
- Ensure all React Helmet tags or standard HTML meta tags are populated correctly if hosted standalone.
- Expose the main interactive timeline as a buildable widget that can be easily injected into WordPress if the client opts to keep WP for the main routing.

## Execution Rules for Claude
1. Read the `DESIGN.md` in the root of the workspace. Strictly adhere to the typography, color, and spacing constraints.
2. Initialize the Vite + React workspace in a new directory: `frontend-app`.
3. Use Vanilla CSS or Tailwind depending on your preference, but ensure styling matches the Apple/Ferrari extreme sparsity luxury aesthetic.
4. Replace the "Accent Color" in `DESIGN.md` with the exact hex of the current VIP Home Painting brand colors prior to finalizing.
