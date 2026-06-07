# Librory Branding Guide

Welcome to the Librory branding guide. This document outlines the core visual identity, typography, colors, and editorial motifs that give the Librory landing page its distinct, warm, and literary aesthetic.

## 1. Design Philosophy
Librory embraces a deeply literary and tactile design language. By using realistic paper textures, editorial typography, and ambient lighting themes, the interface feels like a physical book or a cozy reading nook. The design relies on subtle grain, vignettes, and rich typographic hierarchy to create a premium reading experience.

## 2. Ambient Themes (Color Palettes)
The project utilizes a dynamic, CSS variables-based theme system with four distinct "ambient" modes. These modes gracefully transition and set the mood:

- **Ambient Paper (Default):** A classic, warm paper look.
  - Page: `#ECE2D8` | Ink: `#221A12` | Accent: `#8B5A2B` | Ember: `#C8612A`
- **Ambient Morning:** A cool, refreshing morning light.
  - Page: `#E2E8E6` | Ink: `#1E2A26` | Accent: `#4F6F65` | Ember: `#B85A2E`
- **Ambient Dusk:** A warm, golden-hour twilight.
  - Page: `#E8D4C2` | Ink: `#2C1A12` | Accent: `#A04E2A` | Ember: `#C24B1E`
- **Ambient Candle:** A dark mode lit by flickering candlelight.
  - Page: `#1A130E` | Ink: `#F1E5D2` | Accent: `#D08A4A` | Ember: `#E2915A`

### Semantic Color Roles
- `--page`, `--paper`, `--paper-deep`: Background and surface colors.
- `--ink`, `--ink-soft`, `--muted`: Text colors for hierarchy.
- `--rule`, `--rule-soft`: Used for dividers and borders.
- `--accent`, `--accent-soft`, `--ember`: Highlights and focal points.

## 3. Typography
The typography is heavily inspired by classic editorial and book design. 

- **Body (Serif):** `Lora` – Used as the default body text for maximum readability and literary feel.
- **Display (Serif):** `Playfair Display` – High-contrast serif used for large, elegant headings.
- **Sans-Serif:** `Libre Franklin` – Used sparingly for technical or structural elements like 'eyebrows' and brackets.
- **Script:** `Reenie Beanie` – Adds a handwritten, human touch for marginalia and drop caps.

### Typographic Scale
- **Headings (`h1` to `h3`):** Tight line-heights (`0.92` to `1.2`) and negative letter-spacing for a refined, print-like appearance. Sizes range from `1.85rem` up to `7.5rem` (`h1-xl`).
- **Body & Dek:** Generous line-heights (`1.78` for body) to ensure comfortable long-form reading.
- **Eyebrow:** Small (`0.7rem`), uppercase, with wide tracking (`0.18em`) for section labels.

## 4. Editorial Motifs & UI Elements
The CSS includes custom utility classes that mimic physical book elements:

- **`.drop-cap`**: A large, floated initial letter using the script font to start a chapter or section.
- **`.marginalia`**: Handwritten notes angled slightly (`-rotate-2`) for a realistic marginal note effect.
- **`.asterism`** & **`.rule-mark`**: Classic typographic dividers flanked by horizontal rules.
- **`.bracketed`**: Elements enclosed in sans-serif brackets `[ ]` for annotations or metadata.
- **`.eyebrow`**: Small uppercase headers for categorizing content.
- **`.dingbat-row`**: Decorative symbols used as section breaks.

## 5. Textures & Effects
To achieve the tactile realism, the project applies global effects:

- **Paper Grain:** A fixed, full-screen SVG fractal noise (`feTurbulence`) overlay is blended using `mix-blend-mode: multiply` (or `screen` in Candle mode) to give the screen a physical texture.
- **Vignette:** A dark radial gradient applied over the entire screen darkens the outer edges, simulating a spotlight or natural page lighting.
- **Shadows:** Custom shadows (`glow`, `seal`, `seal-dark`) provide depth, mimicking stamped seals or soft light diffusion.
- **Animations:** Custom animations like `ember-breathe` add subtle life to elements by scaling and casting a pulsing drop-shadow.
