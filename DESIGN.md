# Design System Strategy: The Luminous Engineering Collective

## 1. Overview & Creative North Star: "Precision Vitality"
This design system moves beyond the nostalgic tropes of Frutiger Aero to create a sophisticated, high-tech editorial experience. Our Creative North Star is **"Precision Vitality"**—the intersection of rigorous engineering data and the organic fluidity of the natural world. 

Instead of static, boxy templates, this system utilizes **intentional asymmetry** and **layered translucency**. We break the "web-standard" look by allowing high-tech data visuals and glowing orbs to bleed across container boundaries, suggesting a UI that isn't contained by a screen, but rather projected into a 3D space.

## 2. Colors & Surface Philosophy
The palette is a high-energy spectrum of atmospheric blues and kinetic greens, designed to feel pressurized and premium.

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through tonal shifts or backdrop filters. Use `surface-container-low` (#e8f2f9) against a `background` (#eff8fe) to create structural definition. This ensures the UI feels like a seamless piece of hardware rather than a collection of HTML boxes.

### Surface Hierarchy & Nesting
Treat the layout as a series of stacked, frosted glass panes:
*   **Base Layer:** `surface` (#eff8fe) for the global canvas.
*   **Secondary Zones:** `surface-container` (#dfeaf1) for sidebar or utility regions.
*   **Active Content Cards:** `surface-container-lowest` (#ffffff) to provide a "pop" of high-contrast clarity.
*   **Interaction States:** Use `primary-container` (#00cbfe) as a vibrant, glowing base for active selection or high-priority highlights.

### The Glass & Gradient Rule
To achieve the signature "Tech" feel, utilize **Glassmorphism** for floating panels (e.g., Modals, Navigation bars). 
*   **Implementation:** Apply `surface-container-low` at 60% opacity with a `20px` to `40px` backdrop-blur. 
*   **Gradients:** CTAs should never be flat. Use a linear gradient from `primary` (#00647e) to `primary-container` (#00cbfe) at a 135° angle to simulate a light source hitting a curved glass surface.

## 3. Typography: The Technical Editorial
We pair **Space Grotesk** (Display/Headlines) with **Manrope** (Body) to balance "Engineering" with "Readability."

*   **The Power Scale:** Use `display-lg` (3.5rem) for hero moments, set with `-0.04em` letter spacing. This creates a high-end, "compressed" technical look.
*   **Data density:** Use `label-md` and `label-sm` (Space Grotesk) for metadata and technical specs. These should be set in `on-surface-variant` (#545d62) or `secondary` (#006859) to distinguish them from narrative text.
*   **Body Narrative:** `body-lg` (Manrope) provides a sophisticated, humanist contrast to the rigid technicality of the headlines, ensuring the "Premium" feel isn't lost to "Coldness."

## 4. Elevation & Depth
Depth is not achieved through shadow "casting," but through **Tonal Layering** and **Ambient Refraction.**

*   **Layering Principle:** Stack `surface-container-highest` (#d1dfe7) elements on top of `surface-dim` (#c8d7df) to create natural prominence.
*   **Ambient Shadows:** When an element must float (e.g., a hover state), use a shadow with a blur of `32px`, offset `Y: 16px`, at 6% opacity using the `primary` (#00647e) color. This mimics light passing through blue-tinted glass.
*   **The Ghost Border:** If separation is required in high-density data views, use the `outline-variant` (#a5aeb4) at **15% opacity**. Never 100%.

## 5. Components & Interaction

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. `Roundedness: full` (9999px) to mimic a polished pill or glass capsule. 
*   **Secondary:** `surface-container-lowest` with a `1px` Ghost Border (15% opacity `outline-variant`).
*   **Tertiary:** `on-primary-container` text with no container; on-hover, reveal a subtle `secondary-container` (#26fedc) glow.

### Cards & Data Modules
*   **Strict Rule:** No dividers. Use `spacing-6` (2rem) of vertical white space or a shift to `surface-container-low` to separate items.
*   **Tech Grids:** Incorporate a subtle `1px` grid pattern (using `outline-variant` at 5% opacity) into the background of `surface-container-highest` modules to reinforce the engineering aesthetic.

### Input Fields
*   **Styling:** Use `surface-container-low` with a bottom-only "active" line in `secondary` (#006859). On focus, the background should transition to `surface-container-lowest` with a subtle `secondary-fixed` (#26fedc) outer glow.

### Signature Component: The "Orbital HUD"
*   A custom data visualization component featuring a central `primary` orb with a `tertiary-fixed` (#cafd00) neon green pulse, surrounded by rotating `label-sm` technical readouts. This acts as a loading state or high-level status indicator.

## 6. Do’s and Don’ts

### Do:
*   **Overlap Elements:** Let high-tech data visuals (SVG paths, nodes) tuck behind glass cards.
*   **Use Neon Sparingly:** Use `tertiary` (#4e6300) and `secondary-fixed` (#26fedc) only for "live" data or critical action points to maintain the premium feel.
*   **Asymmetric Grids:** Align text to a strict grid, but let background "glowing orbs" be organic and off-center.

### Don’t:
*   **Don't use pure black:** Use `inverse-surface` (#070f13) for deep contrast; pure black kills the "glass" illusion.
*   **Don't use hard corners:** Stick to the `md` (0.75rem) and `lg` (1rem) roundedness scale to maintain the aerodynamic "Aero" feel.
*   **Don't clutter:** High-end engineering is about clarity. If a visual doesn't provide data or necessary "vibe," remove it.