# Integration testing checklist

## Build and startup
- [ ] `ng build` succeeds for host and every remote.
- [ ] Each remote starts on its assigned local port.
- [ ] Host starts on port `4200`.
- [ ] Remote entry files are reachable from the host.

## Federation and navigation
- [ ] Each remote is registered in the host manifest.
- [ ] Each exposed module identifier matches the remote configuration.
- [ ] Host routes load the expected remote.
- [ ] Browser refresh and direct navigation work.
- [ ] Remote unavailable state is handled gracefully.

## Cross-cutting behavior
- [ ] Shared UI components render consistently.
- [ ] Authentication context is handled securely.
- [ ] Backend authorization is verified for each domain.
- [ ] Errors and loading states are accessible.
- [ ] Browser console has no unexpected federation or dependency errors.

## Production readiness
- [ ] Environment-specific remote URLs are configured.
- [ ] CSP/CORS/TLS and deployment origins are reviewed.
- [ ] Dependency versions and security scans are reviewed.
- [ ] Monitoring, logging and rollback procedures are documented.
