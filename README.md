# Gaurav Kumar — Terminal Portfolio

A terminal-style freelance portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **Framer Motion**.

The site is designed as a working shell: an interactive terminal hero, a filesystem-style project explorer, a `cat skills.json` stack view, a `git log` process timeline, a `neofetch` about panel, and a `./contact.sh` call to action.

---

## What is inside

| Area | Details |
|---|---|
| **Interactive terminal** | Type `help`, `ls projects`, `open <project>`, `cat about.md`, `contact`, `clear`, `whoami`, `neofetch`, `sudo hire-me`. Supports history (↑/↓), tab autocomplete, and `Ctrl+L`. |
| **Project explorer** | 15 projects with filters for `all`, `pinned`, `ai`, `fullstack`, `infra`, and `realtime`. Pinned repos are marked and collected in a dedicated strip. |
| **Case-study dialogs** | Each project opens a `cat README.md` dialog with role, year, problem, approach, highlights, stack, live demo, and source links. |
| **Pinned showcase** | `MeloSynthiaAI`, `FoodVision`, `OpenDocs`, `Lingo`, `Learnify`, and `DeployHub` are marked as pinned. `MeloSynthiaAI` is credited as a collaboration with the original author. |
| **Advanced showcase** | `Orchestra`, `MarketLens`, `VisionVibe`, `PatternVault`, `EcomShop`, `NeonMeet`, `Jotion`, `FluxDeck`, and `Cybernauts`. |
| **Animation** | Framer Motion for boot lines, staggered reveals, filter transitions, dialogs, and scroll progress. All motion respects `prefers-reduced-motion`. |
| **Terminal design** | CRT scanlines, grid background, traffic-light window chrome, ASCII logo, mono typography, green/amber/cyan palette, blinking cursor. |
| **SEO** | Metadata, Open Graph, a generated `/opengraph-image`, `robots.txt`, `sitemap.xml`, JSON-LD. |
| **Responsive** | Tested from 320px to 1440px; mobile navigation uses a shadcn Sheet. |

---

## Tech stack

- **Next.js 16** App Router, React 19, TypeScript
- **Tailwind CSS v4**
- **shadcn/ui** (Base UI + Radix-style primitives) — Button, Badge, Dialog, Sheet, Tabs, Tooltip, Avatar, Sonner, etc.
- **Framer Motion** for animation
- **next/font** — JetBrains Mono
- **next/og** — generated social card

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

---

## Customize

### Contact details

Search for `hello@gauravkumar.dev` in:

- `src/components/site/contact.tsx`
- `src/app/layout.tsx` (metadata)
- `src/app/robots.ts` / `src/app/sitemap.ts` (site URL)

### Site URL

Replace `https://gauravkumar.dev` in:

- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### Projects

All project content lives in `src/lib/data.ts`:

```ts
{
  slug: "orchestra",
  name: "Orchestra",
  command: "orchestra/",
  tagline: "…",
  description: "…",
  category: "infra",          // ai | fullstack | infra | realtime
  categoryLabel: "infra",
  pinned: false,
  featured: true,
  year: "2026",
  modified: "nov 18",
  size: "122k",
  role: "solo — design, build, deploy",
  stack: ["TypeScript", "…"],
  highlights: ["…"],
  problem: "…",
  approach: "…",
  repo: "https://github.com/…",
  live: "https://…",          // optional
  glyph: "dag",
}
```

Add or remove entries, then update the `stats` array and filter counts if needed. The project explorer and terminal `ls` command read from the same array.

### Theme

Terminal colors live in `src/app/globals.css`:

```css
--background: #070a08;
--foreground: #d9e6dc;
--primary: #7cffb2;
--term-green: #7cffb2;
--term-amber: #ffc857;
--term-cyan: #67e8f9;
--term-red: #ff6b6b;
--term-dim: #6f7f74;
```

### Commands

Edit the switch statement in `src/components/terminal/hero-terminal.tsx` to add or change commands. Command hints and autocomplete are defined near the top of the same file.

---

## Deploy

### Vercel (recommended)

1. Import the repository.
2. Framework preset: **Next.js**.
3. Build command: `npm run build`.
4. Output: default Next.js output.
5. Add your domain and update the metadata URLs.

### Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- Use the Netlify Next.js runtime/plugin, or deploy to Vercel for the simplest path.

### GitHub Pages

GitHub Pages is not the default target for a Next.js App Router build. If you need it, configure `output: "export"` and a static-compatible setup, then publish the `out/` directory. The previous static portfolio is preserved on the `portfolio-static` branch and is ready for GitHub Pages as-is.

---

## Branch history

- `portfolio-static` — the first static HTML/CSS/JS version of the portfolio (preserved).
- `main` — this Next.js + shadcn/ui + terminal version.

---

## Notes

- The terminal is an interactive frontend demo, not a real shell. It never executes code on a server.
- The `sudo hire-me` command is an easter egg that scrolls to the contact section.
- `MeloSynthiaAI` is a pinned project from the GitHub profile and is credited to its original author, AYUSHMAN0503.
- Replace the placeholder email and domain before going live.
- The site has no analytics or trackers. Add a privacy-friendly analytics provider if you want traffic data.