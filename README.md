# Heat Shock Pineapple – Hub

This repo contains the hub site for **J. R. Hernandez** – a focused landing page that routes to three main pillars:

- **Portfolio** – protein biochemistry, assay development, and molecular logic
- **Photography** – light, cities, and quiet moments
- **Journal** – essays and field notes

The page is intentionally minimal: one intro, three strong cards, and a footer.

---

## Tech Stack

- **Framework**: Astro (static site)
- **Styling**: Custom CSS + shared design tokens
  - `@heatshockpineapple/design-tokens/src/theme-base.css`
- **Integrations**:
  - `@astrojs/sitemap` (automated SEO)
  - `astro:assets` (image optimization)
- **Deployment**: GitHub Actions (automated build & deploy to GitHub Pages)

---

## Project Structure

    .
    ├── .github
    │   └── workflows
    │       └── deploy.yml          # Automated deployment script
    ├── astro.config.mjs            # Includes sitemap integration
    ├── package.json
    ├── tsconfig.json               # Path aliases (@assets, @components)
    ├── public
    │   ├── favicon.ico
    │   ├── robots.txt              # Points to sitemap-index.xml
    │   ├── site.webmanifest
    │   └── CNAME                   # Custom domain binding
    ├── src
    │   ├── assets                  # Optimized source images (moved from public)
    │   │   ├── image3.jpg
    │   │   ├── IMG_9577.jpg
    │   │   └── photo2.jpg
    │   ├── components
    │   │   ├── Footer.astro
    │   │   └── Header.astro
    │   ├── layouts
    │   │   └── BaseLayout.astro    # Includes Theme Persistence script
    │   ├── pages
    │   │   ├── 404.astro
    │   │   └── index.astro         # Main Hub
    │   └── styles
    │       └── global.css          # Tokenized colors & global styles
    └── README.md

### Key Changes & Files

- **`src/assets/`**
  Contains the high-resolution images for the cards. These are imported into `index.astro` and optimized automatically by Astro (WebP conversion, resizing).

- **`.github/workflows/deploy.yml`**
  The CI/CD pipeline. Automatically installs dependencies, builds the site, and pushes to GitHub Pages whenever you commit to `main`.

- **`astro.config.mjs`**
  Configured with your site URL (`https://heatshockpineapple.com`) to generate a valid sitemap.

- **`tsconfig.json`**
  Configured with Path Aliases for cleaner imports:
  - `@assets/*`
  - `@components/*`
  - `@layouts/*`

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Astro will print the local dev URL in the terminal (typically `http://localhost:4321`).

---

## Deployment (Automated)

This project uses **GitHub Actions** for deployment. You do not need to build locally.

1. Push your changes to the `main` branch.
2. The workflow in `.github/workflows/deploy.yml` will trigger automatically.
3. The site builds and deploys to **GitHub Pages**.

*Note: Ensure the repository "Pages" settings are set to **Source: GitHub Actions**.*

### Local Build (Testing only)
If you want to debug the production build locally:

```bash
npm run build
npm run preview
```

---

## Customization

### Intro text
Edit `src/pages/index.astro` to change the "Welcome" text or the intro eyebrow.

### Card content
The three pillars are defined in `src/pages/index.astro`.
- **Links**: Update the `href` to point to your subdomains.
- **Images**: Import new images from `@assets/` and pass them to the `<Image />` component.

### Images
Place new source images in `src/assets/`.
To use them:
1. Import them at the top of the `.astro` file:
   ```js
   import myImage from '@assets/my-new-image.jpg';
   ```
2. Use the `<Image />` component:
   ```jsx
   <Image src={myImage} alt="Description" />
   ```

---

## Notes

- **Global Colors**: Defined as CSS variables (`--brand-jungle`, `--brand-gold`) in `src/styles/global.css`.
- **Dark Mode**: Logic is handled in `Header.astro` and persisted via a script in `BaseLayout.astro` to prevent flashing.
- **Sitemap**: Auto-generated at `sitemap-index.xml` on build. `robots.txt` is updated to point to it.