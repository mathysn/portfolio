@AGENTS.md

# Portfolio de Mathys NOURRY — notes pour reprendre le projet

## Contexte
Portfolio personnel d'un développeur full-stack basé à Lyon (Mathys NOURRY), en français. Objectif : présenter ses projets et décrocher des missions freelance ou un CDI.
- **Pages** :
  - `/` : accueil plein écran, sans nav ;
  - `/projets` : grille filtrable ;
  - `/projets/[slug]` : étude de cas en MDX ;
  - `/contact` : email (avec copie), GitHub, LinkedIn ;
  - pages techniques : 404, `sitemap.xml`, `robots.txt`, favicon `src/app/icon.svg` (cercle vert, « M » tracé), décliné en `favicon.ico` (16/32/48) et `icon1.png` (192px), rastérisés depuis le SVG avec `sharp` (à régénérer si le SVG change), `src/app/apple-icon.png` (180×180, « M » sur carré vert plein), image de partage `public/og.jpg`.
- **Stack** : Next.js 16 App Router + Turbopack, React 19, MDX (`@next/mdx`), Tailwind CSS v4 (config CSS-first, pas de `tailwind.config`), TypeScript, pnpm, zod, lucide-react.
- **Origine** : un handoff de design (`design_handoff_portfolio/README.md` + maquettes `.dc.html`, à ouvrir dans un navigateur). C'est la référence visuelle. Depuis, le site a évolué sur demande de Mathys : nav sans « Accueil », cartes simplifiées, grille chronologique, version mobile, ni CV ni formulaire de contact (retirés : on le contacte par email, GitHub ou LinkedIn).
- **Contenu** : projets réels `mrveto` et `where-are-trail-ruins`. Les placeholders hérités du design ont tous été retirés. Les nouvelles fiches se génèrent avec `docs/prompt-projet-mdx.md`. Une capture reste un placeholder rayé tant que `cover`/`src` n'est pas fourni.

## Travailler avec Mathys
- Il écrit en français : réponds en français. Il veut un **plan** (mode plan) avant les gros changements.
- **Pas de tiret long « — »** dans ce qu'il voit (titres d'onglet, nouveaux textes) : utilise « - ». Le contenu existant en contient encore.
- Il a souvent `pnpm dev` déjà lancé sur le port 3000 : ne lance pas un second serveur (Next refuse), utilise le sien.
- Il teste sur téléphone via un tunnel Cloudflare. `*.trycloudflare.com` est autorisé dans `allowedDevOrigins` de `next.config.ts` ; sans ça, le JS ne se charge pas sur le téléphone.
- Repo GitHub `mathysn/portfolio`. Ne commite et ne pousse que s'il le demande : **un push sur `main` met le site en production**.

## Déploiement
- **Vercel**, branche `main` → production ; les autres branches donnent des URLs de prévisualisation.
- Domaine **`mnourry.dev`**, acheté chez OVH. La zone DNS OVH contient :
  - `A @ → 216.198.79.1` ;
  - `CNAME www → <id>.vercel-dns-017.com.` (avec le point final) ;
  - les enregistrements mail d'OVH (MX, SPF, DKIM, SRV), à laisser.

  `www` redirige en 308 vers l'apex.
