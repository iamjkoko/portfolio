# Portfolio

Personal design portfolio (Eric Ko). React + Vite, Tailwind v4, React Router, Framer Motion, GSAP.

---

## Getting started

**Prerequisites:** Node.js (v18+ recommended)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Production build: `npm run build` · Preview: `npm run preview`.

---

## Project structure

| Path | Purpose |
|------|--------|
| `src/App.jsx` | Root app; routes and `AnimatePresence` page transitions |
| `src/main.jsx` | Entry; mounts App, loads fonts |
| `src/global.css` | Tailwind v4 `@theme`, base styles, `:root` / `.dark` variables, animations |
| `src/constants/routes.js` | `ROUTES` and `EXTERNAL_LINKS` — use for all internal/external links |
| `src/components/` | Layout, Navbar, Footer, Back, SmoothScroll, Tooltip, Gallery, etc. |
| `src/pages/` | Route-level pages: Home, About, Works, Studio, Experiments |
| `src/works/` | Active work pages (e.g. Caveman, Logo); re-exported in `src/works/index.js` |
| `src/archive/` | Archive: `studio/` and `experiments/` project pages; re-exported in `src/archive/index.js` |
| `src/styles/works.module.css` | Project/works layout and typography (project info, description, credits) |
| `src/assets/fonts/` | Boska, General Sans, Poppins, Tanker — loaded via CSS in `main.jsx` or global |

---

## Important systems

### Design system

- **Reference:** [`ds-reference.txt`](./ds-reference.txt)  
  Single source of truth for spacing, colors, typography, breakpoints, and animation tokens. Use it when changing layout, adding pages, or styling components.

### Routing

- All routes live in `ROUTES` in `src/constants/routes.js`. Add new work/archive routes there and in `App.jsx`, then add the page under `src/works/` or `src/archive/...`.

### Theming

- Light/dark use CSS variables in `global.css` (`:root` and `.dark`). Use `var(--color-background)`, `var(--color-text)`, etc.

### Breakpoints

- Mobile breakpoint is **935px** everywhere (media queries and Tailwind `--breakpoint-mobile`).

### Code style

- Mix of JSX and TSX is intentional (e.g. Layout, Footer, Navbar are `.tsx`; many pages are `.jsx`). Prefer the existing pattern in the same folder.

---

## Adding a new work or archive page

1. Add route(s) to `src/constants/routes.js` (under `ROUTES.WORKS` or `ROUTES.ARCHIVE.STUDIO` / `EXPERIMENTS`).
2. Create the page in `src/works/` or `src/archive/studio/` / `src/archive/experiments/`.
3. Export it from `src/works/index.js` or `src/archive/index.js`.
4. In `App.jsx`, add the `<Route>` and import the component.
5. Use `works.module.css` and tokens from `ds-reference.txt` for layout and spacing.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
