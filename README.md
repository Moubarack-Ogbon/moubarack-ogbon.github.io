# Portfolio — Ogbon Moubarack

Portfolio professionnel : style « SaaS clair & chaleureux » (blanc cassé, encre espresso, caramel),
typographies Plus Jakarta Sans / Fraunces / JetBrains Mono, animations sobres.
Site 100 % statique — **hébergeable gratuitement sur GitHub Pages**.

## Structure du projet

```
portfolio/
├── index.html        → structure et contenu du site
├── css/
│   └── style.css     → styles (sommaire commenté en tête de fichier)
├── js/
│   ├── jquery.min.js → jQuery 3.x (embarqué : le site marche sans CDN)
│   └── main.js       → toute la logique, en jQuery, commentée en français
└── README.md         → ce fichier
```

## Aperçu en local

Aucune installation nécessaire : double-clique simplement sur `index.html`,
il s'ouvre dans le navigateur.

## Mise en ligne sur GitHub Pages (gratuit)

### Option A — l'adresse la plus propre : `https://TON-PSEUDO.github.io`

1. Crée un compte sur [github.com](https://github.com) si ce n'est pas fait.
2. Crée un **nouveau dépôt public** nommé exactement `TON-PSEUDO.github.io`
   (remplace `TON-PSEUDO` par ton nom d'utilisateur GitHub).
3. Clique sur **« uploading an existing file »** et glisse **le contenu** du
   dossier `portfolio` (le fichier `index.html` doit être à la racine du dépôt,
   avec les dossiers `css` et `js` à côté).
4. Clique sur **Commit changes**.
5. Attends 1 à 2 minutes : ton site est en ligne sur
   `https://TON-PSEUDO.github.io` 🎉

### Option B — dans n'importe quel dépôt

1. Crée un dépôt public (par exemple `portfolio`).
2. Téléverse le contenu du dossier comme ci-dessus.
3. Va dans **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Deploy from a branch**,
   branche `main`, dossier `/ (root)`, puis **Save**.
5. L'adresse sera `https://TON-PSEUDO.github.io/portfolio/`.

> Astuce : ajoute ensuite ce lien sur ton profil LinkedIn (section
> « Coordonnées ») et en tête de ton CV.

## Personnaliser

- **Textes** : tout est dans `index.html`, section par section (repères
  `<!-- ==== -->` dans le code).
- **Couleurs** : les 7 variables en tête de `css/style.css` (`:root`).
- **Rôles de la machine à écrire** : le tableau `roles` au début de la
  partie 6 de `js/main.js`.
- **Projets** : duplique une carte `<a class="project">…</a>` dans la
  section Projets.

## Crédits techniques

- [jQuery](https://jquery.com) — manipulation du DOM et animations.
- [Google Fonts](https://fonts.google.com) — Fraunces, Space Grotesk,
  JetBrains Mono.
