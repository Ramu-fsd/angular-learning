# Native Federation setup – Angular 20

## Version selection

The supplied environment reports Angular CLI `20.0.3`. Native Federation's current documentation uses a separate v4 bridge package name for Angular 20/21:

- Package: `@angular-architects/native-federation-v4`
- Angular 22+: package name returns to `@angular-architects/native-federation`

Official references:
- https://native-federation.com/docs/v4/angular-adapter/getting-started/
- https://native-federation.com/docs/v4/angular-adapter/
- https://native-federation.com/docs/v4/tutorial/

## Initialize the host

After creating the Angular workspace and copying the source files, run:

```bash
ng add @angular-architects/native-federation-v4
```

Choose `dynamic-host` when asked for the federation role, use port `4200`, and select the workspace project `banking-mfe-shell` if prompted.

The schematic is responsible for version-sensitive setup, including:
- Federation builder configuration in `angular.json`
- Federation bootstrap wiring
- Federation configuration file
- Runtime manifest/configuration scaffolding

Review the generated changes before committing them.

## Host and remote topology

| Application | Role | Suggested local port |
|---|---|---:|
| banking-mfe-shell | Dynamic host | 4200 |
| accounts-mfe | Remote | 4201 |
| payments-mfe | Remote | 4202 |
| customer-mfe | Remote | 4203 |
| admin-mfe | Remote | 4204 |

The remote applications are created in subsequent projects. Do not add remote URLs until those applications are running and expose their federation entry point.

## Why Native Federation

Native Federation follows the micro frontend model while using browser standards such as ES modules and import maps. It integrates with Angular's modern application builder. This project intentionally avoids old Webpack-only snippets and hand-written builder configuration.

## Local development

Run the host and each remote in separate terminals. If the default port is occupied, select another free port and update the host's remote manifest/configuration accordingly.
