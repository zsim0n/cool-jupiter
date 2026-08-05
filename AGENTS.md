# CLAUDE.md

Orientation for AI agents working in this repo. Skim this first — you shouldn't
need to read the whole tree.

## What this is

`zoltansimon.me` — a **static Astro 7 blog** (MDX posts). No backend, no SSR
adapter; `astro build` emits a static `dist/`. Styling is **PicoCSS (classless,
via CDN)** plus a small brand theme layer.

## Toolchain (keep it simple — this is a deliberate constraint)

- **npm only.** Not yarn, not pnpm. Lockfile is `package-lock.json`.
- **Node 22**, pinned in `.nvmrc` (read by Netlify, Cloudflare, and local nvm).
- Do not add build tooling or config files without a real need — the owner
  strongly prefers a minimal footprint.

```bash
npm install          # deps (sharp builds automatically for image optimization)
npm run dev          # astro dev --host  -> http://localhost:4321
npm run build        # static build into dist/
npm run preview      # serve the built dist/ locally
```

## Where things live

- `src/posts/**/*.mdx` — **published** posts (the `posts` content collection).
- `src/drafts/*.mdx` — drafts, **not published** (outside the collection's `base`).
- `src/content.config.ts` — post schema: `title`, `thumbnail` (image), `date`,
  `excerpt?`.
- `src/pages/` — routes: `index.astro` (home card grid), `blog/[slug].astro`
  (post page), `me.astro` (about), `404.astro`, `rss.xml.js`, `robots.txt.ts`.
- `src/layouts/Root.astro` — base HTML document + **global theme CSS**, brand
  palette, and the Cloudflare Web Analytics beacon. Most theming lives here.
- `src/layouts/Layout.astro` — header bar + `Header` + `SocialFooter` wrapper.
- `src/components/` — `Header`, `ThemeToggle`, `SEOHead`, `SocialFooter`;
  `mdx/{Figure,BlockQuote}` are mapped into MDX in `blog/[slug].astro`.
- `public/` — static assets served as-is (`favicon.ico`, images, `zx81.ttf`).

## Adding a post

Drop `src/posts/<slug>.mdx` with frontmatter:

```yaml
---
title: "Post title"
date: "2026-01-01T00:00:00.000Z"
excerpt: "One-line summary (optional)."
thumbnail: "./assets/<slug>/<image>.jpg"   # co-located under src/posts/assets/
---
```

The filename is the URL slug (`/blog/<slug>`). Images are optimized to webp at
build time by `sharp`.

## Theme system (read before touching colors)

Brand palette is defined as `--brand-*` vars in `Root.astro`'s `:root`. The accent
is Pico's `--pico-primary` = laser `#FF3B14`. The header flips per theme via
`--header-bg` / `--header-fg`. `ThemeToggle` sets `data-theme` on `<html>` and
persists it in `localStorage`.

Three gotchas that will bite you:

1. **Light-mode accent must beat Pico's specificity.** Pico assigns
   `--pico-primary` under `:root:not([data-theme="dark"])`, which outranks a plain
   `:root`. Override light-mode Pico vars in that same selector, not bare `:root`.
2. **Inside `<a>`, Pico reassigns `--pico-color` to the accent.** Any text wrapped
   in a link (e.g. the homepage cards, whose whole tile is an `<a>`) needs an
   explicit color, or it turns laser-red.
3. **Astro scoped `<style>` can't target `[data-theme="dark"]`.** That attribute
   is on `<html>`, an ancestor outside the component, so scoping breaks the
   selector. Put theme-dependent overrides in `Root.astro`'s `<style is:global>`.

## Hosting & deploy

- **Netlify** = production. Push to `main` → Netlify builds (`npm run build`, set
  in the Netlify dashboard, not in-repo) and deploys.
- The GitHub Pages workflow (`.github/workflows/astro.yml`) is a manual/test
  target only, not production.
- **Cloudflare Web Analytics** beacon is in `Root.astro`, injected on production
  builds only (`import.meta.env.PROD`).
- A move to Cloudflare Pages has been considered but deferred — Netlify is stable.
