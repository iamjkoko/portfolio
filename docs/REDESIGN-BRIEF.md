# Eric Ko — Portfolio Redesign Brief

## Purpose and scope

Use this document as context for brainstorming a redesign of Eric Ko's personal portfolio with ChatGPT, Claude, or another design tool. It summarizes the existing site's content, structure, visual language, and interactions, then identifies decisions to explore. Existing choices are context, not mandatory redesign requirements.

Based on the repository source reviewed on October 14, 2026. This is a source-based inventory, not a live-site visual, accessibility, or performance audit. Biography details reflect current site copy; future goals and audience priorities have not yet been confirmed.

## Identity and story

- **Name:** Eric Ko.
- **Current positioning:** Multidisciplinary artist and designer based in Providence, pursuing a BFA in Graphic Design with a concentration in Computation, Technology, and Culture (CTC) at RISD.
- **Personal background:** Grew up in Seoul and spent four years in São Paulo. The biography connects this experience to an interest in how context changes the meaning of objects, materials, and gestures.
- **Practice represented:** Graphic design, typography, branding, motion, conceptual art, 3D rendering, creative coding, digital archiving, and photography.
- **Personal interests:** 35mm film photography and learning bossa nova.
- **Potential narrative to explore:** Connecting cultural context, personal memory, and computational experimentation. This is an interpretation of the existing content, not an approved positioning statement.

## Current pages and navigation

### Home — `/`

- Full-screen animated hero with a short introduction to Eric, Providence, and RISD.
- Boska serif introduction over an abstract, mouse-responsive WebGL background with a dark overlay.
- First-visit loading sequence, shown once per browser session; waits for fonts and background readiness with a minimum display time of approximately two seconds.
- Three featured projects, in order: The Stamp Archive, Ko: Logo Animation, Modern Caveman.
- Each featured project pairs a large image or looping video with a title, short description, and discipline tags.
- “View all projects” link to Works.

### Works — `/works`

- Four linked project previews in a two-column desktop grid and a single-column mobile layout.
- Current order: The Stamp Archive, Ko: Logo Animation, Modern Caveman, Agora.
- Mostly looping video previews; Modern Caveman uses a still image.
- The index is primarily visual, without visible project titles or descriptions beneath the cards.
- Each project has its own detail page.

### Project detail pages

Shared patterns include a back control, project title, year, tools, introduction, discipline tags, large media, and supporting text. Depth varies by project; process, reflection, and credits are not uniform sections across all pages.

- **The Stamp Archive — `/works/stamps` — 2026.** A digital archive of the designer's father's stamp collection, inherited through a family collecting tradition. Combines personal storytelling with scanning, Python/OpenCV image processing, and a React/Three.js gallery. The case study contains a demo, an external link to the separate stamp-gallery website, overview, detailed process with code snippets and comparison images, and reflection. The stamp gallery itself is a separate project, not a portfolio feature.
- **Ko: Logo Animation — `/works/logo` — 2025.** Personal branding and typographic motion, made with Illustrator and After Effects. Includes animation and supporting development material.
- **Modern Caveman — `/works/caveman` — 2025.** Shadow-based conceptual explorations inspired by Plato's Allegory of the Cave, made with Blender and Photoshop. Includes conceptual context, process imagery, and an interactive gallery where clicking an image reveals an alternate view.
- **Agora — `/works/agora` — 2022.** A typeface and animation inspired by the public forums of ancient Greece and the exchange of knowledge. Includes a looping animation, explanatory text, a type layout image, and references. Tools: Illustrator and After Effects.

### About — `/about`

- Portrait, biography, personal background, and interests.
- Animated signature video.
- Education section.
- A continuously scrolling “Stack” strip of linked software/tool icons, pausing on hover. Includes React, Tailwind, Figma, Blender, Adobe tools, TouchDesigner, and AI tools.
- “View CV” is currently styled text, not a working download or link.
- Experience content and the Library component are commented out and not displayed.

### Archive — `/archive/motion` and `/archive/renderings`

- A secondary collection for experiments and visual explorations.
- Motion and Renderings category buttons update the URL, making categories directly linkable.
- Motion: video preview grid, with short descriptions where supplied. Selected entries open a fuller video in a modal; not every preview is clickable.
- Renderings: a column-based image layout, with three columns on desktop and two on mobile.
- Photography button opens the separate photography site at `https://filmbyko.cargo.site/`.
- `/archive` redirects to Motion. Previous Studio, Systems, and Experiments URLs also redirect to Motion.

## Shared elements and interactions

- **Navigation:** Floating white rounded bar with the personal logo linking home and links to Works, About, and Archive. Active sections receive visual emphasis. Desktop navigation hides on downward scrolling and returns on upward scrolling; the logo rotates on hover.
- **Mobile menu:** Rounded top bar opens a full-screen menu with numbered Home, Works, About, and Archive links, plus social links.
- **Motion:** Opacity/blur page transitions, staggered text and content reveals, hover scaling, smooth scrolling through Lenis, and looping video previews.
- **Contact:** Footer email link to `eko03@risd.edu`, plus LinkedIn, Instagram, and Are.na. Contact is through email/social links rather than a dedicated contact page or form.
- **Footer details:** Live clock using the visitor's browser time zone, build-date “Last updated” label, copyright, and “Designed & Built with React.”
- **Responsive layout:** Main mobile boundary is 935px and below, with stacked content and adapted navigation. Some components also use smaller responsive breakpoints.
- **Fallbacks:** A 404 page with a Home link; an optional renovation screen exists but is currently disabled.

