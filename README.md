# Portfolio — Ogbon Moubarack

Portfolio professionnel de développeur full-stack (Abidjan).
Site 100 % statique hébergé sur GitHub Pages : https://moubarack-ogbon.github.io

## Design

Repris du site [fondation-fsa-ci.org](https://fondation-fsa-ci.org/), recoloré en **bleu nuit + or** :
Poppins (titres extra-gras), Shadows Into Light (accents « écrits à la main »),
trait de crayon doré sous les mots clés, cartes qui chevauchent le héros,
bandeau défilant, bande de chiffres animés, cartes projets façon navigateur.

## Structure

```
index.html      → contenu, section par section (repères <!-- ==== -->)
css/style.css   → styles (sommaire en tête ; couleurs dans :root)
js/main.js      → JavaScript natif : menu mobile, animations, compteurs
```

## Personnaliser

- **Couleurs** : variables `--b50` à `--b950` (bleu) et `--g300` à `--g500` (or) dans `css/style.css`.
- **Projets** : dupliquer une carte `<a class="proj">…</a>` dans la section Réalisations.
- **Années d'expérience** : calculées automatiquement depuis 2022 (`js/main.js`).

## Aperçu en local

Double-cliquer sur `index.html`.
