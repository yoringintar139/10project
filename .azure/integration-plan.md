# Integration Handoff

## Backend
- Folder: `services/exercise-api`
- Run: `npm run dev --workspace=@fitmotion/exercise-api`
- Port: `3000` (`PORT`)
- Build: `npm run build --workspace=@fitmotion/exercise-api`
- Health: `GET /api/health`
- Catalog initializer: `npm run catalog:init --workspace=@fitmotion/exercise-api`

## Frontend
- Folder: `services/exercise-web`
- Dev: `npm run dev --workspace=@fitmotion/exercise-web`
- Build: `npm run build --workspace=@fitmotion/exercise-web`
- API base URL: `VITE_API_BASE_URL` (default `http://localhost:3000`)
- Swap seam: `services/exercise-web/src/api/index.ts`; replace `mockClient` with the live `ApiClient` implementation.
- Delete after live wiring: `services/exercise-web/src/api/mockClient.ts`, `services/exercise-web/src/mocks/data.ts`, `services/exercise-web/src/api/previewState.ts`, and `services/exercise-web/src/components/DataStateSwitcher.tsx`.
- Keep pages importing only the exported `api` object from `src/api/`.

## API Routes
- `GET /api/health` -> `{ status: "ok" }`
- `GET /api/categories` -> `{ categories: [{ id, name }] }`
- `GET /api/exercises?categoryId=&difficulty=&maxDurationMinutes=` -> `{ exercises: [{ id, name, category, difficulty, durationMinutes, description, cautions, imageUrl }] }`
- Difficulty values: `easy`, `moderate`, `challenging`.
- Error body: `{ error: { code, message, details } }`; invalid query returns `422` and `VALIDATION_ERROR`.

## Database
- Type: SQLite, read-only catalog at `services/exercise-api/src/db/exercises.sqlite`.
- Schema/catalog initializer: `services/exercise-api/scripts/create-catalog.ts`; migration directory: none (catalog schema and fixed catalog records are initialized together).
- Runtime connection variable: `EXERCISE_DB_PATH`; local default `src/db/exercises.sqlite` from API workspace, Compose path `/app/services/exercise-api/src/db/exercises.sqlite`.
- The catalog contains fixed exercise reference records only. Do not create seed data for users, profiles, health information, or workouts. Personal information must remain browser-memory-only and must never be sent to the API.

## Shared Types
- Shared contracts: `packages/shared/src/index.ts`.
- Frontend TypeScript alias: `@fitmotion/shared` -> `../../packages/shared/src/index.ts`.
- API imports shared source with relative paths so the compiler emits it into the API `dist/` tree.

## Services
- Essential: Azure Static Web Apps (React SPA), Azure App Service (Express catalog API).
- Enhancement: none.