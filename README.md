# Gaurav Kumar — Freelance Portfolio

A distinctive, dependency-free portfolio site built from the strongest public repositories of **[ARtoRiAs10](https://github.com/ARtoRiAs10)** (Gaurav Kumar). Designed to position a freelance product engineer for client work and to stay useful as the project set grows.

The design is an **editorial technical dossier**: warm bone type on near-black, an acid-lime accent, oversized serif italic moments, mono metadata, and custom SVG artwork for every project. It is deliberately not a template.

---

## What is inside

| File | Purpose |
|---|---|
| `index.html` | Semantic page structure, SEO meta, JSON-LD, all static copy |
| `styles.css` | Complete design system, responsive layout, print + reduced-motion styles |
| `app.js` | Project data, cover artwork, filters, case-study dialog, hover previews, interactions |
| `favicon.svg` | Monogram favicon |
| `og.png` | 1200×630 social sharing card |
| `LICENSE` | Apache 2.0 (already in the repo) |

No frameworks, no build step, no trackers. The only external dependency is Google Fonts.

---

## Selected work

The portfolio shows **12 projects**, chosen for architectural depth, end-to-end ownership, recency, and range. Tutorial clones, forks, and practice repos were deliberately excluded.

### Flagships

| Project | Why it earns a top slot |
|---|---|
| **Orchestra** | A real distributed system: control plane, YAML DAG scheduler, BullMQ/Redis queue, worker fleet, SSH execution, heartbeats, live Socket.IO logs, Razorpay billing and per-plan rate limits. |
| **MarketLens** | Quantitative finance depth: nine strategy engines, walk-forward cost-aware backtesting, constrained portfolio optimization, FastAPI ETL service, and an ML research lab. |
| **VisionVibe** | AI product engineering with a provider router and automatic failover, img2img room editing, an art-direction prompt engine, and a community gallery. |

### Supporting work

| Project | Category | What it demonstrates |
|---|---|---|
| **DeployHub** | Infra & DevOps | Vercel-like deployment platform: queue-based Docker builds, S3 static output, Nginx proxying. |
| **OpenDocs** | Real-time | Collaborative editor with Convex, Tiptap, Liveblocks presence, mentions and reactions. |
| **PatternVault** | Full-stack | Django + React DSA tracker with a Monaco editor, sandboxed Judge0 execution, and LLM spaced repetition. |
| **Learnify** | AI & Data | YouTube/PDF → flashcards, quizzes and grounded RAG chat using FastAPI, ChromaDB and Gemini. |
| **EcomShop** | Full-stack | Next.js + Spring Boot support platform with a Claude agent, order context and human handoff. |
| **NeonMeet** | Real-time | WebRTC video, screen sharing and Socket.IO signaling with meeting links. |
| **Jotion** | Real-time | Notion-style nested workspace with Convex real-time sync. |
| **Cybernauts** | Full-stack | Graph-based relationship network with a hybrid recommendation engine. |
| **FluxDeck** | Full-stack | Jira-style project management with Kanban, table/calendar views and analytics. |

---

## Run locally

```bash
cd project
python3 -m http.server 8080
```

Open <http://localhost:8080>.

Any static file server works. There is no install or build step.

---

## Customize before going live

### 1. Contact details

- `app.js` → `CONFIG.email` (used by the copy button and mailto links).
- `index.html` → the visible email in the hero and contact section.
- `index.html` → the contact card links (GitHub, email).
- The contact button is updated from `CONFIG.email` automatically.

### 2. Canonical URL and social image

Replace `https://gauravkumar.dev/` in `index.html` with your real domain:

- `<link rel="canonical" ...>`
- `og:url`
- `og:image` (currently points to `/og.png` on that domain)
- `twitter:image`

`og.png` is already generated at 1200×630. If you move the site, keep the image at the domain root or update the path.

### 3. Availability

Search `index.html` for:

- `Open for select projects`
- `Currently taking on one new build this quarter`

Update these to match your actual capacity.

### 4. Projects

All project content lives in the `projects` array in `app.js`:

```js
{
  id: "orchestra",
  num: "01",
  title: "Orchestra",
  tagline: "…",
  category: "infra",          // ai | full | infra | realtime
  categoryLabel: "Infra & DevOps",
  year: "2026",
  role: "Solo — design, build, deploy",
  featured: true,             // shows in the top card grid
  stack: ["TypeScript", "…"],
  problem: "…",
  approach: "…",
  highlights: ["…", "…"],
  live: "https://…",          // optional
  repo: "https://github.com/…",
}
```

Add a matching cover in the `covers` object. Each cover is a small inline SVG using `currentColor` and `var(--accent)`.

The featured grid is only shown under the **All** filter; filtered views use the compact project list. Change `featured: true` to promote/demote a project.

### 5. Stats and counts

- `#stat-builds` and the `12` in the filter chip are updated from `projects.length` for the stat; the chip counts are static. Update them if you change the project count.
- `case-index` and the dialog label use `projects.length` automatically.

### 6. Add your resume / social proof

For a freelance launch, consider adding:

- A downloadable PDF resume.
- One or two client testimonials (only with permission).
- A logo strip or “trusted by” line.
- Real screenshots inside the case-study dialogs.
- A short “currently” note that changes as work changes.

---

## Deploy

### GitHub Pages

1. Push to `main`.
2. **Settings → Pages → Deploy from a branch**.
3. Choose `main` and `/ (root)`.
4. Site URL: `https://<username>.github.io/<repo>/`.

Because the site is static, no build command is needed.

### Vercel / Netlify

- Import the repository.
- Framework preset: **None**.
- Build command: leave empty.
- Output directory: `.` (root).

Add a custom domain in the host’s dashboard, then update the canonical and OG URLs.

### Cloudflare Pages

- Build command: none.
- Output directory: `/`.

---

## Design & accessibility notes

- Semantic landmarks: `header`, `nav`, `main`, `footer`, section headings.
- Keyboard-accessible project links, filters, dialog and mobile menu.
- Native `<dialog>` for case studies with focus management and Escape support.
- `prefers-reduced-motion` disables reveals and the ticker.
- Print styles produce a clean, text-first version.
- Text contrast checked against the dark background; accent lime is reserved for emphasis.
- No horizontal overflow from 320px to 1440px.
- No external images — all project artwork is inline SVG, so the page stays fast and crisp.

---

## What I would add for a long-term freelance site

1. **Case-study screenshots** — one or two real product screenshots per flagship.
2. **A testimonial or two** — social proof converts better than more features.
3. **A one-page PDF resume** generated from the same content.
4. **A lightweight analytics script** — only if you are comfortable with it.
5. **A writing section** — short engineering notes help inbound leads and demonstrate depth.
6. **A contact form with a real backend** — Formspree, Basin, or a serverless function; a mailto link is fine to start.

---

## License

The site code is provided under the repository’s existing Apache 2.0 license. Third-party projects referenced in the portfolio remain the property of their respective owners.