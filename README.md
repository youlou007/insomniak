# Yacine et la Lune

Un site web élégant pour présenter des poèmes sur fond noir avec des particules animées.

## Caractéristiques

- Design minimaliste avec fond noir et particules animées
- En-tête avec image de main
- Menu hamburger avec barre de recherche
- Affichage des poèmes en grille (2 colonnes sur desktop, 1 colonne sur mobile)
- Fonctionnalité "voir plus" pour les poèmes plus longs
- Mise en surbrillance des résultats de recherche

## Installation

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé (version 14.x ou supérieure)
2. Clonez ce dépôt
3. Installez les dépendances :

```bash
npm install
```

## Démarrage

Pour lancer le serveur de développement :

```bash
npm run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Production

Pour créer une version de production :

```bash
npm run build
npm start
```

## Technologies utilisées

- Next.js
- React
- Tailwind CSS
- Framer Motion

## Structure du projet

- `pages/` - Pages Next.js (y compris l'API)
- `components/` - Composants React réutilisables
- `public/images/` - Images et ressources statiques
- `styles/` - Fichiers CSS globaux 