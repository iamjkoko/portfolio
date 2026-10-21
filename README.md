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
| `src/App.tsx` | Root app; routes and `AnimatePresence` page transitions |
| `src/main.tsx` | Entry; mounts App, loads fonts |
| `src/global.css` | Tailwind v4 `@theme`, base styles, `:root` / `.dark` variables, animations |
| `src/constants/routes.ts` | `ROUTES` and `EXTERNAL_LINKS` — use for all internal/external links |
| `src/components/` | Layout, Navbar, Footer, Back, SmoothScroll, Tooltip, Gallery, etc. |
| `src/pages/` | Route-level pages: Home, About, Works, Studio, Experiments |
| `src/works/` | Active work pages (e.g. Caveman, Logo); re-exported in `src/works/index.ts` |
| `src/archive/` | Archive: `studio/` and `experiments/` project pages; re-exported in `src/archive/index.ts` |
| `src/styles/works.module.css` | Project/works layout and typography (project info, description, credits) |
| `src/assets/fonts/` | Boska, General Sans, Poppins, Tanker — loaded via CSS in `main.jsx` or global |

---

## Important systems

### Design system

### Routing

- All routes live in `ROUTES` in `src/constants/routes.ts`. Add new work/archive routes there and in `App.tsx`, then add the page under `src/works/` or `src/archive/...`.

### Code style

- The codebase is TypeScript-first (`.ts` / `.tsx`). Follow existing typing patterns when adding components, constants, and routes.


## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
