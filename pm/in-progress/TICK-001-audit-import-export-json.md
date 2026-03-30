---
id: TICK-001
title: Audit et complétion feature import/export JSON
priority: medium
status: in-progress
created: 2026-03-30
---

## Contexte

La feature d'export JSON est partiellement implémentée (Tab3 → DataService → DataRepository) mais présente une violation de pattern : la manipulation DOM du téléchargement est effectuée dans `DataService` au lieu du composant. Par ailleurs, la feature d'import JSON (restauration de la DB depuis un fichier exporté) est entièrement absente.

## Comportement attendu

L'utilisateur peut, depuis Tab3 :
- Exporter toute la base PouchDB en JSON et télécharger le fichier sur son appareil
- Importer un fichier JSON préalablement exporté pour restaurer ses relevés mensuels

## Critères d'acceptation

- [ ] L'utilisateur peut cliquer sur "Export" et obtenir un fichier JSON contenant tous ses relevés mensuels
- [ ] L'utilisateur peut sélectionner un fichier JSON et l'importer pour restaurer les données dans PouchDB
- [ ] Un toast de confirmation (succès) ou d'erreur s'affiche après chaque opération export et import
- [ ] La création du lien de téléchargement (`<a>` DOM) est déplacée dans `Tab3Page`, pas dans `DataService`
- [ ] L'import gère les conflits de `_id` existants (skip ou replace) sans crasher l'application

## Notes techniques

- Export actuel : `DataRepository.exportDb()` → `DataService.exportDb()` (data.service.ts:50-62) → `Tab3Page.exportDb()`
- DOM download dans `DataService.exportDb()` lignes 54-60 → à déplacer dans `Tab3Page`
- Import : aucun code existant — à créer dans `DataRepository`, `DataService`, `Tab3Page`
- UI import : `<input type="file" accept=".json">` dans tab3.page.html
- Upsert PouchDB : utiliser `create` ou `replace` selon existence du `_id`
- Fichiers concernés : `src/app/core/data.service.ts`, `src/app/core/repository/data.repository.ts`, `src/app/tabs/tab3/tab3.page.ts`, `src/app/tabs/tab3/tab3.page.html`

## Liens

<!-- Aucun ticket lié pour l'instant -->
