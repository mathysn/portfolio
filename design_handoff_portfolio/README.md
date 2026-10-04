# Handoff: Portfolio Camille Laurent (v2 — « verre trempé »)

## Overview
Personal portfolio for a full-stack developer: 3 pages (Accueil, Projets, Contact) + a component library, including MDX components for project case-study pages. Dark theme, green accent, glassmorphism surfaces over a slowly animated aurora background.

## About the Design Files
The `.dc.html` files in `design/` are **design references built in HTML** — they show intended look and behavior; they are not production code to copy. Recreate them in the target stack. If no codebase exists yet, recommended: **Next.js (App Router) or Astro + MDX + TypeScript + Tailwind CSS**, `lucide-react` for icons, `next/font` (or Fontsource) for fonts. Project pages are authored as `.mdx` files in `content/projets/*.mdx` with frontmatter (see below).

Open the files in a browser (keep `support.js` next to them). Each file is a pan/zoom canvas:
- `Portfolio v2.dc.html` — artboards **2a Accueil**, **2b Projets**, **2c Contact** (1440px wide each).
- `Composants.dc.html` — full component library (sections 00–06).

## Fidelity
**High-fidelity.** Recreate pixel-accurately: colors, typography, radii, shadows, glass recipe, hover states. Artboards are desktop 1440px; responsive behavior is not designed yet (see "Responsive" below for guidance).

---

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `bg` | `#060907` | Page background |
| `text` | `#EEF2EF` | Primary text |
| `text-strong` | `#F1F5F2` | Display headings |
| `text-2` | `#B9C4BE` | Nav links, labels, list text |
| `text-muted` | `#9AA59F` | Body paragraphs |
| `text-faint` | `#7D8A83` | Mono meta, footers, captions |
| `accent` | `#62DC94` | Accent, dots, eyebrows |
| `accent-light` | `#8FF3B8` | Italic heading accents, links, icons |
| `accent-pale` | `#C3F8D8` | Link hover |
| `on-accent` | `#03130A` | Text/icons on green |
| `error` | `#F08A7E` (msg `#F0A398`) | Input error |
| `warning` | `#E8C36A` | Warning callout |
| hairline | `rgba(255,255,255,.06–.10)` | Dividers, borders |

### Typography
- **Display**: Instrument Serif 400 (+ italic). H1 108–172px / 0.9–0.95, letter-spacing −0.02 to −0.03em. H2 56–60px. H3 (featured card) 44px/1. H4 (small card) 30px/1.05. Stats 30–44px. The accent word of each title is *italic* in `accent-light` (home: gradient text `#D2FBE2 → #62DC94`, 180deg).
- **Text**: Rubik 400/500. Body 17px/1.6, card text 15px/1.6, small 14px/1.55, buttons 14–16px 500.
- **Mono**: Geist Mono 400/500. Eyebrows/labels 11–12px, uppercase, letter-spacing .06–.08em. Code 13px/1.75.
- Google Fonts: `Instrument+Serif:ital@0;1`, `Rubik:wght@300;400;500;600`, `Geist+Mono:wght@400;500`.

### Radii
999 (pills: nav, buttons, tags, chips) · 32 (CTA banner, form card) · 28 (featured card) · 24 (info panels) · 22 (small card) · 20 (link tiles, TOC) · 18 (image inside card, code block) · 16 (callouts, dl grid) · 14 (inputs) · 12 (monogram squares).

### Spacing
Page side padding 120px (pages), 80px (library). Section top gaps 56 / 64 / 88 / 96px. Grid gaps 24px (featured), 20px (small cards), 12–16px (tiles/fields).

---

## The Glass Recipe (critical)
Every glass surface = base + a 1px gradient edge in `::before`.

