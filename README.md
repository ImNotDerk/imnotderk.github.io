# Engineering Portfolio (`website-portfolio`)

A clean, minimalist developer portfolio built with **Astro**, **Tailwind CSS**, and **TypeScript**, configured for **GitHub Pages** under `/website-portfolio`.

## Local Development

```bash
npm install
npm run dev
```

Build and type-check production static assets:

```bash
npm run build
npm run preview
```

## Customizing Your Content

1. **Profile, Milestones, Events, Work Experience & Skills**: Edit [src/data/portfolio.ts](src/data/portfolio.ts).
2. **Portrait, Project Covers & Event Photos**:
   - Portrait photo: drop your image into `public/images/` and update `profile.portrait.src` (and `caption`) in [src/data/portfolio.ts](src/data/portfolio.ts).
   - Event & hackathon photos: drop photos into `public/images/events/` and update the `photos` array in `events` inside [src/data/portfolio.ts](src/data/portfolio.ts).
   - Project cover banners: drop screenshots into `public/images/projects/` and update `coverImage` in `src/content/projects/*.md`.
3. **Project Case Studies**: Add or edit Markdown files in `src/content/projects/*.md`. Schema validation is defined in [src/content.config.ts](src/content.config.ts).
4. **Resume PDF**: Replace `public/resume.pdf` with your actual exported resume PDF.
5. **GitHub Pages URL / Base Path**: Update `site` and `base` in [astro.config.mjs](astro.config.mjs) if you rename the repository or switch to a custom domain.

## Deploying to GitHub Pages

1. Push this repository to GitHub (`ImNotDerk/website-portfolio`) on the `main` branch.
2. In your GitHub repository settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will automatically build and publish the site on every push to `main`.
