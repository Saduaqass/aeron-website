# AERON

**AERON — Premium Interactive 3D Electric Vehicle Website** is an independent digital experience for a fictional premium electric vehicle concept brand.

## Project status

The website is implemented and builds as a static Next.js page. The vehicle is an original procedural concept model, not a photorealistic production asset. Performance figures are demonstrations only, and the contact form validates locally without sending data to a server.

## Features

- Cinematic hero and six-part, scroll-driven AERON ONE story.
- Interactive Three.js / React Three Fiber vehicle scene with five paint colors, camera presets, lighting, OrbitControls, and touch zoom.
- Design, concept performance, interior illustration, technology, configurator, contact, and footer sections.
- Kazakh default locale with Russian and English translations, persistent language selection, and localized page metadata.
- Responsive navigation, Escape-dismissable mobile menu, visible keyboard focus, reduced-motion support, and a WebGL fallback.
- Viewport-gated 3D scenes, demand-based rendering, and capped renderer pixel ratio.

## Technology

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4.
- Three.js, React Three Fiber, Drei, Motion for React, and Lucide icons.
- ESLint and Playwright for browser end-to-end checks.

## Requirements

- Node.js 20.9 or newer and npm.
- Chromium for Playwright (install once with the command below).

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium   # one-time browser install
npm run test:e2e
```

Playwright starts a local Next.js dev server on port 3001. The browser suite covers the Kazakh default and locale persistence, mobile menu keyboard behavior, configurator state, contact validation, and a narrow mobile viewport.

## Project structure

```text
src/
  app/                 App Router page, layout, global styles
  components/
    layout/            Site navigation
    sections/          Hero, story, design, performance, interior, technology, configurator, contact
    three/             Procedural vehicle model and R3F viewer
    ui/                Shared buttons and section headings
  lib/                 Shared vehicle configuration state
  locales/             Kazakh, Russian, and English copy and locale provider
public/images/          Original interior concept illustration
tests/                  Playwright browser scenarios
```

## Skills used

Before implementation, the installed `emilkowalski/skills` repository was checked and its README, skill inventory, relevant `SKILL.md` instructions, and UI/performance reference sheets were reviewed. Applied skills include `emil-design-eng`, `animate`, `choreograph`, `gestures`, `animation-performance`, `apple-design`, and `mobile-native`; the installed `frontend-engineer` skill informed application structure and accessibility practices.

## 3D assets and licensing

The AERON ONE exterior is generated from original project geometry in `src/components/three/vehicle-model.tsx`. The cabin illustration in `public/images/aeron-interior-concept.svg` is an original project asset. No third-party vehicle model or external imagery is included.

## Deployment and backend notes

Run `npm run build` to create a production build and `npm run start` to serve it. There is no contact backend or lead storage; a valid form submission reports local validation only and never claims that a message was delivered.

## Repository

[github.com/Saduaqass/aeron-website](https://github.com/Saduaqass/aeron-website)
