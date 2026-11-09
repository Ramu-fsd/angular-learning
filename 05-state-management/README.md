# 05 - Angular State Management

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This category explains how to manage UI and business state in Angular applications, from lightweight service state and Signals to NgRx Store, Effects, Entity, and persistence.

## Learning path

1. `01-service-based-state` - shared state with injectable services and RxJS `BehaviorSubject`.
2. `02-signals-state` - writable/computed signals and derived banking summaries.
3. `03-ngrx-fundamentals` - actions, reducers, selectors, and immutable updates.
4. `04-ngrx-effects` - isolate asynchronous API workflows from components.
5. `05-ngrx-entity` - normalized collections and entity adapters.
6. `06-state-persistence` - safe persistence boundaries and rehydration considerations.
7. `07-state-architecture` - choosing local, feature, server-cache, and global state.
8. `projects/banking-state-management` - complete runnable Angular application using Signals.

## Run the application

Requirements:
- Node.js LTS supported by your chosen Angular CLI version
- npm
- Angular CLI

The sample project is intentionally framework-version flexible. Create a standalone Angular workspace with your installed CLI, then copy the provided source files into it.

### 1. Create the workspace

From the parent folder where you keep your Angular projects:

```bash
ng new banking-state-management --standalone --routing --style=css
cd banking-state-management
```

When prompted, choose the default options. If your CLI already created a folder with that name, create the workspace in a different empty folder and copy the supplied `src` directory into it.

### 2. Copy the project source

Replace the generated `src` folder with the `projects/banking-state-management/src` folder from this package.

Keep the generated workspace-level files (`angular.json`, `package.json`, `tsconfig*.json`) from your Angular CLI version. This avoids pinning the learning project to a potentially incompatible Angular release.

### 3. Run and build

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

### 4. Validate the application

- Confirm the account summary shows total available balance and account count.
- Search transactions by description or reference.
- Filter by transaction status.
- Select an account to see its transactions.
- Use **Mark selected as reviewed** to update the selected transaction state.
- Confirm the dashboard totals and status badges update without a page reload.
- Refresh the browser: the app returns to its initial demo state. This is intentional; persistence is discussed separately.

## Architecture

The runnable app uses Angular Signals for local feature state:
- `BankingStateService` owns the source-of-truth signals.
- Components read signals and computed selectors.
- User actions call service methods; components do not mutate state directly.
- Derived totals and filtered transactions are computed, not duplicated.

The standalone examples explain NgRx. NgRx is deliberately not added as a dependency to the runnable app so the core project stays easy to run with a newly generated Angular workspace.

## Important design guidance

- Keep ephemeral UI state local to a component where possible.
- Use a feature service or Signals for cohesive feature state.
- Use NgRx when shared state, predictable transitions, debugging, effects, and team conventions justify the additional structure.
- Treat server data as remote state; define loading, success, empty, and error states.
- Never store passwords, access tokens, PAN/CVV, or other secrets in browser storage.
- Client-side state is not an authorization boundary. Enforce permissions and business rules on the backend.

## Folder map

```text
05-state-management/
├── 01-service-based-state/
├── 02-signals-state/
├── 03-ngrx-fundamentals/
├── 04-ngrx-effects/
├── 05-ngrx-entity/
├── 06-state-persistence/
├── 07-state-architecture/
└── projects/
    └── banking-state-management/
```
