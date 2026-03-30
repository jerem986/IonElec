# IonElec PM — Référence domaine

Ce fichier est une **référence de données** lue par l'agent PM (`/pm`).
Il ne contient pas d'instructions comportementales — celles-ci sont dans `.claude/skills/pm/SKILL.md`.

---

## Application

App mobile de relevés électriques mensuels.
Stack : Angular 19 + Ionic + Capacitor, stockage PouchDB local, UI en français.
Contexte technique complet : voir `../CLAUDE.md`.

### Compteurs saisis chaque mois

| Champ | Description |
|---|---|
| `dayCounter` | Index compteur jour (kWh) |
| `nightCounter` | Index compteur nuit (kWh) |
| `productionCounter` | Index production solaire (kWh) |
| `carCounter` | Index chargeur véhicule électrique (kWh) |

### Valeurs calculées (non saisies)

| Champ | Formule |
|---|---|
| `monthlyConsumption` | (dayDiff + nightDiff) − productionDiff |
| `houseConsumption` | monthlyConsumption − carDiff |

---

## Règles de numérotation des tickets

1. Scanner les noms de fichiers dans `pm/backlog/` + `pm/in-progress/` + `pm/done/`
2. Extraire le N max depuis les préfixes `TICK-NNN`
3. Prochain ticket = TICK-(N+1) avec zero-padding sur 3 chiffres (ex. TICK-007)
4. Nom de fichier : `TICK-NNN-slug-court.md` — slug en kebab-case, max 5 mots

---

## Transitions de statut

| De | Vers | Action fichier | Changement frontmatter |
|---|---|---|---|
| `backlog` | `in-progress` | Déplacer vers `pm/in-progress/` | `status: in-progress` |
| `in-progress` | `done` | Déplacer vers `pm/done/` | `status: done` + `closed: YYYY-MM-DD` |
| `backlog` | `done` (direct) | Déplacer vers `pm/done/` | `status: done` + `closed: YYYY-MM-DD` |

Les tickets `done/` ne sont jamais supprimés — archive permanente.

---

## Priorités

| Valeur | Signification |
|---|---|
| `high` | Bloquant, régression, ou fortement demandé par l'utilisateur |
| `medium` | Amélioration planifiable, valeur claire, pas urgente |
| `low` | Nice-to-have, pas de date engagée |

---

## Vocabulaire métier

- **Relevé mensuel** : les index de compteurs saisis une fois par mois par l'utilisateur
- **Consommation mensuelle** : valeur calculée depuis la différence avec le mois précédent
- **Compteur voiture** : consommation du chargeur pour véhicule électrique (sous-ensemble de la conso maison)
- **Production** : production solaire (panneaux photovoltaïques), déduite de la consommation
- **Export DB** : téléchargement JSON de toute la base PouchDB (Tab3)
- **Bootstrap** : données de migration pour pré-peupler la DB en dev/test

---

## Thèmes produit connus

| Thème | Description |
|---|---|
| Saisie et validation | Formulaires de relevés, validation métier, gestion des erreurs |
| Visualisation | Graphiques, historique, tendances de consommation |
| Export et partage | Export JSON/CSV, partage de rapports |
| Offline-first | Fonctionnement sans réseau, synchronisation future |
| UX mobile | Navigation tabs, dark mode, accessibilité, responsive |
| Migrations | Bootstrap de données, scripts de migration PouchDB |

---

## Discussions et réflexions

Les fichiers dans `pm/discussions/` sont libres — specs, comparatifs, rétros, idées.
Format suggéré : `YYYY-MM-DD-sujet.md`
