---
name: Obsidian Deep
colors:
  surface: '#0f131e'
  surface-dim: '#0f131e'
  surface-bright: '#353945'
  surface-container-lowest: '#0a0e19'
  surface-container-low: '#171b27'
  surface-container: '#1b1f2b'
  surface-container-high: '#262a36'
  surface-container-highest: '#313441'
  on-surface: '#dfe2f2'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dfe2f2'
  inverse-on-surface: '#2c303c'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#a1c9ff'
  on-secondary: '#00325a'
  secondary-container: '#0072c4'
  on-secondary-container: '#f0f4ff'
  tertiary: '#ffb596'
  on-tertiary: '#581e00'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#a1c9ff'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#004880'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#0f131e'
  on-background: '#dfe2f2'
  surface-variant: '#313441'
  surface-sidebar: '#0F172A'
  surface-card: '#151C2F'
  border-subtle: rgba(255, 255, 255, 0.08)
  success: '#22C55E'
  warning: '#F59E0B'
  danger: '#EF4444'
  text-primary: '#F8FAFC'
  text-secondary: '#94A3B8'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  sidebar-width: 280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is engineered for high-velocity enterprise workflows, blending the precision of developer-centric tools with the spatial depth of modern operating systems. The aesthetic is "Dark Mode Only," prioritizing focus by reducing ocular strain and visual noise.

The style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes a "layered dark" approach where depth is communicated through subtle shifts in background luminosity and blurred translucent overlays. The interface should feel intelligent and responsive, utilizing "border glows" and precision micro-interactions to provide immediate feedback. The goal is to create a premium, "pro-grade" environment that feels less like a website and more like a high-performance desktop application.

## Colors

The palette is anchored in a deep navy-black foundation to provide a sophisticated backdrop for vibrant functional accents. 

- **Foundation:** The background uses `#090D18`, with elevated surfaces scaling up in luminosity (`#0F172A` for sidebars and `#151C2F` for cards) to create a clear structural hierarchy without relying on heavy borders.
- **Action:** Primary actions utilize `#2563EB` (Blue). For high-visibility accents and interactive states, a brighter `#5AA9FF` is used to maintain contrast against the dark background.
- **Status:** Semantic colors (Success, Warning, Danger) are saturated and clear, ensuring critical system states are immediately recognizable.
- **Accents:** Use `rgba(255, 255, 255, 0.08)` for structural borders to maintain a "low-noise" aesthetic.

## Typography

This design system uses **Inter** exclusively to achieve a systematic, utilitarian aesthetic that remains highly readable at all scales.

- **Scale:** Large headings use tight letter-spacing (`-0.02em`) to feel punchy and editorial. 
- **Hierarchy:** Use `label-md` (uppercase, tracked out) for metadata, section headers in sidebars, and small captions to provide clear contrast against body text.
- **Readability:** Body text is set with generous line-heights (1.5x - 1.6x) to ensure long-form project data remains legible.
- **Responsive:** On mobile devices, display and headline sizes should be reduced to prevent excessive word-breaking, prioritizing the `headline-lg-mobile` spec for primary page titles.

## Layout & Spacing

The system follows a strict **4px grid** for internal component spacing and an **8px grid** for layout-level spacing.

- **Layout Model:** Use a **Fixed Grid** for main content areas (max-width 1440px) to ensure dashboards don't become overly dispersed on ultra-wide monitors. The sidebar is a fixed 280px element.
- **Responsiveness:**
  - **Desktop:** 12-column grid, 40px margins, 24px gutters.
  - **Tablet:** 8-column grid, 24px margins, 16px gutters.
  - **Mobile:** 4-column grid, 16px margins, 12px gutters.
- **Rhythm:** Use large vertical padding (64px+) between major sections to emphasize the minimal, "airy" brand personality.

## Elevation & Depth

Depth is established through a combination of **Tonal Layers** and **Glassmorphism**.

1.  **Base Layer:** `#090D18` (The canvas).
2.  **Navigation Layer:** Sidebar at `#0F172A` with a subtle 1px right-border.
3.  **Content Layer:** Cards and containers at `#151C2F`.
4.  **Floating Layer:** Modals and dropdowns use a semi-transparent version of the surface color with a `backdrop-blur` of 12px-20px.

**Shadows:** Shadows should be used sparingly. When used, they must be "Ambient Shadows"—large, extremely soft, and slightly tinted with the Primary Blue color (e.g., `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 99, 235, 0.1)`).

**Borders:** Use subtle, semi-transparent white borders (`rgba(255,255,255,0.08)`) to define shapes without creating high-contrast visual noise.

## Shapes

The design system uses a **Rounded** language (Base: 8px) to soften the "enterprise" feel and align with modern OS aesthetics.

- **Small Components:** Buttons and Input fields use 8px (`rounded`).
- **Containers:** Cards, modals, and main content wrappers use 16px (`rounded-xl`).
- **Interactive Elements:** Hover states for list items or navigation links should use a slightly smaller radius (6px) to nest perfectly within larger containers.

## Components

### Buttons
Primary buttons use the Primary Blue gradient with a subtle inner-glow on the top edge. Secondary buttons are "Ghost" style—transparent backgrounds with a `border-subtle` that illuminates on hover.

### Cards
Cards are the primary data container. They feature a `1px` subtle border. On hover, the border should transition to a Primary Blue glow (`rgba(37, 99, 235, 0.3)`) to indicate interactivity.

### Input Fields
Inputs are dark-filled (`#090D18`) with a `1px` border. The focus state should utilize a "ring" effect: a 2px blue glow that feels integrated into the element rather than an external stroke.

### Lists & Tables
Rows should have generous height (48px-56px). Hover states should use a subtle background highlight (`rgba(255, 255, 255, 0.04)`) with perfectly rounded corners (6px).

### Chips / Tags
Tags use low-saturation versions of semantic colors with high-saturation text to maintain readability while appearing premium. For example, a "Success" tag would have a `rgba(34, 197, 94, 0.1)` background and `#22C55E` text.

### Glass Modals
Modals must use `backdrop-filter: blur(16px)` and a thin gradient border to simulate a physical glass pane floating over the interface.