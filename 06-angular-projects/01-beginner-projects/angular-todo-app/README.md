# Todo App

A responsive Angular application built with standalone components, TypeScript, and modern Angular patterns. This repository is part of my Angular learning and portfolio series.

## Project details

- **Author:** Ramu Boya
- **Language:** TypeScript
- **Focus:** CRUD operations, services, Signals, LocalStorage
- **Difficulty:** Beginner–Intermediate
- **GitHub:** https://github.com/Ramu-fsd/angular-todo-app

## Features

- Add, complete, edit, and delete tasks.
- Filter all, active, and completed tasks.
- Persist tasks in browser LocalStorage.

## Tech stack

- Angular 20
- TypeScript (strict mode)
- Standalone components
- Angular Signals where appropriate
- HTML5 and CSS3
- Jasmine and Karma unit tests

## Getting started

### Prerequisites

- Node.js version supported by Angular 20 (use a current Node.js LTS release)
- npm
- Angular CLI 20 (optional; the local CLI is used by npm scripts)

Check your versions:

```bash
node -v
npm -v
npx ng version
```

### Install dependencies

```bash
git clone https://github.com/Ramu-fsd/angular-todo-app.git
cd angular-todo-app
npm install
```

### Run locally

```bash
npm start
```

Open http://localhost:4200.

### Run unit tests

```bash
npm test
```

Karma launches Chrome by default. If Chrome does not launch automatically, check the browser launcher configuration and your local Chrome installation.

### Production build

```bash
npm run build
```

The production output is generated under `dist/`.

## Project structure

```text
angular-todo-app/
├── public/
├── src/
│   ├── app/
│   │   ├── features/
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## Learning outcomes

- Feature services and dependency injection.
- CRUD operations and immutable signal updates.
- Browser persistence and defensive JSON parsing.

## Notes

- This is a portfolio/learning project, not a production authentication or commerce backend.
- Demo data is local unless explicitly stated otherwise.
- Keep `package-lock.json` committed so installs are reproducible.
- Do not commit `node_modules/`, build output, secrets, or real environment credentials.

## License

For learning and educational use.
