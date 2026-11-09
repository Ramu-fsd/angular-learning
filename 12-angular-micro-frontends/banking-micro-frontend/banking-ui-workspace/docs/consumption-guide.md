# Consumption guide

1. Build the library with `ng build banking-ui`.
2. Confirm the generated package name in `dist/banking-ui/package.json`.
3. Publish the package to your internal npm registry for separately deployed remotes, or use a workspace path mapping when developing in a monorepo.
4. Import standalone component classes directly in each consuming component.
5. Keep API calls, authentication, authorization, validation and domain rules in the remote application, not in this presentation library.

For independently deployed micro frontends, publish and version the library package. Do not assume a local filesystem library path is available to a separately built remote.
