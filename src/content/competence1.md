# Compétence 1 : Réaliser un développement d’application

## Contexte
Dans le cadre de mon alternance d’un an, j’ai travaillé sur la réalisation d’une **application web d’entrée**, servant de menu centralisé pour accéder à l’ensemble des applications et modules disponibles pour les clients.  
Jusqu’alors, cette fonction était assurée par une application Java, limitée au lancement des modules développés dans ce langage. Mon travail a donc consisté à **moderniser l’outil existant** et à proposer une version web, mieux intégrée dans l’écosystème technique actuel de l’entreprise.

---

## Actions réalisées

### Initialisation du projet
- J’ai créé un nouveau projet **React/TypeScript** directement au sein du **monorepo Nx** utilisé par l’entreprise.  
- Nx permet de générer facilement un projet standardisé à l’aide d’une commande (`nx g @nx/react:app`), ce qui garantit que le projet est automatiquement placé au bon endroit, avec la structure, les scripts et la configuration conformes aux standards internes.  
- Cela m’a permis de partir sur une base propre, parfaitement intégrée avec les autres projets déjà présents dans le monorepo.  

### Développement de l’interface utilisateur
- J’ai utilisé **Tailwind CSS** pour la mise en forme, car ce framework utilitaire permet de créer des interfaces réactives, modernes et cohérentes avec les autres projets web de l’entreprise.  
- J’ai intégré **Material UI (MUI)**, une librairie de composants riche et personnalisable, qui m’a permis de gagner du temps dans la création d’éléments standards (boutons, menus, boîtes de dialogue) tout en gardant la possibilité de les adapter au design souhaité.  
- Enfin, j’ai exploité la **librairie interne de composants React** développée par l’entreprise, afin de répondre aux besoins métiers spécifiques et de garantir une uniformité avec les autres applications web.

### Reprise de l’interface existante
- L’un des besoins exprimés était de **conserver une interface proche de l’application Java** déjà utilisée par les clients, afin de ne pas les perturber.  
- J’ai donc recréé une interface similaire dans le menu web, reprenant la structure et l’organisation des menus.  
- Cela a permis d’assurer une continuité dans l’expérience utilisateur, tout en ouvrant la voie à l’introduction d’une version plus moderne.

![interface maquette 1](/portfolio/images/maq1-existant.png)
<figcaption align="center"><small><em>Trace 1 : Interface existante</em></small></figcaption><br>

![interface maquette 1](/portfolio/images/maq1.png)
<figcaption align="center"><small><em>Trace 2 : Modernisation de l'existant</em></small></figcaption>

### Conception d’une interface modernisée
- En parallèle de la reprise de l’existant, j’ai développé une **seconde version de l’interface**, plus contemporaine.  
- Celle-ci intègre un design plus épuré, des sous-menus repliables et une hiérarchisation plus claire des modules.  
- L’objectif était de proposer aux utilisateurs un choix entre deux interfaces : l’une conservatrice et familière, l’autre moderne et optimisée.  

![interface maquette 1](/portfolio/images/maq2-ferme.png)
<figcaption align="center"><small><em>Trace 3 : Nouvelle interface (menus fermés)</em></small></figcaption><br>

![interface maquette 1](/portfolio/images/maq2-ouvert.png)
<figcaption align="center"><small><em>Trace 4 : Nouvelle interface (menus ouverts)</em></small></figcaption>

### Implémentation d’une barre de recherche dynamique
- J’ai développé une barre de recherche avec **filtrage en temps réel** : les résultats s’adaptent directement au fur et à mesure de la saisie.  
- Cette fonctionnalité s’adresse particulièrement aux clients qui savent déjà quel module ils veulent utiliser, leur évitant de parcourir toute la liste.  
- J’ai veillé à ce que la recherche soit performante même avec un grand nombre de modules.  

![interface maquette 1](/portfolio/images/barre-recherche.png)
<figcaption align="center"><small><em>Trace 5 : Barre de recherche dynamique</em></small></figcaption>

### Création d’un menu latéral réutilisable
- J’ai conçu un **menu latéral unique** pouvant être intégré dans toutes les applications web du monorepo.  
- Ce menu reprend les mêmes informations que l’interface principale (menus et sous-menus), mais reste présent en permanence : il suit l’utilisateur partout dans sa navigation.  
- J’ai ajouté la possibilité de gérer des **onglets ou sous-modules spécifiques** à chaque module.  
- Techniquement, ces sous-modules sont transmis via une **prop React**, ce qui permet de rendre le composant flexible et adaptable à chaque contexte.  

![interface maquette 1](/portfolio/images/menu-lateral.png)
<figcaption align="center"><small><em>Trace 6 : Composant de menu latéral</em></small></figcaption>

### Intégration avec le back-end
- J’ai utilisé **Axios**, une librairie de requêtes HTTP, pour communiquer avec le backend existant (base **Progress** connectée à un serveur **Spring**).  
- En plus de la simple récupération des données, j’ai mis en place un **traitement** pour les transformer et les structurer, afin qu’elles soient directement exploitables et typées en **TypeScript**.  
- Cela a renforcé la robustesse du code et facilité l’utilisation des données dans l’ensemble de l’application.  

---

## Compétences mobilisées

- **Développement d’applications web modernes** : maîtrise de React et TypeScript pour concevoir une application robuste, intégrée dans un monorepo Nx.  
- **Utilisation de frameworks et librairies avancés** : exploitation de Tailwind CSS et MUI pour le design, et de la librairie interne pour respecter les besoins métiers.  
- **Conception d’interfaces ergonomiques** : reprise de l’existant pour préserver les habitudes des utilisateurs, tout en proposant une version modernisée.  
- **Programmation orientée composants** : création d’un menu latéral réutilisable et modulable grâce aux props React et au typage TypeScript.  
- **Communication avec un backend** : intégration des données via Axios et structuration en modèles typés, garantissant la fiabilité et la maintenabilité du code.  
- **Approche centrée utilisateur** : mise en place d’une recherche dynamique et d’une navigation fluide, adaptées aux différents profils de clients.  

---

## Résultats obtenus

- Une **application web fonctionnelle** intégrée dans le monorepo de l’entreprise.  
- Deux interfaces disponibles :  
  - l’une fidèle à l’ancien menu Java pour ne pas perturber les clients,  
  - l’autre moderne et optimisée pour une meilleure expérience.  
- Une **navigation améliorée** grâce à la recherche dynamique et au menu latéral persistant.  
- Une base technique solide, réutilisable pour les futurs projets web de l’entreprise.  

Ce projet illustre ma capacité à réaliser un développement d’application complet, en combinant des compétences techniques, ergonomiques et organisationnelles.
