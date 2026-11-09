# Build, Run, and Validation Checklist

Run commands from each application's own directory.

## Standard commands

```bash
npm install
ng serve --open
```

In another terminal, create a production build:

```bash
ng build
```

Run the test command supported by that project's Angular version and package scripts:

```bash
ng test
```

If the project defines npm scripts, prefer the documented script, for example:

```bash
npm start
npm run build
npm test
```

## Validation record

Use this checklist separately for every application:

- [ ] Dependencies install successfully from the committed lockfile.
- [ ] Development server starts without compilation errors.
- [ ] Main page loads and browser console has no unexpected errors.
- [ ] Primary user workflow works end to end.
- [ ] Invalid input and empty states are handled.
- [ ] Responsive layout is checked.
- [ ] Keyboard navigation and accessible labels are checked.
- [ ] Unit tests pass, where configured.
- [ ] Production build succeeds.
- [ ] No secrets or real personal data are present.
- [ ] README setup instructions match the actual project.

## Suggested verification order

1. Verify one beginner project end to end.
2. Verify one intermediate project end to end.
3. Verify the advanced e-commerce project end to end.
4. Verify the remaining projects.
5. Push the consolidated repository.
6. Clone the consolidated repository into a clean temporary folder and repeat install/build checks.
7. Only after the consolidated repository is verified, consider deleting the old individual GitHub repositories.
