# Banking Micro Frontend Shell

**Category 12 · Project 1 of 8**  
**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

## Purpose

A host/shell application for an enterprise banking platform. It owns the global layout, navigation, platform context, and the integration boundary for independently deployed micro frontends.

This starter targets Angular CLI 20.0.3 and uses standalone components. Native Federation wiring is applied to the generated Angular workspace using the official Angular Architects schematic, rather than hand-maintaining version-sensitive builder configuration.

## Included

- Responsive banking platform shell
- Global navigation for Overview, Accounts, Payments, Customers, and Administration
- Overview page with synthetic banking operations KPIs
- Remote application status panel with clearly identified placeholders
- Architecture and integration documentation
- Native Federation setup instructions for Angular 20

## Create the Angular workspace

Open a terminal in the parent folder:

```bash
ng new banking-mfe-shell --standalone --routing --style=css
```

Replace the generated `src` folder with this package's `src` folder. Copy this README and `docs` folder into the project root.

Install dependencies:

```bash
npm install
```

## Add Native Federation (Angular 20)

Angular 20/21 use the v4 bridge package name. In the project root, run:

```bash
ng add @angular-architects/native-federation-v4
```

When prompted, initialize this application as a **dynamic host** and use port **4200**. Let the schematic update `angular.json`, the bootstrap files, and federation configuration. Do not manually overwrite the generated federation configuration with older Webpack Module Federation examples.

If the schematic asks for a project name, use `banking-mfe-shell`.

The current Native Federation documentation distinguishes the Angular 20/21 package name (`@angular-architects/native-federation-v4`) from the Angular 22+ package name (`@angular-architects/native-federation`). See the official documentation links in `docs/native-federation-setup.md`.

## Run

```bash
ng serve --open
```

If port 4200 is already in use:

```bash
ng serve --open --port 4210
```

Build:

```bash
ng build
```

## Important scope note

This first project is the host shell and integration foundation. The Accounts and Payments remotes are separate projects in the next roadmap steps. Until those remotes are created and registered in the host's federation manifest, their navigation entries display an intentional placeholder state. Do not interpret the placeholders as deployed remote applications.

## Production considerations

- Use an API gateway/BFF for backend aggregation where appropriate.
- Apply OIDC/OAuth2 authentication at the platform boundary and enforce authorization in backend services.
- Define shared dependency/version policies for Angular and design-system libraries.
- Deploy shell and remotes independently with immutable versioned assets.
- Configure CSP, CORS, trusted remote origins, observability, and rollback procedures.
