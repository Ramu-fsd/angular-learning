# Dashboard App

A responsive Angular application built with standalone components, TypeScript, and modern Angular patterns. This repository is part of my Angular learning and portfolio series.

## Project details

- **Author:** Ramu Boya
- **Language:** TypeScript
- **Focus:** Reusable components, dashboard metrics, data visualization, responsive layouts
- **Difficulty:** Advanced
- **GitHub:** https://github.com/Ramu-fsd/angular-dashboard-app

## Features

- KPI cards for revenue, orders, customers, and conversion.
- CSS-based monthly revenue chart and recent activity.
- Responsive dashboard layout using reusable components.

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
git clone https://github.com/Ramu-fsd/angular-dashboard-app.git
cd angular-dashboard-app
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
angular-dashboard-app/
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

- Reusable standalone presentation components.
- Data-driven templates and CSS visualizations.
- Responsive dashboard composition.

## Notes

- This is a portfolio/learning project, not a production authentication or commerce backend.
- Demo data is local unless explicitly stated otherwise.
- Keep `package-lock.json` committed so installs are reproducible.
- Do not commit `node_modules/`, build output, secrets, or real environment credentials.

## License

For learning and educational use.