```css
.glass {
  position: relative;
  background:
    radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,.08), rgba(255,255,255,0) 55%),
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  backdrop-filter: blur(24px) saturate(170%);
  -webkit-backdrop-filter: blur(24px) saturate(170%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12),
    0 1px 2px rgba(0,0,0,.3),
    0 30px 60px -30px rgba(0,0,0,.7);
}
.glass::before {               /* the edge — light top-left, rebound bottom-right */
  content: ""; position: absolute; inset: 0;
  border-radius: inherit; padding: 1px;
  background: linear-gradient(150deg,
    rgba(255,255,255,.42), rgba(255,255,255,.10) 22%,
    rgba(255,255,255,.03) 50%, rgba(255,255,255,.08) 78%, rgba(255,255,255,.26));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
```
Make this a reusable `<Glass>` component / Tailwind plugin utility. Applies to: nav, secondary buttons, featured & small cards, segmented filter, contact info panel, link tiles, form card, CTA banner, code blocks, TOC, stats, quote, accordion.

## Background (animated, discreet)
Absolute layer behind content (`#060907`):
- 3–4 "orbs": circles with `radial-gradient(closest-side, COLOR, transparent)`, animated with `transform` only (`ease-in-out infinite alternate`):
  - 1100px, left −280 / top −520, `rgba(46,196,118,.34)`, drift1 26s → translate(200px,140px) scale(1.12)
  - 900px, right −300 / top 60, `rgba(16,150,128,.30)`, drift2 32s → translate(−180px,160px) scale(.9)
  - (tall pages) 1000px, left −360 / top 40%, `rgba(30,170,110,.24)`, drift3 36s
  - 820px, left 38% / bottom −460, `rgba(120,214,86,.16)`, drift4 40s → translate(−160px,−140px) scale(1.18)
- Grid: 1px lines `rgba(255,255,255,.04)` every 72px, masked with `radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 75%)`.
- Grain: SVG `feTurbulence` (fractalNoise, baseFrequency .8, 3 octaves) tile, opacity .06.
- Respect `prefers-reduced-motion: reduce` → no animation.

---

## Components

### Buttons
- **Primary** (pill): `background: linear-gradient(180deg,#8FF3B8 0%,#56D68D 55%,#3FC47A 100%)`, color `#03130A`, shadow `inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 6px rgba(0,60,25,.25), 0 0 0 1px rgba(110,230,160,.55), 0 12px 32px -12px rgba(80,214,140,.7), 0 0 60px -20px rgba(80,214,140,.55)`. Hover: `translateY(-2px)` + stronger glow (`0 0 0 1px rgba(150,245,190,.85), 0 18px 40px -12px rgba(80,214,140,.85), 0 0 90px -16px rgba(80,214,140,.7)`). Transition .25s `cubic-bezier(.2,.8,.2,1)`.
  - lg: h58, padding 0 7 0 28, 16px, trailing icon in a 44px dark circle (`#03130A`, icon `#8FF3B8`).
  - md: h46, padding 0 6 0 18, 14px, 34px circle.
  - sm: h38–40, padding 0 16–18, 14px (nav "CV" button).
  - disabled: opacity .4, saturate(.4). loading: 16px spinner (2px ring, top color `#03130A`, .8s linear).
- **Glass** (secondary): `.glass` + pill, h58 / 0 28px, hover background `linear-gradient(180deg,rgba(255,255,255,.13),rgba(255,255,255,.05))` + `translateY(-2px)`.
- **Glass small** (Démo / Code / Copier): h46, bg `rgba(255,255,255,.05)`, border `rgba(255,255,255,.10)`, inset top highlight; hover bg `.10`, border `.18`.
- **Link**: `accent-light`, 1px bottom border `rgba(143,243,184,.35)`; hover border solid + gap 8→12px.
- **IconButton**: 38px circle, glass-small styling; hover fills `#62DC94` with `#03130A` icon.

### Badges
- **StatusBadge**: pill, bg `rgba(98,220,148,.08)`, border `rgba(98,220,148,.22)`, 13px `#BDECCF`, 8px green dot with pulse ring (2.2s: box-shadow 0→9px `rgba(98,220,148,.55→0)`).
- **Tag**: h26, padding 0 10, bg `.04`, border `.08`, Geist Mono 12 `#B9C4BE`.
- **Category**: h28, green-tinted (`rgba(98,220,148,.08)` / border `.2`), mono 12 `#A8EFC6`, Lucide icon + label.
- **MediaChip** (on images): h28, `rgba(6,9,7,.45)` + blur(12px), border `rgba(255,255,255,.14)`.
- **Eyebrow**: mono 12 uppercase `.06em` `#62DC94`.

