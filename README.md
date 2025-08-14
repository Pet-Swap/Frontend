# PetSwap Frontend 🐾

[![CI - Build and Test](https://github.com/Pet-Swap/Frontend/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/Pet-Swap/Frontend/actions/workflows/ci.yml)
[![Code Quality](https://github.com/Pet-Swap/Frontend/actions/workflows/code-quality.yml/badge.svg?branch=develop)](https://github.com/Pet-Swap/Frontend/actions/workflows/code-quality.yml)
[![Deploy](https://github.com/Pet-Swap/Frontend/actions/workflows/deploy.yml/badge.svg?branch=develop)](https://github.com/Pet-Swap/Frontend/actions/workflows/deploy.yml)

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-brightgreen.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.14-blue.svg)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-5.84.1-red.svg)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Description

Interface utilisateur moderne et responsive de PetSwap, une plateforme de mise en relation entre propriétaires d'animaux et pet-sitters. Cette application React offre une expérience utilisateur fluide pour gérer les profils, les animaux, les annonces et les réservations.

## 🚀 Fonctionnalités

- **Interface responsive** : Optimisée pour mobile, tablette et desktop
- **Gestion des profils** : Interface intuitive pour créer et modifier les profils
- **Gestion des animaux** : Ajout et gestion des animaux avec photos
- **Système d'annonces** : Publication et recherche d'annonces avec filtres avancés
- **Système de swipe** : Interface de matching Tinder-like pour les pet-sitters
- **Chat en temps réel** : Messagerie intégrée entre utilisateurs
- **Système de réservations** : Gestion complète des demandes et confirmations
- **Authentification** : Connexion sécurisée avec Auth0
- **Tableaux de bord** : Interfaces dédiées pour propriétaires et pet-sitters
- **Système d'avis** : Évaluation et commentaires post-prestation

## 🛠️ Technologies

- **React 19** - Framework frontend
- **Vite 6.2** - Build tool et serveur de développement
- **TailwindCSS 4.0** - Framework CSS utilitaire
- **React Router Dom 7.3** - Navigation et routage
- **TanStack Query 5.84** - Gestion d'état et cache des données
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes modernes
- **Class Variance Authority** - Gestion des variants de composants
- **Ky** - Client HTTP moderne
- **Sonner** - Notifications toast

## 📦 Prérequis

- Node.js 18 ou supérieur
- pnpm (recommandé) ou npm
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

## 🔧 Installation

```bash
# Cloner le repository
git clone https://github.com/Pet-Swap/Frontend.git
cd Frontend

# Installer les dépendances avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install

# Lancer en mode développement
pnpm dev

# Ou avec npm
npm run dev
```

L'application sera accessible sur http://localhost:5173

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# API Backend
VITE_API_BASE_URL=http://localhost:8080/api


# Application
VITE_APP_ENV=development
```

### Modes d'environnement

- `development` : Développement local avec hot reload
- `staging` : Environnement de pré-production
- `production` : Environnement de production optimisé

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants de base (boutons, inputs, etc.)
│   ├── Accueil/        # Composants de la page d'accueil
│   ├── Bookings/       # Gestion des réservations
│   ├── Dashboard/      # Tableaux de bord
│   ├── Listings/       # Gestion des annonces
│   ├── Messages/       # Système de messagerie
│   ├── Pets/           # Gestion des animaux
│   ├── Profile/        # Gestion des profils
│   ├── Registration/   # Authentification et inscription
│   ├── Reviews/        # Système d'avis
│   └── Swipe/          # Interface de matching
├── contexts/           # Contextes React (Auth, etc.)
├── hooks/              # Hooks personnalisés
├── layouts/            # Layouts de l'application
├── pages/              # Pages principales
├── router/             # Configuration du routage
├── services/           # Services API
├── types/              # Types TypeScript/PropTypes
├── utils/              # Utilitaires et helpers
└── assets/             # Images et ressources statiques
```

## 🧪 Scripts disponibles

```bash
# Développement
pnpm dev                # Lance le serveur de développement

# Build
pnpm build              # Build de production
pnpm preview            # Prévisualisation du build

# Code Quality
pnpm lint               # Vérification ESLint
pnpm lint --fix         # Correction automatique des erreurs
```

## 🎨 Design System

L'application utilise un design system basé sur :

- **TailwindCSS** pour les styles utilitaires
- **Radix UI** pour les composants accessibles
- **Shadcn/ui** comme base pour les composants personnalisés
- **CSS Variables** pour la gestion des thèmes
- **Class Variance Authority** pour les variants de composants

### Composants principaux

- `Button` - Boutons avec variants
- `Input` - Champs de saisie
- `Dialog` - Modales et popups
- `Card` - Cartes de contenu
- `Avatar` - Photos de profil
- `Select` - Menus déroulants
- `Tabs` - Navigation par onglets

## 🚀 Déploiement

### Build de production

```bash
# Créer le build optimisé
pnpm build

# Les fichiers sont générés dans le dossier 'dist/'
```

### Déploiement avec Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Déploiement avec Netlify

```bash
# Build
pnpm build

# Upload le dossier 'dist/' sur Netlify
```

### Docker

```bash
# Construire l'image
docker build -t petswap-frontend .

# Lancer le conteneur
docker run -p 3000:3000 petswap-frontend
```

## 🔗 Intégration API

L'application communique avec le backend PetSwap via une API REST. La gestion des appels API est centralisée dans le dossier `src/services/` avec :

- **Gestion d'erreurs** automatique
- **Cache intelligent** avec TanStack Query
- **Retry automatique** en cas d'échec
- **Optimistic updates** pour une meilleure UX
- **Authentification** JWT automatique

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints optimisés :

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## ♿ Accessibilité

- Navigation au clavier complète
- Support des lecteurs d'écran
- Contrastes conformes WCAG 2.1
- Focus indicators visibles
- Textes alternatifs sur les images

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code

- Utiliser ESLint pour la qualité du code
- Respecter les conventions de nommage React
- Documenter les composants complexes
- Tester sur différents navigateurs
- Optimiser les performances (Lighthouse > 90)

## 🐛 Debugging

### Outils de développement

- **React DevTools** - Inspection des composants
- **TanStack Query DevTools** - Debug des requêtes API
- **Redux DevTools** - Si applicable
- **Vite DevTools** - Analyse des performances

### Logs

```javascript
// Activer les logs en développement
localStorage.setItem('debug', 'petswap:*')
```

## 📊 Performance

- **Lazy loading** des routes et composants
- **Code splitting** automatique avec Vite
- **Images optimisées** avec lazy loading
- **Cache API** intelligent
- **Bundle size** optimisé

## 📝 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Développeur Principal** - [@Sylvain](https://github.com/SylvainCostes)

## 🔗 Liens utiles

- [Backend API](https://github.com/Pet-Swap/Backend)
- [Design System](https://petswap-design.com)
- [Documentation](https://docs.petswap.com)
- [Issues](https://github.com/Pet-Swap/Frontend/issues)
- [Figma Designs](https://figma.com/petswap-designs)

## 🎯 Roadmap

- [ ] Progressive Web App (PWA)
- [ ] Notifications push
- [ ] Mode hors-ligne
- [ ] Internationalisation (i18n)
- [ ] Tests E2E avec Playwright
- [ ] Analyse de performance avancée

---

Made with ❤️ for pet lovers
