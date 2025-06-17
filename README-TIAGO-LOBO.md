# Project Changelog and Documentation

## 🐛 Bug Fixes

- Changed `modifyProject` to `updateProject` in `[id].ts`
- Moved methods to the `Methods` enum
- Updated `Methods` to `GET` in `Project.ts`
- Changed type from `Projects: Project` to `projects: Project[]` in `projectsStore.ts`
- Updated endpoint from `/api/project` to `/api/projects` in `Index.tsx`
- Changed status Option "done" to "completed" in `Index.tsx`

## ✨ New Features and Changes

### User Interface
- Replaced status dropdown with radio buttons in the form
- Added CSS file for styles compilation
- Implemented edit and delete buttons on project cards
- Included form for project editing
- I had to change addProject to prevent index repetition during edit and delete actions.
- Added a toaster notification when any Create, Update, Delete action is performed on projects.

### Tests
- Implemented unit tests for `projectsStore`:
  ```typescript
  ├── __tests__/
  │   └── lib/
  │       └── projectsStore.test.ts
  ```
- Implemented unit tests for `api/projects`:
  ```typescript
  ├── __tests__/
  │   └── pages/
  │       └── api/
  │           └── projects.test.ts
  ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```
### Run tests in watch mode

```bash
npm run test:watch
```

## ⚠️ Problems

- I've noticed an issue where editing a newly added project doesn't work immediately after launching the server. It only succeeds if one refreshes the page, re-adds the project, and then attempts the edit. This problem seems to be isolated to the first server startup and only affects the edit feature for the first new project added.