### Navbar
Centered floating `.glass` pill, 28px from top, padding 6, gap 4: monogram (34px green gradient circle "CL") + "Camille Laurent" (Instrument Serif 21px) · 1px divider · links (padding 10×18, 14px 500, `#B9C4BE`; hover `#EEF2EF` + bg `.06`; active bg `.09` + inset highlight) · primary-sm "CV ⬇".

### Forms
- Input: h52, radius 14, padding 0 18, bg `rgba(255,255,255,.035)`, border `rgba(255,255,255,.09)`, `inset 0 1px 2px rgba(0,0,0,.25)`, 15px. Placeholder `#6B7770`.
- Focus: border `rgba(98,220,148,.7)`, bg `rgba(98,220,148,.045)`, ring `0 0 0 4px rgba(98,220,148,.14)`.
- Error: border `rgba(240,138,126,.7)`, ring `rgba(240,138,126,.12)`, message 13px `#F0A398`.
- Label: 13px 500 `#B9C4BE`, 8px above field.
- ChipGroup (single select): h40 pills; active border `rgba(98,220,148,.6)`, bg `.12`, text `#C3F8D8`, ring 3px `.10`.
- Checkbox 22px radius 7 (checked = green gradient + check icon); Toggle 44×26 green track, 20px dark knob.

### ProjectCard — featured (large, vertical)
`.glass`, radius 28, padding 12, 3-column grid (≈384px each at 1440). Hover `translateY(-4px)` .35s.
1. Cover 4:3, radius 18, border `.07`; chips top-left "● Projet phare" and top-right year.
2. Body padding 24 12 12, gap 20: eyebrow (category) → title H3 44px → summary 15px muted.
3. `<dl>` 2×2 grid (1px gap on `rgba(255,255,255,.07)`, radius 16; cells `rgba(6,10,8,.55)` padding 14×16): Rôle, Période (Rubik 14 500), then 2 metrics (Instrument Serif 30 `#8FF3B8`) with mono 11 uppercase labels.
4. Stack tags.
5. Actions (pinned bottom): primary-md "Étude de cas →" (flex:1) + glass-small "Démo ↗" + "Code".

### ProjectCard — small
`.glass`, radius 22, padding 24, min-h 236, gap 16, 3-col grid. Top row: Category badge + IconButton ↗. Title H4 30px, desc 14px. Footer (border-top `.06`, pt 16): 2 tags + year (mono 12).

