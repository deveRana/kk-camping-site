# Lakeora — Brand & Theme Guide

Source of truth for the site's name, look and feel. Every page, component, metadata, mock-data file and HTML mock-up must follow this.

## Brand name

- **Name:** Lakeora (display: **Lakeora Cafe** where the cafe is meant)
- Replace every old name (KK Camping, Pawna, etc.) with **Lakeora**.
- Applies to: page titles/metadata (`app/layout.tsx`), header/footer, hero copy, `lib/mock-data/*`, `app/**`, `components/**`, `html-pages/*`, `package.json` name, and any alt text.
- Do not invent a tagline that conflicts with the theme below.

## Logo

Files in `public/logos/`:

| File | Use |
|---|---|
| `logo.PNG` | Sage window on forest-green background (hero, dark sections, social) |
| `lakeora cafe .png` | Sage window, transparent/white background (light header, light sections) |
| `IMG_9824.PNG` | Dark-green window on sage background (alt / OG image) |
| `lakeora cafe logo.png` | Dark-green window, transparent/white background (light pages, print) |

Logo = arched window split into four panes: sunrise over water, bird on branch, steaming coffee cup, location pin with fork & knife. Wordmark "Lakeora cafe" in a classic serif with small caps.

## Theme / mood

Calm, lakeside, nature-first, cozy and slow-paced. A boutique retreat: sunrise views, birdsong, coffee and good food. Minimal and earthy, not loud or adventure-sport.

## Color palette

| Token | Hex (approx.) | Use |
|---|---|---|
| `forest` | `#234B37` | Primary: header, buttons, headings, dark sections |
| `sage` | `#A8C8A6` | Secondary: cards, highlights, section backgrounds, hover |
| `ink` | `#1A1A18` | Body text on light, line-art |
| `stone` | `#B3B3B3` | Muted lines/text on dark green |
| `paper` | `#FFFFFF` / off-white `#F7F9F5` | Page background |

Rules:
- Light pages: paper background, forest text/buttons, sage accents.
- Dark sections: forest background, sage/white text.
- Replace any existing orange/brown/blue "camping" colors with the above.
- Keep contrast accessible (forest on white, sage on forest for large text only).

## Typography

- **Headings / wordmark:** elegant serif with small-caps feel (Cormorant Garamond, Cinzel or similar).
- **Body:** clean sans-serif (Inter or system sans).
- Headings in forest green; generous letter-spacing on small uppercase labels.

## Imagery & icons

- Thin single-weight line-art icons (sun, water, bird, cup, pin), matching the logo style.
- Photography: lakes, sunrise/sunset, greenery, birds, cafe/coffee, food. Soft natural light.
- Arched (rounded-top) frames for images/cards echo the logo window.

## UI feel

- Rounded-top arch shapes as a recurring motif, thin dividers (the window cross).
- Plenty of whitespace, soft shadows, subtle transitions.
- Tone of copy: warm, peaceful, welcoming.

## Rollout checklist

- [ ] Add colors/fonts as theme tokens (Tailwind/CSS variables in `app/globals.css`)
- [ ] Rename brand in `app/layout.tsx` metadata, Header, Footer
- [ ] Add logo to header/footer/favicon
- [ ] Update `lib/mock-data/*` copy and names
- [ ] Update all `app/**` pages and `components/**`
- [ ] Update `html-pages/*` mock-ups
- [ ] Update `package.json` name and docs
