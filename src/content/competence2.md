# Compétence 2 : Optimiser des applications informatiques

## Contexte
Durant mon alternance, j’ai travaillé sur le développement d’un **menu web centralisé** destiné à remplacer l’ancien menu Java.  
Au-delà de la réalisation technique, une partie importante de mon travail a consisté à **optimiser l’application**, afin d’assurer sa performance, sa maintenabilité et sa facilité d’utilisation dans un contexte professionnel.

---

## Actions réalisées

### Structuration et maintenabilité du projet
- J’ai intégré l’application dans le **monorepo Nx** de l’entreprise, ce qui garantit une structure claire, une gestion simplifiée des dépendances et un suivi cohérent des différentes applications web.  
- Grâce à Nx, l’application bénéficie automatiquement d’outils de **versionnage**, de scripts standardisés et d’une organisation conforme aux pratiques internes, réduisant les risques d’erreurs et facilitant la collaboration future.  

### Optimisation de l’ergonomie utilisateur
- J’ai conçu **deux interfaces distinctes** :
  - une fidèle à l’existant pour préserver les habitudes des clients,  
  - une seconde plus moderne et épurée, intégrant des sous-menus repliables et une navigation plus fluide.  
- Cette approche permet de **minimiser la perte de repères** pour les utilisateurs tout en leur offrant une expérience plus efficace s’ils choisissent la version moderne.  

### Recherche dynamique et gain de temps
- La mise en place d’une **barre de recherche dynamique** optimise l’accès aux modules.  
- Contrairement à une navigation classique, les résultats apparaissent instantanément au fur et à mesure de la saisie, ce qui réduit considérablement le temps nécessaire pour atteindre un module précis, surtout dans une liste volumineuse.  

### Mutualisation du menu latéral
- J’ai développé un **menu latéral réutilisable**, commun à toutes les applications web de l’entreprise.  
- Ce composant, basé sur React et TypeScript, améliore la cohérence des projets tout en réduisant le code dupliqué.  
- Les onglets et sous-modules propres à chaque application sont injectés dynamiquement via des **props**, garantissant une utilisation flexible et adaptable.  

### Optimisation du traitement des données
- Lors de l’intégration avec le backend existant (Progress + Spring), j’ai utilisé **Axios** pour effectuer les requêtes.  
- Plutôt que d’afficher directement les données brutes, j’ai mis en place un **traitement de structuration** afin de les transformer en objets clairement typés, exploitables en TypeScript.  
- Cette démarche améliore la **robustesse du code**, réduit les erreurs et facilite la maintenance future.  

---

## Compétences mobilisées
- **Organisation et optimisation du code** grâce à l’intégration dans un monorepo Nx.  
- **Amélioration de l’ergonomie** par la conception d’interfaces adaptées aux besoins réels des utilisateurs.  
- **Réduction des temps de recherche** avec la mise en place d’un filtrage dynamique.  
- **Mutualisation des composants** avec la création d’un menu latéral flexible et réutilisable.  
- **Traitement et typage des données** pour garantir des performances stables et un code plus fiable.  
- **Respect des standards et bonnes pratiques** afin d’assurer une application performante et maintenable à long terme.  

---

## Résultats obtenus
- Une application **plus performante et fluide** que l’ancienne version Java.  
- Une **navigation simplifiée et accélérée**, grâce à la recherche dynamique et à la nouvelle organisation du menu.  
- Un **socle technique robuste et réutilisable**, notamment via le composant de menu latéral partagé entre les projets.  
- Une meilleure **maintenabilité** du projet grâce au typage strict, à la structuration claire des données et à l’intégration dans Nx.  

Ce travail démontre ma capacité à optimiser une application, non seulement sur le plan technique (performances, maintenabilité), mais aussi sur le plan ergonomique (expérience utilisateur).
