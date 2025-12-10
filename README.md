# Heat Shock Pineapple – Hub

This repo contains the hub site for **J. R. Hernandez** – a focused landing page that routes to three main pillars:

- **Portfolio** – protein biochemistry, assay development, and molecular logic  
- **Photography** – light, cities, and quiet moments  
- **Journal** – essays and field notes

The page is intentionally minimal: one intro, three strong cards, and a footer.

---

## Tech Stack

- Framework: Astro (static site)
- Styling: Custom CSS + shared design tokens  
  - `@heatshockpineapple/design-tokens/src/theme-base.css`
- Type config: Astro strict TS config (`astro/tsconfigs/strict`)
- Deployment: Static build (e.g. GitHub Pages) with a `CNAME` for the custom domain

---

## Project Structure

    .
    ├── astro.config.mjs
    ├── CNAME
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── tsconfig.json
    ├── public
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   ├── apple-touch-icon.png
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   ├── favicon.ico
    │   ├── images
    │   │   ├── image3.jpg
    │   │   ├── IMG_9577.jpg
    │   │   ├── photo2.jpg
    │   │   └── portrait.jpg
    │   ├── robots.txt
    │   ├── site.webmanifest
    │   └── social-preview.png
    └── src
        └── pages
            └── index.astro

### Key files

- `src/pages/index.astro`  
  Main hub page. Contains:
  - Header (logo + contact)
  - Intro section (“Experiments, code, and light.”)
  - Three cards (Portfolio / Photography / Journal)
  - Footer

- `public/`  
  Static assets:
  - Favicons and `site.webmanifest`
  - `images/` used for the three cards and portrait
  - `robots.txt` and `social-preview.png`

- `CNAME`  
  Binds the deployed site to the custom domain (for example: `heatshockpineapple.com`).

- `tsconfig.json`  
  Extends `astro/tsconfigs/strict` and is ready for future `.astro` / TypeScript files.

---

## Getting Started

Install dependencies:

    npm install

Run the dev server:

    npm run dev

Astro will print the local dev URL in the terminal (typically something like `http://localhost:4321`).

---

## Building for Production

Create a production build:

    npm run build

Preview the production build locally:

    npm run preview

The static site is output to the `dist/` directory and can be deployed to:

- GitHub Pages  
- Netlify / Vercel / Cloudflare Pages  
- Any static host

The `CNAME` file ensures the custom domain is preserved on deploy (for GitHub Pages–style workflows).

---

## Customization

### Intro text

Edit the intro section in `src/pages/index.astro`:

- Eyebrow line: “Experiments, code, and light.”
- Body: short bio describing Jason as a scientist and photographer

Adjust those two lines to change the tone of the page.

### Card content

Each pillar is a single card:

- Portfolio – class `t-research`
- Photography – class `t-photos`
- Journal – class `t-journal`

Update:

- Labels (e.g. “01 // Research”)
- Titles (“Portfolio”, “Photography”, “Journal”)
- Descriptions
- Button text
- `href` targets (subdomains or paths)

### Images

Card images and the portrait live under `public/images/`.

You can:

- Replace the existing files with new images using the same filenames, or  
- Add new images and update the `src` attributes in `index.astro`.

---

## Notes

- Global colors and typography come from the design tokens in  
  `@heatshockpineapple/design-tokens/src/theme-base.css`.
- The layout is intentionally lean: one page that clearly routes out to:
  - `https://portfolio.heatshockpineapple.com`
  - `https://photos.heatshockpineapple.com`
  - `https://blog.heatshockpineapple.com`

This repo is meant to stay small and focused as the front door to the larger Heat Shock Pineapple ecosystem.