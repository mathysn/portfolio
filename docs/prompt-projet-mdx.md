# Prompt — rédiger la fiche MDX d'un projet pour le portfolio

Copie tout le bloc ci-dessous dans une session Claude Code ouverte **dans le projet à présenter**, après avoir rempli les deux paramètres en tête.

---

```text
Rédige la fiche MDX de CE projet pour mon portfolio (site Next.js + MDX). Lis le projet avant d'écrire.

PARAMÈTRES
- TAILLE : phare          ← « phare » (grande carte avec photo + étude de cas complète) ou « petit » (petite carte + fiche courte)
- DESTINATION : ./        ← dossier où écrire le fichier (ex. ../portfolio/content/projets/). Par défaut : racine de ce projet.

1. COLLECTE (avant d'écrire)
Cherche les infos dans : README et docs, package.json / pyproject / go.mod / Cargo.toml (stack, homepage), `git log` (dates du premier et du dernier commit → year et period ; nombre d'auteurs distincts → piste pour team), `git remote -v` (repo), fichiers de déploiement (vercel.json, netlify.toml, Dockerfile, CI) et URL de prod dans le README, code source (architecture, choix techniques, ce qui est intéressant), captures existantes (docs/, public/, assets/, screenshots/).
N'invente RIEN qui soit factuel (chiffres, nombre d'utilisateurs, résultats, citations, noms, dates, équipe). Toute info introuvable devient un marqueur `[À COMPLÉTER : ce qu'il faut fournir]` (voir §5).

2. FICHIER À PRODUIRE
Nom : `<slug>.mdx`, slug en kebab-case sans accents tiré du nom du projet (ex. `meteo-board.mdx`). Le slug est aussi l'URL /projets/<slug>.
Frontmatter YAML (validé par zod au build, un champ invalide casse le site) :

---
title: Nom du projet                      # court, 1–3 mots
summary: "Une ou deux phrases : ce que fait le projet et pour qui."   # entre guillemets si la phrase contient « : »
category: Web                             # libellé du badge, ≤ 24 caractères (voir règles)
kind: [web]                               # 1+ valeurs parmi : web | api | mobile | oss (filtres de la page Projets)
featured: true                            # true si TAILLE=phare, false si TAILLE=petit
year: 2026                                # entier, année de fin (ou année en cours si actif)
role: Développeur full-stack              # mon rôle
period: "2025 - 2026"                     # toujours entre guillemets ; une seule année → "2024"
team: 2 devs · 1 designer                 # optionnel (affiché dans l'en-tête de l'étude de cas)
stack: [Next.js, PostgreSQL, Docker]      # par ordre d'importance : la carte montre les 2 premiers, l'en-tête les 3 premiers
cover: /projets/<slug>/cover.avif          # optionnel ; absent → placeholder rayé
thumbnail: /projets/<slug>/thumbnail.avif  # optionnel, projets phares : image de la carte ; absent → cover
demo: https://exemple.app                 # optionnel (le https:// peut être omis)
demoLabel: Docs                           # optionnel, défaut « Démo » (ex. « Docs » pour une lib)
repo: github.com/moi/projet               # optionnel
---

Règles du frontmatter :
- summary : TAILLE=phare → 120 à 180 caractères ; TAILLE=petit → 60 à 110 caractères. Pas de jargon inutile, pas de point d'exclamation. Sur ordinateur, la carte coupe le résumé après 2 lignes (environ 80 caractères) : l'essentiel doit tenir au début. Le résumé entier s'affiche sur la page du projet.
- category : pour un petit projet, préfère un de ces mots qui affichent une icône : CLI, API, Web, Extension, Data, DevOps. Pour un projet phare, format « Domaine · Sous-domaine » (ex. « SaaS · Logistique », « Mobile · Temps réel »).
- kind : `oss` si le code est public et réutilisable par d'autres ; plusieurs valeurs possibles.
- `metrics` existe dans le schéma mais n'est plus affiché : ne le remplis pas, mets les chiffres clés dans <Stats> dans le corps.
- Un marqueur [À COMPLÉTER …] dans le YAML doit être entre guillemets ; pour `year` (entier), mets ta meilleure estimation tirée de git et signale-le dans la checklist.
- Si `demo` ou `repo` sont introuvables, omets la ligne et mentionne-le dans la checklist.

3. CORPS MDX
Composants disponibles SANS import (n'écris aucun `import`) :
- <Callout type="info|success|warning" title="Titre">Texte court.</Callout>
- <Figure src="/projets/<slug>/vue.avif" alt="Description" caption="Fig. 1 - Légende" label="capture - vue.avif" />   (sans src → placeholder qui affiche `label`)
- <Stats items={[{ value: "-38 %", label: "temps de traitement" }, { value: "4 200", label: "utilisateurs actifs" }]} />
- <TechStack groups={[{ label: "Front", items: ["Next.js", "Tailwind"] }, { label: "Back", items: ["NestJS"] }]} />
- <Steps><Step title="Découverte">Une phrase.</Step><Step title="Lancement">Une phrase.</Step></Steps>
- <Quote author="Prénom Nom" role="Poste, Entreprise">Citation.</Quote>
- <LinkCard href="https://github.com/moi/projet" title="moi/projet" meta="TypeScript" stars={240} />
- <Accordion><AccordionItem title="Question ?" open>Réponse.</AccordionItem><AccordionItem title="Autre ?">Réponse.</AccordionItem></Accordion>
- Code : bloc Markdown ```ts title="chemin/fichier.ts" {5} (titre + ligne 5 surlignée), ou <CodeBlock title="…" lang="tsx" highlight="3-4" code={`…`} />
- Markdown standard : ## titre, ### sous-titre, listes, `code`, > citation, [liens](url).

Contraintes MDX :
- Les ## et ### alimentent le sommaire de la page : titres courts (≤ 4 mots), le premier titre du corps est un ##, pas de # (le titre est déjà affiché).
- Échappe `<`, `>`, `{`, `}` dans le texte (`&lt;` ou {"<"}) ; dans une prop JSX, mets la valeur entre guillemets.
- Contenu des composants sur une seule ligne quand c'est une phrase (sinon il est rendu comme un paragraphe pleine taille).
- N'utilise que des marqueurs [À COMPLÉTER …] pour les chiffres, citations et résultats inconnus : jamais de valeur inventée « plausible ». Un <Quote> ou un <Stats> sans données réelles → mets-le quand même avec des marqueurs, ou retire-le si ça n'a pas de sens pour ce projet.

Structure selon TAILLE :
- phare (600 à 1000 mots) :
  ## Le contexte : le problème, pour qui, l'objectif (+ ### Contraintes techniques en liste)
  ## Architecture : choix techniques et pourquoi, <TechStack>, un extrait de code réellement tiré du projet (le passage le plus parlant, ≤ 15 lignes, avec titre = chemin réel du fichier), un <Callout> si une limite ou un point notable existe, éventuellement un <Accordion> pour 2–3 « pourquoi X ? »
  ## Résultats : <Stats> (2 à 4 chiffres) + un <Callout type="success">, <Quote> seulement si une vraie citation est fournie
  ## Ce que j'ai appris : 1–2 paragraphes honnêtes + <Steps> si le déroulé du projet est connu, <LinkCard> vers le repo s'il est public
  Au moins 2 <Figure> (voir §4).
- petit (80 à 200 mots) :
  ## Le projet : ce que ça fait et pourquoi, en 2–4 phrases
  puis UN élément parmi : une liste de 3 fonctionnalités, un court bloc de code (commande d'usage pour une CLI/lib), une <Figure>, ou un <Callout>.
  Pas de <Stats>, <Steps>, <Quote> ni <Accordion>.

Ton : français, première personne, phrases courtes et concrètes, orienté décisions et résultats. Pas de superlatifs (« révolutionnaire », « ultra »), pas d'emoji, pas de tiret long « — » : utilise « - », « : » ou une virgule.

4. IMAGES
Les images vont dans le portfolio sous `public/projets/<slug>/` et sont référencées en `/projets/<slug>/fichier.avif`. Toutes les images sont en AVIF (qualité ~65, sous-échantillonnage 4:4:4 pour garder le texte des captures net) : convertis les captures PNG ou JPG avant de les copier.
- cover (utile même pour un petit projet : affichée en haut de l'étude de cas) : 2400×1200, affichée entière sur grand écran, recadrée en 16:10 sur mobile (garde de la marge sur les côtés).
- thumbnail (projet phare seulement, optionnel) : image de la carte sur la page Projets, 1600×1000, par exemple le logo centré sur un fond uni. Le sujet doit tenir dans les 60 % centraux de la hauteur, car la carte recadre entre 16:10 et 21:9 selon l'écran. Sans thumbnail, la carte recadre la cover.
- Figures : 1600×1000 (16:10).
Si le repo contient déjà des captures exploitables, utilise-les (indique le chemin source à copier). Sinon, mets `label="capture - <nom>.avif"` sans `src`, et décris dans la checklist ce qu'il faut capturer : écran ou route, état de l'interface (données de démo, modale ouverte…), taille.
Propose 1 cover + 1 thumbnail + 2 à 4 figures pour un projet phare, 1 cover + 0 à 1 figure pour un petit projet.
Utilise les outils que tu possèdes pour faire des captures toi même de ce que tu veux montrer (quand c'est possible)

5. FIN DE TÂCHE
Écris le fichier dans DESTINATION, vérifie que le YAML est valide (guillemets, listes, `year` entier) et qu'aucun `import` n'est présent, puis affiche dans ta réponse :
- le chemin du fichier créé ;
- « À compléter » : chaque marqueur [À COMPLÉTER …] avec où il se trouve et ce qu'il faut fournir ;
- « Images » : pour chaque image, nom de fichier, contenu à capturer, dimensions, et chemin source si elle existe déjà ;
- « Hypothèses » : ce que tu as déduit sans certitude (année, rôle, kind, catégorie…), pour que je valide.
```
