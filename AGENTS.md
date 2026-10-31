# CLAUDE.md

Repo orientation. General coding, git and deploy rules are in my global
CLAUDE.md; this file only covers what's specific to this repo.

## What this is

`zoltansimon.me`, a **static Astro 7 blog** (MDX posts). No backend, no SSR
adapter; `astro build` emits a static `dist/`. Styling is **PicoCSS (classless,
via CDN)** plus a small brand theme layer.

## Toolchain

npm (`package-lock.json`), Node 22 pinned in `.nvmrc`.

```bash
npm install          # sharp builds automatically for image optimization
npm run dev          # astro dev --host  -> http://localhost:4321
npm run build        # static build into dist/
npm run preview      # serve the built dist/ locally
```

## Where things live

- `src/posts/*.mdx`: posts (the `posts` content collection).
- `src/content.config.ts`: post schema (`title`, `thumbnail`, `date`, `excerpt?`, `draft?`).
- `src/pages/`: `index.astro` (home card grid), `blog/[slug].astro` (post
  page), `me.astro`, `404.astro`, `rss.xml.js`, `robots.txt.ts`, `llms.txt.ts`.
- `src/layouts/Root.astro`: base HTML, **global theme CSS**, brand palette,
  analytics beacon. Most theming lives here.
- `src/layouts/Layout.astro`: header bar + `Header` + `SocialFooter`.
- `src/components/`: `Header`, `ThemeToggle`, `SEOHead`, `SocialFooter`;
  `mdx/{Figure,BlockQuote}` are mapped into MDX in `blog/[slug].astro`.
- `public/`: static assets served as-is (`favicon.ico`, `zx81.ttf`).

## Adding a post

`src/posts/<slug>.mdx`; the filename is the URL slug (`/blog/<slug>`).

```yaml
---
title: "Post title"
date: "2026-01-01T00:00:00.000Z"
excerpt: "One-line summary (optional)."
thumbnail: "./assets/<slug>/card.png"   # co-located under src/posts/assets/<slug>/
draft: true                             # optional: shown in dev, excluded from build
---
```

Use PNG thumbnails, because LinkedIn link previews don't support webp. Images
inside posts are optimized to webp at build time.

## Theme system (read before touching colors)

Brand palette: `--brand-*` vars in `Root.astro`'s `:root`. Accent is Pico's
`--pico-primary` = laser `#FF3B14`. The header flips per theme via
`--header-bg` / `--header-fg`. `ThemeToggle` sets `data-theme` on `<html>` and
persists it in `localStorage`.

Gotchas:

1. **Light-mode accent must beat Pico's specificity.** Pico sets
   `--pico-primary` under `:root:not([data-theme="dark"])`, which outranks a
   plain `:root`. Override light-mode Pico vars in that same selector.
2. **Inside `<a>`, Pico reassigns `--pico-color` to the accent.** Text inside
   a link (e.g. the homepage cards, where the whole tile is an `<a>`) needs an
   explicit color, or it turns laser-red.
3. **Astro scoped `<style>` can't target `[data-theme="dark"]`.** The
   attribute is on `<html>`, outside the component, so scoping breaks the
   selector. Put theme-dependent overrides in `Root.astro`'s `<style is:global>`.

## Hosting & deploy

- **Netlify serves production.** Push to `main` → Netlify builds
  (`npm run build`, configured in the Netlify dashboard, not in the repo).
- `.github/workflows/astro.yml` also deploys to GitHub Pages **on every push
  to `main`**. It's a test target only, not production.
- The Cloudflare Web Analytics beacon in `Root.astro` is only injected on
  production builds (`import.meta.env.PROD`).

## Repo-specific conventions

- Extra branch prefixes: `post/` new post · `edit/` edits to existing content.
