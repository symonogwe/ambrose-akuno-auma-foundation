# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for the **Ambrose Akuno Auma Foundation**.

## Environment

- **Node**: v22.16.0
- **Package manager**: npm

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** for bundling and dev server
- **Chakra UI v3** (`@chakra-ui/react`) — all styling goes through Chakra UI props
- **Framer Motion** — all animations use Framer Motion, no CSS animations
- **React Router v7** (`react-router-dom`) for routing
- **react-icons** for icons — sub-packages used include `react-icons/bs`, `react-icons/md`; import others as needed. Render icons via `<Box as={IconComponent} />` inside Chakra layouts.
- **`@chakra-ui/icons` is NOT used** — it's Chakra v2-only and incompatible with v3

## Architecture

- Entry point: `src/main.jsx` → renders `<App />` into `#root`
- Page sections: `src/sections/` — rendered top-to-bottom in `App.jsx`: `Navbar → Hero → Mission → Programs → ImpactStats → Team → HQMap → Footer`
- Reusable UI components: `src/components/ui/`
- Static assets (SVG sprite sheet, favicon): `public/`
- Image assets: `src/assets/`
- Global CSS reset only in `src/index.css` — no plain CSS elsewhere

**`SectionWrapper`** (`src/components/ui/SectionWrapper.jsx`): wrap the inner content of every section with this for consistent padding (`py 16/24`) and `max-width: 1200px`. Do not replicate these values manually in individual sections.

## Chakra UI v3 — Key API Differences from v2

Chakra UI v3 is a full rewrite. Do **not** use v2 patterns:

| v2 (old — do not use)         | v3 (correct)                            |
|-------------------------------|-----------------------------------------|
| `extendTheme({})`             | `createSystem(defaultConfig, config)`   |
| `<ChakraProvider theme={...}>`| `<ChakraProvider value={system}>`       |
| `useColorMode()`              | Custom hook in `src/components/ui/ColorModeProvider.jsx` |
| `ColorModeScript`             | Not needed — `.dark` class on `<html>` |
| `colorScheme="blue"`          | `colorPalette="blue"`                   |
| `_dark={{ ... }}`             | Still works — maps to `.dark &` selector |

**Theme setup** (`src/theme/index.js`):
- Uses `defineConfig` + `createSystem(defaultConfig, config)`
- Brand tokens: `brand.primary` (#2563EB), `brand.accent` (#F59E0B), `brand.navy` (#0A1628)
- Semantic color tokens: `app.bg` and `app.fg` swap automatically in dark mode
- Body/heading fonts: Inter / Playfair Display

**Dark mode** (`src/components/ui/ColorModeProvider.jsx`):
- Toggles `.dark` CSS class on `document.documentElement`
- `useColorMode()` returns `{ colorMode, toggleColorMode }` — same API shape as v2 for convenience
- `useColorModeValue(light, dark)` also exported from the same file — mirrors the Chakra v2 hook

## Conventions

- All components are functional components using arrow functions
- Framer Motion for **all** animations — no CSS transitions or keyframes. Import alias: `import { motion as Motion } from 'framer-motion'`; use `<Motion.div>`, `<Motion.section>`, etc.
- Chakra UI for **all** styling — no plain CSS except the global reset
- Color mode: Light (default) and Dark — `initialColorMode: 'light'`, not system-driven
- Toast notifications via `toaster` from `src/components/ui/toaster.jsx` — call `toaster.create({ type, title, description, duration })`
- Keep components clean, readable, and well-commented

## ESLint Notes

- Unused variables are errors unless the name starts with an uppercase letter or `_` (pattern: `^[A-Z_]`).
- Config uses flat config format (`eslint.config.js`).