### MDX components (section 06 of the library)
`ProjectHero` (from frontmatter: breadcrumb, eyebrow, H1 120px, summary, CTA buttons, 4-col meta dl Rôle/Période/Équipe/Stack, 21:8 cover) · `Toc` (sticky glass, active item with green dot) · `Callout type="info|success|warning" title` · `CodeBlock title highlight` (also style default ```fences — e.g. Shiki/rehype-pretty-code with the colors: keyword `#8FF3B8`, property `#7FD1C7`, string `#D9C98F`, comment `#5F6B64`, line numbers `#4D5852`, highlighted line bg `rgba(98,220,148,.08)` + 2px left inset `#62DC94`) · `Figure src caption` · `Stats items` · `TechStack groups` · `Steps/Step` · `Quote author role` · `LinkCard href` · `Accordion` (native `<details>`).
**Prose defaults** (map via MDXProvider components): h2 Instrument Serif 44/1.1; h3 Rubik 500 20px; p 17/1.75 `#B9C4BE`; a `#8FF3B8` underline offset 4 (decoration `rgba(143,243,184,.4)`); ul bullets = 6px green rotated squares; inline code mono .88em, bg `.07`, border `.08`, radius 6, `#C3F8D8`; blockquote = Instrument Serif italic 30px with large green “ glyph (no left border).

### Project frontmatter (drives cards + hero)
```yaml
---
title: Atlas
summary: Plateforme de gestion de flotte…
category: SaaS · Logistique
featured: true          # true = large card, false = small card
year: 2026
role: Lead full-stack
period: 2025 — 2026
stack: [Next.js, NestJS, PostgreSQL, AWS]
metrics:
  - { label: Traitement, value: "−38 %" }
  - { label: Utilisateurs, value: "4 200" }
cover: ./atlas.png
demo: https://atlas.app
repo: github.com/camille/atlas
---
```

---

## Screens

### 2a — Accueil (1440×900, full viewport height)
Navbar · centered hero (vertical center): StatusBadge "Disponible · Freelance & CDI" → H1 "Camille *Laurent*" 172px/0.9 (32px above) → "Développeur Full-Stack" Rubik 22 `#C5CEC9` flanked by 32px hairlines (28px above) → buttons (56px above, gap 14): primary-lg "Voir les projets →" + glass "Me contacter". Footer (padding 0 48 32): "© 2026 — Paris, France" mono 13 + social pills (h36: GitHub ↗, LinkedIn ↗, CV ⬇).

### 2b — Projets
Navbar · header (pt 96): eyebrow "Projets — 09", H1 "Sélection de *travaux*" 108px; right-aligned intro 17px max-w 380 · filter row (pt 56): glass segmented control (Tous active = green gradient pill; Web, API, Mobile, Open source) + "Trier : plus récents ⌄" · section label "Projets phares —— 03" (mono uppercase with fading line) · 3 featured cards · "Autres projets —— 06" · 6 small cards (3×2) · CTA glass banner (radius 32, padding 48×56): "Un projet en *tête* ?" 60px + subline + primary-lg "Me contacter →" · footer.

### 2c — Contact
Navbar · 2-col grid 5fr/6fr, gap 64 (pt 88).
Left: eyebrow, H1 "Travaillons *ensemble.*" 100px, intro; glass info panel (radius 24) with rows (padding 20×24, dividers `.06`): Email + "Copier" button, Localisation, Disponibilité (pulse dot); 3 glass link tiles (GitHub, LinkedIn, CV with green monogram).
Right: glass form card (radius 32, padding 40, min-h 660): title "Envoyer un message" 40px + "Réponse sous 48 h"; Nom + Email (2 cols); Objet ChipGroup (Freelance, CDI, Collaboration, Autre); Message textarea (min-h 190); footer: privacy note + primary "Envoyer le message →".

## Interactions & State
- Nav links route between pages; active link styled.
- Copy email: `navigator.clipboard.writeText`, label "Copier" → "Copié ✓" for 1.8s.
- Contact form state: `subject` (default "Freelance"), `status: idle | sending | sent | error`. Validate name required, email format (show Input error state). On submit → loading button → success panel (green check circle 84px, "Message *envoyé*", text, glass "Écrire un autre message" resets). Backend suggestion: Resend / Formspree / server action.
- Projects filter: segmented control filters by `category` (designed static; implement client-side). Sort by year desc.
- Card hovers: featured −4px, small −3px, tiles −3px; IconButton fill green.
- All transitions .2–.35s, `cubic-bezier(.2,.8,.2,1)`.

## Responsive (not designed — guidance)
≥1280: as designed. 768–1279: side padding 48, featured 2 cols, small 2 cols, contact stacks to 1 col. <768: padding 20, all 1 col, H1 home ~72px (use `clamp()`), nav collapses to brand + menu IconButton opening a glass sheet. Keep hit targets ≥44px.

## Assets
- Icons: **Lucide** (`lucide-react`), stroke 2, 16/18/20px, `currentColor`. Used: arrow-right, arrow-up-right, arrow-left, download, chevron-down, x, check, info, triangle-alert, plus, minus, star, github, linkedin, file-text, terminal, server, globe, puzzle, activity, bot. (Brand icons are deprecated in Lucide — consider Simple Icons for GitHub/LinkedIn.)
- Images: all covers/screenshots are striped placeholders — replace with real project captures (cards 4:3, hero cover 21:8, figures 16:10).
- Copy (name, projects, metrics) is placeholder content.

## Files
- `design/Portfolio v2.dc.html` — the 3 pages
- `design/Composants.dc.html` — component library + MDX components
- `design/support.js` — runtime needed to open the .dc.html files in a browser
