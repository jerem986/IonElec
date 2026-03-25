# IonElec — CLAUDE.md

## Project overview

IonElec is a mobile-first hybrid app (Angular 21 + Ionic 8 + Capacitor 7) for logging and managing electricity reports.
Data is stored client-side in **PouchDB** (single `ion-elec` database). The app targets iOS/Android/Web via Capacitor.
UI language: **French**.

---

## Commands

```bash
npm start           # Dev server on localhost:4200
npm run build       # Production build → www/
npm run watch       # Dev build in watch mode
npm run cap:sync    # Build + sync to Capacitor (mobile)
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run format      # Prettier format (src/**/*.{ts,json,md})
npm test            # Karma/Jasmine unit tests
```

---

## Architecture

```
Presentation  →  src/app/tabs/tab{1,2,3}/
Business      →  src/app/core/*.service.ts
Data access   →  src/app/core/repository/*.repository.ts
Database      →  src/app/core/pouch-db.service.ts + pouch-db.manager.ts
Shared        →  src/app/shared/{components,model,commands,enum,helper}/
```

**Path aliases** (tsconfig.json):
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`

---

## Key patterns

- **Standalone components** — no NgModules. All components declare their own `imports: []`.
- **Repository pattern** — one repository per model. Repositories use `PouchDbService<T>` via DI.
- **PouchDbService<T>** — generic service for PouchDB CRUD. Never instantiate directly with `new`; inject via Angular DI.
- **Commands** — `CreateMonthlyReportCommand` carries form data + validation. Validated via `class-validator`.
- **ModelBase** — all PouchDB documents extend `ModelBase` (`_id`, `_rev`, `type`).
- **PouchDB selectors** — always use explicit `$eq` operator: `{ month: { $eq: month } }`.
- **Toasts** — use `ToastController` with `position: 'top'` (avoids keyboard overlap on mobile). Duration: 2500ms.
- **Dark mode** — persisted via `localStorage` key `dark-mode`. Applied with `document.body.classList.toggle('dark', ...)`.

---

## Code style

| Rule | Value |
|---|---|
| Indentation | Tabs (width 4) |
| Quotes | Single |
| Semicolons | Required |
| Line length | 120 chars |
| Formatter | Prettier |
| Linter | ESLint + @angular-eslint |

**Import order** (enforced by ESLint):
1. Built-ins (Node.js)
2. External (`@angular/*`, `@ionic/*`, third-party)
3. Internal (`@core/*`, `@shared/*`)
4. Relative

---

## Angular / Ionic conventions

- Use `@ionic/angular/standalone` imports (`IonButton`, `IonContent`, etc.) — never `IonicModule`.
- Inject `ToastController` from `@ionic/angular/standalone`.
- All routes use `loadComponent` (lazy loading).
- `provideZoneChangeDetection({ eventCoalescing: true })` is set in `main.ts` — do not remove.
- `skipLibCheck: true` in `tsconfig.json` is intentional (Ionic + PouchDB type conflicts with TS 5.9).

---

## PouchDB notes

- Single DB instance: `ion-elec`.
- **Do not** add PouchDB indexes — the dataset is small (~50–100 records max) and index overhead is not justified.
- `events` npm package is required as a browser polyfill for PouchDB with esbuild.
- `PouchDbService<T>` API: `create`, `replace`, `delete`, `getById`, `getAll`, `findAll`, `find`.

---

## Type safety

Typer le code au maximum. Utiliser `any` en dernier recours uniquement, quand aucun typage explicite n'est possible. Préférer `any` à `unknown`.

- Préférer les **génériques** (`PouchDbService<T>`, `IeFormComponent<T>`) pour propager les types.
- Utiliser des types concrets aux points d'injection (ex. `PouchDbManager<MonthlyReportModel>` plutôt que `PouchDbManager<any>`).
- `tsconfig.json` a `"strict": true` — ne pas le désactiver ni ajouter de `@ts-ignore`.

---

## What to avoid

- **`any` sans justification** — typer explicitement ; `any` n'est acceptable que si aucune alternative n'existe.
- **No DOM manipulation in repositories** — side effects (downloads, DOM) belong in services or components.
- **No `new PouchDbService()`** — always use Angular DI.
- **No `IonicModule`** — deprecated, use standalone imports.
- **No unused variables** — remove assignments if the return value is not used.
- **No indexes unless justified** — prefer simplicity for small datasets.