## Current visual language

- Predominantly white backgrounds, black text, gray secondary copy, and restrained borders.
- General Sans for most interface/body typography; Boska for the home introduction and mobile menu.
- Generous spacing, large media, rounded image/video frames, and pill-shaped tags and filters.
- The hero supplies a more atmospheric introduction; project and archive pages use quieter gallery-style layouts.
- Dark theme variables and footer variants exist in code, but there is no visible user-operated theme switch in the inspected navigation.
- Existing reusable assets include the personal logo, portrait, signature animation, project imagery, process images, videos, and tool/social icons.

## Existing material that is currently hidden

These are possible redesign inputs, not active features to assume must remain.

- **Studio archive:** Source pages/assets for Cheso, Infinity Box, Paintbox, Paperfold, São Paulo, and Light Painting. Studio navigation is hidden and its URLs redirect to Motion.
- **Personal Library:** Implemented component and local data, currently commented out on About. Supports film/music filters, cover grids, and detail modals with title, year, creator, star rating, and review. Book data also exists, but its filter is disabled. The modal includes Escape dismissal and focus management.
- **Experience section:** Commented-out content on About.
- **CV:** Visible label without an actual link.

## Technical context for feasible concepts

- React 19, TypeScript, Vite, React Router, and Tailwind CSS v4.
- Framer Motion, GSAP, Lenis, and Three.js support the current animation and interaction approach.
- Project detail pages are authored as React components; archive and library collections use local TypeScript data.
- Images are largely local WebP assets; video URLs include Cloudinary and Sanity CDN hosting.
- Sanity client/query helpers exist, but the inspected page components do not fetch their content from Sanity. Do not assume there is a fully connected CMS workflow.
- No platform migration has been requested. A redesign can explore substantial presentation changes within the existing stack.

## Redesign questions to challenge

These are open decisions. Recommendations below are starting points for discussion, not confirmed requirements.

1. **Who is the primary visitor, and what should they do?** Potential audiences include hiring teams, studios, collaborators, and peers. Start by selecting one primary audience and one main outcome before choosing a visual direction.
2. **What should visitors remember about Eric?** Is the central identity multidisciplinary designer, graphic designer, creative technologist, or another framing? Test each against the actual work rather than relying on a broad label.
3. **What is the strongest first impression?** Compare an atmospheric introduction with a project-first opening. Evaluate how quickly each communicates both the work and the person behind it.
4. **Which projects deserve priority?** Consider relevance, distinctiveness, craft, and depth of process. The current order need not be preserved.
5. **How should selected work and experiments relate?** Explore separate Works/Archive areas versus one collection with clear levels of emphasis. Decide this before designing filters or navigation.
6. **How much explanation does each project need?** Consider a concise summary of intent, contribution, and result, followed by optional deeper process. Preserve project-specific storytelling where it adds value.
7. **What role should personal content play?** Decide whether the Library, photography, signature, and biography strengthen the intended impression, and where they belong. Avoid restoring hidden sections merely because they exist.
8. **What should motion accomplish?** Evaluate the intro delay, shader background, smooth scrolling, and autoplay video by their contribution to understanding or character. Include mobile performance and reduced-motion behavior in concept evaluation.
9. **What makes contacting Eric easy?** Consider contact prominence and whether a real CV link is needed for the chosen audience.
10. **How will the site grow?** Clarify how often projects/experiments will be added and how much manual editing is acceptable before deciding whether to expand CMS integration.

## Copy-ready prompt for another AI tool

> I am redesigning Eric Ko's portfolio. Use this brief as a factual inventory of the current implementation, not as a fixed specification. Help me sharpen the site's purpose before proposing a design.
>
> First ask a focused round of questions about my primary audience, desired visitor action, professional positioning, and what currently feels wrong. Give a reasoned recommendation for each question, and wait for my answers before making dependent design decisions. Do not ask me to restate facts already supplied in this brief.
>
> Once those decisions are clear, propose three distinct redesign directions grounded in my actual projects and personal story. For each direction, explain its central idea, information architecture, homepage sequence, typography and imagery approach, project-page structure, navigation, motion behavior, mobile experience, and what existing elements it would retain, remove, or rethink. Explain the tradeoffs and why the direction suits the selected audience.
>
> Distinguish confirmed facts, your interpretations, and new suggestions. Do not invent clients, achievements, project outcomes, or requirements. Treat hidden content as optional. End with a recommended direction and the remaining decisions needed before wireframing.

## Repository references

Inventory sources: `src/App.tsx`, `src/constants/routes.ts`, `src/constants/renovation.ts`, `src/pages/`, `src/works/`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/Library.tsx`, `src/components/CvmGallery.tsx`, `src/data/`, `src/global.css`, `src/main.tsx`, and `package.json`.
