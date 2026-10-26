# Huit Clés, escape game à Reims

Site d'un escape game **fictif** de 8 salles : projet noté du module TailwindCSS & SASS (ESGI Reims, bac+3).

- **Accueil** : la proposition de valeur et un seul appel à l'action.
- **Les salles** : 3 filtres combinables (joueurs, difficulté, accessibilité en fauteuil), prix total par groupe, fiche détail, état vide.
- **Réserver** : formulaire validé à la sortie des champs, état de chargement, confirmation.

## Lancer le projet

```bash
npm install
npm run dev              # le site, sur http://localhost:5173
npm run storybook        # le design system, sur http://localhost:6006
npm run build            # la version de production, dans dist/
```

## Organisation

| Dossier | Contenu |
|---|---|
| `src/style.css` | les tokens `@theme` (couleurs, polices) |
| `src/styles/` | les partials SASS : `_tokens.scss` (map des difficultés), `_mixins.scss` |
| `src/components/base/` | les composants de base et leurs stories : `Button`, `FilterChip`, `Field`, `RoomCard` (CSS Module SASS) |
| `src/views/` | les 3 écrans |
| `src/data/` | `rooms.json` (8 salles), `pricing.json` (tarifs par taille de groupe) |
| `src/utils/` | les calculs : prix, filtres, validation du formulaire |
| `docs/` | fiche de cadrage, dossier de projet, captures |
