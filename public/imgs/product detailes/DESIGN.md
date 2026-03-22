# Design System Document

## 1. Overview & Creative North Star: "The Culinary Curator"

This design system moves away from the generic "grid-and-border" aesthetic of standard food delivery apps to embrace a high-end editorial experience. We define our Creative North Star as **"The Culinary Curator."** 

The goal is to treat food discovery like a premium lifestyle magazine. We achieve this by prioritizing breathing room, using intentional tonal shifts instead of rigid lines, and employing a sophisticated "Teal & Terracotta" palette that feels organic and appetizing. By leveraging overlapping elements (like profile badges breaking the hero container) and high-contrast typography scales, we create a digital environment that feels curated, not just automated.

---

## 2. Colors: Tonal Depth over Borders

Our palette is anchored by the deep, authoritative `primary` teal (#046453) and its more approachable `primary_container` (#2D7D6B). This is balanced by a high-energy `secondary` red for urgency and appetite, and a sophisticated `tertiary` earth-tone for secondary accents.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Structural boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a clear, sophisticated boundary without the visual "noise" of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create depth:
- **Level 0 (Base):** `surface` (#f9f9f9) for the global background.
- **Level 1 (Sections):** `surface_container_low` (#f3f3f3) for secondary content zones or sidebars.
- **Level 2 (Interactive):** `surface_container_lowest` (#ffffff) for primary cards to make them "pop" against the section background.

### The Glass & Gradient Rule
To prevent a "flat" feel, use **Glassmorphism** for floating navigation bars or overlays. Utilize semi-transparent versions of `primary` or `surface` with a 12px-20px backdrop blur. 
*   **Signature Texture:** Use subtle linear gradients transitioning from `primary` (#046453) to `primary_container` (#2D7D6B) on large CTA buttons and hero accents to provide a sense of volume and premium polish.

---

## 3. Typography: Editorial Authority

We use a duo-font system to balance character with utility. **Plus Jakarta Sans** provides a modern, geometric feel for high-impact displays, while **Work Sans** ensures maximum legibility for functional data.

*   **Display & Headline (Plus Jakarta Sans):** These are the "voice" of the brand. Use `display-lg` for hero messaging to establish an immediate editorial tone.
*   **Titles & Body (Work Sans):** Used for dish names, descriptions, and functional labels. The generous x-height of Work Sans ensures readability even at `body-sm` (0.75rem).
*   **Visual Hierarchy:** Establish dominance by pairing a bold `headline-md` dish title with a muted `label-md` category tag. This high contrast in scale—not just color—guides the user's eye effortlessly through the menu.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are a fallback, not a standard. We convey hierarchy through **Tonal Layering**.

*   **The Layering Principle:** Stack `surface_container_lowest` cards on top of a `surface_container` background. This creates a soft, natural "lift" that mimics physical paper.
*   **Ambient Shadows:** If a card requires a floating state (e.g., on hover), use an extra-diffused shadow: `box-shadow: 0 8px 32px rgba(26, 28, 28, 0.06)`. The shadow color must be a tinted version of `on_surface` to look natural, never pure black.
*   **The Ghost Border:** If a boundary is strictly required for accessibility, use the `outline_variant` token at 15% opacity. **Never use 100% opaque borders.**
*   **Backdrop Blur:** Floating elements (like the "Top Dishes" header) should use a semi-transparent `surface_container_highest` with a blur effect to let the vibrant food imagery bleed through, softening the layout's edges.

---

## 5. Components

### Buttons
- **Primary:** Gradient-filled (`primary` to `primary_container`), roundedness `full`, `title-sm` (Work Sans) in `on_primary`. 
- **Secondary:** Surface-filled (`surface_container_highest`) with `on_surface` text. No border.
- **Tertiary:** Text-only in `primary`, using `label-md` for a clean, navigational look.

### Cards & Lists
- **The Golden Rule:** Forbid the use of divider lines. Separate items using `spacing-6` (1.5rem) or by alternating background tones between `surface_container_low` and `surface_container_lowest`.
- **Menu Items:** Use a `surface_container_lowest` card with a `xl` (0.75rem) corner radius. Imagery should be full-bleed at the top to emphasize the "editorial" feel.

### Chips (Category Selectors)
- **Stateful:** Active chips use the `secondary` (#b3272a) background to denote "Hot" or "Active" selections (e.g., Breakfast/Lunch/Dinner). 
- **Shape:** Use `full` roundedness to contrast against the more structured card shapes.

### Input Fields
- Avoid "box" inputs. Use a `surface_container_high` background with a subtle bottom-heavy padding. Focus states should transition to a `primary` "Ghost Border" (20% opacity).

### Navigation
- **Navigation Bar:** Use a high-contrast `primary` background with `on_primary` text.
- **Sidebars:** Use `surface_container_low` to create a distinct functional zone without needing a vertical separator line.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Let the restaurant profile image overlap the hero banner to break the "web-template" feel.
*   **Do** use the Spacing Scale strictly. Use `spacing-12` or `spacing-16` for section headers to give the eye a place to rest.
*   **Do** prioritize "Appetite Appeal." Use large, high-quality imagery that spans the full width of containers.

### Don't:
*   **Don't** use 1px solid black or grey borders. This immediately cheapens the brand.
*   **Don't** use standard Material Design drop shadows. Keep them diffused and tinted.
*   **Don't** crowd the interface. If a layout feels busy, increase the background-color contrast between sections instead of adding more lines or text.
*   **Don't** use pure #000000 for text. Use `on_surface` (#1a1c1c) for a softer, premium feel.