- Seule variable d'environnement sur Vercel : `NEXT_PUBLIC_SITE_URL=https://mnourry.dev`, à créer en type **Config** et pas Secret (un préfixe `NEXT_PUBLIC_` est refusé en Secret). Elle est figée au build : après un changement, il faut un Redeploy.
- **Tenir ce fichier à jour** : après chaque changement important (nouvelle page ou section, nouveau composant ou hook, changement d'identité visuelle, de structure, de convention ou de schéma du frontmatter, nouveau piège découvert), mets à jour la section concernée de ce CLAUDE.md dans la même tâche, sans attendre qu'on le demande. Retire ce qui n'est plus vrai.

## Identité visuelle (« verre trempé »)
Thème sombre unique, accent vert, surfaces en verre dépoli au-dessus d'un fond aurora animé. Ambiance sobre, premium, beaucoup d'air.

- **Couleurs** (tokens `@theme` dans `globals.css`, utilisés en classes `bg-*`/`text-*`/`border-*`) :

  | Token | Valeur | Usage |
  |---|---|---|
  | `bg` | `#060907` | fond |
  | `fg` | `#eef2ef` | texte principal |
  | `fg-strong` | `#f1f5f2` | grands titres |
  | `fg-soft` | `#e2e8e4` | texte secondaire fort |
  | `fg-dim` | `#c5cec9` | texte atténué |
  | `fg-2` | `#b9c4be` | texte de prose, liens de nav inactifs |
  | `muted` | `#9aa59f` | paragraphes |
  | `faint` | `#7d8a83` | méta, mono, footers |
  | `placeholder` | `#6b7770` | placeholders |
  | `accent` | `#62dc94` | points, eyebrows |
  | `accent-light` | `#8ff3b8` | mots en italique vert, liens, icônes |
  | `accent-pale` | `#c3f8d8` | survol des liens |
  | `on-accent` | `#03130a` | texte sur vert |
  | `error` | `#f08a7e` | erreurs (`error-msg` : `#f0a398`) |
  | `warning` | `#e8c36a` | avertissements |

  Traits fins : blanc à 6–12 % (`border-white/8`).
- **Dégradé vert** (boutons primaires, pastille active, monogramme) : `linear-gradient(180deg, #8ff3b8, #56d68d 55%, #3fc47a)`, avec un halo vert en ombre portée.
- **Typo** (`next/font/google`, `layout.tsx`) :
  - `font-display` = **Instrument Serif** 400 (+ italique) pour les titres. L'accent d'un titre est un mot en *italique* `text-accent-light`, par exemple « Projets *récents* ». Exception : le nom de famille sur l'accueil est en non-italique, en dégradé vert.
  - `font-sans` = **Rubik** pour le texte (400/500, corps 17px/1.6).
  - `font-mono` = **Geist Mono** pour les eyebrows, labels, méta et le code. Labels en 11–12px MAJUSCULES `tracking-[.06em]`.
  - Grands titres en `clamp()` avec `leading-[0.9–0.95]` et `tracking-[-0.02em]`.
- **Verre** : utilitaire `glass` = dégradé blanc translucide + `backdrop-filter: blur(24px) saturate(170%)` (16px sur mobile). Son `::before` dessine un bord de 1px lumineux en haut à gauche. `glass-strong` est plus opaque, pour ce qui flotte au-dessus du contenu (nav, menus). `glass-grid` sert aux tableaux de cellules sombres (dl de méta).
- **Rayons** :
  - `rounded-full` : pills (boutons, nav, tags, chips) ;
  - 32 : CTA ;
  - 28 : grandes surfaces mobiles ;
  - 24 : carte des contacts ;
  - 22 : cartes projet ;
  - 20 : sommaire, tuiles ;
  - 18 : cadres d'image, blocs de code ;
  - 16 : callouts, dl ;
  - 14 : champs.
- **Fond** (`Background.tsx`, fixe) :
  - 4 orbes en `radial-gradient` qui dérivent lentement (`animate-drift1..4`, 26–40 s), 2 seulement sous `md` ;
  - une grille de 72px masquée vers le haut ;
  - un grain SVG à 6 %.
- **Mouvement** :
  - easing `ease-glass` = `cubic-bezier(.2,.8,.2,1)`, durées 0,2–0,5 s ;
  - survol : élévation de −2 à −4px ;
  - appui : scale 0,95–0,98 ;
  - pastilles qui glissent ;
  - apparition : fondu + flou + montée.
  - Tout est désactivé sous `prefers-reduced-motion`.
- **Icônes** : `lucide-react`, trait 2, 12–18px, `currentColor`. GitHub et LinkedIn sont dessinés à la main dans `ui/BrandIcons.tsx` (retirés de Lucide).
- **Ton éditorial** : français, première personne, phrases courtes et factuelles, ni superlatifs ni emoji.

## Commandes et vérification
`pnpm dev` · `pnpm build` · `pnpm lint` · `npx tsc --noEmit` (si `PageProps`/`LayoutProps` sont introuvables : `npx next typegen`).
- Vérifier : tsc + lint + build, puis le rendu réel.
- Captures : Chrome headless (`/c/Program Files/Google/Chrome/Application/chrome.exe --headless=new --screenshot`).
- Vrai viewport mobile : piloter Chrome via CDP (`Emulation.setDeviceMetricsOverride`). La fenêtre headless ne descend pas sous ~500px, et les captures en iframe faussent parfois les pastilles.

## Données et contenu
- `src/lib/site.ts` : identité, `brand` de la nav (« mnourry.dev », la partie après le dernier point est verte), email, ville, liens GitHub/LinkedIn, `navLinks`.
- `content/projets/<slug>.mdx` : un projet par fichier, frontmatter validé par zod dans `src/lib/projects.ts` (le build échoue si invalide).
  - Champs : `title`, `summary`, `category`, `kind` (web|api|mobile|oss, pour le filtre), `featured` (carte sur 2 colonnes avec photo), `year`, `role`, `period`, `team?`, `stack`, `cover?`, `thumbnail?` (image de la carte phare, à défaut `cover`), `demo?`, `demoLabel?`, `repo?`. `metrics` existe mais n'est plus affiché.
  - `getAllProjects()` donne l'ordre du site : année décroissante, projets phares d'abord à année égale.
  - `getHeadings()` doit produire les mêmes ids que `rehype-slug` (même github-slugger).
- `docs/prompt-projet-mdx.md` : prompt à donner dans un autre repo pour générer la fiche MDX d'un projet.
- Images : `public/projets/<slug>/…`, référencées en `/projets/<slug>/fichier.avif`. Formats : couverture 2400×1200, vignette de carte 1600×1000, figures 16:10.
  - **Toutes en AVIF** (demande de Mathys). Conversion avec `sharp`, déjà présent dans le store pnpm : `quality 65`, `effort 6`, `chromaSubsampling "4:4:4"` pour garder le texte des captures net. `next.config.ts` sert de l'AVIF (`images.formats`), avec repli WebP puis JPEG.
  - **Seules exceptions** : `og.jpg` et `apple-icon.png`. Les réseaux sociaux n'affichent pas d'aperçu en AVIF, et `apple-icon` n'accepte que PNG ou JPG.
  - `cover` : le cadre de `ProjectHero` est en 2:1 dès `md` pour l'afficher entière ; il est recadré en 16:10 sur mobile.
  - `thumbnail` : la carte phare recadre entre 16:10 et 21:9 selon l'écran (`object-cover`), donc le sujet doit tenir dans les 60 % centraux de la hauteur (ex. logo centré sur fond uni).

## Référencement
But : une recherche « Mathys Nourry » doit faire remonter le site, le LinkedIn et le GitHub.
- `src/lib/seo.ts` :
  - `pageMetadata({ title?, description, path, type? })` donne le titre, la description, la canonique et un `openGraph`/`twitter` **complet**. **Toute nouvelle page doit passer par lui** : Next remplace `openGraph` en entier à chaque segment, donc une page sans lui hérite de la carte de partage de l'accueil ;
  - `personJsonLd()` produit le JSON-LD `WebSite` + `Person` de l'accueil (`sameAs` = GitHub et LinkedIn de `site.links`), injecté dans `src/app/page.tsx`.
- `layout.tsx` : `metadataBase`, `authors`, `robots.googleBot` (aperçus larges), et les valeurs de partage par défaut. Pas de canonique ni d'`index` explicite, qui fuiraient sur la 404.
- `public/og.jpg` (1200×630, 57 Ko) est statique. C'est un rendu HTML via Chrome headless (polices du site, fond aurora, « Mathys NOURRY », métier · Lyon, logo + `mnourry.dev`), exporté en JPG car WhatsApp ignore les images de plus de ~600 Ko. Il faut le régénérer si le nom, le métier ou le domaine change. Les fiches projet l'utilisent aussi, puisque leurs couvertures AVIF ne passent pas sur les réseaux.
- Hors code (à faire par Mathys) : Search Console (domaine vérifié par TXT chez OVH, sitemap envoyé), Bing Webmaster Tools, liens vers `mnourry.dev` depuis LinkedIn et GitHub.

## Architecture
- `src/app/layout.tsx` : polices, métadonnées (titres `%s - Mathys NOURRY`), viewport, et les éléments **persistants** entre les pages : `Background`, `Navbar`, `ScrollThumb`, `RevealGate`. Chaque `page.tsx` enveloppe son contenu dans `<PageTransition>` (React `<ViewTransition>` : fondu entre pages).
- `src/app/projets/[slug]/page.tsx` : importe `@content/projets/${slug}.mdx` (alias `@content/*` dans tsconfig), `generateStaticParams`, `dynamicParams = false`.
- `src/mdx-components.tsx` (dans `src/`, requis par `@next/mdx`) :
  - mapping Markdown (liens, code inline, blockquote) ;
  - blocs ``` (`rehype-pretty-code`, thème `src/lib/shiki-theme.json`) → `CodeFrame` ;
  - composants MDX globaux.
- `src/app/globals.css` :
  - tokens et variante `short:` ;
  - utilitaires `glass*`, `btn-*` ;
  - prose `.prose-glass`, blocs de code ;
  - view transitions, animation d'entrée, chorégraphie du filtre.
- Variables d'environnement (`.env.example`) : seulement `NEXT_PUBLIC_SITE_URL` (métadonnées, sitemap, robots). Elle est figée au build : la changer sur Vercel demande un redéploiement.

## Composants (`src/components/`)
- **ui/** : primitives réutilisables.
  - `Button` : variants `primary|glass|soft|link`, tailles `lg|hero|md|sm|xs|adaptive`, `icon` en fin de bouton (dans une pastille sombre pour primary). Rendu en `Link`, `<a>` ou `<button>` selon `href`.
  - `Badges` : `Tag`, `TagList`, `Category`, `Eyebrow`, `MetaLabel`, `MediaChip`, `SectionLabel`, `StatusBadge`, `PulseDot`.
  - `Cover` : cadre d'image avec placeholder rayé.
  - `Zoomable` : rend un `Cover` cliquable et ouvre l'image entière (non recadrée) dans un `<dialog>` natif (`.lightbox` dans `globals.css`). Fermeture par Échap, clic n'importe où ou bouton. L'image pleine n'est chargée qu'à l'ouverture. Utilisé par `Figure` et la couverture de `ProjectHero` quand `src` existe.
  - `Segmented` : filtre en pills avec pastille glissante.
  - `Collapsible` : `<details>` animé.
  - `Breadcrumb`, `BrandIcons`.
- **layout/** :
  - `Navbar` (pill, pastille glissante, cachée au scroll sous `lg`) ;
  - `Background` ;
  - `Footers` (`HomeFooter`, `SiteFooter`) ;
  - `PageTransition`, `RevealGate`, `ScrollThumb` (barre de scroll superposée ; la native est masquée sur desktop).
- **projects/** :
  - `ProjectsExplorer` : filtre + grille animée ;
  - `ProjectCard` (phare = 2 colonnes avec photo) ;
  - `FilterMenu` : menu déroulant du filtre sur mobile ;
  - `CtaBanner` (« Un projet en tête ? ») ;
  - `ProjectPager` : précédent/suivant, « suivant » en premier sur mobile.
- **contact/** : `ContactLinks` (`ContactInfo.tsx`), une carte en verre à 3 lignes :
  - email : lien `mailto:` + `CopyButton`, avec un `<wbr>` après le @ pour passer à la ligne sur les petits écrans au lieu d'être coupé ;
  - GitHub et LinkedIn : la ligne entière est un lien externe.
- **mdx/** :
  - `ProjectHero` : en-tête de l'étude de cas, généré depuis le frontmatter ;
  - `Toc` (sommaire sticky ≥ xl) et `TocDisclosure` (repliable < xl) ;
  - `CodeBlock`/`CodeFrame`/`CopyButton` ;
  - `MdxBlocks` : `Callout`, `Figure`, `Stats`, `TechStack`, `Steps`/`Step`, `Quote`, `LinkCard`, `Accordion`/`AccordionItem`.
- **Hooks** (`src/lib/`) :
  - `useSlidingPill` : mesure l'élément actif pour la pastille ;
  - `useHideOnScroll`.
- **Utils** (`src/lib/utils.ts`) : `cn`, `gutter`, `pad2`, `isInternalRoute`, `isExternal`.

## Conventions UI
- Colonne de page : `gutter` (gouttières 20 → 32 → 48 → 64 → 120px + `max-w-[1440px]`, donc un contenu ≤ 1200px). Paliers Tailwind standards ; `xl` = maquette desktop.
- Variante maison `short:` (hauteur ≤ 500px) : téléphone en paysage.
- Survols des utilitaires `btn-*` sous `@media (hover: hover)`. Chaque bouton a un retour d'appui (`:active` → léger scale). Cibles tactiles ≥ 44px via `pointer-coarse:`.
- Pastilles glissantes (nav, filtre desktop) : tant qu'elles ne sont pas mesurées (ou sans JS), l'élément actif se colore lui-même.
- Nav : même pill à toutes les tailles, masquée sur `/`, se cache au scroll vers le bas sous `lg`.
- Projets :
  - grille unique chronologique, cartes phares sur 2 colonnes (`grid-flow-row-dense`) ;
  - hauteur des cartes : dès `md`, le résumé est coupé à 2 lignes (`md:line-clamp-2`) pour que toutes les rangées fassent la même hauteur (252px avec une carte phare). Le contenu d'une carte remplit toute sa hauteur (`flex-1`), donc le pied (tags, année) reste en bas. Sur mobile, le résumé est entier ;
  - filtre : `FilterMenu` sur mobile, `Segmented` dès `md` ;
  - changement de filtre : sortie puis entrée en cascade (CSS `.project-grid[data-phase]`), pas de view transition.
- Contact : en-tête identique à celui de Projets (même padding haut, même taille de titre, aligné à gauche), suivi du paragraphe. La carte des contacts (600px max), centrée en largeur, suit le titre avec le même écart que le filtre sur Projets (`pt-8 sm:pt-12`). Elle n'est pas centrée verticalement : Mathys la veut collée au titre. Mathys a refusé une version avec l'email en très grand.
- Titre d'une fiche (`ProjectHero`) : dès `lg`, il occupe toute la largeur sur **une seule ligne** (`whitespace-nowrap`). Sa taille se réduit selon le nombre de caractères (`--chars`, unités `cqi`) pour ne jamais déborder.
- Prose des fiches (`.prose-glass`) : paragraphes et puces justifiés, **sans** césure (Mathys ne veut pas de mots coupés par un tiret).
- Animation d'entrée : attribut `data-reveal` (+ `--d` pour le délai). Elle ne joue qu'au premier chargement : `RevealGate` pose `html[data-ready]`.

## Pièges déjà rencontrés (ne pas les réintroduire)
- **`view-transition-name` permanent = plus de flou** : il fait de l'élément un « backdrop root » et casse le `backdrop-filter`.
  - D'où `<ViewTransition name="site-header">`, dont le nom n'est appliqué que pendant la navigation, et un fond **sans** nom.
  - La racine de la view transition est affichée en direct (`::view-transition-old(root) { display: none }`).
- `.glass` impose `position: relative` : ne pas le combiner avec `sticky`/`fixed` sur le même élément. Mettre le positionnement sur un parent.
- Scanner Tailwind : la classe arbitraire `@max-[320px]:` n'a pas été générée. Préférer les tailles nommées (`@max-xs:`) ou un `@custom-variant`. En cas de doute, vérifier la présence de la classe dans le CSS servi.
- Les règles CSS globales hors `@layer` écrasent les utilitaires Tailwind (ex. `scrollbar-width`) : mettre les styles globaux dans `@layer base`.
- Plugins MDX dans `next.config.ts` : en chaînes de caractères avec des options sérialisables (exigence Turbopack). Le thème Shiki est lu en JSON via `fs`.
- L'intro de l'accueil translate le footer sous le pli. Le conteneur est donc en `overflow-clip` pour ne pas rendre la page scrollable, et `ScrollThumb` se recalcule aussi sur `animationend`/`transitionend`.
- MDX : échapper `<` et `{` dans le texte. Pas d'`import` dans les fiches (les composants sont globaux).
- Favicon dans Google : un `icon.svg` seul ne suffit pas, Google affichait le globe par défaut. Garder `favicon.ico` et un PNG carré multiple de 48px (`icon1.png`). Pour voir ce que Google a en cache : `https://www.google.com/s2/favicons?domain=mnourry.dev&sz=64`.
- Images d'un projet : dans `public/projets/<slug>/`, jamais à côté du `.mdx` dans `content/projets/<slug>/`. Next ne sert que `public/`, donc une image rangée dans `content/` donne une 404 et un cadre vide, sans erreur au build.
- En `pnpm dev` seulement, l'onglet affiche l'URL pendant environ 0,5 s à chaque navigation. Le `<title>` arrive en streaming après la page, et React ne l'insère qu'à la fin de la view transition `page-in`. En prod (`pnpm build && pnpm start`), les pages préchargées arrivent d'un bloc et le titre change sans trou. Ne rien corriger : `htmlLimitedBots: /.*/` a été essayé et ne change rien en dev.
