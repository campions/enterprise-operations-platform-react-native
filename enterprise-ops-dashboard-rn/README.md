# Enterprise Ops Dashboard (React Native)

## Project Purpose
This Expo + React Native app demonstrates how to build a data-heavy mobile operator console while keeping the experience cohesive through design-system wrappers (`UiButton`, `UiCard`, `UiModal`, etc.). It highlights:
- Declarative list patterns (filtering, sorting, incremental pagination) powered by pure utilities in `src/utils/list` and the reusable `useListState` hook.
- Consistent validation flows with strict TypeScript types for configuration forms and in-memory editing experiences.
- Accessibility-aware UI components that enforce labels, testIDs, and modal affordances.
- End-to-end testing with Jest and React Native Testing Library so screens and utilities remain verified without relying on snapshots.
- Strict TypeScript settings (`tsconfig.json` enables `strict: true`) to prevent accidental `any` usage and keep naming consistent across components/hooks.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server (Metro + bundler):
   ```bash
   npm run start
   ```
   Then follow Expo CLI prompts to launch on iOS Simulator, Android Emulator, or Expo Go on device.

## Running Tests
Execute the Jest suite (unit + component tests) with:
```bash
npm test
```
Jest is configured via `jest-expo`, uses React Native Testing Library, and mocks timers so async query delays can be flushed deterministically.

## Folder Structure
```
enterprise-ops-dashboard-rn/
├── App.tsx                     # Expo entry point
├── src/
│   ├── app/                    # Navigation + providers + theming
│   ├── components/             # Design-system wrappers and shared layout/state components
│   ├── data/                   # Mock data models, generators, and query client
│   ├── features/
│   │   ├── assets/             # Assets list screen, detail modal, list helpers
│   │   ├── configuration/      # Configuration form screen
│   │   └── dashboard/          # Dashboard KPIs and recent updates
│   ├── hooks/                  # React Query hooks and shared state utilities
│   ├── tests/                  # Jest + RNTL suites (screens + utils)
│   ├── utils/                  # Pure helpers (e.g., list filtering/sorting/pagination)
│   └── components/ui/          # Ui* wrappers around react-native-paper
├── package.json                # Scripts + dependencies
├── tsconfig.json               # Strict TypeScript compiler options
└── README.md                   # This guide
```

## Naming & Type Safety
- Components, hooks, and utilities follow `PascalCase`/`camelCase` naming to stay predictable.
- No `any` types are used; shared models live in `src/data/models.ts`, and new helpers extend those interfaces instead of bypassing type safety.
- Tests reference elements via stable `testID`s (e.g., KPI cards, filter inputs, view/edit buttons, load-more controls, save buttons, toast).

With this structure, contributors can confidently extend screens, add skills, or adjust list strategies while keeping UX and accessibility requirements satisfied.
