# Workspace notes

This folder contains the application `src` tree, not a version-pinned Angular CLI workspace.
Generate the workspace with the Angular CLI installed on your machine, then replace its `src` folder with this one.

The app uses:
- standalone bootstrap
- built-in template control flow (`@for`, `@empty`)
- Signals (`signal`, `computed`)
- `CurrencyPipe`, `DatePipe`, and `NgClass`

Use an Angular version that supports these APIs and built-in control flow (Angular 17+).
